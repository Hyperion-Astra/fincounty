// src/dashboards/client/Withdraw.jsx
import React, { useState, useEffect } from "react";
import { requestWithdrawal } from "../../helpers/transactionservice.jsx";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./Withdraw.css";

export default function Withdraw() {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load user's wallet balance
  useEffect(() => {
    async function loadBalance() {
      if (!user) return;
      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setBalance(snap.data().wallet || 0);
        }
      } catch (err) {
        console.error("Error fetching balance", err);
      }
    }
    loadBalance();
  }, [user]);

  async function handleWithdraw(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!amount || Number(amount) <= 0) {
      setMessage("Enter a valid amount.");
      setLoading(false);
      return;
    }

    if (Number(amount) > balance) {
      setMessage("Insufficient balance.");
      setLoading(false);
      return;
    }

    try {
      await requestWithdrawal(Number(amount));
      setMessage("Withdrawal request submitted and awaiting approval.");
      setAmount("");
    } catch (err) {
      console.error(err);
      setMessage("Error submitting withdrawal request.");
    }

    setLoading(false);
  }

  return (
    <div className="withdraw-page">
      <h2 className="withdraw-title">Request Withdrawal</h2>

      <div className="balance-card">
        <span>Available Balance:</span>
        <strong>${balance.toLocaleString()}</strong>
      </div>

      <form className="withdraw-form" onSubmit={handleWithdraw}>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter withdrawal amount"
          min="1"
          max={balance}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Submit Request"}
        </button>
      </form>

      {message && <p className="withdraw-msg">{message}</p>}
    </div>
  );
}
