import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const MintSharesPage = ({ userName }) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.mintTextHeader}>Mint Your Own Shares</Text>
        <Text>Create your $EricBidopa Shares</Text>
        <View style={styles.horizontalFlex}>
          <Text>Fixed Quantity: </Text>
          <Text>10,000</Text>
        </View>
        <View style={styles.horizontalFlex}>
          <Text>Starting Price Per Share:</Text>
          <Text>$0.00</Text>
        </View>
        <Text>Minting Cost is 0.03 ETH</Text>
        <Text>Estimated Transaction Cost A.K.A gas fees is 0.01 ETH</Text>
        <Text style={styles.finalNoteText}>
          Which means you must have at least 0.04 ETH in your Wallet to mint
          your own shares
        </Text>

        <Pressable style={styles.button}>
          <Text>I have all requirements, Proceed Now</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MintSharesPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
    // backgroundColor: "blue",
  },
  wrapper: {
    flexDirection: "column",
    gap: 10,
    backgroundColor: "pink",
    paddingVertical: 20, // Adds some padding at the bottom of the scroll
    // alignItems: 'center'
  },
  mintTextHeader: {
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
  },
  horizontalFlex: {
    flexDirection: "row",
    gap: 3,
  },
  finalNoteText:{
    color: "red",
    marginTop: 10,
  },
  button: {
    padding: 8, // Slightly increased padding for better touch experience
    borderColor: "black",
    borderWidth: 0.5,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
  },
});
