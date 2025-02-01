import { StyleSheet, Text, View } from "react-native";
import React from "react";

const StreamDateDesComp = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.streamsAndDateView}>
        <Text style={styles.descriptionText}>10K Streams</Text>
        <Text style={styles.descriptionText}>Aug 14, 2024</Text>
      </View>
      <View style={styles.podcastDesView}>
        <Text style={styles.descriptionText}>
          Provided to YouTube by Vydia Revelations 19:1 · more ydia Revelations
          19:1 · more ydia Revelations 19:1 · more ydia Revelations 19:1 · more
          ydia Revelations 19:1 · more
          Provided to YouTube by Vydia Revelations 19:1 · more ydia Revelations
          19:1 · more ydia Revelations 19:1 · more ydia Revelations 19:1 · more
          ydia Revelations 19:1 · more
          Provided to YouTube by Vydia Revelations 19:1 · more ydia Revelations
          19:1 · more ydia Revelations 19:1 · more ydia Revelations 19:1 · more
          ydia Revelations 19:1 · more
        </Text>
      </View>
    </View>
  );
};

export default StreamDateDesComp;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    // backgroundColor: "yellow",
    gap: 5,
  },
  streamsAndDateView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  descriptionText:{
    color: "white"
  },
  podcastDesView:{
    padding:"5%"
  }
});
