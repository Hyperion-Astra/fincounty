// src/dashboards/client/LoanApply.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Simple loan application form.
 * - amount: requested loan
 * - term: loan term in months/years (string)
 * - purpose: short text
 */
export default function LoanApply({ onApplied }) {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();

    // basic validation
    const amt = Number(amount);
    if (!user) return alert("You must be logged in.");
    if (!amt || amt <= 0) return alert("Enter a valid loan amount.");
    if (!term) return alert("Enter a loan term.");
    if (!purpose) return alert("Enter the purpose of the loan.");

    setLoading(true);
    try {
      await addDoc(collection(db, "loans"), {
        userId: user.uid,
        amount: amt,
        term,
        purpose,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setAmount("");
      setTerm("");
      setPurpose("");
      alert("Loan application submitted. Status: pending.");
      if (typeof onApplied === "function") onApplied();
    } catch (err) {
      console.error("apply loan error", err);
      alert("Failed to submit application.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="client-card">
      <h2>Apply for a Loan</h2>

      <form onSubmit={submitHandler} style={{ maxWidth: 560 }}>
        <label>Amount</label>
        <input
          type="number"
          placeholder="Enter amount (e.g., 500000)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <label>Term</label>
        <input
          type="text"
          placeholder="e.g., 12 months"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          required
        />

        <label>Purpose</label>
        <textarea
          rows="4"
          placeholder="Brief description of the purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          required
        />

        <div style={{ marginTop: 12 }}>
          <button className="action-btn" disabled={loading}>
            {loading ? "Submitting…" : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}
