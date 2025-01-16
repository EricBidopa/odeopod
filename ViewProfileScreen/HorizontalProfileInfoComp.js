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
import ProfileModal from "./ProfileModal";

  const HorizontalProfileinfoComp = ({ isAnotherUserDetails }) => {
    const [showModal, setShowModal] = useState(false);
   
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    
    return (
      <View style={styles.wrapper}>
        <View style={styles.profileImgView}>
          <Image 
            style={styles.profileImgeStyling} 
            source={KanyeImg} 
          />
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
              color="black" 
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
  },
  channelName: {
    fontSize: 13,
    fontWeight: 'bold',
  }
});
