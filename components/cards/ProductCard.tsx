import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Models } from 'react-native-appwrite'

type ProductCardProps = {
    item: Models.Document
    confirmDeleteProduct: (product: Models.Document) => void
}

const ProductCard = ({ item, confirmDeleteProduct }: ProductCardProps) => {
  return (
    <View className="card mb-4">
        <Text className="heading2 mb-4">{item.name}</Text>
        <Text className='text-xl font-medium mb-4 text-dark'>Kategoria: <Text className='font-normal'>{item.categories.name}</Text></Text>
        <View className='flex flex-row items-center justify-between'>
            <Link href={`/products/update/${item.$id}`}>
                <Text className='text-dark text-lg font-medium'>Edytuj</Text>
            </Link>
            <TouchableOpacity onPress={() => confirmDeleteProduct(item)}>
                <Text className='text-red text-lg font-medium'>Usuń</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default ProductCard