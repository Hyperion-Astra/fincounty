// src/dashboards/client/Transfer.jsx
import React, { useState } from "react";
import "./Transfer.css";

export default function Transfer() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleTransfer(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!recipient || !amount || Number(amount) <= 0) {
      setMessage("Enter valid recipient and amount.");
      setLoading(false);
      return;
    }

    try {
      // TODO: Call transfer service here
      setMessage(`$${amount} transfer to ${recipient} submitted successfully.`);
      setAmount("");
      setRecipient("");
    } catch (err) {
      console.error(err);
      setMessage("Error processing transfer.");
    }

    setLoading(false);
  }

  return (
    <div className="transfer-page">
      <h2>Transfer Money</h2>

      <form className="transfer-form" onSubmit={handleTransfer}>
        <label>Recipient Account</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Enter recipient account"
        />

        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Send Money"}
        </button>
      </form>

      {message && <p className="transfer-msg">{message}</p>}
    </div>
  );
}
