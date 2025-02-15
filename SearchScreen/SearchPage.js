import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import RectangularPodcastItem from "../components/RectangularPodcastItem";
import SquarePodcastItem from "../components/SquarePodcastItem";
import axios from "axios";
import LoadingAnimation from "../components/LoadingAnimation";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://192.168.89.147:3001";

const SearchPage = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [allPodcasts, setAllPodcasts] = useState([]);
  const [loadingPodcasts, setLoadingPodcasts] = useState(false);

  // Fetch all podcasts when component mounts and when search query becomes empty
  useEffect(() => {
    const fetchAllPodcasts = async () => {
      setLoadingPodcasts(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/podcasts`);
        setAllPodcasts(response.data);
      } catch (err) {
        console.error("Error fetching podcasts:", err);
      } finally {
        setLoadingPodcasts(false);
      }
    };

    if (!searchQuery.trim()) {
      fetchAllPodcasts();
    }
  }, [searchQuery]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/podcasts/search`,
        {
          params: { query: searchQuery },
        }
      );

      setSearchResults(response.data);
    } catch (err) {
      console.error("Search error:", err.response?.data);
      setError("Failed to fetch search results");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading || loadingPodcasts) {
      return <LoadingAnimation />;
    }

    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

    if (searchQuery.trim()) {
      return (
        <FlatList
          key="single"
          data={searchResults}
          keyExtractor={(item) => item.podcast_id.toString()}
          renderItem={({ item }) => (
            <RectangularPodcastItem podcastWithUserThatUploaded={item} />
          )}
          ListEmptyComponent={
            hasSearched &&
            !loading && (
              <Text style={styles.noResultsText}>
                No results found for "{searchQuery}"
              </Text>
            )
          }
        />
      );
    } else {
      return (
        <FlatList
          key="double"
          data={allPodcasts}
          keyExtractor={(item) => item.podcast_id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.gridContent}
          renderItem={({ item }) => (
            <SquarePodcastItem
              podcastWithUserThatUploaded={item}
              numColumns={2}
            />
          )}
        />
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View
          style={[
            styles.searchContainer,
            isFocused && styles.searchContainerFocused,
          ]}
        >
          <Ionicons
            name="search"
            size={20}
            color="#B3B3B3"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="What do you want to listen to?"
            placeholderTextColor="#B3B3B3"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </View>

        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: "5%",
    paddingHorizontal: "5%",
    backgroundColor: "#121212",
    flex: 1,
  },
  wrapper: {
    backgroundColor: "#121212",
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#282828",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchContainerFocused: {
    backgroundColor: "#333",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
  },
  errorText: {
    color: "#ff4444",
    textAlign: "center",
    marginTop: 20,
  },
  noResultsText: {
    color: "#B3B3B3",
    textAlign: "center",
    marginTop: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
});

export default SearchPage;
