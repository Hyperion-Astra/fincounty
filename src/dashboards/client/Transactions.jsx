// src/dashboards/client/Transactions.jsx
import React, { useMemo, useState } from "react";
import "./Transactions.css";

export default function Transactions() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  // ===== DEMO HISTORY (Balanced to $24,410,305) =====
  const transactions = [
    { id: "1", createdAt: new Date("2026-02-10"), type: "Private Equity Capital Injection", amount: 8500000 },
    { id: "2", createdAt: new Date("2026-01-19"), type: "Asset Liquidation", amount: 5200000 },
    { id: "3", createdAt: new Date("2026-01-14"), type: "International Wire Incoming", amount: 3400000 },
    { id: "4", createdAt: new Date("2025-12-26"), type: "Portfolio Dividend", amount: 2300000 },
    { id: "5", createdAt: new Date("2025-12-13"), type: "Real Estate Sale", amount: 4600000 },
    { id: "6", createdAt: new Date("2025-11-21"), type: "International Transfer", amount: -1250000 },
    { id: "7", createdAt: new Date("2025-10-15"), type: "Investment Diversification", amount: -750000 },
    { id: "8", createdAt: new Date("2025-09-18"), type: "Private Jet Charter", amount: -480000 },
    { id: "9", createdAt: new Date("2025-08-07"), type: "Luxury Asset Acquisition", amount: -920000 },
    { id: "10", createdAt: new Date("2025-07-02"), type: "Brokerage Processing Fee", amount: -100000 },
    { id: "11", createdAt: new Date("2025-06-12"), type: "Equity Market Gain", amount: 2750000 },
    { id: "12", createdAt: new Date("2025-05-03"), type: "Offshore Investment Return", amount: 3100000 },
    { id: "13", createdAt: new Date("2025-04-11"), type: "Strategic Acquisition Expense", amount: -1350000 },
    { id: "14", createdAt: new Date("2025-03-19"), type: "Global Infrastructure Bond Return", amount: 1800000 },
    { id: "15", createdAt: new Date("2025-02-02"), type: "High-Value Asset Disposal", amount: 4200000 },
    { id: "16", createdAt: new Date("2025-01-08"), type: "International Portfolio Rebalancing", amount: -1600000 },
    { id: "17", createdAt: new Date("2024-12-14"), type: "Venture Capital Return", amount: 2600000 },
    { id: "18", createdAt: new Date("2024-11-20"), type: "Luxury Property Maintenance", amount: -740000 },
    { id: "19", createdAt: new Date("2024-10-25"), type: "Initial Capital Deposit", amount: 5000000 },
  ];

  // ===== Running Balance Calculation =====
  const transactionsWithBalance = useMemo(() => {
    let runningTotal = 0;
    return [...transactions]
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((tx) => {
        runningTotal += tx.amount;
        return { ...tx, balance: runningTotal };
      });
  }, []);

  const totalPages = Math.ceil(transactionsWithBalance.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = transactionsWithBalance.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="transactions-page">
      <h2 className="tx-title">Transaction History</h2>

      <div className="ledger-wrapper">
        <table className="ledger-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.createdAt.toLocaleDateString()}</td>
                <td>{tx.type}</td>
                <td className={tx.amount >= 0 ? "positive" : "negative"}>
                  {tx.amount >= 0 ? "+" : "-"}$
                  {Math.abs(tx.amount).toLocaleString()}
                </td>
                <td className="balance-col">
                  ${tx.balance.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}