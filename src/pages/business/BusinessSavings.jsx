import React from "react";
import "./business.css";

export default function BusinessSavings() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1>Business Savings Account</h1>
        <p>Grow your company’s reserves with flexible, interest-earning solutions.</p>
      </header>

      <section className="section">
        <h2>Why Choose Our Business Savings?</h2>

        <ul className="feature-list">
          <li>✔ Competitive interest rates</li>
          <li>✔ No monthly maintenance fee with minimum balance</li>
          <li>✔ Easy transfers between business checking</li>
          <li>✔ Online & mobile banking access</li>
          <li>✔ FDIC insured</li>
        </ul>
      </section>

      <section className="section">
        <h2>Account Features</h2>

        <div className="info-card">
          <h3>Minimum Opening Deposit</h3>
          <p>$100</p>
        </div>

        <div className="info-card">
          <h3>Monthly Fee</h3>
          <p>$0 (with minimum balance)</p>
        </div>

        <div className="info-card">
          <h3>Withdrawal Limits</h3>
          <p>Up to 6 free withdrawals per month</p>
        </div>

        <div className="info-card">
          <h3>Business Support</h3>
          <p>Our team helps you manage liquidity and long-term savings strategies.</p>
        </div>
      </section>

      <section className="section">
        <h2>Interest Rates</h2>

        <table className="rates-table">
          <thead>
            <tr>
              <th>Balance Tier</th>
              <th>APY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>$0 – $10,000</td>
              <td>0.15%</td>
            </tr>
            <tr>
              <td>$10,001 – $50,000</td>
              <td>0.25%</td>
            </tr>
            <tr>
              <td>$50,001+</td>
              <td>0.35%</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="section">
        <h2>Ready to Open an Account?</h2>
        <p>
          Strengthen your business’s financial foundation with a secure,
          interest-earning savings account.
        </p>
        <button className="primary-btn">Get Started</button>
      </section>
    </div>
  );
}
