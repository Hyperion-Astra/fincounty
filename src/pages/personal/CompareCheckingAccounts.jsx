/* CompareCheckingAccounts.jsx */
import React from "react";
import "./CompareCheckingAccounts.css";
import { Link } from "react-router-dom";

export default function CompareCheckingAccounts() {
  return (
    <div className="pc-compare">
      <header className="pc-compare-hero">
        <div className="pc-container">
          <h1>Compare Checking Accounts</h1>
          <p>Find the account that matches your needs — side-by-side comparison.</p>
        </div>
      </header>

      <section className="pc-section pc-compare-table">
        <div className="pc-container">
          <table className="pc-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Everyday Checking</th>
                <th>Premier Checking</th>
                <th>Student Checking</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Monthly fee</td>
                <td>$0</td>
                <td>$10 (waived)</td>
                <td>$0</td>
              </tr>
              <tr>
                <td>Minimum balance</td>
                <td>None</td>
                <td>$1,000</td>
                <td>None</td>
              </tr>
              <tr>
                <td>ATM fee reimbursement</td>
                <td>No</td>
                <td>Yes</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Mobile deposit</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>

          <div className="pc-compare-cta">
            <Link to="/register" className="pc-btn pc-btn-primary" data-aos="zoom-in" data-aos-delay="800">
                      Open an Account
                    </Link>
            <a className="pc-btn pc-btn-ghost" href="/contact">Contact Us</a>
          </div>
        </div>
      </section>

      {/* ---------- FULL DISCLOSURE WRITE-UP ---------- */}
      <section className="pc-compare-disclosure">
        <div className="pc-container">
          <p>
            Refer to the Consumer Deposit Account Schedule of Charges, the Business Deposit Account Schedule of Charges, and all applicable account disclosures and agreements for additional charges, fees and/or limitations that may apply. You will be charged foreign ATM (Non-Fin County Bank/Non-Allpoint) fees.
          </p>
          <p>
            1 FinCounty Bank is a member of the Allpoint network, giving you access to more than 43,000 ATMs in the continental U.S. and certain areas internationally. There are no transaction fees or surcharges when you use Allpoint member ATMs (within the continental U.S.) to access your First County Bank account.
          </p>
          <p>
            2 Insurance products are not FDIC insured; not insured by any government agency, not a deposit or other obligation of Fin County Bank, not guaranteed by Fin County Bank, and are subject to investment risk, including the possible loss of the principal. BaZing ValueAccess and BaZing MyChoice Checking benefits are subject to limits, additional terms and conditions. For BaZing ValueAccess BaZing benefit details, terms and conditions click here and for BaZing MyChoice Checking benefits details, terms and conditions click here.
          </p>
          <p>
            3 A “Monthly Maintenance Service Charge” of $15.00 will apply if: (1) at any time during the “InterestAccess” checking account statement cycle, the end of day collected available balance falls below $1,000.00; or (2) if at any time during the “InterestAccess” checking account statement cycle period, your combined deposit and loan balances (held with Fin County Bank) fall below $50,000.00. Deposit account balances are assessed based on the daily collected available balance. Loans balances are assessed based on the principal loan amount (excluding credit cards).
          </p>
          <p>
            4 Annual Percentage Yield (APY) is subject to change. Minimum balance to open the account is $50.00 (all tiers). High Yield Checking Account Qualifiers are: at least twelve (12) qualifying debit card Point of Sale (POS) purchase transactions that post and settle within the statement cycle; AND at least one (1) direct deposit transaction posts and settles within the statement cycle to this account; AND be enrolled in and agree to receive electronic periodic account statements (eStatements) for the statement cycle and discontinue receipt of paper periodic account statements for this account. Fees could reduce earnings. See Checking Account Disclosure for further details. Interest is paid at the listed rate on the daily collected balances on deposit in each tier, creating a blended interest rate for the entire balance.
          </p>
          <p>
            5 BaZing Fuel requires activation and qualifications apply. For full disclosures and terms and conditions click here.
          </p>
          <p>
            6 In addition to the Monthly Maintenance Service Charge you will be assessed a $5.00 Paper Statement Fee. You can avoid the Paper Statement Fee by enrolling in Online Banking and electing eStatements before the end of your statement cycle, including the first statement cycle after opening the account.
          </p>
          <p>
            7 To avoid the Maintenance Service Charge based on your age you must be at least 16 years of age to open this account as the Primary Signer/Accountholder. Primary Signer/Accountholders 16 and/or 17 must have a parent or guardian as a joint accountholder. The “Monthly Maintenance Service Charge” for the MyChoice Checking account may be avoided if: (1) you maintain and end of day collected balance of at least $1,000.00 in the “MyChoice” checking account for the entire statement cycle; or (2) if cumulative direct deposits totaling $500.00 or more posts and settles within the statement cycle to your “MyChoice” account; or (3) the Primary Signer/Accountholder on the “MyChoice” checking account is under the age of 25 for the entire statement cycle.
          </p>
          <p>
            8 Standard Overdraft services are NOT available for this account. In addition, you CANNOT opt in to authorize and pay overdrafts on ATM and everyday debit card transactions. If you do not have sufficient funds available in your account to cover a transaction, the transaction will be declined in most cases. In the case that your account is overdrawn, you will not be charged an overdraft fee. See full Checking Account Disclosures for complete details.
          </p>
        </div>
      </section>
    </div>
  );
}
