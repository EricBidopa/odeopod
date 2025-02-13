import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const LoadingAnimation = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/loading.json")} // Path to your Lottie file
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

export default LoadingAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  animation: {
    width,
    height,
  },
});
