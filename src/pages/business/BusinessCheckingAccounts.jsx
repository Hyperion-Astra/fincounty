import React from "react";
import "./business.css";

export default function BusinessCheckingAccounts() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1>Business Checking Accounts</h1>
        <p>Smart, flexible checking solutions built to support every stage of your business.</p>
      </header>

      <section className="section">
        <h2>Why Choose Our Business Checking?</h2>
        <ul className="feature-list">
          <li>No monthly maintenance fees on select accounts</li>
          <li>Free online & mobile banking</li>
          <li>Instant alerts & spending insights</li>
          <li>Visa® Business Debit Card included</li>
        </ul>
      </section>

      <section className="card-grid">
        <div className="info-card">
          <h3>Small Business Checking</h3>
          <p>Perfect for growing businesses with moderate transaction volume.</p>
          <ul>
            <li>No minimum balance</li>
            <li>250 free transactions/month</li>
            <li>Easy integrations with accounting tools</li>
          </ul>
          <button className="primary-btn">Open Account</button>
        </div>

        <div className="info-card">
          <h3>Commercial Checking</h3>
          <p>Designed for high-transaction businesses that need more control and flexibility.</p>
          <ul>
            <li>Unlimited transactions</li>
            <li>Cash management solutions</li>
            <li>Customizable access for team members</li>
          </ul>
          <button className="primary-btn">Contact Business Team</button>
        </div>
      </section>

      <section className="section">
        <h2>Included With Every Account</h2>
        <div className="included-grid">
          <div className="included-item">Mobile Check Deposit</div>
          <div className="included-item">Online Bill Pay</div>
          <div className="included-item">Account Alerts</div>
          <div className="included-item">Fraud Monitoring</div>
        </div>
      </section>
    </div>
  );
}
