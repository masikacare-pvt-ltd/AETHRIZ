import React, { useState, useEffect } from 'react';
import AmbientBackground from './components/AmbientBackground';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Syntax from './components/Syntax';
import Telemetry from './components/Telemetry';
import Pipeline from './components/Pipeline';
import Imperative from './components/Imperative';
import Resonance from './components/Resonance';
import PreRegister from './components/PreRegister';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Careers from './components/Careers';

import { useReveal } from './hooks/useReveal';
import { useMagneticHover } from './hooks/useMagneticHover';
import { useTilt3D } from './hooks/useTilt3D';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash === '#careers' ? 'careers' : 'home';
  });

  // Listen to hash changes (e.g. browser back/forward or direct link)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#careers') {
        setCurrentView('careers');
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view) => {
    setCurrentView(view);
    if (view === 'careers') {
      window.location.hash = '#careers';
    } else {
      if (window.location.hash === '#careers') {
        window.history.pushState(null, '', window.location.pathname);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Initialize interactive scroll reveals, magnetic hover, and 3D tilt behaviors
  useReveal();
  useMagneticHover();
  useTilt3D();

  return (
    <>
      {/* Ambient background layers and HUD reticles */}
      <AmbientBackground />

      {/* Physics-based custom cursor and trailer */}
      <CustomCursor />

      {/* Boot loader sequence */}
      <Loader onLoaded={() => setIsLoaded(true)} />

      {/* Glassmorphism navigation */}
      <Navbar currentView={currentView} onNavigate={navigateTo} />

      {/* Dynamic View: Main Platform or Careers Application */}
      {currentView === 'careers' ? (
        <Careers onBack={() => navigateTo('home')} />
      ) : (
        <main>
          <Hero isLoaded={isLoaded} />
          <Syntax />
          <Telemetry />
          <Pipeline />
          <Imperative />
          <Resonance />
          <PreRegister />
          <FAQ />
          <Contact />
        </main>
      )}

      {/* Cinematic footer */}
      <Footer onNavigate={navigateTo} />
    </>
  );
}
