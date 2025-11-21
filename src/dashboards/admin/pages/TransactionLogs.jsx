import React, { useEffect, useState } from "react";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./TransactionLogs.css";

export default function TransactionLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function fetch() {
      const q = query(collection(db, "transactions"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setLogs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    fetch();
  }, []);

  return (
    <div className="tx-logs">
      <h3>All Transactions</h3>
      <table>
        <thead><tr><th>Type</th><th>UID</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
        <tbody>
          {logs.map(l => (
            <tr key={l.id}>
              <td>{l.type}</td>
              <td>{l.uid}</td>
              <td>${l.amount?.toFixed(2)}</td>
              <td>{l.status}</td>
              <td>{l.createdAt?.toDate?.()?.toLocaleString?.()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
