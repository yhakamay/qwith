import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDWU2Vb3kKJOqEBDkutrG1MErZ1vBVPnuM",
  authDomain: "qwith-98273.firebaseapp.com",
  projectId: "qwith-98273",
  storageBucket: "qwith-98273.appspot.com",
  messagingSenderId: "649334180242",
  appId: "1:649334180242:web:5382b218ac0f063718594b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);
