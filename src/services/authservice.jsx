// src/services/authService.js
// Lightweight wrapper around Firebase Auth to keep components clean.

import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

/**
 * Register a new user and create the initial Firestore user doc.
 * Returns the firebase user object.
 */
export async function register(email, password, extra = {}) {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const uid = res.user.uid;

  // create basic user record
  await setDoc(doc(db, "users", uid), {
    email,
    role: extra.role || "client",
    fullName: extra.fullName || "",
    phone: extra.phone || "",
    wallet: 0,
    createdAt: serverTimestamp(),
    accountNumber: extra.accountNumber || generateAccountNumber(),
    ...extra,
  });

  return res.user;
}

/**
 * Simple login wrapper
 */
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Logout
 */
export function logout() {
  return signOut(auth);
}

/**
 * Send password reset email
 */
export function sendResetEmail(email) {
  return sendPasswordResetEmail(auth, email);
}

/**
 * Generate a readable account number (not secure; adapt to your needs)
 */
function generateAccountNumber() {
  // Example: 10-digit numeric id prefixed with 100
  const rand = Math.floor(1000000000 + Math.random() * 9000000000);
  return `100${String(rand).slice(0, 7)}`;
}
