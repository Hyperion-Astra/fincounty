// src/dashboard/client/WithdrawHistory.jsx
import React, { useEffect, useState } from "react";
import { getUserWithdrawals } from "../../helpers/transactionservice";
import "./WithdrawHistory.css";

export default function WithdrawHistory() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getUserWithdrawals();
      setRequests(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="withdraw-history-page">
      <h2>Withdrawal History</h2>

      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p className="empty">No withdrawal records found.</p>
      ) : (
        <table className="withdraw-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>₦{req.amount.toLocaleString()}</td>
                <td className={`status ${req.status.toLowerCase()}`}>
                  {req.status}
                </td>
                <td>{new Date(req.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
