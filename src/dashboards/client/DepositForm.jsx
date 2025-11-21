import React, { useState } from "react";
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./DepositForm.css";

export default function DepositForm({ uid }) {
  const [accountType, setAccountType] = useState("checking");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return setMsg("Enter a valid amount.");
    setLoading(true);
    setMsg("");
    try {
      // Create a deposit request (admin approves)
      await addDoc(collection(db, "transactions"), {
        uid,
        type: "deposit",
        amount: Number(amount),
        accountType,
        status: "pending",
        note,
        createdAt: serverTimestamp(),
      });
      setMsg("Deposit requested. It will be available after approval.");
      setAmount("");
      setNote("");
    } catch (err) {
      console.error(err);
      setMsg("Failed to create deposit.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="deposit-card">
      <h4>Deposit</h4>
      <form onSubmit={handleSubmit}>
        <label>To account</label>
        <select value={accountType} onChange={e => setAccountType(e.target.value)} disabled={loading}>
          <option value="checking">Checking</option>
          <option value="savings">Savings</option>
        </select>

        <label>Amount</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" disabled={loading} />

        <label>Note (optional)</label>
        <input value={note} onChange={e => setNote(e.target.value)} placeholder="Deposit note" disabled={loading} />

        <button type="submit" disabled={loading}>{loading ? "Requesting..." : "Request Deposit"}</button>

        {msg && <p className="muted">{msg}</p>}
      </form>
    </div>
  );
}
