import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Models } from 'react-native-appwrite'
import { MaterialIcons } from '@expo/vector-icons'

type AddProductCardProps = {
    product: Models.Document
}

const AddProductCard = ({ product }: AddProductCardProps) => {
    const [quantity, setQuantity] = useState(1)

    function increaseQuantity() {
        setQuantity(prev => prev + 1)
    }

    function decreaseQuantity() {
        if (quantity <= 1) return

        setQuantity(prev => prev - 1)
    }

  return (
    <View className='card mb-4'>
        <Text className="heading2 mb-4">{product.name}</Text>
        <Text className='text-xl font-medium mb-4 text-dark'>Kategoria: <Text className='font-normal'>{product.categories.name}</Text></Text>
        <View className='flex flex-row items-center justify-center gap-7 mb-6'>
            <TouchableOpacity onPress={increaseQuantity}>
                <MaterialIcons name='add' size={25} />
            </TouchableOpacity>
            <Text className='text-2xl font-medium text-dark'>{quantity}</Text>
            <TouchableOpacity onPress={decreaseQuantity}>
                <MaterialIcons name="add" size={25} />
            </TouchableOpacity>
        </View>
        <TouchableOpacity className='btn-primary'>
            <Text className='btn-text'>Dodaj</Text>
        </TouchableOpacity>
    </View>
  )
}

export default AddProductCard