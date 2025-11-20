import "./Business.css";
import { Link } from "react-router-dom";

export default function Business() {
  return (
    <div className="business-page">

      {/* HERO */}
      <section className="business-hero">
        <div className="business-hero-overlay"></div>
        <h1>Business Banking</h1>
        <p>Smart, secure solutions to help your business grow and thrive.</p>
      </section>

      {/* INTRO */}
      <section className="business-intro container">
        <div className="intro-text">
          <h2>Banking Solutions Built for Your Business</h2>
          <p>
            Whether you're starting a business, expanding, or strengthening operations, we offer a
            full suite of financial tools designed to support your success. Enjoy personalized
            service, secure digital tools, and products tailored to your goals.
          </p>
        </div>

        <div className="intro-box">
          <h3>Why Choose Us?</h3>
          <ul>
            <li>Flexible financing and lending options</li>
            <li>Secure online and mobile banking tools</li>
            <li>Cash management services</li>
            <li>Experienced business banking specialists</li>
          </ul>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="business-products container">
        <h2>Our Business Banking Services</h2>

        <div className="product-grid">

          <div className="product-card">
            <h3>Business Checking</h3>
            <p>Flexible account options for businesses of all sizes.</p>
            <Link to="/business/business-checking" className="card-btn">
              Explore Checking →
            </Link>
          </div>

          <div className="product-card">
            <h3>Savings & Money Market</h3>
            <p>Grow your reserves with competitive rates and dependable access.</p>
            <Link to="/business/savings-money-market" className="card-btn">
              Learn More →
            </Link>
          </div>

          <div className="product-card">
            <h3>Business Lending</h3>
            <p>Financing options to support growth, expansion, and equipment needs.</p>
            <Link to="/business/business-lending" className="card-btn">
              Lending Options →
            </Link>
          </div>

          <div className="product-card">
            <h3>Cash Management</h3>
            <p>Optimize your business operations with powerful digital tools.</p>
            <Link to="/business/cash-management" className="card-btn">
              View Services →
            </Link>
          </div>

        </div>
      </section>

      {/* CTA STRIP */}
      <section className="business-cta">
        <div className="cta-content container">
          <h2>Ready to Strengthen Your Business?</h2>
          <p>Our team is here to help you choose the right tools for growth and efficiency.</p>
          <button>Contact a Business Specialist</button>
        </div>
      </section>

    </div>
  );
}
