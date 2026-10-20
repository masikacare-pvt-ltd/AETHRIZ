import React, { useState, useEffect } from 'react';
import '../styles/careers.css';
import '../styles/careers-application.css';
import CareersApplicationExperience from './careers/CareersApplicationExperience';

const ROLES_LIST = [
  {
    id: 'social-media-influencer',
    domainCode: 'A',
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
      'Instagram Reels',
      'YouTube Shorts',
      'On-Camera Presentation',
      'Creative Storytelling',
      'Community Engagement',
      'Hook Formulation'
    ],
    responsibilities: [
      'Create engaging Instagram Reels and YouTube Shorts highlighting AETHRIZ AI innovations.',
      'Develop original video concepts, compelling hooks, and storytelling formats.',
      'Appear on camera confidently to communicate ideas and healthcare AI topics.',
      'Create awareness-driven content around AI, healthcare, and relevant industry themes.',
      'Participate actively in online campaigns and creator collaborations.'
    ],
    isClosed: false,
    status: 'open'
  },
  {
    id: 'podcast-host',
    domainCode: 'D',
    title: 'Podcast Host & Digital Presenter',
    category: 'podcast',
    dept: 'Media & Broadcast Communications',
    location: '100% Remote',
    duration: '3 Months',
    cohort: 'Winter 2026–2027',
    badge: 'Podcast & Media Track',
    icon: 'fa-solid fa-microphone-lines',
    overview:
      'Anchor official AETHRIZ podcasts, live digital broadcast shows, and guest presenter series. Formulate compelling interview outlines, converse with researchers and guest creators, and communicate our health-intelligence vision with charisma, poise, and broadcast clarity.',
    skills: [
      'Podcast Hosting',
      'Digital Presenting',
      'Public Speaking',
      'Interview Moderation',
      'Script & Topic Research',
      'Audio & Video Broadcast'
    ],
    responsibilities: [
      'Host or co-host official AETHRIZ podcasts and live interactive online conversations.',
      'Conduct insightful interviews with guests, researchers, and subject-matter experts.',
      'Present topics with poise, articulation, and charisma across video and audio formats.',
      'Research discussion topics thoroughly and prepare thought-provoking interview questions.',
      'Support podcast clips, promotional soundbites, and multi-platform campaign distribution.'
    ],
    isClosed: false,
    status: 'open'
  }
];

const FAQS_LIST = [
  {
    q: 'Who is eligible to apply for this Winter Internship Program?',
    a: 'Students (from any year of study), recent graduates, working professionals, freelancers, and independent digital creators or podcast hosts with a passion for creative storytelling, social media, or digital presenting are eligible to apply. Prior professional experience is not mandatory if you can demonstrate creativity through sample work.'
  },
  {
    q: 'What is the required weekly commitment and work model?',
    a: 'The internship is 100% remote and asynchronous. You collaborate through structured weekly deliverables, content sprints, and founder feedback syncs without rigid 9-to-5 requirements, allowing you to balance academic or personal commitments.'
  },
  {
    q: 'What rewards and recognitions are provided upon completion?',
    a: 'Every eligible intern who completes defined program deliverables will receive an official verified AETHRIZ AI Internship Completion Certificate, a customized AETHRIZ branded merchandise goodies kit (t-shirt, ceramic mug, notebook, executive pen), a crystal acrylic keepsake memento, and professional mentorship. Additionally, the Top 3 Creators receive special rankings, signed Letters of Recommendation (LOR), and priority consideration for permanent employment.'
  },
  {
    q: 'How does the selection process work?',
    a: 'Applications are reviewed on a rolling basis. Our recruitment team evaluates your creative samples, social profiles, and motivation note. Shortlisted candidates are invited for a brief virtual interaction with the founding team before cohort confirmation.'
  },
  {
    q: 'Are permanent employment opportunities offered after the internship?',
    a: 'Yes. AETHRIZ AI actively identifies outstanding creators, storytellers, and presenters for potential long-term, permanent roles. Participants demonstrating exceptional reliability, creativity, and brand resonance will receive priority consideration.'
  }
];

export default function Careers({ onBack }) {
  const [viewMode, setViewMode] = useState('overview'); // 'overview' | 'apply' | 'closing'
  const [expandedRoleId, setExpandedRoleId] = useState(null);
  const [expandedFaqId, setExpandedFaqId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Lock mobile body scroll when application modal is open
  useEffect(() => {
    if (viewMode === 'apply') {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [viewMode]);

  const defaultOpenRole = ROLES_LIST.find((r) => !r.isClosed)?.title || ROLES_LIST[0].title;
  const [selectedRole, setSelectedRole] = useState(defaultOpenRole);

  const handleStartApplication = (roleTitle = '', isClosed = false) => {
    if (isClosed) return;
    const target = roleTitle || defaultOpenRole;
    setSelectedRole(target);
    setViewMode('apply');
  };

  const scrollToTracks = () => {
    const el = document.getElementById('open-positions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleReturnToOverview = () => {
    setViewMode('closing');
    setTimeout(() => {
      setViewMode('overview');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 650);
  };

  return (
    <div className="careers-stage-viewport" id="careers-top">
      {/* Panel 1: Careers Overview Container */}
      <div className={`careers-overview-container ${viewMode === 'apply' ? 'slide-out-left' : ''}`}>
        <div className="careers-main-viewport">
          {/* Hero Section */}
          <section className="c-hero">
            <span className="c-hero-kicker">// AETHRIZ AI • WINTER INTERNSHIP PROGRAM 2026–2027</span>
            <h1 className="c-hero-title">
              Create. Influence. Inspire. <br />
              <i>Build with AI.</i>
            </h1>
            <p className="c-hero-subtitle">
              AETHRIZ AI is launching its official <strong>Winter Internship Program 2026–2027</strong> to discover creative minds,
              emerging influencers, storytellers, and passionate content creators who will shape our global brand presence. Turn ideas
              into engaging media, communicate breakthrough health AI, and earn verified executive credentials.
            </p>
            <p className="c-hero-accent-quote">
              This is more than an internship. It is an opportunity to create, grow, get recognised, and potentially join our team permanently.
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
                  <i className="fa-regular fa-clock"></i>
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
                  <span className="hud-metric-sub">Certificate, Goodies, Memento & LOR</span>
                </div>
              </div>

              <div className="hud-metric-card">
                <div className="hud-metric-icon">
                  <i className="fa-solid fa-bolt"></i>
                </div>
                <div className="hud-metric-content">
                  <span className="hud-metric-val">Top 3 Creators</span>
                  <span className="hud-metric-sub">Honors & Permanent Role Priority</span>
                </div>
              </div>
            </div>

            {/* Hero CTA Actions */}
            <div className="c-hero-actions">
              <button
                type="button"
                className="btn-primary-lead"
                onClick={scrollToTracks}
              >
                START APPLICATION <i className="fa-solid fa-arrow-down"></i>
              </button>
              <button
                type="button"
                className="btn-secondary-lead"
                onClick={scrollToTracks}
              >
                VIEW 2 OPEN TRACKS <i className="fa-solid fa-arrow-down"></i>
              </button>
            </div>
          </section>

          {/* Program Spotlight Card with Official HD Banner */}
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
              <i className="fa-solid fa-snowflake"></i> AETHRIZ AI WINTER INTERNSHIP PROGRAM 2026–2027
            </div>
            <h2 className="spotlight-title">AETHRIZ AI Healthcare and Research Private Limited</h2>
            <div className="spotlight-company">Cohort Duration: 3 Months • 100% Remote Immersion • Creator & Media Ecosystems</div>

            <div className="spotlight-grid">
              <div className="spotlight-left-narrative">
                <p className="spotlight-summary-p">
                  Selected candidates will turn ideas into engaging content, communicate effectively, and bring fresh perspectives
                  to the world of AI and healthcare. You will experiment with creative storytelling, produce compelling social media campaigns,
                  host conversations, and amplify the growing AETHRIZ AI community.
                </p>
                <p className="spotlight-summary-p">
                  This program provides direct executive collaboration, authentic public distribution across YouTube, Instagram, LinkedIn,
                  and X, and tangible physical credentials upon completion.
                </p>
                <button
                  type="button"
                  className="btn-primary-lead"
                  style={{ marginTop: '14px' }}
                  onClick={scrollToTracks}
                >
                  START APPLICATION <i className="fa-solid fa-arrow-down"></i>
                </button>
              </div>

              <div className="spotlight-meta-list">
                <div className="meta-row">
                  <span className="meta-label">Program Term</span>
                  <span className="meta-val">Winter Internship 2026–2027</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Work Model</span>
                  <span className="meta-val">100% Remote & Asynchronous</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Cohort Duration</span>
                  <span className="meta-val">3 Months Full Immersion</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Universal Rewards</span>
                  <span className="meta-val">Certificate, Goodies Kit & Memento</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Top 3 Creators</span>
                  <span className="meta-val">Special Honor, LOR & Permanent Roles</span>
                </div>
              </div>
            </div>
          </section>

          {/* Available Cohort Tracks (The 2 Roles) */}
          <section className="c-section" id="open-positions">
            <div className="c-section-header">
              <span className="c-section-kicker">// COHORT TRACKS</span>
              <h2 className="c-section-title">
                Available Internship <i>Tracks.</i>
              </h2>
              <p className="c-section-desc">
                Review our open tracks and choose the role that best matches your creative expertise and passion.
              </p>
            </div>

            {/* Roles List (Directly 2 Active Cohort Tracks) */}
            <div className="job-cards-list">
              {ROLES_LIST.map((role) => {
                const isExpanded = expandedRoleId === role.id;
                  return (
                    <div key={role.id} className={`job-row-item ${isExpanded ? 'expanded' : ''}`}>
                      <div className="job-row-main">
                        <div className="job-left-info">
                          <div className="job-header-pills">
                            <span className="job-dept-pill">
                              <i className={role.icon} style={{ marginRight: '6px' }}></i>
                              {role.badge}
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
                            type="button"
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
                              {role.responsibilities &&
                                role.responsibilities.map((resp, idx) => (
                                  <li key={idx}>
                                    <span className="bullet-point-arrow">▹</span>
                                    <span>{resp}</span>
                                  </li>
                                ))}
                            </ul>
                          </div>

                          {role.skills && role.skills.length > 0 && (
                            <div className="job-acc-skills">
                              <span className="job-acc-heading">Target Competencies & Formats:</span>
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
                              style={{ padding: '10px 24px', fontSize: '0.82rem' }}
                              onClick={() => handleStartApplication(role.title, role.isClosed)}
                            >
                              START APPLICATION FOR {role.title.toUpperCase()} <i className="fa-solid fa-arrow-right"></i>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </section>

          {/* Section 6: Rewards, Recognitions & Special Podium for Top 3 */}
          <section className="c-section" id="internship-benefits">
            <div className="c-section-header">
              <span className="c-section-kicker">// PROGRAMME REWARDS & RECOGNITION</span>
              <h2 className="c-section-title">
                Internship Benefits & <i>Special Recognition.</i>
              </h2>
              <p className="c-section-desc">
                Every eligible intern who completes the program receives verified credentials and merchandise. In addition, the top
                three creators earn executive honors, signed Letters of Recommendation, and priority permanent role consideration.
              </p>
            </div>

            {/* Universal Benefits (4 Cards) */}
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
                    AETHRIZ AI Winter Internship Program 2026–2027.
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
                  <h3 className="benefit-name">Premium AETHRIZ AI Goodies Kit</h3>
                  <p className="benefit-description">
                    Exclusive customized merchandise package including wearable black AETHRIZ T-shirt, ceramic mug, hardcover
                    executive notebook, and premium metal pen safely shipped to your doorstep.
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
                  <h3 className="benefit-name">Crystal Keepsake Memento</h3>
                  <p className="benefit-description">
                    Prestigious laser-engraved crystal acrylic keepsake award commemorating your contributions to building the
                    AETHRIZ AI brand ecosystem.
                  </p>
                </div>
              </div>

              {/* Benefit 4: Practical Experience & Growth */}
              <div className="benefit-card benefit-card-growth">
                <div className="benefit-media-frame benefit-growth-frame">
                  <div className="growth-visual-matrix">
                    <div className="matrix-radial-flare"></div>
                    <div className="growth-hud-indicator">
                      <i className="fa-solid fa-arrow-trend-up"></i>
                      <span>CREATOR ACCELERATION</span>
                    </div>
                    <div className="growth-metric-trio">
                      <div className="trio-item">
                        <span className="trio-val">100%</span>
                        <span className="trio-lbl">Remote</span>
                      </div>
                      <div className="trio-item">
                        <span className="trio-val">3 Mo</span>
                        <span className="trio-lbl">Immersion</span>
                      </div>
                      <div className="trio-item">
                        <span className="trio-val">1-on-1</span>
                        <span className="trio-lbl">Founder Guidance</span>
                      </div>
                    </div>
                  </div>
                  <span className="benefit-tag-pill">
                    <i className="fa-solid fa-bolt"></i> CAREER IMPACT
                  </span>
                </div>
                <div className="benefit-content">
                  <h3 className="benefit-name">Practical Experience & Mentorship</h3>
                  <p className="benefit-description">
                    Real hands-on experience producing public campaigns, growing digital audience resonance, receiving constructive
                    feedback, and collaborating directly with founders in AI healthcare.
                  </p>
                </div>
              </div>
            </div>

            {/* Special Recognition for Top 3 Creators (Podium Showcase) */}
            <div className="c-podium-showcase">
              <div className="podium-header-center">
                <span className="podium-kicker">// EXCELLENCE RECOGNITION</span>
                <h3 className="podium-title">Special Honors for the Top Three Creators</h3>
                <p className="podium-subtitle">
                  The three highest-performing eligible participants will receive special distinction, formal signed Letters of Recommendation,
                  and priority consideration for permanent employment.
                </p>
              </div>

              <div className="podium-grid">
                {/* 2nd Place */}
                <div className="podium-tier tier-silver">
                  <div className="tier-rank-badge">
                    <i className="fa-solid fa-medal"></i> 2ND PLACE
                  </div>
                  <h4 className="tier-honor-name">Outstanding Creator / Influencer</h4>
                  <ul className="tier-perks-list">
                    <li>Official Special Distinction from AETHRIZ AI</li>
                    <li>Formally signed Letter of Recommendation (LOR)</li>
                    <li>Priority consideration for permanent roles</li>
                  </ul>
                </div>

                {/* 1st Place (Champion) */}
                <div className="podium-tier tier-gold champion">
                  <div className="tier-crown-tag">
                    <i className="fa-solid fa-crown"></i> TOP HONORS
                  </div>
                  <div className="tier-rank-badge gold-badge">
                    <i className="fa-solid fa-trophy"></i> 1ST PLACE
                  </div>
                  <h4 className="tier-honor-name">Best Creator / Influencer</h4>
                  <ul className="tier-perks-list">
                    <li>Top Creator Trophy & Formal Distinction Award</li>
                    <li>Executive signed Letter of Recommendation (LOR)</li>
                    <li>Top priority consideration for permanent employment</li>
                    <li>Featured spotlight across official AETHRIZ channels</li>
                  </ul>
                </div>

                {/* 3rd Place */}
                <div className="podium-tier tier-bronze">
                  <div className="tier-rank-badge">
                    <i className="fa-solid fa-award"></i> 3RD PLACE
                  </div>
                  <h4 className="tier-honor-name">Emerging Creator / Influencer</h4>
                  <ul className="tier-perks-list">
                    <li>Official Special Distinction from AETHRIZ AI</li>
                    <li>Formally signed Letter of Recommendation (LOR)</li>
                    <li>Priority consideration for permanent roles</li>
                  </ul>
                </div>
              </div>
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
                Everything you need to know about eligibility, remote work, weekly commitment, and rewards fulfillment.
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

          {/* Final Call for Applications */}
          <section className="c-prefooter-cta">
            <div className="cta-ambient-glow"></div>
            <div className="cta-content-wrapper">
              <span className="cta-kicker">// FINAL CALL FOR APPLICATIONS</span>
              <h2 className="cta-title">
                Your Creativity Deserves a <i>Bigger Platform.</i>
              </h2>
              <p className="cta-desc">
                If you have ideas worth sharing, stories worth telling, and the passion to create content that makes an impact,
                the AETHRIZ AI Winter Internship Program 2026–2027 is your opportunity to begin.
              </p>
              <div className="cta-deadline-pill">
                <i className="fa-solid fa-globe" style={{ marginRight: '6px' }}></i>
                100% REMOTE • ASYNCHRONOUS COHORT IMMERSION
              </div>
              <div className="cta-button-row">
                <button
                  type="button"
                  className="btn-primary-lead"
                  onClick={scrollToTracks}
                >
                  START APPLICATION <i className="fa-solid fa-arrow-down"></i>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Panel 2: Multi-Step Application Experience (Slides in from Right) */}
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
