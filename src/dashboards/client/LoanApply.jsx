// src/dashboards/client/pages/LoanApply.jsx
import React, { useState } from "react";
import { requestLoan } from "../../services/LoanService.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Transfer.css"

const LoanApply = () => {
  const { currentUser } = useAuth();

  const [form, setForm] = useState({
    loanType: "",
    amount: "",
    durationMonths: "",
    income: "",
    employment: "",
    documentUrl: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const update = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.amount || !form.loanType) {
      setMsg("Fill all required fields.");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      await requestLoan({
        userId: currentUser.uid,
        userEmail: currentUser.email,
        ...form,
      });

      setMsg("Loan request submitted! Await approval.");
      setForm({
        loanType: "",
        amount: "",
        durationMonths: "",
        income: "",
        employment: "",
        documentUrl: "",
        note: "",
      });
    } catch (err) {
      setMsg("Error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="form-page">
      <h2>Loan Application</h2>

      <form onSubmit={handleSubmit}>
        <label>Loan Type</label>
        <input
          value={form.loanType}
          onChange={(e) => update("loanType", e.target.value)}
          required
        />

        <label>Amount</label>
        <input
          type="number"
          value={form.amount}
          onChange={(e) => update("amount", e.target.value)}
          required
        />

        <label>Duration (Months)</label>
        <input
          type="number"
          value={form.durationMonths}
          onChange={(e) => update("durationMonths", e.target.value)}
          required
        />

        <label>Monthly Income</label>
        <input
          type="number"
          value={form.income}
          onChange={(e) => update("income", e.target.value)}
        />

        <label>Employment Status</label>
        <input
          value={form.employment}
          onChange={(e) => update("employment", e.target.value)}
        />

        <label>Document URL (Optional)</label>
        <input
          value={form.documentUrl}
          onChange={(e) => update("documentUrl", e.target.value)}
        />

        <label>Note</label>
        <textarea
          value={form.note}
          onChange={(e) => update("note", e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Apply for Loan"}
        </button>
      </form>

      {msg && <p className="form-msg">{msg}</p>}
    </div>
  );
};

export default LoanApply;
