// src/dashboards/client/components/Sidebar.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiCreditCard, FiSend, FiUser, FiLogOut, FiMenu } from "react-icons/fi";
import { useAuth } from "../../../context/AuthContext.jsx";
import "./Sidebar.css";

const Sidebar = () => {
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <aside className={`client-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h2>Bank Client</h2>
        <button className="collapse-btn" onClick={toggleSidebar}>
          <FiMenu />
        </button>
      </div>

      <nav className="sidebar-nav">
        <NavLink 
          to="/dashboard" 
          end 
          className={({ isActive }) => isActive ? "active-link" : ""}
        >
          <FiHome className="nav-icon"/> <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to="/dashboard/loans" 
          className={({ isActive }) => isActive ? "active-link" : ""}
        >
          <FiCreditCard className="nav-icon"/> <span>Loans</span>
        </NavLink>

        <NavLink 
          to="/dashboard/withdraw" 
          className={({ isActive }) => isActive ? "active-link" : ""}
        >
          <FiSend className="nav-icon"/> <span>Withdraw</span>
        </NavLink>

        <NavLink 
          to="/dashboard/profile" 
          className={({ isActive }) => isActive ? "active-link" : ""}
        >
          <FiUser className="nav-icon"/> <span>Profile</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={logout}>
          <FiLogOut className="nav-icon"/> <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
