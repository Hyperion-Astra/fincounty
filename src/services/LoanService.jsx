// src/helpers/services/loanService.js
import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";

// ------------------------------
// USER: Request a loan
// ------------------------------
export const requestLoan = async (userId, amount, reason) => {
  return await addDoc(collection(db, "loans"), {
    userId,
    amount: Number(amount),
    reason,
    status: "pending",
    createdAt: Date.now(),
  });
};

// ------------------------------
// ADMIN: Approve a loan
// ------------------------------
export const approveLoan = async (loanId, userId, amount) => {
  const loanRef = doc(db, "loans", loanId);
  const userRef = doc(db, "users", userId);

  // Update loan status
  await updateDoc(loanRef, {
    status: "approved",
    approvedAt: Date.now(),
  });

  // Add loan amount to user balance
  const userSnap = await getDocs(
    query(collection(db, "users"), where("__name__", "==", userId))
  );

  let currentBalance = 0;
  userSnap.forEach((u) => {
    currentBalance = Number(u.data().balance || 0);
  });

  await updateDoc(userRef, {
    balance: currentBalance + Number(amount),
  });
};

// ------------------------------
// ADMIN: Reject a loan
// ------------------------------
export const rejectLoan = async (loanId) => {
  const loanRef = doc(db, "loans", loanId);

  await updateDoc(loanRef, {
    status: "rejected",
    rejectedAt: Date.now(),
  });
};

// ------------------------------
// ADMIN: Update loan status (generic)
// ------------------------------
export const updateLoanStatus = async (loanId, status) => {
  const loanRef = doc(db, "loans", loanId);
  const validStatuses = ["pending", "approved", "rejected"];
  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid status: ${status}`);
  }

  await updateDoc(loanRef, {
    status,
    [`${status}At`]: Date.now(),
  });
};

// ------------------------------
// ADMIN: Get all loans
// ------------------------------
export const getAllLoans = async () => {
  const snap = await getDocs(collection(db, "loans"));
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// ------------------------------
// USER: Get user's loan history
// ------------------------------
export const getUserLoans = async (userId) => {
  const q = query(collection(db, "loans"), where("userId", "==", userId));
  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
