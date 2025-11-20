// src/dashboard/components/EmptyState.jsx
import React from "react";
import "./empty-state.css";

export default function EmptyState({ icon, title, message }) {
  return (
    <div className="empty-state">
      {icon && <div className="empty-icon">{icon}</div>}
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}
