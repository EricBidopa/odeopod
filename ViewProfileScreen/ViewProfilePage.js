import { StyleSheet, Text, View, Image, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import KanyeImg from "../assets/KanyeCoverArt.jpg";
import UploadsWrapper from "./UploadsWrapper";
import HorizontalProfileInfoComp from "./HorizontalProfileInfoComp";
import OrdersWrapper from "../OrdersScreen/OrdersWrapper";

const ViewProfilePage = () => {
  const [showUploadsWrapper, setShowUploadsWrapper] = useState(true);
  const [showOrdersWrapper, setShowOrdersWrapper] = useState(false);

  const handleUploadsClicked = () => {
    setShowOrdersWrapper(false);
    setShowUploadsWrapper(true);
  };

  const handleInvestClicked = () => {
    setShowOrdersWrapper(true);
    setShowUploadsWrapper(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View contentContainerStyle={styles.wrapper}>
        <View style={styles.coverImgView}>
          <Image style={styles.coverImageStyling} source={KanyeImg} />
        </View>
        <HorizontalProfileInfoComp />
        <View style={styles.buttonsWrapper}>
          <Pressable
            style={[styles.buttons, showUploadsWrapper && styles.activeButton]}
            onPress={handleUploadsClicked}
          >
            <Text>Uploads</Text>
          </Pressable>
          <Pressable
            style={[styles.buttons, showOrdersWrapper && styles.activeButton]}
            onPress={handleInvestClicked}
          >
            <Text>Invest</Text>
          </Pressable>
          <Pressable style={styles.buttons}>
            <Text>Subscribe</Text>
          </Pressable>
        </View>
        <UploadsWrapper show={showUploadsWrapper} />
        <OrdersWrapper show={showOrdersWrapper} />
      </View>
    </ScrollView>
  );
};

export default ViewProfilePage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  wrapper: {
    flexDirection: "column",
    gap: 10,
    backgroundColor: "pink",
    paddingBottom: 20, // Adds some padding at the bottom of the scroll
  },
  coverImgView: {
    backgroundColor: "blue",
    width: "100%",
    height: 120, // Fixed height for better image handling
  },
  coverImageStyling: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  buttonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "lightpink",
    paddingHorizontal: 20, // Replaced percentage with fixed padding
    alignItems: "center",
  },
  buttons: {
    padding: 8, // Slightly increased padding for better touch experience
    borderColor: "black",
    borderWidth: 0.5,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
  },
  activeButton: {
    backgroundColor: "blue",
  },
});
