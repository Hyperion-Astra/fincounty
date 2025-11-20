/* SwitchKit.jsx */
import React from "react";
import "./SwitchKit.css";

export default function SwitchKit() {
  return (
    <div className="pc-switch">
      <header className="pc-switch-hero">
        <div className="pc-container">
          <h1>Switch Kit</h1>
          <p>Move your accounts to us easily — we’ll help you every step of the way.</p>
        </div>
      </header>

      <section className="pc-section pc-switch-steps">
        <div className="pc-container">
          <h2>Simple steps to switch</h2>
          <ol className="pc-steps">
            <li><strong>Open a new account</strong> — a quick online application.</li>
            <li><strong>Complete switch form</strong> — tell us which payments to move.</li>
            <li><strong>We handle the rest</strong> — notifications, transfers, and closures.</li>
          </ol>

          <div className="pc-switch-help">
            <p>If you’d like assistance, contact our support team — we’ll walk you through it.</p>
            <a className="pc-btn pc-btn-primary" href="/contact">Get Help</a>
          </div>
        </div>
      </section>
    </div>
  );
}
