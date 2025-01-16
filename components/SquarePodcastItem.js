import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SquarePodcastItem = ({ podcastWithUserThatUploaded }) => {
  const navigation = useNavigation();

  const handleItemPressed = () => {
    navigation.navigate("PodcastItemScreen", { podcastWithUserThatUploaded });
  };

  return (
    <Pressable style={styles.wrapper} onPress={handleItemPressed}>
      {/* Podcast Cover Image */}
      <Image
        style={styles.imageStyling}
        source={{ uri: podcastWithUserThatUploaded.podcast_coverimgurl }}
      />
      {/* Text and Play Icon */}
      <View style={styles.detailsContainer}>
        <View>
          <Text
            style={styles.podcastTitle}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {podcastWithUserThatUploaded.podcast_title}
          </Text>
          <Text style={styles.username} numberOfLines={1} ellipsizeMode="tail">
            {podcastWithUserThatUploaded.userchannelname || "Unknown User"}
          </Text>
        </View>
        <Ionicons name="play-circle" size={40} color="#1DB954" />
      </View>
    </Pressable>
  );
};

export default SquarePodcastItem;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#282828", // Dark background
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "column",
    gap: 10,
    marginBottom: 18,
    elevation: 3, // Shadow for a modern look
  },
  imageStyling: {
    resizeMode: "cover",
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "5%",
    marginBottom: "5%"
  },
  podcastTitle: {
    // backgroundColor: "yellow",
    fontSize: 16,
    fontWeight: "bold",
    maxWidth: 250,
    overflow: "hidden",
    color: "white"

  },
  username: {
    fontSize: 14,
    color: "white",
    maxWidth: 150,
    overflow: "hidden",
  },
});
