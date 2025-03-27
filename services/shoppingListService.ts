import { database, DATABASE_ID, SHOPPING_LIST_ID } from "@/lib/appwrite";
import { ID, Query } from "react-native-appwrite";

export const getShoppingList = async (userId: string) => {
    try {
        const response = await database.listDocuments(DATABASE_ID, SHOPPING_LIST_ID, [
            Query.equal("userId", userId),
        ])

        return response.documents;
    } catch (error) {
        console.error("Błąd podczas pobierania listy zakupów:", error);
        return [];
    }
}

export const addProductToShoppingList = async (userId: string, productId: string, quantity: number = 1) => {
    try {
        const response = await database.createDocument(DATABASE_ID, SHOPPING_LIST_ID, ID.unique(), {
            userId,
            products: productId,
            quantity,
        });

        return response;
    } catch (error) {
        console.error("Błąd podczas dodawania produktu do listy zakupów:", error);
        return null;
    }
}