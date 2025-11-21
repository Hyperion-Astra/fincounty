import React from "react";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { currentUser, logout } = useAuth();

  async function doLogout() {
    try {
      await logout();
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <nav className="nav">
      <div className="brand">FinCountyBank</div>
      <div className="nav-right">
        <div className="user">{currentUser?.displayName || currentUser?.email}</div>
        <button className="link-btn" onClick={doLogout}>Sign out</button>
      </div>
    </nav>
  );
}
