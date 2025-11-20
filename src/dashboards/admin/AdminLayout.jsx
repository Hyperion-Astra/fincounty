// src/dashboards/admin/AdminLayout.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";
import "./admin.css";

export default function AdminLayout() {
  const { user, userData, loading } = useAuth();

  // Wait for Firebase to finish
  if (loading) return <div>Loading...</div>;

  // User not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Firestore still loading
  if (!userData) return <div>Loading...</div>;

  // Role mismatch
  if (userData.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
