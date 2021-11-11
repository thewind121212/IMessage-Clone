// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDerdOZmRQ-u7FAJJk_kJL_DFmSL_Y_WlM",
  authDomain: "imessage-clone-b43b7.firebaseapp.com",
  projectId: "imessage-clone-b43b7",
  storageBucket: "imessage-clone-b43b7.appspot.com",
  messagingSenderId: "503165868716",
  appId: "1:503165868716:web:54a8379f8ab9ea99b79d09",
  measurementId: "G-1LD86H19GZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();

const provider = new GoogleAuthProvider();

export { auth, provider };

export default db;
