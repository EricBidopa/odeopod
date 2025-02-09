import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { usePrivy } from "@privy-io/expo";
import * as FileSystem from "expo-file-system";

// Define your API base URL - replace with your actual API URL
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://192.168.242.147:3001";

const UploadPodcastScreen = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [podcastCoverImg, setPodcastCoverImg] = useState(null);
  const [podcastTitle, setPodcastTitle] = useState("");
  const [podcastDescription, setPodcastDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = usePrivy();
  const navigation = useNavigation();

  // Function to pick an audio file
  const handleFilePick = async () => {
    if (!user?.id) {
      Alert.alert("Error", "Please login first");
      return;
    }
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setSelectedFile(result.assets[0]);
        Alert.alert("Success", "Podcast audio selected successfully!");
      }
    } catch (error) {
      console.error("File Selection Error:", error);
      Alert.alert("Error", "Failed to select the audio file.");
    }
  };

  // Function to pick a cover image
  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "We need access to your photos to continue"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      console.log("Image picker result:", result);

      if (!result.canceled && result.assets?.[0]) {
        const asset = result.assets[0];
        const imageInfo = {
          uri: asset.uri,
          type: asset.mimeType || "image/jpeg",
          name: asset.fileName || `image-${Date.now()}.jpg`,
          width: asset.width,
          height: asset.height,
        };

        console.log("Setting image:", imageInfo);
        setPodcastCoverImg(imageInfo);
      }
    } catch (error) {
      console.error("Image picker error:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };
  // Function to upload audio file
  const uploadAudioFileToGCS = async (file) => {
    try {
      console.log(
        "Uploading to:",
        `${API_BASE_URL}/api/v1/podcasts/upload/audio`
      );

      const formData = new FormData();
      formData.append("audio", {
        uri: file.uri,
        name: file.name || `audio-${Date.now()}.mp3`,
        type: "audio/mpeg",
      });

      const response = await axios.post(
        `${API_BASE_URL}/api/v1/podcasts/upload/audio`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
          timeout: 30000,
        }
      );

      console.log("Upload response:", response.data);
      return response.data.url;
    } catch (error) {
      console.error("Full error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
        config: error.config,
      });
      throw new Error(`Failed to upload audio file: ${error.message}`);
    }
  };

  // Function to get file URI
  const getFileUri = async (uri) => {
    if (!uri) return null;

    try {
      if (uri.startsWith("content://")) {
        const fileInfo = await FileSystem.getInfoAsync(uri);
        return fileInfo.uri;
      }
      return uri;
    } catch (error) {
      console.error("File URI Error:", error);
      throw new Error("Failed to get file URI");
    }
  };

  // Function to upload cover image
  const uploadCoverImageToGCS = async (image) => {
    if (!image) throw new Error("No image selected");

    try {
      const fileUri = await getFileUri(image.uri);
      if (!fileUri) throw new Error("Invalid file URI");

      const formData = new FormData();
      formData.append("coverImage", {
        uri: fileUri,
        name: image.fileName || `cover-${Date.now()}.jpg`,
        type: image.type || "image/jpeg",
      });

      const response = await axios.post(
        `${API_BASE_URL}/api/v1/podcasts/upload/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 30000, // 30 second timeout
        }
      );

      return response.data.url;
    } catch (error) {
      console.error(
        "Upload Cover Image Error:",
        error.response?.data || error.message
      );
      throw new Error("Failed to upload cover image");
    }
  };

  // Function to handle the full podcast upload process
  const handleSavePodcastToDatabase = async () => {
    if (!user?.id) {
      Alert.alert("Error", "Please login first");
      return;
    }

    if (
      !selectedFile ||
      !podcastCoverImg ||
      !podcastTitle ||
      !podcastDescription
    ) {
      Alert.alert(
        "Validation Error",
        "Please fill in all fields before uploading."
      );
      return;
    }

    setLoading(true);

    try {
      const [podcastDownloadUrl, coverImageUrl] = await Promise.all([
        uploadAudioFileToGCS(selectedFile),
        uploadCoverImageToGCS(podcastCoverImg),
      ]);

      const podcastData = {
        podcastTitle,
        podcastDescription,
        podcastDownloadUrl,
        podcastCoverImgUrl: coverImageUrl,
        userId: user.id,
      };

      await axios.post(`${API_BASE_URL}/api/v1/podcasts`, podcastData, {
        timeout: 10000, // 10 second timeout
      });

      Alert.alert("Success", "Podcast uploaded successfully!");
      navigation.navigate("Profile");
    } catch (error) {
      console.error("Upload Error:", error.message);
      Alert.alert(
        "Upload Failed",
        error.message || "Failed to upload the podcast. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Upload New Podcast</Text>

          {/* Audio File Picker */}
          <Pressable onPress={handleFilePick} style={styles.filePicker}>
            <Ionicons name="cloud-upload" size={50} color="#555" />
            <Text style={styles.fileText}>
              {selectedFile ? selectedFile.name : "Tap to upload podcast audio"}
            </Text>
          </Pressable>

          {/* Cover Image Picker */}
          <View style={styles.imageContainer}>
            {podcastCoverImg && (
              <Image
                source={{ uri: podcastCoverImg.uri }}
                style={styles.coverImage}
                resizeMode="cover"
              />
            )}
            {!podcastCoverImg && (
              <View style={[styles.coverImage, { backgroundColor: "#ddd" }]} />
            )}
            <Pressable
              onPress={pickImage}
              style={[styles.imageButton, { marginTop: 10 }]}
            >
              <Text style={styles.buttonText}>
                {podcastCoverImg ? "Change Cover Image" : "Choose Cover Image"}
              </Text>
            </Pressable>
          </View>

          {/* Title Input */}
          <TextInput
            style={styles.input}
            placeholder="Podcast Title"
            value={podcastTitle}
            onChangeText={setPodcastTitle}
          />

          {/* Description Input */}
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Podcast Description"
            multiline
            value={podcastDescription}
            onChangeText={setPodcastDescription}
          />

          {/* Upload Button */}
          <Pressable
            style={styles.uploadButton}
            onPress={handleSavePodcastToDatabase}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Uploading..." : "Upload Podcast"}
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UploadPodcastScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  content: { padding: 20, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  filePicker: { alignItems: "center", marginBottom: 20 },
  fileText: { marginTop: 10, fontSize: 14, color: "#555" },
  imageSection: { alignItems: "center", marginVertical: 10 },
  coverImage: { width: 200, height: 150, borderRadius: 10 },
  imageButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#333",
    padding: 5,
  },
  imageText: { color: "blue" },
  imageContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  coverImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    backgroundColor: "#ddd",
  },
  input: {
    width: "100%",
    padding: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
  },
  textArea: { height: 100, textAlignVertical: "top" },
  uploadButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 5,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
