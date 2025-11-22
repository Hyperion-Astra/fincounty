import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Receipt,
  Send,
  PiggyBank,
  CreditCard,
  Menu,
  X,
  User,
  LogOut
} from "lucide-react";
import { auth } from "../../../firebase"; // make sure path is correct
import { signOut } from "firebase/auth";
import "./Sidebar.css";

export default function ClientSidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? "show" : ""}`}
        onClick={toggleSidebar}
      ></div>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-logo">FinBank</h2>
          <button className="sidebar-close" onClick={toggleSidebar}>
            <X size={22} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className="sidebar-link">
            <Home size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/dashboard/fund" className="sidebar-link">
            <ArrowDownCircle size={18} />
            <span>Fund Account</span>
          </NavLink>

          <NavLink to="/dashboard/withdraw" className="sidebar-link">
            <ArrowUpCircle size={18} />
            <span>Withdraw</span>
          </NavLink>

          <NavLink to="/dashboard/transfer" className="sidebar-link">
            <Send size={18} />
            <span>Transfer</span>
          </NavLink>

          <NavLink to="/dashboard/pay-bills" className="sidebar-link">
            <Receipt size={18} />
            <span>Pay Bills</span>
          </NavLink>

          <NavLink to="/dashboard/savings" className="sidebar-link">
            <PiggyBank size={18} />
            <span>Savings</span>
          </NavLink>

          <NavLink to="/dashboard/transactions" className="sidebar-link">
            <CreditCard size={18} />
            <span>Transactions</span>
          </NavLink>

          <NavLink to="/dashboard/profile" className="sidebar-link">
            <User size={18} />
            <span>Profile</span>
          </NavLink>

          {/* Logout button */}
          <button className="sidebar-link logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Mobile toggle button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>
    </>
  );
}
