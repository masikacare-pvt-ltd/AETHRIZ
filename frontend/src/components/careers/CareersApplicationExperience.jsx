import React, { useState, useEffect, useRef, useMemo } from 'react';
import '../../styles/careers-application.css';
import { getSkillsForRole } from '../../data/careersData';

const GOOGLE_SHEET_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxc_-D6X0uozC2P3nDMkrSxdQHFj7Ma73XUL9c6H2bmBWTh3Rb4wTW3MkY9n-3rPPZm/exec';

const JOURNEY_OPTIONS = [
  { id: '1st_year', title: '1st Year Student', desc: 'Exploring fundamentals & early projects' },
  { id: '2nd_year', title: '2nd Year Student', desc: 'Building core engineering depth' },
  { id: '3rd_year', title: '3rd Year Student', desc: 'Developing practical systems & apps' },
  { id: 'final_year', title: 'Final Year / Pre-Grad', desc: 'Graduating soon & ready to ship' },
  { id: 'graduated', title: 'Graduated / Working', desc: 'Industry builder or recent alumni' },
  { id: 'independent', title: 'Independent Builder', desc: 'Self-taught researcher or creator' }
];

export default function CareersApplicationExperience({
  role = 'AI/ML Development',
  rolesList = [],
  onSelectRole,
  onExit
}) {
  // Current step (1 to 6 for questions, 7 for success)
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  const [slideDirection, setSlideDirection] = useState('forward');
  const [showRolePicker, setShowRolePicker] = useState(false);

  // Active role data
  const roleData =
    (rolesList && rolesList.find((r) => r.title.toLowerCase() === role.toLowerCase())) ||
    (rolesList && rolesList[0]) || {
      title: role,
      dept: 'Engineering & Innovation',
      location: '100% Remote',
      duration: '3 Months (Oct 15, 2026 – Jan 15, 2027)',
      overview:
        'Contribute to production bio-algorithmic systems, research datasets, and high-velocity health intelligence deliverables.',
      skills: ['Python', 'PyTorch', 'React', 'TypeScript', 'System Architecture'],
      responsibilities: [
        'Engineer predictive algorithmic models and low-latency inference pipelines.',
        'Collaborate directly with core technology founders on real production initiatives.',
        'Ship tested, performant, and well-documented deliverables.'
      ]
    };

  // Candidate Data State
  const [formData, setFormData] = useState({
    // Step 1: Tell us about yourself
    fullName: '',
    email: '',
    phone: '',
    location: '',

    // Step 2: Education / Journey
    journeyStage: '',
    institution: '',

    // Step 3: Skills
    skills: [],
    customSkill: '',

    // Step 4: Projects & Work
    featuredProject: '',
    projectLink: '',
    githubUrl: '',
    portfolioUrl: '',

    // Step 5: Resume
    resumeFileName: '',
    resumeFileSize: '',
    resumeBase64: '',

    // Step 6: Motivation & Declaration
    whyJoin: '',
    agreed: false
  });

  const [validationError, setValidationError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refId, setRefId] = useState('');
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef(null);
  const formViewportRef = useRef(null);
  const journeyDropdownRef = useRef(null);

  const [isJourneyDropdownOpen, setIsJourneyDropdownOpen] = useState(false);
  const [customSkillsList, setCustomSkillsList] = useState([]);
  const [customSkillInput, setCustomSkillInput] = useState('');

  // Dynamically resolve all deduplicated skills specifically tailored to the active role in ONE unified list
  const allSkillsList = useMemo(() => {
    const baseSkills = getSkillsForRole(roleData?.title || role, roleData?.skills || []);
    const combined = [...baseSkills, ...customSkillsList];
    const seen = new Set();
    const unique = [];
    for (const sk of combined) {
      if (!sk || typeof sk !== 'string') continue;
      const clean = sk.trim();
      const lower = clean.toLowerCase();
      if (!seen.has(lower)) {
        seen.add(lower);
        unique.push(clean);
      }
    }
    return unique;
  }, [role, roleData, customSkillsList]);

  // Close journey dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (journeyDropdownRef.current && !journeyDropdownRef.current.contains(e.target)) {
        setIsJourneyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto scroll to top when changing steps
  useEffect(() => {
    if (formViewportRef.current) {
      formViewportRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  // Keyboard navigation (Enter to advance, Escape to exit)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isSubmitting || currentStep === 7) return;

      if (e.key === 'Escape') {
        onExit();
        return;
      }

      if (e.key === 'Enter') {
        if (e.target.tagName === 'TEXTAREA' && !e.ctrlKey && !e.metaKey) {
          return;
        }
        if (e.target.classList && e.target.classList.contains('toolkit-direct-input')) {
          return;
        }
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, formData, isSubmitting]);

  // Validation per step
  const validateStep = (stepNumber) => {
    setValidationError('');
    if (stepNumber === 1) {
      if (!formData.fullName.trim()) {
        setValidationError('Please enter your full name.');
        return false;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setValidationError('Please provide a valid email address.');
        return false;
      }
      if (!formData.phone.trim()) {
        setValidationError('Please provide your phone or WhatsApp number.');
        return false;
      }
      if (!formData.location.trim()) {
        setValidationError('Please share your current city or location.');
        return false;
      }
    } else if (stepNumber === 2) {
      if (!formData.journeyStage) {
        setValidationError('Please select the stage that best fits your journey.');
        return false;
      }
      if (!formData.institution.trim()) {
        setValidationError('Please enter your university, college, or current organization.');
        return false;
      }
    } else if (stepNumber === 3) {
      if (formData.skills.length === 0) {
        setValidationError('Please select at least one skill or technology.');
        return false;
      }
    } else if (stepNumber === 4) {
      if (!formData.featuredProject.trim() && !formData.githubUrl.trim() && !formData.portfolioUrl.trim()) {
        setValidationError('Please share a project description, GitHub profile, or portfolio URL.');
        return false;
      }
    } else if (stepNumber === 5) {
      if (!formData.resumeFileName) {
        setValidationError('Please upload your resume (PDF or DOCX).');
        return false;
      }
    } else if (stepNumber === 6) {
      if (!formData.whyJoin.trim() || formData.whyJoin.trim().length < 15) {
        setValidationError('Please write a brief note on what excites you about this role.');
        return false;
      }
      if (!formData.agreed) {
        setValidationError('Please confirm that your submitted details are accurate.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 6) {
      submitApplication();
      return;
    }
    if (validateStep(currentStep)) {
      setSlideDirection('forward');
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setValidationError('');
    setSlideDirection('backward');
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const jumpToStep = (target) => {
    setValidationError('');
    setSlideDirection(target < currentStep ? 'backward' : 'forward');
    setCurrentStep(target);
  };

  // Skill toggling
  const toggleSkill = (skill) => {
    setFormData((prev) => {
      const exists = prev.skills.includes(skill);
      const nextSkills = exists ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill];
      return { ...prev, skills: nextSkills };
    });
    setValidationError('');
  };

  const handleDirectSkillAdd = () => {
    const val = customSkillInput.trim().replace(/^,+|,+$/g, '');
    if (!val) return;

    const lower = val.toLowerCase();
    if (!formData.skills.some((s) => s.toLowerCase() === lower)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, val]
      }));
    }
    if (!allSkillsList.some((s) => s.toLowerCase() === lower) && !customSkillsList.some((s) => s.toLowerCase() === lower)) {
      setCustomSkillsList((prev) => [...prev, val]);
    }
    setCustomSkillInput('');
    setValidationError('');
  };

  // Resume File handling
  const handleFile = (file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setValidationError('Max file size is 10MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1] || reader.result;
      setFormData((prev) => ({
        ...prev,
        resumeFileName: file.name,
        resumeFileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        resumeBase64: base64
      }));
      setValidationError('');
    };
    reader.readAsDataURL(file);
  };

  // Submit Application
  const submitApplication = async () => {
    if (!validateStep(6)) return;

    setIsSubmitting(true);
    const newRefId = `AETHRIZ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const payload = {
      refId: newRefId,
      position: role,
      fullName: formData.fullName,
      emailAddress: formData.email,
      phone: formData.phone,
      cityState: formData.location,
      journeyStage: formData.journeyStage,
      collegeCourse: formData.institution,
      keySkills: formData.skills.join(', '),
      featuredProject: formData.featuredProject,
      portfolioUrl: formData.portfolioUrl || formData.githubUrl || formData.projectLink,
      resumeFileName: formData.resumeFileName,
      resumeBase64: formData.resumeBase64,
      whyJoin: formData.whyJoin
    };

    try {
      if (GOOGLE_SHEET_ENDPOINT) {
        await fetch(GOOGLE_SHEET_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });
      }
    } catch (err) {
      console.warn('Submission notice:', err);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        setRefId(newRefId);
        setCurrentStep(7); // Show success screen
      }, 1200);
    }
  };

  const copyRefToClipboard = () => {
    if (refId) {
      navigator.clipboard.writeText(refId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const progressPercent = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  return (
    <div className="careers-split-layout">
      {/* =================================================================== */}
      {/* LEFT 30% SCREEN: ROLE NAME & DETAILS PANEL                          */}
      {/* =================================================================== */}
      <aside className="cine-role-sidebar">
        <div className="sidebar-ambient-glow"></div>

        {/* Brand & Cohort Pill */}
        <div className="sidebar-top-brand">
          <div className="sidebar-brand-name">
            <span>AETHRIZ</span>
            <span className="brand-red-dot"></span>
          </div>
          <span className="sidebar-cohort-chip">WINTER 2026-27</span>
        </div>

        {/* Role Header (Track Switcher Removed) */}
        <div className="sidebar-role-header">
          <span className="sidebar-kicker">// APPLICATION TRACK</span>
          <h2 className="sidebar-role-title">
            {roleData.title.split(' ')[0]} <i>{roleData.title.split(' ').slice(1).join(' ')}</i>
          </h2>
        </div>

        {/* Metadata Badges */}
        <div className="sidebar-meta-badges">
          <div className="sidebar-meta-pill">
            <i className="fa-solid fa-layer-group" style={{ color: '#E81A2D' }}></i>
            <span>{roleData.dept}</span>
          </div>
          <div className="sidebar-meta-pill">
            <i className="fa-solid fa-location-dot" style={{ color: '#E81A2D' }}></i>
            <span>100% Remote</span>
          </div>
          <div className="sidebar-meta-pill">
            <i className="fa-regular fa-clock" style={{ color: '#E81A2D' }}></i>
            <span>3 Months</span>
          </div>
        </div>

        {/* Role Overview */}
        <div className="sidebar-section">
          <span className="sidebar-section-title">ROLE OVERVIEW</span>
          <p className="sidebar-overview-text">{roleData.overview}</p>
        </div>

        {/* Key Responsibilities */}
        {roleData.responsibilities && roleData.responsibilities.length > 0 && (
          <div className="sidebar-section">
            <span className="sidebar-section-title">WHAT YOU WILL WORK ON</span>
            <ul className="sidebar-bullets-list">
              {roleData.responsibilities.map((resp, idx) => (
                <li key={idx}>
                  <span className="bullet-arrow">▹</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Competencies / Skills */}
        {roleData.skills && roleData.skills.length > 0 && (
          <div className="sidebar-section">
            <span className="sidebar-section-title">DESIRED COMPETENCIES</span>
            <div className="sidebar-tags-cloud">
              {roleData.skills.map((sk) => (
                <span key={sk} className="sidebar-skill-tag">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Cohort Perks */}
        <div className="sidebar-perks-box">
          <div className="perk-mini-item">
            <i className="fa-solid fa-certificate" style={{ color: '#E81A2D' }}></i>
            <span>Offer Letter & Official Completion Certificate</span>
          </div>
          <div className="perk-mini-item">
            <i className="fa-solid fa-user-astronaut" style={{ color: '#E81A2D' }}></i>
            <span>Direct 1-on-1 mentorship with founders</span>
          </div>
        </div>

        {/* Bottom Return Button */}
        <div className="sidebar-footer">
          <button type="button" className="sidebar-return-btn" onClick={onExit}>
            <i className="fa-solid fa-arrow-left"></i>
            <span>RETURN TO CAREERS</span>
          </button>
        </div>
      </aside>

      {/* =================================================================== */}
      {/* RIGHT 70% SCREEN: MULTI-STEP APPLICATION FORM                       */}
      {/* =================================================================== */}
      <section className="cine-form-stage">
        {/* Background Mesh & Grid */}
        <div className="cine-stage-mesh"></div>
        <div className="cine-stage-grid"></div>

        {/* Top Progress & Header Bar */}
        <header className="stage-top-bar">
          <div className="stage-step-pill">
            <span className="step-prefix">STEP</span>
            <span className="step-current">0{Math.min(currentStep, totalSteps)}</span>
            <span className="step-divider">/</span>
            <span className="step-total">0{totalSteps}</span>
          </div>

          <div className="stage-progress-track">
            <div className="stage-progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>

          <button type="button" className="stage-close-btn" onClick={onExit} title="Close application">
            <i className="fa-solid fa-xmark"></i>
            <span>CLOSE</span>
          </button>
        </header>

        {/* Main Sliding Form Body */}
        <div className="stage-form-viewport" ref={formViewportRef}>
          <div
            className={`stage-slide-content ${
              slideDirection === 'forward' ? 'stage-slide-fwd' : 'stage-slide-bwd'
            }`}
            key={currentStep}
          >
            {/* ============================================================= */}
            {/* STEP 1: TELL US ABOUT YOURSELF                                */}
            {/* ============================================================= */}
            {currentStep === 1 && (
              <div className="stage-card-box">
                <div className="stage-header-group">
                  <span className="stage-kicker">01 / 06 • INTRODUCTION</span>
                  <h1 className="stage-h1">
                    Tell us about <i>yourself.</i>
                  </h1>
                  <p className="stage-desc">
                    Enter your contact details so our team can reach out when your profile matches the role.
                  </p>
                </div>

                <div className="stage-form-grid">
                  <div className="stage-field">
                    <label className="stage-label">
                      FULL NAME <span className="req-dot">*</span>
                    </label>
                    <div className="stage-input-wrap">
                      <i className="fa-regular fa-user input-icon"></i>
                      <input
                        type="text"
                        className="stage-text-input"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          setValidationError('');
                        }}
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="stage-field">
                    <label className="stage-label">
                      EMAIL ADDRESS <span className="req-dot">*</span>
                    </label>
                    <div className="stage-input-wrap">
                      <i className="fa-regular fa-envelope input-icon"></i>
                      <input
                        type="email"
                        className="stage-text-input"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          setValidationError('');
                        }}
                      />
                    </div>
                  </div>

                  <div className="stage-field">
                    <label className="stage-label">
                      PHONE / WHATSAPP <span className="req-dot">*</span>
                    </label>
                    <div className="stage-input-wrap">
                      <i className="fa-solid fa-phone input-icon"></i>
                      <input
                        type="tel"
                        className="stage-text-input"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          setValidationError('');
                        }}
                      />
                    </div>
                  </div>

                  <div className="stage-field">
                    <label className="stage-label">
                      CURRENT CITY & COUNTRY <span className="req-dot">*</span>
                    </label>
                    <div className="stage-input-wrap">
                      <i className="fa-solid fa-location-dot input-icon"></i>
                      <input
                        type="text"
                        className="stage-text-input"
                        value={formData.location}
                        onChange={(e) => {
                          setFormData({ ...formData, location: e.target.value });
                          setValidationError('');
                        }}
                      />
                    </div>
                  </div>
                </div>

                {validationError && (
                  <div className="stage-val-error">
                    <i className="fa-solid fa-circle-exclamation"></i> {validationError}
                  </div>
                )}
              </div>
            )}

            {/* ============================================================= */}
            {/* STEP 2: EDUCATION & JOURNEY                                   */}
            {/* ============================================================= */}
            {currentStep === 2 && (
              <div className="stage-card-box">
                <div className="stage-header-group">
                  <span className="stage-kicker">02 / 06 • EDUCATION</span>
                  <h1 className="stage-h1">
                    Your education & <i>journey.</i>
                  </h1>
                  <p className="stage-desc">
                    Select the stage that best fits your current path and where you study or build.
                  </p>
                </div>

                {/* Clean Modern Dropdown (No Checkboxes) */}
                <div className="stage-field" ref={journeyDropdownRef} style={{ position: 'relative', marginBottom: '16px' }}>
                  <label className="stage-label">
                    CURRENT EDUCATION / EXPERIENCE MILESTONE <span className="req-dot">*</span>
                  </label>
                  <button
                    type="button"
                    className={`stage-custom-select-trigger ${isJourneyDropdownOpen ? 'open' : ''}`}
                    onClick={() => setIsJourneyDropdownOpen(!isJourneyDropdownOpen)}
                  >
                    <div className="trigger-left">
                      <i className="fa-solid fa-graduation-cap trigger-icon"></i>
                      {formData.journeyStage ? (
                        <div className="trigger-selection-text">
                          <span className="trigger-title">
                            {JOURNEY_OPTIONS.find((o) => o.id === formData.journeyStage)?.title}
                          </span>
                          <span className="trigger-sep">•</span>
                          <span className="trigger-desc">
                            {JOURNEY_OPTIONS.find((o) => o.id === formData.journeyStage)?.desc}
                          </span>
                        </div>
                      ) : (
                        <span className="trigger-placeholder">
                          Select your education stage...
                        </span>
                      )}
                    </div>
                    <i className={`fa-solid fa-chevron-down trigger-chevron ${isJourneyDropdownOpen ? 'rotated' : ''}`}></i>
                  </button>

                  {isJourneyDropdownOpen && (
                    <div className="stage-custom-dropdown-menu">
                      {JOURNEY_OPTIONS.map((opt) => {
                        const isSelected = formData.journeyStage === opt.id;
                        return (
                          <div
                            key={opt.id}
                            className={`dropdown-opt-row ${isSelected ? 'selected' : ''}`}
                            onClick={() => {
                              setFormData({ ...formData, journeyStage: opt.id });
                              setValidationError('');
                              setIsJourneyDropdownOpen(false);
                            }}
                          >
                            <div className="opt-text-block">
                              <span className="opt-title">{opt.title}</span>
                              <span className="opt-desc">{opt.desc}</span>
                            </div>
                            {isSelected && (
                              <i className="fa-solid fa-check opt-selected-check"></i>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="stage-field" style={{ marginTop: '20px' }}>
                  <label className="stage-label">
                    COLLEGE / UNIVERSITY OR LATEST ORGANIZATION <span className="req-dot">*</span>
                  </label>
                  <div className="stage-input-wrap">
                    <i className="fa-solid fa-graduation-cap input-icon"></i>
                    <input
                      type="text"
                      className="stage-text-input"
                      value={formData.institution}
                      onChange={(e) => {
                        setFormData({ ...formData, institution: e.target.value });
                        setValidationError('');
                      }}
                      autoFocus
                    />
                  </div>
                </div>

                {validationError && (
                  <div className="stage-val-error">
                    <i className="fa-solid fa-circle-exclamation"></i> {validationError}
                  </div>
                )}
              </div>
            )}

            {/* ============================================================= */}
            {/* STEP 3: SKILLS & TOOLS (PERSONAL TECH STACK ARCHITECTURE)     */}
            {/* ============================================================= */}
            {currentStep === 3 && (
              <div className="stage-card-box stage-tech-stack-stage">
                <div className="stage-header-group">
                  <span className="stage-kicker">03 / 06 • TECH STACK</span>
                  <h1 className="stage-h1">
                    Your skills & <i>tools.</i>
                  </h1>
                  <p className="stage-desc">
                    Build your toolkit.
                  </p>
                </div>

                {/* DYNAMIC TECH STACK DOCK: "YOUR TOOLKIT" */}
                <div className="toolkit-dynamic-dock">
                  <div className="toolkit-dock-header">
                    <div className="toolkit-dock-title-group">
                      <span className="toolkit-dock-kicker">// YOUR TOOLKIT</span>
                      <span className="toolkit-dock-beacon">
                        <span className="toolkit-beacon-dot"></span>
                        <span className="toolkit-count-label">
                          {formData.skills.length} {formData.skills.length === 1 ? 'MODULE' : 'MODULES'} ASSEMBLED
                        </span>
                      </span>
                    </div>
                    {formData.skills.length > 0 && (
                      <button
                        type="button"
                        className="toolkit-reset-btn"
                        onClick={() => setFormData({ ...formData, skills: [] })}
                        title="Clear current toolkit"
                      >
                        <i className="fa-solid fa-rotate-left"></i> Reset Stack
                      </button>
                    )}
                  </div>

                  <div className="toolkit-dock-body">
                    {formData.skills.length === 0 ? (
                      <div className="toolkit-empty-blueprint">
                        <i className="fa-solid fa-network-wired empty-blueprint-icon"></i>
                        <span>No modules deployed yet. Tap technologies below to assemble your personal tech stack.</span>
                      </div>
                    ) : (
                      <div className="toolkit-chips-stream">
                        {formData.skills.map((sk) => (
                          <div key={sk} className="toolkit-assembled-chip">
                            <span className="toolkit-node-point"></span>
                            <span className="toolkit-node-text">{sk}</span>
                            <button
                              type="button"
                              className="toolkit-node-remove"
                              onClick={() => toggleSkill(sk)}
                              title={`Remove ${sk} from toolkit`}
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* DIRECT SKILL TYPING / WRITING INPUT */}
                <div className="toolkit-type-write-box">
                  <label className="stage-label" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fa-solid fa-keyboard" style={{ color: '#E81A2D' }}></i>
                    ENTER SKILLS DIRECTLY
                  </label>
                  <div className="toolkit-direct-input-wrap">
                    <i className="fa-solid fa-pen-nib direct-input-icon"></i>
                    <input
                      type="text"
                      className="toolkit-direct-input"
                      placeholder="Type any skill and press Enter (e.g. Next.js, Docker, PyTorch)..."
                      value={customSkillInput}
                      onChange={(e) => setCustomSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ',') {
                          e.preventDefault();
                          handleDirectSkillAdd();
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="toolkit-direct-add-btn"
                      onClick={handleDirectSkillAdd}
                      disabled={!customSkillInput.trim()}
                    >
                      <i className="fa-solid fa-plus"></i> Add
                    </button>
                  </div>
                  <span className="toolkit-direct-hint">
                    Type any technical skill and press <kbd>Enter</kbd> to add it directly to your stack.
                  </span>
                </div>

                {/* TOP 5 DOMAIN SKILLS DECK */}
                <div className="skill-cat-deck unified-skills-deck">
                  <div className="skill-cat-legend">
                    <div className="skill-cat-label-wrap">
                      <i className="fa-solid fa-star skill-cat-glyph"></i>
                      <span className="skill-cat-name">TOP 5 DOMAIN SKILLS • {roleData.title}</span>
                    </div>
                    {formData.skills.length > 0 && (
                      <span className="skill-cat-status-badge">
                        {formData.skills.length} ASSEMBLED
                      </span>
                    )}
                  </div>
                  <div className="skill-grid-cells">
                    {allSkillsList.map((sk) => {
                      const isSelected = formData.skills.includes(sk);
                      return (
                        <button
                          key={sk}
                          type="button"
                          className={`tech-module-card ${isSelected ? 'active' : ''}`}
                          onClick={() => toggleSkill(sk)}
                        >
                          <div className="tech-module-node">
                            <i className={`fa-solid ${isSelected ? 'fa-check' : 'fa-plus'}`}></i>
                          </div>
                          <span className="tech-module-title">{sk}</span>
                          {isSelected && <span className="tech-module-active-halo"></span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {validationError && (
                  <div className="stage-val-error">
                    <i className="fa-solid fa-circle-exclamation"></i> {validationError}
                  </div>
                )}
              </div>
            )}

            {/* ============================================================= */}
            {/* STEP 4: WORK & PROJECTS                                       */}
            {/* ============================================================= */}
            {currentStep === 4 && (
              <div className="stage-card-box">
                <div className="stage-header-group">
                  <span className="stage-kicker">04 / 06 • YOUR WORK</span>
                  <h1 className="stage-h1">
                    Your work & <i>projects.</i>
                  </h1>
                  <p className="stage-desc">
                    Tell us about a project, application, or system you've built that demonstrates your skills.
                  </p>
                </div>

                <div className="stage-field" style={{ marginBottom: '18px' }}>
                  <label className="stage-label">
                    PROJECT SUMMARY & WHAT YOU BUILT <span className="req-dot">*</span>
                  </label>
                  <textarea
                    className="stage-textarea"
                    rows={3}
                    value={formData.featuredProject}
                    onChange={(e) => {
                      setFormData({ ...formData, featuredProject: e.target.value });
                      setValidationError('');
                    }}
                    autoFocus
                  ></textarea>
                </div>

                <div className="stage-form-grid">
                  <div className="stage-field">
                    <label className="stage-label">GITHUB / CODE REPOSITORY</label>
                    <div className="stage-input-wrap">
                      <i className="fa-brands fa-github input-icon"></i>
                      <input
                        type="url"
                        className="stage-text-input"
                        value={formData.githubUrl}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="stage-field">
                    <label className="stage-label">LIVE DEMO / PORTFOLIO LINK</label>
                    <div className="stage-input-wrap">
                      <i className="fa-solid fa-arrow-up-right-from-square input-icon"></i>
                      <input
                        type="url"
                        className="stage-text-input"
                        value={formData.portfolioUrl}
                        onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {validationError && (
                  <div className="stage-val-error">
                    <i className="fa-solid fa-circle-exclamation"></i> {validationError}
                  </div>
                )}
              </div>
            )}

            {/* ============================================================= */}
            {/* STEP 5: RESUME UPLOAD                                         */}
            {/* ============================================================= */}
            {currentStep === 5 && (
              <div className="stage-card-box">
                <div className="stage-header-group">
                  <span className="stage-kicker">05 / 06 • RESUME</span>
                  <h1 className="stage-h1">
                    Attach your <i>resume.</i>
                  </h1>
                  <p className="stage-desc">
                    Upload your CV or resume so our team can review your background and experience.
                  </p>
                </div>

                {formData.resumeFileName ? (
                  <div className="stage-file-preview">
                    <div className="file-icon-box">
                      <i className="fa-solid fa-file-pdf"></i>
                    </div>
                    <div className="file-meta-col">
                      <span className="file-status-badge">
                        <i className="fa-solid fa-circle-check"></i> READY FOR SUBMISSION
                      </span>
                      <h4 className="file-title-text">{formData.resumeFileName}</h4>
                      <span className="file-size-label">{formData.resumeFileSize}</span>
                    </div>
                    <button
                      type="button"
                      className="file-change-btn"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    >
                      Replace
                    </button>
                  </div>
                ) : (
                  <div
                    className={`stage-dropzone ${isDragging ? 'drag-over' : ''}`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleFile(e.dataTransfer.files[0]);
                      }
                    }}
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  >
                    <div className="dropzone-circle-icon">
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                    </div>
                    <h4 className="dropzone-heading">Drop your resume here, or browse files</h4>
                    <p className="dropzone-sub">Accepted formats: PDF or DOCX (up to 10MB)</p>
                    <span className="dropzone-browse-tag">
                      <i className="fa-solid fa-folder-open"></i> Browse Files
                    </span>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFile(e.target.files[0]);
                    }
                  }}
                />

                {validationError && (
                  <div className="stage-val-error">
                    <i className="fa-solid fa-circle-exclamation"></i> {validationError}
                  </div>
                )}
              </div>
            )}

            {/* ============================================================= */}
            {/* STEP 6: MOTIVATION & REVIEW                                   */}
            {/* ============================================================= */}
            {currentStep === 6 && (
              <div className="stage-card-box">
                <div className="stage-header-group">
                  <span className="stage-kicker">06 / 06 • FINAL STEP</span>
                  <h1 className="stage-h1">
                    Almost <i>done.</i>
                  </h1>
                  <p className="stage-desc">
                    Write a quick note on why you'd like to work with AETHRIZ, and verify your details.
                  </p>
                </div>

                <div className="stage-field" style={{ marginBottom: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                    <label className="stage-label">
                      WHY DO YOU WANT TO JOIN AETHRIZ? <span className="req-dot">*</span>
                    </label>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: '#64748B' }}>
                      {formData.whyJoin ? formData.whyJoin.trim().split(/\s+/).filter(Boolean).length : 0} words
                    </span>
                  </div>
                  <textarea
                    className="stage-textarea"
                    rows={3}
                    value={formData.whyJoin}
                    onChange={(e) => {
                      setFormData({ ...formData, whyJoin: e.target.value });
                      setValidationError('');
                    }}
                    autoFocus
                  ></textarea>
                </div>

                {/* Review Summary Card */}
                <div className="stage-review-deck">
                  <div className="review-deck-top">
                    <div>
                      <span className="review-sub-kicker">SUMMARY</span>
                      <h4 className="review-cand-name">{formData.fullName || 'Candidate'}</h4>
                    </div>
                    <span className="review-track-badge">{role}</span>
                  </div>

                  <div className="review-deck-grid">
                    <div className="review-deck-col">
                      <div className="review-block">
                        <span className="review-block-label">Contact</span>
                        <span className="review-block-main">{formData.email}</span>
                        <span className="review-block-sub">{formData.phone} • {formData.location}</span>
                      </div>
                      <div className="review-block" style={{ marginTop: '10px' }}>
                        <span className="review-block-label">Education</span>
                        <span className="review-block-main">{formData.institution}</span>
                        <span className="review-block-sub" style={{ textTransform: 'capitalize' }}>
                          {formData.journeyStage.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="review-deck-col">
                      <div className="review-block">
                        <span className="review-block-label">Skills Selected</span>
                        <div className="review-pill-row">
                          {formData.skills.slice(0, 4).map((s) => (
                            <span key={s} className="review-tag">{s}</span>
                          ))}
                          {formData.skills.length > 4 && (
                            <span className="review-tag">+{formData.skills.length - 4}</span>
                          )}
                        </div>
                      </div>
                      <div className="review-block" style={{ marginTop: '10px' }}>
                        <span className="review-block-label">Attached Resume</span>
                        <span className="review-block-main" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <i className="fa-solid fa-file-pdf" style={{ color: '#E81A2D' }}></i>
                          {formData.resumeFileName || 'None'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confirmation Checkbox */}
                <label
                  className="stage-checkbox-row"
                  onClick={() => setFormData({ ...formData, agreed: !formData.agreed })}
                >
                  <div className={`stage-check-sq ${formData.agreed ? 'checked' : ''}`}>
                    {formData.agreed && <i className="fa-solid fa-check"></i>}
                  </div>
                  <span className="stage-check-text">
                    I confirm that the information provided is accurate and authentic.
                  </span>
                </label>

                {validationError && (
                  <div className="stage-val-error" style={{ marginTop: '14px' }}>
                    <i className="fa-solid fa-circle-exclamation"></i> {validationError}
                  </div>
                )}
              </div>
            )}

            {/* ============================================================= */}
            {/* STEP 7: APPLICATION SUBMITTED (SUCCESS SCREEN)                */}
            {/* ============================================================= */}
            {currentStep === 7 && (
              <div className="stage-card-box stage-success-box">
                <div className="success-icon-badge">
                  <i className="fa-solid fa-circle-check"></i>
                </div>

                <span className="stage-kicker" style={{ color: '#10B981' }}>APPLICATION RECEIVED</span>
                <h1 className="stage-h1" style={{ marginBottom: '12px' }}>
                  Thank you for <i>applying.</i>
                </h1>
                <p className="stage-desc" style={{ maxWidth: '520px', margin: '0 auto 28px' }}>
                  Your application for <strong>{role}</strong> has been received by our hiring team.
                  We review applications carefully and will be in touch if your profile matches our needs.
                </p>

                <div className="success-receipt-card">
                  <div className="receipt-col">
                    <span className="receipt-label">APPLICATION ID</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="receipt-val crimson">{refId}</span>
                      <button
                        type="button"
                        onClick={copyRefToClipboard}
                        className="receipt-copy-btn"
                        title="Copy Reference ID"
                      >
                        <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                      </button>
                    </div>
                  </div>

                  <div className="receipt-col">
                    <span className="receipt-label">ROLE APPLIED FOR</span>
                    <span className="receipt-val">{role}</span>
                  </div>

                  <div className="receipt-col">
                    <span className="receipt-label">STATUS</span>
                    <span className="receipt-val" style={{ color: '#10B981' }}>SUBMITTED</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="stage-primary-btn"
                  style={{ padding: '0 36px', height: '48px', marginTop: '28px' }}
                  onClick={onExit}
                >
                  RETURN TO CAREERS <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Floating Bottom Action Bar */}
        {currentStep <= totalSteps && (
          <footer className="stage-bottom-bar">
            <div className="stage-actions-col">
              {currentStep > 1 && (
                <button
                  type="button"
                  className="stage-secondary-btn"
                  onClick={handleBack}
                  disabled={isSubmitting}
                >
                  <i className="fa-solid fa-arrow-left"></i> BACK
                </button>
              )}

              <button
                type="button"
                className="stage-primary-btn"
                onClick={handleNext}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin"></i> SUBMITTING...
                  </>
                ) : currentStep === totalSteps ? (
                  <>
                    SUBMIT APPLICATION <i className="fa-solid fa-paper-plane"></i>
                  </>
                ) : (
                  <>
                    CONTINUE <i className="fa-solid fa-arrow-right"></i>
                  </>
                )}
              </button>
            </div>
          </footer>
        )}
      </section>
    </div>
  );
}
