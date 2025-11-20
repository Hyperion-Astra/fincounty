// src/dashboards/admin/pages/AdminHome.js
import React from "react";
import DashboardCards from "../../components/DashboardCards.jsx";

const AdminHome = () => {
  return (
    <div className="admin-home-container">
      <h2 className="dashboard-title">Admin Overview</h2>
      <DashboardCards isAdmin />

      <div className="dashboard-section">
        <p>Welcome to the admin panel. Use the navigation to manage users, loans, and withdrawals.</p>
      </div>
    </div>
  );
};

export default AdminHome;
