import { Client, Account, ID, Databases } from 'react-native-appwrite';

const client = new Client()
    .setProject(process.env.APP_WRITE_PROJECT_ID!)
    .setPlatform(process.env.APP_WRITE_PLATFORM_ID!)
    .setEndpoint(process.env.APP_WRITE_ENDPOINT!)

export const database = new Databases(client)
export const account = new Account(client)

export const DATABASE_ID = "67e11a9c0014ad71a818"
export const CATEGORIES_ID = "67e11aaa00141b675fb0"
export const PRODUCTS_ID = "67e13593001f84146b05"
export const SHOPPING_LIST_ID = "67e5329c0036b3e80be1"