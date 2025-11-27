import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef(null);

  // Auto-focus email input
  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        setError("User record not found. Contact support.");
        setLoading(false);
        return;
      }

      const userData = userDoc.data();

      // Admin → admin dashboard
    if (userData.role?.toLowerCase() === "admin") {
        navigate("/admin");
        return;
      }

      // User → check KYC
      const kycDoc = await getDoc(doc(db, "kyc", user.uid));
      if (!kycDoc.exists()) {
        navigate(`/kyc/${user.uid}`);
        return;
      }

      // User dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Welcome Back</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email"
            ref={emailRef}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="button"
          className="auth-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
