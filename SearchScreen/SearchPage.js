import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import RectangularPodcastsWrapper from "./RectangularPodcastsWrapper";

const SearchPage = () => {
  const [isFocused, setIsFocused] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("ALL");

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
            color={isFocused ? "blue" : "gray"}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="gray"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
        <View style={styles.ButtonsWrapper}>
          <Pressable style={styles.buttons}>
            <Text>ALL</Text>
          </Pressable>
          <Pressable style={styles.buttons}>
            <Text>PODCASTS</Text>
          </Pressable>
          <Pressable style={styles.buttons}>
            <Text>MUSIC</Text>
          </Pressable>
        </View>
        <RectangularPodcastsWrapper />
      </View>
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    paddingTop: "5%",
    paddingHorizontal: "5%",
    backgroundColor: "lightblue",
    flex: 1,
  },
  wrapper: {
    backgroundColor: "pink",
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  ButtonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "lightpink",
    paddingHorizontal: "7%",
  },
  buttons: {
    padding: 5,
    borderColor: "black",
    borderWidth: 0.5,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "black",
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
});
