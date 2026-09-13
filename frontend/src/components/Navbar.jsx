import React from 'react';

export default function Navbar() {
  const handleDeployClick = () => {
    // Smooth scroll to footer contact section
    const footer = document.getElementById('contact');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header id="main_nav">
      <div className="nav-island">
        <a href="/" className="nav-brand">
          <span className="aeth-logo-char">Λ</span>
          <span className="aeth-logo-char">E</span>
          <span className="aeth-logo-char">T</span>
          <span className="aeth-logo-char">H</span>
          <div className="aeth-logo-bars">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="aeth-logo-char">I</span>
          <span className="aeth-logo-char">Z</span>
        </a>
        <ul className="nav-clusters">
          <li>
            <a href="#syntax">Services</a>
          </li>
          <li>
            <a href="#vector">How It Works</a>
          </li>
          <li>
            <a href="#journey">Why Unique</a>
          </li>
          <li>
            <a href="#resonance">Mission</a>
          </li>
          <li>
            <a href="#faq">FAQ</a>
          </li>
        </ul>
        <button className="btn-apex cursor-hv" onClick={handleDeployClick}>
          CONTACT US <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </header>
  );
}
