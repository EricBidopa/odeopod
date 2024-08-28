import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import KanyeImg from "../assets/KanyeCoverArt.jpg";

const PodcastItemScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.coverImgView}>
          <Image style={styles.coverImgStyling} source={KanyeImg} />
        </View>
        <View></View>
      </View>
    </View>
  );
};

export default PodcastItemScreen;

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
});
