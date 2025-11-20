import React from "react";
import "./MortgagePromo.css";
import promoImg from "../assets/mortage-1.jpg";

export default function MortgagePromo() {
  return (
    <section className="mp-section" aria-label="Mortgage Promo">
      <div className="mp-container">
        <div className="mp-left">
          <h2 className="mp-title">Home loans made simple</h2>
          <div className="mp-underline" aria-hidden />
          <p className="mp-text">
            Competitive mortgage rates, straightforward guidance, and local loan officers who walk you through every step of the process — from pre-approval to closing.
          </p>

          <div className="mp-cta-row">
            <a href="/mortgage/mortgage-rates" className="mp-btn-primary">View Mortgage Rates</a>
            <a href="/mortgage/calculators" className="mp-btn-ghost">Mortgage Calculator</a>
          </div>

          <ul className="mp-features">
            <li><strong>Fast pre-approval</strong> — Know your budget sooner</li>
            <li><strong>Local experts</strong> — Personal guidance & local closings</li>
            <li><strong>Flexible terms</strong> — Options to suit your needs</li>
          </ul>
        </div>

        <div className="mp-right" role="img" aria-label="Mortgage illustration">
          <img src={promoImg} alt="House keys and mortgage" />
        </div>
      </div>
    </section>
  );
}
