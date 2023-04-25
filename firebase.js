// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyBVKfvIZ5FFJxcMPgcYFRRM1RLsZvDB930",
    authDomain: "signal-clone-43761.firebaseapp.com",
    projectId: "signal-clone-43761",
    storageBucket: "signal-clone-43761.appspot.com",
    messagingSenderId: "139803693028",
    appId: "1:139803693028:web:3cfe120a76ed4bd513c1f1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };


