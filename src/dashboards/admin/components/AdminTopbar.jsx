// src/dashboards/admin/components/AdminTopbar.jsx
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./adminTopbar.css"; // new CSS file for styling

export default function AdminTopbar({ openSidebar }) {
  const navigate = useNavigate();
  const auth = getAuth();
  const admin = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin/login");
  };

  return (
    <div className="admin-topbar">
      {/* Mobile Sidebar Toggle */}
      <button className="admin-topbar-menu-btn" onClick={openSidebar}>
        ☰
      </button>

      <h3 className="admin-topbar-title">Admin Panel</h3>

      <div className="admin-topbar-right">
        <div className="admin-topbar-avatar">
          {admin?.email?.charAt(0)?.toUpperCase() || "A"}
        </div>

        <button className="admin-topbar-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
