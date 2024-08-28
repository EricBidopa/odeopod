import { StyleSheet, Text, View } from "react-native";
import React from "react";
import KanyeImg from "../assets/KanyeCoverArt.jpg";
import RectangularPodcastItem from "../components/RectangularPodcastItem";

const UploadsWrapper = ({show}) => {
    if(!show){
        return null
    }
  return (
    <View style={styles.wrapper}>
      <RectangularPodcastItem
        podcastCoverImg={KanyeImg}
        podcastTitle={"Good Morning by Kanye West by Kanye West by Kanye West"}
        numberOfStreams={200} //${200}
        dateUploaded={"3 weeks ago"}
        usernameThatUploaded={"Jordan Peterson"}
        podcastDescription={"Music video by ¥$ performing SLIDE.2024 YZY"}
      />
      <RectangularPodcastItem
        podcastCoverImg={KanyeImg}
        podcastTitle={"Good Morning by Kanye West by Kanye West by Kanye West"}
        numberOfStreams={200} //${200}
        dateUploaded={"3 weeks ago"}
        usernameThatUploaded={"Jordan Peterson"}
        podcastDescription={"Music video by ¥$ performing SLIDE.2024 YZY"}
      />
      <RectangularPodcastItem
        podcastCoverImg={KanyeImg}
        podcastTitle={"Good Morning by Kanye West by Kanye West by Kanye West"}
        numberOfStreams={200} //${200}
        dateUploaded={"3 weeks ago"}
        usernameThatUploaded={"Jordan Peterson"}
        podcastDescription={"Music video by ¥$ performing SLIDE.2024 YZY"}
      />
      <RectangularPodcastItem
        podcastCoverImg={KanyeImg}
        podcastTitle={"Good Morning by Kanye West by Kanye West by Kanye West"}
        numberOfStreams={200} //${200}
        dateUploaded={"3 weeks ago"}
        usernameThatUploaded={"Jordan Peterson"}
        podcastDescription={"Music video by ¥$ performing SLIDE.2024 YZY"}
      />
    </View>
  );
};

export default UploadsWrapper;

const styles = StyleSheet.create({
    wrapper:{
        flex: 1,
        flexDirection: 'column'
      }
});
