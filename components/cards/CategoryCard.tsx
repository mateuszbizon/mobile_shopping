import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Models } from 'react-native-appwrite'
import { Link } from 'expo-router'

type CategoryCardProps = {
    item: Models.Document
    confirmDeleteCategory: (category: Models.Document) => void
}

const CategoryCard = ({ item, confirmDeleteCategory }: CategoryCardProps) => {
    const [optionsShown, setOptionsShown] = useState(false)

  return (
    <View className="card mb-4">
        <Text className="heading2 mb-4">{item.name}</Text>
        <TouchableOpacity onPress={() => setOptionsShown(prev => !prev)} className={`${optionsShown && "mb-4"}`}>
            <Text className='text-dark text-lg font-medium'>{optionsShown ? "Schowaj opcje" : "Pokaż opcje"}</Text>
        </TouchableOpacity>
        {optionsShown && (
            <View className='flex flex-row items-center gap-3'>
                <Link href={`/categories/update/${item.$id}`} className='bg-primary p-3 rounded-md'>
                    <Text className='text-dark text-lg'>Edytuj</Text>
                </Link>
                <TouchableOpacity onPress={() => confirmDeleteCategory(item)} className='bg-red p-3 rounded-md'>
                    <Text className='text-white text-lg'>Usuń</Text>
                </TouchableOpacity>
            </View>
        )}
    </View>
  )
}

export default CategoryCard