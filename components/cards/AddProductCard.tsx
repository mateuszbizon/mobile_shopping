import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Models } from 'react-native-appwrite'
import { MaterialIcons } from '@expo/vector-icons'
import AntDesign from '@expo/vector-icons/AntDesign';
import { addProductToShoppingList } from '@/services/shoppingListService';

type AddProductCardProps = {
    product: Models.Document
    deleteAvailableProduct: (productId: string, shoppingListProduct: Models.Document) => void
}

const AddProductCard = ({ product, deleteAvailableProduct }: AddProductCardProps) => {
    const [quantity, setQuantity] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)

    function increaseQuantity() {
        setQuantity(prev => prev + 1)
    }

    function decreaseQuantity() {
        if (quantity <= 1) return

        setQuantity(prev => prev - 1)
    }

    async function handleAddProduct() {
        setIsSubmitting(true)
        const createdProduct = await addProductToShoppingList(product.userId, product.$id, quantity)

        if (createdProduct) {
            console.log('Dodano produkt do listy')
            deleteAvailableProduct(product.$id, createdProduct)
        } else {
            Alert.alert("Błąd serwera", "Spróbuj ponownie później")
        }

        setIsSubmitting(false)
    }

  return (
    <View className='card mb-4'>
        <Text className="heading2 mb-4">{product.name}</Text>
        <Text className='text-xl font-medium mb-4 text-dark'>Kategoria: <Text className='font-normal'>{product.categories.name}</Text></Text>
        <View className='flex flex-row items-center justify-center gap-7 mb-6'>
            <TouchableOpacity onPress={increaseQuantity}>
                <MaterialIcons name='add' size={25} />
            </TouchableOpacity>
            <Text className='text-2xl font-medium text-dark'>{quantity}</Text>
            <TouchableOpacity onPress={decreaseQuantity}>
                <AntDesign name='minus' size={25} />
            </TouchableOpacity>
        </View>
        <TouchableOpacity className='btn-primary' onPress={handleAddProduct}>
            <Text className='btn-text'>{isSubmitting ? "Dodawanie..." : "Dodaj"}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default AddProductCard