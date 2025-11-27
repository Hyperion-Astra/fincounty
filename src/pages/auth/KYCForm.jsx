import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import "./KYCForm.css";

export default function KYCForm() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    ssn: "",
    phone: "",
    addressLine1: "",
    city: "",
    state: "",
    zip: "",
    employment: "",
    idType: "driver_license",
    idNumber: "",
    accountType: "checking",
    transactionPin: "",
  });

  useEffect(() => {
    if (!uid) return;
    getDoc(doc(db, "users", uid)).then(snap => {
      if (snap.exists()) {
        const data = snap.data();
        setForm(prev => ({
          ...prev,
          fullName: data.displayName || prev.fullName,
          phone: data.phone || prev.phone
        }));
      }
    });
  }, [uid]);

  function update(k, v) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  function generateAccountNumbers() {
    const account = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const routing = "123456789";
    return { account, routing };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { account, routing } = generateAccountNumbers();

      const kycDoc = {
        uid,
        fullName: form.fullName,
        dob: form.dob,
        ssn: form.ssn,
        tin: form.tin,
        phone: form.phone,
        address: { line1: form.addressLine1, city: form.city, state: form.state, zip: form.zip },
        employment: form.employment,
        id: { type: form.idType, number: form.idNumber },
        accountType: form.accountType,
        transactionPin: form.transactionPin,
        accountNumber: account,
        routingNumber: routing,
        kycStatus: "pending",
        createdAt: serverTimestamp()
      };

      await setDoc(doc(db, "kyc", uid), kycDoc, { merge: true });
      await setDoc(doc(db, "users", uid), {
        displayName: form.fullName,
        phone: form.phone,
        kycStatus: "pending",
        accountNumber: account,
        routingNumber: routing
      }, { merge: true });

      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard"); // after KYC, go to user dashboard
      }, 2000);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="kyc-container">
      <h2>Complete your KYC</h2>
      {success && <div className="kyc-success">KYC submitted successfully! Redirecting...</div>}
      <form onSubmit={handleSubmit} className="kyc-form">
        {/* Personal info */}
        <div className="kyc-grid kyc-grid-2">
          <div>
            <label>Full legal name</label>
            <input value={form.fullName} onChange={e => update('fullName', e.target.value)} required />
          </div>
          <div>
            <label>Date of birth</label>
            <input type="date" value={form.dob} onChange={e => update('dob', e.target.value)} required />
          </div>
          <div>
            <label>SSN (full)</label>
            <input value={form.ssn} onChange={e => update('ssn', e.target.value)} />
          </div>
          <div>
            <label>TIN (full)</label>
            <input value={form.tin} onChange={e => update('tin', e.target.value)} required />
          </div>
          <div>
            <label>Phone</label>
            <input value={form.phone} onChange={e => update('phone', e.target.value)} required />
          </div>
        </div>

        {/* Address */}
        <div>
          <label>Address</label>
          <input value={form.addressLine1} onChange={e => update('addressLine1', e.target.value)} placeholder="Street, Apt" className="mb-2" />
          <div className="kyc-grid kyc-grid-3">
            <input value={form.city} onChange={e => update('city', e.target.value)} placeholder="City" />
            <input value={form.state} onChange={e => update('state', e.target.value)} placeholder="State" />
            <input value={form.zip} onChange={e => update('zip', e.target.value)} placeholder="ZIP code" />
          </div>
        </div>

        {/* Employment */}
        <div>
          <label>Employment information</label>
          <input value={form.employment} onChange={e => update('employment', e.target.value)} placeholder="Employer or self-employed" />
        </div>

        {/* ID info */}
        <div className="kyc-grid kyc-grid-2">
          <div>
            <label>ID type: Government Issued ID</label>
            <select value={form.idType} onChange={e => update('idType', e.target.value)}>
              <option value="driver_license">Driver's License</option>
              <option value="state_id">National ID Card</option>
              <option value="passport">Passport</option>
            </select>
          </div>
          <div>
            <label>ID number</label>
            <input value={form.idNumber} onChange={e => update('idNumber', e.target.value)} />
          </div>
        </div>



        {/* Account type & PIN */}
        <div className="kyc-grid kyc-grid-2">
          <div>
            <label>Account type</label>
            <select value={form.accountType} onChange={e => update('accountType', e.target.value)}>
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
            </select>
          </div>
          <div>
            <label>Transaction PIN</label>
            <input type="password" value={form.transactionPin} onChange={e => update('transactionPin', e.target.value)} />
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit KYC"}
        </button>
      </form>
    </div>
  );
}
