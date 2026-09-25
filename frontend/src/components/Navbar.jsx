import React, { useState, useEffect } from 'react';

export default function Navbar({ currentView = 'home', onNavigate }) {
  const [isOverDark, setIsOverDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // In careers view, the page has a dark theme background
      if (currentView === 'careers') {
        setIsOverDark(true);
        return;
      }

      const navEl = document.getElementById('main_nav');
      const footerEl = document.querySelector('.footer-zenith') || document.getElementById('terminus');

      if (navEl && footerEl) {
        const navRect = navEl.getBoundingClientRect();
        const footerRect = footerEl.getBoundingClientRect();
        // Check if navbar touches or overlaps with dark footer
        if (footerRect.top <= navRect.bottom + 20) {
          setIsOverDark(true);
          return;
        }
      }

      setIsOverDark(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [currentView]);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (targetId === 'careers') {
      if (onNavigate) onNavigate('careers');
      return;
    }

    if (currentView !== 'home') {
      if (onNavigate) {
        onNavigate('home');
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    } else {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    if (onNavigate) onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeployClick = () => {
    if (currentView !== 'home' && onNavigate) {
      onNavigate('home');
      setTimeout(() => {
        const footer = document.getElementById('contact');
        if (footer) footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } else {
      const footer = document.getElementById('contact');
      if (footer) footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header id="main_nav">
      <div className="nav-island">
        <a href="/" className="nav-brand" onClick={handleBrandClick}>
          <span className="aeth-logo-char">Λ</span>
          <div className="aeth-logo-bars">
            <span></span>
            <span></span>
            <span></span>
          </div>
           
          <span className="aeth-logo-char">T</span>
          <span className="aeth-logo-char">H</span>
          <span className="aeth-logo-char">R</span>
          <span className="aeth-logo-char">I</span>
          <span className="aeth-logo-char">Z</span>
        </a>
        <ul className="nav-clusters">
          <li>
            <a href="#syntax" onClick={(e) => handleNavClick(e, 'syntax')}>
              Services
            </a>
          </li>
          <li>
            <a href="#vector" onClick={(e) => handleNavClick(e, 'vector')}>
              How It Works
            </a>
          </li>
          <li>
            <a href="#journey" onClick={(e) => handleNavClick(e, 'journey')}>
              Why Unique
            </a>
          </li>
          <li>
            <a href="#resonance" onClick={(e) => handleNavClick(e, 'resonance')}>
              Mission
            </a>
          </li>
          <li>
            <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')}>
              FAQ
            </a>
          </li>
          <li>
            <a
              href="#careers"
              onClick={(e) => handleNavClick(e, 'careers')}
              className={currentView === 'careers' ? 'active-nav-link' : ''}
              style={{
                position: 'relative',
                color: currentView === 'careers' ? '#E81A2D' : undefined
              }}
            >
              Careers
              <span
                style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#E81A2D',
                  borderRadius: '50%',
                  marginLeft: '6px',
                  verticalAlign: 'middle',
                  boxShadow: '0 0 6px #E81A2D'
                }}
              ></span>
            </a>
          </li>
        </ul>
        <button className="btn-apex cursor-hv" onClick={handleDeployClick}>
          CONTACT US <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </header>
  );
}
