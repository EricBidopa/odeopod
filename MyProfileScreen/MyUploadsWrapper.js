import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import RectangularPodcastItem from '../components/RectangularPodcastItem'
import KanyeImg from '../assets/KanyeCoverArt.jpg'


const MyUploadsWrapper = () => {
  return (
    <View style={styles.wrapper}>
      <RectangularPodcastItem
        podcastCoverImg={KanyeImg}
        podcastTitle={"Good Morning by Kanye West by Kanye West by Kanye West"}
        numberOfStreams={200} //${200}
        dateUploaded={'3 weeks ago'}
        usernameThatUploaded={'Jordan Peterson'}
        podcastDescription={'Music video by ¥$ performing SLIDE.2024 YZY'}
      />
      <RectangularPodcastItem
        podcastCoverImg={KanyeImg}
        podcastTitle={"Good Morning by Kanye West by Kanye West by Kanye West"}
        numberOfStreams={200} //${200}
        dateUploaded={'3 weeks ago'}
        usernameThatUploaded={'Jordan Peterson'}
        podcastDescription={'Music video by ¥$ performing SLIDE.2024 YZY'}
      />
      <RectangularPodcastItem
        podcastCoverImg={KanyeImg}
        podcastTitle={"Good Morning by Kanye West by Kanye West by Kanye West"}
        numberOfStreams={200} //${200}
        dateUploaded={'3 weeks ago'}
        usernameThatUploaded={'Jordan Peterson'}
        podcastDescription={'Music video by ¥$ performing SLIDE.2024 YZY'}
      />
      <RectangularPodcastItem
        podcastCoverImg={KanyeImg}
        podcastTitle={"Good Morning by Kanye West by Kanye West by Kanye West"}
        numberOfStreams={200} //${200}
        dateUploaded={'3 weeks ago'}
        usernameThatUploaded={'Jordan Peterson'}
        podcastDescription={'Music video by ¥$ performing SLIDE.2024 YZY'}
      />
    </View>
  )
}

export default MyUploadsWrapper

const styles = StyleSheet.create({
    wrapper:{
        flex: 1,
        flexDirection: 'column'
      }
})