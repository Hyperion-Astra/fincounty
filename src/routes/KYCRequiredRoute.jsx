import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function KycRequiredRoute({ children }) {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!currentUser) return <Navigate to="/login" replace />;

  // If KYC is already complete → send to dashboard
  if (userProfile?.kycStatus === "completed") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
