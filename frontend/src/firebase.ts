// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBJ5Di6JG5XN7PI_SiwiH8RKGWmIutYpI",
  authDomain: "rvce-hackathon.firebaseapp.com",
  projectId: "rvce-hackathon",
  storageBucket: "rvce-hackathon.appspot.com",
  messagingSenderId: "357515747139",
  appId: "1:357515747139:web:1be90a087521e85c8919f6",
  measurementId: "G-6RMDXX53NE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);