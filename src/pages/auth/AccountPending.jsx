import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AccountPending.css";

export default function AccountPending() {
  const { currentUser, userProfile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !currentUser) navigate("/login");
    // If account approved redirect to dashboard
    if (userProfile?.accountStatus === "approved") navigate("/dashboard");
  }, [currentUser, userProfile, loading, navigate]);

  return (
    <div className="centered auth-page">
      <div className="card">
        <h2>Account pending</h2>
        <p>Your KYC has been submitted and is awaiting admin approval. You will be notified once approved.</p>
        <p className="muted">Check back or contact support for updates.</p>
      </div>
    </div>
  );
}
