// src/helpers/validateAmount.js

export default function validateAmount(value) {
  if (!value) return { valid: false, message: "Amount is required." };

  const amount = Number(value);

  if (isNaN(amount)) {
    return { valid: false, message: "Invalid amount format." };
  }
  if (amount <= 0) {
    return { valid: false, message: "Amount must be greater than 0." };
  }

  return { valid: true, message: "" };
}
