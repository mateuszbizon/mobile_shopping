import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { getShoppingList } from '@/services/shoppingListService'
import { getUserProducts } from '@/services/productService'
import { Models } from 'react-native-appwrite'
import ShoppingListAddProducts from '@/components/ShoppingListAddProducts'

const shoppingList = () => {
    const { user } = useAuth()
    const [shoppingList, setShoppingList] = useState<Models.Document[]>([]);
    const [userProducts, setUserProducts] = useState<Models.Document[]>([]);
    const [availableProducts, setAvailableProducts] = useState<Models.Document[]>([]);
    const [modalVisible, setModalVisible] = useState(false)

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
        <Text className='heading1 text-center mb-8'>Zmień listę zakupów</Text>
        <TouchableOpacity className='btn-primary mb-8' onPress={() => setModalVisible(true)}>
            <Text className='btn-text'>Dodaj do listy</Text>
        </TouchableOpacity>
        <ShoppingListAddProducts 
            modalVisible={modalVisible} 
            products={availableProducts} 
            onClose={() => setModalVisible(false)} 
        />
    </View>
  )
}

export default shoppingList