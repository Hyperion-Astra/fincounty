import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Transactions() {
  const { user } = useAuth();
  const [tx, setTx] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTx() {
      try {
        const q = query(
          collection(db, "transactions"),
          where("uid", "==", user.uid)
        );

        const snap = await getDocs(q);

        const list = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTx(list);
      } catch (e) {
        console.error("Transaction load error:", e);
      }
      setLoading(false);
    }

    if (user) loadTx();
  }, [user]);

  if (loading) return <div className="center-loading">Loading...</div>;

  return (
    <div className="transactions-page">
      <h2>Transaction History</h2>

      {tx.length === 0 ? (
        <div className="empty-state">No transactions yet</div>
      ) : (
        <div className="table-wrapper">
          <table className="tx-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {tx.map((t) => (
                <tr key={t.id}>
                  <td>{new Date(t.date).toLocaleDateString()}</td>
                  <td>{t.type}</td>
                  <td>${t.amount.toLocaleString()}</td>
                  <td className={`status ${t.status}`}>{t.status}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}
