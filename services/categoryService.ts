import { CATEGORIES_ID, database, DATABASE_ID } from "@/lib/appwrite";
import { Query } from "react-native-appwrite";

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