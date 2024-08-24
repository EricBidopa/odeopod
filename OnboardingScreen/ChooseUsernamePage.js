import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import React from "react";
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
        <TextInput
          style={[styles.textinput, isFocused && styles.inputFocused]}
          placeholder="EricBidopa"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
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
    paddingTop: "16%",
    justifyContent: 'center', // Center content vertically
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
  textinput: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 20,
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
