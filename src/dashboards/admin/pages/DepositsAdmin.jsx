import React, { useEffect, useState } from "react";
import {
  approveDeposit,
  rejectDeposit,
  getAllDeposits,
} from "../../../services/DepositService.jsx";

const DepositsAdmin = () => {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    getAllDeposits().then(setDeposits);
  }, []);

  const handleApprove = async (d) => {
    await approveDeposit(d.id, d.userId, d.amount);
    setDeposits((prev) =>
      prev.map((x) => (x.id === d.id ? { ...x, status: "approved" } : x))
    );
  };

  const handleReject = async (d) => {
    await rejectDeposit(d.id);
    setDeposits((prev) =>
      prev.map((x) => (x.id === d.id ? { ...x, status: "rejected" } : x))
    );
  };

  return (
    <div className="admin-page">
      <h2>Deposit Requests</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>User Email</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Proof</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {deposits.map((d) => (
            <tr key={d.id}>
              <td>{d.userEmail}</td>
              <td>${d.amount}</td>
              <td>{d.method}</td>
              <td>
                {d.proofUrl ? (
                  <a href={d.proofUrl} target="_blank">View</a>
                ) : (
                  "None"
                )}
              </td>
              <td>{d.status}</td>
              <td>
                {d.status === "pending" && (
                  <>
                    <button onClick={() => handleApprove(d)}>Approve</button>
                    <button className="danger-btn" onClick={() => handleReject(d)}>Reject</button>
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

export default DepositsAdmin;
