import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="ft-section">
      <div className="ft-container">

        <div className="ft-grid">
          <div className="ft-col">
            <h4>Banking</h4>
            <Link to="/personal/checking-accounts">Checking</Link>
            <Link to="/personal/savings">Savings</Link>
            <Link to="/personal/loans">Loans</Link>
            <Link to="/mortgage/mortgage-options">Mortgages</Link>
          </div>

          <div className="ft-col">
            <h4>Business</h4>
            <Link to="/business/business-checking">Business Checking</Link>
            <Link to="/business/business-lending">Business Loans</Link>
            <Link to="/business/cash-management">Cash Management</Link>
          </div>

          <div className="ft-col">
            <h4>Resources</h4>
            <Link to="/mortgage/calculators">Calculators</Link>
            <Link to="/foundation/news">News & Updates</Link>
            <Link to="/personal/online-banking">Online Banking</Link>
          </div>

          <div className="ft-col">
            <h4>Company</h4>
            <Link to="/foundation/grant-applications">Community</Link>
            <Link to="/wealth">Wealth Management</Link>
            <Link to="/foundation/grant-recipients">Foundation</Link>
          </div>
        </div>
      </div>

      <div className="ft-bottom">
        <p>© {new Date().getFullYear()} FirstCounty Bank — All Rights Reserved.</p>
      </div>
    </footer>
  );
}
