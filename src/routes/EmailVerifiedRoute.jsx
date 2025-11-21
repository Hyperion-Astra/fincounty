import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function EmailVerifiedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // Not logged in
  if (!currentUser) return <Navigate to="/login" replace />;

  // Email is NOT verified
  if (!currentUser.emailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
}
