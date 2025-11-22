import React, { useEffect } from "react";
import "./business.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

export default function BusinessCashManagement() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const services = [
    { title: "ACH Payments", desc: "Pay vendors, suppliers, and employees electronically with fast and secure ACH transfers." },
    { title: "Remote Deposit Capture", desc: "Deposit checks from your office using a dedicated scanner—no need to visit the branch." },
    { title: "Wire Transfers", desc: "Send domestic and international wires quickly and safely." },
    { title: "Fraud Protection Services", desc: "Protect your accounts with Positive Pay, account alerts, and daily monitoring tools." },
    { title: "Merchant Services", desc: "Accept debit and credit card payments with modern POS and online processing solutions." },
    { title: "Online Business Banking", desc: "Manage balances, transfers, payroll, and approvals from one secure dashboard." },
  ];

  return (
    <div className="page-wrapper">
      <header className="page-header" data-aos="fade-down">
        <h1>Business Cash Management</h1>
        <p>Streamline your company’s financial operations with secure, efficient, and easy-to-use cash management tools.</p>
      </header>

      {/* Services Overview */}
      <section className="section">
        <h2 data-aos="fade-up">What We Offer</h2>
        <div className="loan-grid">
          {services.map((s, i) => (
            <div className="info-card" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="section" data-aos="fade-up">
        <h2>Benefits of Cash Management</h2>
        <ul className="feature-list">
          <li>✔ Automate daily business tasks</li>
          <li>✔ Reduce trips to the branch</li>
          <li>✔ Improve payment accuracy and speed</li>
          <li>✔ Increase financial security</li>
          <li>✔ Gain full visibility into business cash flow</li>
        </ul>
      </section>

      {/* Pricing */}
      <section className="section" data-aos="fade-up">
        <h2>Service Pricing</h2>
        <div className="table-wrapper">
          <table className="rates-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Monthly Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Remote Deposit Capture</td>
                <td>$25 / month</td>
              </tr>
              <tr>
                <td>ACH Origination</td>
                <td>$15 / month</td>
              </tr>
              <tr>
                <td>Positive Pay</td>
                <td>$10 / month</td>
              </tr>
              <tr>
                <td>Merchant Services</td>
                <td>Varies by volume</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="section" data-aos="fade-up">
        <h2>Optimize Your Business Operations</h2>
        <p>Let us help you take control of your day-to-day finances with the right cash management tools.</p>
<Link to="/contact" className="primary-btn" data-aos="zoom-in" data-aos-delay="800">
          Talk to a specialist
        </Link>      
        </section>
    </div>
  );
}
