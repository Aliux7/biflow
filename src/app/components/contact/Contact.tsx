import React from "react";
import "./contact.css";

const Contact = () => {
  return (
    <section className="contact section">
      <div className="contact-container">
        <div style={{marginBottom: '1rem'}}>
          <h2 className="section-title">
            <a href="/" className="navLogo">Contact <span style={{color:'var(--minor-color)'}}>Us</span></a>
          </h2>
        </div>
        <div className="contact-content">
          <div className="contact-item">
            <i className="uil uil-whatsapp-alt contact-icon"></i>
            <h3>Whatsapp</h3>
            <p>+62-8383838 322342</p>
          </div>
          <div className="contact-item">
            <i className="uil uil-line contact-icon"></i>
            <h3>Line</h3>
            <p>+62-8383838 322342</p>
          </div>
          <div className="contact-item">
            <i className="uil uil-instagram-alt contact-icon"></i>
            <h3>Instagram</h3>
            <p>+62-8383838 322342</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
