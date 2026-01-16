import {Client , Account , Databases} from 'react-native-appwrite';

// Initialize Appwrite client
export const client = new Client()
    .setProject('69359e8f001aadf662d5') // Project ID
    .setPlatform('dev.gloriaa.pocketbookmark') // App Platform
    .setEndpoint('https://sfo.cloud.appwrite.io/v1'); // API endpoint

export const account = new Account(client);

export const databases = new Databases(client); // Database ID