import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./KYCReview.css";

export default function KYCReview() {
  const [items, setItems] = useState([]);
  const [processing, setProcessing] = useState(null);

  useEffect(()=>{ async function load(){
    const q = query(collection(db, "kyc"), where("kycStatus","==","pending"));
    const snap = await getDocs(q);
    setItems(snap.docs.map(d=>({ id:d.id, ...d.data() })));
  } load(); }, []);

  async function decide(id, approve){
    setProcessing(id);
    try{
      await updateDoc(doc(db,"kyc",id), { kycStatus: approve ? "approved" : "rejected", reviewedAt: new Date() });
      // update users doc
      await updateDoc(doc(db,"users",id), { kycStatus: approve ? "approved":"rejected", accountStatus: approve ? "create_accounts":"rejected" });
      setItems(prev=>prev.filter(i=>i.id!==id));
    }catch(err){ console.error(err) } finally { setProcessing(null); }
  }

  return (
    <div className="admin-page">
      <h2>Pending KYC Reviews</h2>
      {items.length===0 && <p className="muted">No pending KYC.</p>}
      {items.map(i=>(
        <div className="kyc-row" key={i.id}>
          <div className="left">
            <strong>{i.fullName}</strong>
            <p className="muted">{i.address?.line1} • {i.address?.city}</p>
            <div className="links">
              {i.selfieUrl && <a href={i.selfieUrl} target="_blank" rel="noreferrer">Selfie</a>}
              {i.idFileUrl && <a href={i.idFileUrl} target="_blank" rel="noreferrer">ID</a>}
            </div>
          </div>
          <div className="right">
            <button onClick={()=>decide(i.id,true)} disabled={processing===i.id}>Approve</button>
            <button onClick={()=>decide(i.id,false)} disabled={processing===i.id} className="danger">Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}
