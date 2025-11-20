import React from "react";

export default function Foundation() {
  return (
    <main style={{ padding: "40px 5%" }}>
      <h1>The Fincounty Foundation</h1>
      <p style={{ color: "#64748b", maxWidth: 700 }}>
        Supporting local nonprofits, education programs, and community development
        projects across our region.
      </p>

      <section style={{ marginTop: 30, background: "#fff", padding: 20, borderRadius: 12, boxShadow: "var(--shadow)" }}>
        <h3>Community Grants</h3>
        <p style={{ color: "#64748b" }}>
          Each year, we award grants to organizations working to make life better
          for families and small businesses.
        </p>
      </section>
    </main>
  );
}
