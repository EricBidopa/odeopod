import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { usePrivy } from "@privy-io/expo";
import SubscribedProfileItem from "./SubscribedProfileItem";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://192.168.242.147:3001";

const SubscribedProfilesWrapper = () => {
  const { user } = usePrivy();
  const [subscribedProfiles, setSubscribedProfiles] = useState([]);
  const [noProfiles, setNoProfiles] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh

  const fetchSubscribedProfiles = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/subscriptions/${user.id}/podcastswithuserthatuploaded`
      );
      const podcasts = response.data;

      if (podcasts.length === 0) {
        setNoProfiles(true);
        return;
      }

      // Remove duplicate profiles by using a Set based on user_id
      const uniqueProfiles = Array.from(
        new Map(podcasts.map((podcast) => [podcast.userid, podcast])).values()
      );

      setSubscribedProfiles(uniqueProfiles);
    } catch (error) {
      console.error("Error fetching subscribed profiles:", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Pull-to-refresh handler
  const handleRefresh = () => {
    setRefreshing(true);
    fetchSubscribedProfiles();
  };

  useEffect(() => {
    fetchSubscribedProfiles();
  }, []);

  if (loading && !refreshing) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (noProfiles) {
    return (
      <View style={styles.noProfilesContainer}>
        <Text style={styles.noProfilesText}>
          No subscribed profiles available.
        </Text>
      </View>
    );
  }

  return (
    <View>
    <FlatList
      data={subscribedProfiles}
      renderItem={({ item }) => (
        <SubscribedProfileItem podcastWithUserThatUploaded={item} />
      )}
      keyExtractor={(profile) => profile.userid} // Using user_id instead of podcast_id
      horizontal={true} // Enable horizontal scrolling
      showsHorizontalScrollIndicator={false} // Hide scroll indicator for better UI
      contentContainerStyle={styles.listContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={["#1DB954"]}
          tintColor="#1DB954"
          title="Refreshing Profiles..."
          titleColor="#1DB954"
        />
      }
    />
     </View>
  );
};

export default SubscribedProfilesWrapper;

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
    paddingLeft: 10,
    // backgroundColor: "yellow"
  },
  // container: {
  //   height: "20%", 
  // },
});
