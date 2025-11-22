import React from "react";
import { Link } from "react-router-dom";
import "./TaborAward.css";

export default function TaborAward() {
  return (
    <div className="pc-page">
      {/* Hero Section */}
      <header className="pc-hero" data-aos="fade-up">
        <div className="pc-hero-inner">
          <h1>Richard E. Tabor Award</h1>
          <p className="pc-lead">
            Celebrating extraordinary community leadership and service that inspires change.
          </p>
        </div>
      </header>

      {/* Honoring Leadership */}
      <section className="pc-section" data-aos="fade-up">
        <div className="pc-container">
          <h2>Honoring Community Leadership</h2>
          <p>
            The Richard E. Tabor Award recognizes outstanding individuals and organizations 
            who demonstrate exceptional commitment to improving their communities 
            through leadership, service, and innovative solutions.
          </p>
        </div>
      </section>

      {/* About the Award */}
      <section className="pc-section" data-aos="fade-up">
        <div className="pc-container">
          <h2>About the Award</h2>
          <ul className="pc-list">
            <li>Established to honor Richard E. Tabor’s legacy of service and dedication.</li>
            <li>Awarded annually to a deserving community member or organization.</li>
            <li>Candidates must demonstrate leadership, impact, and a positive influence.</li>
            <li>Nominations are reviewed by the foundation’s board and advisory committee.</li>
            <li>The award highlights projects that foster lasting community growth and inspiration.</li>
          </ul>
        </div>
      </section>

      {/* Nominations */}
      <section className="pc-section" data-aos="fade-up">
        <div className="pc-container">
          <h2>Nominations</h2>
          <p>
            Know someone making a meaningful difference? Submit a nomination to 
            help us recognize their efforts and celebrate their contributions 
            to the community.
          </p>

          <div className="nomination-cards">
            <div className="info-card">
              <h3>Who Can Be Nominated?</h3>
              <p>Individuals or organizations demonstrating exceptional community leadership and service.</p>
            </div>
            <div className="info-card">
              <h3>Nomination Criteria</h3>
              <p>Impact on the community, innovation, dedication, and measurable outcomes.</p>
            </div>
            <div className="info-card">
              <h3>Submission Deadline</h3>
              <p>Nominations are accepted annually, with a deadline of December 31st each year.</p>
            </div>
          </div>

          <Link className="pc-btn pc-btn-primary" to="/apply">
            Submit a Nomination
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section className="pc-section" data-aos="fade-up">
        <div className="pc-container">
          <h2>FAQs</h2>
          <ul className="pc-list">
            <li><strong>Q:</strong> Can an organization nominate itself? <br /><strong>A:</strong> Yes, self-nominations are accepted.</li>
            <li><strong>Q:</strong> How is the winner selected? <br /><strong>A:</strong> Winners are chosen by our foundation board based on impact, leadership, and innovation.</li>
            <li><strong>Q:</strong> When is the award announced? <br /><strong>A:</strong> Winners are announced each spring during our annual community event.</li>
            <li><strong>Q:</strong> Are multiple winners possible? <br /><strong>A:</strong> Generally one award is given, but honorable mentions may be recognized.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
