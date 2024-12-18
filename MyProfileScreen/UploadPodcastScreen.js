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
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { usePrivy } from "@privy-io/expo";

const UploadPodcastScreen = () => {
  const [selectedFile, setSelectedFile] = useState(null); // Audio file state
  const [podcastCoverImg, setPodcastCoverImg] = useState(null); // Cover image state
  const [podcastTitle, setPodcastTitle] = useState(""); // Title input state
  const [podcastDescription, setPodcastDescription] = useState(""); // Description input state
  const [loading, setLoading] = useState(false); // Loading state for upload button
  const { user} = usePrivy();
  

  const navigation = useNavigation();

  // Function to pick an audio file
  const handleFilePick = async () => {
    if(!user?.id) return;
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setSelectedFile(result.assets[0]);
        Alert.alert("Success", "Podcast audio selected successfully!");
      } else {
        Alert.alert("Warning", "No file selected.");
      }
    } catch (error) {
      console.error("File Selection Error:", error);
      Alert.alert("Error", "Failed to select the file.");
    }
  };

  // Function to pick a cover image
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Access to your media library is required to upload a cover image."
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setPodcastCoverImg(result.assets[0].uri);
        Alert.alert("Success", "Cover image selected successfully!");
      }
    } catch (error) {
      console.error("Image Selection Error:", error);
      Alert.alert("Error", "Failed to select the cover image.");
    }
  };

  // Function to upload file to GCS (audio or image)
  const uploadFileToGCS = async (file, fileType) => {
    try {
      const formData = new FormData();
      formData.append(fileType, {
        uri: file.uri,
        name: file.name || `${fileType}-${Date.now()}`,
        type:
          file.mimeType || (fileType === "audio" ? "audio/mpeg" : "image/jpg"),
      });

      const endpoint = fileType === "audio" ? "/upload/audio" : "/upload/cover";
      const response = await axios.post(
        `http://192.168.229.1:3001/api/v1/podcasts${endpoint}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return response.data.url; // Return file's download URL
    } catch (error) {
      console.error(`Upload ${fileType} Error:`, error);
      Alert.alert("Upload Failed", `Failed to upload ${fileType}.`);
      throw error;
    }
  };

  // Function to handle the full podcast upload process
  const handleSavePodcastToDatabase = async () => {
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

    try {
      setLoading(true);

      // Upload audio file
      const podcastDownloadUrl = await uploadFileToGCS(selectedFile, "audio");

      // Upload cover image
      const podcastCoverImgUrl = await uploadFileToGCS(
        { uri: podcastCoverImg, name: "cover.jpg" },
        "cover"
      );

      // Podcast metadata payload
      const podcastData = {
        podcastTitle: podcastTitle,
        podcastDescription: podcastDescription,
        podcastDownloadUrl: podcastDownloadUrl,
        podcastCreatedAt: new Date().toISOString(),
        podcastCoverImgUrl: podcastCoverImgUrl,
        userId: user.id, // Replace with dynamic user data
      };

      // Save podcast metadata to the database
      const response = await axios.post(
        "http://192.168.229.1:3001/api/v1/podcasts",
        podcastData
      );

      Alert.alert("Success", "Podcast uploaded successfully!");
      console.log("Uploaded Podcast Response:", response.data);

      navigation.navigate("Profile");
    } catch (error) {
      console.error("Upload Error:", error);
      Alert.alert("Upload Failed", "Failed to upload the podcast.");
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
            <Image
              style={styles.coverImage}
              source={podcastCoverImg ? { uri: podcastCoverImg } : null}
            />
            <Pressable onPress={pickImage} style={styles.imageButton}>
              <Text style={styles.imageButtonText}>
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
