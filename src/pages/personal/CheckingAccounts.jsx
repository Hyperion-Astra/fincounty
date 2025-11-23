import React from "react";
import "./CheckingAccounts.css";

export default function CheckingAccounts() {
  return (
    <div className="pc-checking">
      <header className="pc-hero">
        <div className="pc-hero-inner">
          <h1>Checking Accounts</h1>
          <p className="pc-lead">
            Everyday banking made simple — accounts built for convenience and value.
          </p>
        </div>
      </header>

      <section className="pc-section pc-benefits">
        <div className="pc-container">
          <h2>Why choose our checking?</h2>
          <div className="pc-grid">
            <article className="pc-card">
              <h3>No monthly fees</h3>
              <p>Simple, transparent accounts with no surprise charges.</p>
            </article>
            <article className="pc-card">
              <h3>Mobile-first banking</h3>
              <p>Deposit checks, transfer funds and pay bills from your phone.</p>
            </article>
            <article className="pc-card">
              <h3>Fast transfers</h3>
              <p>Instant transfers between accounts and external banks.</p>
            </article>
            <article className="pc-card">
              <h3>Worldwide ATM access</h3>
              <p>Use your debit card around the world with low fees.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="pc-section pc-types">
        <div className="pc-container">
          <h2>Account options</h2>

          <div className="pc-types-grid">
            <div className="pc-type">
              <h3>Everyday Checking</h3>
              <p>Perfect for day-to-day spending — no minimums and simple features.</p>
              <ul>
                <li>No monthly maintenance fee</li>
                <li>Free mobile deposits</li>
                <li>Debit card and online bill pay</li>
              </ul>
            </div>

            <div className="pc-type">
              <h3>Premier Checking</h3>
              <p>Added perks for customers who maintain a higher balance.</p>
              <ul>
                <li>ATM fee reimbursement</li>
                <li>Priority support</li>
                <li>Higher transfer limits</li>
              </ul>
            </div>

            <div className="pc-type">
              <h3>Student Checking</h3>
              <p>Low-cost banking for students and young adults.</p>
              <ul>
                <li>No fees for account holders under 24</li>
                <li>Financial education resources</li>
                <li>Mobile budgeting tools</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="pc-section pc-cta">
        <div className="pc-container">
          <div className="pc-cta-card">
            <h2>Ready to open an account?</h2>
            <p>Start your application online — it only takes a few minutes.</p>
            <div className="pc-cta-actions">
              <a className="pc-btn pc-btn-primary" href="/register">Open an Account</a>
              <a className="pc-btn pc-btn-ghost" href="/personal/checking-accounts/switch-kit">Switch Kit</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
