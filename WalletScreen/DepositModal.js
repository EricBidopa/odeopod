import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import React from "react";

const DepositModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }
  return (
    <Modal transparent={true} visible={show} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
            <Text>Your ETH Address on Base Network</Text>
          <Pressable>
            <Text>0x6c6F9A7249CC0cb865CD9A330610BBF2d79648F7</Text>
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
      },
      modalButton: {
        backgroundColor: "#2196F3",
        padding: 10,
        marginVertical: 10,
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
