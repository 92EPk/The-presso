// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "thepresso.firebaseapp.com",
  projectId: "thepresso",
  storageBucket: "thepresso.firebasestorage.app",
  messagingSenderId: "417170594346",
  appId: "1:417170594346:web:0923d39202470f1c098153"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);