import React, { useState, useEffect } from 'react';

export default function Loader({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [isEvaporating, setIsEvaporating] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    let currentVal = 0;
    const interval = setInterval(() => {
      currentVal += Math.random() * 6;
      if (currentVal >= 100) {
        currentVal = 100;
        clearInterval(interval);
        setProgress(100);

        setTimeout(() => {
          setIsEvaporating(true);
          if (onLoaded) onLoaded();

          setTimeout(() => {
            setIsRemoved(true);
          }, 1500);
        }, 500);
      } else {
        setProgress(currentVal);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onLoaded]);

  if (isRemoved) return null;

  return (
    <div id="core_loader" className={isEvaporating ? 'evaporate' : ''}>
      <div className="loader-cipher" id="load_nums">
        {progress.toFixed(2)}
        <span>%</span>
      </div>
      <div className="loader-bar">
        <div
          className="loader-progress"
          id="load_prog"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="loader-sub data-mono">
        <span>NEURAL SYNC INITIATED</span>
        <span className="c-accent">[ ESTABLISHING VECTOR ]</span>
      </div>
    </div>
  );
}
