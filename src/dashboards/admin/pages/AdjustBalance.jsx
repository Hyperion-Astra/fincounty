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
  getDoc,
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

  // NEW: balances for selected user
  const [checkingBalance, setCheckingBalance] = useState(null);
  const [savingsBalance, setSavingsBalance] = useState(null);
  const [balancesLoading, setBalancesLoading] = useState(false);

  // Load all users (email + uid)
  useEffect(() => {
    async function loadUsers() {
      try {
        const snap = await getDocs(collection(db, "users"));
        const arr = snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
        setAllUsers(arr);
      } catch (err) {
        console.error("Failed to load users:", err);
      }
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
    setFiltered(allUsers.filter((u) => u.email?.toLowerCase().includes(s)));
  }, [search, allUsers]);

  // Fetch balances when uid changes
  useEffect(() => {
    if (!uid) {
      setCheckingBalance(null);
      setSavingsBalance(null);
      return;
    }

    let cancelled = false;
    const fetchBalances = async () => {
      setBalancesLoading(true);
      try {
        const accRef = doc(db, "accounts", uid);
        const accSnap = await getDoc(accRef);
        if (!accSnap.exists()) {
          // no account doc for this user
          if (!cancelled) {
            setCheckingBalance(null);
            setSavingsBalance(null);
          }
        } else {
          const data = accSnap.data();
          if (!cancelled) {
            setCheckingBalance(typeof data.checkingBalance === "number" ? data.checkingBalance : 0);
            setSavingsBalance(typeof data.savingsBalance === "number" ? data.savingsBalance : 0);
          }
        }
      } catch (err) {
        console.error("Failed to fetch balances:", err);
        if (!cancelled) {
          setCheckingBalance(null);
          setSavingsBalance(null);
        }
      } finally {
        if (!cancelled) setBalancesLoading(false);
      }
    };

    fetchBalances();

    return () => {
      cancelled = true;
    };
  }, [uid]);

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
      return setMsg({ type: "error", text: "Enter a valid amount (non-zero)." });

    setLoading(true);
    try {
      const accRef = doc(db, "accounts", uid);

      await runTransaction(db, async (t) => {
        const accSnap = await t.get(accRef);
        if (!accSnap.exists()) throw new Error("Account not found");

        const data = accSnap.data();

        // decide which field to update based on accountType
        const balanceField = accountType === "checking" ? "checkingBalance" : "savingsBalance";
        const currentBalance = (data[balanceField] ?? 0);

        // optional: prevent negative resulting balance
        // if (currentBalance + amt < 0) throw new Error("Insufficient funds for this adjustment.");

        // update balance
        t.update(accRef, {
          [balanceField]: currentBalance + amt,
        });

        // create transaction record
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

      // refresh balances in UI after success
      const refreshedAccSnap = await getDoc(doc(db, "accounts", uid));
      if (refreshedAccSnap.exists()) {
        const d = refreshedAccSnap.data();
        setCheckingBalance(typeof d.checkingBalance === "number" ? d.checkingBalance : 0);
        setSavingsBalance(typeof d.savingsBalance === "number" ? d.savingsBalance : 0);
      }

      setMsg({ type: "success", text: "Account updated successfully." });
      setAmount("");
      setSearch("");
      setFiltered([]);
      setShowDropdown(false);
      // keep uid selected if you want; if you want to clear uid, uncomment:
      // setUid("");
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: err.message || "Failed to update account." });
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
                    setUid(u.uid); // store UID
                    setSearch(u.email); // display email
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

        {/* === BALANCE DISPLAY === */}
        <div className="balance-display">
          <label>Current Balances</label>
          {balancesLoading ? (
            <div className="balances-loading">Loading balances...</div>
          ) : uid ? (
            <div className="balances-values">
              <div>
                <strong>Checking:</strong>{" "}
                {checkingBalance === null ? "—" : checkingBalance}
              </div>
              <div>
                <strong>Savings:</strong>{" "}
                {savingsBalance === null ? "—" : savingsBalance}
              </div>
            </div>
          ) : (
            <div className="balances-placeholder">Select a user to view balances</div>
          )}
        </div>

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
          placeholder="e.g. 5000 or -2000"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Adjust Balance"}
        </button>
      </form>
    </div>
  );
}
