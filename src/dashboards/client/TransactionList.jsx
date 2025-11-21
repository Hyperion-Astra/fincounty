import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import "./TransactionList.css";

export default function TransactionList({ uid }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      const q = query(
        collection(db, "transactions"),
        where("uid", "==", uid),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      setTransactions(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchTransactions();
  }, [uid]);

  return (
    <div className="transaction-list">
      <h3>Recent Transactions</h3>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td>{tx.type}</td>
              <td style={{ color: tx.type === "deposit" ? "green" : "red" }}>
                ${tx.amount.toFixed(2)}
              </td>
              <td>{tx.status}</td>
              <td>{tx.createdAt?.toDate().toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
