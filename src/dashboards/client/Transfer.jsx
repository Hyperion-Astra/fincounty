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
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import "./Transfer.css";

export default function Transfer() {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;

  // UI state
  const [selectedType, setSelectedType] = useState("internal");
  const [fromType, setFromType] = useState("checking");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [balance, setBalance] = useState(0);

  // Fields that vary by transfer type
  const [destAccountNumber, setDestAccountNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientCountry, setRecipientCountry] = useState("");
  const [bankName, setBankName] = useState("");
  const [iban, setIban] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [wireAccountNumber, setWireAccountNumber] = useState("");
  const [wireRouting, setWireRouting] = useState("");
  const [achRouting, setAchRouting] = useState("");
  const [bankAddress, setBankAddress] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [transitNumber, setTransitNumber] = useState("");
  const [institutionNumber, setInstitutionNumber] = useState("");

  function parseAmount(v) {
    if (v === null || v === undefined) return NaN;
    const str = String(v).trim();
    if (str === "") return NaN;
    const cleaned = str.replace(/,/g, "").replace(/[^\d.]/g, "");
    const n = parseFloat(cleaned);
    if (Number.isNaN(n)) return NaN;
    return Math.round(n * 100) / 100;
  }

  // Load source account balance (checking or savings)
  useEffect(() => {
    if (!uid) return;
    let mounted = true;

    (async () => {
      try {
        const docRef = doc(db, "accounts", uid);
        const snap = await getDoc(docRef);

        if (!mounted) return;

        if (snap.exists()) {
          const data = snap.data();
          const bal =
            fromType === "checking"
              ? data.checkingBalance || 0
              : data.savingsBalance || 0;
          setBalance(Number(bal));
        } else {
          setBalance(0);
        }
      } catch (err) {
        console.error("Failed to load balance:", err);
      }
    })();

    return () => (mounted = false);
  }, [uid, fromType]);

  useEffect(() => {
    setFeedback(null);
  }, [selectedType]);

  function validateFields(parsedAmount) {
    if (!uid) return "You must be logged in.";
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) return "Enter a valid amount.";
    if (parsedAmount > balance) return "Insufficient funds.";

    if (selectedType === "internal") {
      if (!destAccountNumber) return "Destination account number is required.";
      if (destAccountNumber.trim().length < 5) return "Enter a valid destination account number.";
    }

    if (selectedType === "international") {
      if (!recipientName) return "Recipient name is required.";
      if (!recipientCountry) return "Recipient country is required.";
      if (!bankName) return "Bank name is required.";
      if (!bankAddress) return "Bank address is required.";
      if (!homeAddress) return "Recipient home address is required.";
      if (!iban) return "IBAN is required.";
      if (!swiftCode) return "SWIFT/BIC is required.";
    }

    if (selectedType === "wire") {
      if (!recipientName) return "Account holder name is required.";
      if (!wireAccountNumber) return "Account number is required.";
      if (!wireRouting) return "Wire routing number is required.";
      if (!achRouting) return "ACH routing number is required.";
      if (!bankName) return "Bank name is required.";
      if (!bankAddress) return "Bank address is required.";
      if (!homeAddress) return "Recipient home address is required.";
    }

    if (selectedType === "swift") {
      if (!recipientName) return "Account holder name is required.";
      if (!homeAddress) return "Home address is required.";
      if (!bankName) return "Bank name is required.";
      if (!bankAddress) return "Bank address is required.";
      if (!wireAccountNumber) return "Account number is required.";
      if (!transitNumber) return "Transit number is required.";
      if (!institutionNumber) return "Institution number is required.";
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

    const numericAmt = Number(amt);
    setLoading(true);

    try {
      // Load user account doc
      const accRef = doc(db, "accounts", uid);
      const accSnap = await getDoc(accRef);
      if (!accSnap.exists()) throw new Error("Account not found.");
      const acc = accSnap.data();

      const sourceBalance =
        fromType === "checking"
          ? acc.checkingBalance
          : acc.savingsBalance;

      if (sourceBalance < numericAmt) throw new Error("Insufficient funds.");

      // Internal transfer
      if (selectedType === "internal") {
        let snapTo = await getDocs(
          query(collection(db, "accounts"), where("checkingAccountNumber", "==", destAccountNumber))
        );
        if (snapTo.empty) {
          snapTo = await getDocs(
            query(collection(db, "accounts"), where("savingsAccountNumber", "==", destAccountNumber))
          );
        }
        if (snapTo.empty) throw new Error("Destination account not found.");

        const toDoc = snapTo.docs[0];
        const toData = toDoc.data();

        await addDoc(collection(db, "transactions"), {
          uid,
          type: "internal_transfer",
          amount: numericAmt,
          fromAccount: fromType === "checking" ? acc.checkingAccountNumber : acc.savingsAccountNumber,
          toAccount: toData.checkingAccountNumber || toData.savingsAccountNumber,
          status: "posted",
          note,
          createdAt: serverTimestamp(),
        });

        // Update balances
        const updates = {};
        if (fromType === "checking") updates.checkingBalance = sourceBalance - numericAmt;
        else updates.savingsBalance = sourceBalance - numericAmt;

        if (toData.checkingAccountNumber === destAccountNumber)
          updates.checkingBalance = (toData.checkingBalance || 0) + numericAmt;
        else
          updates.savingsBalance = (toData.savingsBalance || 0) + numericAmt;

        await updateDoc(accRef, updates);
        await updateDoc(doc(db, "accounts", toDoc.id), updates);

        setFeedback({ type: "success", text: "Transfer completed — funds moved." });
      }

      // Savings transfer
      else if (selectedType === "savings") {
        const savingsBalance = acc.savingsBalance || 0;
        const updates =
          fromType === "checking"
            ? { checkingBalance: sourceBalance - numericAmt, savingsBalance: savingsBalance + numericAmt }
            : { savingsBalance: sourceBalance - numericAmt, checkingBalance: acc.checkingBalance + numericAmt };

        await addDoc(collection(db, "transactions"), {
          uid,
          type: "savings_transfer",
          amount: numericAmt,
          fromAccount: fromType === "checking" ? acc.checkingAccountNumber : acc.savingsAccountNumber,
          toAccount: fromType === "checking" ? acc.savingsAccountNumber : acc.checkingAccountNumber,
          status: "posted",
          note,
          createdAt: serverTimestamp(),
        });

        await updateDoc(accRef, updates);
        setFeedback({ type: "success", text: "Moved to savings successfully." });
      }

      // International / Wire / SWIFT (pending)
      else {
        const transData = {
          uid,
          amount: numericAmt,
          fromAccount: fromType === "checking" ? acc.checkingAccountNumber : acc.savingsAccountNumber,
          note,
          createdAt: serverTimestamp(),
        };

        if (selectedType === "international") {
          transData.type = "international_transfer";
          transData.details = { recipientName, recipientCountry, bankName, bankAddress, homeAddress, iban, swiftCode, purpose: note };
        } else if (selectedType === "wire") {
          transData.type = "wire_transfer";
          transData.details = { accountHolder: recipientName, accountNumber: wireAccountNumber, wireRouting, achRouting, bankName, bankAddress, homeAddress, note };
        } else if (selectedType === "swift") {
          transData.type = "swift_transfer";
          transData.details = { accountHolder: recipientName, homeAddress, bankName, bankAddress, accountNumber: wireAccountNumber, transitNumber, institutionNumber, swiftCode, note };
        }

        await addDoc(collection(db, "transactions"), { ...transData, status: "pending_review" });
        const updates = fromType === "checking"
          ? { checkingBalance: sourceBalance - numericAmt }
          : { savingsBalance: sourceBalance - numericAmt };
        await updateDoc(accRef, updates);

        setFeedback({
          type: "info",
          text: `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} transfer requested — pending review. Processing typically takes 1–3 business days.`,
        });
      }

      // Reset form
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

        {/* Conditional fields per type */}
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
            <div className="row"><label>Recipient Full Name</label><input value={recipientName} onChange={(e) => setRecipientName(e.target.value)} disabled={loading} /></div>
            <div className="row"><label>Recipient Country</label><input value={recipientCountry} onChange={(e) => setRecipientCountry(e.target.value)} disabled={loading} /></div>
            <div className="row"><label>Bank Name</label><input value={bankName} onChange={(e) => setBankName(e.target.value)} disabled={loading} /></div>
            <div className="row"><label>Bank Address</label><input value={bankAddress} onChange={(e) => setBankAddress(e.target.value)} disabled={loading} /></div>
            <div className="row"><label>Recipient Home Address</label><input value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} disabled={loading} /></div>
            <div className="row"><label>IBAN</label><input value={iban} onChange={(e) => setIban(e.target.value)} disabled={loading} /></div>
            <div className="row"><label>SWIFT / BIC</label><input value={swiftCode} onChange={(e) => setSwiftCode(e.target.value)} disabled={loading} /></div>
          </>
        )}

        {selectedType === "wire" && (
          <>
            <div className="row"><label>Account Holder</label><input value={recipientName} onChange={(e) => setRecipientName(e.target.value)} disabled={loading} /></div>
            <div className="row"><label>Account Number</label><input value={wireAccountNumber} onChange={(e) => setWireAccountNumber(e.target.value)} disabled={loading} /></div>
            <div className="two-cols">
              <div><label>Wire Routing #</label><input value={wireRouting} onChange={(e) => setWireRouting(e.target.value)} disabled={loading} /></div>
              <div><label>ACH Routing #</label><input value={achRouting} onChange={(e) => setAchRouting(e.target.value)} disabled={loading} /></div>
            </div>
            <div className="row"><label>Bank Name</label><input value={bankName} onChange={(e) => setBankName(e.target.value)} disabled={loading} /></div>
            <div className="row"><label>Bank Address</label><input value={bankAddress} onChange={(e) => setBankAddress(e.target.value)} disabled={loading} /></div>
            <div className="row"><label>Recipient Home Address</label><input value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} disabled={loading} /></div>
          </>
        )}

        {selectedType === "swift" && (
          <>
            <div className="row"><label>Account Holder</label><input value={recipientName} onChange={(e) => setRecipientName(e.target.value)} disabled={loading} /></div>
            <div className="row"><label>Home Address</label><input value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} disabled={loading} /></div>
            <div className="row"><label>Bank Name</label><input value={bankName} onChange={(e) => setBankName(e.target.value)} disabled={loading} /></div>
            <div className="row"><label>Bank Address</label><input value={bankAddress} onChange={(e) => setBankAddress(e.target.value)} disabled={loading} /></div>
            <div className="row"><label>Account Number</label><input value={wireAccountNumber} onChange={(e) => setWireAccountNumber(e.target.value)} disabled={loading} /></div>
            <div className="two-cols">
              <div><label>Transit Number</label><input value={transitNumber} onChange={(e) => setTransitNumber(e.target.value)} disabled={loading} /></div>
              <div><label>Institution Number</label><input value={institutionNumber} onChange={(e) => setInstitutionNumber(e.target.value)} disabled={loading} /></div>
            </div>
            <div className="row"><label>SWIFT / BIC</label><input value={swiftCode} onChange={(e) => setSwiftCode(e.target.value)} disabled={loading} /></div>
          </>
        )}

        {/* Amount & note */}
        <div className="row">
          <label>Amount (USD)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal" disabled={loading} />
        </div>

        <div className="row">
          <label>Note (optional)</label>
          <input value={note} onChange={(e) => setNote(e.target.value)} disabled={loading} />
        </div>

        <div className="actions">
          <button type="submit" disabled={loading}>{loading ? "Processing..." : "Submit Transfer"}</button>
        </div>

        {feedback && <p className={`msg ${feedback.type}`}>{feedback.text}</p>}
      </form>
    </div>
  );
}
