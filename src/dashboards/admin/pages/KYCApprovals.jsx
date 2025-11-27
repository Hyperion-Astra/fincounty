import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import "./KYCApprovals.css";

export default function KYCApprovals() {
  const [items, setItems] = useState([]);
  const [processingId, setProcessingId] = useState(null);

  // Load pending KYC requests
  useEffect(() => {
    async function fetchKYC() {
      const q = query(collection(db, "kyc"), where("kycStatus", "==", "pending"));
      const snap = await getDocs(q);

      const data = snap.docs.map(d => ({
        docId: d.id, // Firebase document ID
        ...d.data(),
      }));

      setItems(data);
    }

    fetchKYC();
  }, []);

  // Approve or Reject KYC
  async function decide(docId, approve) {
    setProcessingId(docId);
    try {
      // Update the kycStatus in KYC collection
      await updateDoc(doc(db, "kyc", docId), {
        kycStatus: approve ? "approved" : "rejected",
      });

      // Update the user's kycStatus as well
      await updateDoc(doc(db, "users", docId), {
        kycStatus: approve ? "approved" : "rejected",
      });

      // Remove processed item from UI
      setItems(prev => prev.filter(i => i.docId !== docId));
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <div className="kyc-approvals">
      <h3>Pending KYC Requests</h3>
      {items.length === 0 && <p className="muted">No pending KYC requests</p>}

      {items.map(item => (
        <div className="kyc-card" key={item.docId}>
          <div>
            <strong>{item.fullName}</strong> — {item.id?.type || "ID"}
            <p className="muted">
              {item.address?.line1} • {item.address?.city}, {item.address?.state}
            </p>
            <p className="muted">
              DOB: {item.dob} • Employment: {item.employment} • Phone: {item.phone}
            </p>
            <p className="muted">
              Account Type: {item.accountType} • Account Number: {item.accountNumber}
            </p>
          </div>

          <div className="actions">
            <button
              disabled={processingId === item.docId}
              onClick={() => decide(item.docId, true)}
            >
              Approve
            </button>
            <button
              disabled={processingId === item.docId}
              onClick={() => decide(item.docId, false)}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
