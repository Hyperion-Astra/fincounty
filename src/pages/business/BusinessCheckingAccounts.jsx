import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./business.css";

export default function BusinessCheckingAccounts() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const accounts = [
    {
      title: "Small Business Checking",
      desc: "Perfect for growing businesses with moderate transaction volume.",
      features: ["No minimum balance", "250 free transactions/month", "Easy integrations with accounting tools"],
      buttonText: "Open Account",
      buttonLink: "/business/apply",
    },
    {
      title: "Commercial Checking",
      desc: "Designed for high-transaction businesses that need more control and flexibility.",
      features: ["Unlimited transactions", "Cash management solutions", "Customizable access for team members"],
      buttonText: "Contact Business Team",
      buttonLink: "/business/contact",
    },
    {
      title: "Nonprofit Checking",
      desc: "Accounts designed for nonprofit organizations with low fees and flexible features.",
      features: ["No monthly maintenance fee", "Low transaction costs", "Online donation management integration"],
      buttonText: "Open Account",
      buttonLink: "/business/apply",
    },
    {
      title: "Enterprise Checking",
      desc: "Comprehensive solution for large businesses and corporations.",
      features: ["Custom cash management", "Dedicated account manager", "Advanced reporting"],
      buttonText: "Contact Business Team",
      buttonLink: "/business/contact",
    },
  ];

  const included = ["Mobile Check Deposit", "Online Bill Pay", "Account Alerts", "Fraud Monitoring", "Free Debit Cards", "Dedicated Support"];

  return (
    <div className="page-wrapper">
      <header className="page-header" data-aos="fade-down">
        <h1>Business Checking Accounts</h1>
        <p>Smart, flexible checking solutions built to support every stage of your business.</p>
      </header>

      <section className="section" data-aos="fade-up">
        <h2>Why Choose Our Business Checking?</h2>
        <ul className="feature-list">
          <li>No monthly maintenance fees on select accounts</li>
          <li>Free online & mobile banking</li>
          <li>Instant alerts & spending insights</li>
          <li>Visa® Business Debit Card included</li>
        </ul>
      </section>

      <section className="card-grid" data-aos="fade-up">
        {accounts.map((acc, i) => (
          <div key={i} className="info-card" data-aos="fade-up" data-aos-delay={i * 100}>
            <h3>{acc.title}</h3>
            <p>{acc.desc}</p>
            <ul>
              {acc.features.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
            <a href={acc.buttonLink} className="primary-btn">{acc.buttonText}</a>
          </div>
        ))}
      </section>

      <section className="section" data-aos="fade-up">
        <h2>Included With Every Account</h2>
        <div className="included-grid">
          {included.map((item, i) => (
            <div key={i} className="included-item" data-aos="fade-up" data-aos-delay={i*50}>{item}</div>
          ))}
        </div>
      </section>
    </div>
  );
}
