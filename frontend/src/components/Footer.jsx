import React from 'react';

export default function Footer({ onNavigate }) {
  const handleCareersClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('careers');
    }
  };

  return (
    <footer className="footer-zenith" id="terminus">
      <div className="fz-scanline"></div>

      <div className="fz-container rv-scroll reveal-node">
        {/* Top Footer Meta Typography */}
        <div className="fz-top-meta">
          <span>// CAL.VECTOR.02</span>
          <span>// ENCRYPTION LAYER: ACTIVE</span>
        </div>

        <div className="fz-grid">
          {/* Left CTA Box */}
          <div className="fz-cta-block">
            <span className="fz-label">AETHRIZ HEALTH INTELLIGENCE</span>
            <h2 className="fz-title">
              Start Your <br />
              <i>Health Action.</i>
            </h2>
          </div>

          {/* System Architecture Shortcuts */}
          <div className="fz-col delay-1">
            <span className="fz-col-title">Platform Architecture</span>
            <ul className="fz-links">
              <li>
                <a href="#syntax" className="cursor-hv">
                  Services
                </a>
              </li>
              <li>
                <a href="#telemetry" className="cursor-hv">
                  Live Telemetry
                </a>
              </li>
              <li>
                <a href="#vector" className="cursor-hv">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#careers" onClick={handleCareersClick} className="cursor-hv" style={{ color: '#E81A2D' }}>
                  Careers / Internship
                </a>
              </li>
            </ul>
          </div>

          {/* Module Access Shortcuts */}
          <div className="fz-col delay-2">
            <span className="fz-col-title">Health Modules</span>
            <ul className="fz-links">
              <li>
                <a href="#journey" className="cursor-hv">
                  Why We Are Unique
                </a>
              </li>
              <li>
                <a href="#resonance" className="cursor-hv">
                  Mission & Vision
                </a>
              </li>
              <li>
                <a href="#faq" className="cursor-hv">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="cursor-hv">
                  Establish Link
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Meta Data & Social Interface */}
        <div className="fz-bottom delay-3">
          <div className="fz-meta-data">
            <span>© 2026 AETHRIZ SYSTEM DEPLOYMENT</span>
          </div>

          <div className="fz-socials">
            <a
              href="https://x.com/aethriz_ai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X Twitter"
              className="cursor-hv"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="1em"
                height="1em"
                fill="currentColor"
              >
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.6 318.1 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/aethriz.ai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="cursor-hv"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/vishmapasayat"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="cursor-hv"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a
              href="https://www.facebook.com/share/14iGtsmA3ut/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="cursor-hv"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a
              href="https://www.youtube.com/@aethriz_ai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="cursor-hv"
            >
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a
              href="mailto:aethriz.ai@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Gmail"
              className="cursor-hv"
            >
              <i className="fa-regular fa-envelope"></i>
            </a>
          </div>
        </div>

        {/* Massive Typographic Base Watermark */}
        <div className="fz-huge-mark">AETHRIZ</div>
      </div>
    </footer>
  );
}
