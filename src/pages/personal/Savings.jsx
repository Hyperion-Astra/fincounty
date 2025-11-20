/* Savings.jsx */
import React from "react";
import "./Savings.css";

export default function Savings() {
  return (
    <div className="pc-savings">
      <header className="pc-hero">
        <div className="pc-hero-inner">
          <h1>Savings Accounts</h1>
          <p className="pc-lead">Secure ways to save — competitive interest and flexible options.</p>
        </div>
      </header>

      <section className="pc-section pc-savings-products">
        <div className="pc-container">
          <h2>Find the right savings for you</h2>

          <div className="pc-savings-grid">
            <div className="s-card">
              <h3>Standard Savings</h3>
              <p>High-yield savings for everyday savers.</p>
              <a className="pc-link" href="/personal/savings">Learn More</a>
            </div>
            <div className="s-card">
              <h3>Money Market</h3>
              <p>Higher returns with limited check access.</p>
              <a className="pc-link" href="/personal/savings">Learn More</a>
            </div>
            <div className="s-card">
              <h3>Health Savings (HSA)</h3>
              <p>Tax-advantaged savings for medical expenses.</p>
              <a className="pc-link" href="/personal/savings">Learn More</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
