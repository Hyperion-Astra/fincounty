import React from "react";
import "./Wealth.css"; // create a separate CSS file for styling if needed

export default function Wealth() {
  return (
    <main className="wealth-page" style={{ padding: "40px 5%" }}>
      <header data-aos="fade-up">
        <h1>Wealth Management</h1>
        <p className="lead" style={{ maxWidth: 700, color: "#64748b" }}>
          Personalized investment strategies, retirement planning, and portfolio management
          designed to secure your financial future.
        </p>
      </header>

      <section className="wealth-grid" data-aos="fade-up">
        <div className="wealth-card">
          <h3>Financial Planning</h3>
          <p>
            Build long-term plans tailored to your goals. Get guidance on budgeting, tax strategies,
            and retirement planning.
          </p>
        </div>

        <div className="wealth-card">
          <h3>Investment Portfolios</h3>
          <p>
            Managed portfolios designed for growth, income, or stability. Diversify across stocks,
            bonds, and other asset classes.
          </p>
        </div>

        <div className="wealth-card">
          <h3>Retirement Accounts</h3>
          <p>
            IRAs, Roth IRAs, and employer plan rollovers. Secure your future with tax-advantaged
            retirement solutions.
          </p>
        </div>

        <div className="wealth-card">
          <h3>Estate Planning</h3>
          <p>
            Protect your assets and plan for the future with wills, trusts, and wealth transfer
            strategies.
          </p>
        </div>

        <div className="wealth-card">
          <h3>Tax Optimization</h3>
          <p>
            Minimize liabilities and maximize after-tax returns with personalized tax planning and
            investment strategies.
          </p>
        </div>

        <div className="wealth-card">
          <h3>Philanthropy Planning</h3>
          <p>
            Incorporate charitable giving into your wealth plan to make a lasting impact while
            benefiting your financial strategy.
          </p>
        </div>
      </section>
    </main>
  );
}
