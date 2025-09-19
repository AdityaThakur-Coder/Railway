import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBkX2kATRzJNRfXJ87ZcZAOGd7i0Y2sRfM",
  authDomain: "user-authentication-setup.firebaseapp.com",
  databaseURL: "https://user-authentication-setup-default-rtdb.firebaseio.com",
  projectId: "user-authentication-setup",
  storageBucket: "user-authentication-setup.appspot.com",
  messagingSenderId: "67263207610",
  appId: "1:67263207610:web:4217a0290f9dc173004a83",
  measurementId: "G-J8KRHVE6KH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const db = getFirestore(app)
export const auth = getAuth(app)

export default app
