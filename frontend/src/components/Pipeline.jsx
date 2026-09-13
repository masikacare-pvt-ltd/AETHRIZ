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
      title: '01 — SCAN',
      desc: 'Upload or scan your health reports and relevant health information. AETHRIZ converts complex health data into structured information that AI can understand.',
    },
    {
      idx: 'II',
      title: '02 — ANALYZE',
      desc: 'Our deep-learning models process your health parameters, patterns, lifestyle, and dietary information to understand your overall health profile.',
    },
    {
      idx: 'III',
      title: '03 — INTERPRET',
      desc: 'AETHRIZ translates complex medical and health data into simple, understandable insights. No confusing medical jargon—just clarity you can act on.',
    },
    {
      idx: 'IV',
      title: '04 — PERSONALIZE',
      desc: 'The AI generates recommendations based on your specific health profile, food habits, lifestyle, age, and needs—designed for you, not an average person.',
    },
    {
      idx: 'V',
      title: '05 — GUIDE',
      desc: 'AETHRIZ helps you make better everyday decisions around nutrition, lifestyle, and preventive health. Turn health data into practical actions.',
    },
  ];

  return (
    <section id="vector" className="container">
      <div className="bg-inverted rv-scroll">
        <div className="align-left-header rv-scroll reveal-node delay-1 mb-20">
          <span className="data-mono c-red mb-20">[03] // HOW AETHRIZ WORKS</span>
          <h2 className="thesis-text thesis-ink-mb20">
            From Health Data <br />
            to Health Action.
          </h2>
          <p className="mc-desc desc-gray-500">
            A seamless algorithmic progression that turns complex medical data into practical, everyday lifestyle guidance.
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
