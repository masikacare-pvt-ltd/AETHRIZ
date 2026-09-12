import React, { useState, useEffect } from 'react';

export default function Telemetry() {
  const [hemodynamic, setHemodynamic] = useState('284.2');
  const [isotopic, setIsotopic] = useState('88.45');
  const [vectorWashout, setVectorWashout] = useState('4.092');

  // Dynamic EQ Bar heights state
  const [eqHeights1, setEqHeights1] = useState(
    () => Array.from({ length: 16 }, () => Math.floor(Math.random() * 85) + 5)
  );
  const [eqHeights2, setEqHeights2] = useState(
    () => Array.from({ length: 12 }, () => Math.floor(Math.random() * 85) + 5)
  );

  useEffect(() => {
    // Numbers interval
    const numInterval = setInterval(() => {
      setHemodynamic((Math.random() * (350 - 200) + 200).toFixed(1));
      setIsotopic((Math.random() * (99 - 10) + 10).toFixed(2));
      setVectorWashout((Math.random() * (9 - 1) + 1).toFixed(3));
    }, 800);

    // Heights interval (300ms)
    const eqInterval = setInterval(() => {
      setEqHeights1(Array.from({ length: 16 }, () => Math.floor(Math.random() * 85) + 5));
      setEqHeights2(Array.from({ length: 12 }, () => Math.floor(Math.random() * 85) + 5));
    }, 300);

    return () => {
      clearInterval(numInterval);
      clearInterval(eqInterval);
    };
  }, []);

  // 45 wave bars
  const waveBarsCount = 45;

  return (
    <section id="telemetry" className="container rv-scroll reveal-node">
      <div className="align-left-header">
        <span className="data-mono c-red mb-20-block">[02] // LIVE SYNAPTIC OBSERVATION</span>
        <h2 className="thesis-text mb-10">
          Real-Time Cellular <br />
          Telemetry.
        </h2>
      </div>

      <div className="telemetry-grid">
        {/* Card 1: Hemodynamic Viscosity */}
        <div className="data-card card-3d mag-tgt span-7">
          <div className="data-head">
            <span className="dt-title">Hemodynamic Viscosity</span>
            <span className="live-badge">LIVE</span>
          </div>
          <span className="big-live-num live-rnd" data-min="200" data-max="350" data-dec="1">
            {hemodynamic}
          </span>
          <p className="mc-desc desc-sm-85">
            Processing sub-beats per analysis framework actively suppressing micro-clots natively.
          </p>
          <div className="eq-bars-pro" id="dynamicEq1">
            {eqHeights1.map((height, i) => (
              <div key={i} className="eq-bp">
                <div
                  className={`eq-bf dyn-ht ${i % 6 === 0 ? 'red' : ''}`}
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Isotopic Mesh */}
        <div className="data-card card-3d mag-tgt span-5">
          <div className="data-head">
            <span className="dt-title">Isotopic Mesh</span>
            <span className="live-badge">LIVE</span>
          </div>
          <span className="big-live-num live-rnd" data-min="10" data-max="99" data-dec="2">
            {isotopic}
          </span>
          <p className="mc-desc desc-sm">
            Direct manipulation of intrinsic amino clusters driving cellular division boundaries.
          </p>
          <div className="eq-bars-pro" id="dynamicEq2">
            {eqHeights2.map((height, i) => (
              <div key={i} className="eq-bp">
                <div
                  className={`eq-bf dyn-ht ${i % 4 === 0 ? 'red' : ''}`}
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Vector Washout Synch */}
        <div className="data-card card-3d mag-tgt span-12">
          <div className="flex-1">
            <div className="data-head max-w-250">
              <span className="dt-title">Vector Washout Synch</span>
              <span className="live-badge">LIVE</span>
            </div>
            <span className="big-live-num live-rnd" data-min="1" data-max="9" data-dec="3">
              {vectorWashout}
            </span>
            <p className="mc-desc desc-sm-350">
              Total neural washout synchronization eliminating toxic metabolite layers deposited throughout
              cognitive operation hours strictly.
            </p>
          </div>

          <div className="wave-graph-advanced" id="advWaveSystem">
            {Array.from({ length: waveBarsCount }, (_, k) => (
              <div
                key={k}
                className="wave-bar-pro"
                style={{ animationDelay: `${(k * 0.06).toFixed(2)}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
