import React from "react";
import "./FeatureBoxes.css";
import { Link } from "react-router-dom";

export default function FeatureBoxes() {
  const features = [
    {
      title: "Personal Banking",
      text: "Simple accounts, smart tools, and support from real people.",
      link: "/personal/checking-accounts",
    },
    {
      title: "Business Banking",
      text: "Powerful solutions to help you grow, manage, and scale.",
      link: "/business/business-checking",
    },
    {
      title: "Mortgage Center",
      text: "Guidance from pre-approval to closing with competitive rates.",
      link: "/mortgage/mortgage-options",
    }
  ];

  return (
    <section className="fb-section">
      <div className="fb-container">
        {features.map((f, i) => (
          <div className="fb-card" key={i}>
            <h3 className="fb-title">{f.title}</h3>
            <p className="fb-text">{f.text}</p>
            <Link to={f.link} className="fb-link">
              Learn More →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
