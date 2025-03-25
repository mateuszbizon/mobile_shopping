import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Models } from 'react-native-appwrite'
import { getUserProducts } from '@/services/productService'
import { useAuth } from '@/context/AuthContext'
import ProductCard from '@/components/cards/ProductCard'
import { Link } from 'expo-router'

const products = () => {
    const { user } = useAuth()
    const [products, setProducts] = useState<Models.Document[]>([])

    useEffect(() => {
        if (user) {
            fetchProducts()
        }
    }, [user])

    const fetchProducts = async () => {
        const products = await getUserProducts(user?.id!)
        setProducts(products)
    }

  return (
    <View className='container'>
        <Link href={"/"} className='btn-primary mb-8'>
            <Text className='btn-text'>Dodaj produkt</Text>
        </Link>
        <Text className='heading1 mb-8'>Twoje produkty</Text>
        <FlatList
            data={products}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <ProductCard key={item.$id} item={item} />
            )}
        />
    </View>
  )
}

export default products