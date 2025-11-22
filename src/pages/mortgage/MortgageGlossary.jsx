import React, { useState, useEffect } from "react";
import "./mortgage.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function MortgageGlossary() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const terms = [
    { term: "APR", desc: "The total yearly cost of a mortgage, including interest and fees." },
    { term: "Amortization", desc: "The schedule of loan payments over time." },
    { term: "Escrow", desc: "A third-party account for taxes, homeowners insurance, and related fees." },
    { term: "Principal", desc: "The portion of your payment that reduces the loan balance." },
    { term: "Underwriting", desc: "The process lenders use to evaluate and approve mortgage applications." },
    { term: "Fixed-Rate Mortgage", desc: "A mortgage with an interest rate that remains the same for the entire term." },
    { term: "Adjustable-Rate Mortgage (ARM)", desc: "A mortgage with an interest rate that can change periodically based on market conditions." },
  ];

  const [expanded, setExpanded] = useState(Array(terms.length).fill(false));

  const toggleTerm = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  return (
    <div className="page-wrapper">
      <header className="page-header" data-aos="fade-down">
        <h1>Mortgage Glossary</h1>
        <p>Simple explanations of common mortgage and real estate terms.</p>
      </header>

      <section className="section" data-aos="fade-up">
        <h2>Common Terms</h2>
        <div className="glossary-grid">
          {terms.map((item, i) => (
            <div className="info-card" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="glossary-header" onClick={() => toggleTerm(i)}>
                <h3>{item.term}</h3>
                {expanded[i] ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {expanded[i] && <p className="glossary-desc">{item.desc}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
