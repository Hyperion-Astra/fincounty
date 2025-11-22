/* OnlineBanking.jsx */
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./OnlineBanking.css";

export default function OnlineBanking() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const features = [
    {
      title: "Mobile Deposits",
      desc: "Deposit checks instantly using your phone camera without visiting a branch.",
    },
    {
      title: "Bill Pay",
      desc: "Schedule one-time or recurring payments securely and easily manage bills.",
    },
    {
      title: "Account Alerts",
      desc: "Get real-time notifications for deposits, withdrawals, and balance updates.",
    },
    {
      title: "Funds Transfer",
      desc: "Transfer money between your accounts anytime, anywhere.",
    },
    {
      title: "View Statements",
      desc: "Access and download your monthly statements and transaction history.",
    },
    {
      title: "Card Management",
      desc: "Manage debit/credit card settings, set spending limits, or freeze your card.",
    },
  ];

  return (
    <div className="pc-online">
      {/* HERO */}
      <header className="pc-hero" data-aos="fade-down">
        <div className="pc-hero-inner">
          <h1>Online & Mobile Banking</h1>
          <p className="pc-lead">
            Manage your money wherever you are — secure, fast, and simple.
          </p>
        </div>
      </header>

      {/* FEATURES */}
      <section className="pc-section pc-online-features" data-aos="fade-up">
        <div className="pc-container">
          <h2>All the tools you need</h2>
          <div className="pc-online-grid">
            {features.map((f, i) => (
              <div className="online-card" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="pc-online-cta">
            <a className="pc-btn pc-btn-primary" href="/login">
              Sign in to Online Banking
            </a>
            <a className="pc-btn pc-btn-ghost" href="/contact">
              Need Help?
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
