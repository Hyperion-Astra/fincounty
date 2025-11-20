import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      // Save client details
      await setDoc(doc(db, "users", uid), {
        email,
        role: "client",
        createdAt: Date.now(),
      });

      navigate("/dashboard");
    } catch (err) {
      setError("Unable to create account. Email may already exist.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={register} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button style={styles.button} type="submit">
            Register
          </button>
        </form>

        <p onClick={() => navigate("/login")} style={styles.link}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

const styles = {
  ...JSON.parse(JSON.stringify(stylesFromLogin())), // reuse same style
};

function stylesFromLogin() {
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
    error: {
      background: "#ffe0e0",
      padding: "10px",
      borderRadius: "6px",
      color: "#c20000",
    },
  };
}
