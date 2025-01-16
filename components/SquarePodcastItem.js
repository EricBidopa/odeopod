// SquarePodcastItem.js
import { View, Text, Image, StyleSheet, Pressable, Dimensions } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get('window').width;
const PADDING_HORIZONTAL = screenWidth * 0.05;

const SquarePodcastItem = ({ podcastWithUserThatUploaded, numColumns = 1 }) => {
  const navigation = useNavigation();

  // Calculate item width based on numColumns
  const itemWidth = numColumns === 1 
    ? screenWidth - (PADDING_HORIZONTAL * 2) // Full width for single column
    : (screenWidth - (PADDING_HORIZONTAL * 2) - ((numColumns - 1) * 16)) / numColumns; // Width for grid

  const handleItemPressed = () => {
    navigation.navigate("PodcastItemScreen", { podcastWithUserThatUploaded });
  };

  return (
    <Pressable 
      style={[
        styles.wrapper, 
        { width: itemWidth }
      ]} 
      onPress={handleItemPressed}
    >
      <Image
        style={[styles.imageStyling, { width: itemWidth }]}
        source={{ uri: podcastWithUserThatUploaded.podcast_coverimgurl }}
      />
      <View style={styles.detailsContainer}>
        <View>
          <Text
            style={[styles.podcastTitle, { maxWidth: itemWidth - 56 }]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {podcastWithUserThatUploaded.podcast_title}
          </Text>
          <Text 
            style={[styles.username, { maxWidth: itemWidth - 56 }]} 
            numberOfLines={1} 
            ellipsizeMode="tail"
          >
            {podcastWithUserThatUploaded.userchannelname || "Unknown User"}
          </Text>
        </View>
        <Ionicons 
          name="play-circle" 
          size={numColumns === 1 ? 40 : 32} 
          color="#1DB954" 
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "column",
    gap: 8,
    marginBottom: 16,
    // elevation: 3,
  },
  imageStyling: {
    aspectRatio: 1.5,
    resizeMode: "cover",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 3,
    // paddingBottom: 8,
  },
  podcastTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#F6E1E1",
    marginBottom: 4,
  
  },
  username: {
    fontSize: 10,
    color: "white",
  },
});

export default SquarePodcastItem;