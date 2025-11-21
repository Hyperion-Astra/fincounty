// src/dashboards/client/Profile.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./Profile.css";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [accountData, setAccountData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const uid = localStorage.getItem("uid");
      if (!uid) return;

      const userSnap = await getDoc(doc(db, "users", uid));
      if (userSnap.exists()) setUserData(userSnap.data());

      const accountSnap = await getDoc(doc(db, "accounts", uid));
      if (accountSnap.exists()) setAccountData(accountSnap.data());
    }
    fetchData();
  }, []);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {userData?.displayName}</p>
        <p><strong>Email:</strong> {userData?.email}</p>
        <p><strong>Phone:</strong> {userData?.phone}</p>
        <p><strong>KYC Status:</strong> {userData?.kycStatus}</p>
        {accountData && (
          <>
            <p><strong>Checking Account:</strong> {accountData.checkingAccountNumber}</p>
            <p><strong>Savings Account:</strong> {accountData.savingsAccountNumber}</p>
            <p><strong>Routing Number:</strong> {accountData.routingNumber}</p>
          </>
        )}
      </div>
    </div>
  );
}
