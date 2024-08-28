import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import OrdersWrapper from './OrdersWrapper';

const OrdersPage = () => {
  return (
    <View style={styles.container}>
     <OrdersWrapper />
    </View>
  )
}

export default OrdersPage;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: "5%",
        backgroundColor: "lightblue",
        flex: 1,
      },
})