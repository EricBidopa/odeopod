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
  process.env.EXPO_PUBLIC_API_URL || "http://192.168.18.147:3001";

const MyUploadsWrapper = ({ isAnotherUserDetails }) => {
  const [allPodcastsByUser, setAllPodcastsByUser] = useState([]);
  const [noPodcasts, setNoPodcasts] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { user } = usePrivy();

  const fetchPodcasts = async () => {
    if (!user?.id) return;

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/podcasts/${user.id}`
      );
      const podcasts = response.data;
      setAllPodcastsByUser(podcasts);
      setNoPodcasts(podcasts.length === 0);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
      setNoPodcasts(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setNoPodcasts(false);
    fetchPodcasts();
  };

  useEffect(() => {
    fetchPodcasts();
  }, [user]);

  if (loading && !refreshing) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (noPodcasts) {
    return (
      <View style={styles.noPodcastsContainer}>
        <Text style={styles.noPodcastsText}>
          Your Uploaded Podcasts Appear Here..
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
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={["#1DB954"]}
          tintColor="#1DB954"
          title="Refreshing Podcasts..."
          titleColor="#1DB954"
        />
      }
    />
  );
};

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

export default MyUploadsWrapper;
