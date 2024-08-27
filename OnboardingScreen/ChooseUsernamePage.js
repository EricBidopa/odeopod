import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import React from "react";
import { Feather } from "@expo/vector-icons";
import ErrorMessage from "../components/ErrorMessage";

const ChooseUsernamePage = ({ navigation }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleContinue = () => {
    navigation.navigate("HomePage");
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.headerText}>OdeoPod</Text>
        <Text style={styles.subtext}>Choose A Username:</Text>
        <View
          style={[
            styles.searchContainer,
            isFocused && styles.searchContainerFocused,
          ]}
        >
          <Feather
            name="at-sign"
            size={20}
            color={isFocused ? "blue" : "gray"}
            style={styles.atIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Eric Bidopa"
            placeholderTextColor="gray"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
        <ErrorMessage message={"Username already used. Try another one"} />
        <Pressable style={styles.buttons} onPress={handleContinue}>
          <Text>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ChooseUsernamePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    paddingHorizontal: "10%",
    paddingTop: "12%",
    justifyContent: "center", // Center content vertically
  },
  wrapper: {
    backgroundColor: "pink",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 30,
    alignSelf: "center",
    marginBottom: "7%",
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
    marginVertical: 15
  },
  searchContainerFocused: {
    borderColor: "black", // Focused border color
    borderWidth: 1.5,
  },
  atIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  inputFocused: {
    borderColor: "blue",
    borderWidth: 1.5,
  },
  buttons: {
    padding: 17,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
});
