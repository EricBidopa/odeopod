import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import KanyeImg from "../assets/KanyeCoverArt.jpg";

const SubscribedProfileItem = ({ subscribedto = {} }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.imgWrapperView}>
        <Image source={KanyeImg} style={styles.imageStyling} />
      </View>
      <View style={styles.textsView}>
        <Text style={styles.username} numberOfLines={1} ellipsizeMode="tail">
          @{subscribedto.userusername || "kanyewest"}
        </Text>
      </View>
    </View>
  );
};

export default SubscribedProfileItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "pink",
  },
  imgWrapperView: {
    width: 66, // Set the size of the image wrapper
    height: 66, // Set the size of the image wrapper
    borderRadius: 33, // Make it circular (half of the width/height)
    overflow: "hidden", // Ensure the image is clipped to the borderRadius
    // backgroundColor: 'blue',
  },
  imageStyling: {
    width: "100%",
    height: "100%",
    borderRadius: 33, // Ensure the image itself is also circular
  },
  textsView: {
    width: 80,
  },
  username: {
    marginTop: 3,
    textAlign: "center",
    fontSize: 12,
  },
});
