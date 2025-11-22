import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import "./Transfer.css";

export default function Transfer() {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;

  const [fromType, setFromType] = useState("checking"); // checking | savings
  const [toType, setToType] = useState("internal"); // internal | savings | external
  const [toAccount, setToAccount] = useState(""); // destination account number
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  function parseAmount(v) {
    const s = String(v).trim();
    if (!s) return 0;
    const cleaned = s.replace(/[^\d.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) return NaN;
    let whole = parts[0] || "0";
    let frac = parts[1] || "";
    if (frac.length > 2) frac = frac.slice(0, 2);
    return Number(frac ? `${whole}.${frac}` : whole);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFeedback(null);

    const amt = parseAmount(amount);
    if (Number.isNaN(amt) || amt <= 0) {
      setFeedback({ type: "error", text: "Enter a valid amount." });
      return;
    }
    if (!uid) {
      setFeedback({ type: "error", text: "You must be logged in." });
      return;
    }

    setLoading(true);

    try {
      const qFrom = query(
        collection(db, "accounts"),
        where("uid", "==", uid),
        where("accountType", "==", fromType)
      );
      const snapFrom = await getDocs(qFrom);
      if (snapFrom.empty) throw new Error("Source account not found.");
      const fromDoc = snapFrom.docs[0];
      const fromData = fromDoc.data();

      if ((fromData.balance ?? 0) < amt) throw new Error("Insufficient funds.");

      if (toType === "savings" || (toType === "internal" && toAccount === fromData.accountNumber)) {
        const qTo = query(
          collection(db, "accounts"),
          where("uid", "==", uid),
          where("accountType", "==", toType === "savings" ? "savings" : fromType === "checking" ? "savings" : "checking")
        );
        const snapTo = await getDocs(qTo);
        if (snapTo.empty) throw new Error("Destination account not found.");
        const toDoc = snapTo.docs[0];

        await addDoc(collection(db, "transactions"), {
          uid,
          type: "internal_transfer",
          amount: amt,
          fromAccount: fromData.accountNumber,
          toAccount: toDoc.data().accountNumber,
          status: "posted",
          note,
          createdAt: serverTimestamp(),
        });

        await updateDoc(doc(db, "accounts", fromDoc.id), { balance: (fromData.balance ?? 0) - amt });
        await updateDoc(doc(db, "accounts", toDoc.id), { balance: (toDoc.data().balance ?? 0) + amt });

        setFeedback({ type: "success", text: "Transfer completed." });
      } else if (toType === "internal") {
        const qTo = query(collection(db, "accounts"), where("accountNumber", "==", toAccount));
        const snapTo = await getDocs(qTo);
        if (snapTo.empty) throw new Error("Destination account not found.");
        const toDoc = snapTo.docs[0];

        await addDoc(collection(db, "transactions"), {
          uid,
          type: "transfer",
          amount: amt,
          fromAccount: fromData.accountNumber,
          toAccount,
          status: "posted",
          note,
          createdAt: serverTimestamp(),
        });

        await updateDoc(doc(db, "accounts", fromDoc.id), { balance: (fromData.balance ?? 0) - amt });
        await updateDoc(doc(db, "accounts", toDoc.id), { balance: (toDoc.data().balance ?? 0) + amt });

        setFeedback({ type: "success", text: "Transfer completed." });
      } else {
        await addDoc(collection(db, "transactions"), {
          uid,
          type: "external_transfer",
          amount: amt,
          fromAccount: fromData.accountNumber,
          toAccount: toAccount || null,
          status: "pending",
          note,
          createdAt: serverTimestamp(),
        });
        setFeedback({ type: "info", text: "External transfer requested — pending processing." });
      }

      setAmount("");
      setToAccount("");
      setNote("");
      setFromType("checking");
      setToType("internal");
    } catch (err) {
      console.error(err);
      setFeedback({ type: "error", text: err.message || "Transfer failed." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="transfer-container">
      <h2>Send Money</h2>
      <form className="transfer-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>From Account</label>
          <select value={fromType} onChange={(e) => setFromType(e.target.value)} disabled={loading}>
            <option value="checking">Checking</option>
            <option value="savings">Savings</option>
          </select>
        </div>

        <div className="form-group">
          <label>Transfer Type</label>
          <select value={toType} onChange={(e) => setToType(e.target.value)} disabled={loading}>
            <option value="internal">Internal (FinBank customer)</option>
            <option value="savings">Move to your savings</option>
            <option value="external">External (ACH)</option>
          </select>
        </div>

        {toType !== "savings" && (
          <div className="form-group">
            <label>Destination Account Number</label>
            <input
              type="text"
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value.trim())}
              placeholder="1234567890"
              disabled={loading}
            />
          </div>
        )}

        <div className="form-group">
          <label>Amount (USD)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            inputMode="decimal"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Note (Optional)</label>
          <input value={note} onChange={(e) => setNote(e.target.value)} disabled={loading} />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Send"}
        </button>

        {feedback && <p className={`msg ${feedback.type}`}>{feedback.text}</p>}
      </form>
    </div>
  );
}
