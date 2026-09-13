import React from 'react';

export default function Resonance() {
  return (
    <section id="resonance" className="container rv-scroll reveal-node">
      <div className="align-left-header mb-60">
        <span className="data-mono c-red mb-20-block">[05] // PURPOSE & DIRECTIVE</span>
        <h2 className="thesis-text mb-10">
          Mission & Vision <br />
          for Bharat.
        </h2>
      </div>

      <div className="resonance-card-grid">
        {/* Card 1: Our Mission */}
        <div className="rc-box mag-tgt delay-1">
          <div className="rc-graph">
            <svg viewBox="0 0 100 100" className="elite-svg-core">
              <defs>
                <linearGradient id="redFade" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E81A2D" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#E81A2D" stopOpacity="0" />
                </linearGradient>
                <filter id="esGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Ambient Orbiters */}
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(7,9,15,0.04)" strokeWidth="0.5" />
              <path
                d="M 8 50 A 42 42 0 0 1 92 50"
                fill="none"
                stroke="rgba(7,9,15,0.15)"
                strokeWidth="0.25"
                strokeDasharray="1 3"
                className="es-ring-1"
              />

              {/* Counter-rotating precise dial */}
              <circle
                cx="50"
                cy="50"
                r="32"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="0.5"
                strokeDasharray="10 2 1 2"
                className="es-ring-2"
              />

              {/* Accelerator Ring */}
              <circle
                cx="50"
                cy="50"
                r="26"
                fill="none"
                stroke="var(--accent-red)"
                strokeWidth="0.25"
                strokeDasharray="40 60"
                className="es-accel-ring"
              />

              {/* The Core Crystal */}
              <g className="es-core-crystal">
                <path d="M50 20 L65 50 L50 80 L35 50 Z" fill="none" stroke="url(#redFade)" strokeWidth="0.75" />
                <path
                  d="M50 30 L58 50 L50 70 L42 50 Z"
                  fill="rgba(232, 26, 45, 0.05)"
                  stroke="var(--accent-red)"
                  strokeWidth="0.5"
                  filter="url(#esGlow)"
                />
                <circle cx="50" cy="50" r="2.5" fill="#FFF" filter="url(#esGlow)" />
              </g>

              {/* Micro data node orbiting */}
              <g className="es-orbit-node">
                <circle cx="50" cy="8" r="1.5" fill="var(--ink)" />
              </g>
            </svg>
          </div>
          <div className="rc-meta cinematic-text-anim">
            <span style={{ transitionDelay: '0.1s' }} className="data-mono c-red">
              05 // OUR MISSION
            </span>
          </div>
          <h4 className="rc-title cinematic-text-anim">
            <span style={{ transitionDelay: '0.2s' }}>Mission — Healthier Bharat</span>
          </h4>
          <div className="rc-line"></div>
          <p className="rc-desc cinematic-text-anim">
            <span style={{ transitionDelay: '0.4s' }}>
              To make intelligent, personalized, and understandable healthcare accessible to every person in Bharat—using AI, deep learning, and technology to turn health data into better everyday decisions.
            </span>
          </p>
        </div>

        {/* Card 2: Our Vision */}
        <div className="rc-box mag-tgt delay-2">
          <div className="rc-graph">
            <svg viewBox="0 0 100 100" className="elite-svg-core">
              <defs>
                <filter id="esGlowBeta" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Sine Wave Matrix */}
              <g className="es-wave-matrix">
                <path d="M -10 50 Q 25 10 50 50 T 110 50" fill="none" stroke="rgba(7,9,15,0.05)" strokeWidth="1" />
                <path d="M -10 50 Q 25 90 50 50 T 110 50" fill="none" stroke="rgba(7,9,15,0.05)" strokeWidth="1" />

                <path
                  d="M -10 50 Q 25 10 50 50 T 110 50"
                  fill="none"
                  stroke="var(--accent-red)"
                  strokeWidth="0.75"
                  className="es-wave-tracer-1"
                />
                <path
                  d="M -10 50 Q 25 90 50 50 T 110 50"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="0.5"
                  className="es-wave-tracer-2"
                />
              </g>

              {/* Neural Intersect Core */}
              <circle cx="50" cy="50" r="18" fill="none" stroke="rgba(7,9,15,0.1)" strokeWidth="0.25" />
              <circle
                cx="50"
                cy="50"
                r="18"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="0.5"
                strokeDasharray="1 4"
                className="es-ring-1"
              />

              <circle
                cx="50"
                cy="50"
                r="12"
                fill="none"
                stroke="var(--accent-red)"
                strokeWidth="0.25"
                className="es-ring-pulse"
              />

              {/* Splice Points */}
              <g className="es-splice-points">
                <circle cx="31" cy="35" r="1.5" fill="var(--ink)" />
                <line
                  x1="31"
                  y1="35"
                  x2="50"
                  y2="50"
                  stroke="rgba(7,9,15,0.2)"
                  strokeWidth="0.5"
                  className="es-line-connect"
                />

                <circle cx="69" cy="65" r="2" fill="var(--accent-red)" filter="url(#esGlowBeta)" />
                <line
                  x1="69"
                  y1="65"
                  x2="50"
                  y2="50"
                  stroke="rgba(232,26,45,0.3)"
                  strokeWidth="0.5"
                  className="es-line-connect-red"
                />
              </g>

              <circle cx="50" cy="50" r="3" fill="var(--ink)" />
              <circle cx="50" cy="50" r="1" fill="#FFF" />
            </svg>
          </div>
          <div className="rc-meta cinematic-text-anim">
            <span style={{ transitionDelay: '0.3s' }} className="data-mono c-red">
              06 // OUR VISION
            </span>
          </div>
          <h4 className="rc-title cinematic-text-anim">
            <span style={{ transitionDelay: '0.4s' }}>Vision — Powered by Intelligence</span>
          </h4>
          <div className="rc-line"></div>
          <p className="rc-desc cinematic-text-anim">
            <span style={{ transitionDelay: '0.6s' }}>
              To build a future where every individual can understand their health, receive personalized guidance, and make informed decisions before health problems become bigger problems. AETHRIZ envisions an intelligent healthcare ecosystem where technology doesn't replace human care—it makes better care more accessible, personal, and proactive.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
