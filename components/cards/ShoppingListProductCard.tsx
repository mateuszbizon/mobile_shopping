import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import { MaterialIcons } from '@expo/vector-icons'
import { Models } from 'react-native-appwrite'
import { updateShoppingListProduct } from '@/services/shoppingListService'

type ShoppingListProductCardProps = {
    product: Models.Document
}

const ShoppingListProductCard = ({ product }: ShoppingListProductCardProps) => {
    const [quantity, setQuantity] = useState<number>(product.quantity)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [optionsShown, setOptionsShown] = useState(false)

    function increaseQuantity() {
        setQuantity(prev => prev + 1)
    }

    function decreaseQuantity() {
        if (quantity <= 1) return

        setQuantity(prev => prev - 1)
    }

    async function handleUpdateShoppingListProduct() {
        setIsSubmitting(true)
        const updatedProduct = await updateShoppingListProduct(product.$id, quantity)

        if (updatedProduct) {
            console.log("Produkt zedytowany")
            setQuantity(updatedProduct.quantity)
            Alert.alert("Produkt zedytowany", "Produkt w liście zakupów został pomyślnie zedytowany")
        } else {
            Alert.alert("Błąd serwera", "Spróbuj ponownie później")
        }

        setIsSubmitting(false)
    }

  return (
    <View className='card mb-4'>
        <Text className="heading2 mb-4">{product.products.name} x{product.quantity}</Text>
        <Text className='text-xl font-medium mb-4 text-dark'>Kategoria: <Text className='font-normal'>{product.products.categories.name}</Text></Text>
        <View className='flex flex-row justify-between items-center'>
            <TouchableOpacity onPress={() => setOptionsShown(prev => !prev)}>
                <Text className='text-dark text-lg font-medium'>Edytuj</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text className='text-red text-lg font-medium'>Usuń</Text>
            </TouchableOpacity>
        </View>
        {optionsShown && (
            <>
                <View className='flex flex-row items-center justify-center gap-7 mb-6'>
                    <TouchableOpacity onPress={increaseQuantity}>
                        <MaterialIcons name='add' size={25} />
                    </TouchableOpacity>
                    <Text className='text-2xl font-medium text-dark'>{quantity}</Text>
                    <TouchableOpacity onPress={decreaseQuantity}>
                        <AntDesign name='minus' size={25} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity className='btn-primary' onPress={handleUpdateShoppingListProduct}>
                    <Text className='btn-text'>{isSubmitting ? "Edytowanie..." : "Edytuj"}</Text>
                </TouchableOpacity>
            </>
        )}
    </View>
  )
}

export default ShoppingListProductCard