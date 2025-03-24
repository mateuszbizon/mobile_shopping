import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useAuth } from '@/context/AuthContext'
import { getCategory } from '@/services/categoryService'
import { Models } from 'react-native-appwrite'
import CategoryForm from '@/components/forms/CategoryForm'

const update = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { user } = useAuth()
    const [category, setCategory] = useState<Models.Document | null>(null)

    useEffect(() => {
        if (user) {
            const fetchCategory = async () => {
                const category = await getCategory(id)
                setCategory(category)
            }

            fetchCategory()
        }
    }, [id, user])

  return (
    <View className='container'>
      <Text className='heading1 text-center mb-8'>Edytuj kategorię</Text>
      {category && <CategoryForm category={{ id: category.$id, name: category.name }} />}
    </View>
  )
}

export default update