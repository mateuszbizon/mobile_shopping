import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useForm, Controller } from 'react-hook-form';
import React from 'react'
import { registerSchema, ResgisterSchema } from '@/lib/validations/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import { account } from '@/lib/appwrite';
import { AppwriteException, ID } from 'react-native-appwrite';

const signUp = () => {
    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResgisterSchema>({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
        resolver: zodResolver(registerSchema)
    })
    const router = useRouter()

    async function onSubmit(data: ResgisterSchema) {
        try {
            const result = await account.create(ID.unique(), data.email, data.password)
            console.log(result)
            router.push("/sign-in")
        } catch (error) {
            console.error("Błąd podczas logowania:", error)

            if (error instanceof AppwriteException) {
                if (error.code == 409) {
                    Alert.alert("Użytkownik zajęty", "Użytkownik z podanym adresem email już istnieje")
                    return
                }
            }

            Alert.alert("Błąd serwera", "Spróbuj ponownie później")
        }
    }

  return (
    <View className='flex-1 px-5 pt-8 bg-light'>
        <Text className='heading1 mb-8 text-center'>Rejestracja</Text>

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

        <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
                <View className='input-box'>
                    <TextInput
                        className="input"
                        placeholder="Powtórz hasło"
                        secureTextEntry
                        value={value}
                        onChangeText={onChange}
                    />
                    {errors.confirmPassword && <Text className="input-error">{errors.confirmPassword.message}</Text>}
                </View>
            )}
        />

        <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={isSubmitting} className='btn-primary'>
            <Text className='btn-text'>Zarejestruj się</Text>
        </TouchableOpacity>

        <Text className='mt-6 text-xl text-dark text-center'>
            Masz już konto? <Link href={"/sign-in"}><Text className='text-primary'>Zaloguj się</Text></Link>
        </Text>
    </View>
  )
}

export default signUp