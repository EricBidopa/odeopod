import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker
import KanyeImg from "../assets/KanyeCoverArt.jpg";

const SettingsPage = () => {
  const [isFormEditable, setIsFormEditable] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(true);
  const [coverImage, setCoverImage] = useState(KanyeImg); // State for cover image
  const [profileImage, setProfileImage] = useState(KanyeImg); // State for profile image

  // Handler for the Edit/Save button
  const handleEditClicked = () => {
    setShowEditBtn(false);
    setIsFormEditable(true);
  };
  const handleSaveClicked = () => {
    setShowEditBtn(true);
    setIsFormEditable(false);
  };

  // Function to pick an image
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.wrapper}>
          <View>
            <View style={styles.coverImgView}>
              <Image
                style={styles.coverImageStyling}
                source={
                  typeof coverImage === "string"
                    ? { uri: coverImage }
                    : coverImage
                }
              />
            </View>
            {isFormEditable ? (
              <Pressable
                onPress={() => pickImage(setCoverImage)}
                style={styles.changeButtons}
              >
                <Text style={styles.changeText}>Change Cover Photo</Text>
              </Pressable>
            ) : null}
          </View>

          <View style={styles.profileWrapper}>
            <View style={styles.profileImgView}>
              <Image
                style={styles.profileImgeStyling}
                source={
                  typeof profileImage === "string"
                    ? { uri: profileImage }
                    : profileImage
                }
              />
            </View>
            {isFormEditable ? (
              <Pressable
                onPress={() => pickImage(setProfileImage)}
                style={styles.changeButtons}
              >
                <Text style={styles.changeText}>Change Profile Photo</Text>
              </Pressable>
            ) : null}
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.staticText}>@EricBidopa</Text>
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Full Name:</Text>
            <TextInput
              style={[styles.input, !isFormEditable && styles.disabledInput]}
              placeholder="Your full name"
              editable={isFormEditable}
            />
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Channel Description:</Text>
            <TextInput
              style={[styles.input, !isFormEditable && styles.disabledInput]}
              placeholder="Describe your channel"
              editable={isFormEditable}
              multiline
            />
          </View>

          <View style={styles.buttonWrapper}>
            {isFormEditable ? (
              <Pressable onPress={handleSaveClicked} style={styles.saveBtn}>
                <Text>
                Save
                </Text>
              </Pressable>
            ) : null}

            {showEditBtn ? (
              <Pressable onPress={handleEditClicked} style={styles.editBtn}>
                <Text>Edit</Text>
              </Pressable>
            ) : null}
          </View>
          <Pressable style={styles.logoutBtn}>
            <Text>Logout</Text>
          </Pressable>
          <Pressable style={styles.deleteAccntBtn}>
            <Text>Delete Account</Text>
            </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
  },
  scrollContainer: {
    paddingHorizontal: "5%",
  },
  wrapper: {
    flexDirection: "column",
    gap: 10,
    backgroundColor: "pink",
    padding: 20,
    borderRadius: 10,
  },
  coverImgView: {
    backgroundColor: "blue",
    width: "100%",
    height: 120,
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
  profileWrapper: {
    alignItems: "center",
    marginVertical: 10,
  },
  profileImgView: {
    backgroundColor: "lightblue",
    width: 66,
    height: 66,
    overflow: "hidden",
    borderRadius: 33,
  },
  profileImgeStyling: {
    width: "100%",
    height: "100%",
    borderRadius: 33,
  },
  changeText: {
    textAlign: "center",
    color: "blue",
    // marginTop: 5,
  },
  fieldWrapper: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  staticText: {
    fontSize: 16,
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  disabledInput: {
    backgroundColor: "#f0f0f0",
  },
  buttonWrapper: {
    marginTop: 20,
  },
  logoutBtn: {
    backgroundColor: "red",
    alignItems: "center",
    padding: 7,
    borderRadius: 5,
  },
  saveBtn: {
    alignItems: "center",
    padding: 7,
    borderRadius: 5,
    backgroundColor: 'lightblue'
  },
  editBtn: {
    alignItems: "center",
    backgroundColor: 'lightblue',
    padding: 7,
    borderRadius: 5,
  },
  deleteAccntBtn: {
    alignItems: "center",
    backgroundColor: 'grey',
    padding: 7,
    borderRadius: 5,
  },
});
