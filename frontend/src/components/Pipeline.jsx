import React from 'react';

export default function Pipeline() {
  const strandsCountHoriz = 55;
  const horizontalRungs = Array.from({ length: strandsCountHoriz }, (_, i) => ({
    left: `${(i / (strandsCountHoriz - 1)) * 100}%`,
    transform: `translateY(-50%) rotateX(${i * 18}deg)`,
  }));

  const pipelineNodes = [
    {
      idx: 'I',
      title: 'Ingest Logic',
      desc: 'Mass input framework reading exact DNA configurations alongside systemic stress histories smoothly.',
    },
    {
      idx: 'II',
      title: 'Vector Plot',
      desc: 'Establishing exact routes to deploy micro-interventions through the bloodstream precisely.',
    },
    {
      idx: 'III',
      title: 'Bio Trial',
      desc: 'Advanced chronometric simulators calculate stress ruptures extending probabilistic logic entirely.',
    },
    {
      idx: 'IV',
      title: 'Neural Splice',
      desc: 'Interweaving newly synthesized habits natively into baseline rewards bypassing resistance natively.',
    },
    {
      idx: 'V',
      title: 'Arc Push',
      desc: 'Generating executable habit maps actively pushed direct synchronizing microscopic routines.',
    },
  ];

  return (
    <section id="vector" className="container">
      <div className="bg-inverted rv-scroll">
        <div className="align-left-header rv-scroll reveal-node delay-1 mb-20">
          <span className="data-mono c-red mb-20">[03] // ALGORITHMIC TIMELINE</span>
          <h2 className="thesis-text thesis-ink-mb20">
            Flawless Logical <br />
            Convergence.
          </h2>
          <p className="mc-desc desc-gray-500">
            Automating organic reconstruction flawlessly scaling upward inherently translating bio-noise
            accurately to logic operations natively.
          </p>
        </div>

        <div className="pipe-layout-container pipe-nodes rv-scroll reveal-node delay-1">
          {/* 3D CSS Horizontal Tracking Engine */}
          <div className="timeline-dna-wrap">
            <div className="timeline-dna-core" id="cssDnaWrapHoriz">
              {horizontalRungs.map((rung, i) => (
                <div
                  key={i}
                  className="dna-rung horiz-rung"
                  style={{
                    left: rung.left,
                    transform: rung.transform,
                  }}
                >
                  <div className="dna-d1"></div>
                  <div className="dna-d2"></div>
                </div>
              ))}
            </div>
          </div>

          {pipelineNodes.map((node) => (
            <div key={node.idx} className="p-node">
              <div className="node-circle mag-tgt">{node.idx}</div>
              <h4 className="pn-title">{node.title}</h4>
              <p className="pn-desc">{node.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
