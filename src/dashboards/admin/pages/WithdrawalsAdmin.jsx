// src/dashboards/admin/pages/WithdrawalsAdmin.js
import React, { useEffect, useState } from "react";
import { 
  updateWithdrawalStatus, 
  approveWithdrawal, 
  rejectWithdrawal, 
  getAllWithdrawals 
} from '../../../services/WithdrawalService.jsx';

const WithdrawalsAdmin = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    getAllWithdrawals().then(setWithdrawals);
  }, []);

  const handleStatus = async (id, status) => {
    await updateWithdrawalStatus(id, status);
    setWithdrawals((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status } : w))
    );
  };

  return (
    <div className="admin-page">
      <h2 className="dashboard-title">Withdrawal Requests</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {withdrawals.map((w) => (
            <tr key={w.id}>
              <td>{w.userName}</td>
              <td>${w.amount.toLocaleString()}</td>
              <td>{w.status}</td>
              <td>
                <button onClick={() => handleStatus(w.id, "Approved")}>Approve</button>
                <button onClick={() => handleStatus(w.id, "Rejected")} className="danger-btn">
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WithdrawalsAdmin;
