import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import BuyWrapper from "./BuyWrapper";
import SellWrapper from "./SellWrapper";

const OrdersWrapper = ({show}) => {
    if(!show){
        return null
    }
  const [showIwantToSell, setShowIwantToSell] = useState(false);
  const [showIwantToBuy, setShowIwantToBuy] = useState(true);

  const handleIwantToBuy = () => {
    setShowIwantToBuy(true);
    setShowIwantToSell(false);
  };

  const handleIwantToSell = () => {
    setShowIwantToSell(true);
    setShowIwantToBuy(false);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.buyOrSellButtonsWrapper}>
        <Pressable
          onPress={handleIwantToBuy}
          style={[styles.button, showIwantToBuy && styles.activeButton]}
        >
          <Text style={[styles.text, showIwantToBuy && styles.activeText]}>
            I want to buy
          </Text>
        </Pressable>
        <Pressable
          onPress={handleIwantToSell}
          style={[styles.button, showIwantToSell && styles.activeButton]}
        >
          <Text style={[styles.text, showIwantToSell && styles.activeText]}>
            I want to sell
          </Text>
        </Pressable>
      </View>
      <BuyWrapper showIwantToBuy={showIwantToBuy} />
      <SellWrapper showIwantToSell={showIwantToSell} />
    </View>
  );
};

export default OrdersWrapper;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    flex: 1,
    gap: 5,
    // paddingTop: 7
    // backgroundColor: 'blue'
  },
  buyOrSellButtonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "blue", // Change to your preferred active color
  },
  text: {
    fontSize: 16,
    color: "black",
  },
  activeText: {
    color: "white", // Change to your preferred text color for the active state
  },
});
