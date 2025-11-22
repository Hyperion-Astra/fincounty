/* Loans.jsx */
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Loans.css";

export default function Loans() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const loanTypes = [
    {
      title: "Personal Loan",
      desc: "Flexible funds for personal needs, debt consolidation, or emergencies.",
      details: "Term: 12-60 months. Rates starting at 7.5% APR. No collateral required for qualifying borrowers.",
    },
    {
      title: "Auto Loan",
      desc: "Finance your new or used vehicle with competitive rates.",
      details: "Terms: 24-72 months. Rates starting at 5.0% APR. Pre-approval available online.",
    },
    {
      title: "Home Equity Loan",
      desc: "Borrow against the equity in your home for home improvements or major expenses.",
      details: "Fixed-rate loans with terms up to 15 years. Minimum credit score: 650.",
    },
    {
      title: "Mortgage Loan",
      desc: "Purchase your dream home with competitive mortgage options.",
      details: "Options: 15-year, 30-year fixed, or adjustable-rate mortgages. Pre-approval recommended.",
    },
    {
      title: "Business Loan",
      desc: "Finance your business expansion, equipment, or working capital needs.",
      details: "Term: 12-84 months. Rates starting at 6.5% APR. Requires business plan and financials.",
    },
    {
      title: "Student Loan",
      desc: "Flexible options for tuition, books, and education expenses.",
      details: "Repayment options include deferment and income-based plans. Interest rates vary by program.",
    },
    {
      title: "Credit Builder Loan",
      desc: "Establish or rebuild your credit while saving.",
      details: "Loan funds are held in a secured account while payments are reported to credit bureaus.",
    },
    {
      title: "Vacation / Personal Project Loan",
      desc: "Finance your dream vacation or personal project with low monthly payments.",
      details: "Term: 6-36 months. Rates starting at 8.0% APR. Quick online application.",
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="pc-loans">
      {/* HERO */}
      <header className="pc-hero" data-aos="fade-down">
        <div className="pc-hero-inner">
          <h1>Loan Options</h1>
          <p className="pc-lead">
            Explore our loan products — flexible terms, competitive rates, and expert guidance.
          </p>
        </div>
      </header>

      {/* LOAN TYPES */}
      <section className="pc-section pc-loan-types" data-aos="fade-up">
        <div className="pc-container">
          <h2>Our Loan Products</h2>
          <div className="pc-loan-grid">
            {loanTypes.map((loan, i) => (
              <div key={i} className="loan-card" data-aos="fade-up" data-aos-delay={i * 100}>
                <h3>{loan.title}</h3>
                <p>{loan.desc}</p>
                <button className="pc-link" onClick={() => toggleExpand(i)}>
                  {expandedIndex === i ? "Hide Details" : "Learn More"}
                </button>
                {expandedIndex === i && (
                  <div className="loan-details">
                    <p>{loan.details}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pc-loan-cta">
            <a className="pc-btn pc-btn-primary" href="/apploan">
              Apply for a Loan
            </a>
            <a className="pc-btn pc-btn-ghost" href="/contact">
              Talk to a Loan Officer
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
