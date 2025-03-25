import { database, DATABASE_ID, PRODUCTS_ID } from "@/lib/appwrite";
import { Alert } from "react-native";
import { ID, Query } from "react-native-appwrite";

export const getUserProducts = async (userId: string) => {
    try {
        const response = await database.listDocuments(
            DATABASE_ID,
            PRODUCTS_ID,
            [
                Query.equal('userId', userId),
            ]
        )

        return response.documents
    } catch (error) {
        console.error('Błąd pobierania produktów:', error)
        return []
    }
}

export const addProduct = async (userId: string, name: string, categoryId: string) => {
    try {
        const response = await database.createDocument(
            DATABASE_ID,
            PRODUCTS_ID,
            ID.unique(),
            {
                name,
                userId,
                categories: categoryId,
            }
        )

        Alert.alert("Produkt dodany", "Produkt został dodany pomyślnie")
        return response;
    } catch (error) {
        console.error('Błąd dodawania produktu:', error);
        Alert.alert("Bład serwera", "Spróbuj ponownie później")
        return null;
    }
}