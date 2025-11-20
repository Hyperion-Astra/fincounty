import React from "react";

export default function Wealth() {
  return (
    <main style={{ padding: "40px 5%" }}>
      <h1>Wealth Management</h1>
      <p style={{ color: "#64748b", maxWidth: 700 }}>
        Personalized investment strategies, retirement planning, and portfolio management
        designed to secure your financial future.
      </p>

      <section style={{ marginTop: 30, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        <div style={{ background: "#fff", padding: 20, borderRadius: 12, boxShadow: "var(--shadow)" }}>
          <h3>Financial Planning</h3>
          <p style={{ color: "#64748b" }}>
            Build long-term plans tailored to your goals.
          </p>
        </div>
        <div style={{ background: "#fff", padding: 20, borderRadius: 12, boxShadow: "var(--shadow)" }}>
          <h3>Investment Portfolios</h3>
          <p style={{ color: "#64748b" }}>
            Managed portfolios designed for growth, income, or stability.
          </p>
        </div>
        <div style={{ background: "#fff", padding: 20, borderRadius: 12, boxShadow: "var(--shadow)" }}>
          <h3>Retirement Accounts</h3>
          <p style={{ color: "#64748b" }}>
            IRAs, Roth IRAs, and employer plan rollovers.
          </p>
        </div>
      </section>
    </main>
  );
}
