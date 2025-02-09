import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import KanyeImg from "../assets/KanyeCoverArt.jpg";
import { Ionicons } from "@expo/vector-icons";
import ProfileModal from "./ProfileModal";
import axios from "axios";
import { usePrivy } from "@privy-io/expo";

const HorizontalProfileinfoComp = ({ isAnotherUserDetails }) => {
  const [showModal, setShowModal] = useState(false);
  const { isReady, user } = usePrivy();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

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
              subscribedto_id: isAnotherUserDetails.userid, // Target user ID
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
  }, [user.id, isAnotherUserDetails.userid]); // Dependencies ensure this runs whenever IDs change

  // const handleSubscribe = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${API_BASE_URL}/api/v1/subscriptions`,
  //       {
  //         subscriber_id: user.id,
  //         subscribedto_id: isAnotherUserDetails.userid,
  //       }
  //     );
  //     console.log("Subscribed successfully:", response.data);
  //     setIsSubscribed(true);
  //   } catch (error) {
  //     console.error(
  //       "Error subscribing:",
  //       error.response?.data || error.message
  //     );
  //   }
  // };

  // const handleUnsubscribe = async () => {
  //   try {
  //     const response = await axios.delete(
  //       `${API_BASE_URL}/api/v1/subscriptions`,
  //       {
  //         data: {
  //           subscriber_id: user.id,
  //           subscribedto_id: isAnotherUserDetails.userid,
  //         },
  //       }
  //     );
  //     console.log("Unsubscribed successfully:", response.data);
  //     setIsSubscribed(false);
  //   } catch (error) {
  //     console.error(
  //       "Error unsubscribing:",
  //       error.response?.data || error.message
  //     );
  //   }
  // };

  return (
    <View style={styles.wrapper}>
      <View style={styles.profileImgView}>
        <Image style={styles.profileImgeStyling} source={KanyeImg} />
      </View>
      <View style={styles.textsWrapperView}>
        <View style={styles.channelNameAndUsername}>
          <Text style={styles.channelName}>
            {isAnotherUserDetails.userchannelname}
          </Text>
          <Text style={styles.smallTexts}>
            @{isAnotherUserDetails.userusername}
          </Text>
        </View>
        <View>
          <Text style={styles.smallTexts}>10M Subscribers</Text>
        </View>
        {isSubscribed ? (
          <Text style={styles.channelName}>'Subscribed'</Text>
        ) : (
          <Text style={styles.channelName}>'Not Subscribed'</Text>
        )}
        <View>
          <Text
            style={styles.smallTexts}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {isAnotherUserDetails.userchanneldescription}
          </Text>
        </View>
      </View>

      <View style={styles.menuWrapperView}>
        <Ionicons
          name="options"
          size={25}
          color="#1DB954"
          onPress={openModal}
        />
      </View>

      <ProfileModal show={showModal} onClose={closeModal} />
    </View>
  );
};

export default HorizontalProfileinfoComp;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    // backgroundColor: "yellow",
    width: "100%",
    height: 130,
    marginBottom: 10,
  },
  profileImgView: {
    // backgroundColor: "lightblue",
    width: 66,
    height: 66,
    overflow: "hidden",
  },
  profileImgeStyling: {
    width: "100%",
    height: "100%",
    borderRadius: 33,
  },
  textsWrapperView: {
    // backgroundColor: "orange",
    flex: 1,
    paddingLeft: 10,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  smallTexts: {
    fontSize: 12,
    color: "gray",
  },
  menuWrapperView: {
    padding: 3,
    alignItems: "center",
    width: "10%",
  },

  buttons: {
    padding: 5,
    borderColor: "black",
    borderWidth: 0.5,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeText: {
    color: "red",
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
  },
  channelName: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
  },
});
