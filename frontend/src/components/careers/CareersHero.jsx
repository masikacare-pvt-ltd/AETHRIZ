import React from 'react';

export default function CareersHero({ onExploreRoles, onLifeAtAethriz, totalRolesCount }) {
  return (
    <section className="careers-hero-section">
      <div className="careers-hero-inner">
        {/* Top Status Pill */}
        <div className="status-badge hero-status-pill">
          <div className="status-dot">
            <div></div>
          </div>
          <span className="data-mono">CAREERS // GLOBAL RECRUITMENT ACTIVE</span>
        </div>

        {/* Large Headline with Playfair Display and Italic Accent */}
        <h1 className="careers-hero-title">
          Build the Future <br />
          <i>With Us.</i>
        </h1>

        {/* Supporting description */}
        <p className="careers-hero-subtitle">
          At AETHRIZ, we are assembling exceptional engineers, researchers, and designers to pioneer
          the frontier of bio-algorithmic health intelligence. Build high-velocity systems, push the limits of
          multimodal AI, and make a measurable impact on human longevity.
        </p>

        {/* Dual Call-to-Actions */}
        <div className="careers-hero-actions">
          <button
            type="button"
            className="btn-apex cursor-hv hero-cta-primary"
            onClick={onExploreRoles}
            id="hero-explore-roles-btn"
          >
            EXPLORE {totalRolesCount} OPEN ROLES <i className="fa-solid fa-arrow-down"></i>
          </button>

          <button
            type="button"
            className="btn-glass-secondary hero-cta-secondary"
            onClick={onLifeAtAethriz}
            id="hero-life-at-aethriz-btn"
          >
            LIFE AT AETHRIZ <i className="fa-solid fa-sparkles"></i>
          </button>
        </div>

        {/* Ambient Signal Grid */}
        <div className="careers-stats-band">
          <div className="hero-stat-item">
            <span className="stat-mono-val">100%</span>
            <span className="stat-label">REMOTE-FIRST & ASYNC</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat-item">
            <span className="stat-mono-val">{totalRolesCount} ROLES</span>
            <span className="stat-label">ENGINEERING, AI & DESIGN</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat-item">
            <span className="stat-mono-val">ZERO FLUFF</span>
            <span className="stat-label">REAL PRODUCTION IMPACT</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat-item">
            <span className="stat-mono-val">1-ON-1</span>
            <span className="stat-label">FOUNDER MENTORSHIP</span>
          </div>
        </div>
      </div>
    </section>
  );
}
