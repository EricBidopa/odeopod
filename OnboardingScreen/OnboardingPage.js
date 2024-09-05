import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useLoginWithOAuth, usePrivy } from "@privy-io/expo";
import { useNavigation } from "@react-navigation/native";

const OnboardingPage = () => {
  const { user } = usePrivy();
  const navigation = useNavigation();

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

  const handleCreateAccount = async () => {
    try {
      await login({ provider: "google" });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLoginIn = async () => {
    try {
      await login({ provider: "google" });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

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
        <View>
          <Pressable
            style={styles.buttons}
            onPress={handleCreateAccount}
            disabled={state.status === "loading"}
          >
            <Text>
              {state.status === "loading" ? "Loading.." : "Create Account"}
            </Text>
          </Pressable>
          <Pressable
            style={styles.buttons}
            onPress={handleLoginIn}
            disabled={state.status === "loading"}
          >
            <Text>{state.status === "loading" ? "Loading" : "Login..."}</Text>
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
