// src/helpers/formatCurrency.js

export default function formatCurrency(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return "$0.00";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(Number(amount));
}
