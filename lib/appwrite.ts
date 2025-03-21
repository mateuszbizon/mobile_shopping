import { Client, Account, ID } from 'react-native-appwrite';

const client = new Client()
    .setProject(process.env.APP_WRITE_PROJECT_ID!)
    .setPlatform(process.env.APP_WRITE_PLATFORM_ID!)
    .setEndpoint(process.env.APP_WRITE_ENDPOINT!)

export const account = new Account(client)