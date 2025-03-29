import { CATEGORIES_ID, database, DATABASE_ID } from "@/lib/appwrite";
import { Alert } from "react-native";
import { ID, Query } from "react-native-appwrite";

export const getUserCategories = async (userId: string) => {
    try {
        const response = await database.listDocuments(DATABASE_ID, CATEGORIES_ID, [
            Query.equal('userId', userId),
            Query.limit(100)
        ])

        return response.documents || [];
    } catch (error) {
        console.error('Błąd pobierania kategorii:', error)
        return []
    }
}

export const getCategory = async (categoryId: string) => {
    try {
        const response = await database.getDocument(DATABASE_ID, CATEGORIES_ID, categoryId)

        return response || null;
    } catch (error) {
        console.error('Błąd pobierania kategorii:', error)
        return null
    }
}

export const createCategory = async (userId: string, name: string) => {
    try {
        const category = await database.createDocument(DATABASE_ID, CATEGORIES_ID, ID.unique(), {
            name,
            userId,
        });

        Alert.alert("Kategoria dodana", "Kategoria została dodana pomyślnie")
        return category || null;
    } catch (error) {
        console.error('Błąd dodawania kategorii:', error);
        Alert.alert("Błąd serwera", "Spróbuj ponownie później")
        return null
    }
}

export const updateCategory = async (categoryId: string, newName: string) => {
    try {
        const updatedCategory = await database.updateDocument(
            DATABASE_ID,
            CATEGORIES_ID,
            categoryId,
            { name: newName }
        );
        Alert.alert("Kategoria zedytowana", "Kategoria została zedytowana pomyślnie")
        return updatedCategory;
    } catch (error) {
        console.error('Błąd edycji kategorii:', error);
        Alert.alert("Błąd serwera", "Spróbuj ponownie później")
        return null;
    }
}

export const deleteCategory = async (categoryId: string) => {
    try {
        await database.deleteDocument(
            DATABASE_ID,
            CATEGORIES_ID,
            categoryId
        );
        return true;
    } catch (error) {
        console.error('Błąd usuwania kategorii:', error);
        Alert.alert("Błąd serwera", "Spróbuj ponownie później")
        return false;
    }
}