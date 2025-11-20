import React from "react";
import "./mortgage.css";

export default function MortgageGlossary() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1>Mortgage Glossary</h1>
        <p>Simple explanations of common mortgage and real estate terms.</p>
      </header>

      <section className="section">
        <h2>Common Terms</h2>

        <div className="info-card">
          <h3>APR</h3>
          <p>The total yearly cost of a mortgage, including interest and fees.</p>
        </div>

        <div className="info-card">
          <h3>Amortization</h3>
          <p>The schedule of loan payments over time.</p>
        </div>

        <div className="info-card">
          <h3>Escrow</h3>
          <p>A third-party account for taxes, homeowners insurance, and related fees.</p>
        </div>

        <div className="info-card">
          <h3>Principal</h3>
          <p>The portion of your payment that reduces the loan balance.</p>
        </div>

        <div className="info-card">
          <h3>Underwriting</h3>
          <p>The process lenders use to evaluate and approve mortgage applications.</p>
        </div>
      </section>
    </div>
  );
}
