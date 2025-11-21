import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "./TwoFactor.css";

export default function TwoFactor() {
  const { currentUser, userProfile, loading } = useAuth();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !currentUser) navigate("/login");
  }, [currentUser, loading, navigate]);

  // In MVP we simulate 2FA: send code via email would be done server-side.
  // Here pressing "Confirm" will mark twoFactorVerified true for demo.
  async function confirm(e) {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "users", currentUser.uid), { twoFactorVerified: true });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setMsg("Failed to confirm 2FA.");
    }
  }

  return (
    <div className="auth-page centered">
      <div className="card">
        <h2>Two-factor verification</h2>
        <p>We sent a security code to your email. Enter it to continue (for demo, click confirm).</p>
        <form onSubmit={confirm}>
          <input value={code} onChange={e=>setCode(e.target.value)} placeholder="Enter code" />
          <button type="submit">Confirm</button>
        </form>
        {msg && <p className="muted">{msg}</p>}
      </div>
    </div>
  );
}
