import React from "react";
import "./FoundationNews.css";

export default function FoundationNews() {
  const newsItems = [
    {
      title: "Community Grant Awarded to Local Program",
      description: "Our foundation proudly supports new initiatives that enhance education, health, and community development.",
    },
    {
      title: "Youth Leadership Workshop Launches",
      description: "We recently hosted workshops to empower youth leaders in community projects and civic engagement.",
    },
    {
      title: "Annual Charity Gala Highlights Impact",
      description: "The gala celebrated nonprofit achievements and raised funds for innovative local programs.",
    },
    {
      title: "New Scholarship Program Announced",
      description: "Supporting higher education for underserved students through our annual scholarship awards.",
    },
    {
      title: "Environmental Action Grant Winners",
      description: "Funding local initiatives promoting sustainability, recycling, and green community projects.",
    },
    {
      title: "Arts & Culture Program Expands Reach",
      description: "Supporting creative programs to enrich local arts, music, and cultural education.",
    },
  ];

  return (
    <div className="pc-page">
      {/* Hero Section */}
      <header className="pc-hero" data-aos="fade-up">
        <div className="pc-hero-inner">
          <h1>Foundation News</h1>
          <p className="pc-lead">Stay updated on our latest initiatives, events, and community programs.</p>
        </div>
      </header>

      {/* News Grid */}
      <section className="pc-section" data-aos="fade-up">
        <div className="pc-container news-grid">
          {newsItems.map((item, i) => (
            <div key={i} className="info-card" data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="news-image"></div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button className="primary-btn">Read More</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
