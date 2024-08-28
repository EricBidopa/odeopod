import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import UploadsWrapper from "./MyUploadsWrapper";
import KanyeImg from "../assets/KanyeCoverArt.jpg";
import HorizontalProfileinfoComp from "./MyHorizontalProfileinfoComp";
import MyProfileScreenButtonsComp from "./MyProfileScreenButtonsComp";

const MyProfilePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.coverImgView}>
          <Image style={styles.coverImageStyling} source={KanyeImg} />
        </View>
        <HorizontalProfileinfoComp />
        <ProfileScreenButtonsComp />
        <UploadsWrapper />
      </View>
    </View>
  );
};

export default MyProfilePage;

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
  coverImgView: {
    backgroundColor: "blue",
    width: "100%",
    height: "15%",
  },
  coverImageStyling: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
 
});
