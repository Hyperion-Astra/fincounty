import React from "react";
import "./business.css";

export default function BusinessCashManagement() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1>Business Cash Management</h1>
        <p>
          Streamline your company’s financial operations with secure, efficient, and
          easy-to-use cash management tools.
        </p>
      </header>

      {/* Overview */}
      <section className="section">
        <h2>What We Offer</h2>

        <div className="info-card">
          <h3>ACH Payments</h3>
          <p>
            Pay vendors, suppliers, and employees electronically with fast and secure ACH transfers.
          </p>
        </div>

        <div className="info-card">
          <h3>Remote Deposit Capture</h3>
          <p>
            Deposit checks from your office using a dedicated scanner—no need to visit the branch.
          </p>
        </div>

        <div className="info-card">
          <h3>Wire Transfers</h3>
          <p>
            Send domestic and international wires quickly and safely.
          </p>
        </div>

        <div className="info-card">
          <h3>Fraud Protection Services</h3>
          <p>
            Protect your accounts with Positive Pay, account alerts, and daily monitoring tools.
          </p>
        </div>

        <div className="info-card">
          <h3>Merchant Services</h3>
          <p>
            Accept debit and credit card payments with modern POS and online processing solutions.
          </p>
        </div>

        <div className="info-card">
          <h3>Online Business Banking</h3>
          <p>
            Manage balances, transfers, payroll, and approvals from one secure dashboard.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <h2>Benefits of Cash Management</h2>

        <ul className="feature-list">
          <li>✔ Automate daily business tasks</li>
          <li>✔ Reduce trips to the branch</li>
          <li>✔ Improve payment accuracy and speed</li>
          <li>✔ Increase financial security</li>
          <li>✔ Gain full visibility into business cash flow</li>
        </ul>
      </section>

      {/* Pricing */}
      <section className="section">
        <h2>Service Pricing</h2>

        <table className="rates-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Monthly Fee</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Remote Deposit Capture</td>
              <td>$25 / month</td>
            </tr>
            <tr>
              <td>ACH Origination</td>
              <td>$15 / month</td>
            </tr>
            <tr>
              <td>Positive Pay</td>
              <td>$10 / month</td>
            </tr>
            <tr>
              <td>Merchant Services</td>
              <td>Varies by volume</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* CTA */}
      <section className="section">
        <h2>Optimize Your Business Operations</h2>
        <p>
          Let us help you take control of your day-to-day finances with the right cash management tools.
        </p>
        <button className="primary-btn">Talk to a Specialist</button>
      </section>
    </div>
  );
}
