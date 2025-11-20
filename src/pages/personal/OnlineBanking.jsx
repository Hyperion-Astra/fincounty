/* OnlineBanking.jsx */
import React from "react";
import "./OnlineBanking.css";

export default function OnlineBanking() {
  return (
    <div className="pc-online">
      <header className="pc-hero">
        <div className="pc-hero-inner">
          <h1>Online & Mobile Banking</h1>
          <p className="pc-lead">Manage your money wherever you are — secure, fast, and simple.</p>
        </div>
      </header>

      <section className="pc-section pc-online-features">
        <div className="pc-container">
          <h2>All the tools you need</h2>
          <div className="pc-online-grid">
            <div className="online-card">
              <h3>Mobile Deposits</h3>
              <p>Deposit checks using your phone camera in seconds.</p>
            </div>
            <div className="online-card">
              <h3>Bill Pay</h3>
              <p>Schedule one-time or recurring payments securely.</p>
            </div>
            <div className="online-card">
              <h3>Account Alerts</h3>
              <p>Real-time notifications for transactions and balances.</p>
            </div>
          </div>

          <div className="pc-online-cta">
            <a className="pc-btn pc-btn-primary" href="https://online-banking.example.com" target="_blank" rel="noreferrer">Sign in to Online Banking</a>
            <a className="pc-btn pc-btn-ghost" href="/contact">Need Help?</a>
          </div>
        </div>
      </section>
    </div>
  );
}
