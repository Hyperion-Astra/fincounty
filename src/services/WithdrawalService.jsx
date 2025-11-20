// src/services/WithdrawalService.jsx
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

// -----------------------------------------
// USER: Submit a full withdrawal request
// -----------------------------------------
export const submitWithdrawal = async (data) => {
  // data should contain:
  // userId, amount, method, accountName, accountNumber, bankName, swiftCode, note, userName

  return await addDoc(collection(db, "withdrawals"), {
    ...data,
    amount: Number(data.amount),
    status: "pending",
    createdAt: serverTimestamp(),
  });
};

// -----------------------------------------
// ADMIN: Approve withdrawal
// -----------------------------------------
export const approveWithdrawal = async (withdrawal) => {
  const { id, userId, amount } = withdrawal;

  const withdrawalRef = doc(db, "withdrawals", id);
  const userRef = doc(db, "users", userId);

  // Fetch user
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return false;

  const userData = userSnap.data();
  const wallet = Number(userData.wallet || 0);

  if (wallet < amount) {
    throw new Error("User has insufficient balance.");
  }

  // Update withdrawal to approved
  await updateDoc(withdrawalRef, {
    status: "approved",
    approvedAt: serverTimestamp(),
  });

  // Deduct from user wallet
  await updateDoc(userRef, {
    wallet: wallet - Number(amount),
  });

  // Log transaction
  await addDoc(collection(db, "transactions"), {
    userId,
    type: "withdrawal",
    amount: Number(amount),
    status: "completed",
    relatedId: id,
    createdAt: serverTimestamp(),
  });

  return true;
};

// -----------------------------------------
// ADMIN: Reject withdrawal
// -----------------------------------------
export const rejectWithdrawal = async (withdrawalId) => {
  return await updateDoc(doc(db, "withdrawals", withdrawalId), {
    status: "rejected",
    rejectedAt: serverTimestamp(),
  });
};

// -----------------------------------------
// ADMIN: Force Update Status
// -----------------------------------------
export const updateWithdrawalStatus = async (withdrawalId, status) => {
  const valid = ["pending", "approved", "rejected"];
  if (!valid.includes(status)) {
    throw new Error(`Invalid status: ${status}`);
  }

  return await updateDoc(doc(db, "withdrawals", withdrawalId), {
    status,
    [`${status}At`]: serverTimestamp(),
  });
};

// -----------------------------------------
// ADMIN: Fetch All Withdrawals (with user names)
// -----------------------------------------
export const getAllWithdrawals = async () => {
  const snap = await getDocs(collection(db, "withdrawals"));
  const withdrawals = [];

  for (const d of snap.docs) {
    const data = d.data();

    // fetch username for admin UI
    const userRef = doc(db, "users", data.userId);
    const userSnap = await getDoc(userRef);

    withdrawals.push({
      id: d.id,
      ...data,
      userName: userSnap.exists() ? userSnap.data().fullName : "Unknown User",
    });
  }

  // Sort: newest first
  return withdrawals.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
};

// -----------------------------------------
// USER: Fetch personal withdrawals
// -----------------------------------------
export const getUserWithdrawals = async (userId) => {
  const q = query(collection(db, "withdrawals"), where("userId", "==", userId));
  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};
