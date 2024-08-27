import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const ProfileScreenButtonsComp = () => {
  return (
    <View style={styles.buttonsWrapper}>
      <Text>Uploads</Text>
      <Pressable style={styles.buttons}>
        <Text>Settings</Text>
      </Pressable>
      <Pressable style={styles.buttons}>
        <Text>Upload</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreenButtonsComp;

const styles = StyleSheet.create({
  buttonsWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'lightpink',
    paddingHorizontal: '7%',
    alignItems: 'center'
  },
  buttons: {
    padding: 3,
    borderColor: "black",
    borderWidth: 0.5,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
  },
});
