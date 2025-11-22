/* CDRates.jsx */
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./CDRates.css";

export default function CDRates() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [showDisclosure, setShowDisclosure] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const toggleCard = (id) => setExpandedCard(expandedCard === id ? null : id);
  const toggleDisclosure = () => setShowDisclosure(!showDisclosure);

  const rates = [
    {
      id: 1,
      term: "6 months",
      apy: "0.35%",
      details:
        "A short-term CD ideal for emergency funds or short-term savings goals. Interest is fixed for 6 months and compounded monthly."
    },
    {
      id: 2,
      term: "1 year",
      apy: "0.60%",
      details:
        "One-year CD offering competitive APY. Best for savers who want slightly higher interest without locking funds long-term."
    },
    {
      id: 3,
      term: "2 years",
      apy: "0.85%",
      details:
        "Two-year CD providing moderate growth with safety of principal. Perfect for medium-term financial goals."
    },
    {
      id: 4,
      term: "3 years",
      apy: "1.05%",
      details:
        "Three-year CD with increasing APY. Ideal for savers looking for stability and higher returns over a longer horizon."
    },
    {
      id: 5,
      term: "5 years",
      apy: "1.20%",
      details:
        "Long-term CD designed for committed savers. Fixed interest for 5 years with maximum APY benefits."
    },
    {
      id: 6,
      term: "10 years",
      apy: "1.45%",
      details:
        "Decade-long CD for maximum growth and predictable returns. Not ideal for funds needed short-term."
    }
  ];

  return (
    <div className="pc-cd">
      {/* HERO */}
      <header className="pc-hero" data-aos="fade-down">
        <div className="pc-hero-inner">
          <h1>Certificate of Deposit (CD) Rates</h1>
          <p className="pc-lead">
            Secure earnings with fixed-rate CD terms — competitive APYs tailored to your financial goals.
          </p>
        </div>
      </header>

      {/* INTRO */}
      <section className="pc-intro" data-aos="fade-up">
        <div className="pc-container">
          <p>
            Choose the CD term that fits your savings strategy. Longer terms offer higher APYs and predictable growth for your money.
          </p>
        </div>
      </section>

      {/* CD RATE CARDS */}
      <section className="pc-section pc-rates">
        <div className="pc-container">
          <h2 data-aos="fade-up">Current CD Rates</h2>
          <div className="pc-rates-grid">
            {rates.map((r) => (
              <div key={r.id} className="rate-card" data-aos="fade-up">
                <h3>{r.term}</h3>
                <p className="rate-apy">{r.apy}</p>
                <p className="rate-desc">{r.details}</p>
                <button
                  className="pc-btn pc-btn-ghost"
                  onClick={() => toggleCard(r.id)}
                >
                  {expandedCard === r.id ? "Show Less" : "Learn More"}
                </button>
                {expandedCard === r.id && (
                  <div className="rate-details" data-aos="fade-right">
                    <p>
                      Interest is paid at the stated APY and compounded monthly. Early withdrawal may incur penalties. Terms are subject to change.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CD DISCLOSURES */}
      <section className="pc-section pc-disclosure" data-aos="fade-up">
        <div className="pc-container">
          <button className="pc-btn pc-btn-ghost" onClick={toggleDisclosure}>
            {showDisclosure ? "Hide Disclosures & Notes" : "View Disclosures & Notes"}
          </button>

          {showDisclosure && (
            <div className="cd-disclosure-content" data-aos="fade-right">
              <ul>
                <li>Maturities from 60 days to 60 months</li>
                <li>Monthly interest earnings may be withdrawn at any time after crediting</li>
                <li>Special CD offers available (check in-branch or online)</li>
                <li>Tax-deferred options available</li>
              </ul>
              <p>
                *Annual Percentage Yield (APY) offers are valid as of October 24, 2025, and may be withdrawn at any time without notice. A disclosure of the current interest rate and APY for these accounts will be provided to you at account opening. The interest rate and APY will not change for the term of the accounts. The daily balance method is used to calculate interest on these accounts and applies a daily periodic rate to the principal balance in the account each day. You may not make additional deposits to these accounts. APYs assume principal and interest remain on deposit for twelve (12) months. Withdrawal will reduce earnings. Accounts automatically renew with a 5 day grace period.
              </p>
              <ol>
                <li>Minimum deposit to open account and obtain the APY is $1,000. The interest rate will be in effect for eleven (11) months. Interest will be compounded and credited to the account monthly. You may not make a withdrawal of any kind during the first six calendar days after the initial deposit. After such period, a withdrawal of the entire balance may be made without penalty. You cannot make a partial withdrawal from this account. Your account will mature in eleven (11) months.</li>
                <li>Minimum deposit to open account and obtain the APY is $1,000. This account is available to consumers only and must be opened with funds not currently on deposit with First County Bank. The interest rate will be in effect for eighteen (18) months. Interest will be compounded and credited to the account monthly. You may not make a withdrawal of any kind during the first six calendar days after the initial deposit. After such period, a withdrawal of the entire balance may be made without penalty. You cannot make a partial withdrawal from this account. Your account will mature in eighteen (18) months.</li>
                <li>Minimum deposit to open account is $500. The interest rate and APY will not change during the 2 ½ year term. Interest will be compounded continuously and credited monthly. Withdrawal of principal prior to maturity is subject to penalty equal to twelve (12) months interest. Consult a tax advisor regarding taxability of withdrawal of principal or interest.</li>
              </ol>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
