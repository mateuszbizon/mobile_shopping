import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useAuth } from '@/context/AuthContext'
import { getProduct } from '@/services/productService'
import { Models } from 'react-native-appwrite'
import ProductForm from '@/components/forms/ProductForm'

const update = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { user } = useAuth()
    const [product, setProduct] = useState<Models.Document | null>(null)

    useEffect(() => {
        const fetchProduct = async () => {
            const product = await getProduct(id)
            setProduct(product)
        }

        fetchProduct()
    }, [user, id])

  return (
    <View className='container'>
        <Text className='heading1 text-center mb-8'>Edytuj produkt</Text>
        {product && <ProductForm product={{
            id: product.$id,
            name: product.name,
            categoryId: product.categories.$id
        }} />}
    </View>
  )
}

export default update