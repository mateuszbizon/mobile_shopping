import { View, Text, Alert, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { loginSchema, LoginSchema } from '@/lib/validations/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useRouter } from 'expo-router'
import { account } from '@/lib/appwrite'
import { useAuth } from '@/context/AuthContext'
import { AppwriteException } from 'react-native-appwrite'

const signIn = () => {
    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginSchema>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema)
    })
    const router = useRouter()
    const { saveUser } = useAuth()

    async function onSubmit(data: LoginSchema) {
        try {
            const result = await account.createEmailPasswordSession(data.email, data.password)
            console.log(result)
            saveUser({
                id: result.userId,
                email: data.email
            })
            router.push("/")
        } catch (error) {
            console.error("Błąd podczas logowania:", error)

            if (error instanceof AppwriteException) {
                if (error.code == 401) {
                    Alert.alert("Nieprawidłowe dane", "Adres email lub hasło są nieprawidłowe")
                    return
                }
            }

            Alert.alert("Błąd serwera", "Spróbuj ponownie później")
        }
    }

  return (
    <View className='flex-1 px-5 pt-8 bg-light'>
      <Text className='heading1 mb-8 text-center'>Logowanie</Text>

      <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
                <View className='input-box'>
                    <TextInput
                        className="input"
                        placeholder="Adres email"
                        value={value}
                        onChangeText={onChange}
                    />
                    {errors.email && <Text className="input-error">{errors.email.message}</Text>}
                </View>
            )}
        />

        <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
                <View className='input-box'>
                    <TextInput
                        className="input"
                        placeholder="Hasło"
                        secureTextEntry
                        value={value}
                        onChangeText={onChange}
                    />
                    {errors.password && <Text className="input-error">{errors.password.message}</Text>}
                </View>
            )}
        />

        <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={isSubmitting} className='btn-primary'>
            <Text className='btn-text'>{isSubmitting ? "Poczekaj..." : "Zaloguj się"}</Text>
        </TouchableOpacity>

        <Text className='mt-6 text-xl text-dark text-center'>
            Nie masz konta? <Link href={"/sign-up"}><Text className='text-primary'>Zarejestruj się</Text></Link>
        </Text>
    </View>
  )
}

export default signIn