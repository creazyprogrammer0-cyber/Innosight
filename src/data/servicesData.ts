import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'saas-development',
    slug: 'saas-development',
    title: 'SaaS and Custom Software',
    tagline: 'From founder concept to production-ready multi-user application.',
    description:
      'Build customer portals, dashboards, multi-user platforms, and tailored applications around your business workflows.',
    idealFor: [
      'Startup founders validating a new software business with a focused MVP.',
      'Established businesses outgrowing spreadsheets, Airtable, or off-the-shelf tools.',
      'Operators needing a tailored internal portal that matches their exact operational workflow.',
    ],
    problemsSolved: [
      'Preventing messy architecture that collapses when subscriber count starts scaling.',
      'Integrating recurring billing (Stripe, LemonSqueezy) with proper subscription lifecycle webhooks.',
      'Establishing multi-tenant security, tenant data boundaries, and role-based permissions.',
      'Building performant dashboards that remain fast even as records grow into hundreds of thousands.',
    ],
    capabilities: [
      'Full-stack architecture design (React/Next.js frontend + Node/Laravel backend)',
      'Multi-tenant data modeling and PostgreSQL/MySQL database schema design',
      'Stripe subscription billing, invoice generation, customer portals, and webhooks',
      'Role-based access control (RBAC), team permissions, and invitation flows',
      'Responsive, high-density data tables with sorting, filtering, and exports',
      'Docker containerization, automated testing, and CI/CD deployment pipelines',
    ],
    deliverables: [
      'Production-ready codebase with clean TypeScript types and documentation',
      'Fully configured production and staging environments on AWS / Vercel / Railway',
      'Secure authentication flow (email/password, OAuth, magic links)',
      'Admin operations dashboard for customer management and metrics',
      '30-day post-launch warranty and handoff walkthrough for your team',
    ],
    techStack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Laravel', 'Stripe', 'Docker'],
    faq: [
      {
        question: 'How long does a typical SaaS MVP take to build?',
        answer:
          'A focused, well-scoped MVP typically takes 4 to 8 weeks. We ruthlessly prioritize the core value proposition first, get it into users’ hands, and avoid burning runway on non-essential bells and whistles.',
      },
      {
        question: 'Who owns the intellectual property and code?',
        answer:
          'You own 100% of the code, intellectual property, repository access, and database credentials from day one. Everything is handed over with clear documentation.',
      },
      {
        question: 'Can you work with my existing technical team or codebase?',
        answer:
          'Yes. I regularly collaborate with existing teams to architect new modules, refactor slow query paths, or take over delivery as a dedicated technical partner.',
      },
    ],
  },
  {
    id: 'ai-development',
    slug: 'ai-development',
    title: 'AI-Powered Applications',
    tagline: 'Practical AI systems grounded in real data, not generic chat gimmicks.',
    description:
      'Integrate AI into useful workflows, from document processing and intelligent assistance to practical business automation.',
    idealFor: [
      'Companies drowning in manual document analysis, invoice extraction, or content tagging.',
      'Founders building AI-native products with domain-specific knowledge bases.',
      'Product teams wanting to add intelligent summaries, classification, or search to existing software.',
    ],
    problemsSolved: [
      'Eliminating hallucinations by enforcing strict structured JSON outputs and source citations.',
      'Preventing runaway LLM token costs through intelligent prompt caching and hybrid retrieval.',
      'Structuring unstructured inputs (PDFs, scans, contracts, support emails) into clean databases.',
      'Creating human-in-the-loop review interfaces for edge cases and low-confidence predictions.',
    ],
    capabilities: [
      'Integration with Google Gemini API, OpenAI, Anthropic, and local models via Ollama',
      'Structured schema generation with JSON schema validation and deterministic typing',
      'Semantic search and vector embeddings with pgvector or dedicated vector databases',
      'Multi-page PDF parsing, OCR integration, and table structure reconstruction',
      'Prompt engineering with version control, automated regression evaluation, and caching',
      'Cost-optimization routing (directing simple queries to fast models, complex reasoning to flagship models)',
    ],
    deliverables: [
      'End-to-end AI pipeline integrated into your core application or standalone service',
      'Side-by-side human review and verification UI with interactive citation highlighting',
      'Automated rate-limiting, token tracking, and error retry fallbacks',
      'Comprehensive system prompt suite with automated schema test cases',
    ],
    techStack: ['Gemini API', 'TypeScript', 'Python / FastAPI', 'pgvector', 'LangChain', 'PDF.js', 'PostgreSQL'],
    faq: [
      {
        question: 'How do you prevent the AI from making things up (hallucinating)?',
        answer:
          'We use constrained structured outputs with strict JSON schemas, hybrid retrieval-augmented generation (RAG) that restricts the context to your verified documents, and confidence score thresholds that flag uncertain outputs for human review.',
      },
      {
        question: 'Will my company or client data be used to train public models?',
        answer:
          'No. We exclusively utilize enterprise and API endpoints governed by strict zero-data-retention and commercial privacy terms where user data is never used for model training.',
      },
      {
        question: 'How do you manage ongoing API costs as usage grows?',
        answer:
          'We implement strict token budget caps, prompt compression, response caching, and intelligent tiered model routing so that everyday tasks use lightweight models while flagship models are reserved for complex synthesis.',
      },
    ],
  },
  {
    id: 'custom-software',
    slug: 'custom-software',
    title: 'Web Applications and Integrations',
    tagline: 'Modernize legacy workflows, bridge disconnected APIs, and scale your systems.',
    description:
      'Develop responsive web experiences, connect external services, improve existing systems, and maintain applications.',
    idealFor: [
      'Businesses frustrated by disconnected tools (CRM, ERP, payment gateways, accounting) that don’t talk to each other.',
      'Companies needing a custom customer-facing portal or partner interface.',
      'Product owners needing to modernize slow, outdated web applications with responsive modern code.',
    ],
    problemsSolved: [
      'Manual duplicate data entry between disparate commercial software services.',
      'Slow, unmaintained legacy codebases suffering from security vulnerabilities and sluggish load times.',
      'Unreliable third-party webhooks and brittle custom scripts that fail silently.',
      'Poor mobile and tablet usability for operational staff in the field.',
    ],
    capabilities: [
      'Robust REST & GraphQL API design with OpenAPI documentation and rate limits',
      'Third-party software integrations (QuickBooks, HubSpot, Salesforce, Twilio, Google Workspace)',
      'Legacy application refactoring and modernization (PHP/Laravel, Node.js, React)',
      'Database query optimization, indexing, and connection pool management',
      'Offline-resilient web applications (Progressive Web Apps) for field operations',
      'Automated monitoring, error tracking (Sentry), and proactive health alert setups',
    ],
    deliverables: [
      'Custom web application or integration middleware microservice',
      'Detailed API documentation and Postman / OpenAPI collections',
      'Automated webhook receiver with dead-letter queue recovery',
      'Performance audit report showing before/after Core Web Vitals and query latency',
      'Comprehensive maintenance roadmap and deployment documentation',
    ],
    techStack: ['React', 'Laravel', 'Node.js', 'Express', 'MySQL', 'PostgreSQL', 'Redis', 'Nginx', 'Docker'],
    faq: [
      {
        question: 'Can you connect our custom software to external tools like QuickBooks or HubSpot?',
        answer:
          'Yes. I have extensive experience building bi-directional API synchronizations with token refresh handling, webhook event idempotency, and automated discrepancy reconciliation.',
      },
      {
        question: 'What happens if an external API goes down or changes its format?',
        answer:
          'We architect resilient integrations with background retry queues, circuit-breaker patterns, error logging, and alert notifications so that temporary external downtime never crashes your core platform.',
      },
      {
        question: 'Do you offer ongoing support after project completion?',
        answer:
          'Yes. Every project includes a 30-day warranty period for bug fixes. Beyond that, I offer flexible monthly retainers for active feature development, performance monitoring, and security updates.',
      },
    ],
  },
];
