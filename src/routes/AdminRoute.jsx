// src/routes/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, userData, loading } = useAuth();

  // Wait for Firebase to finish checking the logged-in user
  if (loading) return <div>Loading...</div>;

  // Not logged in → force login
  if (!user) return <Navigate to="/login" replace />;

  // Firestore userData not loaded yet → wait
  if (!userData) return <div>Loading...</div>;

  // Wrong role → send to client dashboard
  if (userData.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
