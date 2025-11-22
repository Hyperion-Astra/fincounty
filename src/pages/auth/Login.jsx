import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        setError("User record not found. Contact support.");
        return;
      }

      const userData = userDoc.data();

      // Admin → admin dashboard
      if (userData.role === "admin") {
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
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Welcome Back</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="auth-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
