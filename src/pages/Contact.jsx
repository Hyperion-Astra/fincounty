import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  SendHorizonal,
} from "lucide-react";
import "./Contact.css";

export default function Contact() {
  return (
    <main className="contact-container">
      <section className="contact-header">
        <h1>Contact Us</h1>
        <p>
          Our team is here to help you with inquiries, appointments, or support.
          Fill out the form or reach us directly.
        </p>
      </section>

      <section className="contact-wrapper">
        {/* LEFT — FORM */}
        <div className="contact-form-box">
          <h3>Send Us a Message</h3>

          <form className="contact-form">
            <div className="form-row">
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />
            </div>

            <div className="form-row">
              <input type="text" placeholder="Phone Number" />
              <input type="text" placeholder="Subject" />
            </div>

            <textarea
              placeholder="Write your message..."
              rows="5"
              required
            ></textarea>

            <button type="submit" className="contact-submit">
              <SendHorizonal size={18} />
              Send Message
            </button>
          </form>
        </div>

        {/* RIGHT — CONTACT INFO */}
        <aside className="contact-info-box">
          <h3>Reach Us Directly</h3>

          <div className="info-item">
            <Mail size={20} />
            <div>
              <h4>Emails</h4>
              <p>support@fincounty.com</p>
              <p>info@fincounty.com</p>
            </div>
          </div>

          <div className="info-item">
            <Phone size={20} />
            <div>
              <h4>Phone</h4>
              <p>+1 (203) 660-4327</p>
            </div>
          </div>

          <div className="info-item">
            <MapPin size={20} />
            <div>
              <h4>Office Addresses</h4>
              <p>47 Mason St, Greenwich, CT 06830, USA</p>
              <p>Trg Republike 5, 1000 Ljubljana, Slovenia</p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
