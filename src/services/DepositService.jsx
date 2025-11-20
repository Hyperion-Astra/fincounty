// src/services/DepositService.jsx
import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

/**
 * Submit a deposit request (client)
 * data: { userId, userEmail, amount, method, proofUrl?, note? }
 */
export const submitDeposit = async (data) => {
  const payload = {
    ...data,
    amount: Number(data.amount),
    status: "pending",
    createdAt: serverTimestamp(),
  };

  const ref = await addDoc(collection(db, "deposits"), payload);
  return { id: ref.id, ...payload };
};

/**
 * Admin approves a deposit:
 * - sets deposit.status = 'approved'
 * - increases user's wallet (auto-update per user's choice)
 * - logs a transaction entry
 */
export const approveDeposit = async (depositId) => {
  const depositRef = doc(db, "deposits", depositId);
  const snap = await getDoc(depositRef);
  if (!snap.exists()) throw new Error("Deposit not found.");

  const deposit = { id: snap.id, ...snap.data() };
  if (deposit.status === "approved")
    throw new Error("Deposit already approved.");

  // fetch user doc
  const userRef = doc(db, "users", deposit.userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) throw new Error("User not found.");
  const userData = userSnap.data();

  // determine wallet field name (robust to different schemas)
  const walletKey = getWalletKey(userData);
  const current = Number(userData[walletKey] || 0);

  // update deposit status
  await updateDoc(depositRef, {
    status: "approved",
    approvedAt: serverTimestamp(),
  });

  // increase wallet
  await updateDoc(userRef, {
    [walletKey]: current + Number(deposit.amount),
  });

  // log transaction
  await addDoc(collection(db, "transactions"), {
    userId: deposit.userId,
    type: "deposit",
    amount: Number(deposit.amount),
    status: "completed",
    relatedId: depositId,
    method: deposit.method || "bank",
    createdAt: serverTimestamp(),
  });

  return true;
};

/**
 * Admin rejects deposit (no wallet change)
 */
export const rejectDeposit = async (depositId, reason = "") => {
  const depositRef = doc(db, "deposits", depositId);
  await updateDoc(depositRef, {
    status: "rejected",
    rejectedAt: serverTimestamp(),
    rejectReason: reason,
  });

  return true;
};

/**
 * Get all deposits (admin). Attach user name if available.
 */
export const getAllDeposits = async () => {
  const snap = await getDocs(collection(db, "deposits"));
  const deposits = [];

  for (const d of snap.docs) {
    const data = d.data();
    let userName = "Unknown";
    try {
      const userRef = doc(db, "users", data.userId);
      const userSnap = await getDoc(userRef);
      userName = userSnap.exists() ? userSnap.data().fullName || userSnap.data().email || "User" : "Unknown";
    } catch (e) {
      // ignore
    }
    deposits.push({ id: d.id, ...data, userName });
  }

  return deposits.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
};

/**
 * Get user deposits (client)
 */
export const getUserDeposits = async (userId) => {
  const q = query(collection(db, "deposits"), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/**
 * Helper: detect which wallet-like field to use
 */
function getWalletKey(userData) {
  if (!userData || typeof userData !== "object") return "wallet";
  if ("wallet" in userData) return "wallet";
  if ("balance" in userData) return "balance";
  if ("accountBalance" in userData) return "accountBalance";
  // fallback: create wallet
  return "wallet";
}
