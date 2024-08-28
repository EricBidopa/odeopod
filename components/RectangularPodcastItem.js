import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RectangularPodcastItem = ({
  podcastCoverImg,
  podcastTitle,
  usernameThatUploaded,
  numberOfStreams,
  dateUploaded,
  podcastDescription,
}) => {
  const navigation = useNavigation();
  const handleItemPressed = () => {
    navigation.navigate("PodcastItemScreen");
  };

  return (
    <Pressable style={styles.wrapper} onPress={handleItemPressed}>
      <View style={styles.imageWrapperView}>
        <Image style={styles.imageStyling} source={podcastCoverImg} />
      </View>
      <View style={styles.textsWrapperView}>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={styles.podcastTitle}
        >
          {podcastTitle}
        </Text>
        <View style={styles.numberOfStreamsAndDateUploadedView}>
          <Text
            style={styles.smallTexts}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {numberOfStreams} streams
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.smallTexts}
          >
            {dateUploaded}
          </Text>
        </View>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.smallTexts}>
          {usernameThatUploaded}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.podcastDescription}
        >
          {podcastDescription}
        </Text>
      </View>
      <View style={styles.playIconWrapperView}>
        <Ionicons name="play-circle-outline" size={30} color="black" />
      </View>
    </Pressable>
  );
};

export default RectangularPodcastItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    backgroundColor: "yellow",
    width: "100%",
    height: 100, // Set a specific height for the item
    marginBottom: 10, // Add some spacing between items
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
    backgroundColor: "orange",
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
  },
  smallTexts: {
    fontSize: 12,
    color: "gray",
  },
  podcastDescription: {
    fontSize: 12,
    color: "black",
  },
});
