import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'apexmetrics',
    slug: 'apexmetrics-saas-platform',
    title: 'ApexMetrics SaaS Engine',
    category: 'SaaS Platform',
    eyebrow: 'B2B REVENUE INTELLIGENCE',
    shortDescription:
      'Multi-tenant subscription analytics dashboard with automated Stripe webhooks, cohort churn modeling, and automated financial reporting.',
    fullOverview:
      'ApexMetrics was commissioned by a subscription-first B2B startup needing real-time visibility into MRR, net revenue retention, customer churn, and payment lifecycle events. The existing solution relied on manual spreadsheet exports that broke under high transaction volume.',
    targetUsers:
      'Bootstrapped founders, VP of Finance, and SaaS operators who require accurate revenue reconciliation without manual spreadsheets.',
    clientContext:
      'Early-stage fintech startup managing over $450k in monthly recurring transaction volume across 4,200 active subscriptions.',
    problem: [
      'Disjointed Stripe data caused reconciliation delays of up to 48 hours for team leads.',
      'Complex subscription upgrade/downgrade logic was miscalculating net revenue churn.',
      'Previous dashboard suffered from 4+ second SQL queries on historical cohorts over 18 months.',
    ],
    constraints: [
      'Zero downtime migration with zero lost transaction webhook events.',
      'Strict multi-tenant tenant isolation for PCI and SOC2 compliance readiness.',
      'Sub-200ms dashboard page loads on datasets exceeding 500,000 transaction rows.',
    ],
    solution: [
      'Engineered an event-driven webhook ingestion pipeline with Redis queue buffering and idempotent database commits.',
      'Designed a normalized PostgreSQL schema with materialized views for fast multi-tenant aggregation.',
      'Built a responsive, keyboard-navigable React dashboard with granular cohort filtering and automated CSV/PDF report generation.',
    ],
    architecture: {
      frontend: 'React 19, Vite, Tailwind CSS, TanStack Query, Recharts',
      backend: 'Node.js, Express, BullMQ Queue Worker',
      database: 'PostgreSQL with Materialized Views & Redis Cache',
      integrations: ['Stripe Billing API & Webhooks', 'SendGrid transactional notifications', 'AWS S3 report exports'],
      infrastructure: 'Docker, AWS ECS Fargate, Cloudflare CDN',
    },
    tradeoffs: [
      'Chose asynchronous webhook processing with Redis over synchronous API roundtrips to prevent webhook timeout drops during flash sales.',
      'Opted for hourly refreshed materialized views for historical 2-year trend charts rather than live table scans, slashing query latency by 94%.',
    ],
    metrics: [
      { label: 'Query Latency', value: '< 180ms', context: 'Down from 4.2s on 500k records' },
      { label: 'Reconciliation', value: 'Real-time', context: 'Reduced from 48-hour manual batch cycles' },
      { label: 'Event Reliability', value: '99.98%', context: 'Over 2.4M webhooks processed without data loss' },
    ],
    tags: ['Next.js / React', 'Node.js', 'PostgreSQL', 'Stripe API', 'Redis'],
    featured: true,
    deliverables: [
      'Full-stack multi-tenant web application',
      'Idempotent Stripe webhook receiver with queue retry mechanism',
      'Automated cohort churn and MRR calculation engine',
      'Role-based access control (Admin, Manager, Read-only)',
      'Automated CI/CD pipeline and staging deployment configuration',
    ],
  },
  {
    id: 'documind',
    slug: 'documind-ai-document-intelligence',
    title: 'DocuMind AI Workflow',
    category: 'AI Application',
    eyebrow: 'ENTERPRISE DOCUMENT AUTOMATION',
    shortDescription:
      'AI-powered document extraction and semantic search platform converting unstructured contracts, invoices, and specs into validated JSON.',
    fullOverview:
      'A logistics and procurement consulting company needed to extract high-risk compliance clauses and pricing tables from hundreds of multi-page PDF supplier contracts every month. Manual verification took an average of 35 minutes per document.',
    targetUsers:
      'Procurement specialists, legal operations analysts, and compliance managers handling complex multi-page contracts.',
    clientContext:
      'Custom workflow engagement for a 50-person commercial logistics firm reviewing over 1,200 vendor agreements each quarter.',
    problem: [
      'Inconsistent document formats (scanned PDFs, Word files, varied vendor invoice layouts).',
      'Generic OCR tools failed to recognize table structure and nested rate tables.',
      'High hallucination risk when using standard non-grounded chat interfaces for financial contracts.',
    ],
    constraints: [
      'Data must be processed with strict privacy guidelines (no public model training).',
      'Confidence scoring required for every extracted field with explicit source line attribution.',
      'Human-in-the-loop review interface required for any field with confidence score below 92%.',
    ],
    solution: [
      'Built a hybrid pipeline combining PDF table bounding extraction with Gemini structured schema output.',
      'Implemented vector search with hybrid lexical matching (BM25 + embeddings) for instant contextual clause retrieval.',
      'Created an interactive side-by-side verification interface where users can click an extracted field to highlight the exact PDF coordinate.',
    ],
    architecture: {
      frontend: 'React, TypeScript, PDF.js rendering layer, Tailwind CSS',
      backend: 'Python FastAPI & Node.js orchestration proxy',
      database: 'PostgreSQL with pgvector for semantic retrieval',
      integrations: ['Google Gemini API (structured outputs)', 'Amazon Textract OCR fallback', 'Webhook sync to ERP'],
      infrastructure: 'Google Cloud Run, Cloud Storage, Redis caching',
    },
    tradeoffs: [
      'Used constrained JSON schema generation with strict type assertions rather than open-ended conversational prompts, completely eliminating format hallucinations.',
      'Pre-processed tables into Markdown representations before LLM ingestion, reducing token consumption by 62%.',
    ],
    metrics: [
      { label: 'Review Time', value: '4.2 min', context: 'Down from 35 min per contract' },
      { label: 'Extraction Accuracy', value: '98.4%', context: 'Across 18 standardized contract fields' },
      { label: 'Processing Cost', value: '$0.04', context: 'Average cost per 20-page document analysis' },
    ],
    tags: ['Gemini API', 'React', 'Python / FastAPI', 'pgvector', 'PDF Processing'],
    featured: true,
    deliverables: [
      'Side-by-side interactive PDF coordinate viewer and JSON editor',
      'Multi-stage extraction engine with confidence threshold routing',
      'Custom prompt templates with strict schema validation',
      'Audit log tracking every accepted and overridden field',
    ],
  },
  {
    id: 'logicore',
    slug: 'logicore-operational-system',
    title: 'LogiCore Operations Portal',
    category: 'Custom Operational System',
    eyebrow: 'SUPPLY CHAIN & DISPATCH',
    shortDescription:
      'Custom ERP and dispatch management system connecting distributed warehouse inventory, driver route dispatch, and invoice generation.',
    fullOverview:
      'A regional distribution company outgrew off-the-shelf software because their multi-stop dispatch requirements and custom pallet pricing models were unsupported. They needed a custom operational backbone tailored precisely to their staff workflows.',
    targetUsers:
      'Warehouse dispatchers, fleet supervisors, inventory clerks, and accounting personnel.',
    clientContext:
      'Regional distributor with 3 warehouse hubs, 28 commercial vehicles, and over 1,500 daily SKU shipments.',
    problem: [
      'Dispatchers were coordinating over phone calls and whiteboards, causing dispatch bottlenecks.',
      'Inventory counts drifted between the physical warehouse and accounting software.',
      'Invoices were generated days after delivery, causing late receivables.',
    ],
    constraints: [
      'Simple, high-contrast user interface designed for warehouse touch terminals and tablets.',
      'Reliable barcode scanner support via USB and Bluetooth input emulation.',
      'Offline-resilient scanning for spotty warehouse Wi-Fi dead zones.',
    ],
    solution: [
      'Architected a custom web portal with reactive state management, barcode input handlers, and live driver manifest updates.',
      'Built a robust Laravel/PHP and Node backend with atomic database transactions preventing negative inventory states.',
      'Integrated automated digital Proof-of-Delivery signatures and instant invoice dispatch upon order completion.',
    ],
    architecture: {
      frontend: 'React, Tailwind CSS, PWA offline caching layer',
      backend: 'Laravel 11 REST API & Node.js WebSocket notification microservice',
      database: 'MySQL with row-level locking on inventory stock registers',
      integrations: ['Google Maps Route Matrix API', 'Twilio SMS driver notifications', 'QuickBooks Online API'],
      infrastructure: 'Ubuntu VPS, Nginx, Redis, Supervisor daemon processes',
    },
    tradeoffs: [
      'Prioritized optimistic UI updates with local IndexedDB queuing so warehouse staff never wait on network latency while scanning pallets.',
      'Restricted custom route optimization to regional clusters rather than dynamic full-recalculation to maintain deterministic departure windows.',
    ],
    metrics: [
      { label: 'Dispatch Cycle', value: '18 min', context: 'Down from 55 min per driver departure' },
      { label: 'Stock Discrepancy', value: '0.12%', context: 'Reduced from 3.8% prior to barcode integration' },
      { label: 'Days Sales Outstanding', value: '-14 Days', context: 'Faster receivables through immediate invoicing' },
    ],
    tags: ['Laravel', 'React', 'REST APIs', 'MySQL', 'WebSockets', 'PWA'],
    featured: true,
    deliverables: [
      'Mobile-responsive warehouse scanner interface',
      'Dispatcher route sequencing and vehicle loading board',
      'Audit trail tracking every SKU stock movement',
      'Automated accounting sync with QuickBooks Online',
    ],
  },
  {
    id: 'kinetix',
    slug: 'kinetix-client-portal',
    title: 'Kinetix Client Workspace',
    category: 'Web Application',
    eyebrow: 'COLLABORATIVE DELIVERY PLATFORM',
    shortDescription:
      'Client onboarding and milestone-based project delivery portal with real-time feedback threads, file deliverables, and escrow milestone release.',
    fullOverview:
      'An engineering consultancy wanted to replace fragmented email and Slack threads with a clean, branded client delivery portal. The goal was to elevate client experience, clarify milestone deliverables, and speed up sign-offs.',
    targetUsers:
      'Consultancy clients, project managers, and lead technical deliverables engineers.',
    clientContext:
      'High-touch professional services firm delivering technical advisory to non-technical enterprise executives.',
    problem: [
      'Approval requests were lost in lengthy email threads, delaying project milestone payments.',
      'Clients felt out of the loop between scheduled sprint update calls.',
      'Confidential deliverables were floating across unmonitored Google Drive and Dropbox links.',
    ],
    constraints: [
      'Brandable client workspace with zero learning curve for corporate executives.',
      'Granular permission boundaries between public feedback and internal team comments.',
      'Automated reminder cadences that do not sound robotic or aggressive.',
    ],
    solution: [
      'Created a single-page collaborative workspace with milestone progress tracking, inline asset previews, and approval buttons.',
      'Engineered an encrypted asset delivery vault with expiring pre-signed S3 download URLs.',
      'Built interactive milestone timelines with automated weekly summary digests.',
    ],
    architecture: {
      frontend: 'React 19, Tailwind CSS, Motion for React, Lucide icons',
      backend: 'Node.js, Express, PostgreSQL',
      database: 'PostgreSQL with row-level security',
      integrations: ['Stripe Escrow Release', 'AWS S3 (pre-signed signed URLs)', 'Resend email API'],
      infrastructure: 'Vercel + Railway, Cloudflare security proxy',
    },
    tradeoffs: [
      'Built a focused milestone approval workflow instead of replicating bloated project management tools like Jira or Asana.',
      'Enforced passwordless magic link authentication to maximize client login completion rates.',
    ],
    metrics: [
      { label: 'Sign-off Time', value: '1.4 days', context: 'Reduced from 8.6 days via email' },
      { label: 'Client Retention', value: '+34%', context: 'Reported client NPS increased from 52 to 78' },
      { label: 'Thread Redundancy', value: '-70%', context: 'Consolidated into structured task activity' },
    ],
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    featured: false,
    deliverables: [
      'Executive client portal with live milestone progress indicators',
      'Secure asset upload and encrypted download management',
      'One-click client sign-off with audit timestamping',
      'Email digest engine notifying clients of critical project milestones',
    ],
  },
];
