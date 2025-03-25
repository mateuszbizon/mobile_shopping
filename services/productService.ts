import { database, DATABASE_ID, PRODUCTS_ID } from "@/lib/appwrite";
import { Query } from "react-native-appwrite";

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
};