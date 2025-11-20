import React from "react";
import "./mortgage.css";

export default function HomebuyerResources() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1>Homebuyer Resources</h1>
        <p>Tools, tips, and guidance designed for first-time and experienced homebuyers.</p>
      </header>

      <section className="section">
        <h2>Helpful Guides</h2>

        <div className="info-card">
          <h3>First-Time Homebuyer Guide</h3>
          <p>Understand mortgage basics, budgeting, and the buying process.</p>
        </div>

        <div className="info-card">
          <h3>Preparing Your Finances</h3>
          <p>Learn how to strengthen your financial profile before applying.</p>
        </div>

        <div className="info-card">
          <h3>Choosing the Right Property</h3>
          <p>Tips for evaluating neighborhoods, listings, and home features.</p>
        </div>
      </section>

      <section className="section">
        <h2>Tools</h2>
        <ul className="feature-list">
          <li>✔ Mortgage payment calculator</li>
          <li>✔ Affordability estimator</li>
          <li>✔ Credit checklist</li>
          <li>✔ Closing cost breakdown</li>
        </ul>
      </section>
    </div>
  );
}
