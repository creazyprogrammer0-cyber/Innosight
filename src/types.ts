export type ViewRoute = 'home' | 'work' | 'services' | 'about' | 'insights' | 'contact';

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
