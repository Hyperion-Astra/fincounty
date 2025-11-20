// src/dashboards/client/ClientLayout.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import "./client.css";

export default function ClientLayout() {
  const { userData, loading } = useAuth();

  // Show loading spinner while userData is loading
  if (loading || userData === undefined) {
    return (
      <div className="loading-screen">
        <p>Loading client dashboard...</p>
      </div>
    );
  }

  // User not logged in (no userData) → redirect to login
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role → redirect to admin
  if (userData.role !== "client") {
    return <Navigate to="/admin" replace />;
  }

  // Everything is fine → render client dashboard
  return (
    <div className="client-layout">
      <Sidebar />

      <div className="client-content">
        <Topbar />

        <main className="client-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
