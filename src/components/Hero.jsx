import "./Hero.css";
import heroImg from "../assets/hero-image.png";

export default function Hero() {
  return (
    <section className="hero-section">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${heroImg})` }}
      ></div>

      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1 className="hero-title">
          Banking Designed <br /> For Your Future
        </h1>

        <div className="hero-underline"></div>

        <p className="hero-text">
          Smart financial tools, simple banking solutions, and support you can trust.
        </p>

        <button className="hero-btn">Open an Account</button>
      </div>
    </section>
  );
}
