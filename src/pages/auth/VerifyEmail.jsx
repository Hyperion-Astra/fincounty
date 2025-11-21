import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "./VerifyEmail.css";

export default function VerifyEmail() {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!loading && !currentUser) navigate("/login");
    if (currentUser && currentUser.emailVerified) navigate("/dashboard");
  }, [currentUser, loading, navigate]);

  async function resend() {
    try {
      await sendEmailVerification(auth.currentUser);
      setSent(true);
    } catch (err) {
      console.error(err);
      alert("Failed to send verification email.");
    }
  }

  return (
    <div className="auth-page centered">
      <div className="card">
        <h2>Verify your email</h2>
        <p>Please check your inbox for the verification email. Verify and then return here or click the button below.</p>
        <div className="actions">
          <button onClick={() => window.location.reload()}>I have verified</button>
          <button onClick={resend}>{sent ? "Sent!" : "Resend email"}</button>
        </div>
      </div>
    </div>
  );
}
