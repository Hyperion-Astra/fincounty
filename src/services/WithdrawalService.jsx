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

// USER: Submit a withdrawal request
export const submitWithdrawal = async (userId, amount) => {
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

  // Fetch user balance
  const snap = await getDocs(
    query(collection(db, "users"), where("__name__", "==", userId))
  );

  let balance = 0;
  snap.forEach((x) => (balance = Number(x.data().balance || 0)));

  // Subtract balance
  await updateDoc(userRef, {
    balance: balance - Number(amount),
  });

  // Log transaction
  await addDoc(collection(db, "transactions"), {
    userId,
    type: "withdrawal",
    amount: Number(amount),
    createdAt: Date.now(),
  });
};

// ADMIN: Reject
export const rejectWithdrawal = async (withdrawalId) => {
  return await updateDoc(doc(db, "withdrawals", withdrawalId), {
    status: "rejected",
    rejectedAt: Date.now(),
  });
};

// ADMIN: Update withdrawal status (generic)
export const updateWithdrawalStatus = async (withdrawalId, status) => {
  const withdrawalRef = doc(db, "withdrawals", withdrawalId);
  const validStatuses = ["pending", "approved", "rejected"];
  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid status: ${status}`);
  }

  await updateDoc(withdrawalRef, {
    status,
    [`${status}At`]: Date.now(),
  });
};

// ADMIN: Get all withdrawals
export const getAllWithdrawals = async () => {
  const snap = await getDocs(collection(db, "withdrawals"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// USER: Get user withdrawals
export const getUserWithdrawals = async (userId) => {
  const q = query(collection(db, "withdrawals"), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};
