import React from "react";
import "./mortgage.css";

export default function MortgageRates() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1>Mortgage Rates</h1>
        <p>Compare today's mortgage rate options and find what works for you.</p>
      </header>

      <section className="section">
        <h2>Current Rates</h2>

        <table className="rates-table">
          <thead>
            <tr>
              <th>Loan Type</th>
              <th>Rate</th>
              <th>APR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>30-Year Fixed</td>
              <td>6.25%</td>
              <td>6.40%</td>
            </tr>
            <tr>
              <td>15-Year Fixed</td>
              <td>5.50%</td>
              <td>5.65%</td>
            </tr>
            <tr>
              <td>5/1 ARM</td>
              <td>5.10%</td>
              <td>5.78%</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="section">
        <h2>Get Personalized Rates</h2>
        <button className="primary-btn">Request a Quote</button>
      </section>
    </div>
  );
}
