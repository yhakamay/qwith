// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWU2Vb3kKJOqEBDkutrG1MErZ1vBVPnuM",
  authDomain: "qwith-98273.firebaseapp.com",
  projectId: "qwith-98273",
  storageBucket: "qwith-98273.appspot.com",
  messagingSenderId: "649334180242",
  appId: "1:649334180242:web:5382b218ac0f063718594b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
