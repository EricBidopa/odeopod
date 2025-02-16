import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";
import axios from "axios";
import { useLoginWithEmail } from "@privy-io/expo";

// import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { useLoginWithOAuth, usePrivy } from "@privy-io/expo";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const OnboardingPage = () => {
  const { user } = usePrivy();
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [email, setEmail] = useState("");

  const API_BASE_URL =
    process.env.EXPO_PUBLIC_API_URL || "http://192.168.241.147:3001";

  // const saveUserToDatabase = async (userData) => {
  //   try {
  //     const response = await axios.post(
  //       `${API_BASE_URL}/api/v1/users`,
  //       userData
  //     );
  //     console.log("New User Added:", response.data);
  //   } catch (error) {
  //     console.error("Error Adding user:", error);
  //   }
  // };

  // const { login, state } = useLoginWithOAuth({
  //   onSuccess(user, isNewUser) {
  //     if (isNewUser) {
  //       const userData = {
  //         userId: user.id,
  //         userEmail: user.linked_accounts[0].email,
  //         userUsername: "",
  //         userChannelName: user.linked_accounts[0].name,
  //         userChannelDescription: "",
  //         userProfileImgUrl: "",
  //         userChannelCoverImgUrl: "",
  //         userWalletAddress: "",
  //         userSubscriptions: [],
  //         userNumberOfSubscribers: 0,
  //       };
  //       saveUserToDatabase(userData);

  //       navigation.navigate("ChooseUsernamePage");
  //     }
  //     if (!isNewUser) {
  //       navigation.navigate("HomePage");
  //     }
  //   },

  //   onError(error) {
  //     console.log("Error signing in", error);
  //   },
  // });

  // const handleLoginWithGoogle = () => {
  //   login({ provider: "google" });
  // };

  const { state, sendCode, loginWithCode } = useLoginWithEmail({
    onSendCodeSuccess({ email }) {
      navigation.navigate("OtpPage", { email });

      // show a toast, send analytics event, etc...
    },
    onError(error) {
      console.log(error.message);
      // show a toast, update form errors, etc...
    },
  });

  const handleLogInBtnClicked = () => {
    sendCode({ email });
    console.log(user);
  };

  // const handleLoginWithApple=()=>{
  //   login({ provider: "apple" });
  // }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" />
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.headerText}>OdeoPod</Text>
          
          <Text style={styles.subtext}>
            Millions of Podcasts and ASMR! Earn and Invest in your favorite
            creator on OdeoPod!
          </Text>
        </View>
        <View style={styles.InputAndButtonsWrapper}>
          {/* extracted part begins  */}
          <View
            style={[
              styles.searchContainer,
              isFocused && styles.searchContainerFocused,
            ]}
          >
            <TextInput
              style={styles.searchInput}
              placeholder="Enter Valid Email"
              placeholderTextColor="gray"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={email}
              onChangeText={(text) => {
                const formattedText = text.replace(/\s/g, ""); // Convert to lowercase and remove spaces
                setEmail(formattedText);
              }}
            />
          </View>

          {/* extracted part ends */}
          {state.status === "sending-code" && (
            //  Shows only while the code is sending
            <Text style={styles.statetext}>Sending Code...</Text>
          )}
          <Pressable
            style={({ pressed }) => [
              styles.buttons,
              pressed && styles.buttonPressed,
            ]}
            disabled={state.status === "sending-code"}
            onPress={handleLogInBtnClicked}
            // disabled={state.status === "loading"}
          >
            <Text style={styles.buttonText}>Sign Up / Log In</Text>
          </Pressable>

          {state.status === "error" && (
            <>
              <Text style={{ color: "red" }}>
                There was an error. Input email and Try again
              </Text>
              <Text style={{ color: "lightred" }}>{state.error.message}</Text>
            </>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OnboardingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: "10%",
    paddingTop: "12%",

    // paddingBottom: "15%"
    // alignContent: "center",
    // // justifyContent: 'center',
  },

  wrapper: {
    // backgroundColor: "pink",
    gap: 150,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  InputAndButtonsWrapper: {
    // backgroundColor: "lightblue",
    flexDirection: "column",
    // flex: 1,
    gap: 5,
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
    borderColor: "#1DB954", // Focused border color
    borderWidth: 1.5,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 30,
    alignSelf: "center",
    marginBottom: "7%",
    color: "#1DB954",
  },
  subtext: {
    fontSize: 15,
    color: "white",
  },
  buttons: {
    padding: 17,
    borderColor: "#1DB954",
    backgroundColor: "#1DB954",
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
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
