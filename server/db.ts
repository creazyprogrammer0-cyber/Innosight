import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface UserRecord {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: 'admin' | 'editor';
  createdAt: string;
  lastLoginAt?: string;
}

export interface ProjectRecord {
  id: string;
  slug: string;
  title: string;
  category: 'SaaS Platform' | 'AI Application' | 'Custom Operational System' | 'Web Application';
  eyebrow: string;
  shortDescription: string;
  fullOverview: string;
  targetUsers: string;
  clientContext: string;
  problem: string[];
  constraints: string[];
  solution: string[];
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    integrations: string[];
    infrastructure: string;
  };
  tradeoffs: string[];
  metrics: {
    label: string;
    value: string;
    context: string;
  }[];
  tags: string[];
  coverImage?: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  deliverables: string[];
  liveUrl?: string;
  repoUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceRecord {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  idealFor: string[];
  problemsSolved: string[];
  capabilities: string[];
  deliverables: string[];
  techStack: string[];
  faq: {
    question: string;
    answer: string;
  }[];
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleRecord {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: string;
  featuredImage?: string;
  tags: string[];
  content: {
    introduction: string;
    sections: {
      heading: string;
      paragraphs: string[];
      keyTakeaways?: string[];
    }[];
    conclusion: string;
  };
  status: 'draft' | 'published' | 'archived';
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TestimonialRecord {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  avatarUrl?: string;
  verified: boolean;
  metric?: string;
  order: number;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface MediaRecord {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  altText: string;
  createdAt: string;
}

export interface AuditLogRecord {
  id: string;
  timestamp: string;
  actorEmail: string;
  action: string;
  resourceType: string;
  resourceId: string;
  details: string;
  ip: string;
  outcome: 'success' | 'failure';
}

export interface HomepageConfig {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  servicesHeading: string;
  servicesDescription: string;
  aboutHeadline: string;
  aboutBody: string;
  aboutPortrait: string;
  finalCtaHeadline: string;
  finalCtaBody: string;
  updatedAt: string;
}

export interface SiteSettingsConfig {
  siteTitle: string;
  defaultMetaDescription: string;
  contactEmail: string;
  socialGithub: string;
  socialLinkedin: string;
  socialTwitter: string;
  announcementBanner: {
    enabled: boolean;
    text: string;
    link?: string;
  };
  updatedAt: string;
}

export interface DatabaseSchema {
  users: UserRecord[];
  projects: ProjectRecord[];
  services: ServiceRecord[];
  articles: ArticleRecord[];
  testimonials: TestimonialRecord[];
  homepage: HomepageConfig;
  siteSettings: SiteSettingsConfig;
  media: MediaRecord[];
  auditLogs: AuditLogRecord[];
}

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'cms-database.json');

// Ensure database directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

// Initial default seed state
function getInitialDatabase(): DatabaseSchema {
  const adminSalt = crypto.randomBytes(16).toString('hex');
  // Default master admin: admin@innosight.dev / Innosight2026!
  const adminHash = hashPassword('Innosight2026!', adminSalt);

  return {
    users: [
      {
        id: 'usr_admin_01',
        username: 'admin',
        email: 'admin@innosight.dev',
        passwordHash: adminHash,
        salt: adminSalt,
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
    ],
    projects: [
      {
        id: 'proj_01',
        slug: 'omnichannel-inventory-saas',
        title: 'Omnichannel B2B Inventory & Order Orchestration',
        category: 'SaaS Platform',
        eyebrow: 'Distributed Multi-Warehouse Logistics Engine',
        shortDescription: 'High-throughput inventory synchronization pipeline processing 140,000+ daily SKU balance updates with zero overselling across Shopify, Amazon, and ERP endpoints.',
        fullOverview: 'Engineered a resilient inventory ledger and order routing engine for high-volume enterprise commerce. Replaced fragmented batch scripts with an event-driven queue topology ensuring sub-second balance consistency across 12 fulfillment centers.',
        targetUsers: 'B2B Wholesale Distributors, 3PL Warehouses & High-Volume Commerce Operators',
        clientContext: 'Scaled from single-warehouse Shopify operations to multi-warehouse regional distribution network with strict SLA guarantees.',
        problem: [
          'Frequent overselling during peak flash-sales caused by 15-minute polling latency on legacy ERP.',
          'Manual spreadsheet reconciliation between Amazon FBA and proprietary warehouse management systems.',
          'No idempotent retry mechanics, causing duplicate shipping labels and ghost fulfillment orders.'
        ],
        constraints: [
          'Strict zero-downtime migration requirement with continuous live order stream.',
          'Legacy AS400 ERP integration restricted to SOAP/XML endpoints with rate throttles.',
          'Target inventory balance calculation time capped under 80 milliseconds per multi-line cart.'
        ],
        solution: [
          'Implemented Redis-backed atomic reservation tokens preventing inventory race conditions.',
          'Constructed event-driven message queuing with automatic exponential backoff and dead-letter queues.',
          'Built an operator dashboard in Next.js/React with real-time WebSocket state streaming.'
        ],
        architecture: {
          frontend: 'React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion',
          backend: 'Node.js, Express, TypeScript, BullMQ Queue Engine',
          database: 'PostgreSQL with Row-Level Locking, Redis Cluster for Ephemeral Caches',
          integrations: ['Shopify REST/GraphQL API', 'Amazon Selling Partner API', 'QuickBooks Enterprise'],
          infrastructure: 'Docker, AWS ECS Fargate, CloudWatch Distributed Tracing'
        },
        tradeoffs: [
          'Accepted eventual consistency on historical analytics reporting in exchange for strict linearizability on active order checkout locks.',
          'Chose self-hosted Redis persistence over third-party SaaS caches to maintain latency budgets under 5ms.'
        ],
        metrics: [
          { label: 'Oversell Incident Rate', value: '0.00%', context: 'Reduced from 2.4% during Q4 holiday volume' },
          { label: 'Sync Latency', value: '< 240ms', context: 'From previous 15-minute scheduled cron poll' },
          { label: 'Annual Labor Saved', value: '620+ hrs', context: 'Eliminated manual warehouse reconciliation spreadsheets' }
        ],
        tags: ['PostgreSQL', 'Redis', 'Node.js', 'Distributed Systems', 'Shopify API', 'BullMQ'],
        status: 'published',
        featured: true,
        deliverables: ['Real-Time Inventory Engine', 'Warehouse Admin Portal', 'ERP Integration Webhooks', 'Full Architectural Documentation'],
        createdAt: '2026-01-15T10:00:00.000Z',
        updatedAt: '2026-03-20T14:30:00.000Z',
      },
      {
        id: 'proj_02',
        slug: 'ai-document-intelligence-pipeline',
        title: 'Cognitive Financial Document & Invoice Parser',
        category: 'AI Application',
        eyebrow: 'Grounded Vision-Language Information Extraction',
        shortDescription: 'Production OCR and structured JSON extraction system for messy multinational commercial invoices, processing 25,000+ monthly documents at 98.4% field accuracy.',
        fullOverview: 'Developed an automated financial ingestion pipeline that converts scanned PDFs, low-resolution photographs, and heterogeneous vendor receipts into validated, type-safe accounting schemas ready for ERP sync.',
        targetUsers: 'Accounts Payable Teams, Fractional CFOs, and Supply Chain Finance Controllers',
        clientContext: 'Accounting operations suffered from a 4-day backlog of manual invoice data entry across 8 global subsidiary currencies.',
        problem: [
          'Legacy template-based OCR broke every time a vendor tweaked invoice layout or table alignment.',
          'Hallucination risks from generic LLM prompts misreading line-item totals and tax allocations.',
          'Missing human-in-the-loop review workflow for low-confidence extraction boundaries.'
        ],
        constraints: [
          'SOC2 / PII compliance: documents must not be retained by third-party model providers for training.',
          'Processing cost budget capped at under $0.03 per multi-page document.',
          'Line-item mathematical balance must be deterministically validated before accounting approval.'
        ],
        solution: [
          'Multi-stage pipeline: PDF normalization, layout analysis, structured LLM extraction, and deterministic mathematical cross-checking.',
          'Built an interactive side-by-side human-in-the-loop audit desk with visual bounding box highlights.',
          'Automated confidence scoring that auto-approves 82% of standard invoices without human touch.'
        ],
        architecture: {
          frontend: 'React 19, TypeScript, Canvas Bounding Box Overlay, Tailwind CSS',
          backend: 'Python FastAPI & Node.js orchestration proxy, Pydantic Schema Validation',
          database: 'PostgreSQL with JSONB document snapshots, S3-Compatible Encrypted Object Store',
          integrations: ['Google Gemini Multimodal API', 'Xero Accounting API', 'Stripe Billing'],
          infrastructure: 'Serverless Cloud Run, Secure Enclave Secret Management'
        },
        tradeoffs: [
          'Chose multi-pass validation over single-prompt extraction, adding 1.2s to processing time but increasing accounting accuracy from 89% to 98.4%.',
          'Enforced deterministic schema verification before emitting downstream webhooks.'
        ],
        metrics: [
          { label: 'Extraction Precision', value: '98.4%', context: 'Cross-validated against manual financial audits' },
          { label: 'Processing Speed', value: '3.8s / doc', context: 'Down from 12+ minutes of manual keyboard entry' },
          { label: 'Touchless Ingestion', value: '82.6%', context: 'Passes directly to ERP without human intervention' }
        ],
        tags: ['Gemini Multimodal', 'FastAPI', 'React', 'Document OCR', 'Accounting Automation'],
        status: 'published',
        featured: true,
        deliverables: ['Document Processing API', 'Human-in-the-Loop Review UI', 'Deterministic Validation Engine', 'Audit Trail Export'],
        createdAt: '2026-02-01T09:00:00.000Z',
        updatedAt: '2026-03-25T11:20:00.000Z',
      },
      {
        id: 'proj_03',
        slug: 'telehealth-clinical-workflow-suite',
        title: 'HIPAA-Compliant Patient Onboarding & Clinical Notes',
        category: 'Custom Operational System',
        eyebrow: 'Secure Healthcare Workflow & Provider Portal',
        shortDescription: 'Custom healthcare operational platform connecting digital intake questionnaires, encrypted video consultations, and structured doctor soap notes.',
        fullOverview: 'Architected an end-to-end clinical workflow system for a growing specialized mental health clinic network. Replaced slow paper intake and generic spreadsheets with a unified, role-based provider interface.',
        targetUsers: 'Licensed Clinicians, Care Coordinators, and Patient Support Specialists',
        clientContext: 'Expanding clinic needed to transition from fragmented generic SaaS tools to a proprietary, audit-proof clinical record platform.',
        problem: [
          'Disconnected patient intake forms required manual copy-pasting into clinician calendars.',
          'Patient retention suffered due to clunky scheduling and inconsistent appointment reminder channels.',
          'Strict regulatory compliance demanded granular access logging and encrypted-at-rest storage.'
        ],
        constraints: [
          'Full HIPAA compliance, audit trail recording for all chart inspections, zero PHI leaks.',
          'Clinician UX must minimize administrative friction during 30-minute patient appointments.',
          'Must operate reliably on tablets and mobile devices in clinic exam rooms.'
        ],
        solution: [
          'Developed a tailored SOAP notes interface with keyboard-first templates and diagnostic code search.',
          'Engineered encrypted bidirectional messaging and automated SMS appointment sequences.',
          'Created real-time provider schedule synchronization with automated no-show recovery.'
        ],
        architecture: {
          frontend: 'React 19, TypeScript, Tailwind CSS, Accessible Form Standards',
          backend: 'Node.js, Express, Encrypted Session Store, KMS Key Rotation',
          database: 'PostgreSQL with Row-Level Security, Encrypted Columns via pgcrypto',
          integrations: ['Twilio Healthcare SMS', 'SendGrid Secure SMTP', 'Daily.co HIPAA WebRTC'],
          infrastructure: 'HIPAA-eligible AWS Dedicated VPC, WAF with Rate Limiting'
        },
        tradeoffs: [
          'Restricted all external analytics and tracking pixels to ensure zero accidental patient data sharing.',
          'Opted for strict server-authoritative session termination after 15 minutes of inactivity.'
        ],
        metrics: [
          { label: 'Intake Completion Rate', value: '94.2%', context: 'Up from 61% on previous legacy PDF forms' },
          { label: 'Documentation Time', value: '-45%', context: 'Clinicians finish charting before session close' },
          { label: 'Compliance Audit', value: '100% Pass', context: 'Zero findings on independent security review' }
        ],
        tags: ['Healthcare', 'HIPAA', 'PostgreSQL', 'WebRTC', 'TypeScript', 'Security Audited'],
        status: 'published',
        featured: true,
        deliverables: ['Provider Portal', 'Patient Intake Portal', 'Secure Messaging Bridge', 'Automated Audit Log System'],
        createdAt: '2026-02-18T14:00:00.000Z',
        updatedAt: '2026-04-02T16:45:00.000Z',
      }
    ],
    services: [
      {
        id: 'srv_01',
        slug: 'full-stack-web-saas',
        title: 'Full-Stack Web & SaaS Development',
        tagline: 'End-to-End Product Engineering From Zero to Scale',
        description: 'Architecting scalable web applications, multi-tenant SaaS platforms, and high-performance client interfaces using modern TypeScript, React, Node.js, and relational databases.',
        idealFor: ['Seed to Series-A Founders building core MVPs', 'Companies modernizing legacy web platforms', 'Teams requiring senior technical leadership and execution'],
        problemsSolved: ['Unreliable spaghetti code causing slow iteration', 'Poor database schemas leading to performance bottlenecks', 'Lack of scalable authorization and subscription billing architecture'],
        capabilities: ['Production-grade React & Next.js UI engineering', 'Typed REST and GraphQL API architectures', 'Stripe recurring billing & team seat management', 'Role-based access control and tenant isolation'],
        deliverables: ['Complete production source code repository', 'Automated test suite and CI/CD deployment pipelines', 'Infrastructure configuration and environment manifests', 'Interactive documentation and developer runbooks'],
        techStack: ['TypeScript', 'React 19', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
        faq: [
          { question: 'How do you handle project scoping and deliverables?', answer: 'We begin with a high-fidelity technical architecture blueprint, defining exact data models, edge cases, and milestone deliverables with weekly production demos.' },
          { question: 'Do I own the full intellectual property and code?', answer: 'Yes, 100%. All repository commits, architecture designs, and deployment configurations belong entirely to you from day one.' }
        ],
        status: 'published',
        featured: true,
        order: 1,
        createdAt: '2026-01-10T12:00:00.000Z',
        updatedAt: '2026-03-15T09:00:00.000Z'
      },
      {
        id: 'srv_02',
        slug: 'ai-integrations-llm-workflows',
        title: 'Applied AI & LLM Workflow Engineering',
        tagline: 'Grounded, Deterministic AI Systems That Solve Real Business Bottlenecks',
        description: 'Building production AI pipelines that extract structured data, automate multi-step operational tasks, and enhance software with multimodal vision and natural language intelligence.',
        idealFor: ['Founders integrating generative AI without hallucination risks', 'Operations teams drowning in manual document classification', 'Products seeking proprietary AI differentiation'],
        problemsSolved: ['Generic chatbots with zero grounded context', 'Fragile unstructured LLM output breaking backend APIs', 'Runaway model API costs and latency issues'],
        capabilities: ['Multimodal document & invoice extraction engines', 'Structured JSON output schema guarantees (Pydantic / Zod)', 'Vector search & retrieval-augmented generation (RAG)', 'Self-hosted and cloud model benchmarking'],
        deliverables: ['Production extraction microservice', 'Human-in-the-loop review interface', 'Deterministic validation test harness', 'Prompt versioning and latency monitoring'],
        techStack: ['Google Gemini API', 'Python FastAPI', 'Node.js', 'pgvector', 'TypeScript', 'LangChain'],
        faq: [
          { question: 'How do you prevent AI hallucinations in critical workflows?', answer: 'We implement multi-stage deterministic validation: strict schema enforcement, mathematical balance checking, and human-in-the-loop escalation thresholds.' },
          { question: 'What model providers do you support?', answer: 'We primarily work with Google Gemini, Anthropic Claude, and OpenAI, alongside self-hosted open-weights models where data sovereignty is required.' }
        ],
        status: 'published',
        featured: true,
        order: 2,
        createdAt: '2026-01-12T12:00:00.000Z',
        updatedAt: '2026-03-18T10:00:00.000Z'
      },
      {
        id: 'srv_03',
        slug: 'custom-internal-tools-dashboards',
        title: 'Custom Operational Systems & Portals',
        tagline: 'High-Velocity Internal Tools Built Exactly for Your Workflow',
        description: 'Replacing brittle spreadsheets, manual Zapier chains, and bloated off-the-shelf software with tailored operational portals, inventory orchestrators, and executive dashboards.',
        idealFor: ['Growing businesses outgrowing Airtable and Google Sheets', 'Teams needing tight integrations with custom hardware or legacy ERPs', 'Companies with sensitive data requiring private hosting'],
        problemsSolved: ['Data entry bottlenecks across disconnected tools', 'Zero audit trail of who changed critical business records', 'Expensive per-seat SaaS costs on generic platforms'],
        capabilities: ['Real-time operational dashboards with WebSocket streaming', 'Complex approval workflows and state machines', 'Custom report generators with PDF/Excel export', 'Third-party API webhook ingestion and synchronization'],
        deliverables: ['Bespoke internal operations web application', 'Granular audit logs and user activity tracking', 'Secure role-based permission matrix', 'Deployment to private cloud infrastructure'],
        techStack: ['React', 'TypeScript', 'PostgreSQL', 'Express', 'Redis', 'Tailwind CSS', 'AWS'],
        faq: [
          { question: 'Can you integrate with our existing legacy database or ERP?', answer: 'Yes. We specialize in building secure abstraction layers and modern APIs on top of legacy databases, ERPs, and external partner systems.' },
          { question: 'How is security handled for internal portals?', answer: 'We enforce strict authentication (including MFA), role-based authorization, rate limiting, and immutable audit logging for all critical operations.' }
        ],
        status: 'published',
        featured: true,
        order: 3,
        createdAt: '2026-01-14T12:00:00.000Z',
        updatedAt: '2026-03-22T15:00:00.000Z'
      }
    ],
    articles: [
      {
        id: 'art_01',
        slug: 'preventing-technical-debt-in-early-stage-mvps',
        title: 'Architecting for Velocity: How to Build an MVP Without Toxic Technical Debt',
        summary: 'Practical principles for early-stage founders to ship fast while maintaining a clean, modular foundation that will not crumble after initial product-market fit.',
        category: 'Software Architecture',
        readTime: '6 min read',
        publishedDate: 'March 2026',
        author: 'Jannatul (Founder & Lead Architect)',
        tags: ['Architecture', 'Startups', 'TypeScript', 'Clean Code'],
        content: {
          introduction: 'The biggest lie told to first-time founders is that speed requires sloppy code. In reality, bad code does not speed up the first month—it slows down the third month to a complete standstill.',
          sections: [
            {
              heading: '1. The Difference Between Pragmatism and Sloppiness',
              paragraphs: [
                'Pragmatism means choosing boring, battle-tested technologies with rich ecosystems. It means defining strict schema boundaries even if you only have three database tables.',
                'Sloppiness, by contrast, is neglecting database migrations, skipping foreign key constraints, or relying on client-side authentication checks.'
              ],
              keyTakeaways: [
                'Always use a strongly typed language (TypeScript) across front and back.',
                'Enforce database constraints early—schema integrity is nearly impossible to retrofit.'
              ]
            },
            {
              heading: '2. Modular Architecture Over Microservices',
              paragraphs: [
                'Do not build microservices for a 5-person startup. A clean, modular monolith with clear domain boundaries gives you 10x the development velocity with zero distributed systems overhead.',
                'When you organize code by feature domain rather than purely technical layer, refactoring or extracting a service later becomes trivial.'
              ],
              keyTakeaways: [
                'Monolith-first is the proven path for 99% of early SaaS products.',
                'Invest in reliable CI/CD and automated typechecking from commit number one.'
              ]
            }
          ],
          conclusion: 'Speed is a byproduct of clarity, not recklessness. When your data models and domain boundaries are explicit, shipping new features feels effortless.'
        },
        status: 'published',
        seoTitle: 'Preventing Technical Debt in Early-Stage Startups — Innosight',
        seoDescription: 'Guide for founders on shipping fast with solid software architecture and zero technical debt.',
        createdAt: '2026-03-01T10:00:00.000Z',
        updatedAt: '2026-03-10T11:00:00.000Z'
      },
      {
        id: 'art_02',
        slug: 'deterministic-ai-pipelines-in-production',
        title: 'Beyond the Chatbot: Engineering Deterministic, Audit-Proof AI Workflows',
        summary: 'Why probabilistic language models must be wrapped in deterministic validation layers before touching financial or operational enterprise systems.',
        category: 'Applied AI',
        readTime: '8 min read',
        publishedDate: 'February 2026',
        author: 'Jannatul (Founder & Lead Architect)',
        tags: ['AI Engineering', 'LLMs', 'System Design', 'Reliability'],
        content: {
          introduction: 'Prompt engineering is not software engineering. When building mission-critical business automation, you cannot accept an output that fails 5% of the time. Here is how to achieve 99%+ reliability with LLMs.',
          sections: [
            {
              heading: '1. Treat LLMs as Untrusted Parsing Engines',
              paragraphs: [
                'Never pass raw LLM text directly to database inserts or payment gateways. Every model output must pass through a strict schema validation boundary (such as Zod or Pydantic).',
                'If the schema fails validation, trigger an automatic correction loop with the exact validation error fed back to the model.'
              ],
              keyTakeaways: [
                'Enforce strict JSON mode and typed response schemas.',
                'Implement idempotent fallback routines for anomalous responses.'
              ]
            },
            {
              heading: '2. Deterministic Mathematical Verification',
              paragraphs: [
                'LLMs are notoriously unreliable at arithmetic. When extracting financial invoices, do not ask the model to calculate subtotals—extract the atomic integers, and let deterministic JavaScript or Python verify the math.',
                'If line items do not sum up to the invoice total, flag the discrepancy immediately for human review.'
              ],
              keyTakeaways: [
                'Never use LLMs for arithmetic—use code for math and models for perception.',
                'Build a clear confidence score threshold for human-in-the-loop review.'
              ]
            }
          ],
          conclusion: 'By treating language models as perception components inside a deterministic software harness, you get the flexibility of AI with the bulletproof reliability of traditional engineering.'
        },
        status: 'published',
        seoTitle: 'Engineering Deterministic AI Systems — Innosight',
        seoDescription: 'Architecting reliable, deterministic LLM pipelines for enterprise workflows.',
        createdAt: '2026-02-15T12:00:00.000Z',
        updatedAt: '2026-02-28T14:00:00.000Z'
      }
    ],
    testimonials: [
      {
        id: 'test_01',
        quote: 'Jannatul stepped in when our previous agency stalled for two months. Within three weeks, we had an entirely functional inventory synchronization system running in staging. The architectural clarity and speed was unlike anything we experienced before.',
        clientName: 'Marcus Vance',
        clientRole: 'VP of Technology & Supply Chain',
        clientCompany: 'LogiCore Distribution',
        verified: true,
        metric: '140k+ Daily Events',
        order: 1,
        status: 'published',
        createdAt: '2026-01-20T10:00:00.000Z',
        updatedAt: '2026-01-20T10:00:00.000Z'
      },
      {
        id: 'test_02',
        quote: 'Working with Innosight felt like having a senior staff architect embedded in our core team. The AI document parsing system they built cut our accounting invoice turnaround from 4 business days to under 4 minutes with 98% accuracy.',
        clientName: 'Elena Rostova',
        clientRole: 'Co-Founder & COO',
        clientCompany: 'FinBridge Operations',
        verified: true,
        metric: '98.4% OCR Accuracy',
        order: 2,
        status: 'published',
        createdAt: '2026-02-10T10:00:00.000Z',
        updatedAt: '2026-02-10T10:00:00.000Z'
      }
    ],
    homepage: {
      heroEyebrow: 'Full-Stack Software Architecture & Execution',
      heroTitle: 'Transforming Complex Product Ideas into High-Performance Software',
      heroDescription: 'Technical partner for ambitious founders and established teams. Custom SaaS development, enterprise web systems, and grounded AI workflow integrations engineered with precision.',
      primaryCtaText: 'Discuss Your Project',
      primaryCtaLink: '#contact',
      secondaryCtaText: 'Explore Selected Work',
      secondaryCtaLink: '#work',
      servicesHeading: 'Engineered for Performance & Business Impact',
      servicesDescription: 'From high-concurrency SaaS platforms to automated AI document workflows, every system is built with bulletproof data integrity, clean architecture, and rapid deployment velocity.',
      aboutHeadline: 'Personal Technical Partner, Not a Bloated Agency',
      aboutBody: 'I partner directly with founders and technical leaders to design, build, and deploy production software that scales. No junior handoffs, no bureaucratic communication layers—just senior-level engineering execution from day one.',
      aboutPortrait: '/images/team/jannatul.svg',
      finalCtaHeadline: 'Ready to Architect Your Next Production System?',
      finalCtaBody: 'Whether you need a full SaaS MVP engineered from scratch or a high-concurrency pipeline modernized, let us discuss your technical requirements and timeline.',
      updatedAt: new Date().toISOString()
    },
    siteSettings: {
      siteTitle: 'Innosight — Full-Stack Developer & Technical Partner',
      defaultMetaDescription: 'Personal developer portfolio of Jannatul. Custom software engineering, SaaS development, and practical AI integrations for ambitious founders.',
      contactEmail: 'contact@innosight.dev',
      socialGithub: 'https://github.com/creazyprogrammer0-cyber',
      socialLinkedin: 'https://linkedin.com',
      socialTwitter: 'https://x.com',
      announcementBanner: {
        enabled: true,
        text: '🚀 Currently booking Q2-Q3 engineering sprints and architecture advisory.',
        link: '#contact'
      },
      updatedAt: new Date().toISOString()
    },
    media: [
      {
        id: 'med_01',
        filename: 'jannatul.svg',
        originalName: 'jannatul.svg',
        mimeType: 'image/svg+xml',
        size: 8420,
        url: '/images/team/jannatul.svg',
        altText: 'Jannatul — Founder and Principal Software Architect at Innosight',
        createdAt: new Date().toISOString()
      }
    ],
    auditLogs: [
      {
        id: 'aud_init_01',
        timestamp: new Date().toISOString(),
        actorEmail: 'system@innosight.dev',
        action: 'DATABASE_INITIALIZATION',
        resourceType: 'system',
        resourceId: 'cms_db',
        details: 'Initial production CMS database created and seeded with baseline portfolio records.',
        ip: '127.0.0.1',
        outcome: 'success'
      }
    ]
  };
}

class CmsDatabase {
  private data: DatabaseSchema;
  private isWriting = false;

  constructor() {
    this.data = this.load();
  }

  private load(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.users && parsed.projects) {
          return parsed as DatabaseSchema;
        }
      }
    } catch (err) {
      console.error('[CMS DB] Error loading database file, initializing fresh store:', err);
    }
    const initial = getInitialDatabase();
    this.persistSync(initial);
    return initial;
  }

  private persistSync(schema: DatabaseSchema): void {
    const tempFile = `${DB_FILE}.${Date.now()}.tmp`;
    try {
      fs.writeFileSync(tempFile, JSON.stringify(schema, null, 2), 'utf-8');
      fs.renameSync(tempFile, DB_FILE);
    } catch (err) {
      if (fs.existsSync(tempFile)) {
        try { fs.unlinkSync(tempFile); } catch {}
      }
      throw err;
    }
  }

  public save(): void {
    this.persistSync(this.data);
  }

  public getRaw(): DatabaseSchema {
    return this.data;
  }

  // --- Users & Auth ---
  public findUserByEmail(email: string): UserRecord | undefined {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  public findUserById(id: string): UserRecord | undefined {
    return this.data.users.find((u) => u.id === id);
  }

  public updateUserLastLogin(id: string): void {
    const user = this.findUserById(id);
    if (user) {
      user.lastLoginAt = new Date().toISOString();
      this.save();
    }
  }

  // --- Projects ---
  public getProjects(includeAll = false): ProjectRecord[] {
    if (includeAll) return this.data.projects;
    return this.data.projects.filter((p) => p.status === 'published');
  }

  public getProjectBySlug(slug: string, includeAll = false): ProjectRecord | undefined {
    return this.data.projects.find((p) => p.slug === slug && (includeAll || p.status === 'published'));
  }

  public getProjectById(id: string): ProjectRecord | undefined {
    return this.data.projects.find((p) => p.id === id);
  }

  public upsertProject(project: Partial<ProjectRecord> & { title: string; category: any }): ProjectRecord {
    const now = new Date().toISOString();
    const existingIndex = project.id ? this.data.projects.findIndex((p) => p.id === project.id) : -1;
    
    // Auto-generate or sanitize slug
    const cleanSlug = (project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) || 'project';
    
    // Check slug collision
    const slugCollision = this.data.projects.find((p) => p.slug === cleanSlug && p.id !== project.id);
    const finalSlug = slugCollision ? `${cleanSlug}-${Date.now().toString(36)}` : cleanSlug;

    if (existingIndex >= 0) {
      const existing = this.data.projects[existingIndex];
      const updated: ProjectRecord = {
        ...existing,
        ...project,
        slug: finalSlug,
        updatedAt: now,
      };
      this.data.projects[existingIndex] = updated;
      this.save();
      return updated;
    } else {
      const created: ProjectRecord = {
        id: project.id || `proj_${Date.now().toString(36)}_${crypto.randomBytes(4).toString('hex')}`,
        slug: finalSlug,
        title: project.title,
        category: project.category || 'SaaS Platform',
        eyebrow: project.eyebrow || '',
        shortDescription: project.shortDescription || '',
        fullOverview: project.fullOverview || '',
        targetUsers: project.targetUsers || '',
        clientContext: project.clientContext || '',
        problem: project.problem || [],
        constraints: project.constraints || [],
        solution: project.solution || [],
        architecture: project.architecture || {
          frontend: '',
          backend: '',
          database: '',
          integrations: [],
          infrastructure: ''
        },
        tradeoffs: project.tradeoffs || [],
        metrics: project.metrics || [],
        tags: project.tags || [],
        coverImage: project.coverImage,
        status: project.status || 'draft',
        featured: Boolean(project.featured),
        deliverables: project.deliverables || [],
        liveUrl: project.liveUrl,
        repoUrl: project.repoUrl,
        seoTitle: project.seoTitle,
        seoDescription: project.seoDescription,
        createdAt: now,
        updatedAt: now,
      };
      this.data.projects.unshift(created);
      this.save();
      return created;
    }
  }

  public deleteProject(id: string): boolean {
    const idx = this.data.projects.findIndex((p) => p.id === id);
    if (idx >= 0) {
      this.data.projects.splice(idx, 1);
      this.save();
      return true;
    }
    return false;
  }

  // --- Services ---
  public getServices(includeAll = false): ServiceRecord[] {
    if (includeAll) return this.data.services;
    return this.data.services.filter((s) => s.status === 'published');
  }

  public getServiceById(id: string): ServiceRecord | undefined {
    return this.data.services.find((s) => s.id === id);
  }

  public upsertService(service: Partial<ServiceRecord> & { title: string }): ServiceRecord {
    const now = new Date().toISOString();
    const existingIndex = service.id ? this.data.services.findIndex((s) => s.id === service.id) : -1;
    const cleanSlug = (service.slug || service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) || 'service';

    if (existingIndex >= 0) {
      const existing = this.data.services[existingIndex];
      const updated: ServiceRecord = {
        ...existing,
        ...service,
        slug: cleanSlug,
        updatedAt: now,
      };
      this.data.services[existingIndex] = updated;
      this.save();
      return updated;
    } else {
      const created: ServiceRecord = {
        id: service.id || `srv_${Date.now().toString(36)}_${crypto.randomBytes(4).toString('hex')}`,
        slug: cleanSlug,
        title: service.title,
        tagline: service.tagline || '',
        description: service.description || '',
        idealFor: service.idealFor || [],
        problemsSolved: service.problemsSolved || [],
        capabilities: service.capabilities || [],
        deliverables: service.deliverables || [],
        techStack: service.techStack || [],
        faq: service.faq || [],
        status: service.status || 'draft',
        featured: Boolean(service.featured),
        order: service.order || (this.data.services.length + 1),
        createdAt: now,
        updatedAt: now,
      };
      this.data.services.push(created);
      this.save();
      return created;
    }
  }

  public deleteService(id: string): boolean {
    const idx = this.data.services.findIndex((s) => s.id === id);
    if (idx >= 0) {
      this.data.services.splice(idx, 1);
      this.save();
      return true;
    }
    return false;
  }

  // --- Articles ---
  public getArticles(includeAll = false): ArticleRecord[] {
    if (includeAll) return this.data.articles;
    return this.data.articles.filter((a) => a.status === 'published');
  }

  public getArticleById(id: string): ArticleRecord | undefined {
    return this.data.articles.find((a) => a.id === id);
  }

  public upsertArticle(article: Partial<ArticleRecord> & { title: string }): ArticleRecord {
    const now = new Date().toISOString();
    const existingIndex = article.id ? this.data.articles.findIndex((a) => a.id === article.id) : -1;
    const cleanSlug = (article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) || 'article';

    // Calculate reading time
    let totalWords = 0;
    if (article.content) {
      totalWords += (article.content.introduction || '').split(/\s+/).length;
      totalWords += (article.content.conclusion || '').split(/\s+/).length;
      if (article.content.sections) {
        article.content.sections.forEach((s) => {
          totalWords += (s.heading || '').split(/\s+/).length;
          s.paragraphs.forEach((p) => { totalWords += (p || '').split(/\s+/).length; });
        });
      }
    }
    const computedReadTime = `${Math.max(1, Math.ceil(totalWords / 200))} min read`;

    if (existingIndex >= 0) {
      const existing = this.data.articles[existingIndex];
      const updated: ArticleRecord = {
        ...existing,
        ...article,
        slug: cleanSlug,
        readTime: computedReadTime,
        updatedAt: now,
      };
      this.data.articles[existingIndex] = updated;
      this.save();
      return updated;
    } else {
      const created: ArticleRecord = {
        id: article.id || `art_${Date.now().toString(36)}_${crypto.randomBytes(4).toString('hex')}`,
        slug: cleanSlug,
        title: article.title,
        summary: article.summary || '',
        category: article.category || 'Architecture',
        readTime: computedReadTime,
        publishedDate: article.publishedDate || 'Just now',
        author: article.author || 'Jannatul (Founder & Lead Architect)',
        featuredImage: article.featuredImage,
        tags: article.tags || [],
        content: article.content || {
          introduction: '',
          sections: [],
          conclusion: '',
        },
        status: article.status || 'draft',
        seoTitle: article.seoTitle,
        seoDescription: article.seoDescription,
        createdAt: now,
        updatedAt: now,
      };
      this.data.articles.unshift(created);
      this.save();
      return created;
    }
  }

  public deleteArticle(id: string): boolean {
    const idx = this.data.articles.findIndex((a) => a.id === id);
    if (idx >= 0) {
      this.data.articles.splice(idx, 1);
      this.save();
      return true;
    }
    return false;
  }

  // --- Testimonials ---
  public getTestimonials(includeAll = false): TestimonialRecord[] {
    if (includeAll) return this.data.testimonials;
    return this.data.testimonials.filter((t) => t.status === 'published');
  }

  public upsertTestimonial(testimonial: Partial<TestimonialRecord> & { quote: string; clientName: string }): TestimonialRecord {
    const now = new Date().toISOString();
    const existingIndex = testimonial.id ? this.data.testimonials.findIndex((t) => t.id === testimonial.id) : -1;

    if (existingIndex >= 0) {
      const existing = this.data.testimonials[existingIndex];
      const updated: TestimonialRecord = {
        ...existing,
        ...testimonial,
        updatedAt: now,
      };
      this.data.testimonials[existingIndex] = updated;
      this.save();
      return updated;
    } else {
      const created: TestimonialRecord = {
        id: testimonial.id || `test_${Date.now().toString(36)}_${crypto.randomBytes(4).toString('hex')}`,
        quote: testimonial.quote,
        clientName: testimonial.clientName,
        clientRole: testimonial.clientRole || '',
        clientCompany: testimonial.clientCompany || '',
        avatarUrl: testimonial.avatarUrl,
        verified: Boolean(testimonial.verified),
        metric: testimonial.metric,
        order: testimonial.order || (this.data.testimonials.length + 1),
        status: testimonial.status || 'published',
        createdAt: now,
        updatedAt: now,
      };
      this.data.testimonials.push(created);
      this.save();
      return created;
    }
  }

  public deleteTestimonial(id: string): boolean {
    const idx = this.data.testimonials.findIndex((t) => t.id === id);
    if (idx >= 0) {
      this.data.testimonials.splice(idx, 1);
      this.save();
      return true;
    }
    return false;
  }

  // --- Homepage & Settings ---
  public getHomepage(): HomepageConfig {
    return this.data.homepage;
  }

  public updateHomepage(config: Partial<HomepageConfig>): HomepageConfig {
    this.data.homepage = {
      ...this.data.homepage,
      ...config,
      updatedAt: new Date().toISOString(),
    };
    this.save();
    return this.data.homepage;
  }

  public getSiteSettings(): SiteSettingsConfig {
    return this.data.siteSettings;
  }

  public updateSiteSettings(settings: Partial<SiteSettingsConfig>): SiteSettingsConfig {
    this.data.siteSettings = {
      ...this.data.siteSettings,
      ...settings,
      updatedAt: new Date().toISOString(),
    };
    this.save();
    return this.data.siteSettings;
  }

  // --- Media ---
  public getMedia(): MediaRecord[] {
    return this.data.media;
  }

  public addMedia(item: Omit<MediaRecord, 'id' | 'createdAt'>): MediaRecord {
    const record: MediaRecord = {
      ...item,
      id: `med_${Date.now().toString(36)}_${crypto.randomBytes(4).toString('hex')}`,
      createdAt: new Date().toISOString(),
    };
    this.data.media.unshift(record);
    this.save();
    return record;
  }

  public updateMediaAlt(id: string, altText: string): MediaRecord | undefined {
    const item = this.data.media.find((m) => m.id === id);
    if (item) {
      item.altText = altText;
      this.save();
      return item;
    }
    return undefined;
  }

  public deleteMedia(id: string): boolean {
    const idx = this.data.media.findIndex((m) => m.id === id);
    if (idx >= 0) {
      this.data.media.splice(idx, 1);
      this.save();
      return true;
    }
    return false;
  }

  // --- Audit Logs ---
  public getAuditLogs(): AuditLogRecord[] {
    return this.data.auditLogs;
  }

  public logAudit(entry: Omit<AuditLogRecord, 'id' | 'timestamp'>): void {
    const record: AuditLogRecord = {
      ...entry,
      id: `aud_${Date.now().toString(36)}_${crypto.randomBytes(4).toString('hex')}`,
      timestamp: new Date().toISOString(),
    };
    this.data.auditLogs.unshift(record);
    // Keep most recent 500 audit logs to bound storage size
    if (this.data.auditLogs.length > 500) {
      this.data.auditLogs = this.data.auditLogs.slice(0, 500);
    }
    this.save();
  }
}

export const db = new CmsDatabase();
