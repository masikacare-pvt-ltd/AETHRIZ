import React from 'react';
import { CULTURE_PILLARS } from '../../data/careersData';

export default function LifeAtAethriz() {
  return (
    <section id="life-at-aethriz" className="life-at-aethriz-section">
      <div className="section-head-center">
        <span className="data-mono c-red">// OUR ETHOS & CULTURE</span>
        <h2 className="section-title-serif">
          Engineered for <i>Autonomy & Velocity.</i>
        </h2>
        <p className="section-subtitle">
          We operate at the convergence of deep academic research and high-velocity Silicon Valley execution.
          Here is what life looks like as a builder at AETHRIZ.
        </p>
      </div>

      <div className="culture-grid">
        {CULTURE_PILLARS.map((pillar, idx) => (
          <div key={idx} className="culture-card">
            <div className="culture-card-glare"></div>
            <div className="culture-card-header">
              <div className="culture-icon-box">
                <i className={pillar.icon}></i>
              </div>
              <span className="culture-tag-mono">{pillar.tag}</span>
            </div>
            <h3 className="culture-title">{pillar.title}</h3>
            <p className="culture-desc">{pillar.description}</p>
          </div>
        ))}
      </div>

      {/* Benefits Strip */}
      <div className="perks-strip">
        <div className="perks-strip-item">
          <i className="fa-solid fa-laptop-code"></i>
          <div>
            <strong>Top-Tier Gear</strong>
            <span>M3 Max MacBook Pro / Custom Linux & Dual 4K Displays</span>
          </div>
        </div>
        <div className="perks-strip-item">
          <i className="fa-solid fa-heart-pulse"></i>
          <div>
            <strong>Comprehensive Health</strong>
            <span>Continuous glucose monitors, full biometric screening & health coverage</span>
          </div>
        </div>
        <div className="perks-strip-item">
          <i className="fa-solid fa-clock-rotate-left"></i>
          <div>
            <strong>Flexible Asynchronous Time</strong>
            <span>No micro-management. Set your schedule around your circadian peak</span>
          </div>
        </div>
        <div className="perks-strip-item">
          <i className="fa-solid fa-graduation-cap"></i>
          <div>
            <strong>Growth Stipend</strong>
            <span>$3,000 yearly allocation for books, conferences, and courses</span>
          </div>
        </div>
      </div>
    </section>
  );
}
