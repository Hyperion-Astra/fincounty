import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
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
      const cred = await register(email, password, displayName);
      // Redirect to KYC form
      navigate(`/kyc/${cred.user.uid}`);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Create an account</h2>
      
      {error && (
        <div className="mb-3 p-2 bg-red-100 text-red-800 border border-red-300 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm">Full name</label>
          <input
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            required
            className="w-full p-2 border rounded"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm">Email</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            required
            className="w-full p-2 border rounded"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm">Password</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            required
            className="w-full p-2 border rounded"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded bg-purple-600 text-white"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-3">
        We will send a verification email. You’ll complete KYC next.
      </p>
    </div>
  );
}
