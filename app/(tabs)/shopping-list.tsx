import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { getShoppingList } from '@/services/shoppingListService'
import { getUserProducts } from '@/services/productService'
import { Models } from 'react-native-appwrite'

const shoppingList = () => {
    const { user } = useAuth()
    const [shoppingList, setShoppingList] = useState<Models.Document[]>([]);
    const [userProducts, setUserProducts] = useState<Models.Document[]>([]);
    const [availableProducts, setAvailableProducts] = useState<Models.Document[]>([]);

    useEffect(() => {
        if (user) {
            fetchData()
        }
    }, [user])

    const fetchData = async () => {
        const shoppingListData = await getShoppingList(user?.id!)
        const userProductsData = await getUserProducts(user?.id!)

        const shoppingListIds = shoppingListData.map(item => item.products.$id)

        const availableProducts = userProductsData.filter(item => !shoppingListIds.includes(item.$id))

        setShoppingList(shoppingListData)
        setUserProducts(userProductsData)
        setAvailableProducts(availableProducts)
    }

  return (
    <View className='container'>
        <FlatList
            data={availableProducts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <Text>{item.name}</Text>
            )}
        />
    </View>
  )
}

export default shoppingList