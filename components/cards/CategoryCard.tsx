import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Models } from 'react-native-appwrite'
import { Link } from 'expo-router'

type CategoryCardProps = {
    item: Models.Document
    confirmDeleteCategory: (category: Models.Document) => void
}

const CategoryCard = ({ item, confirmDeleteCategory }: CategoryCardProps) => {
  return (
    <View className="card mb-4">
        <Text className="heading2 mb-4">{item.name}</Text>
        <View className='flex flex-row items-center justify-between'>
            <Link href={`/categories/update/${item.$id}`}>
                <Text className='text-dark text-lg font-medium'>Edytuj</Text>
            </Link>
            <TouchableOpacity onPress={() => confirmDeleteCategory(item)}>
                <Text className='text-red text-lg font-medium'>Usuń</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default CategoryCard