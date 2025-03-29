import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { deleteShoppingListProduct, getShoppingList } from '@/services/shoppingListService'
import { getUserProducts } from '@/services/productService'
import { Models } from 'react-native-appwrite'
import ShoppingListAddProducts from '@/components/ShoppingListAddProducts'
import EmptyList from '@/components/EmptyList'
import ShoppingListProductCard from '@/components/cards/ShoppingListProductCard'
import Refresh from '@/components/Refresh'

const shoppingList = () => {
    const { user } = useAuth()
    const [shoppingList, setShoppingList] = useState<Models.Document[]>([]);
    const [availableProducts, setAvailableProducts] = useState<Models.Document[]>([]);
    const [modalVisible, setModalVisible] = useState(false)
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Models.Document | null>(null)

    useEffect(() => {
        if (user) {
            fetchData()
        }
    }, [user])

    const fetchData = async () => {
        setIsLoading(true)
        const shoppingListData = await getShoppingList(user?.id!)
        const userProductsData = await getUserProducts(user?.id!)

        const shoppingListIds = shoppingListData.map(item => item.products.$id)

        const availableProducts = userProductsData.filter(item => !shoppingListIds.includes(item.$id))

        setShoppingList(shoppingListData)
        setAvailableProducts(availableProducts)
        setIsLoading(false)
    }

    const confirmDeleteProduct = (product: Models.Document) => {
        setSelectedProduct(product);
        setDeleteModalVisible(true);
    }

    const handleDeleteProduct = async () => {
        if (!selectedProduct) return;

        const deletedCategory = await deleteShoppingListProduct(selectedProduct.$id);

        if (deletedCategory) {
            fetchData()
        }

        setDeleteModalVisible(false)

    }

  return (
    <View className='container'>
        <Text className='heading1 text-center mb-8'>Zmień listę zakupów</Text>
        <TouchableOpacity className='btn-primary mb-8' onPress={() => setModalVisible(true)}>
            <Text className='btn-text'>Dodaj do listy</Text>
        </TouchableOpacity>
        <Refresh refreshFn={fetchData} />
        <ShoppingListAddProducts 
            modalVisible={modalVisible} 
            products={availableProducts}
            setProducts={setAvailableProducts} 
            onClose={() => setModalVisible(false)}
            setShoppingList={setShoppingList} 
        />
        {isLoading ? (
            <ActivityIndicator size={"large"} />
        ) : (
            <>
                <Text className='heading2 mb-4'>{shoppingList.length} produktów</Text>
                <FlatList
                    data={shoppingList}
                    keyExtractor={(item) => item.$id}
                    renderItem={({ item }) => (
                        <ShoppingListProductCard key={item.$id} product={item} confirmDeleteProduct={confirmDeleteProduct} />
                    )}
                    ListEmptyComponent={() => <EmptyList text='Nie dodano jeszcze produktów do listy zakupów' />}
                />
            </>
        )}
        <Modal visible={deleteModalVisible} transparent={true} animationType="slide">
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white p-6 rounded-lg w-80">
                    <Text className="text-xl font-bold text-dark">Usuń produkt</Text>
                    <Text className="text-gray-600 my-6 text-lg">
                        Czy na pewno chcesz usunąć produkt "{selectedProduct?.products.name}" z listy zakupów?
                    </Text>
                    <View className="flex-row justify-center gap-3">
                        <TouchableOpacity className='btn-primary' onPress={() => setDeleteModalVisible(false)}>
                            <Text className='btn-text'>Anuluj</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='btn-delete' onPress={handleDeleteProduct}>
                            <Text className='btn-text-white'>Usuń</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    </View>
  )
}

export default shoppingList