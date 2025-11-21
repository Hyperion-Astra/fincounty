import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./KYCWizard.css";

export default function KYCIdentity() {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName:"", dob:"", ssn:"", phone:"", addressLine1:"", city:"", state:"", zip:"", employment:"" });
  const [msg, setMsg] = useState("");

  useEffect(()=>{ if(!loading && !currentUser) navigate("/login"); }, [currentUser, loading, navigate]);

  async function saveAndNext(e) {
    e.preventDefault();
    // basic validation
    if (!form.fullName || !form.dob || !form.ssn) return setMsg("Please fill required fields.");
    try {
      await setDoc(doc(db, "kyc", currentUser.uid), {
        uid: currentUser.uid,
        fullName: form.fullName,
        dob: form.dob,
        ssn: form.ssn,
        phone: form.phone,
        address: { line1: form.addressLine1, city: form.city, state: form.state, zip: form.zip },
        employment: form.employment,
        kycStatus: "incomplete",
      }, { merge: true });
      navigate("/kyc/documents");
    } catch (err) {
      console.error(err); setMsg("Failed to save.");
    }
  }

  return (
    <div className="kyc-wrap centered">
      <form className="kyc-card" onSubmit={saveAndNext}>
        <h3>Personal information</h3>
        <label>Full legal name</label>
        <input value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})} required />
        <label>Date of birth</label>
        <input type="date" value={form.dob} onChange={e=>setForm({...form, dob:e.target.value})} required />
        <label>SSN (full)</label>
        <input value={form.ssn} onChange={e=>setForm({...form, ssn:e.target.value})} required />
        <label>Phone</label>
        <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
        <label>Address</label>
        <input placeholder="Street, Apt" value={form.addressLine1} onChange={e=>setForm({...form, addressLine1:e.target.value})} />
        <div className="grid">
          <input placeholder="City" value={form.city} onChange={e=>setForm({...form, city:e.target.value})} />
          <input placeholder="State" value={form.state} onChange={e=>setForm({...form, state:e.target.value})} />
          <input placeholder="ZIP" value={form.zip} onChange={e=>setForm({...form, zip:e.target.value})} />
        </div>
        <label>Employment</label>
        <input value={form.employment} onChange={e=>setForm({...form, employment:e.target.value})} />
        <div className="actions">
          <button type="submit">Next</button>
        </div>
        {msg && <p className="muted">{msg}</p>}
      </form>
    </div>
  );
}
