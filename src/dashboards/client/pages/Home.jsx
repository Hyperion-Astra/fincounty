// src/dashboards/client/pages/Home.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import formatCurrency from "../../helpers/formatCurrency";
import formatDate from "../../helpers/formatDate";
import "../../client/client.css";

export default function ClientHome() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState(0);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // load wallet
        const uRef = doc(db, "users", user.uid);
        const uSnap = await getDoc(uRef);
        if (uSnap.exists()) {
          const data = uSnap.data();
          setWallet(data.wallet ?? data.balance ?? 0);
        }

        // load recent transactions (last 5)
        const q = query(collection(db, "transactions"), where("userId", "==", user.uid));
        const snap = await getDocs(q);
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        // sort descending by createdAt (support firestore timestamp or ms)
        items.sort((a,b) => {
          const ta = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : a.createdAt || 0;
          const tb = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : b.createdAt || 0;
          return tb - ta;
        });
        setRecent(items.slice(0,5));
      } catch (e) {
        console.error("ClientHome load error", e);
      }

      setLoading(false);
    }

    load();
  }, [user]);

  if (loading) return <div className="empty">Loading...</div>;

  return (
    <div className="client-content">
      <div className="client-grid">
        <div className="card">
          <h4>Wallet Balance</h4>
          <div className="value">{formatCurrency(wallet)}</div>
        </div>

        <div className="card">
          <h4>Active Loans</h4>
          <div className="value">0</div>
        </div>

        <div className="card">
          <h4>Pending Withdrawals</h4>
          <div className="value">0</div>
        </div>
      </div>

      <div className="card recent-activity">
        <h4>Recent Activity</h4>

        {recent.length === 0 ? (
          <div className="empty">No recent activity.</div>
        ) : (
          recent.map(tx => (
            <div className="tx-row" key={tx.id}>
              <div className="type">{tx.type ?? "transaction"}</div>
              <div className="amount">{formatCurrency(tx.amount)}</div>
              <div className="date">{formatDate(tx.createdAt ?? tx.timestamp)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
