import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import TokensWrapper from "./TokensWrapper";
import { useNavigation } from "@react-navigation/native";

const WalletPage = () => {
    const navigation = useNavigation()
    const handleTrendingClicked = ()=>{
        navigation.navigate("TrendingPage")
    }
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.walletBalHeaderText}>Balance</Text>
          <Text style={styles.subHeaderText}>*Market Value*</Text>
        </View>
        <View style={styles.balanceValueView}>
          <Text style={styles.balanceValueText}>US$ 200</Text>
        </View>
        <View style={styles.horizontalLayoutButtons}>
          <Text style={styles.subHeaderText}>My Wallet</Text>
          <Pressable style={styles.buttons} onPress={handleTrendingClicked}>
            <Text>Trending Shares</Text>
          </Pressable>
        </View>
        <View style={styles.horizontalLayoutButtons}>
          <Pressable style={styles.buttons}>
            <Text>Deposit</Text>
          </Pressable>
          <Pressable style={styles.buttons}>
            <Text>Withdraw</Text>
          </Pressable>
        </View>
        <TokensWrapper />
      </View>
    </View>
  );
};

export default WalletPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  wrapper: {
    flexDirection: "column",
    flex: 1,
    gap: 10,
    backgroundColor: "pink",
  },
  walletBalHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333", // Darker text for better contrast
  },
  subHeaderText: {
    fontSize: 16,
    color: "#666", // Lighter color for subheader
  },
  balanceValueView: {
    backgroundColor: "orange",
    alignItems: "center",
    borderRadius: 10, // Optional: Rounded corners for balance value container
    paddingVertical: 10, // Added padding for better spacing
  },
  balanceValueText: {
    fontSize: 45,
    // fontWeight: 'bold',
  },
  horizontalLayoutButtons: {
    flexDirection: "row",
    justifyContent: "space-between", // Changed to space-between for better alignment
    marginVertical: 7,
    paddingHorizontal: 60,
    alignItems: 'center'
  },
  buttons: {
    padding: 10,
    borderColor: "black",
    borderWidth: 0.5,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
  },
  //   buttonText: {
  //     fontSize: 16,
  //     fontWeight: '600',
  //     color: '#333',
  //   },
});
