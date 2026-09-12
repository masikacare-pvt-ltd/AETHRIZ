import React from 'react';

export default function Navbar() {
  const handleDeployClick = () => {
    window.location.href = '/login';
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
            <a href="#syntax">Syntax</a>
          </li>
          <li>
            <a href="#telemetry">Matrix</a>
          </li>
          <li>
            <a href="#vector">Architecture</a>
          </li>
        </ul>
        <button className="btn-apex cursor-hv" onClick={handleDeployClick}>
          INITIATE DEPLOY <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </header>
  );
}
