// src/dashboards/client/components/ClientTopbar.jsx
import React from "react";
import "../client.css";

export default function ClientTopbar({ user }) {
  return (
    <div className="client-topbar">
      <div className="client-topbar-left">
        <h2>Welcome, {user?.displayName || "User"}</h2>
      </div>
      <div className="client-topbar-right">
        <span>{user?.email}</span>
        <img src={user?.photoURL || "/default-avatar.png"} alt="User Avatar" />
      </div>
    </div>
  );
}
