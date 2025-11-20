// src/dashboard/components/StatusBadge.jsx
import React from "react";
import "./status-badge.css";

export default function StatusBadge({ status }) {
  const color =
    status === "approved"
      ? "green"
      : status === "pending"
      ? "orange"
      : status === "declined"
      ? "red"
      : "gray";

  return <span className={`status-badge ${color}`}>{status.toUpperCase()}</span>;
}
