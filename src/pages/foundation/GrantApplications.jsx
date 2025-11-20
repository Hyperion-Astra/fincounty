import "./GrantApplications.css";

export default function GrantApplications() {
  return (
    <div className="grant-app-page">
      <section className="grant-hero">
        <h1>Grant Applications</h1>
      </section>

      <div className="grant-container">
        <section className="grant-section">
          <h2>Supporting Our Community</h2>
          <p>
            Our foundation awards grants to nonprofit organizations that make a 
            meaningful impact in education, health services, community 
            development, and local programs. We aim to uplift and empower 
            initiatives that improve the lives of residents in our area.
          </p>
        </section>

        <section className="grant-section">
          <h2>Eligibility Requirements</h2>
          <ul>
            <li>Must be a registered nonprofit (501(c)(3)) organization.</li>
            <li>Programs must directly benefit local communities.</li>
            <li>All applications must include a project budget.</li>
            <li>Organizations may apply once per calendar year.</li>
          </ul>
        </section>

        <section className="grant-section">
          <h2>Application Process</h2>
          <p>To apply, complete the online form and submit the required documents:</p>
          <ul>
            <li>Mission statement & project proposal</li>
            <li>Impact summary</li>
            <li>Financial statement or annual report</li>
          </ul>

          <button className="grant-btn">Start Application</button>
        </section>
      </div>
    </div>
  );
}
