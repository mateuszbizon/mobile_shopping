import { View, Text } from 'react-native'
import React from 'react'
import ProductForm from '@/components/forms/ProductForm'

const create = () => {
  return (
    <View className='container'>
        <Text className='heading1 text-center mb-8'>Dodaj produkt</Text>
        <ProductForm />
    </View>
  )
}

export default create