// src/dashboards/client/Transactions.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import "./Transactions.css";

export default function Transactions() {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      if (!currentUser) return;

      try {
        const q = query(
          collection(db, "transactions"),
          where("uid", "==", currentUser.uid),
          orderBy("createdAt", "desc")
        );

        const snap = await getDocs(q);
        const txList = snap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            type: data.type,
            amount: data.amount ?? 0,
            status: data.status ?? "pending",
            createdAt: data.createdAt?.seconds
              ? new Date(data.createdAt.seconds * 1000)
              : new Date(),
            fromAccount: data.fromAccount || "—",
            toAccount: data.toAccount || "—",
            note: data.note || "",
          };
        });

        setTransactions(txList);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, [currentUser]);

  if (loading) return <div className="tx-loading">Loading transactions...</div>;

  if (!transactions.length)
    return <div className="tx-empty">You have no transactions yet.</div>;

  return (
    <div className="transactions-page">
      <h2>Recent Transactions</h2>
      <div className="tx-cards">
        {transactions.map((tx) => (
          <div key={tx.id} className={`tx-card ${tx.status}`}>
            <div className="tx-header">
              <span className="tx-type">{tx.type.replace("_", " ")}</span>
              <span className={`tx-status ${tx.status}`}>{tx.status}</span>
            </div>
            <div className="tx-body">
              <p>
                <strong>Amount:</strong> ${tx.amount.toFixed(2)}
              </p>
              <p>
                <strong>From:</strong> {tx.fromAccount}
              </p>
              <p>
                <strong>To:</strong> {tx.toAccount}
              </p>
              {tx.note && (
                <p>
                  <strong>Note:</strong> {tx.note}
                </p>
              )}
            </div>
            <div className="tx-footer">
              {tx.createdAt && (
                <span>{tx.createdAt.toLocaleDateString()} {tx.createdAt.toLocaleTimeString()}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
