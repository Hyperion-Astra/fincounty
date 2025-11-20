import "./FoundationNews.css";

export default function FoundationNews() {
  return (
    <div className="foundation-news-page">
      <section className="news-hero">
        <h1>Foundation News</h1>
      </section>

      <div className="news-container">

        <div className="news-grid">
          {[1, 2, 3, 4].map((num) => (
            <div className="news-card" key={num}>
              <div className="news-image"></div>
              <h3>Community Grant Awarded to Local Program</h3>
              <p>
                Our foundation proudly supports new initiatives that enhance 
                education, health, and community development.
              </p>
              <button className="news-btn">Read More</button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
