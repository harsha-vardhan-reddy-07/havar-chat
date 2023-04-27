
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getStorage } from "firebase/storage";
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCvbTox964vmOCXgBlXysEj31Ky0h02eVc",
  authDomain: "havar-chat.firebaseapp.com",
  projectId: "havar-chat",
  storageBucket: "havar-chat.appspot.com",
  messagingSenderId: "253293702887",
  appId: "1:253293702887:web:88fa4ed74954fa983dfc42",
  measurementId: "G-77RN160WM4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();