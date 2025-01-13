import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import PodcastItemHorizontalProfileComp from "./PodcastItemHorizontalProfileComp";
import StreamDateDesComp from "./StreamDateDesComp";
import OrdersWrapper from "../OrdersScreen/OrdersWrapper";
import { useRoute } from "@react-navigation/native";
import { Audio } from "expo-av";

const PodcastItemPage = () => {
  const [showOrdersWrapper] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false); // To track playback state
  const [sound, setSound] = useState(null); // To hold the sound object
  const [playbackStatus, setPlaybackStatus] = useState(null); // Playback details
  const [disableBtn, setDisableBtn] = useState(false)

  // Access the route and its parameters
  const route = useRoute();
  const { podcastWithUserThatUploaded = {} } = route.params;


  // Function to play the podcast
  const playPodcast = async () => {
    setDisableBtn(true)
    console.log("play on")
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    } else {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: podcastWithUserThatUploaded.podcast_downloadurl },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);

      // Set up playback status listener
      newSound.setOnPlaybackStatusUpdate((status) => setPlaybackStatus(status));
    }
    setDisableBtn(false)

  };

  // Function to pause the podcast
  const pausePodcast = async () => {
    setDisableBtn(true)
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
    setDisableBtn(false)
  };

  // Cleanup sound object on unmount
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Helper function to format time (mm:ss)
  const formatTime = (millis) => {
    if (!millis) return "00:00";
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Calculate progress percentage
  const getProgress = () => {
    if (!playbackStatus?.durationMillis || !playbackStatus?.positionMillis)
      return 0;
    return (playbackStatus.positionMillis / playbackStatus.durationMillis) * 100;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        {/* Cover Image */}
        <View style={styles.coverImgView}>
          <Image
            style={styles.coverImageStyling}
            source={{ uri: podcastWithUserThatUploaded.podcast_coverimgurl }}
          />
        </View>

        {/* Podcast Title */}
        <View style={styles.podcastTitleView}>
          <Text style={styles.podcastTitleText} numberOfLines={2} ellipsizeMode="tail">
            {podcastWithUserThatUploaded.podcast_title}
          </Text>
        </View>

        {/* Progress Tracker */}
        <View style={styles.progressContainer}>
          <Text style={styles.timeText}>
            {formatTime(playbackStatus?.positionMillis)}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${getProgress()}%` },
              ]}
            />
          </View>
          <Text style={styles.timeText}>
            {formatTime(playbackStatus?.durationMillis)}
          </Text>
        </View>

        {/* Play and Share Icons */}
        <View style={styles.iconsWrapper}>
          <Pressable
          // disabled={disableBtn}
            style={styles.iconButton}
            onPress={isPlaying ? pausePodcast : playPodcast}
          >
            <Ionicons
              name={isPlaying ? "pause-circle" : "play-circle"}
              size={60}
              color="#1DB954"
            />
            <Text style={styles.iconText}>{isPlaying ? "Pause" : "Play"}</Text>
          </Pressable>
          <Pressable style={styles.iconButton}>
            <MaterialIcons name="share" size={30} color="#535353" />
            <Text style={styles.iconText}>Share</Text>
          </Pressable>
        </View>

        {/* User Information */}
        <PodcastItemHorizontalProfileComp podcastWithUserThatUploaded={podcastWithUserThatUploaded} />

        {/* Stream Details */}
        <StreamDateDesComp />

        {/* Financial Details */}
        <Text>You Own 8 ${podcastWithUserThatUploaded.userchannelname} Shares</Text>
        <Text>Current ${podcastWithUserThatUploaded.userchannelname} Share Price: 300 USD</Text>

        {/* Orders */}
        <OrdersWrapper show={showOrdersWrapper} />
      </View>
    </ScrollView>
  );
};

export default PodcastItemPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    backgroundColor: "lightblue",
    flex: 1,
  },
  wrapper: {
    backgroundColor: "pink",
    flex: 1,
    flexDirection: "column",
    gap: 5,
  },
  coverImgView: {
    width: "100%",
    height: 300,
    alignItems: "center",
  },
  coverImageStyling: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  podcastTitleView: {
    backgroundColor: "white",
    alignContent: "center",
    alignItems: "center",
  },
  podcastTitleText: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  timeText: {
    fontSize: 12,
    color: "#535353",
  },
  progressBar: {
    flex: 1,
    height: 5,
    backgroundColor: "#e6e6e6",
    marginHorizontal: 10,
    borderRadius: 5,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#1DB954",
  },
  iconsWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#e6e6e6",
  },
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 12,
    color: "#535353",
    marginTop: 5,
  },
});
