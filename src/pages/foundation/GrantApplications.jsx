import React from "react";
import { Link } from "react-router-dom";
import "./GrantApplications.css";

export default function GrantApplications() {
  return (
    <div className="pc-page">
      {/* Hero Section */}
      <header className="pc-hero" data-aos="fade-up">
        <div className="pc-hero-inner">
          <h1>Grant Applications</h1>
          <p className="pc-lead">
            Empowering nonprofit organizations to make a meaningful impact in their communities.
          </p>
        </div>
      </header>

      {/* Supporting Community */}
      <section className="pc-section" data-aos="fade-up">
        <div className="pc-container">
          <h2>Supporting Our Community</h2>
          <p>
           Our foundation awards grants to a wide range of applicants—including nonprofit organizations, private businesses, community groups, and individuals—whose work positively influences education, health services, economic development, and community well-being.
          </p>
        </div>
      </section>

      {/* Eligibility */}
      <section className="pc-section" data-aos="fade-up">
        <div className="pc-container">
          <h2>Eligibility Requirements</h2>
          <ul className="pc-list">
           <li>Applicants must provide valid identification (National ID, Driver’s License, or International Passport).</li>
            <li>Nonprofits must provide official documentation confirming their organizational status.</li>
            <li>Individuals must clearly describe their project, purpose, or financial need.</li>
            <li>All applicants must submit a brief proposal outlining how the grant will be utilized.</li>
            <li>Applicants must provide a valid phone number and email address for communication.</li>
            <li>A simple budget estimate or cost breakdown must be included for review.</li>
            <li>Healthcare professionals must present proof of practice or certification.</li>
            <li>Farmers must show evidence of land ownership, lease, or active farming activity.</li>
            <li>Entrepreneurs must outline their business idea, plan, or growth strategy.</li>
            <li>Retirees applying for personal or community projects must describe intended community impact.</li>
            <li>Engineering or technical applicants must briefly outline their project feasibility.</li>
            <li>All applicants must agree to periodic follow-ups or updates after receiving the grant.</li>
            <li>Only one active application is allowed per applicant at a time.</li>
            <li>Grant funds must not be used for illegal or unethical activities.</li>
            <li>Incomplete applications may be delayed or rejected.</li>
            <li>Retirees applying for personal grants must clearly state the purpose, such as personal development, lifelong learning, health support, or pursuing a personal project.</li>

            
          </ul>
        </div>
      </section>

      {/* Application Process */}
      <section className="pc-section" data-aos="fade-up">
        <div className="pc-container">
          <h2>Application Process</h2>
          <p>Follow these steps to apply for a grant:</p>

          <div className="grant-steps">
            <div className="info-card">
              <h3>Step 1: Prepare Documents</h3>
              <p>Collect mission statement, project proposal, impact summary, and financial statements.</p>
            </div>
            <div className="info-card">
              <h3>Step 2: Complete Online Form</h3>
              <p>Fill out the grant application form with detailed project goals and timelines.</p>
            </div>
            <div className="info-card">
              <h3>Step 3: Submit & Review</h3>
              <p>Submit your application for review. Our team evaluates eligibility, impact, and feasibility.</p>
            </div>
            <div className="info-card">
              <h3>Step 4: Notification</h3>
              <p>Receive a decision via email. Approved grants will be funded according to project milestones.</p>
            </div>
          </div>

          <Link className="pc-btn pc-btn-primary" to="/apply">
            Start Your Application
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section className="pc-section" data-aos="fade-up">
        <div className="pc-container">
          <h2>FAQs</h2>
          <ul className="pc-list">
            <li><strong>Q:</strong> Can organizations apply multiple times per year? <br /><strong>A:</strong> No, only one application per calendar year.</li>
            <li><strong>Q:</strong> Are all grant amounts the same? <br /><strong>A:</strong> No, amounts vary depending on project scope and budget.</li>
            <li><strong>Q:</strong> How long does the review process take? <br /><strong>A:</strong> Typically 4–6 weeks after submission.</li>
            <li><strong>Q:</strong> Can funds be used for operating expenses? <br /><strong>A:</strong> Grants are generally restricted to specific program/project costs.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
