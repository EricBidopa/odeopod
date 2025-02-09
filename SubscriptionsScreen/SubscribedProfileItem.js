import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import KanyeImg from "../assets/KanyeCoverArt.jpg";
import { useNavigation } from "@react-navigation/native";

import { usePrivy } from "@privy-io/expo";

const SubscribedProfileItem = ({ podcastWithUserThatUploaded = {} }) => {

  const navigation = useNavigation();
  const { isReady, user } = usePrivy();

  const handleProfileClicked = () => {
    podcastWithUserThatUploaded?.userid !== user.id
      ? navigation.navigate("ViewProfilePage", { podcastWithUserThatUploaded })
      : navigation.navigate("Profile");
  };

  return (
      <Pressable onPress={handleProfileClicked} style={styles.wrapper}>
      <View style={styles.imgWrapperView}>
        <Image source={KanyeImg} style={styles.imageStyling} />
      </View>
      <View style={styles.textsView}>
        <Text style={styles.username} numberOfLines={1} ellipsizeMode="tail">
          @{podcastWithUserThatUploaded.userusername || "kanyewest"}
        </Text>
      </View>
      </Pressable>
  );
};

export default SubscribedProfileItem;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1, // Allows wrapper to take full available space
    flexDirection: "column",
    alignItems: "center", // Centers items horizontally
    justifyContent: "center", // Centers items vertically
    marginRight: 12,
    // backgroundColor: "pink",
    paddingVertical: 10,
  },
  imgWrapperView: {
    width: 66,
    height: 66,
    borderRadius: 33,
    overflow: "hidden",
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyling: {
    width: "100%",
    height: "100%",
    borderRadius: 33,
  },
  textsView: {
    marginTop: 6, // Space between the image and the username
    maxWidth: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    fontSize: 13,
    fontWeight: "500",
    color: "#EAEAEA",
    textAlign: "center",
  },
});




