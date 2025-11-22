// src/dashboards/client/ClientDashboard.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc, collection, query, orderBy, limit, getDocs, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillWave, FaPiggyBank, FaExchangeAlt } from "react-icons/fa";
import "./ClientDashboard.css";

export default function ClientDashboard() {
  const [userData, setUserData] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const generateAccountNumber = () => Math.floor(1000000000 + Math.random() * 9000000000).toString();
  const generateRoutingNumber = () => Math.floor(100000000 + Math.random() * 900000000).toString();

  useEffect(() => {
    async function fetchData() {
      try {
        const uid = localStorage.getItem("uid");
        if (!uid) return;

        // Fetch user data
        const userSnap = await getDoc(doc(db, "users", uid));
        if (userSnap.exists()) setUserData(userSnap.data());

        // Fetch account data
        const accountRef = doc(db, "accounts", uid);
        const accountSnap = await getDoc(accountRef);

        let updatedAccountData;

        if (!accountSnap.exists()) {
          // Create a new account for new users
          updatedAccountData = {
            checkingAccountNumber: generateAccountNumber(),
            savingsAccountNumber: generateAccountNumber(),
            routingNumber: generateRoutingNumber(),
            checkingBalance: 0,
            savingsBalance: 0,
          };
          await setDoc(accountRef, updatedAccountData);
        } else {
          const existingData = accountSnap.data();
          // Generate missing fields for old accounts
          updatedAccountData = {
            checkingAccountNumber: existingData.checkingAccountNumber || generateAccountNumber(),
            savingsAccountNumber: existingData.savingsAccountNumber || generateAccountNumber(),
            routingNumber: existingData.routingNumber || generateRoutingNumber(),
            checkingBalance: existingData.checkingBalance ?? 0,
            savingsBalance: existingData.savingsBalance ?? 0,
          };
          // Merge back to Firestore if any new fields were generated
          await setDoc(accountRef, updatedAccountData, { merge: true });
        }

        setAccountData(updatedAccountData);

        // Fetch recent transactions
        const txQuery = query(
          collection(db, "transactions"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
        const txSnap = await getDocs(txQuery);
        setTransactions(txSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className="dashboard-loading">Loading dashboard...</div>;

  const checking = accountData?.checkingBalance ?? 0;
  const savings = accountData?.savingsBalance ?? 0;

  const handleCardClick = (action) => {
    if (action === "fund") navigate("/fund");
    if (action === "withdraw") navigate("/withdraw");
    if (action === "transfer") navigate("/transfer");
  };

  return (
    <div className="dashboard-container">
      <h2 className="greeting">Welcome, {userData?.displayName || "User"}</h2>

      {/* BALANCE CARDS */}
      <div className="balances">
        <div className="balance-card clickable" onClick={() => handleCardClick("fund")}>
          <h3><FaMoneyBillWave style={{ marginRight: "0.5rem" }} /> Checking</h3>
          <p>${checking.toFixed(2)}</p>
          <small>Account #: {accountData?.checkingAccountNumber}</small>
        </div>

        <div className="balance-card clickable" onClick={() => handleCardClick("fund")}>
          <h3><FaPiggyBank style={{ marginRight: "0.5rem" }} /> Savings</h3>
          <p>${savings.toFixed(2)}</p>
          <small>Account #: {accountData?.savingsAccountNumber}</small>
        </div>

        <div className="balance-card clickable" onClick={() => handleCardClick("transfer")}>
          <h3><FaExchangeAlt style={{ marginRight: "0.5rem" }} /> Total Balance</h3>
          <p>${(checking + savings).toFixed(2)}</p>
        </div>
      </div>

      {/* RECENT TRANSACTIONS */}
      <h3 className="section-title">Recent Transactions</h3>
      <div className="transactions-wrapper">
        {transactions.length === 0 ? (
          <p className="no-tx">No recent transactions yet.</p>
        ) : (
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
              {transactions.map((tx) => {
                const date = tx?.createdAt?.seconds
                  ? new Date(tx.createdAt.seconds * 1000).toLocaleDateString()
                  : "—";
                return (
                  <tr key={tx.id}>
                    <td>{date}</td>
                    <td>{tx.type}</td>
                    <td>${tx.amount?.toFixed(2) || "0.00"}</td>
                    <td className={`status ${tx.status?.toLowerCase()}`}>{tx.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
