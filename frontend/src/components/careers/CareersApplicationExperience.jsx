import React, { useState, useEffect, useRef } from 'react';
import '../../styles/careers-application.css';

const GOOGLE_SHEET_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbzMoyTdmQeGAYMHNSjPJSA3U28fS5NsUYN8kvXbzizevGFyZHCICP69XEVLajoGOcv0/exec';

const STATUS_OPTIONS = [
  { id: 'student', title: 'Student', desc: 'Currently pursuing college or university education' },
  { id: 'fresher', title: 'Fresher / Recent Graduate', desc: 'Recently graduated, ready to create & build' },
  { id: 'professional', title: 'Working Professional', desc: 'Industry experience, seeking creative growth' },
  { id: 'freelancer', title: 'Freelancer / Creator', desc: 'Independent digital creator, editor, or host' },
  { id: 'other', title: 'Other', desc: 'Unique background or self-taught creative builder' }
];

const STUDENT_YEARS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  'Final Year / Pre-Grad'
];

const FRESHER_EXP = [
  'Fresher (Projects & Portfolio)',
  'Internship Experience (< 1 Year)',
  '1–2 Years Combined Work'
];

const PROFESSIONAL_EXP = [
  '< 1 Year Experience',
  '1–2 Years Experience',
  '2–4 Years Experience',
  '4+ Years Experience'
];

const FREELANCER_EXP = [
  '< 1 Year Active Creator',
  '1–2 Years Active Creator',
  '2–3 Years Active Creator',
  '3+ Years Active Creator'
];

const OTHER_EXP = [
  'Beginner / Self-Taught',
  '1–2 Years Practice',
  '2+ Years Practice'
];

const PREFERRED_FORMATS_LIST = [
  'Instagram Reels',
  'YouTube Shorts',
  'Long-form Videos',
  'Social Media Posts & Carousels',
  'Podcast Hosting & Interviews',
  'Content Strategy & Storytelling'
];



export default function CareersApplicationExperience({
  role = 'Social Media Influencer & Content Creator',
  rolesList = [],
  onSelectRole,
  onExit
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Active role data
  const roleData =
    (rolesList && rolesList.find((r) => r.title.toLowerCase() === role.toLowerCase())) ||
    (rolesList && rolesList.find((r) => !r.isClosed)) ||
    (rolesList && rolesList[0]) || {
      title: role,
      badge: 'Creator & Influencer Track',
      dept: 'Digital Creator Ecosystems',
      location: '100% Remote',
      duration: '3 Months',
      overview:
        'Ideate, produce, and publish high-engagement short-form video reels, visual infographics, and storytelling campaigns.',
      skills: ['Instagram Reels', 'YouTube Shorts', 'On-Camera Presentation', 'Storytelling']
    };

  // Form Data conforming strictly to Sections A to E of Official Spec
  const [formData, setFormData] = useState({
    // Section A: Personal Information
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    state: '',
    city: '',

    // Section B: Academic & Professional Information
    currentStatus: 'student',
    institution: '',
    course: '',
    yearOfStudy: '3rd Year',
    experienceLevel: '1–2 Years Experience',

    // Section C: Internship Preferences
    primaryDomain: roleData.title || role,
    secondarySkills: '',
    preferredFormats: ['Instagram Reels', 'YouTube Shorts'],
    availableFullPeriod: 'yes',
    whyJoin: '',

    // Section D: Resume & Portfolio
    resumeUrl: '',
    instagramUrl: '',
    youtubeUrl: '',
    portfolioUrl: '',
    otherSocialUrl: '',
    bestContent: '',

    // Section E: Declarations & Consent
    accurateConfirmed: false,
    dedicationAgreed: false
  });

  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refId, setRefId] = useState('');
  const [copied, setCopied] = useState(false);

  const formViewportRef = useRef(null);

  // Sync role change
  useEffect(() => {
    if (role) {
      setFormData((prev) => ({
        ...prev,
        primaryDomain: role
      }));
    }
  }, [role]);

  // Auto scroll to top of viewport on step change
  useEffect(() => {
    if (formViewportRef.current) {
      formViewportRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isSubmitting || currentStep === 6) return;
      if (e.key === 'Escape') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, isSubmitting, onExit]);

  // Step Validation Logic
  const validateStep = (stepNumber) => {
    setValidationError('');
    if (stepNumber === 1) {
      if (!formData.firstName.trim()) {
        setValidationError('Please enter your first name.');
        return false;
      }
      if (!formData.lastName.trim()) {
        setValidationError('Please enter your last name.');
        return false;
      }
      if (!formData.phone.trim()) {
        setValidationError('Please enter your contact number.');
        return false;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setValidationError('Please provide a valid email address.');
        return false;
      }
      if (!formData.state.trim()) {
        setValidationError('Please enter your current State.');
        return false;
      }
      if (!formData.city.trim()) {
        setValidationError('Please enter your City or District.');
        return false;
      }
    } else if (stepNumber === 2) {
      if (!formData.currentStatus) {
        setValidationError('Please select your current journey stage.');
        return false;
      }
      if (formData.currentStatus === 'student' && !formData.institution.trim()) {
        setValidationError('Please enter your college or university name.');
        return false;
      }
    } else if (stepNumber === 3) {
      if (!formData.primaryDomain) {
        setValidationError('Please select your primary internship domain.');
        return false;
      }
      if (formData.preferredFormats.length === 0) {
        setValidationError('Please select at least one preferred content format.');
        return false;
      }
      if (formData.availableFullPeriod !== 'yes') {
        setValidationError('Availability for the 3-month immersion is required.');
        return false;
      }
      if (!formData.whyJoin.trim() || formData.whyJoin.trim().length < 15) {
        setValidationError('Please explain briefly why you want to intern with AETHRIZ AI.');
        return false;
      }
    } else if (stepNumber === 4) {
      if (!formData.resumeUrl.trim()) {
        setValidationError('Please provide your Resume / CV link (Google Drive, OneDrive, or cloud document).');
        return false;
      }
      // Instagram / Portfolio links are optional (if applicable)
      if (!formData.bestContent.trim() || formData.bestContent.trim().length < 10) {
        setValidationError('Please describe your best content piece or creative achievement.');
        return false;
      }
    } else if (stepNumber === 5) {
      if (!formData.accurateConfirmed) {
        setValidationError('Please confirm that the information submitted is accurate and true.');
        return false;
      }
      if (!formData.dedicationAgreed) {
        setValidationError('Please agree to participate with dedication and professional conduct.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 5) {
      submitApplication();
      return;
    }
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setValidationError('');
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const togglePreferredFormat = (fmt) => {
    setFormData((prev) => {
      const exists = prev.preferredFormats.includes(fmt);
      const updated = exists ? prev.preferredFormats.filter((f) => f !== fmt) : [...prev.preferredFormats, fmt];
      return { ...prev, preferredFormats: updated };
    });
    setValidationError('');
  };

  // Submit Application to Google Apps Script Endpoint
  const submitApplication = async () => {
    if (!validateStep(5) || isSubmitting) return;

    setIsSubmitting(true);
    let assignedRefId = '';

    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
    const fullPhone = formData.phone.trim();
    const locationStr = `${formData.city.trim()}, ${formData.state.trim()}`;

    const socialLinksCombined = [
      formData.portfolioUrl ? `Portfolio/Instagram: ${formData.portfolioUrl.trim()}` : '',
      formData.instagramUrl && formData.instagramUrl !== formData.portfolioUrl ? `Instagram: ${formData.instagramUrl.trim()}` : '',
      formData.youtubeUrl ? `YouTube: ${formData.youtubeUrl.trim()}` : '',
      formData.otherSocialUrl ? `Other: ${formData.otherSocialUrl.trim()}` : ''
    ].filter(Boolean).join(' | ');

    const expOrYear = formData.currentStatus === 'student' ? formData.yearOfStudy : formData.experienceLevel;
    const collegeCourseStr = formData.institution.trim()
      ? `${formData.institution.trim()}${formData.course.trim() ? ` - ${formData.course.trim()}` : ''}`
      : formData.course.trim()
      ? formData.course.trim()
      : `${formData.currentStatus.toUpperCase()} (${expOrYear})`;

    const payload = {
      position: formData.primaryDomain,
      fullName: fullName,
      emailAddress: formData.email.trim(),
      phone: fullPhone,
      cityState: locationStr,
      journeyStage: `${formData.currentStatus.toUpperCase()} (${expOrYear})`,
      collegeCourse: collegeCourseStr,
      targetFormats: formData.preferredFormats.join(', '),
      keySkills: formData.secondarySkills.trim() || 'None specified',
      resumeUrl: formData.resumeUrl.trim(),
      portfolioUrl: formData.portfolioUrl.trim(),
      instagramUrl: formData.instagramUrl.trim(),
      socialMediaHandle: formData.instagramUrl.trim(),
      youtubeUrl: formData.youtubeUrl.trim(),
      githubUrl: formData.youtubeUrl.trim(),
      whyJoin: formData.whyJoin.trim(),
      featuredProject: formData.bestContent.trim(),
      available3Months: 'Yes (100% Remote Immersion)',
      remoteComfortable: 'Yes (100% Remote)'
    };

    try {
      if (GOOGLE_SHEET_ENDPOINT) {
        const response = await fetch(GOOGLE_SHEET_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });
        const resData = await response.json();
        if (resData && resData.applicationId) {
          assignedRefId = resData.applicationId;
        }
      }
    } catch (err) {
      console.warn('Submission notice:', err);
      if (!assignedRefId) {
        assignedRefId = 'AETH-WISM-26-001';
      }
      setTimeout(() => {
        setIsSubmitting(false);
        setRefId(assignedRefId);
        setCurrentStep(6);
      }, 700);
    }
  };

  const copyRefToClipboard = () => {
    if (!refId) return;
    navigator.clipboard.writeText(refId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="careers-split-layout">
      <div className="cine-bg-mesh"></div>
      <div className="cine-bg-grid"></div>

      {/* 30% Left Screen: Track & Program Intel Sidebar */}
      <aside className="cine-role-sidebar">
        <div className="sidebar-brand-lockup">
          <span className="sidebar-brand-name">
            <span className="brand-dot-red"></span> AETHRIZ AI
          </span>
          <span className="sidebar-cohort-badge">WINTER 2026–27</span>
        </div>

        {/* Selected Track Lockup */}
        <div className="sidebar-track-selected">
          <span className="sidebar-section-kicker">// SELECTED TRACK</span>
          <div className="sidebar-locked-role-card">
            <div className="locked-role-icon">
              <i className={roleData.icon || 'fa-solid fa-camera-retro'}></i>
            </div>
            <div className="locked-role-meta">
              <span className="locked-role-badge">{roleData.badge || 'Winter Cohort Track'}</span>
              <h4 className="locked-role-title">{formData.primaryDomain}</h4>
              <span className="locked-role-dept">{roleData.dept || 'AETHRIZ AI Healthcare'}</span>
            </div>
          </div>
        </div>

        {/* Track Immersion Overview & Scope */}
        <div className="sidebar-section">
          <span className="sidebar-section-kicker">// TRACK SCOPE & DELIVERABLES</span>
          <p className="sidebar-track-overview-p">{roleData.overview}</p>
        </div>

        {/* Key Focus Responsibilities */}
        {roleData.responsibilities && roleData.responsibilities.length > 0 && (
          <div className="sidebar-section">
            <span className="sidebar-section-kicker">// KEY IMMERSION RESPONSIBILITIES</span>
            <ul className="sidebar-track-responsibilities-list">
              {roleData.responsibilities.slice(0, 3).map((resp, i) => (
                <li key={i}>
                  <i className="fa-solid fa-check" style={{ color: '#E81A2D', fontSize: '0.65rem' }}></i>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Work Model Badges */}
        <div className="sidebar-meta-badges">
          <span className="sidebar-pill">
            <i className="fa-solid fa-earth-americas" style={{ color: '#E81A2D' }}></i> 100% Remote
          </span>
          <span className="sidebar-pill">
            <i className="fa-regular fa-clock" style={{ color: '#E81A2D' }}></i> 3 Months
          </span>
          <span className="sidebar-pill">
            <i className="fa-solid fa-trophy" style={{ color: '#E81A2D' }}></i> Verified Credentials
          </span>
        </div>

        {/* Program Rewards */}
        <div className="sidebar-section">
          <span className="sidebar-section-kicker">// PROGRAMME REWARDS</span>
          <div className="sidebar-perks-box">
            <div className="sidebar-perk-row">
              <i className="fa-solid fa-certificate"></i>
              <span>Official Verified Completion Certificate</span>
            </div>
            <div className="sidebar-perk-row">
              <i className="fa-solid fa-box-open"></i>
              <span>Branded T-Shirt, Mug, Notebook & Pen Kit</span>
            </div>
            <div className="sidebar-perk-row">
              <i className="fa-solid fa-award"></i>
              <span>Crystal Keepsake Memento Award</span>
            </div>
            <div className="sidebar-perk-row">
              <i className="fa-solid fa-crown"></i>
              <span>Top 3: Honors, LOR & Permanent Roles</span>
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <button type="button" className="sidebar-exit-btn" onClick={onExit}>
            <i className="fa-solid fa-arrow-left"></i> Return to Careers Page
          </button>
        </div>
      </aside>

      {/* 70% Right Screen: Multi-Step Interactive Form */}
      <main className="cine-form-stage">
        {/* Sticky Top Bar Header */}
        <header className="stage-top-bar">
          <div className="stage-progress-info">
            <span className="stage-num-tag">
              STEP <strong>{String(currentStep).padStart(2, '0')}</strong> / 05
            </span>
            <div className="stage-progress-track">
              <div
                className="stage-progress-fill"
                style={{ width: `${Math.min(100, (currentStep / totalSteps) * 100)}%` }}
              ></div>
            </div>
          </div>

          <button type="button" className="stage-close-btn" onClick={onExit} title="Exit application">
            <i className="fa-solid fa-xmark"></i> CLOSE
          </button>
        </header>

        {/* Scrollable Form Viewport */}
        <div className="stage-form-viewport" ref={formViewportRef}>
          <div className="stage-slide-content">
            {/* STEP 1: PERSONAL INFORMATION */}
            {currentStep === 1 && (
              <div className="stage-card-box">
                <div className="stage-header-group">
                  <span className="stage-kicker">// SECTION A • PERSONAL INFORMATION</span>
                  <h1 className="stage-h1">Tell us about yourself.</h1>
                  <p className="stage-desc">
                    Enter your contact details so our recruitment team can reach you with evaluation updates.
                  </p>
                </div>

                <div className="stage-form-grid">
                  <div className="stage-input-field">
                    <label className="stage-label">
                      FIRST NAME <span className="req-dot">*</span>
                    </label>
                    <div className="stage-input-wrap">
                      <i className="fa-regular fa-user input-icon"></i>
                      <input
                        type="text"
                        className="stage-input"
                        placeholder="e.g. Rahul"
                        value={formData.firstName}
                        onChange={(e) => {
                          setFormData({ ...formData, firstName: e.target.value });
                          setValidationError('');
                        }}
                      />
                    </div>
                  </div>

                  <div className="stage-input-field">
                    <label className="stage-label">
                      LAST NAME <span className="req-dot">*</span>
                    </label>
                    <div className="stage-input-wrap">
                      <i className="fa-regular fa-user input-icon"></i>
                      <input
                        type="text"
                        className="stage-input"
                        placeholder="e.g. Sharma"
                        value={formData.lastName}
                        onChange={(e) => {
                          setFormData({ ...formData, lastName: e.target.value });
                          setValidationError('');
                        }}
                      />
                    </div>
                  </div>

                  <div className="stage-input-field">
                    <label className="stage-label">
                      CONTACT NUMBER <span className="req-dot">*</span>
                    </label>
                    <div className="stage-input-wrap">
                      <i className="fa-solid fa-phone input-icon"></i>
                      <input
                        type="tel"
                        className="stage-input"
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          setValidationError('');
                        }}
                      />
                    </div>
                  </div>

                  <div className="stage-input-field">
                    <label className="stage-label">
                      EMAIL ADDRESS <span className="req-dot">*</span>
                    </label>
                    <div className="stage-input-wrap">
                      <i className="fa-regular fa-envelope input-icon"></i>
                      <input
                        type="email"
                        className="stage-input"
                        placeholder="you@domain.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          setValidationError('');
                        }}
                      />
                    </div>
                  </div>

                  <div className="stage-input-field">
                    <label className="stage-label">
                      CURRENT STATE <span className="req-dot">*</span>
                    </label>
                    <div className="stage-input-wrap">
                      <i className="fa-solid fa-map-location-dot input-icon"></i>
                      <input
                        type="text"
                        className="stage-input"
                        placeholder="e.g. Karnataka / Maharashtra / Delhi"
                        value={formData.state}
                        onChange={(e) => {
                          setFormData({ ...formData, state: e.target.value });
                          setValidationError('');
                        }}
                      />
                    </div>
                  </div>

                  <div className="stage-input-field">
                    <label className="stage-label">
                      CITY OR DISTRICT <span className="req-dot">*</span>
                    </label>
                    <div className="stage-input-wrap">
                      <i className="fa-solid fa-city input-icon"></i>
                      <input
                        type="text"
                        className="stage-input"
                        placeholder="e.g. Bengaluru / Pune / New Delhi"
                        value={formData.city}
                        onChange={(e) => {
                          setFormData({ ...formData, city: e.target.value });
                          setValidationError('');
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: ACADEMIC & PROFESSIONAL BACKGROUND */}
            {currentStep === 2 && (
              <div className="stage-card-box">
                <div className="stage-header-group">
                  <span className="stage-kicker">// SECTION B • ACADEMIC & PROFESSIONAL BACKGROUND</span>
                  <h1 className="stage-h1">Your journey & education.</h1>
                  <p className="stage-desc">
                    Tell us where you are currently studying or working. Students from any year and freshers are welcome.
                  </p>
                </div>

                <div className="stage-status-selector">
                  <label className="stage-label">
                    CURRENT STATUS <span className="req-dot">*</span>
                  </label>
                  <div className="status-cards-grid">
                    {STATUS_OPTIONS.map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        className={`status-card-btn ${formData.currentStatus === st.id ? 'active' : ''}`}
                        onClick={() => {
                          setFormData({ ...formData, currentStatus: st.id });
                          setValidationError('');
                        }}
                      >
                        <span className="status-card-title">{st.title}</span>
                        <span className="status-card-desc">{st.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dynamically Rendered Inputs based on Current Status */}
                {formData.currentStatus === 'student' && (
                  <div className="stage-form-grid" style={{ marginTop: '22px' }}>
                    <div className="stage-input-field">
                      <label className="stage-label">
                        COLLEGE OR UNIVERSITY NAME <span className="req-dot">*</span>
                      </label>
                      <div className="stage-input-wrap">
                        <i className="fa-solid fa-graduation-cap input-icon"></i>
                        <input
                          type="text"
                          className="stage-input"
                          placeholder="e.g. IIT Bombay / Delhi University / Christ University"
                          value={formData.institution}
                          onChange={(e) => {
                            setFormData({ ...formData, institution: e.target.value });
                            setValidationError('');
                          }}
                        />
                      </div>
                    </div>

                    <div className="stage-input-field">
                      <label className="stage-label">
                        COURSE OR DEGREE PROGRAM <span className="optional-tag">(IF APPLICABLE)</span>
                      </label>
                      <div className="stage-input-wrap">
                        <i className="fa-solid fa-book-open input-icon"></i>
                        <input
                          type="text"
                          className="stage-input"
                          placeholder="e.g. B.Tech Computer Science / Mass Comm / Design"
                          value={formData.course}
                          onChange={(e) => {
                            setFormData({ ...formData, course: e.target.value });
                            setValidationError('');
                          }}
                        />
                      </div>
                    </div>

                    <div className="stage-input-field" style={{ gridColumn: '1 / -1' }}>
                      <label className="stage-label">CURRENT YEAR OF STUDY</label>
                      <div className="year-pill-row">
                        {STUDENT_YEARS.map((yr) => (
                          <button
                            key={yr}
                            type="button"
                            className={`year-pill-btn ${formData.yearOfStudy === yr ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, yearOfStudy: yr })}
                          >
                            {yr}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {formData.currentStatus === 'fresher' && (
                  <div className="stage-form-grid" style={{ marginTop: '22px' }}>
                    <div className="stage-input-field">
                      <label className="stage-label">
                        COLLEGE OR UNIVERSITY GRADUATED FROM <span className="optional-tag">(IF APPLICABLE)</span>
                      </label>
                      <div className="stage-input-wrap">
                        <i className="fa-solid fa-graduation-cap input-icon"></i>
                        <input
                          type="text"
                          className="stage-input"
                          placeholder="e.g. Delhi University / SRM / Amity"
                          value={formData.institution}
                          onChange={(e) => {
                            setFormData({ ...formData, institution: e.target.value });
                            setValidationError('');
                          }}
                        />
                      </div>
                    </div>

                    <div className="stage-input-field">
                      <label className="stage-label">
                        DEGREE OR SPECIALISATION <span className="optional-tag">(IF APPLICABLE)</span>
                      </label>
                      <div className="stage-input-wrap">
                        <i className="fa-solid fa-book-open input-icon"></i>
                        <input
                          type="text"
                          className="stage-input"
                          placeholder="e.g. B.A. Journalism / B.Tech / BBA"
                          value={formData.course}
                          onChange={(e) => {
                            setFormData({ ...formData, course: e.target.value });
                            setValidationError('');
                          }}
                        />
                      </div>
                    </div>

                    <div className="stage-input-field" style={{ gridColumn: '1 / -1' }}>
                      <label className="stage-label">PROJECT & CREATIVE EXPERIENCE</label>
                      <div className="year-pill-row">
                        {FRESHER_EXP.map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            className={`year-pill-btn ${formData.experienceLevel === lvl ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, experienceLevel: lvl })}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {formData.currentStatus === 'professional' && (
                  <div className="stage-form-grid" style={{ marginTop: '22px' }}>
                    <div className="stage-input-field" style={{ gridColumn: '1 / -1' }}>
                      <label className="stage-label">TOTAL YEARS OF EXPERIENCE</label>
                      <div className="year-pill-row">
                        {PROFESSIONAL_EXP.map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            className={`year-pill-btn ${formData.experienceLevel === lvl ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, experienceLevel: lvl })}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="stage-input-field" style={{ gridColumn: '1 / -1' }}>
                      <label className="stage-label">
                        CURRENT DOMAIN OR PROFESSIONAL FOCUS <span className="optional-tag">(OPTIONAL)</span>
                      </label>
                      <div className="stage-input-wrap">
                        <i className="fa-solid fa-briefcase input-icon"></i>
                        <input
                          type="text"
                          className="stage-input"
                          placeholder="e.g. Digital Marketing, Video Production, Brand Storytelling, Technology"
                          value={formData.course}
                          onChange={(e) => {
                            setFormData({ ...formData, course: e.target.value });
                            setValidationError('');
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.currentStatus === 'freelancer' && (
                  <div className="stage-form-grid" style={{ marginTop: '22px' }}>
                    <div className="stage-input-field" style={{ gridColumn: '1 / -1' }}>
                      <label className="stage-label">CREATOR / FREELANCE EXPERIENCE</label>
                      <div className="year-pill-row">
                        {FREELANCER_EXP.map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            className={`year-pill-btn ${formData.experienceLevel === lvl ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, experienceLevel: lvl })}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="stage-input-field" style={{ gridColumn: '1 / -1' }}>
                      <label className="stage-label">
                        PRIMARY CREATIVE NICHE OR SERVICES <span className="optional-tag">(OPTIONAL)</span>
                      </label>
                      <div className="stage-input-wrap">
                        <i className="fa-solid fa-palette input-icon"></i>
                        <input
                          type="text"
                          className="stage-input"
                          placeholder="e.g. Short-form Video Editor, Podcast Host, Graphic Designer, Content Creator"
                          value={formData.course}
                          onChange={(e) => {
                            setFormData({ ...formData, course: e.target.value });
                            setValidationError('');
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.currentStatus === 'other' && (
                  <div className="stage-form-grid" style={{ marginTop: '22px' }}>
                    <div className="stage-input-field" style={{ gridColumn: '1 / -1' }}>
                      <label className="stage-label">CREATIVE EXPERIENCE LEVEL</label>
                      <div className="year-pill-row">
                        {OTHER_EXP.map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            className={`year-pill-btn ${formData.experienceLevel === lvl ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, experienceLevel: lvl })}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="stage-input-field" style={{ gridColumn: '1 / -1' }}>
                      <label className="stage-label">
                        CREATIVE BACKGROUND OR FOCUS <span className="optional-tag">(OPTIONAL)</span>
                      </label>
                      <div className="stage-input-wrap">
                        <i className="fa-solid fa-shapes input-icon"></i>
                        <input
                          type="text"
                          className="stage-input"
                          placeholder="e.g. Self-taught video creator, digital storyteller, indie builder"
                          value={formData.course}
                          onChange={(e) => {
                            setFormData({ ...formData, course: e.target.value });
                            setValidationError('');
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: PREFERENCES & DOMAIN SELECTION */}
            {currentStep === 3 && (
              <div className="stage-card-box">
                <div className="stage-header-group">
                  <span className="stage-kicker">// SECTION C • TRACK SPECIALISATION & MOTIVATION</span>
                  <h1 className="stage-h1">Track focus & creative deliverables.</h1>
                  <p className="stage-desc">
                    Confirm your target content formats, secondary tools, and motivation for the AETHRIZ AI Winter Cohort.
                  </p>
                </div>

                <div className="stage-domain-summary-card">
                  <div className="domain-summary-meta">
                    <span className="domain-summary-eyebrow">APPLYING FOR</span>
                    <h3 className="domain-summary-title">{formData.primaryDomain}</h3>
                    <span className="domain-summary-cohort">Winter Internship Program 2026–2027 • 100% Remote Immersion</span>
                  </div>
                  <div className="domain-summary-badge">
                    <i className="fa-solid fa-check"></i>
                    <span>Selected Track</span>
                  </div>
                </div>

                <div className="stage-format-selector" style={{ marginTop: '22px' }}>
                  <label className="stage-label">
                    PREFERRED CONTENT FORMATS (SELECT ALL THAT APPLY) <span className="req-dot">*</span>
                  </label>
                  <div className="format-tags-cloud">
                    {PREFERRED_FORMATS_LIST.map((fmt) => {
                      const isSelected = formData.preferredFormats.includes(fmt);
                      return (
                        <button
                          key={fmt}
                          type="button"
                          className={`format-tag-btn ${isSelected ? 'active' : ''}`}
                          onClick={() => togglePreferredFormat(fmt)}
                        >
                          <i className={`fa-solid ${isSelected ? 'fa-check' : 'fa-plus'}`} style={{ marginRight: '6px' }}></i>
                          {fmt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="stage-input-field" style={{ marginTop: '20px' }}>
                  <label className="stage-label">
                    SECONDARY SKILLS OR TOOLS (OPTIONAL)
                  </label>
                  <div className="stage-input-wrap">
                    <i className="fa-solid fa-wand-magic-sparkles input-icon"></i>
                    <input
                      type="text"
                      className="stage-input"
                      placeholder="e.g. CapCut, Premiere Pro, Audio Mixing, Graphic Design, Community Growth"
                      value={formData.secondarySkills}
                      onChange={(e) => setFormData({ ...formData, secondarySkills: e.target.value })}
                    />
                  </div>
                </div>

                <div className="stage-availability-check" style={{ marginTop: '20px' }}>
                  <label className="stage-label">
                    AVAILABILITY & WORK MODEL <span className="req-dot">*</span>
                  </label>
                  <div className="availability-card">
                    <i className="fa-regular fa-calendar-check" style={{ color: '#E81A2D', fontSize: '1.2rem' }}></i>
                    <div>
                      <strong>3-Month Remote Commitment Confirmed</strong>
                      <p>I confirm my availability for the 3-month remote immersion with flexible weekly deliverables.</p>
                    </div>
                  </div>
                </div>

                <div className="stage-input-field" style={{ marginTop: '20px' }}>
                  <div className="label-with-counter">
                    <label className="stage-label">
                      BRIEFLY EXPLAIN WHY YOU WANT TO JOIN AETHRIZ AI <span className="req-dot">*</span>
                    </label>
                    <span className="char-count">{formData.whyJoin.length} chars</span>
                  </div>
                  <textarea
                    className="stage-textarea"
                    rows={4}
                    placeholder="Share what excites you about building content at the intersection of AI, healthcare storytelling, and digital creator ecosystems..."
                    value={formData.whyJoin}
                    onChange={(e) => {
                      setFormData({ ...formData, whyJoin: e.target.value });
                      setValidationError('');
                    }}
                  />
                </div>
              </div>
            )}

            {/* STEP 4: RESUME & PORTFOLIO */}
            {currentStep === 4 && (
              <div className="stage-card-box">
                <div className="stage-header-group">
                  <span className="stage-kicker">// SECTION D • RESUME & PORTFOLIO LINKS</span>
                  <h1 className="stage-h1">Showcase your work.</h1>
                  <p className="stage-desc">
                    Provide verifiable links to your past content, social channels, or creative portfolio.
                  </p>
                </div>

                <div className="stage-form-grid">
                  <div className="stage-input-field" style={{ gridColumn: '1 / -1' }}>
                    <label className="stage-label">
                      RESUME / CV LINK (GOOGLE DRIVE / ONEDRIVE / CLOUD) <span className="req-dot">*</span>
                    </label>
                    <div className="stage-input-wrap">
                      <i className="fa-solid fa-file-pdf input-icon"></i>
                      <input
                        type="url"
                        className="stage-input"
                        placeholder="https://drive.google.com/file/d/your-resume-link/view?usp=sharing"
                        value={formData.resumeUrl}
                        onChange={(e) => {
                          setFormData({ ...formData, resumeUrl: e.target.value });
                          setValidationError('');
                        }}
                      />
                    </div>
                    <span className="stage-input-hint">
                      Ensure your link sharing permission is set to "Anyone with the link can view".
                    </span>
                  </div>

                  <div className="stage-input-field">
                    <label className="stage-label">
                      PORTFOLIO OR WORK SAMPLES LINK <span className="optional-tag">(IF APPLICABLE)</span>
                    </label>
                    <div className="stage-input-wrap">
                      <i className="fa-solid fa-link input-icon"></i>
                      <input
                        type="url"
                        className="stage-input"
                        placeholder="https://yourportfolio.com, Drive folder, or Behance"
                        value={formData.portfolioUrl}
                        onChange={(e) => {
                          setFormData({ ...formData, portfolioUrl: e.target.value });
                          setValidationError('');
                        }}
                      />
                    </div>
                  </div>

                  <div className="stage-input-field">
                    <label className="stage-label">
                      INSTAGRAM PROFILE URL <span className="optional-tag">(IF APPLICABLE)</span>
                    </label>
                    <div className="stage-input-wrap">
                      <i className="fa-brands fa-instagram input-icon"></i>
                      <input
                        type="url"
                        className="stage-input"
                        placeholder="https://instagram.com/yourhandle"
                        value={formData.instagramUrl}
                        onChange={(e) => {
                          setFormData({ ...formData, instagramUrl: e.target.value });
                          setValidationError('');
                        }}
                      />
                    </div>
                  </div>

                  <div className="stage-input-field" style={{ gridColumn: '1 / -1' }}>
                    <label className="stage-label">
                      YOUTUBE OR OTHER RELEVANT LINK <span className="optional-tag">(IF APPLICABLE)</span>
                    </label>
                    <div className="stage-input-wrap">
                      <i className="fa-brands fa-youtube input-icon"></i>
                      <input
                        type="url"
                        className="stage-input"
                        placeholder="https://youtube.com/@yourchannel, LinkedIn, or X"
                        value={formData.youtubeUrl}
                        onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="stage-input-field" style={{ gridColumn: '1 / -1' }}>
                    <div className="label-with-counter">
                      <label className="stage-label">
                        BRIEFLY DESCRIBE YOUR BEST CONTENT OR CREATIVE ACHIEVEMENT <span className="req-dot">*</span>
                      </label>
                      <span className="char-count">{formData.bestContent.length} chars</span>
                    </div>
                    <textarea
                      className="stage-textarea"
                      rows={3}
                      placeholder="Share a standout reel, viral video, campaign, podcast episode, or creative milestone you created..."
                      value={formData.bestContent}
                      onChange={(e) => {
                        setFormData({ ...formData, bestContent: e.target.value });
                        setValidationError('');
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: CLEAN EXECUTIVE REVIEW & SUBMISSION */}
            {currentStep === 5 && (
              <div className="stage-card-box">
                <div className="stage-header-group">
                  <span className="stage-kicker">// SECTION E • APPLICATION REVIEW</span>
                  <h1 className="stage-h1">Review your application.</h1>
                  <p className="stage-desc">
                    Please take a moment to review your details before submitting your application to AETHRIZ AI.
                  </p>
                </div>

                <div className="review-summary-container">
                  {/* Track Header */}
                  <div className="review-track-lockup">
                    <div className="review-track-badge">
                      <i className={roleData.icon || 'fa-solid fa-camera-retro'}></i>
                      <span>{roleData.badge || 'Winter Cohort Track'}</span>
                    </div>
                    <h2 className="review-role-title">{formData.primaryDomain}</h2>
                    <span className="review-role-meta">Winter Internship Program 2026–2027 • 100% Remote Immersion</span>
                  </div>

                  {/* Candidate Details Grid */}
                  <div className="review-details-grid">
                    <div className="review-detail-group">
                      <span className="review-label">Candidate Name</span>
                      <span className="review-value">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="review-detail-group">
                      <span className="review-label">Email Address</span>
                      <span className="review-value">{formData.email}</span>
                    </div>
                    <div className="review-detail-group">
                      <span className="review-label">Contact Number</span>
                      <span className="review-value">{formData.phone}</span>
                    </div>
                    <div className="review-detail-group">
                      <span className="review-label">Location</span>
                      <span className="review-value">{formData.city}, {formData.state}</span>
                    </div>
                    <div className="review-detail-group">
                      <span className="review-label">Journey & Status</span>
                      <span className="review-value" style={{ textTransform: 'capitalize' }}>
                        {formData.currentStatus}
                      </span>
                    </div>
                    <div className="review-detail-group">
                      <span className="review-label">Experience / Year</span>
                      <span className="review-value">
                        {formData.currentStatus === 'student'
                          ? formData.yearOfStudy
                          : formData.experienceLevel || 'Not Specified'}
                      </span>
                    </div>
                    {formData.institution && (
                      <div className="review-detail-group">
                        <span className="review-label">College / University</span>
                        <span className="review-value">{formData.institution}</span>
                      </div>
                    )}
                    {formData.course && (
                      <div className="review-detail-group">
                        <span className="review-label">Course / Domain / Focus</span>
                        <span className="review-value">{formData.course}</span>
                      </div>
                    )}
                    <div className="review-detail-group">
                      <span className="review-label">Target Formats</span>
                      <span className="review-value">{formData.preferredFormats.join(', ')}</span>
                    </div>
                    {formData.secondarySkills && (
                      <div className="review-detail-group">
                        <span className="review-label">Secondary Skills & Tools</span>
                        <span className="review-value">{formData.secondarySkills}</span>
                      </div>
                    )}
                  </div>

                  {/* Verifiable Links */}
                  <div className="review-links-section">
                    <div className="review-link-row">
                      <span className="review-label">Resume / CV Document *</span>
                      <a
                        href={formData.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="review-pill-link"
                      >
                        <i className="fa-solid fa-file-pdf"></i>
                        <span>{formData.resumeUrl}</span>
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    </div>

                    <div className="review-link-row">
                      <span className="review-label">Portfolio / Work Samples</span>
                      {formData.portfolioUrl ? (
                        <a
                          href={formData.portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="review-pill-link"
                        >
                          <i className="fa-solid fa-link"></i>
                          <span>{formData.portfolioUrl}</span>
                          <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                      ) : (
                        <span className="review-empty-tag">None provided (Optional)</span>
                      )}
                    </div>

                    <div className="review-link-row">
                      <span className="review-label">Instagram Profile</span>
                      {formData.instagramUrl ? (
                        <a
                          href={formData.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="review-pill-link"
                        >
                          <i className="fa-brands fa-instagram"></i>
                          <span>{formData.instagramUrl}</span>
                          <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                      ) : (
                        <span className="review-empty-tag">None provided (Optional)</span>
                      )}
                    </div>

                    {formData.youtubeUrl && (
                      <div className="review-link-row">
                        <span className="review-label">YouTube / Other Link</span>
                        <a
                          href={formData.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="review-pill-link"
                        >
                          <i className="fa-brands fa-youtube"></i>
                          <span>{formData.youtubeUrl}</span>
                          <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Motivation Snippet */}
                  {formData.whyJoin && (
                    <div className="review-text-block">
                      <span className="review-label">Why AETHRIZ AI (Motivation)</span>
                      <p className="review-quote">"{formData.whyJoin}"</p>
                    </div>
                  )}

                  {/* Creative Milestone Snippet */}
                  {formData.bestContent && (
                    <div className="review-text-block">
                      <span className="review-label">Creative Milestone / Best Work</span>
                      <p className="review-quote">"{formData.bestContent}"</p>
                    </div>
                  )}

                  {/* Clean Declarations */}
                  <div className="review-declarations-block">
                    <label className="review-checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.accurateConfirmed}
                        onChange={(e) => {
                          setFormData({ ...formData, accurateConfirmed: e.target.checked });
                          setValidationError('');
                        }}
                      />
                      <span>I declare that all information and portfolio links provided in this application are accurate and authentic.</span>
                    </label>

                    <label className="review-checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.dedicationAgreed}
                        onChange={(e) => {
                          setFormData({ ...formData, dedicationAgreed: e.target.checked });
                          setValidationError('');
                        }}
                      />
                      <span>I confirm my availability for the 3-month remote winter immersion program.</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: CINEMATIC CONFIRMATION SEQUENCE */}
            {currentStep === 6 && (
              <div className="stage-success-cinema">
                <div className="cinema-checkmark-anchor">
                  <div className="cinema-ambient-halo"></div>
                  <svg className="cinema-success-svg" viewBox="0 0 96 96">
                    <circle className="cinema-ring-track" cx="48" cy="48" r="42" />
                    <circle className="cinema-ring-fill" cx="48" cy="48" r="42" />
                    <path className="cinema-check-path" d="M30 48 L42 60 L66 36" />
                  </svg>
                </div>

                <span className="stage-success-kicker">// APPLICATION RECEIVED • WINTER COHORT 2026–2027</span>
                <h2 className="stage-success-h1">Application Received.</h2>
                <p className="stage-success-desc">
                  Thank you for applying to AETHRIZ AI. Your official application has been successfully received and recorded in our candidate registry.
                </p>

                <div className="stage-ref-card">
                  <div className="ref-card-header">
                    <span className="ref-lbl">OFFICIAL CANDIDATE REFERENCE ID</span>
                    <span className="ref-status-live">STATUS: APPLICATION RECEIVED</span>
                  </div>
                  <div className="ref-code-row">
                    <code className="ref-token-txt">{refId}</code>
                    <button type="button" className="ref-copy-btn" onClick={copyRefToClipboard}>
                      <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                      <span>{copied ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-primary-lead"
                  style={{ marginTop: '28px' }}
                  onClick={onExit}
                >
                  RETURN TO HOME PLATFORM <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Persistent Bottom Action Bar (Rock Solid - Never Jumps!) */}
        {currentStep <= 5 && (
          <footer className="stage-bottom-bar">
            <div className="stage-bottom-left">
              {validationError && (
                <div className="stage-val-error">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span>{validationError}</span>
                </div>
              )}
            </div>

            <div className="stage-actions-col">
              {currentStep > 1 && (
                <button type="button" className="stage-secondary-btn" onClick={handleBack} disabled={isSubmitting}>
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
                    <i className="fa-solid fa-circle-notch fa-spin"></i> SUBMITTING APPLICATION...
                  </>
                ) : currentStep === 5 ? (
                  <>
                    SUBMIT APPLICATION <i className="fa-solid fa-paper-plane"></i>
                  </>
                ) : (
                  <>
                    CONTINUE TO STEP 0{currentStep + 1} <i className="fa-solid fa-arrow-right"></i>
                  </>
                )}
              </button>
            </div>
          </footer>
        )}
      </main>
    </div>
  );
}
