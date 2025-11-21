import React from "react";
import "./KYCStatusBanner.css";

export default function KYCStatusBanner() {
  return (
    <div className="kyc-banner">
      <p>Your KYC/account is not complete. <a href="/kyc" className="cta">Complete Now</a></p>
    </div>
  );
}
