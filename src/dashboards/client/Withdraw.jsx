// src/dashboards/client/Withdraw.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import "./Withdraw.css";

export default function Withdraw() {
  const { user } = useAuth();

  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Form fields
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bank");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [note, setNote] = useState("");

  // Load user balance
  useEffect(() => {
    if (!user) return;

    async function load() {
      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) setBalance(snap.data().wallet || 0);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [user]);

  async function submitWithdrawal(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // Validate
    if (!amount || Number(amount) <= 0) {
      setMessage("Enter a valid withdrawal amount.");
      setLoading(false);
      return;
    }
    if (Number(amount) > balance) {
      setMessage("Insufficient wallet balance.");
      setLoading(false);
      return;
    }
    if (!accountName || !accountNumber) {
      setMessage("Account name and number are required.");
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "withdrawals"), {
        userId: user.uid,
        amount: Number(amount),
        method,
        accountName,
        accountNumber,
        bankName,
        swiftCode,
        note,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setMessage("Withdrawal request submitted. Awaiting admin approval.");
      setAmount("");
      setAccountName("");
      setAccountNumber("");
      setBankName("");
      setSwiftCode("");
      setNote("");
    } catch (err) {
      console.error(err);
      setMessage("Failed to submit request.");
    }

    setLoading(false);
  }

  return (
    <div className="withdraw-page">
      <h2 className="withdraw-title">Withdraw Funds</h2>

      <div className="balance-card">
        <span>Available Balance:</span>
        <strong>${balance.toLocaleString()}</strong>
      </div>

      <form className="withdraw-form" onSubmit={submitWithdrawal}>

        <label>Withdrawal Method</label>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="bank">Bank Transfer</option>
          <option value="crypto">Cryptocurrency</option>
          <option value="paypal">PayPal</option>
          <option value="mobile">Mobile Money</option>
        </select>

        <label>Account / Wallet Name</label>
        <input
          type="text"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          placeholder="Enter account name"
        />

        <label>Account Number / Wallet Address</label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Enter account number or wallet address"
        />

        {/* Bank fields only for bank transfer */}
        {method === "bank" && (
          <>
            <label>Bank Name</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Enter bank name"
            />

            <label>SWIFT / Routing Code</label>
            <input
              type="text"
              value={swiftCode}
              onChange={(e) => setSwiftCode(e.target.value)}
              placeholder="SWIFT / Routing Code"
            />
          </>
        )}

        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          max={balance}
        />

        <label>Note (Optional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Describe purpose of withdrawal..."
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Withdrawal Request"}
        </button>
      </form>

      {message && <p className="withdraw-msg">{message}</p>}
    </div>
  );
}
