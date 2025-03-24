import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { categorySchema, CategorySchema } from '@/lib/validations/categorySchema'
import { createCategory, updateCategory } from '@/services/categoryService'
import { useAuth } from '@/context/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'

type CategoryFormProps = {
    category?: {
        id: string
        name: string
    }
}

const CategoryForm = ({ category }: CategoryFormProps) => {
    const { user } = useAuth()
    const { control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CategorySchema>({
        defaultValues: {
            name: category ? category.name : ""
        },
        resolver: zodResolver(categorySchema)
    })

    async function onSubmit(data: CategorySchema) {
        console.log(data)
        if (!category) {
            const createdCategory = await createCategory(user?.id!, data.name.toLowerCase())

            if (createdCategory) {
                reset()
            }

            return
        }

        await updateCategory(category.id, data.name.toLowerCase())
    }

  return (
    <View>
        <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
                <View className='input-box'>
                    <TextInput
                        className="input"
                        placeholder="Nazwa"
                        value={value}
                        onChangeText={onChange}
                    />
                    {errors.name && <Text className="input-error">{errors.name.message}</Text>}
                </View>
            )}
        />

        <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={isSubmitting} className='btn-primary'>
            <Text className='btn-text'>{isSubmitting ? "Poczekaj..." : category ? "Edytuj kategorię" : "Dodaj kategorię"}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default CategoryForm