// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCHpXjD8soXmQ7tz7MlFV1-d_OMQ-eWF0I",
  authDomain: "fincounty.firebaseapp.com",
  projectId: "fincounty",
  storageBucket: "fincounty.firebasestorage.app",
  messagingSenderId: "364676194210",
  appId: "1:364676194210:web:4fe6b7ea6994c080285cfb"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // ✅ Add this
export default app;




