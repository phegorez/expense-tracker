// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD1JjXQm25rSPTnzTW0gYeDgbw_EH-WlCs",
    authDomain: "expense-tracker-fc7df.firebaseapp.com",
    projectId: "expense-tracker-fc7df",
    storageBucket: "expense-tracker-fc7df.appspot.com",
    messagingSenderId: "922703556422",
    appId: "1:922703556422:web:d2e1ab8e05009fff293f47",
    measurementId: "G-JK28LRCM31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);