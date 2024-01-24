import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwtnWFR4qNpkGPYpqM4gUkcNu4mjtcX7A",
  authDomain: "my-first-firebase-projec-b553e.firebaseapp.com",
  projectId: "my-first-firebase-projec-b553e",
  storageBucket: "my-first-firebase-projec-b553e.appspot.com",
  messagingSenderId: "479379952426",
  appId: "1:479379952426:web:4bd28378d3ada338124453",
  measurementId: "G-790FH36DQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvidr = new GoogleAuthProvider();
export const db = getFirestore(app);