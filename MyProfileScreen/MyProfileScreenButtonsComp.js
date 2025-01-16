import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import UploadAudioModal from "./UploadAudioModal";
import { useState } from "react";

const MyProfileScreenButtonsComp = ({isAnotherUserDetails}) => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSettingsClicked = () => {
    navigation.navigate("SettingsPage");
  };

  const handleUploadPodcastPressed = () => {
    navigation.navigate("UploadPodcastScreen");
  };

  return (
    <View style={styles.buttonsWrapper}>
      <Text>Uploads</Text>
      {isAnotherUserDetails === false &&
      <Pressable style={styles.buttons} onPress={handleSettingsClicked}>
        <Text>Settings</Text>
      </Pressable>}
     { isAnotherUserDetails === false &&
      <Pressable style={styles.buttons} onPress={handleUploadPodcastPressed}>
        <Text>Upload Podcast</Text>
      </Pressable>}
      <UploadAudioModal show={showModal} onClose={closeModal} />
    </View>
  );
};

export default MyProfileScreenButtonsComp;

const styles = StyleSheet.create({
  buttonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "lightpink",
    paddingHorizontal: "7%",
    alignItems: "center",
  },
  buttons: {
    padding: 3,
    borderColor: "black",
    borderWidth: 0.5,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
  },
});
