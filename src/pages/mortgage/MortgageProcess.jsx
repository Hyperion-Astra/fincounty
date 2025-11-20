import React from "react";
import "./mortgage.css";

export default function MortgageProcess() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1>The Mortgage Process</h1>
        <p>Understand each stage of securing a home loan with clarity and confidence.</p>
      </header>

      <section className="section">
        <h2>Step-by-Step Guide</h2>

        <div className="info-card">
          <h3>1. Pre-Qualification</h3>
          <p>Get an estimate of your borrowing power and potential loan options.</p>
        </div>

        <div className="info-card">
          <h3>2. Loan Application</h3>
          <p>Submit your income, assets, credit history, and property details.</p>
        </div>

        <div className="info-card">
          <h3>3. Processing</h3>
          <p>A loan processor verifies documents, employment, and required records.</p>
        </div>

        <div className="info-card">
          <h3>4. Underwriting</h3>
          <p>Underwriters evaluate your finances and determine loan approval eligibility.</p>
        </div>

        <div className="info-card">
          <h3>5. Closing</h3>
          <p>Sign final documents and receive the keys to your new home.</p>
        </div>
      </section>

      <section className="section">
        <h2>What You’ll Need</h2>
        <ul className="feature-list">
          <li>✔ Recent pay stubs & tax returns</li>
          <li>✔ Bank statements</li>
          <li>✔ Employment verification</li>
          <li>✔ Credit report</li>
          <li>✔ Property information</li>
        </ul>
      </section>

      <section className="section">
        <h2>Get Started Today</h2>
        <button className="primary-btn">Apply for a Mortgage</button>
      </section>
    </div>
  );
}
