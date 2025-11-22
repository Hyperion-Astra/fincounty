// src/dashboards/client/PayBills.jsx
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc, updateDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./PayBills.css";
import { FaBolt, FaTint, FaWifi, FaFire } from "react-icons/fa";

const billsList = [
  { name: "Electricity", icon: <FaBolt /> },
  { name: "Water", icon: <FaTint /> },
  { name: "Internet", icon: <FaWifi /> },
  { name: "Gas", icon: <FaFire /> },
];

export default function PayBills() {
  const { currentUser } = useAuth();
  const [balance, setBalance] = useState(0);
  const [selectedBill, setSelectedBill] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      const accRef = doc(db, "accounts", currentUser.uid);
      const accSnap = await getDoc(accRef);
      if (accSnap.exists()) setBalance(accSnap.data().balance || 0);
    };
    fetchBalance();
  }, [currentUser.uid]);

  const handlePayBill = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!selectedBill) return setMessage("Select a bill");
    if (!amount || Number(amount) <= 0) return setMessage("Enter a valid amount");
    if (Number(amount) > balance) return setMessage("Insufficient funds");

    try {
      const accRef = doc(db, "accounts", currentUser.uid);
      await updateDoc(accRef, { balance: balance - Number(amount) });

      await addDoc(collection(db, "transactions"), {
        userId: currentUser.uid,
        type: "bill",
        bill: selectedBill,
        amount: Number(amount),
        timestamp: serverTimestamp(),
      });

      setMessage(`${selectedBill} bill paid successfully!`);
      setBalance(balance - Number(amount));
      setSelectedBill("");
      setAmount("");
    } catch (err) {
      console.error(err);
      setMessage("Payment failed. Try again.");
    }
  };

  return (
    <div className="paybills-container">
      <h2>Pay Your Bills</h2>
      <p className="balance">Available Balance: <span>${balance.toFixed(2)}</span></p>

      <form className="paybills-form" onSubmit={handlePayBill}>
        <div className="bill-cards">
          {billsList.map((bill) => (
            <div
              key={bill.name}
              className={`bill-card ${selectedBill === bill.name ? "selected" : ""}`}
              onClick={() => setSelectedBill(bill.name)}
            >
              <div className="bill-icon">{bill.icon}</div>
              <p>{bill.name}</p>
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>

        {message && <p className="form-message">{message}</p>}

        <button type="submit" className="pay-button">Pay Bill</button>
      </form>
    </div>
  );
}
