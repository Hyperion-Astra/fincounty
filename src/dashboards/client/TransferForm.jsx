import React, { useState } from "react";
import { collection, addDoc, doc, updateDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./TransferForm.css";

export default function TransferForm({ uid }) {
  const [from, setFrom] = useState("checking");
  const [toType, setToType] = useState("internal"); // internal | savings | external
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    if (!amount || Number(amount) <= 0) return setMessage("Enter a valid amount.");

    setLoading(true);
    try {
      // get source account doc
      const q = query(collection(db, "accounts"), where("uid", "==", uid), where("accountType", "==", from));
      const snap = await getDocs(q);
      if (snap.empty) throw new Error("Source account not found.");
      const fromDoc = snap.docs[0];
      const fromData = fromDoc.data();

      // simple balance check
      if (fromData.balance < Number(amount)) throw new Error("Insufficient funds.");

      // for internal transfers to savings (same uid)
      if (toType === "savings") {
        const q2 = query(collection(db, "accounts"), where("uid", "==", uid), where("accountType", "==", "savings"));
        const snap2 = await getDocs(q2);
        if (snap2.empty) throw new Error("Destination savings account not found.");
        const toDoc = snap2.docs[0];

        // create transaction
        await addDoc(collection(db, "transactions"), {
          uid,
          type: "transfer",
          amount: Number(amount),
          fromAccount: fromData.accountNumber,
          toAccount: toDoc.data().accountNumber,
          status: "posted",
          createdAt: serverTimestamp(),
        });

        // update balances (atomic not available client-side—be careful in production)
        await updateDoc(doc(db, "accounts", fromDoc.id), { balance: fromData.balance - Number(amount) });
        await updateDoc(doc(db, "accounts", toDoc.id), { balance: toDoc.data().balance + Number(amount) });

        setMessage("Transfer to savings completed.");
      } else if (toType === "internal" && toAccount) {
        // internal transfer to other user by account number (instant)
        const q3 = query(collection(db, "accounts"), where("accountNumber", "==", toAccount));
        const snap3 = await getDocs(q3);
        if (snap3.empty) throw new Error("Destination account not found.");
        const toDoc = snap3.docs[0];

        // write transaction
        await addDoc(collection(db, "transactions"), {
          uid,
          type: "transfer",
          amount: Number(amount),
          fromAccount: fromData.accountNumber,
          toAccount,
          status: "posted",
          createdAt: serverTimestamp(),
        });

        await updateDoc(doc(db, "accounts", fromDoc.id), { balance: fromData.balance - Number(amount) });
        await updateDoc(doc(db, "accounts", toDoc.id), { balance: toDoc.data().balance + Number(amount) });

        setMessage("Transfer completed.");
      } else {
        // external transfer: create pending transaction (admin simulation)
        await addDoc(collection(db, "transactions"), {
          uid,
          type: "external_transfer",
          amount: Number(amount),
          fromAccount: fromData.accountNumber,
          toAccount: toAccount || null,
          status: "pending",
          createdAt: serverTimestamp(),
        });
        setMessage("External transfer requested—pending processing.");
      }

      setAmount("");
      setToAccount("");
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Transfer failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="transfer-card">
      <h4>Transfer</h4>
      <form onSubmit={handleSubmit}>
        <label>From</label>
        <select value={from} onChange={e => setFrom(e.target.value)} disabled={loading}>
          <option value="checking">Checking</option>
          <option value="savings">Savings</option>
        </select>

        <label>To</label>
        <select value={toType} onChange={e => setToType(e.target.value)} disabled={loading}>
          <option value="internal">Another user (account #)</option>
          <option value="savings">Your savings</option>
          <option value="external">External bank (ACH)</option>
        </select>

        {toType !== "savings" && (
          <>
            <label>Destination account #</label>
            <input value={toAccount} onChange={e => setToAccount(e.target.value)} placeholder="1234567890" disabled={loading || toType === "savings"} />
          </>
        )}

        <label>Amount</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" disabled={loading} />

        <button type="submit" disabled={loading}>{loading ? "Processing..." : "Send"}</button>

        {message && <p className="muted">{message}</p>}
      </form>
    </div>
  );
}
