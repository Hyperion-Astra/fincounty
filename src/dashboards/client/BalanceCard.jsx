import React from "react";
import "./BalanceCard.css";

export default function BalanceCard({ accountType, balance }) {
  return (
    <div className="balance-card">
      <h3>{accountType}</h3>
      <p>${balance.toFixed(2)}</p>
    </div>
  );
}
