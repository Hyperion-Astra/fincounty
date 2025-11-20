// src/services/AdminService.js
import { db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

class AdminService {
  // ======================
  // ADMIN – FUND A USER WALLET
  // ======================
  static async fundWallet(userId, amount) {
    const walletRef = doc(db, "wallets", userId);

    await updateDoc(walletRef, {
      balance: amount,
      updatedAt: new Date(),
    });

    // Log transaction
    await addDoc(collection(db, "transactions"), {
      userId,
      type: "credit",
      amount,
      description: "Admin funding",
      createdAt: new Date(),
    });

    return true;
  }

  // ======================
  // ADMIN – GET ALL USERS
  // ======================
  static async getAllUsers() {
    const snapshot = await getDocs(collection(db, "users"));
    return snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));
  }

  // ======================
  // ADMIN – GET ALL TRANSACTIONS
  // ======================
  static async getAllTransactions() {
    const snapshot = await getDocs(collection(db, "transactions"));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  // ======================
  // ADMIN – DASHBOARD METRICS
  // ======================
  static async getAdminStats() {
    const usersSnap = await getDocs(collection(db, "users"));
    const loansSnap = await getDocs(collection(db, "loans"));
    const transSnap = await getDocs(collection(db, "transactions"));

    return {
      totalUsers: usersSnap.size,
      totalLoans: loansSnap.size,
      totalTransactions: transSnap.size,
    };
  }
}

export default AdminService;
