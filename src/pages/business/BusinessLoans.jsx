import React from "react";
import "./business.css";

export default function BusinessLoans() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1>Business Loans & Financing</h1>
        <p>
          Flexible lending options designed to help businesses grow, expand, and stay financially strong.
        </p>
      </header>

      {/* Loan Types */}
      <section className="section">
        <h2>Types of Business Loans</h2>

        <div className="info-card">
          <h3>Small Business Term Loan</h3>
          <p>
            Borrow a fixed amount with predictable monthly payments. Ideal for expansions, equipment, and upgrades.
          </p>
        </div>

        <div className="info-card">
          <h3>Business Line of Credit</h3>
          <p>
            Access funds as needed to manage cash flow, payroll, or business emergencies.
          </p>
        </div>

        <div className="info-card">
          <h3>Commercial Real Estate Loan</h3>
          <p>
            Finance the purchase or renovation of office space, rental property, or commercial facilities.
          </p>
        </div>

        <div className="info-card">
          <h3>Equipment Financing</h3>
          <p>
            Purchase new equipment or upgrade existing assets with flexible repayment terms.
          </p>
        </div>

        <div className="info-card">
          <h3>SBA-Backed Loans</h3>
          <p>
            Government-supported loans offering lower rates and longer repayment terms for qualifying small businesses.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <h2>Why Choose Our Business Loans?</h2>

        <ul className="feature-list">
          <li>✔ Competitive interest rates</li>
          <li>✔ Fast approval process</li>
          <li>✔ Local decision-making</li>
          <li>✔ Flexible repayment structures</li>
          <li>✔ Personalized financial guidance</li>
        </ul>
      </section>

      {/* Requirements */}
      <section className="section">
        <h2>Loan Requirements</h2>

        <table className="rates-table">
          <thead>
            <tr>
              <th>Requirement</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Business Age</td>
              <td>Minimum 12 months in operation</td>
            </tr>
            <tr>
              <td>Financial Records</td>
              <td>Tax returns, profit/loss statements</td>
            </tr>
            <tr>
              <td>Credit Score</td>
              <td>600+ recommended</td>
            </tr>
            <tr>
              <td>Collateral</td>
              <td>May be required depending on loan type</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* CTA */}
      <section className="section">
        <h2>Let’s Build Your Business Together</h2>
        <p>
          Whether you’re expanding, upgrading, or starting fresh, our team is here to help you find the right loan.
        </p>
        <button className="primary-btn">Apply Now</button>
      </section>
    </div>
  );
}
