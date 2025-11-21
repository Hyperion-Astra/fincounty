import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, storage } from "../../firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
    selfieFile: null,
    idFile: null,
    accountType: "checking",
    transactionPin: ""
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

  async function uploadFile(file, path) {
    if (!file) return null;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      // Upload files
      const selfieUrl = await uploadFile(form.selfieFile, `kyc/${uid}/selfie_${Date.now()}`);
      const idFileUrl = await uploadFile(form.idFile, `kyc/${uid}/id_${Date.now()}`);

      const { account, routing } = generateAccountNumbers();

      const kycDoc = {
        uid,
        fullName: form.fullName,
        dob: form.dob,
        ssn: form.ssn,
        phone: form.phone,
        address: { line1: form.addressLine1, city: form.city, state: form.state, zip: form.zip },
        employment: form.employment,
        id: { type: form.idType, number: form.idNumber },
        selfie: selfieUrl,
        idFile: idFileUrl,
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

      setSuccess(true); // show success message
      setTimeout(() => {
        navigate("/login"); // redirect after 2.5 seconds
      }, 2500);

    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Complete your KYC</h2>

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 border border-green-300 rounded">
          KYC submitted successfully! Redirecting to login...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Personal info */}
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">Full legal name</label>
            <input value={form.fullName} onChange={e => update('fullName', e.target.value)} required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm">Date of birth</label>
            <input type="date" value={form.dob} onChange={e => update('dob', e.target.value)} required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm">SSN (full)</label>
            <input value={form.ssn} onChange={e => update('ssn', e.target.value)} required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm">Phone</label>
            <input value={form.phone} onChange={e => update('phone', e.target.value)} required className="w-full p-2 border rounded" />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm">Address</label>
          <input value={form.addressLine1} onChange={e => update('addressLine1', e.target.value)} placeholder="Street, Apt" className="w-full p-2 border rounded mb-2" />
          <div className="grid md:grid-cols-3 gap-2">
            <input value={form.city} onChange={e => update('city', e.target.value)} placeholder="City" className="p-2 border rounded" />
            <input value={form.state} onChange={e => update('state', e.target.value)} placeholder="State" className="p-2 border rounded" />
            <input value={form.zip} onChange={e => update('zip', e.target.value)} placeholder="ZIP code" className="p-2 border rounded" />
          </div>
        </div>

        {/* Employment */}
        <div>
          <label className="block text-sm">Employment information</label>
          <input value={form.employment} onChange={e => update('employment', e.target.value)} placeholder="Employer or self-employed" className="w-full p-2 border rounded" />
        </div>

        {/* ID info */}
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">ID type</label>
            <select value={form.idType} onChange={e => update('idType', e.target.value)} className="w-full p-2 border rounded">
              <option value="driver_license">Driver's License</option>
              <option value="passport">Passport</option>
              <option value="state_id">State ID</option>
            </select>
          </div>
          <div>
            <label className="block text-sm">ID number</label>
            <input value={form.idNumber} onChange={e => update('idNumber', e.target.value)} className="w-full p-2 border rounded" />
          </div>
        </div>

        {/* File uploads */}
        <div>
          <label className="block text-sm">Upload Selfie</label>
          <input type="file" accept="image/*" onChange={e => update('selfieFile', e.target.files[0])} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm">Upload ID Document</label>
          <input type="file" accept="image/*,application/pdf" onChange={e => update('idFile', e.target.files[0])} className="w-full p-2 border rounded" />
        </div>

        {/* Account type & PIN */}
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">Account type</label>
            <select value={form.accountType} onChange={e => update('accountType', e.target.value)} className="w-full p-2 border rounded">
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
            </select>
          </div>
          <div>
            <label className="block text-sm">Transaction PIN</label>
            <input type="password" value={form.transactionPin} onChange={e => update('transactionPin', e.target.value)} className="w-full p-2 border rounded" />
          </div>
        </div>

        <button type="submit" disabled={loading} className="mt-4 w-full bg-blue-600 text-white p-2 rounded">
          {loading ? "Submitting..." : "Submit KYC"}
        </button>
      </form>
    </div>
  );
}
