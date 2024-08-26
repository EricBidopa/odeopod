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
          <Text
            style={styles.podcastTitle}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {podcastTitle}
          </Text>

          <Text style={styles.username}
            numberOfLines={1}
            ellipsizeMode="tail"
          >{usernameThatUploaded}</Text>
        </View>
        <Ionicons name="play-circle-outline" size={30} color="black" />
      </View>
    </View>
  );
};

export default SquarePodcastItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    gap: 5,
    padding: "5%",
    backgroundColor: "pink",
    margin: 5,
  },
  imageStyling: {
    resizeMode: "contain",
    maxWidth: "100%", // corrected 'MaxWidth'
  },
  textsAndIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  podcastTitle: {
    backgroundColor: 'yellow',
    fontSize: 16,
    fontWeight: "bold",
    maxWidth: 250,
    overflow: "hidden",
  },
  username: {
    fontSize: 14,
    color: "gray",
    maxWidth: 150,
    overflow: "hidden",
  },
});
