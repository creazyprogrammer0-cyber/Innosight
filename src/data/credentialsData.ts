export interface CredentialMetric {
  value: string;
  label: string;
  context: string;
}

export const credentialsData = {
  fiverrRating: '4.9/5',
  ordersCompleted: '799',
  uniqueClients: '637',
  reportedEarnings: '$162,784',
  yearsExperience: '9+',
  fiverrTier: 'Top Rated Seller',
  fiverrProfileUrl: 'https://www.fiverr.com/jannatul', // Verified owner identity link placeholder
  languages: [
    { name: 'English', proficiency: 'Professional Working Proficiency' },
    { name: 'Bengali', proficiency: 'Native' },
  ],
  verifiedMetrics: [
    {
      value: '4.9 / 5.0',
      label: 'Fiverr Client Rating',
      context: 'Across 799 completed client orders on Fiverr marketplace',
    },
    {
      value: '799',
      label: 'Orders Delivered',
      context: 'Custom web apps, API integrations, and software solutions',
    },
    {
      value: '637',
      label: 'Unique Clients',
      context: 'Startup founders, SMB owners, and product teams worldwide',
    },
    {
      value: '9+ Years',
      label: 'Development Craft',
      context: 'Full-stack engineering, production systems, and modern web architectures',
    },
  ] as CredentialMetric[],
  techStackCore: [
    { category: 'Frontend', items: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'TanStack Query'] },
    { category: 'Backend & APIs', items: ['Node.js', 'Express', 'Laravel / PHP', 'RESTful APIs', 'WebSockets', 'GraphQL'] },
    { category: 'Databases & Cache', items: ['PostgreSQL', 'MySQL', 'Redis', 'pgvector', 'Prisma', 'Drizzle'] },
    { category: 'AI & Data Processing', items: ['Google Gemini API', 'Structured JSON Outputs', 'RAG / Vector Search', 'PDF.js Parsing'] },
    { category: 'Cloud & Infrastructure', items: ['Docker', 'AWS (S3, ECS)', 'Google Cloud Run', 'Vercel', 'Nginx', 'CI/CD Pipelines'] },
    { category: 'Integrations & Payments', items: ['Stripe Billing & Webhooks', 'SendGrid', 'Twilio', 'QuickBooks API', 'OAuth 2.0'] },
  ],
  approachStages: [
    {
      step: '01',
      title: 'Understand',
      lead: 'Clarify the business objective, target users, requirements, and constraints.',
      detail:
        'We unpack what the product actually needs to achieve for your business. Rather than accepting vague feature lists, we define the exact customer job, operational bottlenecks, and core value proposition.',
      deliverables: 'Architecture brief, project scope outline, risk matrix',
    },
    {
      step: '02',
      title: 'Define',
      lead: 'Prioritize the MVP, establish scope, and identify important technical trade-offs.',
      detail:
        'Ruthlessly identify what must be built now versus what can wait for phase two. We document the data schema, chosen stack, authentication approach, third-party dependencies, and sprint milestones.',
      deliverables: 'Database schema draft, milestone breakdown, API contract specifications',
    },
    {
      step: '03',
      title: 'Build',
      lead: 'Develop the experience and system in manageable, transparent milestones.',
      detail:
        'Iterative development with clean, typed code and continuous staging access. You see real progress every week rather than waiting in the dark until the end of the project.',
      deliverables: 'Working code repository, live staging URL, weekly milestone demos',
    },
    {
      step: '04',
      title: 'Validate',
      lead: 'Test functionality, responsive behavior, integrations, security, and edge cases.',
      detail:
        'Comprehensive testing across desktop, tablet, and mobile viewport widths. We test real payment events, rate limits, schema validation, permission checks, and edge-case errors.',
      deliverables: 'Cross-browser audit, load testing results, security check checklist',
    },
    {
      step: '05',
      title: 'Launch & Improve',
      lead: 'Deploy, monitor, collect feedback, and plan future iterations.',
      detail:
        'Zero-downtime production deployment with CDN caching, SSL certificates, error logging (Sentry), and performance monitoring. Includes a 30-day post-launch warranty and handoff walkthrough.',
      deliverables: 'Production deployment, environment documentation, video walkthrough handoff',
    },
  ],
  engineeringPillars: [
    {
      title: 'Product Thinking',
      description:
        'A great software engineer does not simply write code to spec. They interrogate user needs, question unnecessary complexity, prioritize MVP velocity, and build workflows that feel effortless to end-users.',
      traits: ['User journey clarity', 'Scope discipline', 'Low-friction UX', 'Business objective alignment'],
    },
    {
      title: 'Engineering Rigor',
      description:
        'Code that works today must remain maintainable next year. I design normalized database schemas, enforce strict TypeScript types, handle edge-case errors, and build modular components that can evolve smoothly.',
      traits: ['Type-safe architectures', 'Idempotent webhook handlers', 'Fast sub-200ms queries', 'Secure authentication boundaries'],
    },
    {
      title: 'Collaboration & Trust',
      description:
        'No ghosting, no jargon fog, and no hidden surprises. I provide weekly milestone demos, transparent asynchronous updates, clear risk flags early, and dependable delivery that respects your capital and timelines.',
      traits: ['Weekly demo check-ins', 'Transparent trade-off discussions', 'Zero technical jargon fog', 'Documented repository handoff'],
    },
  ],
};
