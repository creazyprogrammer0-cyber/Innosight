import { TeamMember } from '../types';

/**
 * ============================================================================
 * INNOSIGHT TEAM CONFIGURATION (TEMPLATE-STYLE FOR EASY EDITING)
 * ============================================================================
 *
 * HOW TO CUSTOMIZE:
 * 1. CHANGE JANNATUL'S PICTURE:
 *    - Put your image file in `public/images/team/jannatul.png` or `public/image.png`
 *    - Or edit `avatar` property for 'jannatul' below to any public URL or file path.
 *
 * 2. ADD A NEW MEMBER:
 *    - Simply duplicate one of the member objects below.
 *    - Give it a unique `id` (e.g. 'alex-smith').
 *    - Assign a department, bio, skills, and image.
 *
 * 3. REMOVE OR REORDER MEMBERS:
 *    - Move items up or down in the `teamMembers` array below.
 * ============================================================================
 */

export const teamMembers: TeamMember[] = [
  {
    id: 'jannatul',
    name: 'Jannatul Ferdous',
    role: 'Founder & Principal Systems Architect',
    department: 'Leadership & Architecture',
    isLead: true,
    // Primary avatar path matching the uploaded image, with multiple fallbacks
    avatar: '/images/team/jannatul.svg',
    avatarFallbacks: [
      '/images/team/jannatul.png',
      '/image.png',
      '/jannatul.png',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    ],
    fallbackInitials: 'JF',
    experience: '9+ Years Experience',
    bio: 'Full-stack developer and software partner specialized in high-performance SaaS platforms, custom operational business software, and practical AI automation systems.',
    detailedBio:
      'Over 9+ years of dedicated software engineering craft, serving 637 unique clients and delivering 799 verified milestones. Partners directly with non-technical founders to architect scalable web infrastructure, eliminate technical debt, and translate high-level product visions into revenue-ready code.',
    badges: ['Founder', 'Principal Architect', 'Top Rated (4.9★)'],
    skills: [
      'Full-Stack Architecture',
      'React & TypeScript',
      'Node.js & Express',
      'Python & FastAPI',
      'PostgreSQL & Redis',
      'Practical AI Workflows',
      'Cloud Deployment',
    ],
    metrics: {
      label: 'Delivered Milestones',
      value: '799+',
    },
    socials: {
      github: 'https://github.com/creazyprogrammer0-cyber',
      linkedin: 'https://www.linkedin.com',
      email: 'jannatul@innosight.cloud',
    },
  },
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Senior Systems & Backend Engineer',
    department: 'Engineering',
    isLead: false,
    avatar: '/images/team/marcus.svg',
    avatarFallbacks: [
      '/images/team/marcus.png',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    ],
    fallbackInitials: 'MV',
    experience: '7+ Years Experience',
    bio: 'Engineers resilient distributed backends, transactional database schemas, and low-latency queuing architectures designed to process millions of webhook events without data loss.',
    detailedBio:
      'Marcus specializes in high-concurrency Node.js and Go microservices, database partitioning, and real-time event streaming. Prior to Innosight, he engineered core billing pipelines and warehouse orchestration systems.',
    badges: ['Systems Lead', 'Database Specialist'],
    skills: [
      'Go & Node.js',
      'PostgreSQL / Supabase',
      'Redis & BullMQ Queues',
      'REST & GraphQL APIs',
      'Docker & Containerization',
      'Webhook Idempotency',
    ],
    metrics: {
      label: 'Average API Latency',
      value: '< 45ms',
    },
    socials: {
      github: 'https://github.com',
      linkedin: 'https://www.linkedin.com',
    },
  },
  {
    id: 'sophia-chen',
    name: 'Sophia Chen',
    role: 'Lead Product & UX/UI Designer',
    department: 'Design & UX',
    isLead: false,
    avatar: '/images/team/sophia.svg',
    avatarFallbacks: [
      '/images/team/sophia.png',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    ],
    fallbackInitials: 'SC',
    experience: '6+ Years Experience',
    bio: 'Designs dense, intuitive SaaS dashboards and conversion-focused customer interfaces. Translates complex founder logic into clean design systems and accessible user workflows.',
    detailedBio:
      'Sophia bridges the divide between visual craft and software engineering. She builds production-grade Figma design tokens that map 1:1 with Tailwind CSS components, ensuring zero translation friction during sprint execution.',
    badges: ['Design Lead', 'Design Systems'],
    skills: [
      'SaaS UX/UI Architecture',
      'Design Token Systems',
      'Figma & Prototyping',
      'Tailwind CSS & Motion',
      'Accessibility (WCAG 2.1)',
      'Conversion Rate Optimization',
    ],
    metrics: {
      label: 'Design System Token Coverage',
      value: '100%',
    },
    socials: {
      github: 'https://github.com',
      linkedin: 'https://www.linkedin.com',
    },
  },
  {
    id: 'devon-miller',
    name: 'Devon Miller',
    role: 'AI & Machine Learning Solutions Engineer',
    department: 'AI & Data',
    isLead: false,
    avatar: '/images/team/devon.svg',
    avatarFallbacks: [
      '/images/team/devon.png',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    ],
    fallbackInitials: 'DM',
    experience: '5+ Years Experience',
    bio: 'Specialized in schema-constrained LLM extractors, pgvector semantic search engines, and deterministic automated agents that deliver production-grade reliability.',
    detailedBio:
      'Devon builds high-accuracy document intelligence pipelines, custom retrieval-augmented generation (RAG) indices, and multi-model fallbacks. Focuses on preventing hallucinations through rigid JSON typing and validation harnesses.',
    badges: ['AI Solutions', 'LLM Architect'],
    skills: [
      'Gemini & LLM Integration',
      'pgvector & Embeddings',
      'Python & Pydantic',
      'Document Parsing & OCR',
      'RAG Optimization',
      'Cost & Token Analytics',
    ],
    metrics: {
      label: 'Extraction Precision',
      value: '98.4%',
    },
    socials: {
      github: 'https://github.com',
      linkedin: 'https://www.linkedin.com',
    },
  },
  {
    id: 'amina-patel',
    name: 'Amina Patel',
    role: 'Cloud DevOps & Site Reliability Engineer',
    department: 'Cloud & DevOps',
    isLead: false,
    avatar: '/images/team/amina.svg',
    avatarFallbacks: [
      '/images/team/amina.png',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    ],
    fallbackInitials: 'AP',
    experience: '6+ Years Experience',
    bio: 'Guarantees rock-solid production availability through automated CI/CD deployment pipelines, zero-downtime database migrations, and proactive cloud observability.',
    detailedBio:
      'Amina manages cloud infrastructure across AWS, GCP, and Vercel. She implements automated security auditing, secrets management, and automated disaster recovery protocols so founder applications scale smoothly under spike loads.',
    badges: ['SRE Lead', 'Cloud Architect'],
    skills: [
      'CI/CD GitHub Actions',
      'AWS & Google Cloud Platform',
      'Docker & Kubernetes',
      'PostgreSQL Backups & Replication',
      'Cloudflare & Edge Routing',
      'Zero-Downtime Releases',
    ],
    metrics: {
      label: 'Platform Reliability SLA',
      value: '99.98%',
    },
    socials: {
      github: 'https://github.com',
      linkedin: 'https://www.linkedin.com',
    },
  },
];

/**
 * Quick helper functions for team querying & template rendering
 */
export const getFounder = (): TeamMember => {
  return teamMembers.find((m) => m.isLead) || teamMembers[0];
};

export const getCoreTeamMembers = (): TeamMember[] => {
  return teamMembers.filter((m) => !m.isLead);
};

export const getTeamDepartments = (): string[] => {
  return ['All', 'Leadership & Architecture', 'Engineering', 'Design & UX', 'AI & Data', 'Cloud & DevOps'];
};
