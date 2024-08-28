import { StyleSheet, Text, View, Image, Pressable, ScrollView } from "react-native";
import React from "react";
import KanyeImg from "../assets/KanyeCoverArt.jpg";
import { Ionicons } from "@expo/vector-icons";
import PodcastItemHorizontalProfileComp from "./PodcastItemHorizontalProfileComp";
import StreamDateDesComp from "./StreamDateDesComp";
import OrdersWrapper from "../OrdersScreen/OrdersWrapper";
import { useState } from "react";

const PodcastItemPage = () => {
const [showOrdersWrapper] = useState(true)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.coverImgView}>
          <Image style={styles.coverImageStyling} source={KanyeImg} />
        </View>
        <View style={styles.podcastTitleView}>
          <Text style={styles.podcastTitleText}>
            When things fall apart When things fall apart When things fall apart When things fall apart
          </Text>
        </View>
        <View style={styles.iconsWrapper}>
          <Pressable>
            <Ionicons name="play-circle-outline" size={50} color="black" />
          </Pressable>
          <Pressable>
            <Ionicons name="share-social" size={50} color="black" />
          </Pressable>
        </View>
        <PodcastItemHorizontalProfileComp />
        <StreamDateDesComp />
        <Text>You Own 8 $Jordan Shares</Text>
        <Text>Current $Jordan Share Price: 300 USD</Text>
        <OrdersWrapper show={showOrdersWrapper} />
      </View>
    </ScrollView>
  );
};

export default PodcastItemPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    backgroundColor: "lightblue",
    flex: 1,
  },
  wrapper: {
    backgroundColor: "pink",
    flex: 1,
    flexDirection: "column",
    gap: 5,
  },
  coverImgView: {
    width: "100%",
    height: 300,
    alignItems: 'center'
  },
  coverImageStyling: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  podcastTitleView:{
    backgroundColor: 'white',
    alignContent: 'center',
    alignItems: 'center'
  },
  iconsWrapper:{
    flexDirection: 'row',
    backgroundColor: 'blue',
    gap: 5,
    justifyContent: 'center'
  },
});
