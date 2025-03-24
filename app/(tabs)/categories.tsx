import { View, Text, ActivityIndicator, FlatList, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import { deleteCategory, getUserCategories } from '@/services/categoryService';
import { Models } from 'react-native-appwrite';
import { Link, useRouter } from 'expo-router';
import CategoryCard from '@/components/cards/CategoryCard';

const categories = () => {
    const { user, isLoading } = useAuth();
    const [categories, setCategories] = useState<Models.Document[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Models.Document | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
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

    const confirmDeleteCategory = (category: Models.Document) => {
        setSelectedCategory(category);
        setModalVisible(true);
    };

    const handleDeleteCategory = async () => {
        if (!selectedCategory) return;

        const deletedCategory = await deleteCategory(selectedCategory.$id);

        if (deletedCategory) {
            fetchCategories();
            setModalVisible(false);
        } else {
            setModalVisible(false)
        }

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
                <CategoryCard key={item.$id} item={item} confirmDeleteCategory={confirmDeleteCategory} />
            )}
        />
        <Modal visible={modalVisible} transparent={true} animationType="slide">
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white p-6 rounded-lg w-80">
                    <Text className="text-xl font-bold text-dark">Usuń kategorię</Text>
                    <Text className="text-gray-600 my-6 text-lg">
                        Czy na pewno chcesz usunąć kategorię "{selectedCategory?.name}"?
                    </Text>
                    <View className="flex-row justify-center gap-3">
                        <TouchableOpacity className='btn-primary' onPress={() => setModalVisible(false)}>
                            <Text className='btn-text'>Anuluj</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='btn-delete' onPress={handleDeleteCategory}>
                            <Text className='btn-text-white'>Usuń</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    </View>
  )
}

export default categories