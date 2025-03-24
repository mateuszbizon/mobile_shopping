import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import { getUserCategories } from '@/services/categoryService';
import { Models } from 'react-native-appwrite';
import { Link, useRouter } from 'expo-router';
import CategoryCard from '@/components/cards/CategoryCard';

const categories = () => {
    const { user, isLoading } = useAuth();
    const [categories, setCategories] = useState<Models.Document[]>([]);
    const router = useRouter()

    if (isLoading) {
        return <ActivityIndicator size={"large"} />
    }

    if (!user) {
        router.replace('/sign-in');
        return null;
    }

    useEffect(() => {
        if (user) {
            fetchCategories();
        }
    }, [user]);

    const fetchCategories = async () => {
        const data = await getUserCategories(user.id);
        setCategories(data);
    };

  return (
    <View className='container'>
        <Link href={"/categories/create"} className='btn-primary mb-8'>
            <Text className='btn-text'>Dodaj kategorię</Text>
        </Link>
        <Text className="heading1 mb-8">Twoje kategorie</Text>
        <FlatList
            data={categories}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <CategoryCard key={item.$id} item={item} />
            )}
        />
    </View>
  )
}

export default categories