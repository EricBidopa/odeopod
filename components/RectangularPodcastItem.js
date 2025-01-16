import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RectangularPodcastItem = ({ podcastWithUserThatUploaded }) => {
  const navigation = useNavigation();

  const handleItemPressed = () => {
    navigation.navigate("PodcastItemScreen", { podcastWithUserThatUploaded });
  };

  return (
    <Pressable style={styles.wrapper} onPress={handleItemPressed}>
      <View style={styles.imageWrapperView}>
        <Image
          style={styles.imageStyling}
          source={{ uri: podcastWithUserThatUploaded.podcast_coverimgurl }}
        />
      </View>
      <View style={styles.textsWrapperView}>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={styles.podcastTitle}
        >
          {podcastWithUserThatUploaded.podcast_title}
        </Text>
        <View style={styles.numberOfStreamsAndDateUploadedView}>
          <Text
            style={styles.smallTexts}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            0 streams
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.smallTexts}
          >
            000
          </Text>
        </View>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.smallTexts}>
          {podcastWithUserThatUploaded.userchannelname || "Unknown User"}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.podcastDescription}
        >
          {podcastWithUserThatUploaded.podcast_description}
        </Text>
      </View>
      <View style={styles.playIconWrapperView}>
        <Ionicons name="play-circle-outline" size={30} color="#1DB954" />
      </View>
    </Pressable>
  );
};

export default RectangularPodcastItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    backgroundColor: "#282828",
    width: "100%",
    height: 100, // Set a specific height for the item
    marginBottom: 10, // Add some spacing between items
    elevation: 3, 

  },
  imageWrapperView: {
    width: "30%",
    height: "100%",
  },
  imageStyling: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textsWrapperView: {
    backgroundColor: "#057d61",
    flex: 1,
    paddingLeft: 10,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  numberOfStreamsAndDateUploadedView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  playIconWrapperView: {
    // justifyContent: "center",
    padding: 3,
    alignItems: "center",
    width: "10%",
  },
  podcastTitle: {
    fontSize: 13,
    fontWeight: "bold",
    overflow: "hidden",
    color: "white",
  },
  smallTexts: {
    fontSize: 12,
    color: "white",
  },
  podcastDescription: {
    fontSize: 12,
    color: "white",
  },
});
