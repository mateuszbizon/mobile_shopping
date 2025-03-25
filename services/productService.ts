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

export const getProduct = async (productId: string) => {
    try {
        const response = await database.getDocument(DATABASE_ID, PRODUCTS_ID, productId)

        return response || null;
    } catch (error) {
        console.error('Błąd pobierania kategorii:', error)
        return null
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

export const updateProduct = async (productId: string, newName: string, categoryId: string) => {
    try {
        const updatedCategory = await database.updateDocument(
            DATABASE_ID,
            PRODUCTS_ID,
            productId,
            {
                name: newName,
                categories: categoryId
            }
        )

        Alert.alert("Produkt zedytowany", "Produkt został zedytowany pomyślnie")
        return updatedCategory;
    } catch (error) {
        console.error('Błąd edycji produktu:', error);
        Alert.alert("Błąd serwera", "Spróbuj ponownie później")
        return null;
    }
}

export const deleteProduct = async (productId: string) => {
    try {
        await database.deleteDocument(
            DATABASE_ID,
            PRODUCTS_ID,
            productId
        );
        return true;
    } catch (error) {
        console.error('Błąd usuwania produktu:', error);
        Alert.alert("Błąd serwera", "Spróbuj ponownie później")
        return false;
    }
}