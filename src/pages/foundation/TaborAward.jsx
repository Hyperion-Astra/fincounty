import "./TaborAward.css";

export default function TaborAward() {
  return (
    <div className="tabor-page">
      <section className="tabor-hero">
        <h1>Richard E. Tabor Award</h1>
      </section>

      <div className="tabor-container">
        <section className="tabor-section">
          <h2>Honoring Community Leadership</h2>
          <p>
            The Richard E. Tabor Award recognizes outstanding individuals or 
            organizations who demonstrate exceptional commitment to improving 
            the community through leadership, service, and innovation.
          </p>
        </section>

        <section className="tabor-section">
          <h2>About the Award</h2>
          <ul>
            <li>Established to honor Richard E. Tabor’s legacy of service.</li>
            <li>Awarded annually to a deserving community member.</li>
            <li>Candidates must exemplify leadership and positive impact.</li>
            <li>Nominations are reviewed by our foundation’s board.</li>
          </ul>
        </section>

        <section className="tabor-section">
          <h2>Nominations</h2>
          <p>
            Do you know someone making a meaningful difference? Submit a 
            nomination and help us highlight their contributions.
          </p>

          <button className="tabor-btn">Submit a Nomination</button>
        </section>
      </div>
    </div>
  );
}
