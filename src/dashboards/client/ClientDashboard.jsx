import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc, collection, query, orderBy, limit, getDocs, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillWave, FaPiggyBank, FaExchangeAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "./ClientDashboard.css";

export default function ClientDashboard() {
  const { currentUser, userProfile } = useAuth();
  const [accountData, setAccountData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const generateAccountNumber = () => Math.floor(1000000000 + Math.random() * 9000000000).toString();
  const generateRoutingNumber = () => Math.floor(100000000 + Math.random() * 900000000).toString();

  useEffect(() => {
    if (!currentUser) return;

    let cancelled = false; // prevent state updates if unmounted

    async function fetchData() {
      try {
        const uid = currentUser.uid;
        const accountRef = doc(db, "accounts", uid);
        const accountSnap = await getDoc(accountRef);

        let updatedAccountData;

        if (!accountSnap.exists()) {
          updatedAccountData = {
            checkingAccountNumber: generateAccountNumber(),
            savingsAccountNumber: generateAccountNumber(),
            routingNumber: generateRoutingNumber(),
            checkingBalance: 0,
            savingsBalance: 0,
          };
          await setDoc(accountRef, updatedAccountData);
        } else {
          const existing = accountSnap.data();
          updatedAccountData = {
            checkingAccountNumber: existing.checkingAccountNumber || generateAccountNumber(),
            savingsAccountNumber: existing.savingsAccountNumber || generateAccountNumber(),
            routingNumber: existing.routingNumber || generateRoutingNumber(),
            checkingBalance: existing.checkingBalance ?? 0,
            savingsBalance: existing.savingsBalance ?? 0,
          };
          await setDoc(accountRef, updatedAccountData, { merge: true });
        }

        if (!cancelled) setAccountData(updatedAccountData);



      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();

    return () => {
      cancelled = true; // cleanup on unmount
    };
  }, [currentUser]); // only re-run if currentUser changes

  if (loading || !userProfile)
    return <div className="dashboard-loading">Loading dashboard...</div>;

  const checking = accountData?.checkingBalance ?? 0;
  const savings = accountData?.savingsBalance ?? 0;
  const demoTransactions = [
  {
    id: "1",
    createdAt: new Date("2026-02-10"),
    type: "Private Equity Capital Injection",
    amount: 8500000,
    status: "Completed",
  },
  {
    id: "2",
    createdAt: new Date("2026-01-19"),
    type: "Asset Liquidation",
    amount: 5200000,
    status: "Completed",
  },
  {
    id: "3",
    createdAt: new Date("2026-01-14"),
    type: "International Wire Incoming",
    amount: 3400000,
    status: "Completed",
  },
  {
    id: "4",
    createdAt: new Date("2025-12-26"),
    type: "Portfolio Dividend",
    amount: 2300000,
    status: "Completed",
  },
  {
    id: "5",
    createdAt: new Date("2025-12-13"),
    type: "Real Estate Sale",
    amount: 4600000,
    status: "Completed",
  },
  {
    id: "6",
    createdAt: new Date("2025-11-21"),
    type: "International Transfer",
    amount: -1250000,
    status: "Completed",
  },
  {
    id: "7",
    createdAt: new Date("2025-10-15"),
    type: "Investment Diversification",
    amount: -750000,
    status: "Completed",
  },
  {
    id: "8",
    createdAt: new Date("2025-07-02"),
    type: "Brokerage Processing Fee",
    amount: -100000,
    status: "Completed",
  },
];

  const handleCardClick = (action) => {
    if (action === "fund") navigate("/dashboard/fund");
    if (action === "withdraw") navigate("/dashboard/withdraw");
    if (action === "transfer") navigate("/dashboard/transfer");
  };

  return (
    <div className="dashboard-container">
      <h2 className="greeting">Welcome, {userProfile.displayName || "User"}</h2>

      <div className="balances">
        <div className="balance-card clickable" onClick={() => handleCardClick("fund")}>
          <h3><FaMoneyBillWave /> Checking</h3>
          <p>${checking.toFixed(2)}</p>
          <small>Account #: {accountData?.checkingAccountNumber}</small>
        </div>

        <div className="balance-card clickable" onClick={() => handleCardClick("fund")}>
          <h3><FaPiggyBank /> Savings</h3>
          <p>${savings.toFixed(2)}</p>
          <small>Account #: {accountData?.savingsAccountNumber}</small>
        </div>

        <div className="balance-card clickable" onClick={() => handleCardClick("transfer")}>
          <h3><FaExchangeAlt /> Total Balance</h3>
          <p>${(checking + savings).toFixed(2)}</p>
        </div>
      </div>

      <h3 className="section-title">Recent Transactions</h3>
      <div className="transactions-wrapper">
        {demoTransactions.length === 0 ? (
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
              {demoTransactions.map((tx) => {
                const date = new Date(tx.createdAt).toLocaleDateString();
                return (
                  <tr key={tx.id}>
                    <td>{date}</td>
                    <td>{tx.type}</td>
                    <td className={`amount ${tx.amount >= 0 ? "positive" : "negative"}`}>
                    {tx.amount >= 0 ? "+" : "-"}$
                    {Math.abs(tx.amount).toLocaleString()}
                  </td>
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
