import React, { useState } from 'react';
import '../styles/careers.css';
import '../styles/careers-application.css';
import CareersApplicationExperience from './careers/CareersApplicationExperience';

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

export default function Careers({ onBack }) {
  // Page mode: 'overview' (Corporate Careers Landing) | 'apply' (Cinematic Application Experience)
  const [viewMode, setViewMode] = useState('overview');

  // Filter category in overview
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRoleId, setExpandedRoleId] = useState(null);

  // Selected role for the application experience
  const [selectedRole, setSelectedRole] = useState('AI/ML Development');

  // Launch Cinematic Application Experience
  const handleStartApplication = (roleTitle = '') => {
    const target = roleTitle || 'AI/ML Development';
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
      {/* Top HUD Nav */}
      <div className="c-top-bar">
        <div className="c-status-chip" title="Applications currently open">
          <span className="c-pulse-wrapper">
            <span className="c-pulse-ping"></span>
            <span className="c-pulse"></span>
          </span>
          <span className="c-status-text">
            <strong className="c-status-live-tag">APPLICATIONS OPEN</strong>
            <span className="c-status-dot-sep">•</span>
            <span>WINTER COHORT 2026-27</span>
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="c-hero">
        <span className="c-hero-kicker">// WINTER COHORT 2026-27</span>
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
            src="/20260925_071353.png"
            alt="AETHRIZ Winter Internship Programme 2026-27 Official HD Banner"
            loading="eager"
            decoding="async"
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
              onClick={() => {
                const el = document.getElementById('open-positions');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              VIEW OPEN ROLES <i className="fa-solid fa-arrow-down"></i>
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
  </div>

      {/* Panel 2: Cinematic Application Experience (slides in from right) */}
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
