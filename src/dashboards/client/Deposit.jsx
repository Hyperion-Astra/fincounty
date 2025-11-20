import React, { useState } from "react";
import { submitDeposit } from "../../services/DepositService.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Transfer.css"

const Deposit = () => {
  const { currentUser } = useAuth();

  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bank");
  const [proofUrl, setProofUrl] = useState("");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount) {
      setMsg("Enter an amount.");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      await submitDeposit({
        userId: currentUser.uid,
        userEmail: currentUser.email,
        amount,
        method,
        proofUrl,
        note,
      });

      setMsg("Deposit submitted successfully! Pending approval.");
      setAmount("");
      setNote("");
      setProofUrl("");
    } catch (err) {
      setMsg("Error submitting deposit: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="form-page">
      <h2>Make a Deposit</h2>

      <form onSubmit={handleSubmit}>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <label>Payment Method</label>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="bank">Bank Transfer</option>
          <option value="card">Card</option>
          <option value="crypto">Crypto</option>
        </select>

        <label>Proof Image (URL)</label>
        <input
          type="text"
          value={proofUrl}
          onChange={(e) => setProofUrl(e.target.value)}
          placeholder="Optional"
        />

        <label>Note (optional)</label>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Deposit"}
        </button>
      </form>

      {msg && <p className="form-msg">{msg}</p>}
    </div>
  );
};

export default Deposit;
