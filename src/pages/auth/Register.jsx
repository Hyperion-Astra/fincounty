import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;

      // Create Firestore user document
      await setDoc(doc(db, "users", uid), {
        displayName,
        email,
        role: "user",
        kycStatus: "pending"
      });

      // Redirect to KYC form
      navigate(`/kyc/${uid}`);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-container">
      <h2>Create an account</h2>
      {error && <div className="register-error">{error}</div>}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Username</label>
          <input value={displayName} onChange={e => setDisplayName(e.target.value)} required disabled={loading} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" required disabled={loading} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" required disabled={loading} />
        </div>
        <button type="submit" disabled={loading} classname ="submit-btn">
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>
    </div>
  );
}
