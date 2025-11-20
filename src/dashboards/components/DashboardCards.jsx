// src/dashboard/components/DashboardCards.jsx
import React from "react";
import formatCurrency from "../../helpers/formatCurrency";
import "./dashboard-cards.css";

export default function DashboardCards({ title, value, icon }) {
  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <span className="dash-card-title">{title}</span>
        {icon && <span className="dash-card-icon">{icon}</span>}
      </div>
      <div className="dash-card-value">{formatCurrency(value)}</div>
    </div>
  );
}
