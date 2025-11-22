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
  const [toAccount, setToAccount] = useState(""); // destination account number
  const [toType, setToType] = useState("internal"); // internal | external
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // helper: parse numeric safely (digit-by-digit attention)
  function parseAmount(v) {
    const s = String(v).trim();
    if (!s) return 0;
    // remove non-digit except dot
    const cleaned = s.replace(/[^\d.]/g, "");
    // ensure only one dot
    const parts = cleaned.split(".");
    if (parts.length > 2) return NaN;
    let whole = parts[0] || "0";
    let frac = parts[1] || "";
    // limit to 2 decimal places
    if (frac.length > 2) frac = frac.slice(0, 2);
    const composed = frac ? `${whole}.${frac}` : whole;
    return Number(composed);
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
      // find source account doc for this user and account type
      const qFrom = query(
        collection(db, "accounts"),
        where("uid", "==", uid),
        where("accountType", "==", fromType)
      );
      const snapFrom = await getDocs(qFrom);
      if (snapFrom.empty) throw new Error("Source account not found.");
      const fromDoc = snapFrom.docs[0];
      const fromData = fromDoc.data();

      // balance check
      if ((fromData.balance ?? 0) < amt) throw new Error("Insufficient funds.");

      if (toType === "savings" || (toType === "internal" && toAccount === fromData.accountNumber)) {
        // internal transfer to same user's savings (or between own accounts)
        const qTo = query(
          collection(db, "accounts"),
          where("uid", "==", uid),
          where("accountType", "==", toType === "savings" ? "savings" : fromType === "checking" ? "savings" : "checking")
        );
        const snapTo = await getDocs(qTo);
        if (snapTo.empty) throw new Error("Destination account not found.");
        const toDoc = snapTo.docs[0];

        // create transaction record
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

        // update balances (note: client-side concurrency risk — good enough for demo)
        await updateDoc(doc(db, "accounts", fromDoc.id), { balance: (fromData.balance ?? 0) - amt });
        await updateDoc(doc(db, "accounts", toDoc.id), { balance: (toDoc.data().balance ?? 0) + amt });

        setFeedback({ type: "success", text: "Transfer completed." });
      } else if (toType === "internal") {
        // internal transfer to another user's account by account number
        const qTo = query(collection(db, "accounts"), where("accountNumber", "==", toAccount));
        const snapTo = await getDocs(qTo);
        if (snapTo.empty) throw new Error("Destination account not found.");
        const toDoc = snapTo.docs[0];

        // write transaction
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

        // update balances
        await updateDoc(doc(db, "accounts", fromDoc.id), { balance: (fromData.balance ?? 0) - amt });
        await updateDoc(doc(db, "accounts", toDoc.id), { balance: (toDoc.data().balance ?? 0) + amt });

        setFeedback({ type: "success", text: "Transfer completed." });
      } else {
        // external ACH transfer — create pending transaction for admin processing
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
    } catch (err) {
      console.error(err);
      setFeedback({ type: "error", text: err.message || "Transfer failed." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="transfer-page">
      <h2>Send Money</h2>
      <form className="transfer-form" onSubmit={handleSubmit}>
        <label>From</label>
        <select value={fromType} onChange={(e) => setFromType(e.target.value)} disabled={loading}>
          <option value="checking">Checking</option>
          <option value="savings">Savings</option>
        </select>

        <label>Transfer type</label>
        <select value={toType} onChange={(e) => setToType(e.target.value)} disabled={loading}>
          <option value="internal">Internal (another FinBank customer)</option>
          <option value="savings">Move to your savings</option>
          <option value="external">External (ACH)</option>
        </select>

        {toType !== "savings" && (
          <>
            <label>Destination account number</label>
            <input
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value.trim())}
              placeholder="1234567890"
              disabled={loading}
            />
          </>
        )}

        <label>Amount (USD)</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          inputMode="decimal"
          disabled={loading}
        />

        <label>Note (optional)</label>
        <input value={note} onChange={(e) => setNote(e.target.value)} disabled={loading} />

        <button type="submit" disabled={loading}>{loading ? "Processing..." : "Send"}</button>

        {feedback && <p className={`msg ${feedback.type}`}>{feedback.text}</p>}
      </form>
    </div>
  );
}
