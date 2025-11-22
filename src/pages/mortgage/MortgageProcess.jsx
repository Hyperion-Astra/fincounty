import React, { useEffect } from "react";
import "./mortgage.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaFileInvoiceDollar, FaFileAlt, FaClipboardCheck, FaCheckCircle, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function MortgageProcess() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const steps = [
    { icon: <FaFileInvoiceDollar />, title: "Pre-Qualification", desc: "Get an estimate of your borrowing power and potential loan options." },
    { icon: <FaFileAlt />, title: "Loan Application", desc: "Submit your income, assets, credit history, and property details." },
    { icon: <FaClipboardCheck />, title: "Processing", desc: "A loan processor verifies documents, employment, and required records." },
    { icon: <FaCheckCircle />, title: "Underwriting", desc: "Underwriters evaluate your finances and determine loan approval eligibility." },
    { icon: <FaHome />, title: "Closing", desc: "Sign final documents and receive the keys to your new home." },
  ];

  const requirements = [
    "Recent pay stubs & tax returns",
    "Bank statements",
    "Employment verification",
    "Credit report",
    "Property information"
  ];

  return (
    <div className="page-wrapper">
      <header className="page-header" data-aos="fade-down">
        <h1>The Mortgage Process</h1>
        <p>Understand each stage of securing a home loan with clarity and confidence.</p>
      </header>

      {/* Steps */}
      <section className="section" data-aos="fade-up">
        <h2>Step-by-Step Guide</h2>
        <div className="process-grid">
          {steps.map((s, i) => (
            <div className="info-card" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="step-icon">{s.icon}</div>
              <h3>{`${i + 1}. ${s.title}`}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Requirements */}
      <section className="section" data-aos="fade-up">
        <h2>What You’ll Need</h2>
        <ul className="feature-list">
          {requirements.map((req, i) => (
            <li key={i}>✔ {req}</li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="section" data-aos="fade-up">
        <h2>Get Started Today</h2>
        <p>Take the first step towards your new home — our team will guide you through every stage.</p>
<Link to="/apply" className="primary-btn" data-aos="zoom-in" data-aos-delay="800">
          Get Started
        </Link>      
        </section>
    </div>
  );
}
