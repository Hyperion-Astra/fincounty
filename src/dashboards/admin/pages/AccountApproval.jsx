import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./AccountApproval.css";

function genAccountNumber() {
  return (Math.floor(1000000000 + Math.random()*9000000000)).toString();
}

export default function AccountApproval(){
  const [users, setUsers] = useState([]);
  const [processing, setProcessing] = useState(null);

  useEffect(()=>{ async function load(){
    // users with accountStatus create_accounts
    const q = query(collection(db,"users"), where("accountStatus","==","create_accounts"));
    const snap = await getDocs(q);
    setUsers(snap.docs.map(d=>({ id:d.id, ...d.data() })));
  } load(); }, []);

  async function createAccounts(u){
    setProcessing(u.id);
    try{
      // create checking
      await addDoc(collection(db,"accounts"), {
        uid: u.id,
        accountType: "checking",
        accountNumber: genAccountNumber(),
        routingNumber: "123456789",
        balance: 0,
        createdAt: new Date(),
      });
      // create savings
      await addDoc(collection(db,"accounts"), {
        uid: u.id,
        accountType: "savings",
        accountNumber: genAccountNumber(),
        routingNumber: "123456789",
        balance: 0,
        createdAt: new Date(),
      });
      // update user
      await updateDoc(doc(db,"users",u.id), { accountStatus: "approved", hasPrimaryAccount: true });
      setUsers(prev=>prev.filter(x=>x.id!==u.id));
    }catch(err){ console.error(err) } finally { setProcessing(null); }
  }

  return (
    <div className="admin-page">
      <h2>Account Creation Queue</h2>
      {users.length===0 && <p className="muted">No accounts to create.</p>}
      {users.map(u=>(
        <div className="acc-row" key={u.id}>
          <div>{u.displayName} — {u.email}</div>
          <div><button onClick={()=>createAccounts(u)} disabled={processing===u.id}>{processing===u.id ? "Creating..." : "Create Accounts"}</button></div>
        </div>
      ))}
    </div>
  );
}
