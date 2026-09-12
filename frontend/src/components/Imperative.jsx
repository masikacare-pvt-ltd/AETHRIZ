import React from 'react';

export default function Imperative() {
  return (
    <section id="journey" className="container rv-scroll reveal-node">
      <div className="imperative-grid">
        <div className="align-left-header max-w-none">
          <span className="data-mono c-red mb-20-block">[04] // THE IMPERATIVE</span>
          <h2 className="thesis-text mb-30">
            Beyond Standard <br />
            Healthcare.
          </h2>
          <div className="imperative-desc">
            We engineered a paradigm where human biological limits are treated as mere variables. Through
            psychological anchoring and deep physiological mapping, we bridge the chasm between raw survival and
            absolute optimization. <br />
            <br />
            This is not medicine; it is an algorithmic rebirth designed to outpace mortality natively and
            accurately executing systemic evolution algorithms perfectly calculated.
          </div>
        </div>

        {/* Highly Advanced SVG Interactive Graphics Area */}
        <div className="imp-interactive-svg">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ maxWidth: '100%', overflow: 'visible' }}
          >
            <defs>
              <filter id="ae-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <radialGradient id="ae-depth" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E81A2D" stopOpacity="0.04" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ae-glass" x1="0" y1="0" x2="400" y2="400">
                <stop offset="0%" stopColor="var(--ink)" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#fff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--ink)" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            <circle cx="200" cy="200" r="190" fill="url(#ae-depth)" />

            <g className="ae-spin-sl" opacity="0.4">
              <circle
                cx="200"
                cy="200"
                r="185"
                stroke="var(--ink)"
                strokeWidth="0.5"
                strokeDasharray="1 8"
              />
              <circle cx="200" cy="15" r="2.5" fill="var(--ink)" />
              <path d="M190 5 Q 200 15 210 5" stroke="var(--ink)" strokeWidth="0.5" fill="none" />
            </g>

            <g className="ae-spin-sr" opacity="0.6">
              <circle
                cx="200"
                cy="200"
                r="150"
                stroke="rgba(7,9,15,0.4)"
                strokeWidth="1.5"
                strokeDasharray="90 30"
              />
              <path
                d="M 50 200 A 150 150 0 0 1 70 120"
                stroke="var(--accent-red)"
                strokeWidth="3"
                fill="none"
                filter="url(#ae-glow)"
                strokeLinecap="round"
              />
              <circle cx="50" cy="200" r="4" fill="var(--accent-red)" />
            </g>

            <g opacity="0.75">
              <line
                x1="200"
                y1="20"
                x2="200"
                y2="380"
                stroke="rgba(7,9,15,0.08)"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
              <line
                x1="20"
                y1="200"
                x2="380"
                y2="200"
                stroke="rgba(7,9,15,0.08)"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />

              <circle cx="200" cy="200" r="115" stroke="rgba(7,9,15,0.15)" strokeWidth="1" />

              <g className="ae-spin-sl">
                <polygon
                  points="200,85 295,255 105,255"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="1"
                  strokeLinejoin="round"
                  opacity="0.3"
                  strokeDasharray="4 12"
                />
              </g>
            </g>

            <g className="ae-pulse ae-core-glow">
              <circle
                cx="200"
                cy="200"
                r="75"
                fill="rgba(255,255,255,0.8)"
                stroke="url(#ae-glass)"
                strokeWidth="1.5"
                style={{ backdropFilter: 'blur(8px)' }}
              />
              <circle cx="200" cy="200" r="70" fill="none" stroke="rgba(7,9,15,0.05)" strokeWidth="0.5" />

              <g className="ae-geom-morph">
                <polygon
                  points="175,140 225,140 260,175 260,225 225,260 175,260 140,225 140,175"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="1.5"
                  strokeDasharray="8 4"
                />
                <polygon
                  points="180,150 220,150 250,180 250,220 220,250 180,250 150,220 150,180"
                  fill="none"
                  stroke="var(--accent-red)"
                  strokeWidth="1"
                  opacity="0.8"
                />

                <line x1="200" y1="125" x2="200" y2="135" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
                <line x1="200" y1="275" x2="200" y2="265" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
                <line x1="125" y1="200" x2="135" y2="200" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
                <line x1="275" y1="200" x2="265" y2="200" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />

                <circle cx="240" cy="160" r="2.5" fill="var(--accent-red)" filter="url(#ae-glow)" />
                <circle cx="160" cy="240" r="2.5" fill="var(--accent-red)" filter="url(#ae-glow)" />
              </g>

              <circle cx="200" cy="200" r="16" fill="var(--ink)" />
              <circle
                cx="200"
                cy="200"
                r="10"
                fill="none"
                stroke="var(--accent-red)"
                strokeWidth="2"
                className="ae-dash"
              />
              <circle cx="200" cy="200" r="4" fill="var(--accent-red)" filter="url(#ae-glow)" />
            </g>

            <g
              fontFamily="'JetBrains Mono', monospace"
              fontSize="8"
              fill="rgba(7,9,15,0.4)"
              letterSpacing="0.2em"
              fontWeight="700"
            >
              <text x="350" y="385">
                M::SYNC
              </text>
              <text x="40" y="385">
                AE::002
              </text>
              <text x="175" y="45" opacity="0.6">
                N-0101[LIVE]
              </text>
              <line x1="330" y1="382" x2="340" y2="382" stroke="rgba(7,9,15,0.2)" strokeWidth="1" />
              <line x1="90" y1="382" x2="100" y2="382" stroke="rgba(7,9,15,0.2)" strokeWidth="1" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
