import React, { useState } from "react";
import { Bell, LogOut, Settings, Menu } from "lucide-react";
import "../client.css";
import { useAuth } from "../../../context/AuthContext";

export default function ClientTopbar({ user, toggleSidebar }) {
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <div className="client-topbar">

      {/* LEFT SECTION */}
      <div className="topbar-left">
        {/* Mobile menu toggle */}
        <button className="topbar-menu-btn" onClick={toggleSidebar}>
          <Menu size={22} />
        </button>

        <h2 className="topbar-title">
          Welcome, <span>{user?.displayName || "User"}</span>
        </h2>
      </div>

      {/* RIGHT SECTION */}
      <div className="topbar-right">

        {/* Notification Icon */}
        <button className="topbar-icon">
          <Bell size={20} />
        </button>

        {/* Avatar + Dropdown */}
        <div className="topbar-profile">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt="User Avatar"
            className="topbar-avatar"
            onClick={() => setMenuOpen(!menuOpen)}
          />

          {/* Dropdown */}
          {menuOpen && (
            <div className="topbar-dropdown">
              <div className="dropdown-item">
                <Settings size={16} />
                <span>Settings</span>
              </div>

              <div className="dropdown-item logout" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
