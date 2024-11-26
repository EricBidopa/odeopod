import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import React from "react";
import SquarePodcastItem from "../components/SquarePodcastItem";
import KanyeImg from '../assets/KanyeCoverArt.jpg'

const SquarePodcastsWrapper = ({ podcasts }) => {
  return (
    <ScrollView>
      {/* <FlatList data={podcasts} renderItem={() => <SquarePodcastItem /> } /> */}
      <SquarePodcastItem
        podcastCoverImg={KanyeImg}
        podcastTitle={'Good Morning by Kanye West  Kanye West  Kanye West  Kanye West'}
        usernameThatUploaded={'Kanye West'}
      />
       <SquarePodcastItem
        podcastCoverImg={KanyeImg}
        podcastTitle={'Good Morning by Kanye West'}
        usernameThatUploaded={'Kanye West'}
      />
    </ScrollView>
  );
};

export default SquarePodcastsWrapper;

const styles = StyleSheet.create({});
