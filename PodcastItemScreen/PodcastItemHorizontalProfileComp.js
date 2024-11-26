import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import KanyeImg from "../assets/KanyeCoverArt.jpg";
import { useNavigation } from "@react-navigation/native";

const PodcastItemHorizontalProfileComp = ({
  profileImg,
  profileFullName,
  numberOfSubscribers,
}) => {
  const navigation = useNavigation();
  

  const handleInvestPressed = () => {
    navigation.navigate("OrdersPage");
  };

  const handleProfileClicked = () => {
    navigation.navigate("ViewProfilePage");
  };
  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.profileImgView} onPress={handleProfileClicked}>
        <Image style={styles.profileImgStyling} source={KanyeImg} />
      </Pressable>
      <Pressable style={styles.textsWrapper}>
        <Text style={styles.smallTexts} numberOfLines={2} ellipsizeMode="tail">
          Jordan Peterson Jordan Peterson
        </Text>
        <Text style={styles.smallTexts}>10M Subcribers</Text>
      </Pressable>
      {/* <Pressable style={styles.buttons} onPress={handleInvestPressed}>
        <Text>Invest</Text>
      </Pressable> */}
      {/* <Pressable style={styles.buttons}>
        <Text>Subscribe</Text>
      </Pressable> */}
    </View>
  );
};

export default PodcastItemHorizontalProfileComp;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    backgroundColor: "yellow",
    width: "100%",
    height: 80,
    marginVertical: 10,
    alignItems: "center",
    gap: 5,
  },
  profileImgView: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  profileImgStyling: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 25,
  },
  textsWrapper: {
    flexDirection: "column",
    width: "30%",
    backgroundColor: "pink",
  },
  buttons: {
    padding: 3,
    borderColor: "black",
    borderWidth: 0.5,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  smallTexts: {
    fontSize: 12,
    color: "gray",
  },
});
