import React from 'react';

export default function Syntax() {
  return (
    <section id="syntax">
      <div className="container mega-grid">
        <div className="sticky-column rv-scroll reveal-node">
          <span className="data-mono c-red mb-20-block">[01] // INTELLIGENT HEALTH SERVICES</span>
          <h2 className="thesis-text">
            Intelligent Health,
            <br />
            Personalized <strong>for You.</strong>
          </h2>
          <p className="mc-desc desc-max-400">
            Using deep learning and cutting-edge AI, we help people understand their health better, make smarter
            daily choices, and work toward a healthier life—regardless of age, diet, language, or location.
          </p>
        </div>

        <div className="module-deck">
          {/* Card I: Personalized */}
          <div className="module-card card-3d mag-tgt rv-scroll reveal-node">
            <span className="mc-idx">I</span>
            <div className="mc-text-block">
              <div className="mc-icon">
                <svg viewBox="0 0 40 40" style={{ overflow: 'visible' }}>
                  <g className="svg-poly-spin" style={{ transformOrigin: '20px 20px' }}>
                    <polygon
                      points="20,2 38,11 38,29 20,38 2,29 2,11"
                      fill="none"
                      stroke="rgba(7,9,15,0.15)"
                      strokeWidth="1.5"
                    />
                    <polygon
                      points="20,5 34,13 34,27 20,35 6,27 6,13"
                      fill="none"
                      stroke="var(--ink)"
                      strokeWidth="1"
                      strokeDasharray="2 4"
                    />
                  </g>
                  <circle
                    cx="20"
                    cy="20"
                    r="8"
                    fill="none"
                    stroke="var(--ink)"
                    strokeWidth="2"
                    strokeDasharray="10 15"
                    className="svg-pulse-line"
                  />
                  <path
                    d="M10 20 L14 20 L17 12 L21 28 L24 20 L30 20"
                    fill="none"
                    stroke="var(--accent-red)"
                    strokeWidth="1.5"
                    className="elite-glow"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="mc-title">01 — Personalized</h3>
              <p className="mc-desc">
                Health recommendations built around your unique health data, lifestyle, dietary habits, and individual needs.
              </p>
            </div>
            <div className="mc-graph">
              <svg width="100%" height="100px" viewBox="0 0 200 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradientRedLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="#E81A2D" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path d="M0,50 L200,50 M0,25 L200,25 M0,75 L200,75" stroke="rgba(7,9,15,0.05)" strokeWidth="1" />
                <path
                  d="M-50,80 Q25,0 100,80 T250,80 T400,80"
                  fill="none"
                  stroke="rgba(232, 26, 45, 0.15)"
                  strokeWidth="3"
                  className="elite-wave"
                />
                <path
                  d="M0,60 C40,60 50,30 70,80 C90,120 120,20 150,60 C170,80 200,60 200,60"
                  fill="none"
                  stroke="url(#gradientRedLine)"
                  strokeWidth="2.5"
                  className="elite-glow svg-pulse-line"
                />
                <circle cx="110" cy="38" r="4" fill="#FFF" stroke="var(--accent-red)" strokeWidth="2" className="elite-glow" />
              </svg>
            </div>
          </div>

          {/* Card II: Multilingual */}
          <div className="module-card card-3d mag-tgt rv-scroll reveal-node delay-1">
            <span className="mc-idx">II</span>
            <div className="mc-text-block">
              <div className="mc-icon">
                <svg viewBox="0 0 40 40" style={{ overflow: 'visible' }}>
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    fill="none"
                    stroke="rgba(7,9,15,0.1)"
                    strokeWidth="1.5"
                    className="svg-poly-spin-rev"
                  />
                  <path
                    d="M 20 4 C 36 4 36 24 20 36 C 4 24 4 4 20 4 Z"
                    fill="none"
                    stroke="var(--ink)"
                    strokeWidth="1.5"
                    strokeDasharray="60 100"
                    className="svg-pulse-line"
                  />
                  <path
                    d="M 12 16 Q 20 8 28 16 Q 28 26 20 32 Q 12 26 12 16"
                    fill="none"
                    stroke="var(--accent-red)"
                    strokeWidth="1"
                  />
                  <circle
                    cx="20"
                    cy="18"
                    r="3"
                    fill="var(--accent-red)"
                    className="elite-glow elite-orbit-fast"
                    style={{ transformOrigin: '20px 20px' }}
                  />
                </svg>
              </div>
              <h3 className="mc-title">02 — Multilingual</h3>
              <p className="mc-desc">
                Designed to make AI-powered healthcare accessible across multiple Indian languages and diverse communities.
              </p>
            </div>
            <div className="mc-graph">
              <svg width="100%" height="100px" viewBox="0 0 200 100">
                <path
                  d="M50,50 A 40,40 0 1,1 150,50 A 40,40 0 1,1 50,50"
                  fill="none"
                  stroke="rgba(7,9,15,0.06)"
                  strokeWidth="4"
                />
                <path
                  d="M50,50 A 40,40 0 1,1 150,50 A 40,40 0 1,1 50,50"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="2"
                  strokeDasharray="30 220"
                  className="svg-pulse-line"
                />
                <path
                  d="M70,50 A 20,20 0 1,0 130,50 A 20,20 0 1,0 70,50"
                  fill="none"
                  stroke="var(--accent-red)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                  className="elite-orbit-slow"
                  style={{ transformOrigin: '100px 50px' }}
                />
                <line
                  x1="100"
                  y1="50"
                  x2="135"
                  y2="35"
                  stroke="var(--accent-red)"
                  strokeWidth="1"
                  className="svg-poly-spin-rev"
                  style={{ transformOrigin: '100px 50px' }}
                />
                <circle cx="100" cy="50" r="3" fill="#FFF" stroke="var(--accent-red)" strokeWidth="2" className="elite-glow" />
              </svg>
            </div>
          </div>

          {/* Card III: Predictive */}
          <div className="module-card card-3d mag-tgt rv-scroll reveal-node delay-2">
            <span className="mc-idx">III</span>
            <div className="mc-text-block">
              <div className="mc-icon">
                <svg viewBox="0 0 40 40" style={{ overflow: 'visible' }}>
                  <g className="svg-poly-spin" style={{ transformOrigin: '20px 20px' }}>
                    <rect
                      x="6"
                      y="6"
                      width="28"
                      height="28"
                      fill="none"
                      stroke="rgba(7,9,15,0.15)"
                      strokeWidth="1.5"
                      transform="rotate(45 20 20)"
                    />
                    <rect
                      x="10"
                      y="10"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="var(--ink)"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                      transform="rotate(22.5 20 20)"
                    />
                  </g>
                  <circle
                    cx="20"
                    cy="20"
                    r="6"
                    fill="none"
                    stroke="var(--ink)"
                    strokeWidth="1.5"
                    strokeDasharray="15 20"
                    className="svg-pulse-line"
                  />
                  <circle cx="20" cy="20" r="3" fill="var(--accent-red)" className="elite-glow" />
                  <path
                    d="M 20 0 L 20 8 M 20 32 L 20 40 M 0 20 L 8 20 M 32 20 L 40 20"
                    stroke="var(--accent-red)"
                    strokeWidth="1"
                    opacity="0.8"
                    className="elite-glow"
                  />
                </svg>
              </div>
              <h3 className="mc-title">03 — Predictive</h3>
              <p className="mc-desc">
                Deep-learning models analyze health patterns to identify potential risks and provide proactive health insights.
              </p>
            </div>
            <div className="mc-graph">
              <svg width="100%" height="100px" viewBox="0 0 200 100">
                <g className="svg-poly-spin" style={{ transformOrigin: '100px 50px' }}>
                  <polygon points="100,20 140,80 60,80" fill="none" stroke="rgba(7,9,15,0.15)" strokeWidth="1" />
                  <polygon points="100,25 130,70 70,70" fill="none" stroke="var(--ink)" strokeWidth="2" strokeDasharray="5 15" />
                </g>
                <g className="svg-poly-spin-rev" style={{ transformOrigin: '100px 50px' }}>
                  <polygon
                    points="100,80 135,30 65,30"
                    fill="none"
                    stroke="rgba(232,26,45,0.4)"
                    strokeWidth="2"
                    className="elite-glow"
                  />
                  <circle cx="100" cy="53" r="5" fill="var(--accent-red)" className="elite-glow" />
                  <line x1="100" y1="53" x2="100" y2="80" stroke="var(--ink)" strokeWidth="1" />
                </g>
              </svg>
            </div>
          </div>

          {/* Card IV: Precise */}
          <div className="module-card card-3d mag-tgt rv-scroll reveal-node delay-1">
            <span className="mc-idx">IV</span>
            <div className="mc-text-block">
              <div className="mc-icon">
                <svg viewBox="0 0 40 40" style={{ overflow: 'visible' }}>
                  <path d="M 4 36 Q 20 4 36 36" fill="none" stroke="rgba(7,9,15,0.15)" strokeWidth="2" />
                  <path
                    d="M 4 4 Q 20 36 36 4"
                    fill="none"
                    stroke="var(--ink)"
                    strokeWidth="1.5"
                    strokeDasharray="6 6"
                    className="svg-pulse-line"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="10"
                    fill="none"
                    stroke="var(--ink)"
                    strokeWidth="1"
                    strokeDasharray="2 4"
                    className="svg-poly-spin"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="3"
                    fill="none"
                    stroke="var(--accent-red)"
                    strokeWidth="2"
                    className="elite-glow elite-orbit-slow"
                    style={{ transformOrigin: '20px 20px' }}
                  />
                  <circle cx="20" cy="20" r="1.5" fill="var(--accent-red)" />
                  <line
                    x1="15"
                    y1="20"
                    x2="25"
                    y2="20"
                    stroke="var(--accent-red)"
                    strokeWidth="1"
                    className="svg-poly-spin-rev"
                    style={{ transformOrigin: '20px 20px' }}
                  />
                </svg>
              </div>
              <h3 className="mc-title">04 — Precise</h3>
              <p className="mc-desc">
                Our AI models are designed for high-performance health-data analysis, with reported accuracy of up to 98.9% in applicable validated model evaluations.
              </p>
            </div>
            <div className="mc-graph">
              <svg width="100%" height="100px" viewBox="0 0 200 100">
                <path
                  d="M-10,50 Q40,-10 90,50 T190,50 T290,50"
                  fill="none"
                  stroke="rgba(7,9,15,0.08)"
                  strokeWidth="6"
                />
                <path
                  d="M-10,50 Q40,-10 90,50 T190,50 T290,50"
                  className="telomere-loop"
                  stroke="var(--accent-red)"
                  strokeWidth="2"
                />
                <path
                  d="M-10,50 Q40,110 90,50 T190,50 T290,50"
                  className="telomere-loop telomere-loop-rev"
                  stroke="var(--ink)"
                  strokeWidth="1.5"
                />
                <circle cx="90" cy="50" r="3" fill="var(--pure-white)" stroke="var(--accent-red)" strokeWidth="2" className="elite-glow" />
                <line
                  x1="90"
                  y1="20"
                  x2="90"
                  y2="80"
                  stroke="rgba(232, 26, 45, 0.4)"
                  strokeDasharray="2 2"
                  strokeWidth="1"
                  className="svg-poly-spin-rev"
                  style={{ transformOrigin: '90px 50px' }}
                />
              </svg>
            </div>
          </div>

          {/* Card V: Adaptive */}
          <div className="module-card card-3d mag-tgt rv-scroll reveal-node delay-2">
            <span className="mc-idx">V</span>
            <div className="mc-text-block">
              <div className="mc-icon">
                <svg viewBox="0 0 40 40" style={{ overflow: 'visible' }}>
                  <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(7,9,15,0.06)" strokeWidth="0.75" />
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    fill="none"
                    stroke="rgba(7,9,15,0.1)"
                    strokeWidth="1"
                    strokeDasharray="2 6 8 2"
                    className="svg-poly-spin"
                    style={{ animationDuration: '25s', transformOrigin: '20px 20px' }}
                  />
                  <g className="svg-poly-spin" style={{ animationDuration: '15s', transformOrigin: '20px 20px' }}>
                    <ellipse
                      cx="20"
                      cy="20"
                      rx="14"
                      ry="4"
                      fill="none"
                      stroke="var(--ink)"
                      strokeWidth="1.2"
                      transform="rotate(45 20 20)"
                    />
                    <circle cx="10" cy="10" r="2" fill="var(--accent-red)" className="elite-glow" />
                    <circle cx="30" cy="30" r="1" fill="var(--ink)" />
                  </g>
                  <g className="svg-poly-spin-rev" style={{ animationDuration: '18s', transformOrigin: '20px 20px' }}>
                    <ellipse
                      cx="20"
                      cy="20"
                      rx="14"
                      ry="4"
                      fill="none"
                      stroke="var(--accent-red)"
                      strokeWidth="1.2"
                      opacity="0.6"
                      strokeDasharray="2 3"
                      transform="rotate(-45 20 20)"
                    />
                    <circle cx="30" cy="10" r="1.5" fill="var(--ink)" />
                  </g>
                  <circle cx="20" cy="20" r="4.5" fill="none" stroke="var(--ink)" strokeWidth="1" />
                  <circle cx="20" cy="20" r="2.5" fill="#FFF" className="svg-pulse-line" />
                  <circle cx="20" cy="20" r="1.5" fill="var(--accent-red)" className="elite-glow" />
                </svg>
              </div>
              <h3 className="mc-title">05 — Adaptive</h3>
              <p className="mc-desc">
                Your recommendations evolve with your health data, lifestyle, and changing needs—rather than following a one-size-fits-all approach.
              </p>
            </div>
            <div className="mc-graph">
              <svg width="100%" height="100px" viewBox="0 0 200 100" style={{ overflow: 'visible' }}>
                <g className="svg-poly-spin" style={{ transformOrigin: '100px 50px', animationDuration: '20s' }}>
                  <ellipse
                    cx="100"
                    cy="50"
                    rx="65"
                    ry="18"
                    fill="none"
                    stroke="rgba(7,9,15,0.08)"
                    strokeWidth="1.5"
                    transform="rotate(25 100 50)"
                  />
                  <circle cx="35" cy="50" r="2.5" fill="var(--ink)" transform="rotate(25 100 50)" />
                </g>
                <g className="svg-poly-spin-rev" style={{ transformOrigin: '100px 50px', animationDuration: '15s' }}>
                  <ellipse
                    cx="100"
                    cy="50"
                    rx="65"
                    ry="18"
                    fill="none"
                    stroke="var(--accent-red)"
                    strokeWidth="1.5"
                    strokeDasharray="6 12"
                    transform="rotate(-35 100 50)"
                  />
                  <circle cx="165" cy="50" r="3" fill="var(--accent-red)" className="elite-glow" transform="rotate(-35 100 50)" />
                </g>
                <circle
                  cx="100"
                  cy="50"
                  r="8"
                  fill="rgba(232,26,45,0.1)"
                  stroke="var(--accent-red)"
                  strokeWidth="1"
                  className="elite-glow svg-poly-spin"
                  strokeDasharray="4 4"
                  style={{ transformOrigin: '100px 50px', animationDuration: '10s' }}
                />
                <circle cx="100" cy="50" r="3" fill="#FFF" />
                <circle cx="100" cy="50" r="1" fill="var(--accent-red)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
