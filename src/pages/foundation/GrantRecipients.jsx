import "./GrantRecipients.css";

export default function GrantRecipients() {
  return (
    <div className="recipients-page">
      <section className="recipients-hero">
        <h1>Grant Recipients</h1>
      </section>

      <div className="recipients-container">
        <section className="recipients-section">
          <h2>Celebrating Impact</h2>
          <p>
            Our grant recipients represent a diverse group of nonprofit 
            organizations working tirelessly to strengthen and uplift 
            communities. We are proud to support their missions.
          </p>
        </section>

        <section className="recipients-grid">
          {[
            "Community Health Initiative",
            "Education for All Foundation",
            "Youth Leadership Center",
            "Arts & Culture Collective",
            "Neighborhood Support Network",
            "Environmental Action Group"
          ].map((item, i) => (
            <div key={i} className="recipient-card">
              <h3>{item}</h3>
              <p>
                Dedicated to community improvement through outreach, 
                education, and impactful programs.
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
