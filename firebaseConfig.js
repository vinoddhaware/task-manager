// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9PmP2cHsm9u40gcdFgl-Gi1wTQ4BO5xE",
  authDomain: "task-list-6b073.firebaseapp.com",
  projectId: "task-list-6b073",
  storageBucket: "task-list-6b073.firebasestorage.app",
  messagingSenderId: "207935707175",
  appId: "1:207935707175:web:0d6253e0852e8977205602"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// for google auth
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

// optional for multiple users login 
// provider.setCustomParameters({
//     prompt: 'selec_account'
// })

// custome function for google signIn
export const signInWithGoogle = () => signInWithPopup(auth, provider)
