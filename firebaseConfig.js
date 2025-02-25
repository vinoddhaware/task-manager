// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEbEEkDRM5KMU8XlBxDBn--Fbg0q_ikB4",
    authDomain: "task-management-vinn.firebaseapp.com",
    projectId: "task-management-vinn",
    storageBucket: "task-management-vinn.firebasestorage.app",
    messagingSenderId: "882241835320",
    appId: "1:882241835320:web:dde8c0a2301404d4b2b1cd"
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
