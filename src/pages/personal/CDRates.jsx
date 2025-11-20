/* CDRates.jsx */
import React from "react";
import "./CDRates.css";

export default function CDRates() {
  const rates = [
    { term: "6 months", apy: "0.35%" },
    { term: "1 year", apy: "0.60%" },
    { term: "2 years", apy: "0.85%" },
    { term: "5 years", apy: "1.20%" },
  ];

  return (
    <div className="pc-cd">
      <header className="pc-hero">
        <div className="pc-hero-inner">
          <h1>Certificate of Deposit (CD) Rates</h1>
          <p className="pc-lead">Secure earnings with fixed-rate CD terms — competitive APYs.</p>
        </div>
      </header>

      <section className="pc-section pc-rates">
        <div className="pc-container">
          <h2>Current CD rates</h2>

          <div className="pc-rates-grid">
            {rates.map((r, i) => (
              <div key={i} className="rate-card">
                <h3>{r.term}</h3>
                <p className="rate-apy">{r.apy}</p>
                <p className="rate-desc">A fixed rate for the term selected. Terms subject to change.</p>
                <a className="pc-btn pc-btn-primary" href="/apply">Open a CD</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
