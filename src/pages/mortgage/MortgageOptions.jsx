import React from "react";
import "./mortgage.css";

export default function MortgageOptions() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1>Mortgage Options</h1>
        <p>Explore lending programs designed for different financial needs and goals.</p>
      </header>

      <section className="section">
        <h2>Loan Programs</h2>

        <div className="info-card">
          <h3>Fixed-Rate Mortgage</h3>
          <p>Stable monthly payments throughout the life of the loan.</p>
        </div>

        <div className="info-card">
          <h3>Adjustable-Rate Mortgage (ARM)</h3>
          <p>Lower starting rates that adjust at scheduled intervals.</p>
        </div>

        <div className="info-card">
          <h3>FHA Loans</h3>
          <p>Lower down payment requirements for qualifying borrowers.</p>
        </div>

        <div className="info-card">
          <h3>VA Loans</h3>
          <p>No down payment for eligible military borrowers.</p>
        </div>

        <div className="info-card">
          <h3>Jumbo Loans</h3>
          <p>Financing for higher-value properties exceeding standard limits.</p>
        </div>
      </section>
    </div>
  );
}
