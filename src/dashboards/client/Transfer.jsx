import React, { useState } from "react";
import { submitTransfer } from "../../services/TransferService.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Transfer.css"

const Transfer = () => {
  const { currentUser } = useAuth();

  const [form, setForm] = useState({
    recipientName: "",
    recipientBank: "",
    accountNumber: "",
    swift: "",
    routing: "",
    type: "local",
    reason: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.amount) {
      setMsg("Enter amount.");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      await submitTransfer({
        userId: currentUser.uid,
        userEmail: currentUser.email,
        ...form,
      });

      setMsg("Transfer request sent. Pending approval.");
      setForm({
        recipientName: "",
        recipientBank: "",
        accountNumber: "",
        swift: "",
        routing: "",
        type: "local",
        reason: "",
        amount: "",
      });
    } catch (err) {
      setMsg("Error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="form-page">
      <h2>Send Money</h2>

      <form onSubmit={handleSubmit}>
        <label>Recipient Name</label>
        <input
          value={form.recipientName}
          onChange={(e) => update("recipientName", e.target.value)}
          required
        />

        <label>Bank</label>
        <input
          value={form.recipientBank}
          onChange={(e) => update("recipientBank", e.target.value)}
          required
        />

        <label>Account Number</label>
        <input
          value={form.accountNumber}
          onChange={(e) => update("accountNumber", e.target.value)}
          required
        />

        <label>SWIFT</label>
        <input
          value={form.swift}
          onChange={(e) => update("swift", e.target.value)}
        />

        <label>Routing Number</label>
        <input
          value={form.routing}
          onChange={(e) => update("routing", e.target.value)}
        />

        <label>Transfer Type</label>
        <select
          value={form.type}
          onChange={(e) => update("type", e.target.value)}
        >
          <option value="local">Local</option>
          <option value="international">International</option>
        </select>

        <label>Reason</label>
        <input
          value={form.reason}
          onChange={(e) => update("reason", e.target.value)}
        />

        <label>Amount</label>
        <input
          type="number"
          value={form.amount}
          onChange={(e) => update("amount", e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Money"}
        </button>
      </form>

      {msg && <p className="form-msg">{msg}</p>}
    </div>
  );
};

export default Transfer;
