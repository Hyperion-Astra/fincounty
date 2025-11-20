// src/dashboards/client/components/Topbar.jsx
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../../context/AuthContext.jsx"; // Updated import

const Topbar = () => {
  const { logout, userData } = useAuth(); // Use the custom hook

  return (
    <header className="client-topbar">
      <div className="topbar-left">
        <h2>Welcome, {userData?.email || "Client"}</h2>
      </div>

      <div className="topbar-right">
        <button className="topbar-logout" onClick={logout}>
          <FiLogOut /> Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
