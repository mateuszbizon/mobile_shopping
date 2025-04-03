import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Models } from 'react-native-appwrite'
import { deleteAllShoppingList } from '@/services/shoppingListService'

type ClearShoppingListProps = {
    shoppingList: Models.Document[]
    fetchShoppingList: () => void
}

const ClearShoppingList = ({ shoppingList, fetchShoppingList }: ClearShoppingListProps) => {
    const [isLoading, setIsLoading] = useState(false)

    async function clearShoppingList() {
        setIsLoading(true)
        const result = await deleteAllShoppingList(shoppingList.map(product => product.$id))

        if (result) {
            fetchShoppingList()
            Alert.alert("Lista pusta", "Lista zakupów została wyczyszczona")
        } else {
            Alert.alert("Błąd serwera", "Spróbuj ponownie później")
        }

        setIsLoading(false)
    }

  return (
    <TouchableOpacity onPress={clearShoppingList} className='btn-primary mb-4' disabled={isLoading}>
        <Text className='btn-text'>{isLoading ? "Czysczenie..." : "Wyczyść listę zakupów"}</Text>
    </TouchableOpacity>
  )
}

export default ClearShoppingList