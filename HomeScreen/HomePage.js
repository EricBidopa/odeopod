import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import SquarePodcastsWrapper from "./SquarePodcastsWrapper";

const HomePage = () => {
  return (
    <View style={styles.container}>
        <View style={styles.wrapper}>

    {/* <View style={styles.buttonsWrapper}>
      <Pressable style={styles.buttons}><Text>ALL</Text></Pressable>
      <Pressable style={styles.buttons}><Text>PODCASTS</Text></Pressable>
      <Pressable style={styles.buttons}><Text>MUSIC</Text></Pressable>

     </View> */}
     <Text>Excellent Podcasts for you</Text>
     <SquarePodcastsWrapper />
    </View>
        </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    paddingTop: "5%",
    paddingHorizontal: "5%",
    backgroundColor: 'lightblue',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    flex: 1,
  },
  wrapper:{
    backgroundColor: 'blue',
    width: '100%',
    height: '100%'
  },
  buttonsWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'lightpink',
    paddingHorizontal: '7%',
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
