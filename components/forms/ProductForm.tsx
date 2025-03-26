import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Controller, useForm } from 'react-hook-form'
import { productSchema, ProductSchema } from '@/lib/validations/productSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Models } from 'react-native-appwrite'
import { getUserCategories } from '@/services/categoryService'
import { Picker } from "@react-native-picker/picker";
import { addProduct, updateProduct } from '@/services/productService'
import EmptyList from '../EmptyList'
import { Link } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'

type ProductFormProps = {
    product?: {
        id: string
        name: string
        categoryId: string
    }
}

const ProductForm = ({ product }: ProductFormProps) => {
    const { user } = useAuth()
    const { control, handleSubmit, formState: { errors, isSubmitting }, setValue, reset } = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: product ? product.name : ""
        }
    })
    const [categories, setCategories] = useState<Models.Document[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (user) {
            fetchCategories();
        }
    }, [user]);

    const fetchCategories = async () => {
        setIsLoading(true)

        const data = await getUserCategories(user?.id!)
        setCategories(data);

        if (data.length > 0) {
            setValue("categoryId", product ? product.categoryId : data[0].$id)
        }

        setIsLoading(false)
    }

    async function onSubmit(data: ProductSchema) {
        console.log(data)
        
        if (!product) {
            const createdProduct = await addProduct(user?.id!, data.name.toLowerCase(), data.categoryId)

            if (createdProduct) {
                reset()
            }

            return
        }

        await updateProduct(product.id, data.name.toLowerCase(), data.categoryId)
    }

    if (isLoading) return <ActivityIndicator size={"large"} />

    if (categories.length == 0 && !isLoading) {
        return <EmptyList text='Nie dodano jeszcze żadnej kategorii' />
    }

  return (
    <View>
        <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
                <View className='input-box'>
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        className="input"
                        placeholder="Nazwa produktu"
                    />
                    {errors.name && <Text className="input-error">{errors.name.message}</Text>}
                </View>
            )}
        />

        <Text className="text-lg mb-2 text-dark">Kategoria:</Text>
        <Controller
            control={control}
            name="categoryId"
            render={({ field: { onChange, value } }) => (
                <View className='input-box'>
                    <Picker
                        selectedValue={value}
                        onValueChange={onChange}
                        className="input"
                    >
                        {categories.map((category) => (
                            <Picker.Item key={category.$id} label={category.name} value={category.$id} />
                        ))}
                    </Picker>
                    {errors.categoryId && <Text className="input-error">{errors.categoryId.message}</Text>}
                </View>
            )}
        />

        <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={isSubmitting} className='btn-primary'>
            <Text className='btn-text'>{isSubmitting ? "Poczekaj..." : "Dodaj produkt"}</Text>
        </TouchableOpacity>

        <Link href={"/products"} className='mt-8'>
            <Text>
                <View className='flex flex-row items-center gap-3'>
                    <MaterialIcons name="arrow-back" size={20} />
                    <Text className='text-xl font-medium'>Powrót do produktów</Text>
                </View>
            </Text>
        </Link>
    </View>
  )
}

export default ProductForm