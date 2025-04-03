import { View, Text, Modal, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Models } from 'react-native-appwrite'
import { MaterialIcons } from '@expo/vector-icons'
import AddProductCard from './cards/AddProductCard'
import EmptyList from './EmptyList'
import SearchProducts from './SearchProducts'

type ShoppingListAddProductsProps = {
    modalVisible: boolean
    products: Models.Document[]
    setProducts: React.Dispatch<React.SetStateAction<Models.Document[]>>
    setShoppingList: React.Dispatch<React.SetStateAction<Models.Document[]>>
    setSearchedShoppingList: React.Dispatch<React.SetStateAction<Models.Document[]>>
    onClose: () => void
}

const ShoppingListAddProducts = ({ modalVisible, products, onClose, setProducts, setShoppingList, setSearchedShoppingList }: ShoppingListAddProductsProps) => {
const [searchedProducts, setSearchedProducts] = useState<Models.Document[]>([])

    function deleteAvailableProduct(productId: string, shoppingListProduct: Models.Document) {
        setProducts(products.filter(product => product.$id !== productId))
        setShoppingList(prev => [shoppingListProduct, ...prev])
        setSearchedShoppingList(prev => [shoppingListProduct, ...prev])
    }

    useEffect(() => {
        setSearchedProducts([...products])
    }, [products])

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View className='p-4 bg-white rounded-lg shadow-md flex-1'>
            <Text className="heading2 text-center mb-8">Wybierz produkty</Text>
            <SearchProducts products={products} setSearchProducts={setSearchedProducts} />
            <TouchableOpacity onPress={onClose} className='mb-8'>
                <Text>
                    <View className='flex flex-row items-center gap-3'>
                        <MaterialIcons name="arrow-back" size={20} />
                        <Text className='text-xl font-medium'>Powrót</Text>
                    </View>
                </Text>
            </TouchableOpacity>
            <FlatList
                data={searchedProducts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <AddProductCard key={item.$id} product={item} deleteAvailableProduct={deleteAvailableProduct} />
                )}
                ListEmptyComponent={() => <EmptyList text='Brak dostępnych produktów' />}
            />
        </View>
    </Modal>
  )
}

export default ShoppingListAddProducts