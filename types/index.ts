import { Models } from "react-native-appwrite";

export type Product = Models.Document & {
    userId: string
    name: string
    categories: Category
}

export type Category = Models.Document & {
    userId: string
    name: string;
}

export type ShoppingList = Models.Document & {
    userId: string
    quantity: number
    products: Product
}