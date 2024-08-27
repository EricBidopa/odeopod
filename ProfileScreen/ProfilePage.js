import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import UploadsWrapper from "./UploadsWrapper";
import KanyeImg from "../assets/KanyeCoverArt.jpg";
import HorizontalProfileinfoComp from "./HorizontalProfileinfoComp";
import ProfileScreenButtonsComp from "./ProfileScreenButtonsComp";

const ProfilePage = () => {
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

export default ProfilePage;

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
