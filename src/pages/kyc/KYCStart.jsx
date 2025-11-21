import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./KYCWizard.css";

export default function KYCStart() {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{ if(!loading && !currentUser) navigate("/login"); }, [currentUser, loading, navigate]);

  return (
    <div className="kyc-wrap centered">
      <div className="card">
        <h2>Welcome — KYC</h2>
        <p>We need a few details to verify your identity and open your accounts. This takes a few minutes.</p>
        <div className="actions">
          <button onClick={() => navigate("/kyc/identity")}>Start KYC</button>
        </div>
      </div>
    </div>
  );
}
