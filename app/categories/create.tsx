import { View, Text } from 'react-native'
import React from 'react'
import CategoryForm from '@/components/forms/CategoryForm'

const create = () => {
  return (
    <View className='container'>
      <Text className='heading1 mb-8 text-center'>Dodaj kategorię</Text>
      <CategoryForm />
    </View>
  )
}

export default create