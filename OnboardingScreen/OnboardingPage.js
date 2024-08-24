import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const OnboardingPage = ({navigation}) => {

    const handleCreateAccount = () =>{
        // navigation.navigate('HomePage')
    }

    const handleLoginIn = () =>{
        navigation.navigate('HomePage')
    }



  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.headerText}>OdeoPod</Text>
          <Text style={styles.subtext}>
            Millions of songs and Podcasts! Invest in your favorite artists on
            OdeoPod!
          </Text>
        </View>
        <View>
          <Pressable style={styles.buttons}>
            <Text>Create Account</Text>
          </Pressable>
          <Pressable style={styles.buttons} onPress={handleLoginIn}>
            <Text>Login</Text>
          </Pressable>
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
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
