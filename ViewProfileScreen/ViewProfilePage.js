import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import UploadsWrapper from "./UploadsWrapper";
import KanyeImg from "../assets/KanyeCoverArt.jpg";
import { useRoute } from "@react-navigation/native";
import HorizontalProfileinfoComp from "./HorizontalProfileInfoComp";

const ViewProfilePage = () => {
  // Access the route and its parameters
  const route = useRoute();
  const {podcastWithUserThatUploaded={}} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.coverImgView}>
          <Image style={styles.coverImageStyling} source={KanyeImg} />
        </View>
        <HorizontalProfileinfoComp
          isAnotherUserDetails={podcastWithUserThatUploaded}
        />
        <View style={styles.uploadtextView}>
          <Text style={styles.uploadtext}>Uploads:</Text>
        </View>
        <UploadsWrapper isAnotherUserDetails={podcastWithUserThatUploaded} />
      </View>
    </View>
  );
};

export default ViewProfilePage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "#121212",
    flex: 1,
  },
  wrapper: {
    flexDirection: "column",
    flex: 1,
    gap: 10,
    // backgroundColor: "pink",
    backgroundColor: "#121212",
  },
  coverImgView: {
    // backgroundColor: "blue",
    width: "100%",
    height: "15%",
  },
  coverImageStyling: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  uploadtext:{
    color: "white",
    fontWeight: "bold"
  }
});
