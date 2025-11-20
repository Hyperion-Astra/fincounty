// src/helpers/calculateLoanStatus.js

export default function calculateLoanStatus(loan) {
  if (!loan) return "Unknown";

  if (loan.status === "approved") return "Approved";
  if (loan.status === "declined") return "Declined";
  if (loan.status === "pending") return "Pending";

  // Extra logic if you add repayments later
  if (loan.totalPaid >= loan.amount) return "Paid Off";
  if (loan.totalPaid > 0 && loan.totalPaid < loan.amount) return "In Progress";

  return "Pending";
}
