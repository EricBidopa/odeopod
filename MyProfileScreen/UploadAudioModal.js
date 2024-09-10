import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

const UploadAudioModal = ({ show, onClose }) => {
  const [uploadType, setUploadType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadCoverImg, setUploadCoverImg] = useState(null); // State for cover image

  if (!show) return null;

  const handleFilePick = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
        copyToCacheDirectory: true,
      });

      console.log(result); // Log the result to see the details

      // Check if the result contains assets and is not canceled
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0]; // Access the first file in the assets array
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

  const pickImage = async (setImage) => {
    // Ask for permission
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.status === "undetermined") {
      alert(
        "Permission request was dismissed. Please allow access to continue."
      );
      return;
    }

    if (permissionResult.status === "denied") {
      alert("Permission to access camera roll is required!");
      return;
    }

    if (permissionResult.status === "granted") {
      // Open the image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  return (
    <Modal transparent={true} visible={show} onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.modalBackground}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.modalTitle}>Upload Your Podcast or Music</Text>
          <Pressable onPress={handleFilePick} style={styles.iconWrapper}>
            <Ionicons name="cloud-upload" size={50} color="black" />

            <Text style={styles.fileName}>
              {selectedFile ? selectedFile.name : "Tap To Upload File"}
            </Text>
          </Pressable>

          <View style={styles.labelAndInputView}>
            <Text>Audio Type:</Text>
            <Picker
              selectedValue={uploadType}
              style={styles.picker}
              onValueChange={(itemValue) => setUploadType(itemValue)}
            >
              <Picker.Item label="Podcast" value="Podcast" />
              <Picker.Item label="Music" value="Music" />
            </Picker>
          </View>

          <View>
            <View style={styles.coverImgView}>
              <Image
                style={styles.coverImageStyling}
                source={
                  typeof uploadCoverImg === "string"
                    ? { uri: uploadCoverImg }
                    : uploadCoverImg
                }
              />
            </View>

            <Pressable
              onPress={() => pickImage(setUploadCoverImg)}
              style={styles.changeButtons}
            >
              <Text style={styles.changeText}>{uploadCoverImg ? "Change Cover Image": "Choose Cover Image"}</Text>
            </Pressable>
          </View>

          <View style={styles.labelAndInputView}>
            <Text>Title: </Text>
            <View style={styles.inputView}>
              <TextInput
                placeholder="Enter title"
                style={styles.input}
                multiline
              />
            </View>
          </View>

          <View style={styles.labelAndInputView}>
            <Text>Description: </Text>
            <View style={styles.inputView}>
              <TextInput
                placeholder="Enter description"
                style={styles.input}
                multiline
              />
            </View>
          </View>
          <Pressable
            style={styles.uploadButton}
            onPress={() => console.log("Upload started")}
          >
            <Text style={styles.buttonText}>Start Upload</Text>
          </Pressable>
          <Pressable onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default UploadAudioModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    //   margin: 'auto'
  },
  coverImgView: {
    backgroundColor: "blue",
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  coverImageStyling: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  changeButtons: {
    padding: 3,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
  },
  modalTitle: {
    fontSize: 18,
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
  labelAndInputView: {
    width: "100%",
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  inputView: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 5,
  },
  input: {
    width: "100%",
    minHeight: 40,
  },
  changeText: {
    textAlign: "center",
    color: "blue",
    // marginTop: 5,
  },
  uploadButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeText: {
    color: "red",
    marginTop: 10,
  },
});
