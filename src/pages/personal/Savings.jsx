/* Savings.jsx */
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Savings.css";

export default function Savings() {
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const toggleCard = (id) => setExpandedCard(expandedCard === id ? null : id);

  const savingsPlans = [
    {
      id: 1,
      title: "Standard Savings",
      description: "High-yield savings for everyday savers.",
      details: "Earn competitive interest with no monthly maintenance fees. Perfect for building your emergency fund or short-term savings goals."
    },
    {
      id: 2,
      title: "Money Market",
      description: "Higher returns with limited check access.",
      details: "Enjoy higher interest rates with the flexibility of limited check writing. Ideal for larger balances seeking liquidity and growth."
    },
    {
      id: 3,
      title: "Health Savings (HSA)",
      description: "Tax-advantaged savings for medical expenses.",
      details: "Use pre-tax dollars for qualified medical expenses. Contributions, growth, and withdrawals for medical costs are all tax-free."
    },
    {
      id: 4,
      title: "Youth Savings",
      description: "Start saving early and build good habits.",
      details: "Designed for children and teens. Earn interest while learning the importance of saving. Parents/guardians can manage account oversight."
    },
    {
      id: 5,
      title: "High Yield Savings",
      description: "Maximize returns with higher interest rates.",
      details: "Best for long-term goals. Requires minimum balance to earn higher APY but offers superior returns compared to standard savings."
    },
    {
      id: 6,
      title: "Premier Savings",
      description: "Exclusive perks for high balances.",
      details: "Access premium benefits including higher interest tiers, priority support, and exclusive financial tools. Ideal for advanced savers."
    }
  ];

  return (
    <div className="pc-savings">
      {/* HERO */}
      <header className="pc-hero" data-aos="fade-down">
        <div className="pc-hero-inner">
          <h1>Savings Accounts</h1>
          <p className="pc-lead">
            Secure ways to save — competitive interest rates and flexible options tailored to your needs.
          </p>
        </div>
      </header>

      {/* INTRO */}
      <section className="pc-intro" data-aos="fade-up">
        <div className="pc-container">
          <p>
            Whether you're starting your savings journey or looking to grow your wealth, FinCounty Bank offers a variety of accounts to suit every goal. Compare our plans below and find the one that fits you best.
          </p>
        </div>
      </section>

      {/* SAVINGS PLANS */}
      <section className="pc-section pc-savings-products">
        <div className="pc-container">
          <h2 data-aos="fade-up">Find the right savings for you</h2>

          <div className="pc-savings-grid">
            {savingsPlans.map((plan) => (
              <div
                key={plan.id}
                className="s-card"
                data-aos="fade-up"
              >
                <h3>{plan.title}</h3>
                <p>{plan.description}</p>
                <button
                  className="pc-btn pc-btn-ghost"
                  onClick={() => toggleCard(plan.id)}
                >
                  {expandedCard === plan.id ? "Show Less" : "Learn More"}
                </button>
                {expandedCard === plan.id && (
                  <div className="s-card-details" data-aos="fade-right">
                    <p>{plan.details}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
