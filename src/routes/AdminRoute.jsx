import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { currentUser, userProfile, loading } = useAuth();

  // 1. Still loading Firebase Auth or Firestore doc
  if (loading) {
    return <div className="route-loading">Loading...</div>;
  }

  // 2. Not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // 3. Firestore loaded but no profile found
  if (userProfile === null) {
    return <Navigate to="/login" replace />;
  }

  // 4. Wrong role → send to client dashboard
  if (userProfile.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
