import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import KanyeImg from "../assets/KanyeCoverArt.jpg";
import { Ionicons } from "@expo/vector-icons";
import MyProfileModal from "./MyProfileModal";
import { useEffect } from "react";
import { usePrivy } from "@privy-io/expo";
import axios from "axios";
import LoadingAnimation from "../components/LoadingAnimation";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://192.168.242.147:3001";

const MyHorizontalProfileinfoComp = () => {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    username: "fetching..",
    userChannelName: "fetching..",
    userChannelDescription: "fetching...",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = usePrivy();

  const fetchUserInfo = async () => {
    try {
      // Determine which user ID to use
      const userId = user?.id;

      if (!userId) {
        setError("No user ID available from privy");
        console.log("No user Id available from Privy");
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/api/v1/users/${userId}`
      );
      const fetchedUserData = response.data;

      setUserData({
        username: fetchedUserData.userusername,
        userChannelName: fetchedUserData.userchannelname,
        userChannelDescription: fetchedUserData.userchanneldescription,
      });
    } catch (error) {
      console.error("Error fetching user info:", error);
      setError("Error fetching user info");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchUserInfo();
  }, [user?.id]); // Dependency on both user ID and isAnotherUserDetails

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  if (loading) {
    return <ActivityIndicator size="large" color="#1DB954" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.profileImgView}>
        <Image style={styles.profileImgeStyling} source={KanyeImg} />
      </View>
      <View style={styles.textsWrapperView}>
        <View style={styles.channelNameAndUsername}>
          <Text style={styles.channelName}>{userData.userChannelName}</Text>
          <Text style={styles.smallTexts}>@{userData.username}</Text>
        </View>
        <View>
          <Text style={styles.smallTexts}>10M Subscribers</Text>
        </View>
        <View>
          <Text
            style={styles.smallTexts}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {userData.userChannelDescription}
          </Text>
        </View>
      </View>

      {/* Only show options menu for own profile */}
      <View style={styles.menuWrapperView}>
        <Ionicons
          name="options"
          size={25}
          color="#1DB954"
          onPress={openModal}
        />
      </View>

      <MyProfileModal show={showModal} onClose={closeModal} />
    </View>
  );
};

export default MyHorizontalProfileinfoComp;

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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimmed background
  },
  modalContent: {
    width: 250,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
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
