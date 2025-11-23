import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./mortgage.css";

export default function MortgageCalculators() {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interest, setInterest] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!homePrice || !downPayment || !interest || !years) {
      alert("Please fill in all fields");
      return;
    }
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interest / 100 / 12;
    const n = years * 12;
    const monthly = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    setResult(monthly.toFixed(2));
  };

  return (
    <div className="page-wrapper">
      <header className="page-header" data-aos="fade-up">
        <h1>Mortgage Calculators & Application</h1>
        <p className="lead">
          Estimate your monthly payment or start your mortgage application today.
        </p>
      </header>

      <section className="section" data-aos="fade-up">
        <h2>Payment Calculator</h2>
        <p>Use this calculator to get an estimate of your monthly mortgage payment.</p>

        <div className="calculator-card">
          <label>
            Home Price
            <input
              type="number"
              placeholder="Enter the total home price"
              value={homePrice}
              onChange={(e) => setHomePrice(+e.target.value)}
            />
          </label>

          <label>
            Down Payment
            <input
              type="number"
              placeholder="Enter your down payment"
              value={downPayment}
              onChange={(e) => setDownPayment(+e.target.value)}
            />
          </label>

          <label>
            Interest Rate (%)
            <input
              type="number"
              placeholder="Enter annual interest rate"
              value={interest}
              onChange={(e) => setInterest(+e.target.value)}
            />
          </label>

          <label>
            Loan Term (Years)
            <input
              type="number"
              placeholder="Enter loan term in years"
              value={years}
              onChange={(e) => setYears(+e.target.value)}
            />
          </label>

          <button className="primary-btn" onClick={calculate}>Calculate</button>

          {result && (
            <h3 className="result">Estimated Monthly Payment: ${result}</h3>
          )}
        </div>
      </section>

      <section className="section" data-aos="fade-up">
        <h2>Apply for a Mortgage</h2>
        <p>Ready to move forward? Start your mortgage application with us today.</p>
        <Link to="/contact" className="primary-btn">Contact Support</Link>
      </section>
    </div>
  );
}
