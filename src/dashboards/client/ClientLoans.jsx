// src/dashboards/client/ClientLoans.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import "./ClientLoans.css";

export default function ClientLoans() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    async function fetchLoans() {
      const uid = localStorage.getItem("uid");
      if (!uid) return;

      const q = query(
        collection(db, "loans"),
        where("uid", "==", uid),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      setLoans(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchLoans();
  }, []);

  return (
    <div className="loans-container">
      <h2>Your Loans</h2>
      <table className="loans-table">
        <thead>
          <tr>
            <th>Loan Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Next Payment</th>
          </tr>
        </thead>
        <tbody>
          {loans.map(loan => (
            <tr key={loan.id}>
              <td>{loan.type}</td>
              <td>${loan.amount.toFixed(2)}</td>
              <td>{loan.status}</td>
              <td>{loan.nextPayment ? new Date(loan.nextPayment.seconds * 1000).toLocaleDateString() : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
