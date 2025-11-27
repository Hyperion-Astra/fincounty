import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiUsers, FiHome, FiCreditCard, FiDollarSign, FiClock, FiEdit, FiAlertCircle } from "react-icons/fi";
import "./AdminSidebar.css";

export default function AdminSidebar({ sidebarOpen, closeSidebar }) {
  const sidebarRef = useRef();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update isMobile on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen, closeSidebar]);

  return (
    <>
      {/* Overlay/backdrop for both mobile and desktop when sidebar open */}
      {sidebarOpen && (
        <div
          className="admin-backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 999,
            background: isMobile ? "rgba(0,0,0,0.4)" : "transparent",
          }}
          onClick={closeSidebar}
        ></div>
      )}

      <div
        ref={sidebarRef}
        className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}
        style={{ zIndex: 1000 }}
      >
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

          <NavLink to="/admin/kyc-approval">
            <FiAlertCircle /> <span>KYC Approval</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
}
