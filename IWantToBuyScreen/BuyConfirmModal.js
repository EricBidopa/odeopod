import { StyleSheet, Text, View, Pressable, Modal, Alert } from "react-native";
import React from "react";

const BuyConfirmModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }
  return (
    <Modal transparent={true} visible={show} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text>
            Are you sure you want to Buy 100 $Jordan at a total price of 40
            ETH?
          </Text>
          <Pressable style={styles.confirmButton}>
            <Text>Confirm</Text>
          </Pressable>
          <Pressable onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default BuyConfirmModal;

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
  confirmButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    width: '100%'
  },
  closeText: {
    color: "red",
    marginTop: 20,
  },
});
