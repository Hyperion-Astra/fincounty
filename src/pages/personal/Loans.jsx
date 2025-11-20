/* Loans.jsx */
import React from "react";
import "./Loans.css";

export default function Loans() {
  return (
    <div className="pc-loans">
      <header className="pc-hero">
        <div className="pc-hero-inner">
          <h1>Loans</h1>
          <p className="pc-lead">Consumer loans, home mortgages, and lines of credit with competitive rates.</p>
        </div>
      </header>

      <section className="pc-section pc-loan-products">
        <div className="pc-container">
          <h2>Loan products</h2>

          <div className="pc-loan-grid">
            <div className="loan-card">
              <h3>Personal Loan</h3>
              <p>Unsecured loans for major expenses — fixed monthly payments.</p>
              <a className="pc-link" href="/personal/loans">Apply</a>
            </div>

            <div className="loan-card">
              <h3>Auto Loan</h3>
              <p>Competitive rates for new and used vehicles.</p>
              <a className="pc-link" href="/personal/loans">Apply</a>
            </div>

            <div className="loan-card">
              <h3>Home Equity Line</h3>
              <p>Flexible borrowing using your home's equity.</p>
              <a className="pc-link" href="/mortgage/mortgage-options">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      <section className="pc-section pc-loan-cta">
        <div className="pc-container">
          <div className="pc-cta-card">
            <h3>Ready to explore loan options?</h3>
            <p>Start with a pre-qualification to see rates tailored to you.</p>
            <a className="pc-btn pc-btn-primary" href="/mortgage/mortgage-rates">Get Pre-Qualified</a>
          </div>
        </div>
      </section>
    </div>
  );
}
