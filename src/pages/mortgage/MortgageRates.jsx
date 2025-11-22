import React from "react";
import { Link } from "react-router-dom";
import "./mortgage.css";

export default function MortgageRates() {
  const rates = [
    { type: "30-Year Fixed", rate: "6.25%", apr: "6.40%" },
    { type: "15-Year Fixed", rate: "5.50%", apr: "5.65%" },
    { type: "5/1 ARM", rate: "5.10%", apr: "5.78%" },
    { type: "7/1 ARM", rate: "5.25%", apr: "5.90%" },
    { type: "10-Year Fixed", rate: "5.80%", apr: "5.95%" },
  ];

  return (
    <div className="page-wrapper">
      <header className="page-header" data-aos="fade-up">
        <h1>Mortgage Rates</h1>
        <p className="lead">
          Compare today's mortgage rate options and find the one that fits your financial goals.
        </p>
      </header>

      <section className="section" data-aos="fade-up">
        <h2>Current Rates</h2>
        <div className="table-responsive">
          <table className="rates-table">
            <thead>
              <tr>
                <th>Loan Type</th>
                <th>Rate</th>
                <th>APR</th>
              </tr>
            </thead>
            <tbody>
              {rates.map((r, i) => (
                <tr key={i} className="rates-row">
                  <td>{r.type}</td>
                  <td>{r.rate}</td>
                  <td>{r.apr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note">
          *Rates are as of {new Date().toLocaleDateString()} and are subject to change without notice.
          Your actual rate may vary based on creditworthiness and loan terms.
        </p>
      </section>

      <section className="section" data-aos="fade-up">
        <h2>Get Personalized Rates</h2>
        <p>
          Request a custom mortgage quote and see what rates you qualify for.
        </p>
        <Link className="primary-btn" to="/apply">Request a Quote</Link>
      </section>
    </div>
  );
}
