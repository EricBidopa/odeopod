import { StyleSheet, Text, View, Pressable, Button } from "react-native";
import React from "react";
import SellComp from "../components/SellComp";
import { useNavigation } from "@react-navigation/native";

const SellWrapper = ({ showIwantToSell }) => {
  const navigation = useNavigation();
  if (!showIwantToSell) {
    return null;
  }
  const handleCreateButButtonClicked = () => {
    navigation.navigate("IWantToSellPage");
  };
  return (
    <View style={styles.wrapper}>
      <Pressable
        style={styles.createButton}
        onPress={handleCreateButButtonClicked}
      >
        <Text style={styles.buttonText}>Create your own offer</Text>
      </Pressable>
      <SellComp />
      <SellComp />
      <SellComp />
      <SellComp />
    </View>
  );
};

export default SellWrapper;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "pink",
    flex: 1,
    flexDirection: "column",
  },
  createButton: {
    backgroundColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    // maxHeight: 40
  },
  buttonText: {
    color: "white",
  },
});
