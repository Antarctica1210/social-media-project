// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7bKLhAEc64teX-hi6c__iY--YGBUhF1I",
    authDomain: "social-fa2ef.firebaseapp.com",
    projectId: "social-fa2ef",
    storageBucket: "social-fa2ef.appspot.com",
    messagingSenderId: "840281920108",
    appId: "1:840281920108:web:9a93a28e026bb721833e49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);