import React, { useEffect, useState } from "react";
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./Loans.css";

export default function Loans({ uid }) {
  const [requests, setRequests] = useState([]);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function fetchLoans() {
      const q = query(collection(db, "loans"), where("uid", "==", uid));
      const snap = await getDocs(q);
      setRequests(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    fetchLoans();
  }, [uid]);

  async function requestLoan(e) {
    e.preventDefault();
    if (!amount || Number(amount) < 100) return setMsg("Minimum loan request: $100.");
    setLoading(true);
    try {
      await addDoc(collection(db, "loans"), {
        uid,
        amount: Number(amount),
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setMsg("Loan requested. Admin will review.");
      setAmount("");
    } catch (err) {
      setMsg("Failed to request loan.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="loans-card">
      <h3>Loans</h3>
      <div className="loan-request">
        <form onSubmit={requestLoan}>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount (USD)" disabled={loading} />
          <button type="submit" disabled={loading}>{loading ? "Requesting..." : "Request Loan"}</button>
        </form>
        {msg && <p className="muted">{msg}</p>}
      </div>

      <div className="loan-list">
        <h4>Your requests</h4>
        <ul>
          {requests.map(r => (
            <li key={r.id}>
              <strong>${r.amount.toFixed(2)}</strong> — <span className={`chip ${r.status}`}>{r.status}</span>
            </li>
          ))}
          {!requests.length && <li className="muted">No loan requests yet.</li>}
        </ul>
      </div>
    </div>
  );
}
