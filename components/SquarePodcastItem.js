import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const SquarePodcastItem = ({
  podcastCoverImg,
  podcastTitle,
  usernameThatUploaded,
}) => {
  return (
    <View style={styles.wrapper}>
      <Image style={styles.imageStyling} source={podcastCoverImg} />
      <View style={styles.textsAndIcon}>
        <View>
          <Text>{podcastTitle}</Text>
          <Text>{usernameThatUploaded}</Text>
        </View>
        <Ionicons name="play-circle-outline" size={30} color="black" />
      </View>
    </View>
  );
};

export default SquarePodcastItem;

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    padding: '5%',
    backgroundColor: "pink",
    margin: 5

  },
  imageStyling: {
    resizeMode: "contain",
    MaxWidth: "100%",
  },
  textsAndIcon:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
