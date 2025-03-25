import { View, Text, FlatList, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Models } from 'react-native-appwrite'
import { deleteProduct, getUserProducts } from '@/services/productService'
import { useAuth } from '@/context/AuthContext'
import ProductCard from '@/components/cards/ProductCard'
import { Link } from 'expo-router'

const products = () => {
    const { user } = useAuth()
    const [products, setProducts] = useState<Models.Document[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Models.Document | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (user) {
            fetchProducts()
        }
    }, [user])

    const fetchProducts = async () => {
        const products = await getUserProducts(user?.id!)
        setProducts(products)
    }

    const confirmDeleteProduct = (product: Models.Document) => {
        setSelectedProduct(product);
        setModalVisible(true);
    }

    const handleDeleteCategory = async () => {
        if (!selectedProduct) return;

        const deletedProduct = await deleteProduct(selectedProduct.$id);

        if (deletedProduct) {
            fetchProducts();
            setModalVisible(false);
        } else {
            setModalVisible(false)
        }

    }

  return (
    <View className='container'>
        <Link href={"/products/create"} className='btn-primary mb-8'>
            <Text className='btn-text'>Dodaj produkt</Text>
        </Link>
        <Text className='heading1 mb-8'>Twoje produkty</Text>
        <FlatList
            data={products}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <ProductCard key={item.$id} item={item} confirmDeleteProduct={confirmDeleteProduct} />
            )}
        />
        <Modal visible={modalVisible} transparent={true} animationType="slide">
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white p-6 rounded-lg w-80">
                    <Text className="text-xl font-bold text-dark">Usuń produkt</Text>
                    <Text className="text-gray-600 my-6 text-lg">
                        Czy na pewno chcesz usunąć produkt "{selectedProduct?.name}"?
                    </Text>
                    <View className="flex-row justify-center gap-3">
                        <TouchableOpacity className='btn-primary' onPress={() => setModalVisible(false)}>
                            <Text className='btn-text'>Anuluj</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='btn-delete' onPress={handleDeleteCategory}>
                            <Text className='btn-text-white'>Usuń</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    </View>
  )
}

export default products