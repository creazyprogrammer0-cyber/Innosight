import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import {
  db,
  ProjectRecord,
  ServiceRecord,
  ArticleRecord,
  TestimonialRecord,
} from './server/db';
import {
  createSession,
  getSession,
  revokeSession,
  verifyPassword,
  checkLoginRateLimit,
  recordFailedLogin,
  clearFailedLogin,
  requireAuth,
  validateCsrf,
  AuthenticatedRequest,
  SESSION_COOKIE_NAME,
} from './server/auth';
import { uploadMiddleware, handleMediaUpload } from './server/media';

const isProduction = process.env.NODE_ENV === 'production';
const PORT = parseInt(process.env.PORT || '3000', 10);

async function createServer() {
  const app = express();

  // Basic Security Headers
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  app.use(cookieParser());
  app.use(express.json({ limit: '2mb' }));

  // Static uploads directory
  const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  app.use('/uploads', express.static(uploadsDir, { maxAge: '7d' }));

  // -------------------------------------------------------------
  // 1. PUBLIC API (Only published content, zero draft leaks)
  // -------------------------------------------------------------
  app.get('/api/public/content', (_req: Request, res: Response) => {
    try {
      const projects = db.getProjects(false);
      const services = db.getServices(false);
      const articles = db.getArticles(false);
      const testimonials = db.getTestimonials(false);
      const homepage = db.getHomepage();
      const siteSettings = db.getSiteSettings();

      res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
      res.json({
        projects,
        services,
        articles,
        testimonials,
        homepage,
        siteSettings,
      });
    } catch (err) {
      console.error('[API Public] Content retrieval error:', err);
      res.status(500).json({ error: 'Failed to retrieve website content.' });
    }
  });

  // -------------------------------------------------------------
  // 2. AUTHENTICATION ENDPOINTS
  // -------------------------------------------------------------
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const ip = req.ip || '127.0.0.1';
    const rateCheck = checkLoginRateLimit(ip);

    if (!rateCheck.allowed) {
      db.logAudit({
        actorEmail: req.body.email || 'unknown',
        action: 'LOGIN_RATE_LIMITED',
        resourceType: 'auth',
        resourceId: ip,
        details: `Too many failed login attempts. Throttled for ${rateCheck.waitSeconds}s`,
        ip,
        outcome: 'failure',
      });
      res.status(429).json({
        error: `Too many login attempts. Please wait ${rateCheck.waitSeconds} seconds before retrying.`,
      });
      return;
    }

    const { email, password } = req.body;
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      res.status(400).json({ error: 'Email and password are required.' });
      return;
    }

    const user = db.findUserByEmail(email.trim());
    if (!user) {
      recordFailedLogin(ip);
      db.logAudit({
        actorEmail: email,
        action: 'LOGIN_FAILED',
        resourceType: 'auth',
        resourceId: 'not_found',
        details: 'User account not found',
        ip,
        outcome: 'failure',
      });
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    const passwordValid = verifyPassword(password, user.salt, user.passwordHash);
    if (!passwordValid) {
      recordFailedLogin(ip);
      db.logAudit({
        actorEmail: email,
        action: 'LOGIN_FAILED',
        resourceType: 'auth',
        resourceId: user.id,
        details: 'Password verification mismatch',
        ip,
        outcome: 'failure',
      });
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    // Login successful
    clearFailedLogin(ip);
    db.updateUserLastLogin(user.id);
    const session = createSession(user);

    // Set secure HttpOnly cookie
    res.cookie(SESSION_COOKIE_NAME, session.sessionId, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    db.logAudit({
      actorEmail: user.email,
      action: 'LOGIN_SUCCESS',
      resourceType: 'auth',
      resourceId: user.id,
      details: 'Administrator signed in successfully',
      ip,
      outcome: 'success',
    });

    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      csrfToken: session.csrfToken,
      sessionId: session.sessionId,
    });
  });

  app.post('/api/auth/logout', (req: AuthenticatedRequest, res: Response) => {
    const sessionId = req.cookies?.[SESSION_COOKIE_NAME] || req.headers['x-admin-session-id'];
    if (sessionId && typeof sessionId === 'string') {
      const session = getSession(sessionId);
      if (session) {
        db.logAudit({
          actorEmail: session.email,
          action: 'LOGOUT',
          resourceType: 'auth',
          resourceId: session.userId,
          details: 'User signed out',
          ip: req.ip || '127.0.0.1',
          outcome: 'success',
        });
      }
      revokeSession(sessionId);
    }
    res.clearCookie(SESSION_COOKIE_NAME);
    res.json({ success: true });
  });

  app.get('/api/auth/me', (req: AuthenticatedRequest, res: Response) => {
    const sessionId = req.cookies?.[SESSION_COOKIE_NAME] || req.headers['x-admin-session-id'];
    if (!sessionId || typeof sessionId !== 'string') {
      res.status(401).json({ authenticated: false });
      return;
    }

    const session = getSession(sessionId);
    if (!session) {
      res.status(401).json({ authenticated: false });
      return;
    }

    res.json({
      authenticated: true,
      user: {
        id: session.userId,
        email: session.email,
        role: session.role,
      },
      csrfToken: session.csrfToken,
      sessionId: session.sessionId,
    });
  });

  // -------------------------------------------------------------
  // 3. PRIVILEGED CMS API ENDPOINTS (requireAuth + validateCsrf)
  // -------------------------------------------------------------
  const cmsRouter = express.Router();
  cmsRouter.use(requireAuth);
  cmsRouter.use(validateCsrf);

  // Overview Metrics
  cmsRouter.get('/overview', (_req: AuthenticatedRequest, res: Response) => {
    const projects = db.getProjects(true);
    const services = db.getServices(true);
    const articles = db.getArticles(true);
    const testimonials = db.getTestimonials(true);
    const media = db.getMedia();
    const recentAudit = db.getAuditLogs().slice(0, 8);

    const stats = {
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
      mediaCount: media.length,
      recentAudit,
    };

    res.json(stats);
  });

  // Projects CRUD
  cmsRouter.get('/projects', (_req: AuthenticatedRequest, res: Response) => {
    res.json(db.getProjects(true));
  });

  cmsRouter.post('/projects', (req: AuthenticatedRequest, res: Response) => {
    const { title, category } = req.body;
    if (!title || !category) {
      res.status(400).json({ error: 'Title and category are required.' });
      return;
    }

    const created = db.upsertProject(req.body);
    db.logAudit({
      actorEmail: req.userSession?.email || 'admin',
      action: 'PROJECT_CREATED',
      resourceType: 'project',
      resourceId: created.id,
      details: `Created project "${created.title}" with status "${created.status}"`,
      ip: req.ip || '127.0.0.1',
      outcome: 'success',
    });
    res.status(201).json(created);
  });

  cmsRouter.put('/projects/:id', (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const existing = db.getProjectById(id);
    if (!existing) {
      res.status(404).json({ error: 'Project not found.' });
      return;
    }

    const updated = db.upsertProject({ ...req.body, id });
    db.logAudit({
      actorEmail: req.userSession?.email || 'admin',
      action: 'PROJECT_UPDATED',
      resourceType: 'project',
      resourceId: id,
      details: `Updated project "${updated.title}" (status: ${updated.status})`,
      ip: req.ip || '127.0.0.1',
      outcome: 'success',
    });
    res.json(updated);
  });

  cmsRouter.delete('/projects/:id', (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const existing = db.getProjectById(id);
    if (!existing) {
      res.status(404).json({ error: 'Project not found.' });
      return;
    }

    db.deleteProject(id);
    db.logAudit({
      actorEmail: req.userSession?.email || 'admin',
      action: 'PROJECT_DELETED',
      resourceType: 'project',
      resourceId: id,
      details: `Deleted project "${existing.title}"`,
      ip: req.ip || '127.0.0.1',
      outcome: 'success',
    });
    res.json({ success: true, message: 'Project deleted successfully.' });
  });

  // Services CRUD
  cmsRouter.get('/services', (_req: AuthenticatedRequest, res: Response) => {
    res.json(db.getServices(true));
  });

  cmsRouter.post('/services', (req: AuthenticatedRequest, res: Response) => {
    const { title } = req.body;
    if (!title) {
      res.status(400).json({ error: 'Service title is required.' });
      return;
    }
    const created = db.upsertService(req.body);
    db.logAudit({
      actorEmail: req.userSession?.email || 'admin',
      action: 'SERVICE_CREATED',
      resourceType: 'service',
      resourceId: created.id,
      details: `Created service "${created.title}"`,
      ip: req.ip || '127.0.0.1',
      outcome: 'success',
    });
    res.status(201).json(created);
  });

  cmsRouter.put('/services/:id', (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const updated = db.upsertService({ ...req.body, id });
    db.logAudit({
      actorEmail: req.userSession?.email || 'admin',
      action: 'SERVICE_UPDATED',
      resourceType: 'service',
      resourceId: id,
      details: `Updated service "${updated.title}"`,
      ip: req.ip || '127.0.0.1',
      outcome: 'success',
    });
    res.json(updated);
  });

  cmsRouter.delete('/services/:id', (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const existing = db.getServiceById(id);
    db.deleteService(id);
    db.logAudit({
      actorEmail: req.userSession?.email || 'admin',
      action: 'SERVICE_DELETED',
      resourceType: 'service',
      resourceId: id,
      details: `Deleted service "${existing?.title || id}"`,
      ip: req.ip || '127.0.0.1',
      outcome: 'success',
    });
    res.json({ success: true });
  });

  // Articles CRUD
  cmsRouter.get('/articles', (_req: AuthenticatedRequest, res: Response) => {
    res.json(db.getArticles(true));
  });

  cmsRouter.post('/articles', (req: AuthenticatedRequest, res: Response) => {
    const { title } = req.body;
    if (!title) {
      res.status(400).json({ error: 'Article title is required.' });
      return;
    }
    const created = db.upsertArticle(req.body);
    db.logAudit({
      actorEmail: req.userSession?.email || 'admin',
      action: 'ARTICLE_CREATED',
      resourceType: 'article',
      resourceId: created.id,
      details: `Created article "${created.title}" (status: ${created.status})`,
      ip: req.ip || '127.0.0.1',
      outcome: 'success',
    });
    res.status(201).json(created);
  });

  cmsRouter.put('/articles/:id', (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const updated = db.upsertArticle({ ...req.body, id });
    db.logAudit({
      actorEmail: req.userSession?.email || 'admin',
      action: 'ARTICLE_UPDATED',
      resourceType: 'article',
      resourceId: id,
      details: `Updated article "${updated.title}"`,
      ip: req.ip || '127.0.0.1',
      outcome: 'success',
    });
    res.json(updated);
  });

  cmsRouter.delete('/articles/:id', (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const existing = db.getArticleById(id);
    db.deleteArticle(id);
    db.logAudit({
      actorEmail: req.userSession?.email || 'admin',
      action: 'ARTICLE_DELETED',
      resourceType: 'article',
      resourceId: id,
      details: `Deleted article "${existing?.title || id}"`,
      ip: req.ip || '127.0.0.1',
      outcome: 'success',
    });
    res.json({ success: true });
  });

  // Testimonials CRUD
  cmsRouter.get('/testimonials', (_req: AuthenticatedRequest, res: Response) => {
    res.json(db.getTestimonials(true));
  });

  cmsRouter.post('/testimonials', (req: AuthenticatedRequest, res: Response) => {
    const created = db.upsertTestimonial(req.body);
    db.logAudit({
      actorEmail: req.userSession?.email || 'admin',
      action: 'TESTIMONIAL_CREATED',
      resourceType: 'testimonial',
      resourceId: created.id,
      details: `Added testimonial from ${created.clientName}`,
      ip: req.ip || '127.0.0.1',
      outcome: 'success',
    });
    res.status(201).json(created);
  });

  cmsRouter.put('/testimonials/:id', (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const updated = db.upsertTestimonial({ ...req.body, id });
    db.logAudit({
      actorEmail: req.userSession?.email || 'admin',
      action: 'TESTIMONIAL_UPDATED',
      resourceType: 'testimonial',
      resourceId: id,
      details: `Updated testimonial for ${updated.clientName}`,
      ip: req.ip || '127.0.0.1',
      outcome: 'success',
    });
    res.json(updated);
  });

  cmsRouter.delete('/testimonials/:id', (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    db.deleteTestimonial(id);
    db.logAudit({
      actorEmail: req.userSession?.email || 'admin',
      action: 'TESTIMONIAL_DELETED',
      resourceType: 'testimonial',
      resourceId: id,
      details: `Deleted testimonial ${id}`,
      ip: req.ip || '127.0.0.1',
      outcome: 'success',
    });
    res.json({ success: true });
  });

  // Homepage Editor
  cmsRouter.get('/homepage', (_req: AuthenticatedRequest, res: Response) => {
    res.json(db.getHomepage());
  });

  cmsRouter.put('/homepage', (req: AuthenticatedRequest, res: Response) => {
    const updated = db.updateHomepage(req.body);
    db.logAudit({
      actorEmail: req.userSession?.email || 'admin',
      action: 'HOMEPAGE_UPDATED',
      resourceType: 'homepage',
      resourceId: 'config',
      details: 'Updated homepage hero, copy, and CTA configuration',
      ip: req.ip || '127.0.0.1',
      outcome: 'success',
    });
    res.json(updated);
  });

  // Global Site Settings
  cmsRouter.get('/site-settings', (_req: AuthenticatedRequest, res: Response) => {
    res.json(db.getSiteSettings());
  });

  cmsRouter.put('/site-settings', (req: AuthenticatedRequest, res: Response) => {
    const updated = db.updateSiteSettings(req.body);
    db.logAudit({
      actorEmail: req.userSession?.email || 'admin',
      action: 'SITE_SETTINGS_UPDATED',
      resourceType: 'settings',
      resourceId: 'global',
      details: 'Updated global SEO meta, contact email, and banner settings',
      ip: req.ip || '127.0.0.1',
      outcome: 'success',
    });
    res.json(updated);
  });

  // Media Library
  cmsRouter.get('/media', (_req: AuthenticatedRequest, res: Response) => {
    res.json(db.getMedia());
  });

  cmsRouter.post('/media/upload', uploadMiddleware.single('file'), (req: AuthenticatedRequest, res: Response) => {
    handleMediaUpload(req, res);
  });

  cmsRouter.put('/media/:id/alt', (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const { altText } = req.body;
    const updated = db.updateMediaAlt(id, altText || '');
    if (!updated) {
      res.status(404).json({ error: 'Media not found.' });
      return;
    }
    res.json(updated);
  });

  cmsRouter.delete('/media/:id', (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const media = db.getMedia().find((m) => m.id === id);
    if (media) {
      const filePath = path.resolve(process.cwd(), 'public', media.url.replace(/^\//, ''));
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch {}
      }
      db.deleteMedia(id);
      db.logAudit({
        actorEmail: req.userSession?.email || 'admin',
        action: 'MEDIA_DELETED',
        resourceType: 'media',
        resourceId: id,
        details: `Deleted file ${media.filename}`,
        ip: req.ip || '127.0.0.1',
        outcome: 'success',
      });
    }
    res.json({ success: true });
  });

  // Audit Logs
  cmsRouter.get('/audit-logs', (_req: AuthenticatedRequest, res: Response) => {
    res.json(db.getAuditLogs());
  });

  // Mount Privileged CMS Router
  app.use('/api/cms', cmsRouter);

  // -------------------------------------------------------------
  // 4. VITE DEV SERVER OR STATIC PRODUCTION SERVE
  // -------------------------------------------------------------
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Innosight Server] Running on http://0.0.0.0:${PORT} in ${isProduction ? 'production' : 'development'} mode`);
  });
}

createServer().catch((err) => {
  console.error('[Innosight Server] Fatal initialization error:', err);
  process.exit(1);
});
