import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!currentUser || !userProfile) return <Navigate to="/login" replace />;

  if (userProfile.role !== "admin") return <Navigate to="/dashboard" replace />;

  return children;
}
