/* SwitchKit.jsx */
import React from "react";
import "./SwitchKit.css";

export default function SwitchKit() {
  return (
    <div className="pc-switch">
      {/* HERO */}
      <header className="pc-switch-hero">
        <div className="pc-container">
          <h1>Switch Kit</h1>
          <p>Move your accounts to us easily — we’ll help you every step of the way.</p>
        </div>
      </header>

      {/* INTRO WRITE-UP */}
      <section className="pc-switch-intro">
        <div className="pc-container">
          <p>
            Switching to FinCounty Bank is simple, fast, and hassle-free. Our Switch Kit guides you through moving your deposits, payments, and accounts safely, so you can start enjoying the benefits of your new account without interruption.
          </p>
        </div>
      </section>

      {/* STEPS */}
      <section className="pc-section pc-switch-steps">
        <div className="pc-container">
          <h2>Simple Steps to Switch</h2>
          <div className="pc-steps-cards">
            <div className="pc-step-card">
              <div className="pc-step-number">1</div>
              <h3>Open a New Account</h3>
              <p>A quick online application to get started immediately.</p>
            </div>
            <div className="pc-step-card">
              <div className="pc-step-number">2</div>
              <h3>Complete Switch Form</h3>
              <p>Tell us which payments and deposits you want to move to your new account.</p>
            </div>
            <div className="pc-step-card">
              <div className="pc-step-number">3</div>
              <h3>We Handle the Rest</h3>
              <p>We notify relevant parties, transfer balances, and close old accounts as needed.</p>
            </div>
          </div>

          <div className="pc-switch-help">
            <p>If you’d like assistance, contact our support team — we’ll walk you through it.</p>
            <a className="pc-btn pc-btn-primary" href="/contact">Get Help</a>
          </div>
        </div>
      </section>
    </div>
  );
}
