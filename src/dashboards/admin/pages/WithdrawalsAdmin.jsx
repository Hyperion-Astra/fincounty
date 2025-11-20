// src/dashboards/admin/pages/WithdrawalsAdmin.js
import React, { useEffect, useState } from "react";
import { 
  updateWithdrawalStatus,
  approveWithdrawal,
  rejectWithdrawal,
  getAllWithdrawals
} from "../../../services/WithdrawalService.jsx";

const WithdrawalsAdmin = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    getAllWithdrawals().then(setWithdrawals);
  }, []);

  const handleApprove = async (w) => {
    const success = await approveWithdrawal(w);
    if (!success) return alert("Error approving withdrawal");

    setWithdrawals((prev) =>
      prev.map((x) =>
        x.id === w.id ? { ...x, status: "approved" } : x
      )
    );
  };

  const handleReject = async (w) => {
    await rejectWithdrawal(w.id);
    setWithdrawals((prev) =>
      prev.map((x) =>
        x.id === w.id ? { ...x, status: "rejected" } : x
      )
    );
  };

  return (
    <div className="admin-page">
      <h2 className="dashboard-title">Withdrawal Requests</h2>

      <table className="admin-table withdrawals-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Account Details</th>
            <th>Note</th>
            <th>Status</th>
            <th>Submitted</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {withdrawals.map((w) => (
            <tr key={w.id}>
              <td>{w.userName || w.userId}</td>

              <td>${w.amount.toLocaleString()}</td>

              <td style={{ textTransform: "capitalize" }}>
                {w.method}
              </td>

              <td>
                <div>
                  <strong>{w.accountName}</strong> <br />
                  {w.accountNumber}
                </div>

                {w.method === "bank" && (
                  <div className="bank-info">
                    Bank: {w.bankName} <br />
                    SWIFT/Routing: {w.swiftCode || "N/A"}
                  </div>
                )}
              </td>

              <td>{w.note || "—"}</td>

              <td>
                <span
                  className={`status-badge ${w.status.toLowerCase()}`}
                >
                  {w.status}
                </span>
              </td>

              <td>
                {w.createdAt
                  ? new Date(w.createdAt.seconds * 1000).toLocaleString()
                  : "—"}
              </td>

              <td>
                {w.status === "pending" ? (
                  <>
                    <button 
                      className="approve-btn"
                      onClick={() => handleApprove(w)}
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() => handleReject(w)}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <em>No action</em>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WithdrawalsAdmin;
