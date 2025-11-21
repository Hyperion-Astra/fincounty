import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "./KYCWizard.css";

export default function KYCSummary(){
  const { currentUser, loading } = useAuth();
  const [kyc, setKyc] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(()=> {
    if(!loading && !currentUser) navigate("/login");
    async function load(){ 
      const snap = await getDoc(doc(db, "kyc", currentUser.uid));
      if(snap.exists()) setKyc(snap.data());
    }
    if(currentUser) load();
  }, [currentUser, loading, navigate]);

  async function submit() {
    setSubmitting(true);
    try {
      await updateDoc(doc(db, "kyc", currentUser.uid), { kycStatus: "pending", submittedAt: serverTimestamp() });
      // mark user doc
      await updateDoc(doc(db, "users", currentUser.uid), { kycStatus: "pending", onboardingStep: 2 });
      // redirect to pending page
      navigate("/pending-review");
    } catch (err) {
      console.error(err);
      alert("Failed to submit KYC.");
    } finally { setSubmitting(false); }
  }

  if(!kyc) return <div className="centered">Loading...</div>;

  return (
    <div className="kyc-wrap centered">
      <div className="kyc-card">
        <h3>Review & Submit</h3>
        <p><strong>Name:</strong> {kyc.fullName}</p>
        <p><strong>DOB:</strong> {kyc.dob}</p>
        <p><strong>SSN:</strong> ****{kyc.ssn?.slice(-4)}</p>
        <p><strong>Address:</strong> {kyc.address?.line1}, {kyc.address?.city}</p>
        <p><strong>ID:</strong> {kyc.idType}</p>
        <div className="actions">
          <button onClick={()=>navigate("/kyc/identity")} className="ghost">Edit</button>
          <button onClick={submit} disabled={submitting}>{submitting ? "Submitting..." : "Submit KYC"}</button>
        </div>
      </div>
    </div>
  );
}
