import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TokenItem from './TokenItem'

const TokensWrapper = () => {

  return (
    <View style={styles.wrapper}>
      <TokenItem />
      <TokenItem />
      <TokenItem />

    </View>
  )
}

export default TokensWrapper

const styles = StyleSheet.create({
    wrapper:{
        flexDirection: 'column',
    }
})