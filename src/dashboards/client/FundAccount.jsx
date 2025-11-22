import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc, updateDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./FundAccount.css";

const fundingOptions = [
  { id: "bank", name: "Bank Transfer", icon: "🏦" },
  { id: "card", name: "Debit/Credit Card", icon: "💳" },
  { id: "paypal", name: "PayPal", icon: "🅿️" },
];

export default function FundAccount() {
  const { currentUser } = useAuth();
  const [balance, setBalance] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!currentUser) return;
      const accRef = doc(db, "accounts", currentUser.uid);
      const accSnap = await getDoc(accRef);
      if (accSnap.exists()) setBalance(accSnap.data().balance || 0);
    };
    fetchBalance();
  }, [currentUser]);

  const handleFund = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!selectedOption) return setMessage("Select a funding method");
    if (!amount || Number(amount) <= 0) return setMessage("Enter a valid amount");

    setLoading(true);
    try {
      const accRef = doc(db, "accounts", currentUser.uid);
      await updateDoc(accRef, { balance: balance + Number(amount) });

      await addDoc(collection(db, "transactions"), {
        userId: currentUser.uid,
        type: "deposit",
        method: selectedOption,
        amount: Number(amount),
        timestamp: serverTimestamp(),
        status: "Completed",
      });

      setBalance(balance + Number(amount));
      setAmount("");
      setSelectedOption("");
      setMessage("Account funded successfully! ✅");
    } catch (err) {
      console.error(err);
      setMessage("Funding failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="fund-container">
      <h2>Fund Your Account</h2>
      <p className="current-balance">Available Balance: <strong>${balance.toFixed(2)}</strong></p>

      <div className="fund-options">
        {fundingOptions.map((option) => (
          <div
            key={option.id}
            className={`fund-card ${selectedOption === option.id ? "selected" : ""}`}
            onClick={() => setSelectedOption(option.id)}
          >
            <span className="fund-icon">{option.icon}</span>
            <span className="fund-name">{option.name}</span>
          </div>
        ))}
      </div>

      <form className="fund-form" onSubmit={handleFund}>
        <div className="form-group">
          <label>Amount ($)</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        {message && <p className={`fund-message ${message.includes("success") ? "success" : "error"}`}>{message}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Fund Account"}
        </button>
      </form>
    </div>
  );
}
