import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { storage, db } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./KYCWizard.css";

export default function KYCSelfie() {
  const { currentUser, loading } = useAuth();
  const [file, setFile] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{ if(!loading && !currentUser) navigate("/login"); }, [currentUser, loading, navigate]);

  async function submit(e){
    e.preventDefault();
    if(!file) return setMsg("Select a selfie image.");
    setLoadingUpload(true);
    try {
      const path = `kyc/${currentUser.uid}/selfie_${Date.now()}_${file.name}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await updateDoc(doc(db, "kyc", currentUser.uid), { selfieUrl: url });
      navigate("/kyc/review");
    } catch(err){
      console.error(err); setMsg("Upload failed.");
    } finally { setLoadingUpload(false); }
  }

  return (
    <div className="kyc-wrap centered">
      <form className="kyc-card" onSubmit={submit}>
        <h3>Take or upload a selfie</h3>
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} />
        <div className="actions">
          <button type="submit" disabled={loadingUpload}>{loadingUpload ? "Uploading..." : "Next: Review"}</button>
        </div>
        {msg && <p className="muted">{msg}</p>}
      </form>
    </div>
  );
}
