// src/dashboards/client/ClientDashboard.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import "./ClientDashboard.css";

export default function ClientDashboard() {
  const [userData, setUserData] = useState(null);
  const [balances, setBalances] = useState({ checking: 0, savings: 0 });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const uid = localStorage.getItem("uid");
        if (!uid) return;

        const userSnap = await getDoc(doc(db, "users", uid));
        if (userSnap.exists()) setUserData(userSnap.data());

        const accountSnap = await getDoc(doc(db, "accounts", uid));
        if (accountSnap.exists()) setBalances(accountSnap.data());

        const q = query(
          collection(db, "transactions"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
        const txSnap = await getDocs(q);
        setTransactions(txSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Welcome, {userData?.displayName || "User"}</h2>
      <div className="balances">
        <div className="balance-card">
          <h3>Checking</h3>
          <p>${balances.checking.toFixed(2)}</p>
        </div>
        <div className="balance-card">
          <h3>Savings</h3>
          <p>${balances.savings.toFixed(2)}</p>
        </div>
        <div className="balance-card total">
          <h3>Total</h3>
          <p>${(balances.checking + balances.savings).toFixed(2)}</p>
        </div>
      </div>

      <h3>Recent Transactions</h3>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td>{new Date(tx.createdAt?.seconds * 1000).toLocaleDateString()}</td>
              <td>{tx.type}</td>
              <td>${tx.amount.toFixed(2)}</td>
              <td>{tx.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
