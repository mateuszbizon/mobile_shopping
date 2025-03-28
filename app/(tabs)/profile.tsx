import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'expo-router'

const profile = () => {
    const { user, logout, isLoading } = useAuth()
    const router = useRouter()

    if (!user) {
        router.replace("/sign-in")
        return null
    }

  return (
    <View className='container'>
        <Text className='heading1 text-center mb-8'>Twoje konto</Text>
        <Text className='text-xl font-medium text-dark mb-8'>Użytkownik zalogowany: <Text className='font-semibold'>{user.email}</Text></Text>
        <TouchableOpacity className='btn-primary' onPress={logout} disabled={isLoading}>
            <Text className='btn-text'>{isLoading ? "Wylogowywanie..." : "Wyloguj się"}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default profile