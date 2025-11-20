/* CompareCheckingAccounts.jsx */
import React from "react";
import "./CompareCheckingAccounts.css";

export default function CompareCheckingAccounts() {
  return (
    <div className="pc-compare">
      <header className="pc-compare-hero">
        <div className="pc-container">
          <h1>Compare Checking Accounts</h1>
          <p>Find the account that matches your needs — side-by-side comparison.</p>
        </div>
      </header>

      <section className="pc-section pc-compare-table">
        <div className="pc-container">
          <table className="pc-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Everyday Checking</th>
                <th>Premier Checking</th>
                <th>Student Checking</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Monthly fee</td>
                <td>$0</td>
                <td>$10 (waived)</td>
                <td>$0</td>
              </tr>
              <tr>
                <td>Minimum balance</td>
                <td>None</td>
                <td>$1,000</td>
                <td>None</td>
              </tr>
              <tr>
                <td>ATM fee reimbursement</td>
                <td>No</td>
                <td>Yes</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Mobile deposit</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>

          <div className="pc-compare-cta">
            <a className="pc-btn pc-btn-primary" href="/apply">Open an Account</a>
            <a className="pc-btn pc-btn-ghost" href="/contact">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}
