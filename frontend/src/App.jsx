import React, { useState } from 'react';
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

import { useReveal } from './hooks/useReveal';
import { useMagneticHover } from './hooks/useMagneticHover';
import { useTilt3D } from './hooks/useTilt3D';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

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
      <Navbar />

      {/* Main page sections */}
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

      {/* Cinematic footer */}
      <Footer />
    </>
  );
}
