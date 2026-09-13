import React, { useState, useEffect } from 'react';
import teamLeaderImg from '../assets/team-leader.png';

export default function Architects() {
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [syncState, setSyncState] = useState('99.9999');

  useEffect(() => {
    const interval = setInterval(() => {
      const val = (Math.random() * (99.9999 - 99.0) + 99.0).toFixed(4);
      setSyncState(val);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const handleToggleBio = () => {
    setIsBioOpen((prev) => !prev);
  };

  return (
    <section id="nodes" className="container">
      <div className="director-grid rv-scroll reveal-node delay-1">
        <div className="bio-expansion">
          <span className="data-mono c-red mb-20-block">[06] // STRUCTURAL DIRECTOR</span>
          <h2 className="thesis-text m-0">
            Architect of <br />
            Aethriz.
          </h2>

          <div className="dir-metrics">
            <div className="dm-node">
              <span className="dm-lbl">Auth Level</span>
              <span className="dm-val">
                <i className="fa-solid fa-shield-halved c-accent"></i> OMEGA-9
              </span>
            </div>
            <div className="dm-node">
              <span className="dm-lbl">Neural Hash</span>
              <span className="dm-val">0xVP.78F2</span>
            </div>
            <div className="dm-node">
              <span className="dm-lbl">Sync State</span>
              <span className="dm-val live-rnd" data-min="99" data-max="99" data-dec="4">
                {syncState}
                <span>%</span>
              </span>
            </div>
          </div>

          <button
            className="btn-apex decrypt-bio-btn"
            id="bioToggleBtn"
            onClick={handleToggleBio}
          >
            {isBioOpen ? (
              <>
                LOCK PROFILE <i className="fa-solid fa-microchip fs-075 ml-8"></i>
              </>
            ) : (
              <>
                DECRYPT PROFILE <i className="fa-solid fa-fingerprint fs-075 ml-8"></i>
              </>
            )}
          </button>

          <div className={`unlocked-data ${isBioOpen ? 'is-open' : ''}`} id="bioTextWrap">
            Driving the frontier where deep learning and AI-powered health intelligence meet everyday wellness,
            Vishma Pasayat leads the vision of building a Healthier Bharat. By transforming complex laboratory
            metrics and lifestyle patterns into actionable, personalized guidance, AETHRIZ empowers individuals
            across languages, communities, and diverse backgrounds to make proactive health decisions before problems escalate.
          </div>
        </div>

        <div className="person-container cinematic ceo-card">
          <div className="frame-corners"></div>

          <img
            src={teamLeaderImg}
            alt="Vishma Pasayat"
            className="ceo-img"
          />

          <div className="bio-canvas c1"></div>

          <div className="pr-overlay">
            <h4 className="p-name">Vishma Pasayat</h4>
            <p className="pn-desc pr-role">System Architect & CEO</p>
          </div>
        </div>
      </div>
    </section>
  );
}
