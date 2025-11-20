// src/services/UserService.js
// Firestore helpers for user operations: get, update profile, credit/debit wallet, fetch by account

import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

/**
 * Get user data by uid
 */
export async function getUser(uid) {
  if (!uid) throw new Error("uid required");
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

/**
 * Update user profile fields (partial update)
 */
export async function updateUserProfile(uid, updates) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, updates);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

/**
 * Credit user's wallet and create a transaction log
 */
export async function creditWallet(uid, amount, meta = {}) {
  if (!uid) throw new Error("uid required");
  if (typeof amount !== "number") throw new Error("amount must be a number");

  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) throw new Error("User not found");

  const current = userSnap.data().wallet || 0;
  const newBalance = current + amount;

  await updateDoc(userRef, { wallet: newBalance });

  await addDoc(collection(db, "transactions"), {
    uid,
    type: "credit",
    amount,
    meta,
    createdAt: serverTimestamp(),
  });

  return newBalance;
}

/**
 * Debit user's wallet (if enough funds) and create a transaction log
 */
export async function debitWallet(uid, amount, meta = {}) {
  if (!uid) throw new Error("uid required");
  if (typeof amount !== "number") throw new Error("amount must be a number");

  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) throw new Error("User not found");

  const current = userSnap.data().wallet || 0;
  if (current < amount) throw new Error("Insufficient funds");

  const newBalance = current - amount;
  await updateDoc(userRef, { wallet: newBalance });

  await addDoc(collection(db, "transactions"), {
    uid,
    type: "debit",
    amount,
    meta,
    createdAt: serverTimestamp(),
  });

  return newBalance;
}

/**
 * Find a user by account number (useful for transfers)
 */
export async function findUserByAccount(accountNumber) {
  const q = query(
    collection(db, "users"),
    where("accountNumber", "==", String(accountNumber))
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const docSnap = snap.docs[0];
  return { id: docSnap.id, ...docSnap.data() };
}

/**
 * Fetch basic user list (for admin)
 */
export async function getAllUsers(limit = 100) {
  const q = query(collection(db, "users"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
