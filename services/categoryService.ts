import { CATEGORIES_ID, database, DATABASE_ID } from "@/lib/appwrite";
import { Alert } from "react-native";
import { ID, Query } from "react-native-appwrite";

export const getUserCategories = async (userId: string) => {
    try {
        const response = await database.listDocuments(DATABASE_ID, CATEGORIES_ID, [
        Query.equal('userId', userId),
        ])

        return response.documents || [];
    } catch (error) {
        console.error('Błąd pobierania kategorii:', error)
        return []
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