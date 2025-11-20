import React, { useEffect, useState } from "react";
import {
  updateWithdrawalStatus,
  getAllWithdrawals,
  approveWithdrawal,
  rejectWithdrawal,
} from "../../../services/WithdrawalService.jsx";

export default function WithdrawalsAdmin() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [selected, setSelected] = useState(null); // modal details

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getAllWithdrawals();
    setWithdrawals(data);
  }

  async function handleApprove(w) {
    await approveWithdrawal(w.id, w.userId, w.amount);
    load();
  }

  async function handleReject(id) {
    await rejectWithdrawal(id);
    load();
  }

  return (
    <div className="admin-page">
      <h2 className="dashboard-title">Withdrawal Requests</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {withdrawals.map((w) => (
            <tr key={w.id}>
              <td>{w.userId}</td>
              <td>${w.amount?.toLocaleString()}</td>
              <td>{w.method}</td>
              <td>{w.status}</td>

              <td>
                <button
                  className="btn-view"
                  onClick={() => setSelected(w)}
                >
                  View
                </button>
              </td>

              <td>
                {w.status === "pending" && (
                  <>
                    <button
                      className="btn-approve"
                      onClick={() => handleApprove(w)}
                    >
                      Approve
                    </button>

                    <button
                      className="btn-reject"
                      onClick={() => handleReject(w.id)}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* DETAILS MODAL */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Withdrawal Details</h3>

            <p><strong>User ID:</strong> {selected.userId}</p>
            <p><strong>Amount:</strong> ${selected.amount?.toLocaleString()}</p>
            <p><strong>Method:</strong> {selected.method}</p>

            {selected.method === "bank" && (
              <>
                <p><strong>Bank Name:</strong> {selected.bankName}</p>
                <p><strong>SWIFT / Routing:</strong> {selected.swiftCode}</p>
              </>
            )}

            <p><strong>Account Name:</strong> {selected.accountName}</p>
            <p><strong>Account Number:</strong> {selected.accountNumber}</p>

            {selected.note && (
              <p><strong>Note:</strong> {selected.note}</p>
            )}

            <p><strong>Status:</strong> {selected.status}</p>

            <button className="modal-close" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
