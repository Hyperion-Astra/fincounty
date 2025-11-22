import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./Deposit.css";

export default function Deposit() {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;

  const [accountType, setAccountType] = useState("checking");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  function parseAmount(v) {
    const s = String(v).trim();
    if (!s) return 0;
    const cleaned = s.replace(/[^\d.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) return NaN;
    let whole = parts[0] || "0";
    let frac = parts[1] || "";
    if (frac.length > 2) frac = frac.slice(0, 2);
    const composed = frac ? `${whole}.${frac}` : whole;
    return Number(composed);
  }

  async function handleDeposit(e) {
    e.preventDefault();
    setMsg(null);

    const amt = parseAmount(amount);
    if (Number.isNaN(amt) || amt <= 0) {
      setMsg({ type: "error", text: "Enter a valid amount." });
      return;
    }
    if (!uid) {
      setMsg({ type: "error", text: "You must be logged in." });
      return;
    }

    setLoading(true);
    try {
      // create a pending deposit (admin will approve)
      await addDoc(collection(db, "transactions"), {
        uid,
        type: "deposit",
        amount: amt,
        accountType,
        reference: reference || null,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setMsg({ type: "success", text: "Deposit requested. It will appear once approved." });
      setAmount("");
      setReference("");
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: "Failed to request deposit." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="deposit-page">
      <h2>Request a Deposit</h2>
      <form className="deposit-form" onSubmit={handleDeposit}>
        <label>To account</label>
        <select value={accountType} onChange={(e) => setAccountType(e.target.value)} disabled={loading}>
          <option value="checking">Checking</option>
          <option value="savings">Savings</option>
        </select>

        <label>Amount (USD)</label>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" inputMode="decimal" disabled={loading} />

        <label>Reference (optional)</label>
        <input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Bank reference or note" disabled={loading} />

        <button type="submit" disabled={loading}>{loading ? "Requesting..." : "Request deposit"}</button>

        {msg && <p className={`msg ${msg.type}`}>{msg.text}</p>}
      </form>
    </div>
  );
}
