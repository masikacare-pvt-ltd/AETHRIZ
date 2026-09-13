import React, { useState, useEffect } from 'react';

export default function Loader({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [isEvaporating, setIsEvaporating] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let currentVal = 0;
    const interval = setInterval(() => {
      if (isDone) {
        clearInterval(interval);
        return;
      }

      currentVal += Math.random() * 8; // Slightly faster increment
      
      if (currentVal >= 100) {
        currentVal = 100;
        setProgress(100);
        setIsDone(true); // Lock progress at 100%
        clearInterval(interval);

        // Immediately transition after reaching 100%
        setTimeout(() => {
          setIsEvaporating(true);
          if (onLoaded) onLoaded();

          setTimeout(() => {
            setIsRemoved(true);
          }, 800); // Shorter fade out
        }, 300); // Shorter delay at 100%
      } else {
        setProgress(currentVal);
      }
    }, 35); // Faster updates

    return () => clearInterval(interval);
  }, [onLoaded, isDone]);

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
          style={{ 
            width: `${progress}%`,
            transition: progress >= 100 ? 'none' : 'width 0.1s linear'
          }}
        ></div>
      </div>
      <div className="loader-sub data-mono">
        <span>NEURAL SYNC INITIATED</span>
        <span className="c-accent">[ ESTABLISHING VECTOR ]</span>
      </div>
    </div>
  );
}
