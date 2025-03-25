import { View, Text } from 'react-native'
import React from 'react'

type EmptyListProps = {
    text?: string
}

const EmptyList = ({ text = "Lista jest pusta" }: EmptyListProps) => {
  return (
    <Text className='text-center heading2'>{text}</Text>
  )
}

export default EmptyList