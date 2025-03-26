import { View, Text } from 'react-native'
import React from 'react'

type NotFoundProps = {
    text?: string
}

const NotFound = ({ text = "Element nie znaleziony" }: NotFoundProps) => {
  return (
    <View className='container'>
        <Text className='heading1 text-center'>{text}</Text>
    </View>
  )
}

export default NotFound