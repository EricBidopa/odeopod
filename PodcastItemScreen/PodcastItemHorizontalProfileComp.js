import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import KanyeImg from "../assets/KanyeCoverArt.jpg";
import { useNavigation } from "@react-navigation/native";
import { usePrivy } from "@privy-io/expo";
import axios from "axios";

const PodcastItemHorizontalProfileComp = ({
  podcastWithUserThatUploaded = {},
}) => {
  const navigation = useNavigation();
  const { isReady, user } = usePrivy();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const API_BASE_URL =
    process.env.EXPO_PUBLIC_API_URL || "http://192.168.242.147:3001";

  // Check subscription status when the component mounts
  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/subscriptions/status`,
          {
            params: {
              subscriber_id: user.id, // Current user ID
              subscribedto_id: podcastWithUserThatUploaded.userid, // Target user ID
            },
          }
        );
        setIsSubscribed(response.data.isSubscribed); // Backend should return a boolean
      } catch (error) {
        console.error(
          "Error checking subscription status:",
          error.response?.data || error.message
        );
      }
    };

    checkSubscriptionStatus();
  }, [user.id, podcastWithUserThatUploaded.userid]); // Dependencies ensure this runs whenever IDs change

  const handleSubscribe = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/subscriptions`,
        {
          subscriber_id: user.id,
          subscribedto_id: podcastWithUserThatUploaded.userid,
        }
      );
      console.log("Subscribed successfully:", response.data);
      setIsSubscribed(true);
    } catch (error) {
      console.error(
        "Error subscribing:",
        error.response?.data || error.message
      );
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/v1/subscriptions`,
        {
          data: {
            subscriber_id: user.id,
            subscribedto_id: podcastWithUserThatUploaded.userid,
          },
        }
      );
      console.log("Unsubscribed successfully:", response.data);
      setIsSubscribed(false);
    } catch (error) {
      console.error(
        "Error unsubscribing:",
        error.response?.data || error.message
      );
    }
  };

  const handleProfileClicked = () => {
    podcastWithUserThatUploaded?.userid !== user.id
      ? navigation.navigate("ViewProfilePage", { podcastWithUserThatUploaded })
      : navigation.navigate("Profile");
  };

  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.profileImgView} onPress={handleProfileClicked}>
        <Image style={styles.profileImgStyling} source={KanyeImg} />
      </Pressable>
      <Pressable style={styles.textsWrapper} onPress={handleProfileClicked}>
        <Text style={styles.smallTexts} numberOfLines={2} ellipsizeMode="tail">
          @{podcastWithUserThatUploaded.userchannelname}
        </Text>
        <Text style={styles.smallTexts}>10M Subscribers</Text>
      </Pressable>
      {podcastWithUserThatUploaded.userid !== user.id &&
        (isSubscribed ? (
          <Pressable style={styles.buttons} onPress={handleUnsubscribe}>
            <Text>Unsubscribe</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.buttons} onPress={handleSubscribe}>
            <Text style={styles.buttonText}>Subscribe</Text>
          </Pressable>
        ))}
    </View>
  );
};

export default PodcastItemHorizontalProfileComp;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    // backgroundColor: "yellow",
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
    // backgroundColor: "pink",
  },
  buttons: {
    padding: 8,
    borderColor: "black",
    borderWidth: 0.5,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#1DB954",
  },
  smallTexts: {
    fontSize: 12,
    color: "white",
  },
});
