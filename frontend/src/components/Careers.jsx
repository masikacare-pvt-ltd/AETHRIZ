import React, { useState } from 'react';
import '../styles/careers.css';
import '../styles/careers-application.css';
import CareersApplicationExperience from './careers/CareersApplicationExperience';

const ROLES_LIST = [
  {
    id: 'social-media-influencer',
    title: 'Social Media Influencer & Content Creator',
    category: 'creator',
    dept: 'Digital Creator Ecosystems',
    location: '100% Remote',
    duration: '3 Months',
    cohort: 'Winter 2026–2027',
    badge: 'Creator & Influencer Track',
    icon: 'fa-solid fa-camera-retro',
    overview:
      'Serve as an authentic digital creator, brand ambassador, and presenter for AETHRIZ AI. Ideate, produce, and publish high-engagement short-form video reels, visual infographics, and storytelling campaigns across Instagram, YouTube, LinkedIn, and X.',
    skills: [
      'Short-Form Video',
      'Content Creation',
      'Reels / Shorts',
      'Personal Branding',
      'Community Engagement',
      'Visual Storytelling'
    ],
    responsibilities: [
      'Produce creative, engaging short-form video content and reels spotlighting AETHRIZ AI healthcare innovations.',
      'Act as a leading digital creator voice and brand ambassador across student, builder, and health-tech communities.',
      'Collaborate directly with the core team to translate bio-intelligence concepts into compelling digital media.',
      'Grow and nurture active digital conversations, audience engagement, and community resonance.'
    ],
    isClosed: false,
    status: 'open'
  },
  {
    id: 'podcast-host',
    title: 'Podcast Host & Digital Presenter',
    category: 'media',
    dept: 'Media & Broadcast Communications',
    location: '100% Remote',
    duration: '3 Months',
    cohort: 'Winter 2026–2027',
    badge: 'Podcast & Media Track',
    icon: 'fa-solid fa-microphone-lines',
    overview:
      'Anchor AETHRIZ podcasts, live digital broadcast shows, and presenter series. Formulate compelling interview outlines, converse with researchers and guest creators, and communicate our health-intelligence vision with charisma, poise, and clarity.',
    skills: [
      'Podcast Hosting',
      'Digital Presenting',
      'Public Speaking',
      'Interview Moderation',
      'Scriptwriting',
      'Audio & Video Broadcast'
    ],
    responsibilities: [
      'Host and moderate official AETHRIZ podcast episodes, creator interviews, and interactive live streams.',
      'Structure engaging narrative arcs, research discussion topics, and prepare thought-provoking interview questions.',
      'Deliver articulate digital presentations, product release walkthroughs, and audio-visual updates.',
      'Work alongside audio/video production mentors to uphold top-tier broadcast clarity and professional presentation.'
    ],
    isClosed: false,
    status: 'open'
  }
];

const FAQS_LIST = [
  {
    q: 'Who is eligible to apply for this winter cohort?',
    a: 'Students from any year of study (1st, 2nd, 3rd, or final year), recent graduates, and independent digital creators or podcast hosts with a passion for creative storytelling and media presentation are eligible to apply.'
  },
  {
    q: 'What is the required weekly commitment and work model?',
    a: 'The internship is 100% remote and asynchronous with a flexible weekly commitment. You will collaborate through structured weekly deliverables, content milestones, and founder syncs without rigid 9-to-5 requirements.'
  },
  {
    q: 'How and when will the approved rewards be dispatched?',
    a: 'Upon successful completion of the 3-month programme and verification of defined deliverables, eligible interns will receive their official verified Internship Completion Certificate digitally, and the physical package (AETHRIZ branded goodies kit and crystal keepsake memento with signed letter of recommendation) will be safely dispatched to your provided address.'
  },
  {
    q: 'How does the selection process work?',
    a: 'Applications are reviewed on a rolling basis. Our recruitment team evaluates your creative work samples, social profile/channel link, and motivation statement. Shortlisted candidates are invited for a brief virtual interaction with the founding team before final cohort confirmation.'
  }
];

export default function Careers({ onBack }) {
  // Page mode: 'overview' (Corporate Careers Landing) | 'apply' (Cinematic Application Experience)
  const [viewMode, setViewMode] = useState('overview');

  // Filter category in overview
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRoleId, setExpandedRoleId] = useState(null);
  const [expandedFaqId, setExpandedFaqId] = useState(0);

  // Selected role for the application experience (defaults to first active open role)
  const defaultOpenRole = ROLES_LIST.find((r) => !r.isClosed)?.title || ROLES_LIST[0].title;
  const [selectedRole, setSelectedRole] = useState(defaultOpenRole);

  // Launch Application Experience
  const handleStartApplication = (roleTitle = '', isClosed = false) => {
    if (isClosed) return;
    const target = roleTitle || defaultOpenRole;
    setSelectedRole(target);
    setViewMode('apply');
  };

  // Exit back to overview with smooth reverse slide transition
  const handleReturnToOverview = () => {
    setViewMode('closing');
    setTimeout(() => {
      setViewMode('overview');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 700);
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

  return (
    <div className="careers-stage-viewport">
      {/* Panel 1: Careers Overview (slides left with blur and scale when applying) */}
      <div className={`careers-overview-container ${viewMode === 'apply' ? 'slide-out-left' : ''}`}>
        <div className="careers-main-viewport">
          {/* Top Bar Navigation */}
          <div className="c-top-bar">
            {onBack ? (
              <button type="button" className="c-back-link" onClick={onBack}>
                <i className="fa-solid fa-arrow-left"></i> BACK TO PLATFORM
              </button>
            ) : (
              <a href="/" className="c-back-link">
                <i className="fa-solid fa-arrow-left"></i> BACK TO HOME
              </a>
            )}

            <div className="c-status-chip" title="Applications currently open">
              <span className="c-pulse-wrapper">
                <span className="c-pulse-ping"></span>
                <span className="c-pulse"></span>
              </span>
              <span className="c-status-text">
                <strong className="c-status-live-tag">APPLICATIONS ACTIVE</strong>
                <span className="c-status-dot-sep">•</span>
                <span>WINTER INTERNSHIP 2026–2027</span>
              </span>
            </div>
          </div>

          {/* Hero Section */}
          <section className="c-hero">
            <span className="c-hero-kicker">// AETHRIZ TALENT RECRUITMENT • WINTER COHORT 2026–2027</span>
            <h1 className="c-hero-title">
              Architect the Next Era of <br />
              <i>Bio-Algorithmic Health.</i>
            </h1>
            <p className="c-hero-subtitle">
              We are assembling dynamic digital creators, visual storytellers, and podcast hosts for the official{' '}
              <strong>AETHRIZ Winter Internship Program 2026–2027</strong>. Gain hands-on exposure to breakthrough healthcare AI,
              amplify public brand resonance, and earn verified executive credentials.
            </p>

            {/* Quick Metrics HUD Strip */}
            <div className="c-hud-metrics-strip">
              <div className="hud-metric-card">
                <div className="hud-metric-icon">
                  <i className="fa-solid fa-globe"></i>
                </div>
                <div className="hud-metric-content">
                  <span className="hud-metric-val">100% Remote</span>
                  <span className="hud-metric-sub">Global Asynchronous Flexibility</span>
                </div>
              </div>

              <div className="hud-metric-card">
                <div className="hud-metric-icon">
                  <i className="fa-regular fa-calendar-check"></i>
                </div>
                <div className="hud-metric-content">
                  <span className="hud-metric-val">3 Months</span>
                  <span className="hud-metric-sub">Winter Cohort 2026–2027</span>
                </div>
              </div>

              <div className="hud-metric-card">
                <div className="hud-metric-icon">
                  <i className="fa-solid fa-trophy"></i>
                </div>
                <div className="hud-metric-content">
                  <span className="hud-metric-val">4 Approved Rewards</span>
                  <span className="hud-metric-sub">Certificate, Goodies, Memento & Growth</span>
                </div>
              </div>

              <div className="hud-metric-card">
                <div className="hud-metric-icon">
                  <i className="fa-solid fa-bolt"></i>
                </div>
                <div className="hud-metric-content">
                  <span className="hud-metric-val">Rolling Review</span>
                  <span className="hud-metric-sub">Immediate Candidate Evaluation</span>
                </div>
              </div>
            </div>

            {/* Hero CTA Actions */}
            <div className="c-hero-actions">
              <button
                className="btn-primary-lead"
                onClick={() => handleStartApplication()}
              >
                APPLY FOR COHORT <i className="fa-solid fa-arrow-right"></i>
              </button>
              <button
                className="btn-secondary-lead"
                onClick={() => {
                  const el = document.getElementById('open-positions');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                EXPLORE {ROLES_LIST.filter((r) => !r.isClosed).length} OPEN TRACKS <i className="fa-solid fa-arrow-down"></i>
              </button>
            </div>
          </section>

          {/* Program Spotlight Card with Official Banner */}
          <section className="c-program-spotlight">
            <div className="spotlight-banner-media">
              <img
                src="/winter-internship-banner-hd.png"
                alt="AETHRIZ Winter Internship Program 2026-2027 Official HD Banner"
                loading="eager"
                decoding="async"
              />
              <div className="spotlight-media-glare"></div>
            </div>

            <div className="spotlight-badge">
              <i className="fa-solid fa-snowflake"></i> AETHRIZ WINTER INTERNSHIP PROGRAM 2026–2027
            </div>
            <h2 className="spotlight-title">AETHRIZ AI Healthcare and Research Private Limited</h2>
            <div className="spotlight-company">Cohort Duration: 3 Months • 100% Remote Immersion • Creator & Media Ecosystems</div>

            <div className="spotlight-grid">
              <div className="spotlight-left-narrative">
                <p className="spotlight-summary-p">
                  We are inviting passionate creators, video editors, presenters, and podcast moderators to join the{' '}
                  <strong>AETHRIZ Winter Internship Program 2026–2027</strong>. This program is intentionally engineered to provide
                  real creative ownership, direct 1-on-1 collaboration with founding architects, and public brand distribution.
                </p>
                <p className="spotlight-summary-p">
                  Selected interns will translate complex bio-algorithmic concepts into engaging short-form video reels, host digital
                  episodes, and cultivate authentic digital resonance across modern builder communities.
                </p>
                <button
                  className="btn-primary-lead"
                  style={{ marginTop: '14px' }}
                  onClick={() => {
                    const el = document.getElementById('open-positions');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  SELECT YOUR TRACK <i className="fa-solid fa-arrow-down"></i>
                </button>
              </div>

              <div className="spotlight-meta-list">
                <div className="meta-row">
                  <span className="meta-label">Programme</span>
                  <span className="meta-val">Winter Internship 2026–2027</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Cohort Duration</span>
                  <span className="meta-val">3 Months (Full Immersion)</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Delivery Mode</span>
                  <span className="meta-val">100% Remote & Asynchronous</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Approved Recognitions</span>
                  <span className="meta-val">Certificate, Goodies & Crystal Memento</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Mentorship</span>
                  <span className="meta-val">Direct Executive Founder Guidance</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Immersion Pillars / Why Build at AETHRIZ */}
          <section className="c-section" id="why-aethriz">
            <div className="c-section-header">
              <span className="c-section-kicker">// WHY BUILD WITH US</span>
              <h2 className="c-section-title">
                Engineered for High-Velocity <i>Growth.</i>
              </h2>
              <p className="c-section-desc">
                Experience what it feels like to create at the intersection of clinical bio-intelligence, bleeding-edge algorithms,
                and high-engagement digital media storytelling.
              </p>
            </div>

            <div className="c-perks-grid">
              <div className="c-perk-card">
                <div className="perk-icon-wrap">
                  <i className="fa-solid fa-brain"></i>
                </div>
                <h3 className="perk-title">Bio-Algorithmic Frontier</h3>
                <p className="perk-desc">
                  Gain unique, behind-the-scenes exposure to our proprietary health intelligence platform and translate complex AI
                  models into viral, understandable digital media.
                </p>
              </div>

              <div className="c-perk-card">
                <div className="perk-icon-wrap">
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                </div>
                <h3 className="perk-title">Full Creative Autonomy</h3>
                <p className="perk-desc">
                  No rigid corporate bureaucracy. You have the creative freedom to script, direct, host, and publish original content
                  with full creative confidence.
                </p>
              </div>

              <div className="c-perk-card">
                <div className="perk-icon-wrap">
                  <i className="fa-solid fa-laptop-code"></i>
                </div>
                <h3 className="perk-title">100% Remote Immersion</h3>
                <p className="perk-desc">
                  Work asynchronously from anywhere in the world. Our workflows are optimized for creative flow, flexible scheduling,
                  and clear deliverables.
                </p>
              </div>

              <div className="c-perk-card">
                <div className="perk-icon-wrap">
                  <i className="fa-solid fa-user-astronaut"></i>
                </div>
                <h3 className="perk-title">Direct Founder Access</h3>
                <p className="perk-desc">
                  Collaborate directly with our founders and core engineering leadership. Receive personal career feedback and strong
                  executive recommendations.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Official Internship Benefits & Recognition */}
          <section className="c-section" id="internship-benefits">
            <div className="c-section-header">
              <span className="c-section-kicker">// PROGRAMME REWARDS & CREDENTIALS</span>
              <h2 className="c-section-title">
                Internship Benefits & <i>Recognition.</i>
              </h2>
              <p className="c-section-desc">
                Eligible interns who successfully complete the AETHRIZ Winter Internship Program 2026–2027 will receive the following
                official credentials, merchandise, and professional development assets:
              </p>
            </div>

            <div className="benefits-cards-grid">
              {/* Benefit 1: Certificate */}
              <div className="benefit-card">
                <div className="benefit-media-frame">
                  <img
                    src="/internship completion.png"
                    alt="AETHRIZ Internship Completion Certificate"
                    className="benefit-img"
                    loading="lazy"
                  />
                  <span className="benefit-tag-pill">
                    <i className="fa-solid fa-certificate"></i> OFFICIAL CREDENTIAL
                  </span>
                </div>
                <div className="benefit-content">
                  <h3 className="benefit-name">Internship Completion Certificate</h3>
                  <p className="benefit-description">
                    Formal verified completion certificate recognizing your dedication, creative output, and excellence during the
                    AETHRIZ Winter Internship Program 2026–2027.
                  </p>
                </div>
              </div>

              {/* Benefit 2: Goodies */}
              <div className="benefit-card">
                <div className="benefit-media-frame">
                  <img
                    src="/goodies.png"
                    alt="AETHRIZ Branded Goodies Kit"
                    className="benefit-img"
                    loading="lazy"
                  />
                  <span className="benefit-tag-pill">
                    <i className="fa-solid fa-box-open"></i> MERCHANDISE PACKAGE
                  </span>
                </div>
                <div className="benefit-content">
                  <h3 className="benefit-name">AETHRIZ Branded Goodies</h3>
                  <p className="benefit-description">
                    Exclusive customized AETHRIZ branded package including premium wearable black T-shirt, ceramic coffee mug,
                    hardcover notebook/diary, and executive pen.
                  </p>
                </div>
              </div>

              {/* Benefit 3: Memento */}
              <div className="benefit-card">
                <div className="benefit-media-frame">
                  <img
                    src="/memonto.png"
                    alt="AETHRIZ Memento Plaque and Letter of Recommendation"
                    className="benefit-img"
                    loading="lazy"
                  />
                  <span className="benefit-tag-pill">
                    <i className="fa-solid fa-trophy"></i> HONOR & RECOGNITION
                  </span>
                </div>
                <div className="benefit-content">
                  <h3 className="benefit-name">AETHRIZ Memento</h3>
                  <p className="benefit-description">
                    Prestigious crystal acrylic keepsake award alongside a formally signed Letter of Recommendation honoring your
                    valuable contributions and performance.
                  </p>
                </div>
              </div>

              {/* Benefit 4: Practical Experience */}
              <div className="benefit-card benefit-card-growth">
                <div className="benefit-growth-banner">
                  <div className="growth-icon-circle">
                    <i className="fa-solid fa-chart-line"></i>
                  </div>
                  <span className="benefit-tag-pill">
                    <i className="fa-solid fa-bolt"></i> CAREER ACCELERATION
                  </span>
                </div>
                <div className="benefit-content">
                  <h3 className="benefit-name">Practical Experience & Development</h3>
                  <p className="benefit-description">
                    Real hands-on experience producing public campaigns, growing digital audience resonance, and direct 1-on-1 mentorship
                    with technology founders in healthcare AI.
                  </p>
                </div>
              </div>
            </div>

            {/* Compliance Guarantee */}
            <div className="benefits-disclaimer-box">
              <i className="fa-solid fa-circle-check disclaimer-icon"></i>
              <div className="disclaimer-text">
                <strong>Approved Programme Guarantee:</strong> The rewards and recognitions above are formally approved for interns
                who complete their defined responsibilities and deliverables. No unauthorized rewards or benefits are promised.
              </div>
            </div>
          </section>

          {/* Section: Open Positions Board */}
          <section className="c-section" id="open-positions">
            <div className="c-section-header">
              <span className="c-section-kicker">// COHORT TRACKS (WINTER 2026–2027)</span>
              <h2 className="c-section-title">
                Available Cohort <i>Opportunities.</i>
              </h2>
              <p className="c-section-desc">
                Review our open tracks and choose the role that aligns with your creative expertise and passion.
              </p>
            </div>

            {/* Search & Filters Toolbar */}
            <div className="job-board-toolbar">
              <div className="job-search-box">
                <i className="fa-solid fa-magnifying-glass search-icon"></i>
                <input
                  type="text"
                  className="job-search-input"
                  placeholder="Search tracks by keyword or skill (e.g. Creator, Reels, Podcast, Presenter)..."
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
                  All Active Tracks ({ROLES_LIST.length})
                </button>
                <button
                  className={`filter-btn ${activeCategory === 'creator' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('creator')}
                >
                  <i className="fa-solid fa-camera-retro" style={{ marginRight: '6px' }}></i> Creator & Influencer
                </button>
                <button
                  className={`filter-btn ${activeCategory === 'media' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('media')}
                >
                  <i className="fa-solid fa-microphone-lines" style={{ marginRight: '6px' }}></i> Podcast & Media
                </button>
              </div>
            </div>

            {/* Roles List */}
            <div className="job-cards-list">
              {filteredJobs.length === 0 ? (
                <div className="job-empty-state">
                  <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '2rem', color: '#94A3B8', marginBottom: '12px' }}></i>
                  <h3 style={{ color: '#07090F', fontSize: '1.2rem', marginBottom: '6px' }}>No matching tracks found</h3>
                  <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '16px' }}>
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
                          <div className="job-header-pills">
                            <span className="job-dept-pill">
                              <i className={role.icon} style={{ marginRight: '5px' }}></i>
                              {role.dept}
                            </span>
                            <span className="job-open-pill">
                              <span className="pulse-dot-green"></span> APPLICATIONS OPEN
                            </span>
                          </div>
                          <h3 className="job-name-title">{role.title}</h3>
                          <div className="job-metadata-chips">
                            <span>
                              <i className="fa-solid fa-location-dot" style={{ color: '#E81A2D' }}></i> {role.location}
                            </span>
                            <span>•</span>
                            <span>
                              <i className="fa-regular fa-clock" style={{ color: '#E81A2D' }}></i> {role.duration}
                            </span>
                            <span>•</span>
                            <span>Cohort: Winter 2026–2027</span>
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
                            onClick={() => handleStartApplication(role.title, role.isClosed)}
                          >
                            Apply Now <i className="fa-solid fa-arrow-right"></i>
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
                                <li key={idx}>
                                  <span className="bullet-point-arrow">▹</span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {role.skills && role.skills.length > 0 && (
                            <div className="job-acc-skills">
                              <span className="job-acc-heading">Target Competencies:</span>
                              <div className="job-skills-tags-wrap">
                                {role.skills.map((sk) => (
                                  <span key={sk} className="job-skill-tag">
                                    <i className="fa-solid fa-check" style={{ color: '#E81A2D', fontSize: '0.65rem' }}></i> {sk}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="job-acc-cta-bar">
                            <button
                              type="button"
                              className="btn-primary-lead"
                              style={{ padding: '10px 24px', fontSize: '0.8rem' }}
                              onClick={() => handleStartApplication(role.title, role.isClosed)}
                            >
                              START APPLICATION FOR THIS TRACK <i className="fa-solid fa-arrow-right"></i>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* Section: Candidate FAQ Accordion */}
          <section className="c-section" id="careers-faq">
            <div className="c-section-header">
              <span className="c-section-kicker">// APPLICATION INTELLIGENCE</span>
              <h2 className="c-section-title">
                Frequently Asked <i>Questions.</i>
              </h2>
              <p className="c-section-desc">
                Everything you need to know about the evaluation criteria, deliverables, and rewards fulfillment.
              </p>
            </div>

            <div className="c-faqs-grid">
              {FAQS_LIST.map((faq, idx) => {
                const isOpen = expandedFaqId === idx;
                return (
                  <div key={idx} className={`faq-card-item ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => setExpandedFaqId(isOpen ? null : idx)}
                    >
                      <span className="faq-q-text">{faq.q}</span>
                      <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'} faq-toggle-icon`}></i>
                    </button>
                    {isOpen && (
                      <div className="faq-answer-block">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section: Final Call to Action Card */}
          <section className="c-prefooter-cta">
            <div className="cta-ambient-glow"></div>
            <div className="cta-content-wrapper">
              <span className="cta-kicker">// READY TO MAKE AN IMPACT?</span>
              <h2 className="cta-title">
                Join the Winter 2026–2027 <i>Cohort Today.</i>
              </h2>
              <p className="cta-desc">
                Applications are processed on a rolling basis. Step into an authentic creator or podcast presenter role
                and build with the founding team of AETHRIZ AI.
              </p>
              <div className="cta-button-row">
                <button
                  className="btn-primary-lead"
                  onClick={() => handleStartApplication()}
                >
                  START ONLINE APPLICATION <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Panel 2: Multi-Step Application Experience (slides in from right) */}
      <div className={`careers-app-container ${viewMode === 'apply' ? 'active' : ''} ${viewMode === 'closing' ? 'closing' : ''}`}>
        {(viewMode === 'apply' || viewMode === 'closing') && (
          <CareersApplicationExperience
            role={selectedRole}
            rolesList={ROLES_LIST}
            onSelectRole={setSelectedRole}
            onExit={handleReturnToOverview}
          />
        )}
      </div>
    </div>
  );
}
