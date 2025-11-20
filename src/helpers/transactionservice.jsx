import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";

// USER: Request withdrawal
export const requestWithdrawal = async (userId, amount) => {
  return await addDoc(collection(db, "withdrawals"), {
    userId,
    amount: Number(amount),
    status: "pending",
    createdAt: Date.now(),
  });
};

// ADMIN: Approve withdrawal
export const approveWithdrawal = async (withdrawalId, userId, amount) => {
  const withdrawalRef = doc(db, "withdrawals", withdrawalId);
  const userRef = doc(db, "users", userId);

  // Mark as approved
  await updateDoc(withdrawalRef, {
    status: "approved",
    approvedAt: Date.now(),
  });

  // Subtract from user balance
  const userSnap = await getDocs(
    query(collection(db, "users"), where("__name__", "==", userId))
  );

  let currentBalance = 0;
  userSnap.forEach((u) => {
    currentBalance = Number(u.data().balance || 0);
  });

  await updateDoc(userRef, {
    balance: currentBalance - Number(amount),
  });

  // Add to transaction log
  await addDoc(collection(db, "transactions"), {
    userId,
    type: "withdrawal",
    amount: Number(amount),
    createdAt: Date.now(),
  });
};

// ADMIN: Reject withdrawal
export const rejectWithdrawal = async (withdrawalId) => {
  const withdrawalRef = doc(db, "withdrawals", withdrawalId);

  await updateDoc(withdrawalRef, {
    status: "rejected",
    rejectedAt: Date.now(),
  });
};

// ADMIN: Get all withdrawals
export const getAllWithdrawals = async () => {
  const snap = await getDocs(collection(db, "withdrawals"));
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// USER: Get personal withdrawal history
export const getUserWithdrawals = async (userId) => {
  const q = query(collection(db, "withdrawals"), where("userId", "==", userId));
  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// USER: Get personal transaction log
export const getUserTransactions = async (userId) => {
  const q = query(collection(db, "transactions"), where("userId", "==", userId));
  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
