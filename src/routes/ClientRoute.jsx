import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ClientRoute({ children }) {
  const { currentUser, userProfile, loading } = useAuth();

  // 1. Still loading Firebase Auth or Firestore doc
  if (loading) {
    return <div className="route-loading">Loading...</div>;
  }

  // 2. Not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // 3. Firestore finished loading but no profile EXISTS
  if (userProfile === null) {
    return <Navigate to="/login" replace />;
  }

  // 4. Logged in but wrong role
  if (userProfile.role !== "client") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
