import React from "react";
import "./BankingTools.css";
import { Link } from "react-router-dom";

export default function BankingTools() {
  const tools = [
    {
      title: "Checking Accounts",
      text: "Everyday banking made simple.",
      link: "/personal/checking-accounts",
    },
    {
      title: "Savings Accounts",
      text: "Grow your money with flexible options.",
      link: "/personal/savings",
    },
    {
      title: "Business Loans",
      text: "Fuel your business with the right financing.",
      link: "/business/business-lending",
    },
    {
      title: "Mortgage Options",
      text: "From pre-approval to closing.",
      link: "/mortgage/mortgage-options",
    },
    {
      title: "Online Banking",
      text: "Safe, secure, and easy to use.",
      link: "/personal/online-banking",
    },
    {
      title: "Credit Cards",
      text: "Flexible cards built for your lifestyle.",
      link: "/personal/credit-cards",
    },
  ];

  return (
    <section className="bt-section">
      <div className="bt-container">
        <h2 className="bt-heading">Banking Tools & Resources</h2>
        <p className="bt-subtitle">
          Everything you need to manage your finances — anytime, anywhere.
        </p>

        <div className="bt-grid">
          {tools.map((t, i) => (
            <div className="bt-card" key={i}>
              <h3 className="bt-title">{t.title}</h3>
              <p className="bt-text">{t.text}</p>
              <Link to={t.link} className="bt-link">
                Explore →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
