import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore }  from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDGzRpCsjzK2paaHGQGoDZUk0W2HpAEG4g",
  authDomain: "biflow-4cdeb.firebaseapp.com",
  projectId: "biflow-4cdeb",
  storageBucket: "biflow-4cdeb.appspot.com",
  messagingSenderId: "1023556125028",
  appId: "1:1023556125028:web:1709bd2877d4e521dcba71",
  measurementId: "G-9PY3J8LMFS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireStore = getFirestore(app);

export {auth, fireStore}