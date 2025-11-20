import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ClientRoute({ children }) {
  const { user, userData, loading } = useAuth();

  // Wait for Firebase to finish checking
  if (loading) return <div>Loading...</div>;

  // If not logged in → login
  if (!user) return <Navigate to="/login" replace />;

  // If logged in but not a client → admin panel or restricted
  if (userData?.role !== "client") return <Navigate to="/admin" replace />;

  return children;
}
