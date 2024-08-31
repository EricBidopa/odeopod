import { StyleSheet, Text, View, Pressable, Button } from "react-native";
import React from "react";
import BuyComp from "../components/BuyComp";
import { useNavigation } from "@react-navigation/native";

const BuyWrapper = ({ showIwantToBuy }) => {
  const navigation = useNavigation();
  if (!showIwantToBuy) {
    return null;
  }
  const handleCreateButButtonClicked = () => {
    navigation.navigate("IWantToBuyPage");
  };
  return (
    <View style={styles.wrapper}>
      <Pressable
        style={styles.createBuyButton}
        onPress={handleCreateButButtonClicked}
      >
        <Text style={styles.buttonText}>Create your own offer</Text>
      </Pressable>
      <BuyComp />
      <BuyComp />
      <BuyComp />
    </View>
  );
};

export default BuyWrapper;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "pink",
    flexDirection: "column",
    flex: 1,
  },
  createBuyButton: {
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
