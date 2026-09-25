import React, { useState, useEffect } from 'react';
import '../styles/careers.css';

// Google Apps Script Web App Endpoint for Real-Time Google Sheet Intake
const GOOGLE_SHEET_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxc_-D6X0uozC2P3nDMkrSxdQHFj7Ma73XUL9c6H2bmBWTh3Rb4wTW3MkY9n-3rPPZm/exec';

const ROLES_LIST = [
  {
    id: 'ai-ml',
    title: 'AI/ML Development',
    category: 'engineering',
    dept: 'Intelligence Engine',
    location: 'Remote',
    duration: '3 Months (Oct 15, 2026 – Jan 15, 2027)',
    overview: 'Work on production machine learning pipelines, predictive bio-algorithmic health models, and real healthcare data research.',
    skills: ['PyTorch', 'TensorFlow', 'Python', 'Computer Vision', 'Bio-Data Models'],
    responsibilities: [
      'Train and evaluate predictive machine learning architectures on biosignal datasets.',
      'Design real-time inference pipelines with optimized low-latency execution.',
      'Collaborate with research mentors to validate clinical and algorithmic outputs.'
    ]
  },
  {
    id: 'app-dev',
    title: 'App Development',
    category: 'engineering',
    dept: 'Mobile & Distributed Systems',
    location: 'Remote',
    duration: '3 Months (Oct 15, 2026 – Jan 15, 2027)',
    overview: 'Develop modern cross-platform mobile applications integrating real-time biometric metrics with intelligent telemetry.',
    skills: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Mobile Telemetry'],
    responsibilities: [
      'Engineer sleek, reactive mobile interfaces for both iOS and Android platforms.',
      'Integrate Bluetooth/biometric sensors and real-time WebSocket telemetry feeds.',
      'Optimize app memory footprint, local caching, and background synchronization.'
    ]
  },
  {
    id: 'full-stack',
    title: 'Full-Stack Web Development',
    category: 'engineering',
    dept: 'Core Web Infrastructure',
    location: 'Remote',
    duration: '3 Months (Oct 15, 2026 – Jan 15, 2027)',
    overview: 'Build high-velocity reactive web applications, glassmorphic design systems, and resilient microservices powering the platform.',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind/CSS3'],
    responsibilities: [
      'Build high-velocity reactive web frontends and resilient backend API microservices.',
      'Implement enterprise token authentication, security, and healthcare data integrity.',
      'Craft responsive, accessible UI components adhering to AETHRIZ design tokens.'
    ]
  },
  {
    id: 'social-media',
    title: 'Social Media Management',
    category: 'marketing',
    dept: 'Community & Digital Media',
    location: 'Remote',
    duration: '3 Months (Oct 15, 2026 – Jan 15, 2027)',
    overview: 'Direct technical storytelling, craft viral brand resonance, and cultivate active health-tech communities across digital channels.',
    skills: ['Tech Storytelling', 'Content Strategy', 'Analytics', 'LinkedIn', 'Twitter/X'],
    responsibilities: [
      'Translate complex bio-algorithmic research into engaging social threads and infographics.',
      'Cultivate active developer and health-tech community engagement across digital channels.',
      'Analyze reach, engagement metrics, and sentiment to iterate on content impact.'
    ]
  },
  {
    id: 'graphics-design',
    title: 'Graphics Design',
    category: 'design',
    dept: 'Visual Brand Architecture',
    location: 'Remote',
    duration: '3 Months (Oct 15, 2026 – Jan 15, 2027)',
    overview: 'Design futuristic visual assets, cyberpunk interfaces, 3D bio-graphics, and compelling creative design deliverables.',
    skills: ['Figma', 'Adobe Photoshop', 'Blender / 3D', 'Brand Systems', 'Illustrator'],
    responsibilities: [
      'Design futuristic visual brand assets, cybernetic iconography, and UI design systems.',
      'Create 3D bio-graphics, motion graphics, and presentation assets for product launches.',
      'Maintain aesthetic brand cohesion across all digital touchpoints and company decks.'
    ]
  },
  {
    id: 'marketing-lead',
    title: 'Marketing Lead',
    category: 'marketing',
    dept: 'Growth Strategy',
    location: 'Remote',
    duration: '3 Months (Oct 15, 2026 – Jan 15, 2027)',
    overview: 'Formulate data-backed user acquisition campaigns, strategic alliances, and digital growth flywheels for upcoming releases.',
    skills: ['Growth Flywheels', 'User Acquisition', 'Campaign Analytics', 'Product Marketing'],
    responsibilities: [
      'Formulate and execute go-to-market strategies for upcoming platform and product releases.',
      'Architect referral engines and analyze conversion funnels to scale user onboarding.',
      'Conduct competitive landscape benchmarking in healthcare AI and longevity tech.'
    ]
  },
  {
    id: 'influencer-team',
    title: 'Influencer Team',
    category: 'marketing',
    dept: 'Creator Ecosystems',
    location: 'Remote',
    duration: '3 Months (Oct 15, 2026 – Jan 15, 2027)',
    overview: 'Engage top creators, technology advocates, and health pioneers to amplify AETHRIZ initiatives across digital spaces.',
    skills: ['Creator Outreach', 'Partnership Pitching', 'Community Building', 'PR Strategy'],
    responsibilities: [
      'Identify, curate, and partner with top technology and medical creator voices.',
      'Coordinate exclusive preview activations and early-access feedback loops.',
      'Amplify AETHRIZ brand awareness across scientific, academic, and builder networks.'
    ]
  }
];

// Convert File to Base64 data string for Google Drive upload
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      const base64 =
        typeof result === 'string' && result.includes(',')
          ? result.split(',')[1]
          : result;
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

// Formats a sequence index to AETH-WI26-001, AETH-WI26-002, etc.
const formatSequentialRefId = (count) => {
  const num = Math.max(1, parseInt(count, 10) || 1);
  return `AETH-WI26-${String(num).padStart(3, '0')}`;
};

export default function Careers({ onBack }) {
  // Page mode: 'overview' (Corporate Careers Landing) | 'apply' (Dedicated Full-Page Application)
  const [viewMode, setViewMode] = useState('overview');

  // Filter category in overview
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRoleId, setExpandedRoleId] = useState(null);

  // Full-page Application State
  const [selectedRole, setSelectedRole] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [refId, setRefId] = useState('');
  const [seqRefId, setSeqRefId] = useState('');

  // Form Fields State
  const initialForm = {
    fullName: '',
    emailAddress: '',
    phone: '',
    collegeCourse: '',
    currentYearSemester: '',
    currentYearOther: '',
    cityState: '',

    position: '',
    keySkills: '',
    hasExperience: '',
    experienceDetails: '',
    portfolioUrl: '',

    resumeFile: null,
    resumeFileName: '',
    availableFullPeriod: '',
    comfortableRemote: '',

    whyJoin: '',
    contribution: '',

    agreedToTerms: false
  };

  const [formData, setFormData] = useState(initialForm);
  const [isDragging, setIsDragging] = useState(false);

  // Restore draft on initial load
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aethriz_candidate_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed, resumeFile: null }));
      }
    } catch (e) {
      console.warn('Failed to parse draft', e);
    }
  }, []);

  // Auto-save draft on form changes
  useEffect(() => {
    try {
      const { resumeFile, ...serializable } = formData;
      localStorage.setItem('aethriz_candidate_draft', JSON.stringify(serializable));
    } catch (e) {
      // storage unavailable
    }
  }, [formData]);

  // Scroll to top whenever step or mode changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [viewMode, currentStep, isSubmitted]);

  // Hide main website navbar when inside the fullpage application portal
  useEffect(() => {
    if (viewMode === 'apply') {
      document.body.classList.add('in-apply-portal');
    } else {
      document.body.classList.remove('in-apply-portal');
    }
    return () => document.body.classList.remove('in-apply-portal');
  }, [viewMode]);

  // Synchronize next sequential Reference ID (AETH-WI26-001, AETH-WI26-002, etc.)
  useEffect(() => {
    let isMounted = true;

    const fetchApplicantCount = async () => {
      // 1. Try JSONP to bypass CORS seamlessly across domains
      try {
        const jsonpPromise = new Promise((resolve, reject) => {
          const cbName = 'aeth_cb_' + Math.floor(Math.random() * 1000000);
          const script = document.createElement('script');
          const sep = GOOGLE_SHEET_ENDPOINT.includes('?') ? '&' : '?';
          script.src = `${GOOGLE_SHEET_ENDPOINT}${sep}action=getCount&callback=${cbName}`;

          const timer = setTimeout(() => {
            cleanup();
            reject(new Error('timeout'));
          }, 4500);

          const cleanup = () => {
            clearTimeout(timer);
            if (script.parentNode) script.parentNode.removeChild(script);
            delete window[cbName];
          };

          window[cbName] = (resp) => {
            cleanup();
            resolve(resp);
          };

          script.onerror = () => {
            cleanup();
            reject(new Error('script error'));
          };

          document.body.appendChild(script);
        });

        const res = await jsonpPromise;
        if (isMounted && res && res.nextRefId) {
          setSeqRefId(res.nextRefId);
          try {
            localStorage.setItem('aethriz_last_known_ref_id', res.nextRefId);
          } catch (e) {}
          return;
        }
      } catch (err) {
        // Fallback to standard fetch or local count
      }

      // 2. Try standard fetch GET
      try {
        const resp = await fetch(GOOGLE_SHEET_ENDPOINT + '?action=getCount');
        if (resp.ok) {
          const data = await resp.json();
          if (isMounted && data && data.nextRefId) {
            setSeqRefId(data.nextRefId);
            try {
              localStorage.setItem('aethriz_last_known_ref_id', data.nextRefId);
            } catch (e) {}
            return;
          }
        }
      } catch (e) {
        // Fallback below
      }

      // 3. Fallback from localStorage or start at AETH-WI26-001
      try {
        const savedRef = localStorage.getItem('aethriz_last_known_ref_id');
        if (isMounted) {
          setSeqRefId(savedRef || 'AETH-WI26-001');
        }
      } catch (e) {
        if (isMounted) setSeqRefId('AETH-WI26-001');
      }
    };

    if (GOOGLE_SHEET_ENDPOINT) {
      fetchApplicantCount();
    } else {
      setSeqRefId('AETH-WI26-001');
    }

    return () => {
      isMounted = false;
    };
  }, [viewMode]);

  // Step click navigation (can jump back to completed steps)
  const handleStepClick = (targetStep) => {
    if (targetStep < currentStep) {
      setCurrentStep(targetStep);
    } else if (targetStep === currentStep + 1) {
      if (validateStep(currentStep)) {
        setCurrentStep(targetStep);
      }
    }
  };

  // Drag and drop handlers for CV
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, resumeFile: 'Max file size is 10 MB' }));
        return;
      }
      setFormData((prev) => ({ ...prev, resumeFile: file, resumeFileName: file.name }));
      setErrors((prev) => ({ ...prev, resumeFile: null }));
    }
  };

  // Launch Full Page Application for a role
  const handleStartApplication = (roleTitle = '') => {
    const target = roleTitle || '';
    setSelectedRole(target);
    setFormData((prev) => ({ ...prev, position: target }));
    setCurrentStep(1);
    setIsSubmitted(false);
    setViewMode('apply');
  };

  // Exit back to overview
  const handleReturnToOverview = () => {
    setViewMode('overview');
  };

  // Update Field
  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const getWordCount = (txt) => {
    if (!txt || !txt.trim()) return 0;
    return txt.trim().split(/\s+/).length;
  };

  // Step Validation
  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
      if (!formData.emailAddress.trim()) errs.emailAddress = 'Email is required';
      if (!formData.phone.trim()) errs.phone = 'Mobile / WhatsApp number is required';
      if (!formData.collegeCourse.trim()) errs.collegeCourse = 'College / University & Course is required';
      if (!formData.currentYearSemester) errs.currentYearSemester = 'Please select your current year';
      if (formData.currentYearSemester === 'Other' && !formData.currentYearOther.trim()) {
        errs.currentYearSemester = 'Please specify your year';
      }
      if (!formData.cityState.trim()) errs.cityState = 'City/State is required';
    } else if (step === 2) {
      if (!formData.position) errs.position = 'Please select a role';
      if (!formData.keySkills.trim()) errs.keySkills = 'Key skills are required';
      if (!formData.hasExperience) errs.hasExperience = 'Please select an option';
      if (!formData.portfolioUrl.trim()) errs.portfolioUrl = 'Portfolio / GitHub / LinkedIn URL is required';
    } else if (step === 3) {
      if (!formData.resumeFileName && !formData.resumeFile) {
        errs.resumeFile = 'CV / Resume file is required';
      }
      if (!formData.availableFullPeriod) errs.availableFullPeriod = 'Please confirm availability';
      if (!formData.comfortableRemote) errs.comfortableRemote = 'Please confirm remote comfort';
    } else if (step === 4) {
      if (!formData.whyJoin.trim()) errs.whyJoin = 'This field is required';
      if (!formData.contribution.trim()) errs.contribution = 'This field is required';
    } else if (step === 5) {
      if (!formData.agreedToTerms) {
        errs.agreedToTerms = 'You must acknowledge and accept the Terms & Conditions to submit';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, resumeFile: 'Max file size is 10 MB' }));
        return;
      }
      setFormData((prev) => ({ ...prev, resumeFile: file, resumeFileName: file.name }));
      setErrors((prev) => ({ ...prev, resumeFile: null }));
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    setIsSubmitting(true);

    // Sequential Reference ID (AETH-WI26-001, AETH-WI26-002, etc.)
    let generatedId = seqRefId;
    if (!generatedId) {
      try {
        const localCached = localStorage.getItem('aethriz_last_known_ref_id');
        generatedId = localCached || 'AETH-WI26-001';
      } catch (err) {
        generatedId = 'AETH-WI26-001';
      }
    }

    let resumeBase64 = '';
    let resumeMimeType = '';
    if (formData.resumeFile) {
      try {
        resumeBase64 = await fileToBase64(formData.resumeFile);
        resumeMimeType = formData.resumeFile.type || 'application/pdf';
      } catch (fileErr) {
        console.warn('Failed to encode resume file:', fileErr);
      }
    }

    const payload = {
      refId: generatedId,
      fullName: formData.fullName,
      emailAddress: formData.emailAddress,
      phone: formData.phone,
      collegeCourse: formData.collegeCourse,
      currentYearSemester: formData.currentYearSemester,
      currentYearOther: formData.currentYearOther,
      cityState: formData.cityState,
      position: formData.position,
      keySkills: formData.keySkills,
      hasExperience: formData.hasExperience,
      experienceDetails: formData.experienceDetails,
      portfolioUrl: formData.portfolioUrl,
      resumeFileName: formData.resumeFileName,
      resumeBase64: resumeBase64,
      resumeMimeType: resumeMimeType,
      availableFullPeriod: formData.availableFullPeriod,
      comfortableRemote: formData.comfortableRemote,
      whyJoin: formData.whyJoin,
      contribution: formData.contribution
    };

    try {
      if (GOOGLE_SHEET_ENDPOINT) {
        await fetch(GOOGLE_SHEET_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(payload)
        });
      }
    } catch (err) {
      console.warn('Google Sheet submission warning:', err);
    } finally {
      setIsSubmitting(false);
      setRefId(generatedId);
      setIsSubmitted(true);
      try {
        // Advance sequence for subsequent applications
        const currentNumeric = parseInt(generatedId.replace('AETH-WI26-', ''), 10) || 1;
        const nextId = formatSequentialRefId(currentNumeric + 1);
        localStorage.setItem('aethriz_last_known_ref_id', nextId);
        setSeqRefId(nextId);
        localStorage.removeItem('aethriz_candidate_draft');
      } catch (e) {
        // ignore
      }
    }
  };

  // Filtered jobs in overview
  const filteredJobs = ROLES_LIST.filter((r) => {
    const matchesCategory = activeCategory === 'all' || r.category === activeCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      r.title.toLowerCase().includes(q) ||
      r.dept.toLowerCase().includes(q) ||
      r.overview.toLowerCase().includes(q) ||
      (r.skills && r.skills.some((s) => s.toLowerCase().includes(q)));
    return matchesCategory && matchesQuery;
  });

  // =========================================================================
  // VIEW MODE 1: DEDICATED FULL-PAGE APPLICATION PORTAL (WHITE THEME)
  // =========================================================================
  if (viewMode === 'apply') {
    return (
      <div className="fullpage-portal-wrapper">
        {/* Fullpage Top Navigation */}
        <div className="fp-header-nav">
          <button className="fp-back-btn" onClick={handleReturnToOverview}>
            <i className="fa-solid fa-arrow-left"></i>
            <span>Back to Overview</span>
          </button>

          <div className="fp-header-brand">
            <span className="fp-brand-title">AETHRIZ CANDIDATE PORTAL</span>
            <span className="fp-brand-sub">AETHRIZ AI Healthcare and Research Private Limited</span>
          </div>

          <div className="fp-stage-badge">
            <i className="fa-solid fa-file-signature"></i>
            <span>Step {currentStep} of 5</span>
          </div>
        </div>

        {/* Portal Completion Progress Line */}
        <div className="fp-progress-track">
          <div
            className="fp-progress-fill"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          ></div>
        </div>

        {/* Success Screen */}
        {isSubmitted ? (
          <div className="fp-success-screen">
            <div className="fp-success-icon">
              <i className="fa-solid fa-check"></i>
            </div>
            <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Application Successfully Submitted
            </h1>
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '560px', margin: '0 auto 16px' }}>
              Thank you for applying to the <strong>AETHRIZ Winter Internship Programme 2026-27</strong>. Your application
              has been recorded in our talent acquisition database.
            </p>

            {refId && (
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.85rem',
                color: '#64748B',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                padding: '8px 18px',
                borderRadius: '8px',
                display: 'inline-block',
                marginBottom: '26px'
              }}>
                Reference ID: <strong style={{ color: '#E81A2D' }}>{refId}</strong>
              </div>
            )}

            <div className="fp-success-actions">
              <button className="btn-fp-action" onClick={handleReturnToOverview}>
                Back to Careers Overview <i className="fa-solid fa-arrow-right"></i>
              </button>
              <button
                className="btn-fp-action secondary"
                onClick={() => {
                  setFormData(initialForm);
                  setCurrentStep(1);
                  setIsSubmitted(false);
                }}
              >
                Submit Another Application
              </button>
            </div>
          </div>
        ) : (
          /* Dual-Column Enterprise Application Layout */
          <div className="fp-portal-grid">
            {/* Left Sidebar: Application Context & Milestones */}
            <aside className="fp-sidebar-card">
              <div className="fp-role-card-top">
                <span className="fp-role-kicker">// APPLICATION TRACK</span>
                {formData.position ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <h3 className="fp-role-title" style={{ margin: 0 }}>{formData.position}</h3>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#E81A2D',
                        fontSize: '0.75rem',
                        fontFamily: 'Space Mono, monospace',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3 className="fp-role-title" style={{ color: '#64748B', fontSize: '1.05rem', fontWeight: 600 }}>
                      Track Not Selected Yet
                    </h3>
                    <span style={{ fontSize: '0.76rem', color: '#94A3B8' }}>
                      (Select your domain in Step 2)
                    </span>
                  </div>
                )}
                <div className="fp-meta-tags" style={{ marginTop: '14px' }}>
                  <div>
                    <i className="fa-solid fa-building" style={{ color: '#E81A2D' }}></i>
                    <span>AETHRIZ AI Healthcare & Research</span>
                  </div>
                  <div>
                    <i className="fa-solid fa-location-dot" style={{ color: '#E81A2D' }}></i>
                    <span>100% Remote Immersion</span>
                  </div>
                  <div>
                    <i className="fa-regular fa-calendar-check" style={{ color: '#E81A2D' }}></i>
                    <span>15 Oct 2026 – 15 Jan 2027</span>
                  </div>
                </div>
              </div>

              {/* Vertical Stepper */}
              <div className="fp-stepper-list">
                {[
                  { num: 1, title: 'Personal Info', desc: 'Contact & Academic Background' },
                  { num: 2, title: 'Role & Skills', desc: 'Competencies & Portfolio' },
                  { num: 3, title: 'CV & Availability', desc: 'Resume Upload & Remote Confirmation' },
                  { num: 4, title: 'Motivation', desc: 'Statement of Purpose' },
                  { num: 5, title: 'Terms & Submit', desc: 'Declaration & Final Submission' }
                ].map((s) => (
                  <div
                    key={s.num}
                    className={`fp-step-item ${currentStep === s.num ? 'active' : ''} ${
                      currentStep > s.num ? 'completed' : ''
                    }`}
                    onClick={() => handleStepClick(s.num)}
                    style={{ cursor: s.num <= currentStep ? 'pointer' : 'default' }}
                    title={s.num <= currentStep ? `Jump to Step ${s.num}` : undefined}
                  >
                    <div className="fp-step-num-wrap">
                      {currentStep > s.num ? <i className="fa-solid fa-check"></i> : s.num}
                    </div>
                    <div className="fp-step-text-col">
                      <span className="fp-step-label">{s.title}</span>
                      <span className="fp-step-desc">{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Right Main Card: Fullpage Dossier Card */}
            <main className="fp-form-main-card">
              {/* Mobile-Only Step HUD & Milestone Bar */}
              <div className="fp-mobile-stepper-header">
                <div className="fp-mobile-stepper-meta">
                  <div className="fp-mobile-step-title-col">
                    <span className="fp-mobile-step-kicker">STEP {currentStep} OF 5</span>
                    <span className="fp-mobile-step-name">
                      {[
                        'Personal Info',
                        'Role & Skills',
                        'CV & Availability',
                        'Motivation',
                        'Terms & Submit'
                      ][currentStep - 1]}
                    </span>
                  </div>
                  <div className="fp-mobile-track-tag">
                    {formData.position ? (
                      <span className="track-name">{formData.position}</span>
                    ) : (
                      <span className="track-empty">Track: Step 2</span>
                    )}
                  </div>
                </div>

                {/* 5-Step Compact Dots / Pills */}
                <div className="fp-mobile-dots-row">
                  {[
                    { num: 1, label: 'Info' },
                    { num: 2, label: 'Role' },
                    { num: 3, label: 'CV' },
                    { num: 4, label: 'Why' },
                    { num: 5, label: 'Submit' }
                  ].map((s) => (
                    <button
                      key={s.num}
                      type="button"
                      className={`fp-mobile-dot-btn ${currentStep === s.num ? 'active' : ''} ${
                        currentStep > s.num ? 'completed' : ''
                      }`}
                      onClick={() => handleStepClick(s.num)}
                      disabled={s.num > currentStep + 1}
                      title={`Step ${s.num}: ${s.label}`}
                    >
                      <span className="dot-circle">
                        {currentStep > s.num ? (
                          <i className="fa-solid fa-check"></i>
                        ) : (
                          s.num
                        )}
                      </span>
                      <span className="dot-label">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="fp-form-banner-strip">
                <span className="fp-banner-kicker">WINTER INTERNSHIP PROGRAMME 2026-27</span>
                <h2 className="fp-banner-title">
                  {formData.position ? `${formData.position} Application Dossier` : 'Winter Internship 2026-27 Application Dossier'}
                </h2>
                <div className="fp-banner-corp">
                  Please complete this application carefully. All fields marked with * are required.
                </div>
              </div>

              <div className="fp-form-body">
                <form onSubmit={handleSubmitApplication}>
                  {/* STEP 1: Personal & Academic Info */}
                  {currentStep === 1 && (
                    <div>
                      <div className="fp-field-block">
                        <label className="fp-label">Full Name *</label>
                        <div className="fp-sublabel">
                          Enter your full name as you would like it to appear on official internship documents.
                        </div>
                        <input
                          type="text"
                          className="fp-input"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) => handleChange('fullName', e.target.value)}
                        />
                        {errors.fullName && <div className="fp-err-text">{errors.fullName}</div>}
                      </div>

                      <div className="fp-field-block">
                        <label className="fp-label">Email Address *</label>
                        <input
                          type="email"
                          className="fp-input"
                          placeholder="Enter your email address"
                          value={formData.emailAddress}
                          onChange={(e) => handleChange('emailAddress', e.target.value)}
                        />
                        {errors.emailAddress && <div className="fp-err-text">{errors.emailAddress}</div>}
                      </div>

                      <div className="fp-field-block">
                        <label className="fp-label">WhatsApp / Mobile Number *</label>
                        <input
                          type="tel"
                          className="fp-input"
                          placeholder="Enter your mobile number"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                        />
                        {errors.phone && <div className="fp-err-text">{errors.phone}</div>}
                      </div>

                      <div className="fp-field-block">
                        <label className="fp-label">College / University & Course *</label>
                        <input
                          type="text"
                          className="fp-input"
                          placeholder="Enter your college / university & degree"
                          value={formData.collegeCourse}
                          onChange={(e) => handleChange('collegeCourse', e.target.value)}
                        />
                        {errors.collegeCourse && <div className="fp-err-text">{errors.collegeCourse}</div>}
                      </div>

                      <div className="fp-field-block">
                        <label className="fp-label">Current Year *</label>
                        <div className="fp-radios-grid">
                          {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((yr) => (
                            <div
                              key={yr}
                              className={`fp-radio-item ${formData.currentYearSemester === yr ? 'selected' : ''}`}
                              onClick={() => handleChange('currentYearSemester', yr)}
                            >
                              <div className="fp-radio-circle">
                                {formData.currentYearSemester === yr && <div className="fp-radio-inner"></div>}
                              </div>
                              <span>{yr}</span>
                            </div>
                          ))}
                          <div
                            className={`fp-radio-item fp-radio-other ${formData.currentYearSemester === 'Other' ? 'selected' : ''}`}
                            onClick={() => handleChange('currentYearSemester', 'Other')}
                          >
                            <div className="fp-radio-circle">
                              {formData.currentYearSemester === 'Other' && <div className="fp-radio-inner"></div>}
                            </div>
                            <span style={{ marginRight: '8px', flexShrink: 0 }}>Other:</span>
                            <input
                              type="text"
                              className="fp-input fp-other-input"
                              placeholder="Specify year..."
                              value={formData.currentYearOther}
                              onChange={(e) => {
                                handleChange('currentYearSemester', 'Other');
                                handleChange('currentYearOther', e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        {errors.currentYearSemester && (
                          <div className="fp-err-text">{errors.currentYearSemester}</div>
                        )}
                      </div>

                      <div className="fp-field-block">
                        <label className="fp-label">City / State *</label>
                        <input
                          type="text"
                          className="fp-input"
                          placeholder="Enter your city and state"
                          value={formData.cityState}
                          onChange={(e) => handleChange('cityState', e.target.value)}
                        />
                        {errors.cityState && <div className="fp-err-text">{errors.cityState}</div>}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Role & Key Skills */}
                  {currentStep === 2 && (
                    <div>
                      <div className="fp-field-block">
                        <label className="fp-label">Which position are you applying for? *</label>
                        <div className="fp-radios-grid">
                          {ROLES_LIST.map((r) => (
                            <div
                              key={r.title}
                              className={`fp-radio-item ${formData.position === r.title ? 'selected' : ''}`}
                              onClick={() => handleChange('position', r.title)}
                            >
                              <div className="fp-radio-circle">
                                {formData.position === r.title && <div className="fp-radio-inner"></div>}
                              </div>
                              <span style={{ fontWeight: 600 }}>{r.title}</span>
                            </div>
                          ))}
                        </div>
                        {errors.position && <div className="fp-err-text">{errors.position}</div>}
                      </div>

                      <div className="fp-field-block">
                        <label className="fp-label">What are your key skills relevant to this role? *</label>
                        <textarea
                          className="fp-textarea"
                          placeholder="Detail your technical proficiencies, frameworks, tools, and domain skills..."
                          value={formData.keySkills}
                          onChange={(e) => handleChange('keySkills', e.target.value)}
                        ></textarea>
                        {errors.keySkills && <div className="fp-err-text">{errors.keySkills}</div>}
                      </div>

                      <div className="fp-field-block">
                        <label className="fp-label">
                          Do you have any previous project, internship, freelance or relevant experience? *
                        </label>
                        <div className="fp-radios-grid" style={{ flexDirection: 'row' }}>
                          {['Yes', 'No'].map((opt) => (
                            <div
                              key={opt}
                              className={`fp-radio-item ${formData.hasExperience === opt ? 'selected' : ''}`}
                              style={{ flex: 1 }}
                              onClick={() => handleChange('hasExperience', opt)}
                            >
                              <div className="fp-radio-circle">
                                {formData.hasExperience === opt && <div className="fp-radio-inner"></div>}
                              </div>
                              <span>{opt}</span>
                            </div>
                          ))}
                        </div>
                        {errors.hasExperience && <div className="fp-err-text">{errors.hasExperience}</div>}
                      </div>

                      <div className="fp-field-block">
                        <label className="fp-label">If yes, briefly mention it.</label>
                        <input
                          type="text"
                          className="fp-input"
                          placeholder="Summary of past projects, internships, or freelance engagements..."
                          value={formData.experienceDetails}
                          onChange={(e) => handleChange('experienceDetails', e.target.value)}
                        />
                      </div>

                      <div className="fp-field-block">
                        <label className="fp-label">Portfolio / GitHub / LinkedIn *</label>
                        <div className="fp-sublabel">Paste your URL here</div>
                        <input
                          type="url"
                          className="fp-input"
                          placeholder="Paste your portfolio, GitHub, or profile URL"
                          value={formData.portfolioUrl}
                          onChange={(e) => handleChange('portfolioUrl', e.target.value)}
                        />
                        {errors.portfolioUrl && <div className="fp-err-text">{errors.portfolioUrl}</div>}
                      </div>
                    </div>
                  )}

                  {/* STEP 3: CV & Availability */}
                  {currentStep === 3 && (
                    <div>
                      <div className="fp-field-block">
                        <label className="fp-label">Upload Your Latest CV / Resume *</label>
                        <div className="fp-sublabel">Upload 1 supported file: PDF or document. Max 10 MB.</div>

                        {formData.resumeFileName ? (
                          <div className="fp-file-card-enhanced">
                            <div className="fp-file-card-left">
                              <div className="fp-file-icon-wrap">
                                <i className="fa-solid fa-file-pdf"></i>
                              </div>
                              <div className="fp-file-info">
                                <span className="fp-file-name">{formData.resumeFileName}</span>
                                <span className="fp-file-sub">
                                  {formData.resumeFile ? `${(formData.resumeFile.size / (1024 * 1024)).toFixed(2)} MB • ` : ''}Document attached & ready for evaluation
                                </span>
                              </div>
                            </div>
                            <div className="fp-file-card-actions">
                              <label className="fp-file-replace-btn">
                                <input
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                  style={{ display: 'none' }}
                                  onChange={handleFile}
                                />
                                <i className="fa-solid fa-arrows-rotate"></i> Replace
                              </label>
                              <button
                                type="button"
                                className="fp-file-remove-btn"
                                onClick={() => setFormData((prev) => ({ ...prev, resumeFile: null, resumeFileName: '' }))}
                                title="Remove file"
                              >
                                <i className="fa-solid fa-trash-can"></i>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label
                            className={`fp-dropzone ${isDragging ? 'dragging' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                          >
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              style={{ display: 'none' }}
                              onChange={handleFile}
                            />
                            <i
                              className="fa-solid fa-cloud-arrow-up"
                              style={{ fontSize: '2.4rem', color: '#E81A2D', marginBottom: '8px' }}
                            ></i>
                            <div style={{ color: '#0F172A', fontWeight: 700, fontSize: '0.96rem' }}>
                              {isDragging ? 'Drop your file here...' : 'Click to upload or drag & drop your CV / Resume'}
                            </div>
                            <div style={{ color: '#64748B', fontSize: '0.8rem', marginTop: '4px' }}>PDF or Word Document (Max 10 MB)</div>
                            <span className="fp-dropzone-badge">
                              <i className="fa-solid fa-shield-halved"></i> Confidential & Encrypted
                            </span>
                          </label>
                        )}
                        {errors.resumeFile && <div className="fp-err-text">{errors.resumeFile}</div>}
                      </div>

                      <div className="fp-field-block">
                        <label className="fp-label">
                          Are you available for the complete internship period? *
                        </label>
                        <div className="fp-sublabel">01 October 2026 – 01 January 2027</div>
                        <div className="fp-radios-grid" style={{ flexDirection: 'row' }}>
                          {['Yes', 'No'].map((opt) => (
                            <div
                              key={opt}
                              className={`fp-radio-item ${formData.availableFullPeriod === opt ? 'selected' : ''}`}
                              style={{ flex: 1 }}
                              onClick={() => handleChange('availableFullPeriod', opt)}
                            >
                              <div className="fp-radio-circle">
                                {formData.availableFullPeriod === opt && <div className="fp-radio-inner"></div>}
                              </div>
                              <span>{opt}</span>
                            </div>
                          ))}
                        </div>
                        {errors.availableFullPeriod && (
                          <div className="fp-err-text">{errors.availableFullPeriod}</div>
                        )}
                      </div>

                      <div className="fp-field-block">
                        <label className="fp-label">Are you comfortable working remotely? *</label>
                        <div className="fp-radios-grid" style={{ flexDirection: 'row' }}>
                          {['Yes', 'No'].map((opt) => (
                            <div
                              key={opt}
                              className={`fp-radio-item ${formData.comfortableRemote === opt ? 'selected' : ''}`}
                              style={{ flex: 1 }}
                              onClick={() => handleChange('comfortableRemote', opt)}
                            >
                              <div className="fp-radio-circle">
                                {formData.comfortableRemote === opt && <div className="fp-radio-inner"></div>}
                              </div>
                              <span>{opt}</span>
                            </div>
                          ))}
                        </div>
                        {errors.comfortableRemote && (
                          <div className="fp-err-text">{errors.comfortableRemote}</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Motivation */}
                  {currentStep === 4 && (
                    <div>
                      <div className="fp-field-block">
                        <label className="fp-label">Why do you want to join AETHRIZ? *</label>
                        <textarea
                          className="fp-textarea"
                          placeholder="Explain what drives your interest in AETHRIZ and our mission..."
                          value={formData.whyJoin}
                          onChange={(e) => handleChange('whyJoin', e.target.value)}
                        ></textarea>
                        {errors.whyJoin && <div className="fp-err-text">{errors.whyJoin}</div>}
                      </div>

                      <div className="fp-field-block">
                        <label className="fp-label">
                          What can you contribute to AETHRIZ during this internship? *
                        </label>
                        <div className="fp-sublabel">Keep your answer within 100 words</div>
                        <textarea
                          className="fp-textarea"
                          placeholder="Highlight the deliverables and value you will bring to your team..."
                          value={formData.contribution}
                          onChange={(e) => handleChange('contribution', e.target.value)}
                        ></textarea>
                        {errors.contribution && <div className="fp-err-text">{errors.contribution}</div>}
                      </div>
                    </div>
                  )}

                  {/* STEP 5: Terms & Conditions */}
                  {currentStep === 5 && (
                    <div>
                      {/* Executive Dossier Review Summary Card */}
                      <div className="fp-review-summary-card">
                        <div className="fp-review-header">
                          <div className="fp-review-title-col">
                            <span className="fp-review-kicker">// APPLICATION SUMMARY</span>
                            <h3 className="fp-review-heading">Review Your Dossier Before Submission</h3>
                          </div>
                          <span className="fp-review-badge">
                            <i className="fa-solid fa-clipboard-check"></i> Verification Ready
                          </span>
                        </div>

                        <div className="fp-review-grid">
                          <div className="fp-review-item">
                            <span className="fp-review-label">Candidate Name</span>
                            <span className="fp-review-val">{formData.fullName || '—'}</span>
                          </div>

                          <div className="fp-review-item">
                            <span className="fp-review-label">Contact Credentials</span>
                            <span className="fp-review-val">
                              {formData.emailAddress || '—'}
                              {formData.phone ? ` • ${formData.phone}` : ''}
                            </span>
                          </div>

                          <div className="fp-review-item">
                            <span className="fp-review-label">Location</span>
                            <span className="fp-review-val">{formData.cityState || '—'}</span>
                          </div>

                          <div className="fp-review-item">
                            <span className="fp-review-label">Academic Profile</span>
                            <span className="fp-review-val">
                              {formData.collegeCourse || '—'}
                              {formData.currentYearSemester
                                ? ` (${formData.currentYearSemester === 'Other' ? formData.currentYearOther : formData.currentYearSemester})`
                                : ''}
                            </span>
                          </div>

                          <div className="fp-review-item full-width highlight-row">
                            <div className="fp-review-row-flex">
                              <div className="fp-review-field-col">
                                <span className="fp-review-label">Selected Track / Role</span>
                                <span className="fp-review-val highlight">
                                  {formData.position || 'Track Not Selected Yet'}
                                </span>
                              </div>
                              <button
                                type="button"
                                className="fp-review-edit-btn"
                                onClick={() => setCurrentStep(2)}
                              >
                                Change Track <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                            </div>
                          </div>

                          <div className="fp-review-item full-width">
                            <div className="fp-review-row-flex">
                              <div className="fp-review-field-col">
                                <span className="fp-review-label">Attached CV / Resume</span>
                                <div className="fp-review-val file-tag">
                                  <i className="fa-solid fa-file-pdf" style={{ color: '#E81A2D' }}></i>
                                  <span>{formData.resumeFileName || 'No resume file attached'}</span>
                                  {formData.resumeFileName && <span className="chip-verified">Ready</span>}
                                </div>
                              </div>
                              <button
                                type="button"
                                className="fp-review-edit-btn"
                                onClick={() => setCurrentStep(3)}
                              >
                                Replace CV <i className="fa-solid fa-arrow-up-from-bracket"></i>
                              </button>
                            </div>
                          </div>

                          <div className="fp-review-item full-width">
                            <span className="fp-review-label">Immersion & Duration Confirmation</span>
                            <span className="fp-review-val">
                              Available full period: <strong>{formData.availableFullPeriod || 'Yes'}</strong> • Comfortable with 100% remote: <strong>{formData.comfortableRemote || 'Yes'}</strong>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="fp-field-block">
                        <label className="fp-label">Terms & Conditions</label>
                        <div className="fp-terms-container">
                          <p style={{ fontWeight: 700, color: '#0F172A', marginBottom: '10px' }}>
                            By submitting this application, I acknowledge and agree that:
                          </p>
                          <ol>
                            <li>The internship is a 3-month remote programme from 01 October 2026 to 01 January 2027.</li>
                            <li>Submission of this form does not guarantee selection.</li>
                            <li>
                              Final selection and role allocation will be determined by AETHRIZ based on skills,
                              requirements and the organization's selection process.
                            </li>
                            <li>
                              Selected interns will receive an Internship Offer Letter at the beginning of the
                              programme.
                            </li>
                            <li>
                              Interns who successfully complete the programme will receive an official Internship
                              Completion Certificate.
                            </li>
                            <li>
                              Interns are expected to maintain professional communication, collaborate with their
                              teams, take responsibility for assigned work and complete deliverables within agreed
                              timelines.
                            </li>
                            <li>
                              Applicants must provide accurate and authentic information and submit their latest CV.
                            </li>
                            <li>
                              AETHRIZ reserves the right to make necessary changes to programme activities,
                              assignments or internal structure when required.
                            </li>
                          </ol>
                        </div>

                        <div
                          className="fp-checkbox-wrap"
                          onClick={() => handleChange('agreedToTerms', !formData.agreedToTerms)}
                        >
                          <div className={`fp-check-box ${formData.agreedToTerms ? 'checked' : ''}`}>
                            {formData.agreedToTerms && <i className="fa-solid fa-check"></i>}
                          </div>
                          <span>
                            I confirm that the information provided by me is accurate and authentic, and I have read and
                            agree to the above Terms & Conditions. *
                          </span>
                        </div>
                        {errors.agreedToTerms && <div className="fp-err-text">{errors.agreedToTerms}</div>}
                      </div>
                    </div>
                  )}

                  {/* Form Footer Navigation Actions */}
                  <div className="fp-form-footer">
                    {currentStep > 1 ? (
                      <button type="button" className="btn-fp-action secondary" onClick={handlePrevStep}>
                        <i className="fa-solid fa-arrow-left"></i> Previous Step
                      </button>
                    ) : (
                      <button type="button" className="btn-fp-action secondary" onClick={handleReturnToOverview}>
                        Cancel
                      </button>
                    )}

                    {currentStep < 5 ? (
                      <button type="button" className="btn-fp-action" onClick={handleNextStep}>
                        Continue <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    ) : (
                      <button type="submit" className="btn-fp-action" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <i className="fa-solid fa-circle-notch fa-spin"></i> Submitting...
                          </>
                        ) : (
                          <>
                            Submit Application <i className="fa-solid fa-paper-plane"></i>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </main>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW MODE 2: CORPORATE CAREERS & OPPORTUNITIES PAGE (OVERVIEW)
  // =========================================================================
  return (
    <div className="careers-main-viewport">
      {/* Top HUD Nav */}
      <div className="c-top-bar">
        <button className="c-back-link" onClick={onBack}>
          <i className="fa-solid fa-arrow-left"></i>
          <span>RETURN TO PLATFORM</span>
        </button>
        <div className="c-status-chip">
          <span className="c-pulse"></span>
          <span>WINTER COHORT 2026-27</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="c-hero">
        <span className="c-hero-kicker">// JOIN THE VANGUARD</span>
        <h1 className="c-hero-title">
          Build the Future of <br />
          <i>Bio-Algorithmic Health.</i>
        </h1>
        <p className="c-hero-subtitle">
          We are assembling exceptional student engineers, researchers, designers, and growth strategists to work on
          breakthrough health intelligence platforms. Join our Winter 2026-27 remote immersion cohort.
        </p>
        <div className="c-hero-actions">
          <button
            className="btn-primary-lead"
            onClick={() => handleStartApplication('')}
          >
            START APPLICATION <i className="fa-solid fa-arrow-right"></i>
          </button>
          <button
            className="btn-secondary-lead"
            onClick={() => {
              const el = document.getElementById('open-positions');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            VIEW 7 OPEN ROLES <i className="fa-solid fa-list-check"></i>
          </button>
        </div>
      </section>

      {/* Program Spotlight Card with Official Banner */}
      <section className="c-program-spotlight">
        <div className="spotlight-banner-media">
          <img
            src="/winter-internship-banner.png"
            alt="AETHRIZ Winter Internship Programme 2026-27 Official Banner"
          />
        </div>

        <div className="spotlight-badge">
          <i className="fa-solid fa-snowflake"></i> WINTER INTERNSHIP PROGRAMME 2026-27
        </div>
        <h2 className="spotlight-title">AETHRIZ AI Healthcare and Research Private Limited</h2>
        <div className="spotlight-company">Cohort Duration: 15 October 2026 – 15 January 2027 • Remote</div>

        <div className="spotlight-grid">
          <div>
            <p className="spotlight-summary-p">
              We are inviting applications for our Winter Internship Programme 2026-27, a 3-month remote internship
              designed for students and emerging talent interested in technology, research, product development, creative
              communication and digital growth.
            </p>
            <p className="spotlight-summary-p">
              Selected interns will work on defined responsibilities within their respective teams and will be expected to
              contribute to real organizational activities, projects and deliverables.
            </p>
            <button
              className="btn-primary-lead"
              style={{ marginTop: '12px' }}
              onClick={() => handleStartApplication('')}
            >
              START APPLICATION <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <div className="spotlight-meta-list">
            <div className="meta-row">
              <span className="meta-label">Internship Duration</span>
              <span className="meta-val">15 Oct 2026 – 15 Jan 2027</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Work Mode</span>
              <span className="meta-val">100% Remote</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Deliverables</span>
              <span className="meta-val">Real Projects & Production Code</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Credentials</span>
              <span className="meta-val">Offer Letter & Certificate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Aethriz (Culture & Perks) */}
      <section className="c-section">
        <div className="c-section-header">
          <span className="c-section-kicker">// WHY WORK AT AETHRIZ</span>
          <h2 className="c-section-title">
            Engineered for <i>High Velocity & Autonomy.</i>
          </h2>
        </div>

        <div className="c-perks-grid">
          <div className="c-perk-card">
            <div className="perk-icon-wrap">
              <i className="fa-solid fa-code-merge"></i>
            </div>
            <h3 className="perk-title">Real Production Impact</h3>
            <p className="perk-desc">
              No simulated projects. You will write code, run AI experiments, and ship features that actively impact real
              healthcare products and research.
            </p>
          </div>

          <div className="c-perk-card">
            <div className="perk-icon-wrap">
              <i className="fa-solid fa-brain"></i>
            </div>
            <h3 className="perk-title">1-on-1 Architect Mentorship</h3>
            <p className="perk-desc">
              Work alongside our core technology founders, gaining direct guidance on algorithmic systems, system design,
              and machine learning.
            </p>
          </div>

          <div className="c-perk-card">
            <div className="perk-icon-wrap">
              <i className="fa-solid fa-award"></i>
            </div>
            <h3 className="perk-title">Official Recognition</h3>
            <p className="perk-desc">
              Selected interns receive a formal Internship Offer Letter at commencement and an official Completion
              Certificate upon graduation.
            </p>
          </div>

          <div className="c-perk-card">
            <div className="perk-icon-wrap">
              <i className="fa-solid fa-house-laptop"></i>
            </div>
            <h3 className="perk-title">Asynchronous Flexibility</h3>
            <p className="perk-desc">
              Work on your own schedule. Our remote-first, asynchronous model lets you balance university coursework and exams
              without friction.
            </p>
          </div>
        </div>
      </section>

      {/* Open Positions Board */}
      <section className="c-section" id="open-positions">
        <div className="c-section-header">
          <span className="c-section-kicker">// COHORT OPPORTUNITIES</span>
          <h2 className="c-section-title">
            Open Positions <i>(Winter 2026–27)</i>
          </h2>
        </div>

        {/* Search & Filters Toolbar */}
        <div className="job-board-toolbar">
          <div className="job-search-box">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              type="text"
              className="job-search-input"
              placeholder="Search roles by keyword, domain or skill (e.g. Python, React, Design, Creator)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          <div className="job-board-filters">
            <button
              className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Tracks ({ROLES_LIST.length})
            </button>
            <button
              className={`filter-btn ${activeCategory === 'engineering' ? 'active' : ''}`}
              onClick={() => setActiveCategory('engineering')}
            >
              Engineering & AI
            </button>
            <button
              className={`filter-btn ${activeCategory === 'design' ? 'active' : ''}`}
              onClick={() => setActiveCategory('design')}
            >
              Design
            </button>
            <button
              className={`filter-btn ${activeCategory === 'marketing' ? 'active' : ''}`}
              onClick={() => setActiveCategory('marketing')}
            >
              Marketing & Growth
            </button>
          </div>
        </div>

        {/* Roles List */}
        <div className="job-cards-list">
          {filteredJobs.length === 0 ? (
            <div className="job-empty-state">
              <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '2rem', color: '#94A3B8', marginBottom: '12px' }}></i>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.2rem', marginBottom: '6px' }}>No matching tracks found</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '16px' }}>
                We couldn't find any opportunities matching "{searchQuery}".
              </p>
              <button
                className="btn-secondary-lead"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredJobs.map((role) => {
              const isExpanded = expandedRoleId === role.id;
              return (
                <div key={role.id} className={`job-row-item ${isExpanded ? 'expanded' : ''}`}>
                  <div className="job-row-main">
                    <div className="job-left-info">
                      <span className="job-dept-pill">{role.dept}</span>
                      <h3 className="job-name-title">{role.title}</h3>
                      <div className="job-metadata-chips">
                        <span>
                          <i className="fa-solid fa-location-dot" style={{ color: '#E81A2D' }}></i> {role.location}
                        </span>
                        <span>•</span>
                        <span>
                          <i className="fa-regular fa-clock" style={{ color: '#E81A2D' }}></i> 3 Months
                        </span>
                        <span>•</span>
                        <span>Winter Cohort</span>
                      </div>
                    </div>

                    <div className="job-actions-group">
                      <button
                        type="button"
                        className="btn-details-toggle"
                        onClick={() => setExpandedRoleId(isExpanded ? null : role.id)}
                      >
                        {isExpanded ? 'Hide Details' : 'View Details'}
                        <i className={`fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                      </button>
                      <button
                        className="btn-apply-job"
                        onClick={() => handleStartApplication(role.title)}
                      >
                        Apply For Role <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>

                  {/* Expanded Accordion Details */}
                  {isExpanded && (
                    <div className="job-accordion-content">
                      <p className="job-acc-overview">{role.overview}</p>

                      <div className="job-acc-section">
                        <span className="job-acc-heading">Key Immersion Responsibilities:</span>
                        <ul className="job-acc-bullets">
                          {role.responsibilities && role.responsibilities.map((resp, idx) => (
                            <li key={idx}>{resp}</li>
                          ))}
                        </ul>
                      </div>

                      {role.skills && role.skills.length > 0 && (
                        <div className="job-acc-skills">
                          <span className="job-acc-heading">Target Competencies:</span>
                          <div className="job-skills-tags-wrap">
                            {role.skills.map((sk) => (
                              <span key={sk} className="job-skill-tag">{sk}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
