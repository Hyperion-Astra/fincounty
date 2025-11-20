import React from "react";

export default function Personal() {
  return (
    <main style={{ padding: "40px 5%" }}>
      <h1>Personal Banking</h1>
      <p style={{ color: "#64748b", maxWidth: 700 }}>
        Everyday banking made simple — checking, savings, debit cards, online banking,
        and lending options designed for your life.
      </p>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 30 }}>
        <div style={{ background: "#fff", padding: 20, borderRadius: 12, boxShadow: "var(--shadow)" }}>
          <h3>Checking Accounts</h3>
          <p style={{ color: "#64748b" }}>No monthly maintenance fees and free mobile deposits.</p>
        </div>
        <div style={{ background: "#fff", padding: 20, borderRadius: 12, boxShadow: "var(--shadow)" }}>
          <h3>Savings Accounts</h3>
          <p style={{ color: "#64748b" }}>Grow your savings with competitive APY options.</p>
        </div>
        <div style={{ background: "#fff", padding: 20, borderRadius: 12, boxShadow: "var(--shadow)" }}>
          <h3>Loan Solutions</h3>
          <p style={{ color: "#64748b" }}>Personal loans with fair rates and flexible terms.</p>
        </div>
      </section>
    </main>
  );
}
