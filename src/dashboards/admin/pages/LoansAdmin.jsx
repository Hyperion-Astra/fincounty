// src/dashboards/admin/pages/LoansAdmin.js
import React, { useEffect, useState } from "react";
import { updateLoanStatus, getAllLoans, approveLoan, rejectLoan } from '../../../services/LoanService';

const LoansAdmin = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    getAllLoans().then(setLoans);
  }, []);

  const handleStatus = async (id, status) => {
    await updateLoanStatus(id, status);
    setLoans((prev) =>
      prev.map((loan) => (loan.id === id ? { ...loan, status } : loan))
    );
  };

  return (
    <div className="admin-page">
      <h2 className="dashboard-title">Loan Applications</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.userName}</td>
              <td>${loan.amount.toLocaleString()}</td>
              <td>{loan.type}</td>
              <td>{loan.status}</td>
              <td>
                <button onClick={() => handleStatus(loan.id, "Approved")}>Approve</button>
                <button onClick={() => handleStatus(loan.id, "Rejected")} className="danger-btn">
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

export default LoansAdmin;
