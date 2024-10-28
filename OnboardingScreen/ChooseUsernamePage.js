import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import React from "react";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
import { usePrivy } from "@privy-io/expo";

const ChooseUsernamePage = ({ navigation }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = usePrivy();

  const handleCheckUsernameAvailability = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://192.168.35.175:3001/api/v1/users/check-username-availability?userUsername=${username.toLowerCase()}`
      );
      // if status code == 200 proceed with this. axios treats any code aside 2** as an error
      if (response.status === 200){
        setIsUsernameAvailable(true);
        setSuccessMessage("Username available! Tap Continue to proceed.");
        setLoading(false);
      }


    } catch (error) {
      if (error.response && error.response.status === 409) {
        // If the status is 409, it means the username is already taken
        setIsUsernameAvailable(false);
        setErrorMessage("Username already used! Try another one.");
      } else {
        // For any other errors, show a generic error message
        setIsUsernameAvailable(false);
        setErrorMessage("An error occurred. Please try again later.");
        console.error("Error checking username availability:", error);
      }
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    if (!isUsernameAvailable) {
      setErrorMessage("Please check username availability first.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.patch(
        `http://192.168.35.175:3001/api/v1/users/update-username/${user.id}`, // Replace with actual userId from Privy
        { userUsername: username.toLowerCase() }
      );

      if (response.status === 200) {
        navigation.navigate("HomePage");
      } else {
        setErrorMessage("Error updating username. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      console.error("Error updating username:", error);
    } finally {
      setLoading(false);
    }
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
            placeholder="Enter username"
            placeholderTextColor="gray"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={username}
            onChangeText={(text) => {
              const formattedText = text.replace(/\s/g, ""); // Convert to lowercase and remove spaces
              setUsername(formattedText);
              setIsUsernameAvailable(false);
              setErrorMessage("");
              setSuccessMessage("");
            }}
          />
        </View>
        <ErrorMessage message={errorMessage} />
        <SuccessMessage message={successMessage} />

        {!isUsernameAvailable ? (
          <Pressable
            style={styles.buttons}
            onPress={handleCheckUsernameAvailability}
            disabled={loading}
          >
            <Text>{loading ? "loading.." : "Check Username"}</Text>
          </Pressable>
        ) : (
          <Pressable
            style={styles.buttons}
            onPress={handleContinue}
            disabled={loading}
          >
            <Text> {loading ? "loading.." : "Continue"}</Text>
          </Pressable>
        )}
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
    marginVertical: 15,
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
  buttons: {
    padding: 17,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
});
