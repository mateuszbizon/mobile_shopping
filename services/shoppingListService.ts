import { database, DATABASE_ID, SHOPPING_LIST_ID } from "@/lib/appwrite";
import { Query } from "react-native-appwrite";

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