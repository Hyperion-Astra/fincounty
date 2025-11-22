/* CreditCards.jsx */
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./CreditCards.css";

export default function CreditCards() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const cards = [
    {
      title: "Rewards Card",
      desc: "Earn points on groceries, travel, and everyday purchases.",
      details: "Get 3x points on groceries, 2x on travel, 1x on all other purchases. No annual fee first year. Redeem points for cash back, travel, or gift cards.",
    },
    {
      title: "Low-Rate Card",
      desc: "Competitive APR for balance transfers and purchases.",
      details: "Intro APR of 0% for 12 months on purchases and balance transfers. After, standard APR applies based on creditworthiness.",
    },
    {
      title: "Secured Card",
      desc: "Build or rebuild credit with a secured card option.",
      details: "Requires security deposit starting at $200. Reports to major credit bureaus. Ideal for establishing credit history.",
    },
    {
      title: "Cash Back Card",
      desc: "Simple cash rewards on all purchases.",
      details: "Earn 1.5% cash back on every purchase. No category limits, no annual fee. Redeem cash monthly or annually.",
    },
    {
      title: "Travel Card",
      desc: "Rewards and perks for frequent travelers.",
      details: "Earn 2x points on travel and dining, 1x on other purchases. Includes travel insurance, airport lounge access, and no foreign transaction fees.",
    },
    {
      title: "Student Card",
      desc: "Designed for students to start building credit responsibly.",
      details: "No annual fee. Earn rewards for good grades and responsible usage. Reports to credit bureaus to build history.",
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="pc-cards">
      {/* HERO */}
      <header className="pc-hero" data-aos="fade-down">
        <div className="pc-hero-inner">
          <h1>Credit Cards</h1>
          <p className="pc-lead">
            A variety of cards for rewards, low rates, and building credit.
          </p>
        </div>
      </header>

      {/* CARD PRODUCTS */}
      <section className="pc-section pc-card-products">
        <div className="pc-container">
          <h2>Our Credit Card Options</h2>
          <div className="pc-cards-list">
            {cards.map((card, i) => (
              <div
                key={i}
                className={`card-item ${i % 2 === 0 ? "card-left" : "card-right"}`}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="card-content">
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <button className="pc-link" onClick={() => toggleExpand(i)}>
                    {expandedIndex === i ? "Hide Details" : "Learn More"}
                  </button>
                  {expandedIndex === i && (
                    <div className="card-details">
                      <p>{card.details}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pc-card-cta">
            <a className="pc-btn pc-btn-primary" href="/apply">
              Apply Now
            </a>
            <a className="pc-btn pc-btn-ghost" href="/contact">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
