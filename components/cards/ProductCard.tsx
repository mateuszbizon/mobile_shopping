import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { Models } from 'react-native-appwrite'

type ProductCardProps = {
    item: Models.Document
    confirmDeleteProduct: (product: Models.Document) => void
}

const ProductCard = ({ item, confirmDeleteProduct }: ProductCardProps) => {
    const [optionsShown, setOptionsShown] = useState(false)

  return (
    <View className="card mb-4">
        <Text className="heading2 mb-4">{item.name}</Text>
        <Text className='text-xl font-medium mb-4 text-dark'>Kategoria: <Text className='font-normal'>{item.categories.name}</Text></Text>
        <TouchableOpacity onPress={() => setOptionsShown(prev => !prev)} className={`${optionsShown && "mb-4"}`}>
            <Text className='text-dark text-lg font-medium'>{optionsShown ? "Schowaj opcje" : "Pokaż opcje"}</Text>
        </TouchableOpacity>
        {optionsShown && (
            <View className='flex flex-row items-center gap-3'>
                <Link href={`/products/update/${item.$id}`} className='bg-primary p-3 rounded-md'>
                    <Text className='text-dark text-lg'>Edytuj</Text>
                </Link>
                <TouchableOpacity onPress={() => confirmDeleteProduct(item)} className='bg-red p-3 rounded-md'>
                    <Text className='text-white text-lg'>Usuń</Text>
                </TouchableOpacity>
            </View>
        )}
    </View>
  )
}

export default ProductCard