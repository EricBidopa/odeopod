import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BuyComp = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.textsWrapper}>
        <Text>Share Name: $DDG</Text>
        <Text>Quantity Being Sold: 300</Text>
        <Text>Price 500 USD</Text>
        <Text>Expiration: in 3 days</Text>

      </View>
      <View>
        <Pressable style={styles.buyFromBtnWrapper}>
            <Text style={styles.buttonText}>Buy from him</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default BuyComp

const styles = StyleSheet.create({
    wrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'grey',
        alignItems: 'center',
        borderRadius: 5,
        margin: 5,
        padding: 12
    },
    textsWrapper:{
        flexDirection: 'column',
        gap: 3,
        width: '60%'
    },
    buyFromBtnWrapper:{
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 5
    },
    buttonText:{
        color: 'white',
        fontSize: 10
    }
})