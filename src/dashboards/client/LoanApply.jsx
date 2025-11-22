import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./LoanApply.css";

export default function LoanApply() {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;

  const [amount, setAmount] = useState("");
  const [termMonths, setTermMonths] = useState("12");
  const [purpose, setPurpose] = useState("");
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

  async function submitLoan(e) {
    e.preventDefault();
    setMsg(null);
    const amt = parseAmount(amount);
    if (Number.isNaN(amt) || amt < 100) {
      setMsg({ type: "error", text: "Enter a loan amount (minimum $100)." });
      return;
    }
    if (!uid) {
      setMsg({ type: "error", text: "You must be logged in." });
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "loans"), {
        uid,
        amount: amt,
        termMonths: Number(termMonths),
        purpose: purpose || null,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setMsg({ type: "success", text: "Loan application submitted. Admin will review." });
      setAmount("");
      setPurpose("");
      setTermMonths("12");
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: "Failed to submit loan." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="loan-page">
      <h2>Apply for a Loan</h2>
      <form className="loan-form" onSubmit={submitLoan}>
        <label>Amount (USD)</label>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" inputMode="decimal" disabled={loading} />

        <label>Term (months)</label>
        <select value={termMonths} onChange={(e) => setTermMonths(e.target.value)} disabled={loading}>
          <option value="6">6 months</option>
          <option value="12">12 months</option>
          <option value="24">24 months</option>
          <option value="36">36 months</option>
        </select>

        <label>Purpose</label>
        <input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="E.g., home improvement" disabled={loading} />

        <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Apply"}</button>

        {msg && <p className={`msg ${msg.type}`}>{msg.text}</p>}
      </form>
    </div>
  );
}
