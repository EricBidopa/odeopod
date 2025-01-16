import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import MyUploadsWrapper from "./MyUploadsWrapper";
import KanyeImg from "../assets/KanyeCoverArt.jpg";
import { useRoute } from "@react-navigation/native";
import MyHorizontalProfileinfoComp from "./MyHorizontalProfileinfoComp";
import MyProfileScreenButtonsComp from "./MyProfileScreenButtonsComp";

const MyProfilePage = () => {

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.coverImgView}>
          <Image style={styles.coverImageStyling} source={KanyeImg} />
        </View>
        <MyHorizontalProfileinfoComp/>
        <MyProfileScreenButtonsComp />
        <MyUploadsWrapper/>
      </View>
    </View>
  );
};

export default MyProfilePage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#121212',
    flex: 1,
  },
  wrapper: {
    flexDirection: "column",
    flex: 1,
    gap: 10,
    // backgroundColor: "pink",
    backgroundColor: '#121212',
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
