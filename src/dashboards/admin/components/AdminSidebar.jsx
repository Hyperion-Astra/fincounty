// src/dashboards/admin/components/AdminSidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiCreditCard, FiSend, FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { useAuth } from "../../../context/AuthContext";

const AdminSidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">Admin Panel</div>

      <nav className="sidebar-nav">
        <NavLink to="/admin"><FiHome /> Overview</NavLink>
        <NavLink to="/admin/users"><FiUsers /> Users</NavLink>
        <NavLink to="/admin/loans"><FiCreditCard /> Loans</NavLink>
        <NavLink to="/admin/withdrawals"><FiSend /> Withdrawals</NavLink>
      </nav>

      <button className="sidebar-logout" onClick={logout}>
        <FiLogOut /> Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
