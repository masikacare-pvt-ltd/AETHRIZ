/**
 * AETHRIZ Careers Data Repository
 * Structured data model for all open positions, departments, filter options, and culture pillars.
 */

export const DEPARTMENTS = [
  'All Departments',
  'AI & Research',
  'Core Engineering',
  'Frontend Architecture',
  'Distributed Systems',
  'Cloud & DevOps',
  'Design Systems',
  'Medical Intelligence',
  'Growth & Ecosystems'
];

export const LOCATIONS = [
  'All Locations',
  'Remote (Global)',
  'Remote (India / US)',
  'Hybrid (Bengaluru / HQ)'
];

export const EXPERIENCE_LEVELS = [
  'All Levels',
  'Student / Intern',
  'Entry Level (0-2 yrs)',
  'Mid-Level (2-5 yrs)',
  'Senior / Lead (5+ yrs)'
];

export const EMPLOYMENT_TYPES = [
  'All Types',
  'Full-time',
  'Internship',
  'Fellowship',
  'Contract'
];

export const CULTURE_PILLARS = [
  {
    icon: 'fa-solid fa-code-merge',
    tag: 'PRODUCTION FIRST',
    title: 'Real Production Impact',
    description: 'No synthetic sandboxes. From day one, your algorithms, architecture, and code will directly touch live healthcare telemetry and user biosystems.'
  },
  {
    icon: 'fa-solid fa-brain',
    tag: 'RESEARCH VELOCITY',
    title: 'Architect-Level Mentorship',
    description: 'Collaborate shoulder-to-shoulder with our principal system architects and bio-computational scientists in high-density peer review environments.'
  },
  {
    icon: 'fa-solid fa-bolt',
    tag: 'AUTONOMY & CLARITY',
    title: 'Asynchronous Velocity',
    description: 'We prioritize deep work over endless status calls. Choose your peak creative hours and operate with uncompromising ownership and freedom.'
  },
  {
    icon: 'fa-solid fa-award',
    tag: 'RECOGNITION',
    title: 'Equity, Ownership & Pathways',
    description: 'Every contributor is recognized. Interns receive certified credentials and direct conversion pathways; full-time builders participate in equity pools.'
  }
];

export const OPEN_ROLES = [
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    department: 'AI & Research',
    category: 'ai-research',
    location: 'Remote (Global)',
    employmentType: 'Full-time',
    experienceLevel: 'Senior / Lead (5+ yrs)',
    badge: 'Core Intelligence',
    compensation: '$130k – $180k + Equity / Tier-1 Equivalent',
    shortDescription: 'Architect and train state-of-the-art predictive transformer models and neural signal processing pipelines for continuous biomarker intelligence.',
    aboutRole: 'As an AI Engineer at AETHRIZ, you will pioneer the mathematical and computational substrate powering our bio-algorithmic engine. You will design, train, and deploy foundational health intelligence models that translate noisy multimodal biosignals (continuous glucose, HRV, genomic telemetry, metabolic assays) into deterministic lifestyle and longevity interventions.',
    responsibilities: [
      'Design, train, and optimize deep neural architectures for multimodal bio-signal time series and real-time biometric telemetry.',
      'Construct high-throughput training and continuous distillation pipelines leveraging PyTorch, CUDA, and distributed GPU clusters.',
      'Optimize edge and cloud model inference to achieve sub-50ms latency for predictive intervention scoring.',
      'Collaborate with medical researchers to encode clinical guardrails and metabolic mechanistic constraints into deep neural loss functions.',
      'Publish novel findings in internal technical specifications and top-tier scientific/computational venues (NeurIPS, ICML, Nature Digital Medicine).'
    ],
    requirements: [
      'B.S., M.S., or Ph.D. in Computer Science, Artificial Intelligence, Computational Biology, or related quantitative field.',
      '4+ years of hands-on experience training, fine-tuning, and productionizing deep learning models in PyTorch or JAX.',
      'Demonstrated expertise in Transformer architectures, temporal convolutional networks (TCNs), or state-space models (Mamba/S4).',
      'Strong proficiency in Python, modern C++ / CUDA primitives, and distributed model parallelism (DeepSpeed, FSDP).',
      'Track record of deploying AI systems at scale into low-latency production environments.'
    ],
    preferred: [
      'Experience working with biometric, ECG, EEG, PPG, or continuous glucose monitor (CGM) time-series datasets.',
      'Familiarity with differential privacy, federated learning, and HIPAA-compliant data topologies.',
      'Contributions to open-source ML libraries or high-impact publications.'
    ],
    skills: ['PyTorch', 'Python', 'CUDA', 'Time Series Transformers', 'MLOps', 'Distributed Training', 'TensorRT'],
    perks: [
      'Global remote freedom with home lab / workstation budget',
      'Comprehensive medical, dental, and longevity healthcare benefits',
      'Generous equity participation in core platform genesis',
      'Unlimited access to GPU compute clusters for research exploration'
    ]
  },
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    department: 'Core Engineering',
    category: 'engineering',
    location: 'Remote (Global)',
    employmentType: 'Full-time',
    experienceLevel: 'Mid-Level (2-5 yrs)',
    badge: 'Platform Core',
    compensation: '$100k – $145k + Equity / Tier-1 Equivalent',
    shortDescription: 'Build ultra-resilient distributed services, real-time streaming event buses, and foundational microservices for health telemetry.',
    aboutRole: 'AETHRIZ is building a zero-downtime, sub-second bio-computational platform that scales across millions of biometric data streams. We are seeking a Software Engineer with deep systems empathy, exceptional coding standards, and an obsession with clean API contracts to engineer our core platform services.',
    responsibilities: [
      'Develop distributed microservices using Go, Rust, or modern Node.js/TypeScript that handle millions of real-time biometric events.',
      'Architect robust data streaming pipelines with Apache Kafka, Redpanda, and PostgreSQL/ClickHouse.',
      'Implement zero-trust security topologies, role-based access control (RBAC), and encryption for sensitive user health records.',
      'Write comprehensive automated unit, integration, and stress tests to maintain 99.99% service availability.',
      'Participate in on-call rotation and conduct root-cause post-mortems for architectural improvements.'
    ],
    requirements: [
      '3+ years of professional backend software engineering experience building scalable cloud-native architectures.',
      'Strong mastery of at least one backend language (Go, Rust, TypeScript, or Python) with strong object-oriented and concurrent paradigms.',
      'Deep knowledge of relational databases (PostgreSQL) and event brokers (Kafka, RabbitMQ, or NATS).',
      'Solid grasp of REST, gRPC, and WebSocket protocols under high-concurrency loads.',
      'Experience deploying containerized workloads via Docker and Kubernetes.'
    ],
    preferred: [
      'Prior exposure to healthcare data compliance standards (HIPAA, GDPR, FHIR/HL7).',
      'Experience with distributed caching (Redis) and analytical OLAP engines (ClickHouse, TimescaleDB).'
    ],
    skills: ['Go', 'TypeScript', 'PostgreSQL', 'Kafka', 'Docker', 'Kubernetes', 'gRPC', 'Redis'],
    perks: [
      'Flexible asynchronous schedule',
      'Latest MacBook Pro or customized Linux workstation setup',
      'Annual conference and professional learning stipend ($2,500)',
      'Wellness and bio-monitoring device subsidy'
    ]
  },
  {
    id: 'frontend-engineer',
    title: 'Frontend Engineer',
    department: 'Frontend Architecture',
    category: 'engineering',
    location: 'Remote (India / US)',
    employmentType: 'Full-time',
    experienceLevel: 'Mid-Level (2-5 yrs)',
    badge: 'Design System & UX',
    compensation: '$95k – $135k + Equity',
    shortDescription: 'Craft cinematic, high-performance web applications and glassmorphic telemetry dashboards with 60fps animations and fluid interactions.',
    aboutRole: 'We believe healthcare software should feel like a state-of-the-art spacecraft terminal—flawlessly responsive, aesthetically magnetic, and blisteringly fast. As our Frontend Engineer, you will translate complex algorithmic outputs into intuitive, luxury glassmorphic interfaces that delight users on desktop, tablet, and mobile devices.',
    responsibilities: [
      'Develop and scale our front-end web ecosystem using React, Next.js / Vite, and TypeScript with rigorous design system fidelity.',
      'Craft fluid 60fps micro-animations, canvas telemetry visualizations, and tactile UI interactions using CSS3, Canvas, and Framer Motion / Web Animations API.',
      'Collaborate closely with product designers to implement pixel-perfect glassmorphism, responsive grids, and brutalist typography.',
      'Profile web vitals to guarantee instantaneous sub-second initial paint times and zero layout shift across all viewports.',
      'Ensure WCAG 2.1 AA accessibility standards, semantic markup, and comprehensive keyboard navigation.'
    ],
    requirements: [
      '3+ years of professional experience building complex, dynamic single-page web applications with React and TypeScript.',
      'Mastery of modern CSS (CSS variables, CSS Grid, Flexbox, hardware-accelerated transforms, backdrop filters, responsive breakpoints).',
      'Deep understanding of browser rendering mechanics, DOM performance profiling, and bundle optimization.',
      'Strong eye for visual rhythm, typographic hierarchy, micro-interactions, and spatial balance.'
    ],
    preferred: [
      'Experience with WebGL, Three.js, or HTML5 Canvas for data and bio-structural visualization.',
      'Proven track record of building or maintaining internal component libraries and design tokens.'
    ],
    skills: ['React', 'TypeScript', 'CSS3 / CSS Variables', 'Vite / Next.js', 'Canvas / WebGL', 'Framer Motion', 'Accessibility'],
    perks: [
      'Full remote autonomy across time zones',
      'Top-tier monitor and hardware gear stipend',
      'Generous paid time off and quarterly company recharge weeks',
      'Access to AETHRIZ beta hardware and biometrics tracking tools'
    ]
  },
  {
    id: 'backend-engineer',
    title: 'Backend Engineer',
    department: 'Distributed Systems',
    category: 'engineering',
    location: 'Remote (Global)',
    employmentType: 'Full-time',
    experienceLevel: 'Senior / Lead (5+ yrs)',
    badge: 'High Concurrency',
    compensation: '$120k – $165k + Equity',
    shortDescription: 'Engineer fault-tolerant biometric ingestion engines, low-latency API gateways, and distributed time-series datastores.',
    aboutRole: 'Bio-algorithmic health intelligence requires ingesting continuous streams of wearable telemetry without a single dropped packet. You will lead the design and implementation of AETHRIZ’s high-throughput telemetry ingestion pipeline, ensuring data durability, multi-region failover, and millisecond query performance.',
    responsibilities: [
      'Architect and maintain high-throughput streaming APIs processing continuous wearable and biosensor feeds.',
      'Design distributed database schemas across PostgreSQL, TimescaleDB, and Redis with extreme query optimization.',
      'Implement enterprise OAuth2, cryptographic token validation, and multi-tenant security layers.',
      'Develop automated failover, load balancing, and disaster recovery orchestration across distributed cloud regions.',
      'Mentor intermediate engineers and establish engineering guidelines for latency and resilience benchmarks.'
    ],
    requirements: [
      '5+ years of software development experience with scalable distributed systems and backend architectures.',
      'Deep production experience in Go, Python, or Rust.',
      'Extensive hands-on experience with time-series databases (TimescaleDB, InfluxDB, or ClickHouse).',
      'Deep understanding of concurrency primitives, memory management, and network I/O optimization.',
      'Experience architecting multi-region deployments in AWS or GCP.'
    ],
    preferred: [
      'Experience handling encrypted medical data and compliance with ISO 27001 or SOC 2 Type II.',
      'Familiarity with event-driven architectures and message deduplication under high network jitter.'
    ],
    skills: ['Go', 'Rust', 'TimescaleDB', 'PostgreSQL', 'Redis', 'AWS / GCP', 'OAuth2 / JWT', 'System Design'],
    perks: [
      'Competitive base compensation with performance-based token grants',
      'Home office ergonomic workstation budget',
      'Comprehensive global health insurance coverage',
      'Regular team offsites in international innovation hubs'
    ]
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    department: 'Cloud & DevOps',
    category: 'cloud',
    location: 'Remote (Global)',
    employmentType: 'Full-time',
    experienceLevel: 'Mid-Level (2-5 yrs)',
    badge: 'Infrastructure as Code',
    compensation: '$110k – $150k + Equity',
    shortDescription: 'Architect self-healing cloud infrastructure, automated CI/CD deployment matrices, and zero-trust cloud security perimeters.',
    aboutRole: 'As our Cloud Engineer, you will maintain the digital fortress upon which all AETHRIZ algorithmic computing takes place. You will define our multi-cloud infrastructure using code, optimize GPU instance fleet allocation, automate zero-downtime deployment pipelines, and guarantee absolute cloud sovereignty.',
    responsibilities: [
      'Provision, scale, and govern cloud infrastructure across AWS and GCP using Terraform and GitOps paradigms.',
      'Manage production Kubernetes clusters (EKS/GKE), auto-scaling node groups, and specialized GPU accelerated worker pools.',
      'Build seamless CI/CD delivery pipelines with GitHub Actions, ensuring rapid verification, automated linting, and continuous security scanning.',
      'Implement unified observability, telemetry tracing, and distributed alerting using Prometheus, Grafana, and OpenTelemetry.',
      'Enforce zero-trust security postures, automated patch cycles, and cloud cost governance.'
    ],
    requirements: [
      '3+ years of dedicated DevOps or Cloud Infrastructure engineering experience.',
      'Deep proficiency with Terraform, Kubernetes, Helm, and cloud native networking (VPC, CIDR, Envoy/Traefik).',
      'Strong scripting capabilities in Bash, Python, or Go.',
      'Expertise in orchestrating hybrid GPU computing environments for machine learning inference.',
      'Strong command of automated CI/CD release strategies (canary, blue-green, rolling).'
    ],
    preferred: [
      'AWS / GCP Professional Cloud Architect or CKA certification.',
      'Experience with confidential computing enclaves (AWS Nitro, GCP Confidential VMs).'
    ],
    skills: ['Terraform', 'Kubernetes', 'AWS', 'GCP', 'GitHub Actions', 'Prometheus / Grafana', 'Docker', 'Linux Internals'],
    perks: [
      'Full-time remote flexibility',
      'Cloud certification and continuous learning budget ($3,000/yr)',
      'Home gigabit internet and cloud testing sandbox allowance',
      'Comprehensive wellness program'
    ]
  },
  {
    id: 'ai-ml-intern',
    title: 'AI/ML Intern',
    department: 'AI & Research',
    category: 'ai-research',
    location: 'Remote (Global)',
    employmentType: 'Internship',
    experienceLevel: 'Student / Intern',
    badge: 'Winter & Spring Cohort',
    compensation: 'Competitive Monthly Stipend + Completion Award',
    shortDescription: 'Collaborate with senior research scientists on real biometric datasets, predictive health algorithms, and model benchmarking.',
    aboutRole: 'This is not an internship where you brew coffee or write throwaway demo scripts. As an AI/ML Intern at AETHRIZ, you will be assigned to a core research pod, directly fine-tuning deep learning models, curating multimodal clinical benchmark datasets, and contributing to live platform repositories.',
    responsibilities: [
      'Assist in preprocessing, cleaning, and augmenting complex biometric sensor time-series datasets.',
      'Run model training experiments in PyTorch and evaluate accuracy against established medical benchmarks.',
      'Benchmark model latency across various quantization schemes (INT8, FP16, TensorRT).',
      'Document experimental findings and participate in weekly technical demo presentations with founding team mentors.',
      'Draft technical whitepapers, architectural notes, and internal model cards.'
    ],
    requirements: [
      'Currently enrolled in or recently graduated with a degree in Computer Science, Data Science, Electrical Engineering, or related technical disciplines.',
      'Solid foundation in Python and standard machine learning libraries (NumPy, Pandas, Scikit-learn, PyTorch or TensorFlow).',
      'Clear understanding of neural network fundamentals: backpropagation, optimization algorithms, loss functions, and evaluation metrics.',
      'Eager curiosity, strong written communication, and ability to work effectively in a remote, asynchronous setup.'
    ],
    preferred: [
      'Personal projects, Kaggle competitions, or open-source repositories demonstrating ML acumen.',
      'Familiarity with biological data or healthcare domains.'
    ],
    skills: ['Python', 'PyTorch', 'Data Preprocessing', 'Model Evaluation', 'Git', 'Jupyter', 'Research Methodology'],
    perks: [
      '1-on-1 direct mentorship from founding AI architects',
      'Official Internship Offer Letter and Completion Certificate',
      'Direct pathway for full-time conversion upon graduation',
      'Letter of recommendation for exceptional performers'
    ]
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    department: 'Design Systems',
    category: 'design',
    location: 'Remote (Global)',
    employmentType: 'Full-time',
    experienceLevel: 'Mid-Level (2-5 yrs)',
    badge: 'Design System & UI',
    compensation: '$90k – $130k + Equity',
    shortDescription: 'Define the visual grammar and interactive elegance of next-generation health intelligence dashboards, mobile apps, and brand touchpoints.',
    aboutRole: 'AETHRIZ is crafting a bold, futuristic visual identity where scientific rigor meets cyberpunk elegance and clinical tranquility. As our Product Designer, you will own the end-to-end design journey—from user workflows and interactive prototypes in Figma to shipping cohesive design systems with engineering.',
    responsibilities: [
      'Design futuristic, high-contrast, and intuitive user experiences for web and mobile health monitoring applications.',
      'Expand and maintain the AETHRIZ Design System (tokens, glassmorphism patterns, brutalist typography, micro-interactions).',
      'Conduct user interviews, prototype interactive flows in Figma, and run usability feedback tests.',
      'Collaborate with frontend engineers to ensure design fidelity and responsive polish across every screen breakpoint.',
      'Produce creative 3D assets, iconography, and marketing visuals for major product releases.'
    ],
    requirements: [
      '3+ years of product design (UI/UX) experience with a world-class digital portfolio.',
      'Mastery of Figma (auto-layout, components, variants, design token architecture).',
      'Deep understanding of typographic scale, information architecture, visual hierarchy, and spatial rhythm.',
      'Ability to translate highly intricate medical data visualizations into clear, reassuring insights for consumers.'
    ],
    preferred: [
      'Experience with 3D modeling tools (Blender, Spline) or motion design (After Effects, Lottie).',
      'Basic literacy in HTML/CSS to communicate smoothly with engineering.'
    ],
    skills: ['Figma', 'Design Systems', 'UI/UX Prototyping', 'Visual Architecture', 'Typography', 'Blender / 3D', 'User Research'],
    perks: [
      'Full remote freedom and equipment stipend',
      'Figma, Adobe Creative Cloud, and design tool subscriptions provided',
      'Generous learning and inspiration travel allowance',
      'Comprehensive wellness and health benefits'
    ]
  },
  {
    id: 'bio-data-fellow',
    title: 'Bio-Data Research Fellow',
    department: 'Medical Intelligence',
    category: 'ai-research',
    location: 'Hybrid (Bengaluru / HQ)',
    employmentType: 'Fellowship',
    experienceLevel: 'Entry Level (0-2 yrs)',
    badge: 'Clinical Research',
    compensation: 'Fellowship Grant + Research Stipend',
    shortDescription: 'Bridge clinical physiology and computational intelligence to validate AI health recommendations against medical literature.',
    aboutRole: 'The Bio-Data Research Fellow serves as the intellectual bridge between medical truth and machine intelligence. You will analyze clinical trials, annotate multimodal physiological datasets, and rigorously validate the diagnostic and predictive boundaries of our algorithms.',
    responsibilities: [
      'Synthesize peer-reviewed medical and nutritional literature into structured computational knowledge graphs.',
      'Validate model outputs for clinical accuracy, physiological safety, and dietary plausibility.',
      'Coordinate with clinical advisory boards to formulate ethical and evidence-based AI guidelines.',
      'Co-author research whitepapers and clinical study protocols.'
    ],
    requirements: [
      'Degree in Medicine (MBBS/MD), Biomedical Engineering, Bioinformatics, Nutrition Science, or related disciplines.',
      'Demonstrated research experience with scientific publications or clinical laboratory rotations.',
      'Strong analytical reasoning and familiarity with quantitative health statistics.'
    ],
    preferred: [
      'Basic scripting experience with Python or R for data analysis.',
      'Experience reading continuous glucose or metabolic telemetry records.'
    ],
    skills: ['Clinical Research', 'Biomedical Science', 'Literature Review', 'Medical Ethics', 'Data Curation', 'Technical Writing'],
    perks: [
      'Fellowship grant with research publication sponsorship',
      'Direct collaboration with prominent medical practitioners and AI researchers',
      'Dedicated research stipend for academic journals and conferences'
    ]
  },
  {
    id: 'growth-lead',
    title: 'Growth & Developer Relations Lead',
    department: 'Growth & Ecosystems',
    category: 'marketing',
    location: 'Remote (Global)',
    employmentType: 'Full-time',
    experienceLevel: 'Mid-Level (2-5 yrs)',
    badge: 'Community & Flywheel',
    compensation: '$85k – $120k + Equity',
    shortDescription: 'Lead technical storytelling, developer evangelism, creator partnerships, and viral community growth for the AETHRIZ platform.',
    aboutRole: 'We are seeking an ambitious technologist and master storyteller who can articulate the frontier of bio-algorithmic health intelligence. You will spearhead our global developer and builder community, cultivate strategic creator partnerships, and orchestrate high-impact launch moments.',
    responsibilities: [
      'Translate deep algorithmic research and platform architecture into compelling technical essays, developer guides, and social threads.',
      'Build and nurture our vibrant global community of engineers, biohackers, and medical pioneers across Discord, X, and LinkedIn.',
      'Formulate and execute data-backed growth loops, referral flywheels, and early-access onboarding activations.',
      'Establish strategic partnerships with health-tech creators and longevity advocates.'
    ],
    requirements: [
      '2-4 years of experience leading growth, developer advocacy, or technical marketing for modern tech/SaaS startups.',
      'Deep native fluency in digital community building, content strategy, and technical copywriting.',
      'Exceptional verbal and written communication skills with infectious enthusiasm for healthcare AI.'
    ],
    preferred: [
      'Existing presence or network in the developer, AI, or longevity health communities.',
      'Experience organizing hackathons, developer office hours, or live virtual summits.'
    ],
    skills: ['Technical Storytelling', 'Community Strategy', 'Developer Advocacy', 'Growth Loops', 'Analytics', 'PR Strategy'],
    perks: [
      'Remote-first asynchronous work model',
      'Quarterly growth bonuses tied to community reach',
      'High visibility leadership role with founder access',
      'Annual offsites and conference attendance'
    ]
  }
];
