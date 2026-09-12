import React, { useEffect, useRef, useState } from 'react';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

function useScramble(targetText, trigger) {
  const [displayText, setDisplayText] = useState(targetText);

  useEffect(() => {
    if (!trigger) return;

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((char, index) => {
            if (index < iterations) return targetText[index];
            return LETTERS[Math.floor(Math.random() * LETTERS.length)];
          })
          .join('')
      );

      if (iterations >= targetText.length) {
        clearInterval(interval);
      }
      iterations += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [targetText, trigger]);

  return displayText;
}

export default function Hero({ isLoaded }) {
  const reactorRef = useRef(null);
  const hyperText = useScramble('Hyper-Optimize', isLoaded);
  const synthText = useScramble('Synthesis.', isLoaded);

  // Live randomized data
  const [purity, setPurity] = useState('99.999');
  const [latency, setLatency] = useState('45');

  useEffect(() => {
    const interval = setInterval(() => {
      // Purity (99.000 to 99.999)
      const purVal = (Math.random() * (99.999 - 99.0) + 99.0).toFixed(3);
      setPurity(purVal);

      // Latency (10 to 90)
      const latVal = Math.floor(Math.random() * (90 - 10) + 10);
      setLatency(latVal.toString());
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Reactor mouse interaction & tilt
  useEffect(() => {
    const reactor = reactorRef.current;
    if (!reactor) return;

    const handleMouseEnter = () => {
      document.body.classList.add('dna-cursor-active');
    };

    const handleMouseLeave = () => {
      document.body.classList.remove('dna-cursor-active');
    };

    const handleWindowMouseMove = (e) => {
      const rx = (e.clientX / window.innerWidth - 0.5) * 20;
      const ry = (e.clientY / window.innerHeight - 0.5) * 20;
      reactor.style.transform = `perspective(2000px) rotateX(${-ry}deg) rotateY(${rx}deg)`;
    };

    reactor.addEventListener('mouseenter', handleMouseEnter);
    reactor.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      reactor.removeEventListener('mouseenter', handleMouseEnter);
      reactor.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      document.body.classList.remove('dna-cursor-active');
    };
  }, []);

  // Generate 36 DNA rungs
  const strandsCount = 36;
  const dnaRungs = Array.from({ length: strandsCount }, (_, i) => ({
    top: `${(i / (strandsCount - 1)) * 100}%`,
    transform: `rotateY(${i * 18}deg)`,
  }));

  const handleCompileClick = () => {
    window.location.href = '/login';
  };

  return (
    <section className="hero-stage">
      <div className="container h-layout">
        <div className="h-txt">
          <div className={`status-badge reveal-node h-obs ${isLoaded ? 'is-visible' : ''}`}>
            <div className="status-dot">
              <div></div>
            </div>
            <span className="data-mono c-ink">MDLX-1A ACTIVE</span>
          </div>

          <h1 className={`reveal-node h-obs delay-1 ${isLoaded ? 'is-visible' : ''}`}>
            <span className="decrypt-text" data-val="Hyper-Optimize">
              {hyperText}
            </span>
            <br />
            <span className="f-italic">Biological</span>
            <br />
            <span className="decrypt-text" data-val="Synthesis.">
              {synthText}
            </span>
          </h1>

          <p className={`reveal-node h-obs delay-2 ${isLoaded ? 'is-visible' : ''}`}>
            We construct a 200-billion scalar metric from your biometric substrate. Calculating precise
            recovery algorithms down to the structural nucleotide level securely.
          </p>

          <div className={`reveal-node h-obs delay-3 ${isLoaded ? 'is-visible' : ''}`}>
            <button className="btn-apex cursor-hv hero-btn-lg" onClick={handleCompileClick}>
              COMPILE REPORT <i className="fa-solid fa-satellite-dish ml-10"></i>
            </button>
          </div>

          <div className={`hero-data-strip reveal-node h-obs delay-3 ${isLoaded ? 'is-visible' : ''}`}>
            <div className="hd-node">
              <span className="hd-val live-rnd" data-min="99" data-max="99" data-dec="3">
                {purity}
                <span>%</span>
              </span>
              <span className="hd-lbl">Substrate Purity</span>
            </div>
            <div className="hd-node">
              <span className="hd-val">
                2.8<span>B+</span>
              </span>
              <span className="hd-lbl">Scalar Metrics</span>
            </div>
            <div className="hd-node">
              <span className="hd-val live-rnd" data-min="10" data-max="90" data-dec="0">
                {latency}
                <span>ms</span>
              </span>
              <span className="hd-lbl">Compute Latency</span>
            </div>
          </div>
        </div>

        {/* Absolute Elite 3D DNA Reactor */}
        <div
          className={`hero-graphics reveal-node h-obs delay-2 ${isLoaded ? 'is-visible' : ''}`}
          id="reactor-3d"
          ref={reactorRef}
        >
          <div className="orbital-ring orb-1"></div>
          <div className="orbital-ring orb-2"></div>

          <div className="hud-tag tag-1">
            <i className="fa-solid fa-crosshairs c-accent"></i> TGT_SEQ: ALFA
          </div>
          <div className="hud-tag tag-2">
            <i className="fa-solid fa-chart-line"></i> STABLE
          </div>

          <div className="reactor-containment">
            <div className="core-dna" id="cssDnaWrap">
              {dnaRungs.map((rung, index) => (
                <div
                  key={index}
                  className="dna-rung"
                  style={{
                    top: rung.top,
                    transform: rung.transform,
                  }}
                >
                  <div className="dna-d1"></div>
                  <div className="dna-d2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
