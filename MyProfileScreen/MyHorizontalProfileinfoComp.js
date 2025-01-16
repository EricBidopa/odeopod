import {
  StyleSheet,
  Text,
  View,
  Image,
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

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://192.168.163.147:3001";

const MyHorizontalProfileinfoComp = () => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("fetching..");
  const [userChannelName, setUserChannelName] = useState("fetching..");
  const [userChannelDescription, setUserChannelDescription] =
    useState("fetching...");
  const { isReady, user, logout } = usePrivy();

  useEffect(() => {
    // Fetch user info when component mounts
    if (!user?.id) return;
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/users/${user.id}`
        );
        const userData = response.data;
        console.log(userData);
        setUsername(userData.userusername);
        setUserChannelName(userData.userchannelname);
        setUserChannelDescription(userData.userchanneldescription);
      } catch (error) {
        setErrorMessage("Error fetching user info");
        console.log(error);
      }
    };
    fetchUserInfo();
  }, [user]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.profileImgView}>
        <Image style={styles.profileImgeStyling} source={KanyeImg} />
      </View>
      <View style={styles.textsWrapperView}>
        <View style={styles.channelNameAndUsername}>
          <Text style={styles.channelName}>{userChannelName}</Text>
          <Text style={styles.smallTexts}>@{username}</Text>
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
            {userChannelDescription}
          </Text>
        </View>
      </View>
      <View style={styles.menuWrapperView}>
        <Ionicons name="options" size={25} color="black" onPress={openModal} />
      </View>
      <MyProfileModal show={showModal} onClose={closeModal} />
    </View>
  );
};

export default MyHorizontalProfileinfoComp;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    backgroundColor: "yellow",
    width: "100%",
    height: 130,
    marginBottom: 10,
  },
  profileImgView: {
    backgroundColor: "lightblue",
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
    backgroundColor: "orange",
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
});
