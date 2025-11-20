import React, { useState } from "react";
import "./mortgage.css";

export default function MortgageCalculators() {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interest, setInterest] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interest / 100 / 12;
    const n = years * 12;
    const monthly = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    setResult(monthly.toFixed(2));
  };

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1>Mortgage Calculators & Application</h1>
        <p>Estimate your monthly payment or begin your mortgage application.</p>
      </header>

      <section className="section">
        <h2>Payment Calculator</h2>

        <div className="info-card">
          <label>Home Price</label>
          <input type="number" value={homePrice} onChange={(e) => setHomePrice(+e.target.value)} />

          <label>Down Payment</label>
          <input type="number" value={downPayment} onChange={(e) => setDownPayment(+e.target.value)} />

          <label>Interest Rate (%)</label>
          <input type="number" value={interest} onChange={(e) => setInterest(+e.target.value)} />

          <label>Loan Term (Years)</label>
          <input type="number" value={years} onChange={(e) => setYears(+e.target.value)} />

          <button className="primary-btn" onClick={calculate}>Calculate</button>

          {result && <h3 className="result">Estimated Monthly Payment: ${result}</h3>}
        </div>
      </section>

      <section className="section">
        <h2>Apply for a Mortgage</h2>
        <button className="primary-btn">Start Application</button>
      </section>
    </div>
  );
}
