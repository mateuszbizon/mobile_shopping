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

export const updateShoppingListProduct = async (shoppingListId: string, newQuantity: number) => {
    try {
        const response = await database.updateDocument(
            DATABASE_ID,
            SHOPPING_LIST_ID,
            shoppingListId,
            {
                quantity: newQuantity
            }
        );

        return response;
    } catch (error) {
        console.error("Błąd podczas edycji produktu w liście zakupów:", error);
        return null;
    }
}

export const deleteShoppingListProduct = async (shoppingListId: string) => {
    try {
        await database.deleteDocument(DATABASE_ID, SHOPPING_LIST_ID, shoppingListId);
        
        return true;
    } catch (error) {
        console.error("Błąd podczas usuwania produktu z listy zakupów:", error);
        return false;
    }
}