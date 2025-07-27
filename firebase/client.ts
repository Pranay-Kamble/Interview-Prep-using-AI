// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app"
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAAuWmfZ74qypYtrGYpprhulQpuLHkb1iA",
    authDomain: "interviewprep-b7658.firebaseapp.com",
    projectId: "interviewprep-b7658",
    storageBucket: "interviewprep-b7658.firebasestorage.app",
    messagingSenderId: "198005678969",
    appId: "1:198005678969:web:3244440437bb3de01545a8",
    measurementId: "G-JXDZ0DCX85"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);


