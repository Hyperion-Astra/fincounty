import "./Hero.css";
import heroImg from "../assets/hero-image.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="hero-section">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${heroImg})` }}
        data-aos="zoom-out"
      ></div>

      <div className="hero-overlay" data-aos="fade-in"></div>

      <div className="hero-content" data-aos="fade-up" data-aos-delay="200">
        <h1 className="hero-title">
          Banking Designed <br /> For Your Future
        </h1>

        <div className="hero-underline" data-aos="fade-right" data-aos-delay="400"></div>

        <p className="hero-text" data-aos="fade-up" data-aos-delay="600">
          Smart financial tools, simple banking solutions, and support you can trust.
        </p>

        <Link to="/register" className="hero-btn" data-aos="zoom-in" data-aos-delay="800">
          Open an Account
        </Link>
      </div>
    </section>
  );
}
