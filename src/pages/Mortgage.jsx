import React from "react";

export default function Mortgage() {
  return (
    <main style={{ padding: "40px 5%" }}>
      <h1>Mortgage Center</h1>
      <p style={{ color: "#64748b", maxWidth: 700 }}>
        Whether you're buying your first home or refinancing an existing mortgage,
        our loan officers are here to guide you every step of the way.
      </p>

      <section style={{ marginTop: 30, background: "#fff", padding: 20, borderRadius: 12, boxShadow: "var(--shadow)" }}>
        <h3>Current Rates</h3>
        <p style={{ color: "#64748b" }}>
          Rates change frequently — schedule a consultation to get a personalized quote.
        </p>
        <button className="btn-primary">Get Pre-Qualified</button>
      </section>
    </main>
  );
}
