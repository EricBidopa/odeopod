import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const MyProfileModal = ({ show, onClose }) => {
  const navigation = useNavigation();
  if (!show) {
    return null;
  }

  // const handleMintSharesClicked = () => {
  //   navigation.navigate("MintSharesPage");
  //   onClose()
  // };

  return (
    <Modal
      transparent={true}
      visible={show}
      onRequestClose={onClose} // Use the onClose prop to close the modal
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Pressable
            style={styles.modalButton}
            onPress={() => console.log("Share Profile pressed")}
          >
            <Text style={styles.buttonText}>Share Profile</Text>
          </Pressable>
          {/* <Pressable
            style={styles.modalButton}
            onPress={handleMintSharesClicked}
          >
            <Text style={styles.buttonText}>Mint My Shares</Text>
          </Pressable> */}
          <Pressable onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default MyProfileModal;

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
    backgroundColor: "#1DB954",
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
  }
});
