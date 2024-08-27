import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TokenItem = ({ tokenName, numberOfTokens }) => {
  return (
    <View style={styles.wrapper}>
      <View>
        <Text>{tokenName || "ETH"}</Text>
      </View>
      <View>
        <Text>{numberOfTokens || 20}</Text>
      </View>
    </View>
  );
};

export default TokenItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "lightblue",
    width: "100%",
    marginBottom: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
});
