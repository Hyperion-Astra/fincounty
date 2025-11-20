import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const reset = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMsg("Reset link sent to your email.");
    } catch (err) {
      setError("Unable to send reset link.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>

        {msg && <p style={styles.success}>{msg}</p>}
        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={reset} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" style={styles.button}>
            Send Reset Link
          </button>
        </form>

        <p onClick={() => navigate("/login")} style={styles.link}>
          Back to Login
        </p>
      </div>
    </div>
  );
}

const styles = {
  ...JSON.parse(JSON.stringify(stylesTemplate())),
  success: {
    background: "#e3ffe8",
    color: "#0d8a2f",
    padding: "10px",
    borderRadius: "6px",
  },
  error: {
    background: "#ffe0e0",
    color: "#c20000",
    padding: "10px",
    borderRadius: "6px",
  },
};

function stylesTemplate() {
  return {
    wrapper: {
      height: "90vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f4f4f4",
    },
    card: {
      width: "350px",
      padding: "30px",
      background: "white",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      textAlign: "center",
    },
    title: {
      fontSize: "22px",
      marginBottom: "15px",
      fontWeight: "600",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    input: {
      padding: "12px",
      fontSize: "15px",
      border: "1px solid #ccc",
      borderRadius: "6px",
    },
    button: {
      padding: "12px",
      background: "#6c63ff",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "600",
    },
    link: {
      marginTop: "15px",
      color: "#6c63ff",
      cursor: "pointer",
      textDecoration: "underline",
    },
  };
}
