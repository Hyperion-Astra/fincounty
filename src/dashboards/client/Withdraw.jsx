import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import "./Withdraw.css";

const methods = [
  { id: "bank", label: "Bank Transfer", icon: "🏦" },
  { id: "crypto", label: "Cryptocurrency", icon: "🪙" },
  { id: "paypal", label: "PayPal", icon: "🅿️" },
  { id: "mobile", label: "Mobile Money", icon: "📱" },
];

export default function Withdraw() {
  const { currentUser } = useAuth();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [method, setMethod] = useState("bank");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    const loadBalance = async () => {
      try {
        const accRef = doc(db, "accounts", currentUser.uid);
        const snap = await getDoc(accRef);
        if (snap.exists()) setBalance(snap.data().balance || 0);
      } catch (err) {
        console.error(err);
      }
    };
    loadBalance();
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

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
    if (!accountName || !accountNumber) {
      setMessage("Account/Wallet Name and Number are required.");
      setLoading(false);
      return;
    }
    if (method === "bank" && (!bankName || !swiftCode)) {
      setMessage("Bank Name and SWIFT/Routing code are required.");
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "withdrawals"), {
        userId: currentUser.uid,
        method,
        accountName,
        accountNumber,
        bankName: method === "bank" ? bankName : "",
        swiftCode: method === "bank" ? swiftCode : "",
        note,
        amount: Number(amount),
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setMessage("Withdrawal request submitted successfully ✅");
      setAmount("");
      setAccountName("");
      setAccountNumber("");
      setBankName("");
      setSwiftCode("");
      setNote("");
      setMethod("bank");
    } catch (err) {
      console.error(err);
      setMessage("Submission failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="withdraw-container">
      <h2>Withdraw Funds</h2>
      <div className="balance-card">
        <span>Available Balance</span>
        <strong>${balance.toLocaleString()}</strong>
      </div>

      <div className="method-selector">
        {methods.map((m) => (
          <div
            key={m.id}
            className={`method-card ${method === m.id ? "selected" : ""}`}
            onClick={() => setMethod(m.id)}
          >
            <span className="method-icon">{m.icon}</span>
            <span className="method-label">{m.label}</span>
          </div>
        ))}
      </div>

      <form className="withdraw-form" onSubmit={handleSubmit}>
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

        <label>Amount ($)</label>
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

      {message && <p className={`withdraw-msg ${message.includes("success") ? "success" : "error"}`}>{message}</p>}
    </div>
  );
}
