import React, { useState, useEffect } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./SetPIN.css";

export default function SetPIN() {
  const { currentUser, loading } = useAuth();
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{ if(!loading && !currentUser) navigate("/login"); }, [currentUser, loading, navigate]);

  async function submit(e) {
    e.preventDefault();
    if (pin.length !== 4) return setMsg("PIN must be 4 digits.");
    if (pin !== confirmPin) return setMsg("PINs do not match.");
    try {
      await updateDoc(doc(db, "users", currentUser.uid), { transactionPin: pin });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setMsg("Failed to set PIN.");
    }
  }

  return (
    <div className="auth-page centered">
      <div className="card">
        <h2>Create transaction PIN</h2>
        <form onSubmit={submit}>
          <input value={pin} onChange={e=>setPin(e.target.value.replace(/\D/g,''))} placeholder="4-digit PIN" maxLength={4}/>
          <input value={confirmPin} onChange={e=>setConfirmPin(e.target.value.replace(/\D/g,''))} placeholder="Confirm PIN" maxLength={4}/>
          <button type="submit">Set PIN</button>
        </form>
        {msg && <p className="muted">{msg}</p>}
      </div>
    </div>
  );
}
