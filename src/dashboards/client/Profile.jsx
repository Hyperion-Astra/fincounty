// src/dashboards/client/components/Profile.js
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./Profile.css";

export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setForm({
          fullName: data.fullName || "",
          phone: data.phone || "",
          email: data.email || user.email, // fallback to auth email
        });
      }
    }
    loadProfile();
  }, [user]);

  async function saveProfile(e) {
    e.preventDefault();
    setSaving(true);
    setMsg("");

    try {
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, {
        fullName: form.fullName,
        phone: form.phone,
      });

      setMsg("Profile updated successfully.");
    } catch (e) {
      console.error(e);
      setMsg("Failed to update profile.");
    }

    setSaving(false);
  }

  return (
    <div className="profile-page">
      <h2 className="profile-title">Your Profile</h2>

      <form className="profile-form" onSubmit={saveProfile}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Email (read-only)</label>
          <input type="email" value={form.email} readOnly />
        </div>

        <button className="btn-save" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>

        {msg && <p className="profile-msg">{msg}</p>}
      </form>
    </div>
  );
}
