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
  const hyperText = useScramble('Intelligent', isLoaded);
  const synthText = useScramble('Personalized.', isLoaded);

  // Live randomized data
  const [accuracy, setAccuracy] = useState('98.9');
  const [latency, setLatency] = useState('42');

  useEffect(() => {
    const interval = setInterval(() => {
      // Model accuracy simulation around 98.9%
      const accVal = (Math.random() * (98.95 - 98.85) + 98.85).toFixed(1);
      setAccuracy(accVal);

      // Inference latency (35 to 50ms)
      const latVal = Math.floor(Math.random() * (50 - 35) + 35);
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
    // Smooth scroll to footer contact section
    const footer = document.getElementById('contact');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="hero-stage">
      <div className="container h-layout">
        <div className="h-txt">
          <div className={`status-badge reveal-node h-obs ${isLoaded ? 'is-visible' : ''}`}>
            <div className="status-dot">
              <div></div>
            </div>
            <span className="data-mono c-ink">AI HEALTH INTELLIGENCE ACTIVE</span>
          </div>

          <h1 className={`reveal-node h-obs delay-1 ${isLoaded ? 'is-visible' : ''}`}>
            <span className="decrypt-text" data-val="Intelligent">
              {hyperText}
            </span>
            <br />
            <span className="f-italic">Health,</span>
            <br />
            <span className="decrypt-text" data-val="Personalized.">
              {synthText}
            </span>
          </h1>

          <p className={`reveal-node h-obs delay-2 ${isLoaded ? 'is-visible' : ''}`}>
            AETHRIZ is an AI-powered health intelligence platform that turns your health data into personalized
            diet and lifestyle guidance. Using deep learning, we help people make smarter daily choices and work
            toward a healthier life—regardless of age, diet, language, or location.
          </p>

          <div className={`reveal-node h-obs delay-3 ${isLoaded ? 'is-visible' : ''}`}>
            <button className="btn-apex cursor-hv hero-btn-lg" onClick={handleCompileClick}>
              CONTACT US <i className="fa-solid fa-arrow-right ml-10"></i>
            </button>
          </div>

          <div className={`hero-data-strip reveal-node h-obs delay-3 ${isLoaded ? 'is-visible' : ''}`}>
            <div className="hd-node">
              <span className="hd-val live-rnd" data-min="98" data-max="99" data-dec="1">
                {accuracy}
                <span>%</span>
              </span>
              <span className="hd-lbl">Model Accuracy</span>
            </div>
            <div className="hd-node">
              <span className="hd-val">
                22<span>+</span>
              </span>
              <span className="hd-lbl">Languages Supported</span>
            </div>
            <div className="hd-node">
              <span className="hd-val live-rnd" data-min="35" data-max="50" data-dec="0">
                {latency}
                <span>ms</span>
              </span>
              <span className="hd-lbl">Inference Latency</span>
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
