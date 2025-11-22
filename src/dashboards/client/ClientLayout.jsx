import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import ClientSidebar from "./components/ClientSidebar";
import ClientTopbar from "./components/ClientTopbar";
import "./ClientLayout.css";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../components/Spinner.jsx";

export default function ClientLayout() {
  const { currentUser, userProfile, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Prevent flashing while loading
  if (loading) return <Spinner />;

  // Not logged in
  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <div className="client-layout">
      <ClientSidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="client-main-area">
        <ClientTopbar 
          user={userProfile} 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />
        <div className="client-content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
