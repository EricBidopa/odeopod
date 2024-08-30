import { StyleSheet, Text, View, Modal, Pressable, Alert } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from 'expo-clipboard'; // Import Clipboard API

const DepositModal = ({ show, onClose }) => {
  const copyToClipboard = () => {
    Clipboard.setStringAsync('0x6c6F9A7249CC0cb865CD9A330610BBF2d79648F7');
    Alert.alert('Address Copied', 'Your ETH on Base Network address has been copied to your clipboard.');
  };

  if (!show) {
    return null;
  }

  return (
    <Modal transparent={true} visible={show} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text>Your ETH Address on Base Network</Text>
          <Pressable style={styles.copyAddressPressable} onPress={copyToClipboard}>
            <Text>0x6c6F9A7249CC0cb865CD9A330610BBF2d79648F7</Text>
            <Ionicons name="copy-outline" size={25} color="black" />
          </Pressable>
          <Pressable onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default DepositModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    gap: 20,
  },
  copyAddressPressable: {
    flexDirection: "row",
    gap: 5,
  },
  modalButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  closeText: {
    color: "red",
    marginTop: 10,
  },
});
