import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ClientRoute({ children }) {
  const { currentUser, userProfile, loadingUser, loadingProfile } = useAuth();

  // Wait for both Firebase Auth + Firestore to finish loading
  if (loadingUser || loadingProfile) {
    return <div>Loading...</div>;
  }

  // If not logged in → go to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If profile still doesn't exist after loading → block
  if (!userProfile) {
    return <Navigate to="/login" replace />;
  }

  // If not client → send to admin
  if (userProfile.role !== "client") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
