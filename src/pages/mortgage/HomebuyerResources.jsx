/* HomebuyerResources.jsx */
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./mortgage.css";

export default function HomebuyerResources() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1>Homebuyer Resources</h1>
        <p>Tools, tips, and guidance designed for first-time and experienced homebuyers.</p>
      </header>

      {/* Guides Section */}
      <section className="section">
        <h2>Helpful Guides</h2>
        <div className="guides-grid">
          <div className="info-card" data-aos="fade-up">
            <h3>First-Time Homebuyer Guide</h3>
            <p>Understand mortgage basics, budgeting, and the home-buying process step by step. Learn how to qualify and what to expect at each stage.</p>
          </div>

          <div className="info-card" data-aos="fade-up" data-aos-delay="100">
            <h3>Preparing Your Finances</h3>
            <p>Get tips on improving your credit score, managing debts, and saving for a down payment to increase your loan approval chances.</p>
          </div>

          <div className="info-card" data-aos="fade-up" data-aos-delay="200">
            <h3>Choosing the Right Property</h3>
            <p>Learn how to evaluate neighborhoods, assess property conditions, and prioritize features that fit your lifestyle and budget.</p>
          </div>

          <div className="info-card" data-aos="fade-up" data-aos-delay="300">
            <h3>Mortgage Options Explained</h3>
            <p>Compare fixed-rate, adjustable-rate, FHA, VA, and other mortgage types to choose the best fit for your financial situation.</p>
          </div>

          <div className="info-card" data-aos="fade-up" data-aos-delay="400">
            <h3>Closing Process</h3>
            <p>Understand the final steps, including closing costs, inspections, and signing documents to make the process seamless.</p>
          </div>

          <div className="info-card" data-aos="fade-up" data-aos-delay="500">
            <h3>Home Maintenance & Ownership Tips</h3>
            <p>Advice on keeping your home in great shape, budgeting for repairs, and maximizing the value of your property over time.</p>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="section">
        <h2>Tools & Calculators</h2>
        <ul className="feature-list">
          <li>✔ Mortgage Payment Calculator – Estimate monthly payments and interest.</li>
          <li>✔ Home Affordability Estimator – See what you can comfortably afford.</li>
          <li>✔ Credit Score Checklist – Ensure your finances are in top shape for loan approval.</li>
          <li>✔ Closing Cost Breakdown – Know upfront what fees to expect at closing.</li>
          <li>✔ Down Payment Savings Planner – Create a roadmap to reach your down payment goal.</li>
          <li>✔ Amortization Schedule Generator – Visualize your loan payoff over time.</li>
        </ul>
      </section>
    </div>
  );
}
