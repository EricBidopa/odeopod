import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const TrendingPage = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <Text>
          Invest in your favorite artists. Make money as they also earn.
        </Text>
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

        <View style={styles.textsWrapper}>
          <Text>Creator's Name</Text>
          <View style={styles.shareNameAndPrice}>
            <Text>Share Name</Text>
            <Text>Share Price</Text>
          </View>
        </View>

        
      </View>
    </ScrollView>
  );
};

export default TrendingPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "blue",
    flex: 1,
  },
  wrapper: {
    flexDirection: "column",
    gap: 10,
    backgroundColor: "pink",
    paddingBottom: 20, // Adds some padding at the bottom of the scroll
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
  textsWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'lightblue'
  },

  shareNameAndPrice:{
    flexDirection: 'row',
    gap: 5
  }
});
