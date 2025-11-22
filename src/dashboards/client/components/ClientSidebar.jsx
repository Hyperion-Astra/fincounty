import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ isAdmin }) {
  return (
    <aside className="sidebar">
      <Link to="/dashboard" className="logo">FinBank</Link>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/dashboard/transactions">Transactions</Link>
        <Link to="/profile">Profile</Link>
        {isAdmin && (
          <>
            <hr/>
            <Link to="/admin">Admin Panel</Link>
          </>
        )}
      </nav>
    </aside>
  );
}
