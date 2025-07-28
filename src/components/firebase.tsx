

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_QBppI0ULkTrjp22Y3pKX_6pePLjJJuQ",
  authDomain: "login-auth-25774.firebaseapp.com",
  projectId: "login-auth-25774",
  storageBucket: "login-auth-25774.firebasestorage.app",
  messagingSenderId: "239161869672",
  appId: "1:239161869672:web:2b060beaeb9fe3445042dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db=getFirestore(app);
export default app;