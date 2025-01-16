import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SubscribedProfilesWrapper from "./SubscribedProfilesWrapper";
import LatestFromSubscritionsWrapper from "./LatestFromSubscritionsWrapper";

const SubscriptionsPage = () => {
  return (
    <View style={styles.container}>
      <SubscribedProfilesWrapper />
      <View style={styles.latestfromSubscritionsText}>
        <Text>Latest From Your Subcriptions</Text>
      </View>
      <LatestFromSubscritionsWrapper />
    </View>
  );
};

export default SubscriptionsPage;

const styles = StyleSheet.create({

    container:{
        flex: 1,
        flexDirection: 'column',
        gap: 15,
        backgroundColor: "#121212"
    },
  latestfromSubscritionsText: {
    paddingLeft: 10,
    backgroundColor: "#fffef2",
  },
});
