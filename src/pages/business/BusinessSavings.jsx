import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./business.css";
import { Link } from "react-router-dom";

export default function BusinessSavings() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const accountFeatures = [
    { title: "Minimum Opening Deposit", value: "$100" },
    { title: "Monthly Fee", value: "$0 (with minimum balance)" },
    { title: "Withdrawal Limits", value: "Up to 6 free withdrawals per month" },
    { title: "Business Support", value: "Our team helps you manage liquidity and long-term savings strategies." },
  ];

  const rates = [
    { tier: "$0 – $10,000", apy: "0.15%" },
    { tier: "$10,001 – $50,000", apy: "0.25%" },
    { tier: "$50,001+", apy: "0.35%" },
  ];

  return (
    <div className="page-wrapper">
      <header className="page-header" data-aos="fade-down">
        <h1>Business Savings Account</h1>
        <p>Grow your company’s reserves with flexible, interest-earning solutions.</p>
      </header>

      <section className="section" data-aos="fade-up">
        <h2>Why Choose Our Business Savings?</h2>
        <ul className="feature-list">
          <li>✔ Competitive interest rates</li>
          <li>✔ No monthly maintenance fee with minimum balance</li>
          <li>✔ Easy transfers between business checking</li>
          <li>✔ Online & mobile banking access</li>
          <li>✔ FDIC insured</li>
        </ul>
      </section>

      <section className="section" data-aos="fade-up">
        <h2>Account Features</h2>
        <div className="card-grid">
          {accountFeatures.map((f, i) => (
            <div key={i} className="info-card" data-aos="fade-up" data-aos-delay={i*100}>
              <h3>{f.title}</h3>
              <p>{f.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" data-aos="fade-up">
        <h2>Interest Rates</h2>
        <div className="table-wrapper">
          <table className="rates-table">
            <thead>
              <tr>
                <th>Balance Tier</th>
                <th>APY</th>
              </tr>
            </thead>
            <tbody>
              {rates.map((r, i) => (
                <tr key={i}>
                  <td>{r.tier}</td>
                  <td>{r.apy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" data-aos="fade-up">
        <h2>Ready to Open an Account?</h2>
        <p>Strengthen your business’s financial foundation with a secure, interest-earning savings account.</p>
<Link to="/register" className="primary-btn" data-aos="zoom-in" data-aos-delay="800">
          Open an Account
        </Link>      
        </section>
    </div>
  );
}
