/* MortgageOptions.jsx */
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./mortgage.css";

export default function MortgageOptions() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const loans = [
    {
      title: "Fixed-Rate Mortgage",
      summary: "Stable monthly payments throughout the life of the loan, ideal for long-term planning.",
      details: "Your interest rate is locked in for the entire term, protecting you from market fluctuations."
    },
    {
      title: "Adjustable-Rate Mortgage (ARM)",
      summary: "Lower starting rates that adjust at scheduled intervals, potentially saving you money initially.",
      details: "Initial rate is fixed for a period (e.g., 5 years) then adjusts annually based on market index."
    },
    {
      title: "FHA Loans",
      summary: "Government-backed loans with lower down payment requirements and easier qualification for first-time buyers.",
      details: "Requires mortgage insurance premium (MIP) and has specific credit and income requirements."
    },
    {
      title: "VA Loans",
      summary: "No down payment for eligible military borrowers, with competitive interest rates and flexible terms.",
      details: "Available only to veterans, active-duty service members, and certain military families."
    },
    {
      title: "Jumbo Loans",
      summary: "Financing for high-value properties exceeding standard conforming loan limits, often with custom terms.",
      details: "Typically requires higher credit score, larger down payment, and specialized underwriting."
    },
    {
      title: "USDA Loans",
      summary: "Designed for rural and suburban properties, offering low interest rates and zero down payment.",
      details: "Must meet income eligibility and property location requirements as defined by USDA."
    },
    {
      title: "Interest-Only Mortgage",
      summary: "Pay only interest for a set period to reduce initial payments before switching to principal and interest.",
      details: "After the interest-only period, payments increase to include principal repayment."
    },
    {
      title: "Balloon Mortgage",
      summary: "Lower initial payments with a lump-sum payment due at the end of the term, suitable for short-term ownership plans.",
      details: "The balloon payment is usually due after 5–7 years, requiring refinancing or full repayment."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleDetails = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1>Mortgage Options</h1>
        <p>Explore lending programs designed for different financial needs and goals.</p>
      </header>

      <section className="section">
        <h2>Loan Programs</h2>

        <div className="guides-grid">
          {loans.map((loan, index) => (
            <div className="info-card" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <h3>{loan.title}</h3>
              <p>{loan.summary}</p>
              {openIndex === index && (
                <p className="loan-details">{loan.details}</p>
              )}
              <button 
                className="pc-btn pc-btn-link"
                onClick={() => toggleDetails(index)}
              >
                {openIndex === index ? "Show Less" : "Learn More"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
