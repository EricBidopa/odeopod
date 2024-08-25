import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import SquarePodcastItem from "../components/SquarePodcastItem";
import KanyeImg from '../assets/KanyeCoverArt.jpg'

const SquarePodcastsWrapper = ({ podcasts }) => {
  return (
    <View>
      {/* <FlatList data={podcasts} renderItem={() => <SquarePodcastItem /> } /> */}
      <SquarePodcastItem
        podcastCoverImg={KanyeImg}
        podcastTitle={'Good Morning by Kanye West'}
        usernameThatUploaded={'Kanye West'}
      />
       <SquarePodcastItem
        podcastCoverImg={KanyeImg}
        podcastTitle={'Good Morning by Kanye West'}
        usernameThatUploaded={'Kanye West'}
      />
    </View>
  );
};

export default SquarePodcastsWrapper;

const styles = StyleSheet.create({});
