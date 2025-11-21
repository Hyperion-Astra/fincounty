import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ClientRoute({ children }) {
  const { currentUser, userProfile, loading } = useAuth();

  // Still loading (Auth or Firestore)
  if (loading) {
    return <div className="route-loading">Loading...</div>;
  }

  // Not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Firestore doc not found or role mismatch
  if (!userProfile || userProfile.role !== "client") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
