// src/dashboards/client/ClientLoans.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

/**
 * Shows the current user's loans and allows canceling pending applications.
 */
export default function ClientLoans() {
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "loans"), where("userId", "==", user.uid));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        // sort newest first
        list.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setLoans(list);
        setLoading(false);
      },
      (err) => {
        console.error("loans snapshot error", err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [user]);

  async function cancelLoan(id, status) {
    // only allow cancel if pending
    if (status !== "pending") return alert("Only pending loans can be cancelled.");

    if (!confirm("Cancel this loan application?")) return;

    try {
      await deleteDoc(doc(db, "loans", id));
      alert("Loan application cancelled.");
    } catch (e) {
      console.error(e);
      alert("Failed to cancel loan.");
    }
  }

  if (loading) return <div className="center-loading">Loading loans…</div>;

  return (
    <div className="client-card">
      <h2>Your Loan Applications</h2>

      {loans.length === 0 ? (
        <div className="empty-state">You have no loan applications yet. <br /> Use "Apply for Loan" to submit a new request.</div>
      ) : (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Applied</th>
              <th>Amount</th>
              <th>Term</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loans.map((l) => (
              <tr key={l.id}>
                <td>{new Date(l.createdAt?.seconds ? l.createdAt.seconds * 1000 : Date.now()).toLocaleDateString()}</td>
                <td>₦{Number(l.amount).toLocaleString()}</td>
                <td>{l.term || "-"}</td>
                <td className={`status ${l.status}`}>{l.status}</td>
                <td>
                  {l.status === "pending" ? (
                    <button className="action-btn" onClick={() => cancelLoan(l.id, l.status)}>Cancel</button>
                  ) : (
                    <button className="action-btn" onClick={() => alert("No actions available")}>View</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
