import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./KYCApprovals.css";

export default function KYCApprovals() {
  const [items, setItems] = useState([]);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    async function fetch() {
      const q = query(collection(db, "kyc"), where("kycStatus", "==", "pending"));
      const snap = await getDocs(q);
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    fetch();
  }, []);

  async function decide(id, approve) {
    setProcessingId(id);
    try {
      await updateDoc(doc(db, "kyc", id), { kycStatus: approve ? "approved" : "rejected" });
      // update users
      await updateDoc(doc(db, "users", id), { kycStatus: approve ? "approved" : "rejected" });
      setItems(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <div className="kyc-approvals">
      <h3>Pending KYC</h3>
      {items.length === 0 && <p className="muted">No pending KYC</p>}
      {items.map(i => (
        <div className="kyc-card" key={i.id}>
          <div>
            <strong>{i.fullName}</strong> — {i.id?.type}
            <p className="muted">{i.address?.line1} • {i.city}, {i.state}</p>
          </div>
          <div className="actions">
            <a href={i.selfie} target="_blank" rel="noreferrer">Selfie</a>
            <a href={i.idFile} target="_blank" rel="noreferrer">ID</a>
            <button disabled={processingId===i.id} onClick={()=>decide(i.id, true)}>Approve</button>
            <button disabled={processingId===i.id} onClick={()=>decide(i.id, false)}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}
