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
    location: 'Remote',
    duration: '3 Months',
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
    location: 'Remote',
    duration: '3 Months',
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

export default function Careers({ onBack }) {
  // Page mode: 'overview' (Corporate Careers Landing) | 'apply' (Cinematic Application Experience)
  const [viewMode, setViewMode] = useState('overview');

  // Filter category in overview
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRoleId, setExpandedRoleId] = useState(null);

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
          {/* Hero Section */}
          <section className="c-hero">
            <div className="c-status-chip" title="Applications currently open" style={{ marginBottom: '20px' }}>
              <span className="c-pulse-wrapper">
                <span className="c-pulse-ping"></span>
                <span className="c-pulse"></span>
              </span>
              <span className="c-status-text">
                <strong className="c-status-live-tag">APPLICATIONS OPEN</strong>
                <span className="c-status-dot-sep">•</span>
                <span>AETHRIZ WINTER INTERNSHIP PROGRAM 2026–2027</span>
              </span>
            </div>
            <h1 className="c-hero-title">
              Build the Future of <br />
              <i>Bio-Algorithmic Health.</i>
            </h1>
            <p className="c-hero-subtitle">
              We are assembling dynamic digital creators, storytellers, and podcast presenters to lead our official Winter
              Internship Program 2026–2027. Amplify breakthrough health intelligence through real creative ownership.
            </p>
            <div className="c-hero-actions">
              <button
                className="btn-secondary-lead"
                onClick={() => {
                  const el = document.getElementById('open-positions');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                VIEW {ROLES_LIST.filter((r) => !r.isClosed).length} OPEN TRACKS <i className="fa-solid fa-list-check"></i>
              </button>
              <button
                className="btn-primary-lead"
                onClick={() => handleStartApplication()}
              >
                APPLY DIRECTLY <i className="fa-solid fa-arrow-right"></i>
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
            </div>

            <div className="spotlight-badge">
              <i className="fa-solid fa-snowflake"></i> AETHRIZ WINTER INTERNSHIP PROGRAM 2026–2027
            </div>
            <h2 className="spotlight-title">AETHRIZ AI Healthcare and Research Private Limited</h2>
            <div className="spotlight-company">Cohort Duration: 3 Months • 100% Remote Immersion</div>

            <div className="spotlight-grid">
              <div>
                <p className="spotlight-summary-p">
                  We are inviting applications for the <strong>AETHRIZ Winter Internship Program 2026–2027</strong>, a
                  3-month remote immersion designed for emerging creators, presenters, and digital media builders.
                </p>
                <p className="spotlight-summary-p">
                  Selected interns will spearhead authentic storytelling, host podcasts, and craft viral resonance across
                  social media platforms, directly collaborating with founding architects on real deliverables.
                </p>
                <button
                  className="btn-primary-lead"
                  style={{ marginTop: '12px' }}
                  onClick={() => {
                    const el = document.getElementById('open-positions');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  EXPLORE ELIGIBLE TRACKS <i className="fa-solid fa-arrow-down"></i>
                </button>
              </div>

              <div className="spotlight-meta-list">
                <div className="meta-row">
                  <span className="meta-label">Programme</span>
                  <span className="meta-val">Winter Internship 2026–2027</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Duration</span>
                  <span className="meta-val">3 Months (Full Immersion)</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Work Mode</span>
                  <span className="meta-val">100% Remote & Asynchronous</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Approved Rewards</span>
                  <span className="meta-val">Certificate, Goodies & Memento</span>
                </div>
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
              <p style={{ color: '#94A3B8', fontSize: '1rem', marginTop: '10px', maxWidth: '750px' }}>
                Eligible interns who successfully complete the AETHRIZ Winter Internship Program 2026–2027 will receive the following
                official credentials, awards, and professional development assets:
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
                    Formal verified completion certificate recognizing your dedication, creative excellence, and consistent
                    performance during the AETHRIZ Winter Internship Program 2026–2027.
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
                    <i className="fa-solid fa-box-open"></i> MERCHANDISE KIT
                  </span>
                </div>
                <div className="benefit-content">
                  <h3 className="benefit-name">AETHRIZ Branded Goodies</h3>
                  <p className="benefit-description">
                    Exclusive customized AETHRIZ branded package including premium wearable black t-shirt, signature coffee mug,
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
                    <i className="fa-solid fa-trophy"></i> HONOR & AWARD
                  </span>
                </div>
                <div className="benefit-content">
                  <h3 className="benefit-name">AETHRIZ Memento</h3>
                  <p className="benefit-description">
                    Prestigious crystal acrylic keepsake award alongside a signed Letter of Recommendation honoring valuable
                    organizational contributions and high impact.
                  </p>
                </div>
              </div>

              {/* Benefit 4: Practical Experience */}
              <div className="benefit-card benefit-card-growth">
                <div className="benefit-growth-banner">
                  <div className="growth-icon-circle">
                    <i className="fa-solid fa-seedling"></i>
                  </div>
                  <span className="benefit-tag-pill">
                    <i className="fa-solid fa-chart-line"></i> CAREER ACCELERATION
                  </span>
                </div>
                <div className="benefit-content">
                  <h3 className="benefit-name">Practical Experience & Professional Development</h3>
                  <p className="benefit-description">
                    Real hands-on experience producing public campaigns, growing digital communities, and direct 1-on-1 mentorship
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



          {/* Open Positions Board */}
          <section className="c-section" id="open-positions">
            <div className="c-section-header">
              <span className="c-section-kicker">// COHORT TRACKS (SECTION C)</span>
              <h2 className="c-section-title">
                Open Tracks <i>(Winter 2026–2027)</i>
              </h2>
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
                  Creator & Influencer
                </button>
                <button
                  className={`filter-btn ${activeCategory === 'media' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('media')}
                >
                  Podcast & Media
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
                          <div className="job-header-pills">
                            <span className="job-dept-pill">{role.dept}</span>
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
                            <span>Winter Cohort 2026–2027</span>
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
