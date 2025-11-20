// src/dashboards/client/Deposit.jsx
import React, { useState } from "react";
import "./Deposit.css";

export default function Deposit() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleDeposit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!amount || Number(amount) <= 0) {
      setMessage("Enter a valid amount.");
      setLoading(false);
      return;
    }

    try {
      // TODO: Call deposit service here
      setMessage(`$${amount} deposit submitted successfully.`);
      setAmount("");
    } catch (err) {
      console.error(err);
      setMessage("Error processing deposit.");
    }

    setLoading(false);
  }

  return (
    <div className="deposit-page">
      <h2>Deposit Funds</h2>

      <form className="deposit-form" onSubmit={handleDeposit}>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter deposit amount"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Deposit"}
        </button>
      </form>

      {message && <p className="deposit-msg">{message}</p>}
    </div>
  );
}
