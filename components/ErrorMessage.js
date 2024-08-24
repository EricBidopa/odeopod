import { View, Text } from 'react-native'
import React from 'react'

const ErrorMessage = ({message}) => {
  return (
    <View>
      <Text style={{color: 'red'}}>{message}</Text>
    </View>
  )
}

export default ErrorMessage;