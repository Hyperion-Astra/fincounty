// src/services/TransferService.jsx
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
 * Submit transfer (external beneficiary).
 * data: {
 *  userId, userEmail,
 *  recipientName, recipientBank, accountNumber,
 *  swift, routing, type, reason, amount
 * }
 */
export const submitTransfer = async (data) => {
  const payload = {
    ...data,
    amount: Number(data.amount),
    status: "pending",
    createdAt: serverTimestamp(),
  };

  const ref = await addDoc(collection(db, "transfers"), payload);
  return { id: ref.id, ...payload };
};

/**
 * Admin approves external transfer:
 * - Check user wallet
 * - Deduct amount from user wallet
 * - Update transfer status to 'approved'
 * - Log transaction
 */
export const approveTransfer = async (transferId) => {
  const transferRef = doc(db, "transfers", transferId);
  const snap = await getDoc(transferRef);
  if (!snap.exists()) throw new Error("Transfer not found.");

  const transfer = { id: snap.id, ...snap.data() };
  if (transfer.status === "approved")
    throw new Error("Transfer already approved.");

  // fetch user
  const userRef = doc(db, "users", transfer.userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) throw new Error("User not found.");
  const userData = userSnap.data();
  const walletKey = getWalletKey(userData);
  const current = Number(userData[walletKey] || 0);

  if (current < Number(transfer.amount)) {
    throw new Error("Insufficient balance.");
  }

  // mark transfer approved
  await updateDoc(transferRef, {
    status: "approved",
    approvedAt: serverTimestamp(),
  });

  // deduct from user wallet
  await updateDoc(userRef, {
    [walletKey]: current - Number(transfer.amount),
  });

  // log transaction
  await addDoc(collection(db, "transactions"), {
    userId: transfer.userId,
    type: "transfer",
    amount: Number(transfer.amount),
    status: "completed",
    relatedId: transferId,
    createdAt: serverTimestamp(),
  });

  return true;
};

/**
 * Admin rejects transfer (no wallet change)
 */
export const rejectTransfer = async (transferId, reason = "") => {
  const ref = doc(db, "transfers", transferId);
  await updateDoc(ref, {
    status: "rejected",
    rejectedAt: serverTimestamp(),
    rejectReason: reason,
  });
  return true;
};

/**
 * Get all transfers (admin)
 */
export const getAllTransfers = async () => {
  const snap = await getDocs(collection(db, "transfers"));
  const t = [];

  for (const d of snap.docs) {
    const data = d.data();
    let userName = "Unknown";
    try {
      const userRef = doc(db, "users", data.userId);
      const userSnap = await getDoc(userRef);
      userName = userSnap.exists() ? userSnap.data().fullName || userSnap.data().email || "User" : "Unknown";
    } catch (e) {}
    t.push({ id: d.id, ...data, userName });
  }

  return t.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
};

/**
 * Get user transfers
 */
export const getUserTransfers = async (userId) => {
  const q = query(collection(db, "transfers"), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/* Helper wallet detection */
function getWalletKey(userData) {
  if (!userData || typeof userData !== "object") return "wallet";
  if ("wallet" in userData) return "wallet";
  if ("balance" in userData) return "balance";
  if ("accountBalance" in userData) return "accountBalance";
  return "wallet";
}
