import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Wait for Firebase to finish checking
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is still not logged in AFTER loading
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
