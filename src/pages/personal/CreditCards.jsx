/* CreditCards.jsx */
import React from "react";
import "./CreditCards.css";

export default function CreditCards() {
  return (
    <div className="pc-cards">
      <header className="pc-hero">
        <div className="pc-hero-inner">
          <h1>Credit Cards</h1>
          <p className="pc-lead">A range of cards with rewards, low rates, and fraud protection.</p>
        </div>
      </header>

      <section className="pc-section pc-card-products">
        <div className="pc-container">
          <h2>Our cards</h2>

          <div className="pc-cards-grid">
            <div className="card-item">
              <h3>Rewards Card</h3>
              <p>Earn points on groceries, travel, and everyday purchases.</p>
              <a className="pc-link" href="/personal/credit-cards">Learn More</a>
            </div>

            <div className="card-item">
              <h3>Low-Rate Card</h3>
              <p>Competitive APR for balance transfers and purchases.</p>
              <a className="pc-link" href="/personal/credit-cards">Learn More</a>
            </div>

            <div className="card-item">
              <h3>Secured Card</h3>
              <p>Build or rebuild credit with a secured card option.</p>
              <a className="pc-link" href="/personal/credit-cards">Apply</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
