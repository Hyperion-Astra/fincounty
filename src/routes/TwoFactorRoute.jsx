import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function TwoFactorRoute({ children }) {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!currentUser) return <Navigate to="/login" replace />;

  if (!userProfile?.twoFactorVerified) {
    return <Navigate to="/2fa" replace />;
  }

  return children;
}
