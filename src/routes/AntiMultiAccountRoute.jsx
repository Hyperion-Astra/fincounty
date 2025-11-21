import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AntiMultiAccountRoute({ children }) {
  const { userProfile, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // If already has a full account → block attempting another
  if (userProfile?.hasPrimaryAccount === true) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
