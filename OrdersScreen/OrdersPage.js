import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import OrdersWrapper from './OrdersWrapper';

const OrdersPage = () => {
const [showOrdersWrapper] = useState(true)
  return (
    <View style={styles.container}>
     <OrdersWrapper show={showOrdersWrapper} />
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