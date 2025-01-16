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
import KanyeImg from "../assets/KanyeCoverArt.jpg";
import axios from "axios";
import { usePrivy } from "@privy-io/expo";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://192.168.163.147:3001";

const MyUploadsWrapper = () => {
  const [allPodcasts, setAllPodcasts] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [noPodcasts, setNoPodcasts] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh

  const { isReady, user, logout } = usePrivy();

  const fetchPodcasts = async () => {
    try {
      const podcastResponse = await axios.get(
        `${API_BASE_URL}/api/v1/podcasts/${user.id}`
      );
      const podcasts = podcastResponse.data;

      if (podcasts.length === 0) {
        setNoPodcasts(true);
        return;
      }

      // Extract unique user IDs
      const userIds = [...new Set(podcasts.map((podcast) => podcast.userid))];

      // Fetch user data for all unique user IDs
      const userResponses = await Promise.all(
        userIds.map((id) =>
          axios.get(`${API_BASE_URL}/api/v1/users/${id}`).then((res) => ({
            id,
            data: res.data,
          }))
        )
      );

      const usersMap = userResponses.reduce((map, user) => {
        map[user.id] = user.data;
        return map;
      }, {});

      setUsersMap(usersMap);
      setAllPodcasts(podcasts);
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
        <Text style={styles.noPodcastsText}>No podcasts available.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={allPodcasts}
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

export default MyUploadsWrapper;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
  },
});
