import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, query, where, getDocs, updateDoc, doc, runTransaction, serverTimestamp } from "firebase/firestore";
import "./PendingTransactions.css";

export default function PendingTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);

  async function fetchPending() {
    setLoading(true);
    const q = query(collection(db, "transactions"), where("status", "==", "pending"));
    const snap = await getDocs(q);
    setTransactions(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }

  useEffect(() => {
    fetchPending();
  }, []);

  async function approveTransaction(tx) {
    setMsg(null);
    try {
      // Firestore transaction ensures atomic balance update
      await runTransaction(db, async (t) => {
        // fetch source account
        const qFrom = query(collection(db, "accounts"), where("uid", "==", tx.uid), where("accountType", "==", tx.accountType || "checking"));
        const snapFrom = await getDocs(qFrom);
        if (snapFrom.empty) throw new Error("Source account not found.");
        const fromDoc = snapFrom.docs[0];
        const fromRef = doc(db, "accounts", fromDoc.id);

        // external deposit? just increment balance
        let newBalance = (fromDoc.data().balance ?? 0);
        if (tx.type === "deposit") {
          newBalance += tx.amount;
        } else if (tx.type === "external_transfer") {
          newBalance -= tx.amount;
          if (newBalance < 0) throw new Error("Insufficient funds for external transfer");
        }

        // update account balance
        t.update(fromRef, { balance: newBalance });

        // mark transaction approved
        const txRef = doc(db, "transactions", tx.id);
        t.update(txRef, { status: "posted", approvedAt: serverTimestamp() });
      });

      setMsg({ type: "success", text: "Transaction approved." });
      fetchPending();
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: err.message });
    }
  }

  async function rejectTransaction(tx) {
    try {
      const txRef = doc(db, "transactions", tx.id);
      await updateDoc(txRef, { status: "rejected", approvedAt: serverTimestamp() });
      setMsg({ type: "success", text: "Transaction rejected." });
      fetchPending();
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: "Failed to reject transaction." });
    }
  }

  return (
    <div className="pending-tx-page">
      <h2>Pending Transactions</h2>
      {msg && <p className={`msg ${msg.type}`}>{msg.text}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : transactions.length === 0 ? (
        <p>No pending transactions.</p>
      ) : (
        <table className="tx-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>User</th>
              <th>Amount</th>
              <th>Account</th>
              <th>Note / Ref</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id}>
                <td>{tx.type}</td>
                <td>{tx.uid}</td>
                <td>${tx.amount.toFixed(2)}</td>
                <td>{tx.accountType || "checking"}</td>
                <td>{tx.note || tx.reference || "-"}</td>
                <td>
                  <button onClick={() => approveTransaction(tx)}>Approve</button>
                  <button onClick={() => rejectTransaction(tx)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
