import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import RectangularPodcastItem from "../components/RectangularPodcastItem";
import axios from "axios";
import { usePrivy } from "@privy-io/expo";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://192.168.242.147:3001";

const UploadsWrapper = ({ isAnotherUserDetails }) => {
  const [allPodcastsByUser, setAllPodcastsByUser] = useState([]);
  const [noPodcasts, setNoPodcasts] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh

  const { isReady, user, logout } = usePrivy();

  const fetchPodcasts = async () => {
    try {
      const userId = isAnotherUserDetails.userid;
      const podcastResponse = await axios.get(
        `${API_BASE_URL}/api/v1/podcasts/${userId}`
      );
      const podcasts = podcastResponse.data;

      if (podcasts.length === 0) {
        setNoPodcasts(true);
        return;
      }
      setAllPodcastsByUser(podcasts);
    } catch (error) {
      console.error("Error fetching podcasts or user data:", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop refreshing state after fetching data
    }
  };

  // Pull-to-refresh handler
  const handleRefresh = () => {
    setRefreshing(true);
    fetchPodcasts(); // Re-fetch podcasts on pull-to-refresh
  };

  useEffect(() => {
    if (!user?.id) return;
    fetchPodcasts();
  }, []);

  if (loading && !refreshing) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (noPodcasts) {
    return (
      <View style={styles.noPodcastsContainer}>
        <Text style={styles.noPodcastsText}>
          {" "}
          No Uploads Made By This Bren!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={allPodcastsByUser}
      renderItem={({ item }) => (
        <RectangularPodcastItem podcastWithUserThatUploaded={item} />
      )}
      keyExtractor={(podcast) => podcast.podcast_id.toString()}
      refreshControl={
        <RefreshControl
          refreshing={refreshing} // Indicates if the list is refreshing
          onRefresh={handleRefresh} // Function to call on pull-to-refresh
          colors={["#1DB954"]} // Android spinner color
          tintColor="#1DB954" // iOS spinner color
          title="Refreshing Podcasts..." // iOS refresh text
          titleColor="#1DB954"
        />
      }
    />
  );
};

export default UploadsWrapper;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
  },
  noPodcastsContainer: {
    alignItems: "center",
  },
  noPodcastsText: {
    color: "white",
  },
});
