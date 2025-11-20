// src/helpers/formatDate.js

export default function formatDate(timestamp) {
  if (!timestamp) return "N/A";

  if (typeof timestamp === "object" && timestamp.seconds) {
    // Firestore timestamp
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // Normal JS date values
  const date = new Date(timestamp);
  if (isNaN(date)) return "Invalid Date";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
