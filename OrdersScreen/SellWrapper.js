import { StyleSheet, Text, View, Pressable, Button } from "react-native";
import React from "react";
import SellComp from "../components/SellComp";

const SellWrapper = ({showIwantToSell}) => {
    if(!showIwantToSell){
        return null
    }
  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.createButton}>
        <Text style={styles.buttonText}>Create your own Buy Offer</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    // maxHeight: 40
  },
  buttonText: {
    color: "white",
  },
});
