import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, ServiceItem, InsightArticle } from '../types';
import { projectsData as fallbackProjects } from '../data/projectsData';
import { servicesData as fallbackServices } from '../data/servicesData';
import { insightsData as fallbackArticles } from '../data/insightsData';
import { clientStorage } from '../services/clientStorage';

export interface TestimonialItem {
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
}

interface CmsContextType {
  projects: Project[];
  services: ServiceItem[];
  articles: InsightArticle[];
  testimonials: TestimonialItem[];
  homepage: HomepageConfig;
  siteSettings: SiteSettingsConfig;
  isLoading: boolean;
  refreshContent: () => Promise<void>;
}

const defaultHomepage: HomepageConfig = {
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
};

const defaultSettings: SiteSettingsConfig = {
  siteTitle: 'Innosight — Full-Stack Developer & Technical Partner',
  defaultMetaDescription: 'Personal developer portfolio of Jannatul. Custom software engineering, SaaS development, and practical AI integrations for ambitious founders.',
  contactEmail: 'contact@innosight.dev',
  socialGithub: 'https://github.com/creazyprogrammer0-cyber',
  socialLinkedin: 'https://linkedin.com',
  socialTwitter: 'https://x.com',
  announcementBanner: {
    enabled: true,
    text: '🚀 Currently booking Q2-Q3 engineering sprints and architecture advisory.',
    link: '#contact',
  },
};

const defaultTestimonials: TestimonialItem[] = [
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
  },
];

const CmsContext = createContext<CmsContextType>({
  projects: fallbackProjects,
  services: fallbackServices,
  articles: fallbackArticles,
  testimonials: defaultTestimonials,
  homepage: defaultHomepage,
  siteSettings: defaultSettings,
  isLoading: false,
  refreshContent: async () => {},
});

export const CmsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => clientStorage.getProjects(true));
  const [services, setServices] = useState<ServiceItem[]>(() => clientStorage.getServices(true));
  const [articles, setArticles] = useState<InsightArticle[]>(() => clientStorage.getArticles(true));
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => clientStorage.getTestimonials(true));
  const [homepage, setHomepage] = useState<HomepageConfig>(() => clientStorage.getHomepage());
  const [siteSettings, setSiteSettings] = useState<SiteSettingsConfig>(() => clientStorage.getSiteSettings());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const syncFromClientStorage = () => {
    try {
      const p = clientStorage.getProjects(true);
      if (Array.isArray(p) && p.length > 0) setProjects(p);
      const s = clientStorage.getServices(true);
      if (Array.isArray(s) && s.length > 0) setServices(s);
      const a = clientStorage.getArticles(true);
      if (Array.isArray(a) && a.length > 0) setArticles(a);
      const t = clientStorage.getTestimonials(true);
      if (Array.isArray(t) && t.length > 0) setTestimonials(t);
      const h = clientStorage.getHomepage();
      if (h && h.heroTitle) setHomepage(h);
      const st = clientStorage.getSiteSettings();
      if (st && st.siteTitle) setSiteSettings(st);
    } catch {}
  };

  const fetchPublicContent = async () => {
    try {
      const res = await fetch('/api/public/content');
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && !contentType.includes('text/html')) {
        const data = await res.json();
        if (Array.isArray(data.projects) && data.projects.length > 0) {
          setProjects(data.projects);
        }
        if (Array.isArray(data.services) && data.services.length > 0) {
          setServices(data.services);
        }
        if (Array.isArray(data.articles) && data.articles.length > 0) {
          setArticles(data.articles);
        }
        if (Array.isArray(data.testimonials) && data.testimonials.length > 0) {
          setTestimonials(data.testimonials);
        }
        if (data.homepage && data.homepage.heroTitle) {
          setHomepage(data.homepage);
        }
        if (data.siteSettings && data.siteSettings.siteTitle) {
          setSiteSettings(data.siteSettings);
        }
      } else {
        // Fall back to client-side database
        syncFromClientStorage();
      }
    } catch {
      // Graceful fallback to client storage data
      syncFromClientStorage();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicContent();

    const handleCmsUpdate = () => {
      syncFromClientStorage();
    };

    window.addEventListener('innosight_cms_updated', handleCmsUpdate);
    return () => window.removeEventListener('innosight_cms_updated', handleCmsUpdate);
  }, []);

  return (
    <CmsContext.Provider
      value={{
        projects,
        services,
        articles,
        testimonials,
        homepage,
        siteSettings,
        isLoading,
        refreshContent: fetchPublicContent,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => useContext(CmsContext);
