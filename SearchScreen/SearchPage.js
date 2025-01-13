import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import RectangularPodcastItem from "../components/RectangularPodcastItem";
import axios from "axios";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://192.168.67.147:3001";

const SearchPage = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return; // Ignore empty search

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/podcasts/search`,
        {
          params: { query: searchQuery },
        }
      );
      setSearchResults(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch search results");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {/* Search Bar */}
        <View
          style={[
            styles.searchContainer,
            isFocused && styles.searchContainerFocused,
          ]}
        >
          <Ionicons
            name="search"
            size={20}
            color={isFocused ? "blue" : "gray"}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="gray"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch} // Trigger search on Enter
          />
        </View>

        {/* Search Results */}
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.podcast_id.toString()}
            renderItem={({ item }) => <RectangularPodcastItem podcast={item} />}
            ListEmptyComponent={
              !loading && (
                <Text style={styles.noResultsText}>
                  No results found for "{searchQuery}"
                </Text>
              )
            }
          />
        )}
      </View>
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    paddingTop: "5%",
    paddingHorizontal: "5%",
    backgroundColor: "#fffef2",
    flex: 1,
  },
  wrapper: {
    backgroundColor: "#fffef2",
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  searchContainerFocused: {
    borderColor: "black", // Focused border color
    borderWidth: 1.5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  noResultsText: {
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
});
