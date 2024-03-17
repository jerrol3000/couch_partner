import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCB3e0JBqZxgxWvSzvcSodzfFvKuIe_GN4",
  authDomain: "couch-partner.firebaseapp.com",
  projectId: "couch-partner",
  storageBucket: "couch-partner.appspot.com",
  messagingSenderId: "708547211921",
  appId: "1:708547211921:web:92fbb5a31b555d91040530",
  measurementId: "G-NZCCP9MRHT",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
