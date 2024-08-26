import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import SubscribedProfileItem from './SubscribedProfileItem';

const SubscribedProfilesWrapper = () => {
  return (
    <View style={styles.wrapper}>
      <SubscribedProfileItem />
      <SubscribedProfileItem />
      <SubscribedProfileItem />
      <SubscribedProfileItem />
      <SubscribedProfileItem />
    </View>
  )
}

export default SubscribedProfilesWrapper;

const styles = StyleSheet.create({
    wrapper:{
        flexDirection: 'row',
        paddingVertical: 10,
        paddingLeft: 10,
        backgroundColor: 'yellow'
    },
    
})