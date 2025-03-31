import { TextInput } from 'react-native'
import React, { useState } from 'react'
import { Models } from 'react-native-appwrite'

type SearchShoppingListProps = {
    products: Models.Document[]
    setSearchProducts: React.Dispatch<React.SetStateAction<Models.Document[]>>
}

const SearchShoppingList = ({ products, setSearchProducts }: SearchShoppingListProps) => {
    const [value, setValue] = useState("")

    function onChangeText(text: string) {
        setValue(text)

        if (text === "") {
            setSearchProducts([...products])
            return
        }

        const searchedProducts = products.filter(product => product.products.name.includes(text.toLowerCase()))

        setSearchProducts([...searchedProducts])
    }

  return (
    <TextInput
        value={value}
        onChangeText={onChangeText}
        className='input !mb-4' 
        placeholder='Szukaj...'
    />
  )
}

export default SearchShoppingList