// src/dashboards/admin/components/AdminSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <h3>Admin Panel</h3>
      <nav>
        <NavLink to="/admin" end>Dashboard</NavLink>
        <NavLink to="/admin/user-list">Users</NavLink>
        <NavLink to="/admin/loans">Loans</NavLink>
        <NavLink to="/admin/withdrawals">Withdrawals</NavLink>
        <NavLink to="/admin/pending-transactions">Pending Transactions</NavLink>
        <NavLink to="/admin/adjust-balance">Adjust Balance</NavLink>
      </nav>
    </div>
  );
}
