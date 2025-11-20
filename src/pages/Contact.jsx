import React from "react";

export default function Contact() {
  return (
    <main style={{ padding: "40px 5%" }}>
      <h1>Contact Us</h1>
      <p style={{ color: "#64748b", maxWidth: 700 }}>
        Have a question? Need an appointment? We’re here to help.
      </p>

      <section style={{ marginTop: 30, background: "#fff", padding: 20, borderRadius: 12, boxShadow: "var(--shadow)", maxWidth: 600 }}>
        <h3>Send us a message</h3>
        <form style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 10 }}>
          <input type="text" placeholder="Your Name" style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }} />
          <input type="email" placeholder="Your Email" style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }} />
          <textarea placeholder="Message" rows="4" style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }} />
          <button className="btn-primary">Submit</button>
        </form>
      </section>
    </main>
  );
}
