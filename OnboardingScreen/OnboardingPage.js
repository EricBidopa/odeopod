import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

// import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { useLoginWithOAuth, usePrivy} from "@privy-io/expo";
import { useNavigation } from "@react-navigation/native";
// import { useState } from "react";

const OnboardingPage = () => {


  // const [userEmail, setUserEmail] = useState(
  //   Constants.expoConfig?.extra?.email || ""
  // );
  // const [otpCode, setOtpCode] = useState("");

  const { user } = usePrivy();
  const navigation = useNavigation();

  
  // if (user) {
  //   navigation.navigate("HomePage");
  // }

  
  const { login, state } = useLoginWithOAuth({
    onSuccess(user, isNewUser) {
      if (isNewUser) {
        navigation.navigate("ChooseUsernamePage");
      }
      if (!isNewUser) {
        navigation.navigate("HomePage");
      }
    },

    // },
    onError(error) {
      console.log("Error signing in", error);
    },
  });

  // const {sendCode, loginWithCode} = useLoginWithEmail({
  //   onSendCodeSuccess({userEmail}) {
  //   },
  // });



  // const handleSendCodeToEmail = () => {
  //   sendCode({ userEmail });
  // };

  // const handleVerifyOtpCode = () => {
  //   loginWithCode({ code: otpCode, email: userEmail });

  // };

  const handleLoginWithGoogle = () => {
    login({ provider: "google" });
  };

  // const handleLoginWithApple = () => {
  //   login({ provider: "apple" });
  // };

  // if user is already authenticated, then show the homepage to the user.
 
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.headerText}>OdeoPod</Text>
          <Text style={styles.subtext}>
            Millions of songs and Podcasts! Invest in your favorite artists on
            OdeoPod!
          </Text>
        </View>
        <View style={styles.InputAndButtonsWrapper}>
          {/* <TextInput
            value={userEmail}
            onChangeText={setUserEmail}
            placeholder="Type Your Email"
            style={styles.input}
            inputMode="email"
          /> */}
          <Pressable
            style={styles.buttons}
            onPress={handleLoginWithGoogle}
            disabled={state.status === "loading"}
          >
            <Text>{ state.status === "loading" ? 'Loading': 'Login/Sign Up With Google'}</Text>
          </Pressable>

          {state.status === "error" && (
            <>
              <Text style={{ color: "red" }}>There was an error</Text>
              <Text style={{ color: "lightred" }}>{state.error.message}</Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default OnboardingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    paddingHorizontal: "10%",
    paddingVertical: "50%",
    alignContent: "center",
    // justifyContent: 'center',
  },
  wrapper: {
    backgroundColor: "pink",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  InputAndButtonsWrapper: {
    backgroundColor: "lightblue",
    flexDirection: "column",
    // flex: 1,
    gap: 5,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 30,
    alignSelf: "center",
    marginBottom: "7%",
  },
  subtext: {
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
