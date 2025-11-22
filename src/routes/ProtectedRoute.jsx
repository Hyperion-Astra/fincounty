import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner.jsx";

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  // Wait for Firebase Auth + Firestore to finish loading
  if (loading) {
    return <Spinner />;
  }

  // If user is not logged in AFTER loading has resolved
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
