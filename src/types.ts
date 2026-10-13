export type ViewRoute = 'home' | 'work' | 'services' | 'about' | 'insights' | 'contact' | 'admin';

export interface Project {
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
  featured: boolean;
  deliverables: string[];
}

export interface ServiceItem {
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
}

export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  publishedDate: string;
  content: {
    introduction: string;
    sections: {
      heading: string;
      paragraphs: string[];
      keyTakeaways?: string[];
    }[];
    conclusion: string;
  };
}

export interface CredentialStat {
  label: string;
  value: string;
  detail: string;
}

export type TeamDepartment =
  | 'All'
  | 'Leadership & Architecture'
  | 'Engineering'
  | 'Design & UX'
  | 'AI & Data'
  | 'Cloud & DevOps';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: TeamDepartment;
  isLead?: boolean;
  avatar: string;
  avatarFallbacks?: string[];
  fallbackInitials: string;
  experience: string;
  bio: string;
  detailedBio?: string;
  badges: string[];
  skills: string[];
  metrics?: {
    label: string;
    value: string;
  };
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}
