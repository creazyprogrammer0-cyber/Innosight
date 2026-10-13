import { projectsData } from '../data/projectsData';
import { servicesData } from '../data/servicesData';
import { insightsData } from '../data/insightsData';
import { Project, ServiceItem, InsightArticle } from '../types';

export interface LocalUser {
  id: string;
  email: string;
  username: string;
  role: 'admin' | 'editor';
}

export interface LocalTestimonial {
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

export interface LocalMedia {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  altText: string;
  createdAt: string;
}

export interface LocalAuditLog {
  id: string;
  timestamp: string;
  actorEmail: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  details: string;
  outcome: 'success' | 'failure';
}

export interface LocalDatabaseSchema {
  version: number;
  projects: any[];
  services: any[];
  articles: any[];
  testimonials: LocalTestimonial[];
  homepage: any;
  siteSettings: any;
  media: LocalMedia[];
  auditLogs: LocalAuditLog[];
}

const STORAGE_KEY = 'innosight_cms_local_db_v2';
const EVENT_NAME = 'innosight_cms_updated';

function getInitialLocalData(): LocalDatabaseSchema {
  return {
    version: 2,
    projects: projectsData.map((p, idx) => ({
      ...p,
      status: 'published',
      featured: true,
      order: idx + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
    services: servicesData.map((s, idx) => ({
      ...s,
      status: 'published',
      featured: true,
      order: idx + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
    articles: insightsData.map((a, idx) => ({
      ...a,
      status: 'published',
      featured: idx === 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
    testimonials: [
      {
        id: 'test_01',
        quote:
          'Jannatul stepped in when our previous agency stalled for two months. Within three weeks, we had an entirely functional inventory synchronization system running in staging. The architectural clarity and speed was unlike anything we experienced before.',
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
        quote:
          'Working with Innosight felt like having a senior staff architect embedded in our core team. The AI document parsing system they built cut our accounting invoice turnaround from 4 business days to under 4 minutes with 98% accuracy.',
        clientName: 'Elena Rostova',
        clientRole: 'Co-Founder & COO',
        clientCompany: 'FinBridge Operations',
        verified: true,
        metric: '98.4% OCR Accuracy',
        order: 2,
        status: 'published',
      },
    ],
    homepage: {
      heroEyebrow: 'Full-Stack Software Architecture & Execution',
      heroTitle: 'Transforming Complex Product Ideas into High-Performance Software',
      heroDescription:
        'Technical partner for ambitious founders and established teams. Custom SaaS development, enterprise web systems, and grounded AI workflow integrations engineered with precision.',
      primaryCtaText: 'Discuss Your Project',
      primaryCtaLink: '#contact',
      secondaryCtaText: 'Explore Selected Work',
      secondaryCtaLink: '#work',
      servicesHeading: 'Engineered for Performance & Business Impact',
      servicesDescription:
        'From high-concurrency SaaS platforms to automated AI document workflows, every system is built with bulletproof data integrity, clean architecture, and rapid deployment velocity.',
      aboutHeadline: 'Personal Technical Partner, Not a Bloated Agency',
      aboutBody:
        'I partner directly with founders and technical leaders to design, build, and deploy production software that scales. No junior handoffs, no bureaucratic communication layers—just senior-level engineering execution from day one.',
      aboutPortrait: '/images/team/jannatul.svg',
      finalCtaHeadline: 'Ready to Architect Your Next Production System?',
      finalCtaBody:
        'Whether you need a full SaaS MVP engineered from scratch or a high-concurrency pipeline modernized, let us discuss your technical requirements and timeline.',
    },
    siteSettings: {
      siteTitle: 'Innosight — Full-Stack Developer & Technical Partner',
      defaultMetaDescription:
        'Personal developer portfolio of Jannatul. Custom software engineering, SaaS development, and practical AI integrations for ambitious founders.',
      contactEmail: 'contact@innosight.dev',
      socialGithub: 'https://github.com/creazyprogrammer0-cyber',
      socialLinkedin: 'https://linkedin.com',
      socialTwitter: 'https://x.com',
      announcementBanner: {
        enabled: true,
        text: '🚀 Currently booking Q2-Q3 engineering sprints and architecture advisory.',
        link: '#contact',
      },
      updatedAt: new Date().toISOString(),
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
        createdAt: new Date().toISOString(),
      },
    ],
    auditLogs: [
      {
        id: 'aud_init_01',
        timestamp: new Date().toISOString(),
        actorEmail: 'system@innosight.dev',
        action: 'STORAGE_INITIALIZED',
        resourceType: 'system',
        details: 'Client-side persistent database initialized with production portfolio content.',
        outcome: 'success',
      },
    ],
  };
}

class ClientStorageService {
  private db: LocalDatabaseSchema | null = null;

  private load(): LocalDatabaseSchema {
    if (typeof window === 'undefined') {
      return getInitialLocalData();
    }
    if (this.db) {
      return this.db;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.projects && parsed.homepage) {
          this.db = parsed;
          return this.db!;
        }
      }
    } catch (e) {
      console.warn('[ClientStorage] Error loading local storage:', e);
    }
    const initial = getInitialLocalData();
    this.saveToStorage(initial);
    this.db = initial;
    return this.db;
  }

  private saveToStorage(data: LocalDatabaseSchema) {
    this.db = data;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: data }));
      } catch (e) {
        console.error('[ClientStorage] Failed saving to localStorage:', e);
      }
    }
  }

  public authenticate(email: string, pass: string): LocalUser | null {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Default system credentials
    if (cleanEmail === 'admin@innosight.dev' && (cleanPass === 'Innosight2026!' || cleanPass === 'innosight2026!')) {
      this.logAudit('USER_LOGIN', 'auth', `Admin ${cleanEmail} authenticated via client storage`, 'success');
      return { id: 'usr_admin_01', email: cleanEmail, username: 'admin', role: 'admin' };
    }

    if (cleanEmail === 'editor@innosight.dev' && (cleanPass === 'Innosight2026!' || cleanPass === 'innosight2026!')) {
      this.logAudit('USER_LOGIN', 'auth', `Editor ${cleanEmail} authenticated via client storage`, 'success');
      return { id: 'usr_editor_01', email: cleanEmail, username: 'editor', role: 'editor' };
    }

    // Check custom credentials in site settings if configured
    const db = this.load();
    if (
      db.siteSettings?.customAdminEmail &&
      cleanEmail === db.siteSettings.customAdminEmail.toLowerCase() &&
      db.siteSettings?.customAdminPassword &&
      cleanPass === db.siteSettings.customAdminPassword
    ) {
      this.logAudit('USER_LOGIN', 'auth', `Custom Admin ${cleanEmail} authenticated`, 'success');
      return { id: 'usr_custom_01', email: cleanEmail, username: 'admin', role: 'admin' };
    }

    this.logAudit('USER_LOGIN', 'auth', `Failed login attempt for ${cleanEmail}`, 'failure');
    return null;
  }

  public getOverview() {
    const db = this.load();
    const projects = db.projects || [];
    const services = db.services || [];
    const articles = db.articles || [];
    const testimonials = db.testimonials || [];

    return {
      totalProjects: projects.length,
      publishedProjects: projects.filter((p) => p.status === 'published').length,
      draftProjects: projects.filter((p) => p.status === 'draft').length,
      archivedProjects: projects.filter((p) => p.status === 'archived').length,
      totalServices: services.length,
      publishedServices: services.filter((s) => s.status === 'published').length,
      totalArticles: articles.length,
      publishedArticles: articles.filter((a) => a.status === 'published').length,
      draftArticles: articles.filter((a) => a.status === 'draft').length,
      totalTestimonials: testimonials.length,
      mediaCount: (db.media || []).length,
      recentAudit: (db.auditLogs || []).slice(0, 10),
    };
  }

  // Projects
  public getProjects(onlyPublished = false) {
    const db = this.load();
    if (onlyPublished) {
      return (db.projects || []).filter((p) => p.status === 'published');
    }
    return db.projects || [];
  }

  public saveProject(project: any) {
    const db = this.load();
    const now = new Date().toISOString();
    let updatedProjects = [...(db.projects || [])];

    if (!project.id || project.id.startsWith('new_')) {
      const newId = `proj_${Date.now()}`;
      const newProj = {
        ...project,
        id: newId,
        createdAt: now,
        updatedAt: now,
      };
      updatedProjects.unshift(newProj);
      db.projects = updatedProjects;
      this.logAudit('PROJECT_CREATED', 'project', `Created project "${newProj.title}"`, 'success');
      this.saveToStorage(db);
      return newProj;
    } else {
      const idx = updatedProjects.findIndex((p) => p.id === project.id);
      if (idx !== -1) {
        const updated = {
          ...updatedProjects[idx],
          ...project,
          updatedAt: now,
        };
        updatedProjects[idx] = updated;
        db.projects = updatedProjects;
        this.logAudit('PROJECT_UPDATED', 'project', `Updated project "${updated.title}"`, 'success');
        this.saveToStorage(db);
        return updated;
      } else {
        updatedProjects.unshift(project);
        db.projects = updatedProjects;
        this.saveToStorage(db);
        return project;
      }
    }
  }

  public deleteProject(id: string) {
    const db = this.load();
    const target = (db.projects || []).find((p) => p.id === id);
    db.projects = (db.projects || []).filter((p) => p.id !== id);
    this.logAudit('PROJECT_DELETED', 'project', `Deleted project "${target?.title || id}"`, 'success');
    this.saveToStorage(db);
    return { success: true };
  }

  // Services
  public getServices(onlyPublished = false) {
    const db = this.load();
    if (onlyPublished) {
      return (db.services || []).filter((s) => s.status === 'published');
    }
    return db.services || [];
  }

  public saveService(service: any) {
    const db = this.load();
    const now = new Date().toISOString();
    let updated = [...(db.services || [])];

    if (!service.id || service.id.startsWith('new_')) {
      const newId = `srv_${Date.now()}`;
      const newSrv = {
        ...service,
        id: newId,
        createdAt: now,
        updatedAt: now,
      };
      updated.unshift(newSrv);
      db.services = updated;
      this.logAudit('SERVICE_CREATED', 'service', `Created service "${newSrv.title}"`, 'success');
      this.saveToStorage(db);
      return newSrv;
    } else {
      const idx = updated.findIndex((s) => s.id === service.id);
      if (idx !== -1) {
        const item = { ...updated[idx], ...service, updatedAt: now };
        updated[idx] = item;
        db.services = updated;
        this.logAudit('SERVICE_UPDATED', 'service', `Updated service "${item.title}"`, 'success');
        this.saveToStorage(db);
        return item;
      } else {
        updated.unshift(service);
        db.services = updated;
        this.saveToStorage(db);
        return service;
      }
    }
  }

  public deleteService(id: string) {
    const db = this.load();
    const target = (db.services || []).find((s) => s.id === id);
    db.services = (db.services || []).filter((s) => s.id !== id);
    this.logAudit('SERVICE_DELETED', 'service', `Deleted service "${target?.title || id}"`, 'success');
    this.saveToStorage(db);
    return { success: true };
  }

  // Articles
  public getArticles(onlyPublished = false) {
    const db = this.load();
    if (onlyPublished) {
      return (db.articles || []).filter((a) => a.status === 'published');
    }
    return db.articles || [];
  }

  public saveArticle(article: any) {
    const db = this.load();
    const now = new Date().toISOString();
    let updated = [...(db.articles || [])];

    if (!article.id || article.id.startsWith('new_')) {
      const newId = `art_${Date.now()}`;
      const newArt = {
        ...article,
        id: newId,
        createdAt: now,
        updatedAt: now,
      };
      updated.unshift(newArt);
      db.articles = updated;
      this.logAudit('ARTICLE_CREATED', 'article', `Created article "${newArt.title}"`, 'success');
      this.saveToStorage(db);
      return newArt;
    } else {
      const idx = updated.findIndex((a) => a.id === article.id);
      if (idx !== -1) {
        const item = { ...updated[idx], ...article, updatedAt: now };
        updated[idx] = item;
        db.articles = updated;
        this.logAudit('ARTICLE_UPDATED', 'article', `Updated article "${item.title}"`, 'success');
        this.saveToStorage(db);
        return item;
      } else {
        updated.unshift(article);
        db.articles = updated;
        this.saveToStorage(db);
        return article;
      }
    }
  }

  public deleteArticle(id: string) {
    const db = this.load();
    const target = (db.articles || []).find((a) => a.id === id);
    db.articles = (db.articles || []).filter((a) => a.id !== id);
    this.logAudit('ARTICLE_DELETED', 'article', `Deleted article "${target?.title || id}"`, 'success');
    this.saveToStorage(db);
    return { success: true };
  }

  // Testimonials
  public getTestimonials(onlyPublished = false) {
    const db = this.load();
    if (onlyPublished) {
      return (db.testimonials || []).filter((t) => t.status === 'published');
    }
    return db.testimonials || [];
  }

  public saveTestimonial(testimonial: any) {
    const db = this.load();
    let updated = [...(db.testimonials || [])];

    if (!testimonial.id || testimonial.id.startsWith('new_')) {
      const newTest = {
        ...testimonial,
        id: `test_${Date.now()}`,
      };
      updated.unshift(newTest);
      db.testimonials = updated;
      this.logAudit('TESTIMONIAL_CREATED', 'testimonial', `Created testimonial for "${newTest.clientName}"`, 'success');
      this.saveToStorage(db);
      return newTest;
    } else {
      const idx = updated.findIndex((t) => t.id === testimonial.id);
      if (idx !== -1) {
        const item = { ...updated[idx], ...testimonial };
        updated[idx] = item;
        db.testimonials = updated;
        this.logAudit('TESTIMONIAL_UPDATED', 'testimonial', `Updated testimonial for "${item.clientName}"`, 'success');
        this.saveToStorage(db);
        return item;
      } else {
        updated.unshift(testimonial);
        db.testimonials = updated;
        this.saveToStorage(db);
        return testimonial;
      }
    }
  }

  public deleteTestimonial(id: string) {
    const db = this.load();
    const target = (db.testimonials || []).find((t) => t.id === id);
    db.testimonials = (db.testimonials || []).filter((t) => t.id !== id);
    this.logAudit('TESTIMONIAL_DELETED', 'testimonial', `Deleted testimonial for "${target?.clientName || id}"`, 'success');
    this.saveToStorage(db);
    return { success: true };
  }

  // Homepage
  public getHomepage() {
    const db = this.load();
    return db.homepage;
  }

  public saveHomepage(config: any) {
    const db = this.load();
    db.homepage = {
      ...db.homepage,
      ...config,
    };
    this.logAudit('HOMEPAGE_UPDATED', 'homepage', 'Updated homepage hero and section configuration', 'success');
    this.saveToStorage(db);
    return db.homepage;
  }

  // Site Settings
  public getSiteSettings() {
    const db = this.load();
    return db.siteSettings;
  }

  public saveSiteSettings(settings: any) {
    const db = this.load();
    db.siteSettings = {
      ...db.siteSettings,
      ...settings,
      updatedAt: new Date().toISOString(),
    };
    this.logAudit('SETTINGS_UPDATED', 'settings', 'Updated global site settings and SEO metadata', 'success');
    this.saveToStorage(db);
    return db.siteSettings;
  }

  // Media
  public getMedia() {
    const db = this.load();
    return db.media || [];
  }

  public async uploadMedia(file: File, altText = ''): Promise<LocalMedia> {
    const db = this.load();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const mediaItem: LocalMedia = {
          id: `med_${Date.now()}`,
          filename: file.name,
          originalName: file.name,
          mimeType: file.type || 'image/jpeg',
          size: file.size,
          url: dataUrl,
          altText: altText || file.name,
          createdAt: new Date().toISOString(),
        };
        db.media = [mediaItem, ...(db.media || [])];
        this.logAudit('MEDIA_UPLOADED', 'media', `Uploaded media item "${file.name}"`, 'success');
        this.saveToStorage(db);
        resolve(mediaItem);
      };
      reader.readAsDataURL(file);
    });
  }

  public updateMediaAlt(id: string, altText: string) {
    const db = this.load();
    const target = (db.media || []).find((m) => m.id === id);
    if (target) {
      target.altText = altText;
      this.saveToStorage(db);
    }
    return target;
  }

  public deleteMedia(id: string) {
    const db = this.load();
    db.media = (db.media || []).filter((m) => m.id !== id);
    this.logAudit('MEDIA_DELETED', 'media', `Deleted media ID ${id}`, 'success');
    this.saveToStorage(db);
    return { success: true };
  }

  // Audit Logs
  public getAuditLogs() {
    const db = this.load();
    return db.auditLogs || [];
  }

  public logAudit(action: string, resourceType: string, details: string, outcome: 'success' | 'failure' = 'success') {
    const db = this.load();
    const log: LocalAuditLog = {
      id: `aud_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      actorEmail: 'admin@innosight.dev',
      action,
      resourceType,
      details,
      outcome,
    };
    db.auditLogs = [log, ...(db.auditLogs || [])].slice(0, 100);
    this.saveToStorage(db);
  }

  // Backup & Restore
  public exportData(): string {
    const db = this.load();
    return JSON.stringify(db, null, 2);
  }

  public importData(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && (parsed.projects || parsed.homepage)) {
        this.saveToStorage({
          ...getInitialLocalData(),
          ...parsed,
          version: 2,
        });
        this.logAudit('DATABASE_RESTORED', 'system', 'Restored database from imported JSON backup', 'success');
        return true;
      }
    } catch (e) {
      console.error('[ClientStorage] Import failed:', e);
    }
    return false;
  }

  public resetToDefaults() {
    const initial = getInitialLocalData();
    this.saveToStorage(initial);
    this.logAudit('DATABASE_RESET', 'system', 'Reset all CMS records to system factory defaults', 'success');
    return initial;
  }
}

export const clientStorage = new ClientStorageService();
