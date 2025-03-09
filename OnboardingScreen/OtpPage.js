import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { useLoginWithEmail, usePrivy } from "@privy-io/expo";
import { useLinkEmail } from "@privy-io/expo";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "react-native";

const OtpPage = ({ route }) => {
  const { user } = usePrivy;
  const navigation = useNavigation();
  const { email } = route.params;
  const [otpCode, setOtpCode] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const API_BASE_URL =
    process.env.EXPO_PUBLIC_API_URL || "http://192.168.234.147:3001";

  const saveUserIdAndEmailToDatabase = async (useridAndEmail) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/users`,
        useridAndEmail
      );
      console.log(
        "New User Created and userId Added to Database",
        response.data
      );
    } catch (error) {
      console.error(
        "Error Creating New User or Adding userId added to Database".error
      );
    }
  };

  const { state, loginWithCode } = useLoginWithEmail({
    onLoginSuccess(user, isNewUser) {
      if (isNewUser) {
        const userData = {
          userId: user.id,
          userEmail: email.toLowerCase(),
        };
        saveUserIdAndEmailToDatabase(userData);
        navigation.navigate("ChooseUsernamePage");
      } else if (!isNewUser) {
        navigation.navigate("HomePage");
      }
    },
    onError(error) {
      console.log(error.message);
      // show a toast, update form errors, etc...
    },
  });

  const handleVerifyBtnClicked = () => {
    loginWithCode({ code: otpCode, email: email });
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.headerText}>OdeoPod</Text>
          <Text style={styles.subtext}>Enter OTP:</Text>
          <View
            style={[
              styles.searchContainer,
              isFocused && styles.searchContainerFocused,
            ]}
          >
            <TextInput
              style={styles.searchInput}
              placeholder="Enter OTP Code Sent to Email"
              placeholderTextColor="gray"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={otpCode}
              onChangeText={(text) => {
                const formattedText = text.replace(/\s/g, ""); // Convert to lowercase and remove spaces
                setOtpCode(formattedText);
              }}
            />
          </View>
          <Text style={styles.subtext}>{email.toLowerCase()}</Text>
          {state.status === "submitting-code" && (
            // Shows only while the login is being attempted
            <Text style={styles.statetext}>Logging in...</Text>
          )}
          <Pressable
            style={({ pressed }) => [
              styles.buttons,
              pressed && styles.buttonPressed,
            ]}
            disabled={state.status !== "awaiting-code-input"}
            onPress={handleVerifyBtnClicked}
          >
            <Text style={styles.buttonText}>Verify Code</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default OtpPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: "10%",
    paddingTop: "12%",
    justifyContent: "center", // Center content vertically
  },
  wrapper: {
    // backgroundColor: "pink",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  headerText: {
    fontWeight: "bold",
    color: "#1DB954",
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
    height: 55,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginVertical: 15,
  },
  searchContainerFocused: {
    borderColor: "black", // Focused border color
    borderWidth: 1.5,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  buttons: {
    padding: 17,
    borderColor: "#1DB954",
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  subtext: {
    color: "white",
  },
  buttonPressed: {
    backgroundColor: "#1DB954",
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
  },
  statetext: {
    color: "white",
  },
});
