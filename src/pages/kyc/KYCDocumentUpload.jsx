import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import "./KYCWizard.css";

export default function KYCDocumentUpload() {
  const { currentUser, loading } = useAuth();
  const [idFile, setIdFile] = useState(null);
  const [idType, setIdType] = useState("driver_license");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{ if(!loading && !currentUser) navigate("/login"); }, [currentUser, loading, navigate]);

  async function uploadAndNext(e) {
    e.preventDefault();
    if (!idFile) return setMsg("Select an ID file.");
    setLoadingUpload(true);
    try {
      const path = `kyc/${currentUser.uid}/id_${Date.now()}_${idFile.name}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, idFile);
      const url = await getDownloadURL(storageRef);

      await updateDoc(doc(db, "kyc", currentUser.uid), { idFileUrl: url, idType });
      navigate("/kyc/selfie");
    } catch (err) {
      console.error(err); setMsg("Upload failed.");
    } finally { setLoadingUpload(false); }
  }

  return (
    <div className="kyc-wrap centered">
      <form className="kyc-card" onSubmit={uploadAndNext}>
        <h3>Upload government ID</h3>
        <label>ID type</label>
        <select value={idType} onChange={e=>setIdType(e.target.value)}>
          <option value="driver_license">Driver's License</option>
          <option value="passport">Passport</option>
          <option value="state_id">State ID</option>
        </select>
        <label>Upload (image or PDF)</label>
        <input type="file" accept="image/*,application/pdf" onChange={e=>setIdFile(e.target.files[0])} />
        <div className="actions">
          <button type="submit" disabled={loadingUpload}>{loadingUpload ? "Uploading..." : "Upload & Next"}</button>
        </div>
        {msg && <p className="muted">{msg}</p>}
      </form>
    </div>
  );
}
