import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwVlnoCITjOe1y1rkh9dSRQOdGoAedEYM",
  authDomain: "diceblue-20f13.firebaseapp.com",
  projectId: "diceblue-20f13",
  storageBucket: "diceblue-20f13.firebasestorage.app",
  messagingSenderId: "589557189696",
  appId: "1:589557189696:web:a259aaac1f87c0a83ea3a5",
  measurementId: "G-Q3RX78431X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Prefill custom scopes if needed
googleProvider.addScope("profile");
googleProvider.addScope("email");
export default app;
