// src/dashboards/admin/components/AdminSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FiUsers, FiHome, FiCreditCard, FiDollarSign, FiClock, FiEdit } from "react-icons/fi";

export default function AdminSidebar({ sidebarOpen, closeSidebar }) {
  return (
    <>
      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div className="admin-backdrop" onClick={closeSidebar}></div>
      )}

      <div className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <h3 className="admin-sidebar-title">Admin Panel</h3>

        <nav className="admin-sidebar-nav">
          <NavLink to="/admin" end>
            <FiHome /> <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/user-list">
            <FiUsers /> <span>Users</span>
          </NavLink>

          <NavLink to="/admin/loans">
            <FiCreditCard /> <span>Loans</span>
          </NavLink>

          <NavLink to="/admin/withdrawals">
            <FiDollarSign /> <span>Withdrawals</span>
          </NavLink>

          <NavLink to="/admin/pending-transactions">
            <FiClock /> <span>Pending Transactions</span>
          </NavLink>

          <NavLink to="/admin/adjust-balance">
            <FiEdit /> <span>Adjust Balance</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
}
