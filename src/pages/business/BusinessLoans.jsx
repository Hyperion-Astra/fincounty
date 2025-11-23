import React, { useEffect } from "react";
import "./business.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

export default function BusinessLoans() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const loans = [
    {
      title: "Small Business Term Loan",
      desc: "Borrow a fixed amount with predictable monthly payments. Ideal for expansions, equipment, and upgrades."
    },
    {
      title: "Business Line of Credit",
      desc: "Access funds as needed to manage cash flow, payroll, or business emergencies."
    },
    {
      title: "Commercial Real Estate Loan",
      desc: "Finance the purchase or renovation of office space, rental property, or commercial facilities."
    },
    {
      title: "Equipment Financing",
      desc: "Purchase new equipment or upgrade existing assets with flexible repayment terms."
    },
    {
      title: "SBA-Backed Loans",
      desc: "Government-supported loans offering lower rates and longer repayment terms for qualifying small businesses."
    },
    {
      title: "Merchant Cash Advance",
      desc: "Get fast access to capital based on your business’s daily credit card sales."
    },
    {
      title: "Invoice Financing",
      desc: "Turn outstanding invoices into working capital without waiting for clients to pay."
    },
    {
      title: "Business Expansion Loan",
      desc: "Funds for scaling operations, new locations, or launching new products."
    }
  ];

  return (
    <div className="page-wrapper">
      <header className="page-header" data-aos="fade-down">
        <h1>Business Loans & Financing</h1>
        <p>Flexible lending options designed to help businesses grow, expand, and stay financially strong.</p>
      </header>

      {/* Loan Types */}
      <section className="section">
        <h2 data-aos="fade-up">Types of Business Loans</h2>
        <div className="loan-grid">
          {loans.map((loan, idx) => (
            <div className="info-card" key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
              <h3>{loan.title}</h3>
              <p>{loan.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="section" data-aos="fade-up">
        <h2>Why Choose Our Business Loans?</h2>
        <ul className="feature-list">
          <li>✔ Competitive interest rates</li>
          <li>✔ Fast approval process</li>
          <li>✔ Local decision-making</li>
          <li>✔ Flexible repayment structures</li>
          <li>✔ Personalized financial guidance</li>
        </ul>
      </section>

      {/* Requirements */}
      <section className="section" data-aos="fade-up">
        <h2>Loan Requirements</h2>
        <div className="table-wrapper">
          <table className="rates-table">
            <thead>
              <tr>
                <th>Requirement</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Business Age</td>
                <td>Minimum 12 months in operation</td>
              </tr>
              <tr>
                <td>Financial Records</td>
                <td>Tax returns, profit/loss statements</td>
              </tr>
              <tr>
                <td>Credit Score</td>
                <td>Recommended</td>
              </tr>
              <tr>
                <td>Collateral</td>
                <td>May be required depending on loan type</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="section" data-aos="fade-up">
        <h2>Let’s Build Your Business Together</h2>
        <p>
          Whether you’re expanding, upgrading, or starting fresh, our team is here to help you find the right loan.
        </p>
<Link to="/apploan" className="primary-btn" data-aos="zoom-in" data-aos-delay="800">
          Apply Now
        </Link>      
        </section>
    </div>
  );
}
