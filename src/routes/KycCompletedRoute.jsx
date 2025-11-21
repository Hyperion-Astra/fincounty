import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function KycCompletedRoute({ children }) {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!currentUser) return <Navigate to="/login" replace />;

  // Block access if KYC NOT completed
  if (userProfile?.kycStatus !== "completed") {
    return <Navigate to="/kyc/start" replace />;
  }

  return children;
}
