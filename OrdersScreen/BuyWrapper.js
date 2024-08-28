import { StyleSheet, Text, View, Pressable, Button } from "react-native";
import React from "react";
import BuyComp from "./BuyComp";

const BuyWrapper = ({showIwantToBuy}) => {
    if(!showIwantToBuy){
        return null
    }

  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.createButton}>
        <Text style={styles.buttonText}>Create your own Sell Offer</Text>
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
    flex: 1
  },
  createButton: {
    backgroundColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    // maxHeight: 40

  },
  buttonText: {
    color: "white",
  },
});
