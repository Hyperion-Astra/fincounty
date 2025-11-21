import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PinProtectedRoute({ children }) {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!currentUser) return <Navigate to="/login" replace />;

  // No PIN set → force them to create one before continuing
  if (!userProfile?.transactionPin) {
    return <Navigate to="/set-pin" replace />;
  }

  return children;
}
