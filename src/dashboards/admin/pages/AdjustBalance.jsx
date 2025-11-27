import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import "./AdjustBalance.css";

export default function AdjustBalance() {
  const [uid, setUid] = useState("");
  const [amount, setAmount] = useState("");
  const [accountType, setAccountType] = useState("checking");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  // NEW: user search states
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Load all users (email + uid)
  useEffect(() => {
    async function loadUsers() {
      const snap = await getDocs(collection(db, "users"));
      const arr = snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
      setAllUsers(arr);
    }
    loadUsers();
  }, []);

  // Filter users when typing
  useEffect(() => {
    if (!search.trim()) {
      setFiltered([]);
      return;
    }
    const s = search.toLowerCase();
    setFiltered(
      allUsers.filter((u) =>
        u.email?.toLowerCase().includes(s)
      )
    );
  }, [search, allUsers]);

  function parseAmount(v) {
    const s = String(v).trim();
    if (!s) return 0;
    const cleaned = s.replace(/[^\d.-]/g, "");
    return Number(cleaned);
  }

  async function handleAdjust(e) {
    e.preventDefault();
    setMsg(null);

    if (!uid) return setMsg({ type: "error", text: "Select a user first." });

    const amt = parseAmount(amount);
    if (Number.isNaN(amt) || amt === 0)
      return setMsg({ type: "error", text: "Enter a valid amount" });

    setLoading(true);
    try {
      await runTransaction(db, async (t) => {
        const q = query(
          collection(db, "accounts"),
          where("uid", "==", uid),
          where("accountType", "==", accountType)
        );
        const snap = await getDocs(q);
        if (snap.empty) throw new Error("Account not found");

        const accDoc = snap.docs[0];
        const accRef = doc(db, "accounts", accDoc.id);
        const currentBalance = accDoc.data().balance ?? 0;

        t.update(accRef, { balance: currentBalance + amt });

        const txRef = doc(collection(db, "transactions"));
        t.set(txRef, {
          uid,
          type: "admin_adjustment",
          amount: amt,
          accountType,
          status: "posted",
          note: "Admin adjustment",
          createdAt: serverTimestamp(),
        });
      });

      setMsg({ type: "success", text: "Account updated successfully." });
      setUid("");
      setAmount("");
      setSearch("");
      setFiltered([]);
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="adjust-page">
      <h2>Manual Balance Adjustment</h2>

      {msg && <p className={`msg ${msg.type}`}>{msg.text}</p>}

      <form onSubmit={handleAdjust} className="adjust-form">
        {/* === SEARCHABLE USER SELECTOR === */}
        <label>Select User</label>

        <div className="user-search-wrapper">
          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            disabled={loading}
          />

          {showDropdown && filtered.length > 0 && (
            <div className="search-dropdown">
              {filtered.map((u) => (
                <div
                  key={u.uid}
                  className="dropdown-item"
                  onClick={() => {
                    setUid(u.uid);           // store UID
                    setSearch(u.email);      // display email
                    setShowDropdown(false);
                  }}
                >
                  {u.email}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hidden actual UID input ─ no need to show to admin */}
        <input type="hidden" value={uid} readOnly />

        <label>Account Type</label>
        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          disabled={loading}
        >
          <option value="checking">Checking</option>
          <option value="savings">Savings</option>
        </select>

        <label>Amount (use negative to subtract)</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Adjust Balance"}
        </button>
      </form>
    </div>
  );
}
