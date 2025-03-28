import { Client, Account, ID, Databases } from 'react-native-appwrite';

const client = new Client()
    .setProject("67dd94cf001bbc163210")
    .setPlatform("com.mateusz.mobile_shopping")
    .setEndpoint("https://cloud.appwrite.io/v1")

export const database = new Databases(client)
export const account = new Account(client)

export const DATABASE_ID = "67e11a9c0014ad71a818"
export const CATEGORIES_ID = "67e11aaa00141b675fb0"
export const PRODUCTS_ID = "67e13593001f84146b05"
export const SHOPPING_LIST_ID = "67e5329c0036b3e80be1"