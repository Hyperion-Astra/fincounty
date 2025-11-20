import React from "react";
import "./Testimonials.css";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Their customer service is outstanding. Every interaction feels personal and helpful.",
      name: "Sarah Johnson",
      role: "Small Business Owner",
    },
    {
      quote:
        "I opened my first mortgage here and the process was smooth, transparent, and quick.",
      name: "Michael Adams",
      role: "Homeowner",
    },
    {
      quote:
        "The online banking tools make managing my finances incredibly easy — day or night.",
      name: "Vanessa Cole",
      role: "Freelancer",
    },
  ];

  return (
    <section className="ts-section">
      <div className="ts-container">
        <h2 className="ts-heading">What Our Customers Say</h2>
        <p className="ts-subtitle">
          Real experiences from people who trust us with their financial future.
        </p>

        <div className="ts-grid">
          {testimonials.map((t, i) => (
            <div className="ts-card" key={i}>
              <p className="ts-quote">“{t.quote}”</p>
              <div className="ts-author">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
