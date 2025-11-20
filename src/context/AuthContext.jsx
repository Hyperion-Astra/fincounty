// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);          // <-- FIXED
  const [userData, setUserData] = useState(null);  // profile (role, email, etc)
  const [loading, setLoading] = useState(true);

  // Register
  const register = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const uid = res.user.uid;

    await setDoc(doc(db, "users", uid), {
      email,
      role: "client",
      createdAt: Date.now(),
      walletBalance: 0,
    });

    return res.user;
  };

  // Login
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // Logout
  const logout = () => signOut(auth);

  // Watch for auth updates
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const snap = await getDoc(doc(db, "users", firebaseUser.uid));
          setUserData(snap.exists() ? snap.data() : null);
        } catch (err) {
          console.warn("Firestore error:", err.message);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, userData, login, logout, register, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
