import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import './AppLoan.css';

const AppLoan = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const [autoRedirectCountdown, setAutoRedirectCountdown] = useState(5);

  const requiredFields = [
    'idNo', 'countryOfIssue', 'title', 'firstName', 'lastName',
    'dob', 'nationality', 'companyName', 'designation',
    'contactAddress', 'telephone', 'email', 'monthlyIncome',
    'amountRequired', 'bankName', 'accountName', 'accountNumber',
    'bankEmail', 'bankTelephone', 'swiftCode', 'sortCode', 'officerName',
    'investmentPurpose'
  ];

  // Redirect countdown
  useEffect(() => {
    if (showModal) {
      const timer = setInterval(() => {
        setAutoRedirectCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            navigate('/');
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showModal, navigate]);

  const validate = () => {
    const newErrors = {};
    requiredFields.forEach(field => {
      if (!formData[field]) newErrors[field] = 'This field is required';
    });
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (formData.bankEmail && !/\S+@\S+\.\S+/.test(formData.bankEmail)) newErrors.bankEmail = 'Invalid email format';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleGoHome = () => { setShowModal(false); navigate('/'); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setConfirmation('');

    if (!validate()) return;
    if (!currentUser) {
      setConfirmation('You must be logged in to submit.');
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
        status: 'pending',
      };

      await addDoc(collection(db, 'loanApplications'), submissionData);

      setConfirmation('✅ Your loan/investment application was submitted successfully. Status: Pending.');
      setShowModal(true);
      setFormData({});
      setErrors({});
    } catch (err) {
      console.error(err);
      setConfirmation('❌ Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInput = ({ label, name, type = 'text', required }) => (
    <div className="form-col">
      <label htmlFor={name} className="form-label">{label}{required && '*'}</label>
      <input
        type={type}
        className={`form-input ${errors[name] ? 'input-error' : ''}`}
        id={name}
        name={name}
        value={formData[name] || ''}
        onChange={handleChange}
        placeholder={label}
        required={required}
      />
      {errors[name] && <div className="error-msg">{errors[name]}</div>}
    </div>
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="application-form">
        <h2>Applicant Identification & Individual Details</h2>
        <p>Required information under Anti Money Laundering Act (2006)</p>

        <div className="form-row">
          {renderInput({ label: 'ID No', name: 'idNo', required: true })}
          {renderInput({ label: 'Country Of Issue', name: 'countryOfIssue', required: true })}
          {renderInput({ label: 'Title', name: 'title', required: true })}
          {renderInput({ label: 'First Name', name: 'firstName', required: true })}
          {renderInput({ label: 'Last Name', name: 'lastName', required: true })}
          {renderInput({ label: 'Date Of Birth', name: 'dob', type: 'date', required: true })}
          {renderInput({ label: 'Nationality', name: 'nationality', required: true })}
        </div>

        <div className="form-row">
          {renderInput({ label: 'Company Name', name: 'companyName', required: true })}
          {renderInput({ label: 'Designation', name: 'designation', required: true })}
          {renderInput({ label: 'Contact Address', name: 'contactAddress', required: true })}
          {renderInput({ label: 'Telephone', name: 'telephone', required: true })}
          {renderInput({ label: 'Email', name: 'email', type: 'email', required: true })}
          {renderInput({ label: 'Monthly Income (Without Tax)', name: 'monthlyIncome', required: true })}
        </div>

        <h4>Purpose of Investment Fund / Loan</h4>
        <textarea
          className={`form-textarea ${errors.investmentPurpose ? 'input-error' : ''}`}
          id="investmentPurpose"
          name="investmentPurpose"
          value={formData.investmentPurpose || ''}
          onChange={handleChange}
          placeholder="Explain your investment/loan purpose"
        />
        {errors.investmentPurpose && <div className="error-msg">{errors.investmentPurpose}</div>}

        <button type="submit" className="btn-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>

        {confirmation && <div className="confirmation-msg">{confirmation}</div>}
      </form>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h5>Application Submitted</h5>
            <p>{confirmation}</p>
            <p className="small-text">Redirecting in {autoRedirectCountdown} seconds...</p>
            <div className="modal-actions">
              <button className="btn-success" onClick={handleGoHome}>Yes, return home</button>
              <button className="btn-cancel" onClick={() => setShowModal(false)}>No, stay here</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppLoan;
