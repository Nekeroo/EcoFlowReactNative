// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXmlweHiCnBlZLJhRWe6o-LyjLKJk-_m0",
  authDomain: "ecoflow-15f1c.firebaseapp.com",
  projectId: "ecoflow-15f1c",
  storageBucket: "ecoflow-15f1c.firebasestorage.app",
  messagingSenderId: "99916427550",
  appId: "1:99916427550:web:3f8f72570683e16a01990f",
  measurementId: "G-HMYLTX4QFW"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);