import React, { useState, useEffect, useRef } from 'react';
import '../../styles/cinematic-application.css';

const GOOGLE_SHEET_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxc_-D6X0uozC2P3nDMkrSxdQHFj7Ma73XUL9c6H2bmBWTh3Rb4wTW3MkY9n-3rPPZm/exec';

const SKILLS_LIBRARY = [
  'PyTorch', 'TensorFlow', 'Python', 'C++ / CUDA', 'LLMs / RAG',
  'React', 'TypeScript', 'Node.js', 'Go', 'Rust',
  'PostgreSQL', 'TimescaleDB', 'Docker', 'Kubernetes', 'AWS',
  'Figma', 'UI/UX Design', 'System Architecture', 'Computer Vision'
];

const TRAJECTORY_OPTIONS = [
  { id: 'undergrad', key: '1', title: 'Undergraduate Builder', desc: '1st - 3rd Year • Laying architectural foundations' },
  { id: 'final_year', key: '2', title: 'Final Year / Pre-Grad', desc: 'Graduating Soon • Ready for high-velocity immersion' },
  { id: 'alumni', key: '3', title: 'Graduated / Working', desc: 'Alumni or Industry Engineer • Shipping production systems' },
  { id: 'fellow', key: '4', title: 'Independent Researcher', desc: 'Deep technical hacker or self-taught bio-algorithmic builder' }
];

export default function CinematicApplicationExperience({ role = 'AI/ML Development', onExit }) {
  // Current Question Index (0 = Welcome, 1..9 = Questions, 10 = Success)
  const [step, setStep] = useState(0);
  const totalQuestions = 9;

  // Form State
  const [candidate, setCandidate] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    location: '',
    trajectory: '',
    institution: '',
    skills: [],
    customSkill: '',
    featuredProject: '',
    projectLink: '',
    githubUrl: '',
    portfolioUrl: '',
    resumeFileName: '',
    resumeFileSize: '',
    resumeBase64: '',
    manifesto: '',
    superpower: '',
    agreed: false
  });

  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionPhase, setTransmissionPhase] = useState(1);
  const [transmissionPercent, setTransmissionPercent] = useState(15);
  const [refId, setRefId] = useState('');
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef(null);

  // Keyboard navigation listener (Enter to proceed, 1-4 for trajectory)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // If currently submitting or on success screen, ignore
      if (isTransmitting || step === 10) return;

      // Escape to exit
      if (e.key === 'Escape') {
        onExit();
        return;
      }

      // Enter key to advance (except when in multiline textarea unless Shift+Enter or Ctrl+Enter)
      if (e.key === 'Enter') {
        if (e.target.tagName === 'TEXTAREA' && !e.ctrlKey && !e.metaKey) {
          return; // Allow standard line break in textarea
        }
        e.preventDefault();
        advanceStep();
      }

      // Hotkeys for Trajectory step
      if (step === 4 && ['1', '2', '3', '4'].includes(e.key)) {
        const option = TRAJECTORY_OPTIONS.find((o) => o.key === e.key);
        if (option) {
          setCandidate((prev) => ({ ...prev, trajectory: option.id }));
          setError('');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, candidate, isTransmitting]);

  // Validation per step
  const validateStep = (current) => {
    setError('');
    if (current === 1) {
      if (!candidate.fullName.trim()) {
        setError('Please declare your identity to proceed.');
        return false;
      }
    } else if (current === 2) {
      if (!candidate.email.trim() || !candidate.email.includes('@')) {
        setError('Please provide a valid comms email address.');
        return false;
      }
      if (!candidate.phone.trim()) {
        setError('Mobile / WhatsApp frequency is required.');
        return false;
      }
    } else if (current === 3) {
      if (!candidate.location.trim()) {
        setError('Please state your geographic coordinate / city.');
        return false;
      }
    } else if (current === 4) {
      if (!candidate.trajectory) {
        setError('Select your current engineering altitude.');
        return false;
      }
      if (!candidate.institution.trim()) {
        setError('College, university, or current base organization is required.');
        return false;
      }
    } else if (current === 5) {
      if (candidate.skills.length === 0) {
        setError('Select at least one weapon / skill in your arsenal.');
        return false;
      }
    } else if (current === 6) {
      if (!candidate.featuredProject.trim() && !candidate.githubUrl.trim() && !candidate.portfolioUrl.trim()) {
        setError('Highlight at least one project or provide a repository / portfolio link.');
        return false;
      }
    } else if (current === 7) {
      if (!candidate.resumeFileName) {
        setError('Please attach your CV / Resume into the scanner.');
        return false;
      }
    } else if (current === 8) {
      if (!candidate.manifesto.trim() || candidate.manifesto.trim().length < 25) {
        setError('Share at least a few thoughtful sentences on why AETHRIZ calls to you.');
        return false;
      }
    } else if (current === 9) {
      if (!candidate.agreed) {
        setError('Please acknowledge the declaration of authenticity.');
        return false;
      }
    }
    return true;
  };

  const advanceStep = () => {
    if (step === 0) {
      setStep(1);
      return;
    }
    if (step === 9) {
      initiateTransmission();
      return;
    }
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const stepBack = () => {
    setError('');
    setStep((prev) => Math.max(0, prev - 1));
  };

  // Skill toggling
  const toggleSkill = (skill) => {
    setCandidate((prev) => {
      const exists = prev.skills.includes(skill);
      const next = exists ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill];
      return { ...prev, skills: next };
    });
    setError('');
  };

  const addCustomSkill = (e) => {
    e.preventDefault();
    const val = candidate.customSkill.trim();
    if (val && !candidate.skills.includes(val)) {
      setCandidate((prev) => ({
        ...prev,
        skills: [...prev.skills, val],
        customSkill: ''
      }));
    }
  };

  // Resume File processing
  const handleResumeFile = (file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setError('File exceeds 10MB threshold.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const b64 = reader.result.split(',')[1] || reader.result;
      setCandidate((prev) => ({
        ...prev,
        resumeFileName: file.name,
        resumeFileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        resumeBase64: b64
      }));
      setError('');
    };
    reader.readAsDataURL(file);
  };

  // Transmission sequence
  const initiateTransmission = async () => {
    if (!validateStep(9)) return;

    setIsTransmitting(true);
    setTransmissionPhase(1);
    setTransmissionPercent(30);

    const generatedCode = `AETHRIZ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const payload = {
      refId: generatedCode,
      position: role,
      fullName: candidate.fullName,
      emailAddress: candidate.email,
      phone: candidate.phone,
      preferredContact: candidate.preferredContact,
      cityState: candidate.location,
      trajectory: candidate.trajectory,
      collegeCourse: candidate.institution,
      keySkills: candidate.skills.join(', '),
      featuredProject: candidate.featuredProject,
      portfolioUrl: candidate.portfolioUrl || candidate.githubUrl || candidate.projectLink,
      resumeFileName: candidate.resumeFileName,
      resumeBase64: candidate.resumeBase64,
      whyJoin: candidate.manifesto,
      superpower: candidate.superpower
    };

    // Phase 2
    setTimeout(() => {
      setTransmissionPhase(2);
      setTransmissionPercent(72);
    }, 800);

    // Phase 3
    setTimeout(() => {
      setTransmissionPhase(3);
      setTransmissionPercent(95);
    }, 1600);

    // Finalize
    try {
      if (GOOGLE_SHEET_ENDPOINT) {
        await fetch(GOOGLE_SHEET_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });
      }
    } catch (e) {
      console.warn('Endpoint ping completed:', e);
    } finally {
      setTimeout(() => {
        setIsTransmitting(false);
        setRefId(generatedCode);
        setStep(10); // Success screen
      }, 2400);
    }
  };

  const copyRef = () => {
    if (refId) {
      navigator.clipboard.writeText(refId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const progressPercent = step === 0 ? 0 : Math.round((step / totalQuestions) * 100);

  return (
    <div className="cine-stage">
      {/* Ambient Visual Substrates */}
      <div className="cine-ambient-mesh"></div>
      <div className="cine-grid-overlay"></div>
      <div className="cine-scanline-veil"></div>

      {/* TOP HUD BAR */}
      <header className="cine-topbar">
        <div className="cine-brand-col">
          <span className="cine-brand-logo">AETHRIZ</span>
          <div className="cine-track-pill">
            <span className="cine-track-dot"></span>
            <span>{role}</span>
          </div>
        </div>

        <div className="cine-progress-col">
          {step > 0 && step <= totalQuestions && (
            <>
              <div className="cine-step-gauge">
                QUESTION <strong>0{step}</strong> / 0{totalQuestions}
              </div>
              <div className="cine-progress-track">
                <div className="cine-progress-fill" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </>
          )}

          <button type="button" className="cine-exit-btn" onClick={onExit} title="Exit (ESC)">
            <i className="fa-solid fa-xmark"></i>
            <span>ABORT [ESC]</span>
          </button>
        </div>
      </header>

      {/* MAIN CINEMATIC THEATER */}
      <main className="cine-main-theater">
        <div className="cine-frame-wrapper cine-anim-enter" key={step}>
          {/* ================================================================= */}
          {/* STEP 0: WELCOME & PROTOCOL INITIATION                             */}
          {/* ================================================================= */}
          {step === 0 && (
            <div className="cine-welcome-hero">
              <span className="cine-tag-kicker">// TALENT VANGUARD INITIATION</span>
              <h1 className="cine-question-title">
                Enter the <i>Neural Vanguard.</i>
              </h1>
              <p className="cine-question-sub">
                You are about to initialize the direct candidate protocol for <strong>{role}</strong>.
                We evaluate engineers and designers through proof of velocity, technical taste, and raw autonomy.
              </p>

              <div style={{ marginTop: '20px' }}>
                <button
                  type="button"
                  className="cine-btn-forward"
                  onClick={advanceStep}
                  autoFocus
                >
                  INITIALIZE PROTOCOL <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* STEP 1: IDENTITY                                                  */}
          {/* ================================================================= */}
          {step === 1 && (
            <div>
              <span className="cine-tag-kicker">01 // IDENTITY PROTOCOL</span>
              <h1 className="cine-question-title">
                Who is stepping into <i>the terminal?</i>
              </h1>
              <p className="cine-question-sub">State your full legal or professional builder name.</p>

              <div className="cine-hero-input-box">
                <input
                  type="text"
                  className="cine-hero-input"
                  placeholder="Type your name here..."
                  value={candidate.fullName}
                  onChange={(e) => {
                    setCandidate({ ...candidate, fullName: e.target.value });
                    setError('');
                  }}
                  autoFocus
                />
                <div className="cine-input-glow"></div>
              </div>
              {error && <div className="cine-error-hint"><i className="fa-solid fa-circle-exclamation"></i> {error}</div>}
            </div>
          )}

          {/* ================================================================= */}
          {/* STEP 2: COMMS FREQUENCY                                           */}
          {/* ================================================================= */}
          {step === 2 && (
            <div>
              <span className="cine-tag-kicker">02 // TRANSMISSION FREQUENCIES</span>
              <h1 className="cine-question-title">
                Where should our <i>telemetry reach you?</i>
              </h1>
              <p className="cine-question-sub">Our peer review team responds with sub-48hr turnaround.</p>

              <div className="cine-standard-grid">
                <div className="cine-field-wrap">
                  <label className="cine-field-label">PRIMARY EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    className="cine-standard-input"
                    placeholder="builder@domain.com"
                    value={candidate.email}
                    onChange={(e) => {
                      setCandidate({ ...candidate, email: e.target.value });
                      setError('');
                    }}
                    autoFocus
                  />
                </div>

                <div className="cine-field-wrap">
                  <label className="cine-field-label">MOBILE / WHATSAPP FREQUENCY *</label>
                  <input
                    type="tel"
                    className="cine-standard-input"
                    placeholder="+1 (555) 000-0000 or +91 98765..."
                    value={candidate.phone}
                    onChange={(e) => {
                      setCandidate({ ...candidate, phone: e.target.value });
                      setError('');
                    }}
                  />
                </div>
              </div>

              <div className="cine-field-wrap">
                <label className="cine-field-label">PREFERRED FIRST CONTACT CHANNEL</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {['email', 'whatsapp', 'direct_call'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`cine-matrix-tile ${candidate.preferredContact === c ? 'selected' : ''}`}
                      onClick={() => setCandidate({ ...candidate, preferredContact: c })}
                    >
                      {c === 'email' && <i className="fa-solid fa-envelope"></i>}
                      {c === 'whatsapp' && <i className="fa-brands fa-whatsapp"></i>}
                      {c === 'direct_call' && <i className="fa-solid fa-phone"></i>}
                      <span style={{ textTransform: 'uppercase' }}>{c.replace('_', ' ')}</span>
                    </button>
                  ))}
                </div>
              </div>
              {error && <div className="cine-error-hint"><i className="fa-solid fa-circle-exclamation"></i> {error}</div>}
            </div>
          )}

          {/* ================================================================= */}
          {/* STEP 3: COORDINATES                                               */}
          {/* ================================================================= */}
          {step === 3 && (
            <div>
              <span className="cine-tag-kicker">03 // GEOSPATIAL COORDINATES</span>
              <h1 className="cine-question-title">
                From which node on Earth are you <i>building?</i>
              </h1>
              <p className="cine-question-sub">
                AETHRIZ is remote-first and asynchronous across global timezones. Where are you based?
              </p>

              <div className="cine-hero-input-box">
                <input
                  type="text"
                  className="cine-hero-input"
                  placeholder="e.g. San Francisco, Bengaluru, London, or Anywhere (Nomad)"
                  value={candidate.location}
                  onChange={(e) => {
                    setCandidate({ ...candidate, location: e.target.value });
                    setError('');
                  }}
                  autoFocus
                />
                <div className="cine-input-glow"></div>
              </div>
              {error && <div className="cine-error-hint"><i className="fa-solid fa-circle-exclamation"></i> {error}</div>}
            </div>
          )}

          {/* ================================================================= */}
          {/* STEP 4: TRAJECTORY & HORIZON                                      */}
          {/* ================================================================= */}
          {step === 4 && (
            <div>
              <span className="cine-tag-kicker">04 // TRAJECTORY ALTITUDE</span>
              <h1 className="cine-question-title">
                What is your current altitude in the <i>engineering cosmos?</i>
              </h1>
              <p className="cine-question-sub">Press 1, 2, 3, or 4 on your keyboard or select below.</p>

              <div className="cine-cards-row">
                {TRAJECTORY_OPTIONS.map((opt) => (
                  <div
                    key={opt.id}
                    className={`cine-choice-card ${candidate.trajectory === opt.id ? 'active' : ''}`}
                    onClick={() => {
                      setCandidate({ ...candidate, trajectory: opt.id });
                      setError('');
                    }}
                  >
                    <div className="choice-top">
                      <span className="choice-num">0{opt.key}</span>
                      <span className="choice-key-hint">KEY [{opt.key}]</span>
                    </div>
                    <div>
                      <h4 className="choice-title">{opt.title}</h4>
                      <p className="choice-desc">{opt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cine-field-wrap">
                <label className="cine-field-label">COLLEGE / UNIVERSITY OR LATEST ORGANIZATION *</label>
                <input
                  type="text"
                  className="cine-standard-input"
                  placeholder="e.g. Stanford, IIT, MIT, or Self-Taught Enterprise"
                  value={candidate.institution}
                  onChange={(e) => {
                    setCandidate({ ...candidate, institution: e.target.value });
                    setError('');
                  }}
                />
              </div>
              {error && <div className="cine-error-hint"><i className="fa-solid fa-circle-exclamation"></i> {error}</div>}
            </div>
          )}

          {/* ================================================================= */}
          {/* STEP 5: ARSENAL & WEAPONRY                                        */}
          {/* ================================================================= */}
          {step === 5 && (
            <div>
              <span className="cine-tag-kicker">05 // ARSENAL MATRIX</span>
              <h1 className="cine-question-title">
                Assemble your technical <i>weaponry.</i>
              </h1>
              <p className="cine-question-sub">Click technologies to lock them into your active battle rack.</p>

              {/* Dynamic Assembled Arsenal Rack */}
              <div className="cine-arsenal-rack">
                <div className="arsenal-rack-header">
                  <span className="arsenal-title">
                    <i className="fa-solid fa-microchip" style={{ color: '#E81A2D' }}></i>
                    ASSEMBLED WEAPONRY ({candidate.skills.length})
                  </span>
                  {candidate.skills.length >= 3 && (
                    <span className="arsenal-feedback">⚡ High Density Arsenal Detected</span>
                  )}
                </div>

                <div className="arsenal-chips-shelf">
                  {candidate.skills.length === 0 ? (
                    <span className="arsenal-empty">Select capabilities below to forge your rack.</span>
                  ) : (
                    candidate.skills.map((s) => (
                      <span key={s} className="arsenal-chip">
                        <span>{s}</span>
                        <button type="button" className="chip-x-btn" onClick={() => toggleSkill(s)}>
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Skills Matrix Cloud */}
              <div className="cine-skills-matrix">
                {SKILLS_LIBRARY.map((sk) => {
                  const sel = candidate.skills.includes(sk);
                  return (
                    <button
                      key={sk}
                      type="button"
                      className={`cine-matrix-tile ${sel ? 'selected' : ''}`}
                      onClick={() => toggleSkill(sk)}
                    >
                      <i className={`fa-solid ${sel ? 'fa-check' : 'fa-plus'}`} style={{ fontSize: '0.7rem' }}></i>
                      <span>{sk}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Skill Input */}
              <form onSubmit={addCustomSkill} style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  className="cine-standard-input"
                  style={{ flex: 1, padding: '12px 18px', fontSize: '0.95rem' }}
                  placeholder="+ Add custom framework, library, or specialty..."
                  value={candidate.customSkill}
                  onChange={(e) => setCandidate({ ...candidate, customSkill: e.target.value })}
                />
                <button
                  type="submit"
                  className="cine-btn-back"
                  style={{ height: 'auto', padding: '0 20px' }}
                >
                  ADD
                </button>
              </form>
              {error && <div className="cine-error-hint"><i className="fa-solid fa-circle-exclamation"></i> {error}</div>}
            </div>
          )}

          {/* ================================================================= */}
          {/* STEP 6: ARTIFACTS & PROOF OF WORK                                 */}
          {/* ================================================================= */}
          {step === 6 && (
            <div>
              <span className="cine-tag-kicker">06 // PROOF OF SHIPMENT</span>
              <h1 className="cine-question-title">
                What have you <i>shipped?</i>
              </h1>
              <p className="cine-question-sub">
                Drop your proudest code repositories, production products, or personal experiments.
              </p>

              <div className="cine-field-wrap" style={{ marginBottom: '20px' }}>
                <label className="cine-field-label">FLAGSHIP BUILD (PROJECT NAME & WHAT YOU BUILT) *</label>
                <textarea
                  className="cine-textarea"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '12px',
                    padding: '16px',
                    fontSize: '1rem',
                    minHeight: '80px'
                  }}
                  placeholder="e.g. OPEX — Built a sub-40ms real-time audio inference engine in Rust and PyTorch..."
                  value={candidate.featuredProject}
                  onChange={(e) => {
                    setCandidate({ ...candidate, featuredProject: e.target.value });
                    setError('');
                  }}
                  autoFocus
                ></textarea>
              </div>

              <div className="cine-standard-grid">
                <div className="cine-field-wrap">
                  <label className="cine-field-label">GITHUB / CODE REPO</label>
                  <input
                    type="url"
                    className="cine-standard-input"
                    placeholder="https://github.com/..."
                    value={candidate.githubUrl}
                    onChange={(e) => setCandidate({ ...candidate, githubUrl: e.target.value })}
                  />
                </div>

                <div className="cine-field-wrap">
                  <label className="cine-field-label">PORTFOLIO / LIVE DEMO</label>
                  <input
                    type="url"
                    className="cine-standard-input"
                    placeholder="https://..."
                    value={candidate.portfolioUrl}
                    onChange={(e) => setCandidate({ ...candidate, portfolioUrl: e.target.value })}
                  />
                </div>
              </div>
              {error && <div className="cine-error-hint"><i className="fa-solid fa-circle-exclamation"></i> {error}</div>}
            </div>
          )}

          {/* ================================================================= */}
          {/* STEP 7: THE DOSSIER (RESUME LASER SCAN)                           */}
          {/* ================================================================= */}
          {step === 7 && (
            <div>
              <span className="cine-tag-kicker">07 // CURRICULUM VITAE</span>
              <h1 className="cine-question-title">
                Drop your dossier into the <i>bio-scanner.</i>
              </h1>
              <p className="cine-question-sub">
                Our parsing agents analyze code contributions, publications, and real deliverables.
              </p>

              {candidate.resumeFileName ? (
                <div className="cine-scanned-dossier">
                  <div className="scanned-icon-box">
                    <i className="fa-solid fa-file-pdf"></i>
                  </div>
                  <div className="scanned-meta">
                    <span className="scanned-verified-badge">
                      <i className="fa-solid fa-check"></i> DOSSIER DIGITIZED & VERIFIED
                    </span>
                    <h3 className="scanned-filename">{candidate.resumeFileName}</h3>
                    <span className="scanned-size">{candidate.resumeFileSize}</span>
                  </div>
                  <div className="scanned-actions">
                    <button
                      type="button"
                      className="cine-btn-back"
                      style={{ padding: '0 16px', height: '40px' }}
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    >
                      Replace
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className={`cine-scanner-dropzone ${isDragging ? 'dragging' : ''}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleResumeFile(e.dataTransfer.files[0]);
                    }
                  }}
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                >
                  <div className="cine-laser-beam"></div>
                  <div className="scanner-reticle">
                    <i className="fa-solid fa-fingerprint"></i>
                  </div>
                  <h3 className="scanner-title">DROP CURRICULUM VITAE HERE</h3>
                  <p className="scanner-sub">Drag & drop your PDF or click to browse filesystem</p>
                  <span className="scanner-spec-chip">PDF / DOCX • MAX 10MB</span>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleResumeFile(e.target.files[0]);
                  }
                }}
              />
              {error && <div className="cine-error-hint"><i className="fa-solid fa-circle-exclamation"></i> {error}</div>}
            </div>
          )}

          {/* ================================================================= */}
          {/* STEP 8: THE MANIFESTO                                             */}
          {/* ================================================================= */}
          {step === 8 && (
            <div>
              <span className="cine-tag-kicker">08 // THE MANIFESTO</span>
              <h1 className="cine-question-title">
                Why build at the <i>edge of longevity?</i>
              </h1>
              <p className="cine-question-sub">
                Skip generic HR fluff. Tell us why AETHRIZ matters to you and what drives your craft.
              </p>

              <div className="cine-canvas-box">
                <div className="cine-canvas-header">
                  <span className="canvas-tag">STATEMENT OF PURPOSE</span>
                  <div className="canvas-stats">
                    <span>{candidate.manifesto ? candidate.manifesto.trim().split(/\s+/).filter(Boolean).length : 0} WORDS</span>
                  </div>
                </div>

                <textarea
                  className="cine-textarea"
                  rows={6}
                  placeholder="Speak your mind..."
                  value={candidate.manifesto}
                  onChange={(e) => {
                    setCandidate({ ...candidate, manifesto: e.target.value });
                    setError('');
                  }}
                  autoFocus
                ></textarea>

                {/* Quick inspiration seeds */}
                <div className="cine-inspiration-row">
                  {[
                    'I want to build zero-latency inference for real bio-signals',
                    'I thrive in high-autonomy teams that value code over meetings',
                    'Healthcare algorithms need consumer-grade aesthetic execution'
                  ].map((seed, i) => (
                    <button
                      key={i}
                      type="button"
                      className="cine-inspire-pill"
                      onClick={() => {
                        setCandidate((prev) => ({
                          ...prev,
                          manifesto: prev.manifesto ? `${prev.manifesto}\n\n${seed}` : seed
                        }));
                      }}
                    >
                      <i className="fa-solid fa-sparkles" style={{ color: '#E81A2D' }}></i>
                      <span>{seed}</span>
                    </button>
                  ))}
                </div>
              </div>
              {error && <div className="cine-error-hint"><i className="fa-solid fa-circle-exclamation"></i> {error}</div>}
            </div>
          )}

          {/* ================================================================= */}
          {/* STEP 9: SYNTHESIS & REVIEW (HOLOGRAPHIC CANDIDATE BADGE)          */}
          {/* ================================================================= */}
          {step === 9 && !isTransmitting && (
            <div>
              <span className="cine-tag-kicker">09 // DOSSIER SYNTHESIS</span>
              <h1 className="cine-question-title">
                Review your <i>biometric candidate dossier.</i>
              </h1>
              <p className="cine-question-sub">Verify all coordinates before final cryptographic broadcast.</p>

              <div className="cine-holo-dossier">
                <div className="cine-holo-sheen"></div>

                <div className="holo-header">
                  <div>
                    <span className="holo-badge-id">CANDIDATE // AETHRIZ VANGUARD</span>
                    <h2 className="holo-candidate-name">{candidate.fullName || 'Anonymous Builder'}</h2>
                  </div>
                  <span className="holo-role-tag">{role}</span>
                </div>

                <div className="holo-grid">
                  <div className="holo-tile">
                    <span className="holo-tile-label">COMMUNICATION FREQUENCY</span>
                    <span className="holo-tile-val">{candidate.email}</span>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '4px' }}>
                      {candidate.phone} • {candidate.location}
                    </div>
                  </div>

                  <div className="holo-tile">
                    <span className="holo-tile-label">ALMA MATER / ORGANIZATION</span>
                    <span className="holo-tile-val">{candidate.institution}</span>
                    <div style={{ fontSize: '0.8rem', color: '#E81A2D', marginTop: '4px', textTransform: 'uppercase' }}>
                      {candidate.trajectory.replace('_', ' ')}
                    </div>
                  </div>

                  <div className="holo-tile">
                    <span className="holo-tile-label">ASSEMBLED WEAPONRY ({candidate.skills.length})</span>
                    <div className="holo-pills-row">
                      {candidate.skills.slice(0, 6).map((s) => (
                        <span key={s} className="holo-pill">{s}</span>
                      ))}
                      {candidate.skills.length > 6 && (
                        <span className="holo-pill">+{candidate.skills.length - 6} more</span>
                      )}
                    </div>
                  </div>

                  <div className="holo-tile">
                    <span className="holo-tile-label">ATTACHED DOSSIER</span>
                    <span className="holo-tile-val" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="fa-solid fa-file-pdf" style={{ color: '#E81A2D' }}></i>
                      {candidate.resumeFileName || 'None'}
                    </span>
                  </div>
                </div>

                <div className="holo-tile" style={{ marginBottom: '24px' }}>
                  <span className="holo-tile-label">MANIFESTO EXCERPT</span>
                  <p className="holo-statement">"{candidate.manifesto.slice(0, 180)}..."</p>
                </div>

                <div
                  className="cine-declaration-toggle"
                  onClick={() => setCandidate({ ...candidate, agreed: !candidate.agreed })}
                >
                  <div className={`cine-checkbox-box ${candidate.agreed ? 'checked' : ''}`}>
                    {candidate.agreed && <i className="fa-solid fa-check"></i>}
                  </div>
                  <span className="cine-declaration-text">
                    I attest that all submissions and code telemetry are authentic and represent my genuine craft.
                  </span>
                </div>
              </div>
              {error && <div className="cine-error-hint"><i className="fa-solid fa-circle-exclamation"></i> {error}</div>}
            </div>
          )}

          {/* ================================================================= */}
          {/* TRANSMITTING OVERLAY (PHASED HYPER-DRIVE)                          */}
          {/* ================================================================= */}
          {isTransmitting && (
            <div className="cine-transmission-overlay">
              <div className="cine-transmitting-orb">
                <div className="orb-pulse-ring"></div>
                <i className="fa-solid fa-satellite-dish"></i>
              </div>

              <h2 className="transmission-phase-title">
                {transmissionPhase === 1 && 'ENCRYPTING CANDIDATE DOSSIER...'}
                {transmissionPhase === 2 && 'ALLOCATING PEER REVIEW POD...'}
                {transmissionPhase === 3 && 'BROADCASTING TELEMETRY TO CORE...'}
              </h2>

              <div className="transmission-bar-outer">
                <div className="transmission-bar-fill" style={{ width: `${transmissionPercent}%` }}></div>
              </div>

              <span className="transmission-sub">ESTABLISHING SECURE WEBSOCKET HANDSHAKE WITH AETHRIZ NETWORK</span>
            </div>
          )}

          {/* ================================================================= */}
          {/* STEP 10: SUCCESS // TRANSMISSION CONFIRMED                        */}
          {/* ================================================================= */}
          {step === 10 && (
            <div className="cine-success-theater">
              <div className="cine-success-ring">
                <svg className="cine-checkmark-svg" viewBox="0 0 52 52">
                  <circle className="cine-svg-circle" cx="26" cy="26" r="24" fill="none" />
                  <path className="cine-svg-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
              </div>

              <span className="cine-success-kicker">TRANSMISSION CONFIRMED // DOSSIER SECURED</span>
              <h1 className="cine-success-title">
                You're in the <i>Vanguard.</i>
              </h1>
              <p className="cine-success-desc">
                Your dossier for <strong>{role}</strong> has been written to the AETHRIZ talent substrate.
                Our core architects review submissions daily.
              </p>

              <div className="cine-ref-strip">
                <div className="ref-item-col">
                  <span className="ref-meta-label">CANDIDATE ID</span>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="ref-meta-val red">{refId}</span>
                    <button type="button" className="ref-copy-icon-btn" onClick={copyRef} title="Copy ID">
                      <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                    </button>
                  </div>
                </div>
                <div className="ref-item-col">
                  <span className="ref-meta-label">TARGET TRACK</span>
                  <span className="ref-meta-val">{role}</span>
                </div>
                <div className="ref-item-col">
                  <span className="ref-meta-label">SECURITY STATUS</span>
                  <span className="ref-meta-val" style={{ color: '#10B981' }}>VERIFIED</span>
                </div>
              </div>

              <div className="cine-roadmap-strip">
                <div className="roadmap-pip active">
                  <div className="pip-circle"><i className="fa-solid fa-check"></i></div>
                  <span className="pip-label">Received</span>
                </div>
                <div className="roadmap-wire"></div>

                <div className="roadmap-pip active">
                  <div className="pip-circle"><i className="fa-solid fa-bolt"></i></div>
                  <span className="pip-label">Reviewing</span>
                </div>
                <div className="roadmap-wire"></div>

                <div className="roadmap-pip">
                  <div className="pip-circle">3</div>
                  <span className="pip-label">Shortlist</span>
                </div>
                <div className="roadmap-wire"></div>

                <div className="roadmap-pip">
                  <div className="pip-circle">4</div>
                  <span className="pip-label">Deep-Dive</span>
                </div>
                <div className="roadmap-wire"></div>

                <div className="roadmap-pip">
                  <div className="pip-circle">5</div>
                  <span className="pip-label">Induction</span>
                </div>
              </div>

              <button
                type="button"
                className="cine-btn-forward"
                style={{ padding: '0 40px', height: '52px' }}
                onClick={onExit}
              >
                RETURN TO PLATFORM <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* FLOATING BOTTOM CONTROLLER & HOTKEYS HUD */}
      {step <= totalQuestions && !isTransmitting && (
        <footer className="cine-bottom-controller">
          <div className="cine-hotkey-hints">
            <span className="hotkey-pill">
              <span className="kbd-badge">↵ ENTER</span> Advance
            </span>
            <span className="hotkey-pill">
              <span className="kbd-badge">ESC</span> Exit
            </span>
            {step === 4 && (
              <span className="hotkey-pill">
                <span className="kbd-badge">1 - 4</span> Quick Select
              </span>
            )}
          </div>

          <div className="cine-btn-group">
            {step > 0 && (
              <button
                type="button"
                className="cine-btn-back"
                onClick={stepBack}
              >
                <i className="fa-solid fa-arrow-left"></i> BACK
              </button>
            )}

            <button
              type="button"
              className="cine-btn-forward"
              onClick={advanceStep}
            >
              {step === 0 && 'INITIALIZE PROTOCOL ↵'}
              {step > 0 && step < totalQuestions && 'CONTINUE ↵'}
              {step === totalQuestions && 'TRANSMIT DOSSIER ↵'}
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
