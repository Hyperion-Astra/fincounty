import React from "react";
import "./GrantRecipients.css";

export default function GrantRecipients() {
  const recipients = [
    { name: "Community Health Initiative", description: "Providing accessible healthcare and wellness programs to underserved communities." },
    { name: "Education for All Foundation", description: "Ensuring equitable access to education and learning resources for children and adults." },
    { name: "Youth Leadership Center", description: "Empowering young leaders through mentorship, training, and community service projects." },
    { name: "Arts & Culture Collective", description: "Promoting arts education and cultural programs that enrich the community." },
    { name: "Neighborhood Support Network", description: "Strengthening local neighborhoods with social services, food programs, and volunteer opportunities." },
    { name: "Environmental Action Group", description: "Driving sustainability initiatives and environmental awareness campaigns." },
    { name: "Senior Care Alliance", description: "Supporting seniors with health, recreation, and community engagement programs." },
    { name: "Tech Access Initiative", description: "Providing technology resources and training to bridge the digital divide." },
  ];

  return (
    <div className="pc-page">
      {/* Hero Section */}
      <header className="pc-hero" data-aos="fade-up">
        <div className="pc-hero-inner">
          <h1>Grant Recipients</h1>
          <p className="pc-lead">Celebrating organizations making a meaningful impact in education, health, arts, and community development.</p>
        </div>
      </header>

      {/* Introduction */}
      <section className="pc-section" data-aos="fade-up">
        <div className="pc-container">
          <h2>Celebrating Impact</h2>
          <p>
            Our grant recipients represent a diverse group of nonprofit organizations working tirelessly 
            to strengthen and uplift communities. We are proud to support their missions and amplify their impact.
          </p>
        </div>
      </section>

      {/* Recipients Grid */}
      <section className="pc-section" data-aos="fade-up">
        <div className="pc-container recipients-grid">
          {recipients.map((r, i) => (
            <div key={i} className="info-card">
              <h3>{r.name}</h3>
              <p>{r.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
