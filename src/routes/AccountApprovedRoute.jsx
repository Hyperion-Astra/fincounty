import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AccountApprovedRoute({ children }) {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!currentUser) return <Navigate to="/login" replace />;

  // If no account or it is pending admin review
  if (!userProfile?.accountStatus || userProfile.accountStatus !== "approved") {
    return <Navigate to="/account-pending" replace />;
  }

  return children;
}
