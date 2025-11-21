import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, updateDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./DepositApprovals.css";

export default function DepositApprovals() {
  const [items, setItems] = useState([]);
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    async function fetch() {
      const q = query(collection(db, "transactions"), where("type", "==", "deposit"), where("status", "==", "pending"));
      const snap = await getDocs(q);
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    fetch();
  }, []);

  async function approve(t) {
    setProcessing(t.id);
    try {
      // find user's account doc for the accountType
      const q = query(collection(db, "accounts"), where("uid", "==", t.uid), where("accountType", "==", t.accountType));
      const snap = await getDocs(q);
      if (snap.empty) throw new Error("Account not found.");
      const accDoc = snap.docs[0];

      // update balance
      const accData = accDoc.data();
      await updateDoc(doc(db, "accounts", accDoc.id), { balance: accData.balance + t.amount });

      // mark transaction approved
      await updateDoc(doc(db, "transactions", t.id), { status: "posted", approvedBy: "admin", approvedAt: serverTimestamp() });

      setItems(prev => prev.filter(x => x.id !== t.id));
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(null);
    }
  }

  async function reject(t) {
    setProcessing(t.id);
    try {
      await updateDoc(doc(db, "transactions", t.id), { status: "rejected" });
      setItems(prev => prev.filter(x => x.id !== t.id));
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(null);
    }
  }

  return (
    <div>
      <h3>Deposit Requests</h3>
      {items.length === 0 && <p className="muted">No pending deposit requests.</p>}
      {items.map(t => (
        <div className="dep-card" key={t.id}>
          <div>
            <strong>${t.amount.toFixed(2)}</strong> to {t.accountType} — {t.uid}
            <div className="muted">Note: {t.note || "—"}</div>
          </div>
          <div>
            <button onClick={()=>approve(t)} disabled={processing===t.id}>Approve</button>
            <button onClick={()=>reject(t)} disabled={processing===t.id}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}
