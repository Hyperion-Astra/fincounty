import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";

export default function Profile() {
  const { currentUser, userProfile } = useAuth();
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");

  const [editable, setEditable] = useState({
    displayName: "",
    phone: "",
    email: "",
  });

  const generateAccountNumber = () => Math.floor(1000000000 + Math.random() * 9000000000).toString();
  const generateRoutingNumber = () => Math.floor(100000000 + Math.random() * 900000000).toString();

  useEffect(() => {
    if (!currentUser || !userProfile) return;

    async function fetchData() {
      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setEditable({
            displayName: userSnap.data().displayName || "",
            phone: userSnap.data().phone || "",
            email: userSnap.data().email || "",
          });
        }

        const accountRef = doc(db, "accounts", currentUser.uid);
        const accountSnap = await getDoc(accountRef);

        let updatedAccountData;
        if (!accountSnap.exists()) {
          updatedAccountData = {
            checkingAccountNumber: generateAccountNumber(),
            savingsAccountNumber: generateAccountNumber(),
            routingNumber: generateRoutingNumber(),
            checkingBalance: 0,
            savingsBalance: 0,
          };
          await setDoc(accountRef, updatedAccountData);
        } else {
          const existing = accountSnap.data();
          updatedAccountData = {
            checkingAccountNumber: existing.checkingAccountNumber || generateAccountNumber(),
            savingsAccountNumber: existing.savingsAccountNumber || generateAccountNumber(),
            routingNumber: existing.routingNumber || generateRoutingNumber(),
            checkingBalance: existing.checkingBalance ?? 0,
            savingsBalance: existing.savingsBalance ?? 0,
          };
          await setDoc(accountRef, updatedAccountData, { merge: true });
        }

        setAccountData(updatedAccountData);

      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [currentUser, userProfile]);

  if (loading) return <div className="profile-loading">Loading profile...</div>;

  const handleChange = (e) => setEditable(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    if (!currentUser) return;
    setSaving(true);
    setFeedback("");
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, editable);
      setFeedback("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      setFeedback("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-grid">
        <div className="profile-card personal-info">
          <h3>Personal Information</h3>
          <div className="profile-item">
            <span>Name</span>
            <input name="displayName" value={editable.displayName} onChange={handleChange} />
          </div>
          <div className="profile-item">
            <span>Email</span>
            <input name="email" value={editable.email} onChange={handleChange} />
          </div>
          <div className="profile-item">
            <span>Phone</span>
            <input name="phone" value={editable.phone} onChange={handleChange} />
          </div>
          <div className="profile-item">
            <span>KYC Status</span>
            <strong className={`kyc-status ${userProfile.kycStatus?.toLowerCase()}`}>
              {userProfile.kycStatus || "Pending"}
            </strong>
          </div>
          <button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
          {feedback && <p className="profile-feedback">{feedback}</p>}
        </div>

        <div className="profile-card account-info">
          <h3>Account Details</h3>
          {accountData ? (
            <>
              <div className="profile-item">
                <span>Checking Account</span>
                <strong>{accountData.checkingAccountNumber}</strong>
              </div>
              <div className="profile-item">
                <span>Checking Balance</span>
                <strong>${accountData.checkingBalance.toLocaleString()}</strong>
              </div>
              <div className="profile-item">
                <span>Savings Account</span>
                <strong>{accountData.savingsAccountNumber}</strong>
              </div>
              <div className="profile-item">
                <span>Savings Balance</span>
                <strong>${accountData.savingsBalance.toLocaleString()}</strong>
              </div>
              <div className="profile-item">
                <span>Routing Number</span>
                <strong>{accountData.routingNumber}</strong>
              </div>
            </>
          ) : (
            <p>No account data found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
