// src/dashboards/client/Transfer.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import "./Transfer.css";

export default function Transfer() {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;

  // UI state
  const [selectedType, setSelectedType] = useState("internal"); // internal | savings | international | wire | swift
  const [fromType, setFromType] = useState("checking"); // checking | savings
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [balance, setBalance] = useState(0);

  // Fields that vary by transfer type
  const [destAccountNumber, setDestAccountNumber] = useState(""); // for internal another customer's account #
  const [recipientName, setRecipientName] = useState(""); // international/wire/swift
  const [recipientCountry, setRecipientCountry] = useState("");
  const [bankName, setBankName] = useState("");
  const [iban, setIban] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  // Wire specific
  const [wireAccountNumber, setWireAccountNumber] = useState("");
  const [wireRouting, setWireRouting] = useState("");
  const [achRouting, setAchRouting] = useState("");
  const [bankAddress, setBankAddress] = useState("");
  // SWIFT specific
  const [homeAddress, setHomeAddress] = useState("");
  const [transitNumber, setTransitNumber] = useState("");
  const [institutionNumber, setInstitutionNumber] = useState("");

  // helper: parse numeric safely
  function parseAmount(v) {
    const s = String(v).trim();
    if (!s) return 0;
    const cleaned = s.replace(/[^\d.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) return NaN;
    let whole = parts[0] || "0";
    let frac = parts[1] || "";
    if (frac.length > 2) frac = frac.slice(0, 2);
    const composed = frac ? `${whole}.${frac}` : whole;
    return Number(composed);
  }

  // Load source account balance (fromType)
  useEffect(() => {
    if (!uid) return;
    let mounted = true;
    (async () => {
      try {
        const q = query(
          collection(db, "accounts"),
          where("uid", "==", uid),
          where("accountType", "==", fromType)
        );
        const snap = await getDocs(q);
        if (!mounted) return;
        if (!snap.empty) {
          const data = snap.docs[0].data();
          setBalance(data.balance ?? 0);
        } else {
          setBalance(0);
        }
      } catch (err) {
        console.error("Failed to load balance:", err);
      }
    })();
    return () => (mounted = false);
  }, [uid, fromType]);

  // Reset feedback when type changes
  useEffect(() => {
    setFeedback(null);
  }, [selectedType]);

  // Validation per type
  function validateFields(parsedAmount) {
    if (!uid) return "You must be logged in.";
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) return "Enter a valid amount.";
    if (parsedAmount > balance) return "Insufficient funds.";

    // Type specific checks
    if (selectedType === "internal") {
      if (!destAccountNumber) return "Destination account number is required.";
      if (destAccountNumber.trim().length < 5) return "Enter a valid destination account number.";
    }

    if (selectedType === "savings") {
      // nothing extra: it moves between your own accounts
    }

    if (selectedType === "international") {
      if (!recipientName) return "Recipient name is required.";
      if (!bankName) return "Bank name is required.";
      if (!iban) return "IBAN ";
      if (!swiftCode) return "SWIFT/BIC";
    }

    if (selectedType === "wire") {
      if (!recipientName) return "Account holder name is required.";
      if (!wireAccountNumber) return "Account number is required.";
      if (!wireRouting) return "Wire routing number is required.";
      if (!achRouting) return "ACH routing number";
      if (!bankName) return "Bank name";
      if (!bankAddress) return "Bank address is required.";
    }

    if (selectedType === "swift") {
      if (!recipientName) return "Account holder name is required.";
      if (!homeAddress) return "Home address is required.";
      if (!bankName) return "Bank name is required.";
      if (!bankAddress) return "Bank address is required.";
      if (!wireAccountNumber) return "Account number is required.";
      if (!transitNumber) return "Transit number";
      if (!institutionNumber) return "Institution number";
      if (!swiftCode) return "SWIFT code is required.";
    }

    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFeedback(null);
    const amt = parseAmount(amount);
    const validationError = validateFields(amt);
    if (validationError) {
      setFeedback({ type: "error", text: validationError });
      return;
    }

    setLoading(true);

    try {
      // Fetch source account doc
      const qFrom = query(
        collection(db, "accounts"),
        where("uid", "==", uid),
        where("accountType", "==", fromType)
      );
      const snapFrom = await getDocs(qFrom);
      if (snapFrom.empty) throw new Error("Source account not found.");
      const fromDoc = snapFrom.docs[0];
      const fromData = fromDoc.data();

      if ((fromData.balance ?? 0) < amt) throw new Error("Insufficient funds.");

      // Internal transfer to another FinBank user
      if (selectedType === "internal") {
        const qTo = query(collection(db, "accounts"), where("accountNumber", "==", destAccountNumber));
        const snapTo = await getDocs(qTo);
        if (snapTo.empty) throw new Error("Destination account not found.");
        const toDoc = snapTo.docs[0];

        // Create transaction (posted)
        await addDoc(collection(db, "transactions"), {
          uid,
          type: "internal_transfer",
          amount: amt,
          fromAccount: fromData.accountNumber,
          toAccount: toDoc.data().accountNumber,
          status: "posted",
          note,
          createdAt: serverTimestamp(),
        });

        // Update balances
        await updateDoc(doc(db, "accounts", fromDoc.id), { balance: (fromData.balance ?? 0) - amt });
        await updateDoc(doc(db, "accounts", toDoc.id), { balance: (toDoc.data().balance ?? 0) + amt });

        setFeedback({ type: "success", text: "Transfer completed — funds moved." });
      }

      // Savings transfer between user's own accounts
      else if (selectedType === "savings") {
        // find user's savings account
        const qTo = query(
          collection(db, "accounts"),
          where("uid", "==", uid),
          where("accountType", "==", "savings")
        );
        const snapTo = await getDocs(qTo);
        if (snapTo.empty) throw new Error("Savings account not found.");
        const toDoc = snapTo.docs[0];

        await addDoc(collection(db, "transactions"), {
          uid,
          type: "savings_transfer",
          amount: amt,
          fromAccount: fromData.accountNumber,
          toAccount: toDoc.data().accountNumber,
          status: "posted",
          note,
          createdAt: serverTimestamp(),
        });

        await updateDoc(doc(db, "accounts", fromDoc.id), { balance: (fromData.balance ?? 0) - amt });
        await updateDoc(doc(db, "accounts", toDoc.id), { balance: (toDoc.data().balance ?? 0) + amt });

        setFeedback({ type: "success", text: "Moved to savings successfully." });
      }

      // International transfer (pending review)
      else if (selectedType === "international") {
        await addDoc(collection(db, "transactions"), {
          uid,
          type: "international_transfer",
          amount: amt,
          fromAccount: fromData.accountNumber,
          details: {
            recipientName,
            recipientCountry,
            bankName,
            iban,
            swiftCode,
            purpose: note,
          },
          status: "pending_review",
          createdAt: serverTimestamp(),
        });

        // Deduct (hold) funds from source
        await updateDoc(doc(db, "accounts", fromDoc.id), { balance: (fromData.balance ?? 0) - amt });

        setFeedback({
          type: "info",
          text: "International transfer requested — pending review. Processing typically takes 1–3 business days.",
        });
      }

      // Wire transfer (pending review)
      else if (selectedType === "wire") {
        await addDoc(collection(db, "transactions"), {
          uid,
          type: "wire_transfer",
          amount: amt,
          fromAccount: fromData.accountNumber,
          details: {
            accountHolder: recipientName,
            accountNumber: wireAccountNumber,
            wireRouting,
            achRouting,
            bankName,
            bankAddress,
            note,
          },
          status: "pending_review",
          createdAt: serverTimestamp(),
        });

        await updateDoc(doc(db, "accounts", fromDoc.id), { balance: (fromData.balance ?? 0) - amt });

        setFeedback({
          type: "info",
          text: "Wire transfer requested — pending review. Processing typically takes 1–3 business days.",
        });
      }

      // SWIFT transfer (pending review)
      else if (selectedType === "swift") {
        await addDoc(collection(db, "transactions"), {
          uid,
          type: "swift_transfer",
          amount: amt,
          fromAccount: fromData.accountNumber,
          details: {
            accountHolder: recipientName,
            homeAddress,
            bankName,
            bankAddress,
            accountNumber: wireAccountNumber,
            transitNumber,
            institutionNumber,
            swiftCode,
            note,
          },
          status: "pending_review",
          createdAt: serverTimestamp(),
        });

        await updateDoc(doc(db, "accounts", fromDoc.id), { balance: (fromData.balance ?? 0) - amt });

        setFeedback({
          type: "info",
          text: "SWIFT transfer requested — pending review. Processing typically takes 1–3 business days.",
        });
      }

      // reset form state (keep selectedType to make repeat transfers easier)
      setAmount("");
      setDestAccountNumber("");
      setRecipientName("");
      setRecipientCountry("");
      setBankName("");
      setIban("");
      setSwiftCode("");
      setWireAccountNumber("");
      setWireRouting("");
      setAchRouting("");
      setBankAddress("");
      setHomeAddress("");
      setTransitNumber("");
      setInstitutionNumber("");
      setNote("");
    } catch (err) {
      console.error(err);
      setFeedback({ type: "error", text: err.message || "Transfer failed." });
    } finally {
      setLoading(false);
    }
  }

  // Card definitions for UI (emojis keep it dependency-free)
  const cards = [
    { id: "internal", label: "Internal", icon: "🔁", hint: "FinBank customer" },
    { id: "savings", label: "Savings", icon: "💰", hint: "Move to your savings" },
    { id: "international", label: "International", icon: "🌍", hint: "IBAN / SWIFT" },
    { id: "wire", label: "Wire", icon: "🏦", hint: "Wire routing + ACH" },
    { id: "swift", label: "SWIFT", icon: "✈️", hint: "SWIFT / bank details" },
  ];

  return (
    <div className="transfer-container">
      <h2>Send Money</h2>

      <div className="transfer-cards">
        {cards.map((c) => (
          <div
            key={c.id}
            className={`transfer-card ${selectedType === c.id ? "selected" : ""}`}
            onClick={() => setSelectedType(c.id)}
          >
            <div className="card-icon">{c.icon}</div>
            <div className="card-body">
              <div className="card-title">{c.label}</div>
              <div className="card-hint">{c.hint}</div>
            </div>
          </div>
        ))}
      </div>

      <form className="transfer-form" onSubmit={handleSubmit}>
        <div className="row">
          <label>From Account</label>
          <select value={fromType} onChange={(e) => setFromType(e.target.value)} disabled={loading}>
            <option value="checking">Checking</option>
            <option value="savings">Savings</option>
          </select>
        </div>

        {/* --- conditional fields per transfer type --- */}

        {selectedType === "internal" && (
          <>
            <div className="row">
              <label>Destination Account Number</label>
              <input
                type="text"
                value={destAccountNumber}
                onChange={(e) => setDestAccountNumber(e.target.value.trim())}
                placeholder="Recipient account number"
                disabled={loading}
              />
            </div>
            <div className="hint">Enter the FinBank account number (10 digits).</div>
          </>
        )}

        {selectedType === "savings" && (
          <div className="hint">This will move funds between your checking and savings accounts.</div>
        )}

        {selectedType === "international" && (
          <>
            <div className="row">
              <label>Recipient Full Name</label>
              <input value={recipientName} onChange={(e) => setRecipientName(e.target.value)} disabled={loading} />
            </div>

            <div className="row">
              <label>Recipient Country</label>
              <input value={recipientCountry} onChange={(e) => setRecipientCountry(e.target.value)} disabled={loading} />
            </div>

            <div className="row">
              <label>Bank Name</label>
              <input value={bankName} onChange={(e) => setBankName(e.target.value)} disabled={loading} />
            </div>

            <div className="row">
              <label>IBAN</label>
              <input value={iban} onChange={(e) => setIban(e.target.value)} disabled={loading} />
            </div>

            <div className="row">
              <label>SWIFT / BIC</label>
              <input value={swiftCode} onChange={(e) => setSwiftCode(e.target.value)} disabled={loading} />
            </div>
          </>
        )}

        {selectedType === "wire" && (
          <>
            <div className="row">
              <label>Account Holder</label>
              <input value={recipientName} onChange={(e) => setRecipientName(e.target.value)} disabled={loading} />
            </div>

            <div className="row">
              <label>Account Number</label>
              <input value={wireAccountNumber} onChange={(e) => setWireAccountNumber(e.target.value)} disabled={loading} />
            </div>

            <div className="two-cols">
              <div>
                <label>Wire Routing #</label>
                <input value={wireRouting} onChange={(e) => setWireRouting(e.target.value)} disabled={loading} />
              </div>
              <div>
                <label>ACH Routing #</label>
                <input value={achRouting} onChange={(e) => setAchRouting(e.target.value)} disabled={loading} />
              </div>
            </div>

            <div className="row">
              <label>Bank Name</label>
              <input value={bankName} onChange={(e) => setBankName(e.target.value)} disabled={loading} />
            </div>

            <div className="row">
              <label>Bank Address</label>
              <input value={bankAddress} onChange={(e) => setBankAddress(e.target.value)} disabled={loading} />
            </div>
          </>
        )}

        {selectedType === "swift" && (
          <>
            <div className="row">
              <label>Account Holder</label>
              <input value={recipientName} onChange={(e) => setRecipientName(e.target.value)} disabled={loading} />
            </div>

            <div className="row">
              <label>Home Address</label>
              <input value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} disabled={loading} />
            </div>

            <div className="row">
              <label>Bank Name</label>
              <input value={bankName} onChange={(e) => setBankName(e.target.value)} disabled={loading} />
            </div>

            <div className="row">
              <label>Bank Address</label>
              <input value={bankAddress} onChange={(e) => setBankAddress(e.target.value)} disabled={loading} />
            </div>

            <div className="row">
              <label>Account Number</label>
              <input value={wireAccountNumber} onChange={(e) => setWireAccountNumber(e.target.value)} disabled={loading} />
            </div>

            <div className="two-cols">
              <div>
                <label>Transit Number</label>
                <input value={transitNumber} onChange={(e) => setTransitNumber(e.target.value)} disabled={loading} />
              </div>
              <div>
                <label>Institution Number</label>
                <input value={institutionNumber} onChange={(e) => setInstitutionNumber(e.target.value)} disabled={loading} />
              </div>
            </div>

            <div className="row">
              <label>SWIFT / BIC</label>
              <input value={swiftCode} onChange={(e) => setSwiftCode(e.target.value)} disabled={loading} />
            </div>
          </>
        )}

        {/* Amount & note */}
        <div className="row">
          <label>Amount (USD)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            inputMode="decimal"
            disabled={loading}
          />
        </div>

        <div className="row">
          <label>Note (optional)</label>
          <input value={note} onChange={(e) => setNote(e.target.value)} disabled={loading} />
        </div>

        <div className="actions">
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Submit Transfer"}
          </button>
        </div>

        {feedback && <p className={`msg ${feedback.type}`}>{feedback.text}</p>}
      </form>
    </div>
  );
}
