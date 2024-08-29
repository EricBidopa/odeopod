import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ShareItem from './ShareItem'

const SharesWrapper = ({TrendingList}) => {
  return (
    <View style={styles.wrapper}>
      <ShareItem/>
      <ShareItem/>
      <ShareItem/>
      <ShareItem/>
      <ShareItem/>
      <ShareItem/>
      <ShareItem/>
      <ShareItem/>
      <ShareItem/>
      <ShareItem/>


    </View>
  )
}

export default SharesWrapper

const styles = StyleSheet.create({
    wrapper:{
        flex: 1,
        flexDirection: 'column'
    }
})