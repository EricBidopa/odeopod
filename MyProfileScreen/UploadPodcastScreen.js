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

const UploadPodcastScreen = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [podcastCoverImg, setPodcastCoverImg] = useState(null);
  const [podcastTitle, setPodcastTitle] = useState("");
  const [podcastDescription, setPodcastDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Function to handle file selection
  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const file = result.assets[0];
        setSelectedFile(file);
        Alert.alert(
          "File Selected",
          "Your file has been selected successfully."
        );
      } else {
        Alert.alert("Upload Status", "File selection failed or was canceled.");
      }
    } catch (error) {
      console.error("Error picking the file:", error);
      Alert.alert("Error", "There was an error picking the file.");
    }
  };

  // Function to pick an image
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Access to the camera roll is required!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPodcastCoverImg(result.assets[0].uri);
    }
  };


  // Upload the selected audio file to GCS
const uploadFileToGCS = async (file, fileType) => {
  try {
    const formData = new FormData();
    formData.append(fileType, {
      uri: file.uri,
      name: file.name || `file-${Date.now()}`,
      type: file.mimeType || "audio/mpeg",
    });

    const endpoint =
      fileType === "audio" ? "/upload/audio" : "/upload/cover";
    const response = await axios.post(
      `http://192.168.23.1:3001/api/v1/podcasts${endpoint}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data.url; // Return the GCS file URL
  } catch (error) {
    console.error(`Error uploading ${fileType}:`, error);
    Alert.alert("Error", `Failed to upload ${fileType}.`);
    throw error;
  }
};



// function to upload podcast data to the database
const handleSavePodcastToDatabase = async () => {
  if (
    !selectedFile ||
    !podcastCoverImg ||
    !podcastTitle ||
    !podcastDescription
  ) {
    Alert.alert("Error", "Please complete all fields before uploading.");
    return;
  }

  try {
    setLoading(true);

    // Upload audio and image files to GCS
    const podcastDownloadUrl = await uploadFileToGCS(
      selectedFile,
      "audio"
    );
    const podcastCoverImgUrl = await uploadFileToGCS(
      { uri: podcastCoverImg, name: "cover.jpg" },
      "coverImage"
    );

    // Prepare podcast metadata
    const podcastData = {
      podcastTitle,
      podcastDescription,
      podcastDownloadUrl,
      podcastCoverImgUrl,
      podcastUploadedBy: "UploaderName", // Replace with dynamic user data
      podcastCreatedAt: new Date().toISOString(),
    };

    // Save podcast metadata to the database
    const response = await axios.post(
      "http://192.168.23.1:3001/api/v1/podcasts",
      podcastData
    );

    Alert.alert("Success", "Podcast uploaded successfully!");
    console.log("Podcast Uploaded:", response.data);
    navigation.navigate("Profile");
  } catch (error) {
    console.error("Error uploading podcast:", error);
    Alert.alert("Error", "Failed to upload podcast. Please try again.");
  } finally {
    setLoading(false);
  }
};



  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.modalBackground}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.modalTitle}>Upload New Podcast</Text>

          {/* File Upload */}
          <Pressable onPress={handleFilePick} style={styles.iconWrapper}>
            <Ionicons name="cloud-upload" size={50} color="black" />
            <Text style={styles.fileName}>
              {selectedFile ? selectedFile.name : "Tap To Upload Podcast"}
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
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Podcast Title:</Text>
            <TextInput
              placeholder="Enter title"
              style={styles.input}
              value={podcastTitle}
              onChangeText={setPodcastTitle}
            />
          </View>

          {/* Description Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Podcast Description:</Text>
            <TextInput
              placeholder="Enter description"
              style={styles.input}
              multiline
              value={podcastDescription}
              onChangeText={setPodcastDescription}
            />
          </View>

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
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  modalContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  iconWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  fileName: {
    marginTop: 10,
    fontSize: 14,
    color: "gray",
  },
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
  imageButton: {
    marginTop: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  imageButtonText: {
    color: "blue",
    textAlign: "center",
  },
  inputGroup: {
    width: "100%",
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  uploadButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
