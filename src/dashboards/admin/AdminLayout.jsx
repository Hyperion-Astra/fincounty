// src/dashboards/admin/AdminLayout.jsx
import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";
import "./admin.css";

export default function AdminLayout() {
  const { currentUser, userProfile, loading } = useAuth();

  // Sidebar drawer toggle for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Wait for Firebase to finish loading
  if (loading) return <div>Loading...</div>;

  // If user not logged in → return to login
  if (!currentUser) return <Navigate to="/login" replace />;

  // If role isn't admin → send to dashboard
  if (userProfile?.role?.toLowerCase() !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="admin-layout">
      {/* Sidebar (with drawer behavior) */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <div className="admin-content">
        {/* Topbar with hamburger toggle */}
        <AdminTopbar openSidebar={() => setSidebarOpen(true)} />

        {/* Main admin page content */}
        <Outlet />
      </div>
    </div>
  );
}
