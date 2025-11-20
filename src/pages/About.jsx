import React from "react";

export default function About() {
  return (
    <main style={{ padding: "40px 5%" }}>
      <h1>About Fincounty Bank</h1>
      <p style={{ color: "#64748b", maxWidth: 700 }}>
        Proudly serving our community for over 40 years with reliable, personal
        financial services.
      </p>

      <section style={{ display: "flex", gap: 20, marginTop: 30 }}>
        <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800" 
             alt="team" 
             style={{ width: 380, borderRadius: 12, boxShadow: "var(--shadow)" }}
        />
        <div style={{ flex: 1 }}>
          <h3>Our Mission</h3>
          <p style={{ color: "#64748b" }}>
            To provide dependable banking solutions with a human touch — empowering
            individuals and businesses to thrive.
          </p>
        </div>
      </section>
    </main>
  );
}
