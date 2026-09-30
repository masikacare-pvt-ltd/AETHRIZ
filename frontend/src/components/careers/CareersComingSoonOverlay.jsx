import React, { useState, useEffect } from 'react';
import '../../styles/careers-coming-soon.css';

// Target launch date: Test time today at 06:22:00 IST (UTC+05:30)
const TARGET_LAUNCH_DATE = new Date('2026-09-30T06:22:00+05:30').getTime();

export default function CareersComingSoonOverlay({ onBack, onUnlock }) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  function calculateTimeLeft() {
    const now = Date.now();
    const difference = TARGET_LAUNCH_DATE - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds, isLive: false };
  }

  useEffect(() => {
    // If the launch time has already passed, automatically unlock immediately
    if (timeLeft.isLive && onUnlock) {
      onUnlock();
      return;
    }

    // Ticker running every 1 second
    const timer = setInterval(() => {
      const nextTime = calculateTimeLeft();
      setTimeLeft(nextTime);

      // Once countdown reaches 00:00:00, automatically unlock and dismiss the overlay
      if (nextTime.isLive) {
        clearInterval(timer);
        if (onUnlock) onUnlock();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft.isLive, onUnlock]);

  const pad = (n) => String(n).padStart(2, '0');

  // If already unlocked/live, do not render overlay
  if (timeLeft.isLive) {
    return null;
  }

  return (
    <div className="careers-coming-soon-backdrop" role="dialog" aria-modal="true" aria-labelledby="cs-title">
      <div className="careers-cs-card">
        <div className="careers-cs-glow"></div>

        {/* Official Banner Header */}
        <div className="careers-cs-banner-wrap">
          <img
            src="/20260925_071353.png"
            alt="AETHRIZ Winter Internship Programme 2026-27 Official Banner"
            className="careers-cs-banner-img"
            loading="eager"
          />
        </div>

        {/* Content Body */}
        <div className="careers-cs-body">
          {/* Status Indicator */}
          <div className="careers-cs-pill">
            <span className="careers-cs-pulse">
              <span className="careers-cs-pulse-ping"></span>
              <span className="careers-cs-pulse-dot"></span>
            </span>
            <span className="careers-cs-pill-text">
              SYSTEM STATUS: APPLICATIONS COMMENCE OCT 1, 2026
            </span>
          </div>

          {/* Headline */}
          <h2 id="cs-title" className="careers-cs-title">
            Winter Internship 2026–27 <br />
            <i>Applications Opening Soon.</i>
          </h2>

          {/* Description */}
          <p className="careers-cs-desc">
            The candidate intake portal for <strong>AETHRIZ AI Healthcare & Research</strong> is finalizing security and
            submission telemetries. Applications for our 3-month winter cohort officially unlock on{' '}
            <strong>October 1, 2026 at 00:00 IST</strong>. Please prepare your resume links and portfolio repositories.
          </p>

          {/* Live Countdown Grid */}
          <div className="careers-cs-countdown" aria-label="Countdown to Applications Launch">
            <div className="careers-cs-time-unit">
              <span className="careers-cs-time-num">{pad(timeLeft.days)}</span>
              <span className="careers-cs-time-lbl">Days</span>
            </div>
            <span className="careers-cs-colon">:</span>

            <div className="careers-cs-time-unit">
              <span className="careers-cs-time-num">{pad(timeLeft.hours)}</span>
              <span className="careers-cs-time-lbl">Hours</span>
            </div>
            <span className="careers-cs-colon">:</span>

            <div className="careers-cs-time-unit">
              <span className="careers-cs-time-num">{pad(timeLeft.minutes)}</span>
              <span className="careers-cs-time-lbl">Minutes</span>
            </div>
            <span className="careers-cs-colon">:</span>

            <div className="careers-cs-time-unit">
              <span className="careers-cs-time-num">{pad(timeLeft.seconds)}</span>
              <span className="careers-cs-time-lbl">Seconds</span>
            </div>
          </div>

          {/* Key Program Highlights */}
          <div className="careers-cs-chips">
            <div className="careers-cs-chip-item">
              <i className="fa-solid fa-calendar-check"></i> 15 Oct 2026 – 15 Jan 2027
            </div>
            <div className="careers-cs-chip-item">
              <i className="fa-solid fa-house-laptop"></i> 100% Remote-First
            </div>
            <div className="careers-cs-chip-item">
              <i className="fa-solid fa-layer-group"></i> 7 Specialized Tracks
            </div>
            <div className="careers-cs-chip-item">
              <i className="fa-solid fa-certificate"></i> Verified Certificate & Mentorship
            </div>
          </div>

          {/* Interactive Navigation Actions */}
          <div className="careers-cs-actions">
            {onBack && (
              <button
                type="button"
                className="careers-cs-btn-primary"
                onClick={onBack}
                id="cs-back-home-btn"
              >
                <i className="fa-solid fa-arrow-left"></i> RETURN TO HOME
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
