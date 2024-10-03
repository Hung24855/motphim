import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY_FIRE_BASE,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_FIRE_BASE,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL_FIRE_BASE,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID_FIRE_BASE,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_FIRE_BASE,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID_FIRE_BASE,
    appId: process.env.NEXT_PUBLIC_APP_ID_FIRE_BASE,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID_FIRE_BASE
};
// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export const authFirebase = getAuth(appFirebase);
export const dbFirebase = getFirestore(appFirebase);//Lưu trữ tin nhắn real-time
export const storageFirebase = getStorage(appFirebase);//Lưu trữ hình ảnh
