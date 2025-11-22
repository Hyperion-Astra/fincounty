import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import "./Withdraw.css";

// Only crypto works — others show "Coming soon"
const methods = [
  { id: "crypto", label: "Cryptocurrency", icon: "🪙" },
  { id: "paypal", label: "PayPal", icon: "🅿️" },
  { id: "mobile", label: "Mobile Money", icon: "📱" },
];

export default function Withdraw() {
  const { currentUser } = useAuth();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Form states
  const [method, setMethod] = useState("crypto");
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [network, setNetwork] = useState("BTC");
  const [memo, setMemo] = useState("");
  const [disabledMsg, setDisabledMsg] = useState("");

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

  // Handle unavailable withdrawal options
  useEffect(() => {
    if (method !== "crypto") {
      setDisabledMsg("This withdrawal method is not yet available. Please try again later.");
    } else {
      setDisabledMsg("");
    }
  }, [method]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (method !== "crypto") {
      setMessage("This method is not yet available.");
      return;
    }

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

    if (!walletAddress) {
      setMessage("Wallet address is required.");
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "withdrawals"), {
        userId: currentUser.uid,
        method: "crypto",
        network,
        walletAddress,
        memo,
        amount: Number(amount),
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setMessage("Crypto withdrawal request submitted successfully ✅");

      setAmount("");
      setWalletAddress("");
      setMemo("");
      setNetwork("BTC");
      setMethod("crypto");
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

      {/* Withdrawal method selector */}
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

      {/* Disabled messages for non-crypto */}
      {disabledMsg && method !== "crypto" && (
        <p className="disabled-msg">{disabledMsg}</p>
      )}

      <form className="withdraw-form" onSubmit={handleSubmit}>
        {/* CRYPTO FIELDS */}
        {method === "crypto" && (
          <>
            <label>Select Network</label>
            <select value={network} onChange={(e) => setNetwork(e.target.value)}>
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="USDT-TRC20">USDT (TRC20)</option>
              <option value="USDT-ERC20">USDT (ERC20)</option>
            </select>

            <label>Wallet Address</label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="Enter your crypto wallet address"
            />

            <label>Memo / Tag (Optional)</label>
            <input
              type="text"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="Memo / Tag if required"
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

        <button type="submit" disabled={loading || method !== "crypto"}>
          {loading ? "Submitting..." : "Submit Withdrawal Request"}
        </button>
      </form>

      {message && (
        <p className={`withdraw-msg ${message.includes("success") ? "success" : "error"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
