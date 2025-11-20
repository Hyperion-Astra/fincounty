import React, { useEffect, useState } from "react";
import {
  approveTransfer,
  rejectTransfer,
  getAllTransfers,
} from "../../../services/TransferService.jsx";

const TransfersAdmin = () => {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    getAllTransfers().then(setTransfers);
  }, []);

  const handleApprove = async (t) => {
    await approveTransfer(t.id, t.userId, t.amount);
    setTransfers((prev) =>
      prev.map((x) => (x.id === t.id ? { ...x, status: "approved" } : x))
    );
  };

  const handleReject = async (t) => {
    await rejectTransfer(t.id);
    setTransfers((prev) =>
      prev.map((x) => (x.id === t.id ? { ...x, status: "rejected" } : x))
    );
  };

  return (
    <div className="admin-page">
      <h2>Transfers</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Bank</th>
            <th>Account</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {transfers.map((t) => (
            <tr key={t.id}>
              <td>{t.userEmail}</td>
              <td>${t.amount}</td>
              <td>{t.recipientBank}</td>
              <td>{t.accountNumber}</td>
              <td>{t.status}</td>
              <td>
                {t.status === "pending" && (
                  <>
                    <button onClick={() => handleApprove(t)}>Approve</button>
                    <button className="danger-btn" onClick={() => handleReject(t)}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransfersAdmin;
