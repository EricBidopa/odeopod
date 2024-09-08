import { View, Text } from 'react-native'
import React from 'react'

const SuccessMessage = ({message}) => {
  return (
    <View>
      <Text style={{color: 'green'}}>{message}</Text>
    </View>
  )
}

export default SuccessMessage;