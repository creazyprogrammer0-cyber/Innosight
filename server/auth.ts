import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { db, UserRecord } from './db';

export interface AdminSession {
  sessionId: string;
  userId: string;
  email: string;
  role: 'admin' | 'editor';
  csrfToken: string;
  expiresAt: number;
}

// In-memory active session store (keyed by sessionId)
const activeSessions = new Map<string, AdminSession>();

// Rate limiting for login attempts (IP -> { count, lockedUntil })
interface RateLimitEntry {
  attempts: number;
  resetAt: number;
}
const loginRateLimits = new Map<string, RateLimitEntry>();

const MAX_LOGIN_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export const SESSION_COOKIE_NAME = 'innosight_admin_session';

export function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

export function verifyPassword(password: string, salt: string, expectedHash: string): boolean {
  try {
    const candidateHash = hashPassword(password, salt);
    const bufA = Buffer.from(candidateHash, 'hex');
    const bufB = Buffer.from(expectedHash, 'hex');
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

export function checkLoginRateLimit(ip: string): { allowed: boolean; waitSeconds?: number } {
  const now = Date.now();
  const entry = loginRateLimits.get(ip);
  if (!entry) return { allowed: true };

  if (now > entry.resetAt) {
    loginRateLimits.delete(ip);
    return { allowed: true };
  }

  if (entry.attempts >= MAX_LOGIN_ATTEMPTS) {
    const waitSeconds = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, waitSeconds };
  }

  return { allowed: true };
}

export function recordFailedLogin(ip: string): void {
  const now = Date.now();
  const entry = loginRateLimits.get(ip);
  if (!entry || now > entry.resetAt) {
    loginRateLimits.set(ip, { attempts: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  } else {
    entry.attempts += 1;
  }
}

export function clearFailedLogin(ip: string): void {
  loginRateLimits.delete(ip);
}

export function createSession(user: UserRecord): AdminSession {
  const sessionId = crypto.randomBytes(32).toString('hex');
  const csrfToken = crypto.randomBytes(24).toString('hex');
  const session: AdminSession = {
    sessionId,
    userId: user.id,
    email: user.email,
    role: user.role,
    csrfToken,
    expiresAt: Date.now() + SESSION_TTL_MS,
  };
  activeSessions.set(sessionId, session);
  return session;
}

export function getSession(sessionId: string): AdminSession | null {
  if (!sessionId) return null;
  const session = activeSessions.get(sessionId);
  if (!session) return null;

  if (Date.now() > session.expiresAt) {
    activeSessions.delete(sessionId);
    return null;
  }
  return session;
}

export function revokeSession(sessionId: string): void {
  activeSessions.delete(sessionId);
}

// Extends Express Request
export interface AuthenticatedRequest extends Request {
  userSession?: AdminSession;
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const sessionId = req.cookies?.[SESSION_COOKIE_NAME] || req.headers['x-admin-session-id'];
  if (!sessionId || typeof sessionId !== 'string') {
    res.status(401).json({ error: 'Authentication required. Please sign in to access the CMS.' });
    return;
  }

  const session = getSession(sessionId);
  if (!session) {
    res.status(401).json({ error: 'Session expired or invalid. Please sign in again.' });
    return;
  }

  req.userSession = session;
  next();
}

export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  requireAuth(req, res, () => {
    if (req.userSession?.role !== 'admin') {
      res.status(403).json({ error: 'Forbidden. Administrator privileges required.' });
      return;
    }
    next();
  });
}

// CSRF validation on mutating actions (POST, PUT, DELETE, PATCH)
export function validateCsrf(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  const clientCsrfToken = req.headers['x-csrf-token'];
  const session = req.userSession;

  if (!session || !clientCsrfToken || clientCsrfToken !== session.csrfToken) {
    res.status(403).json({ error: 'Invalid or missing CSRF token. Request rejected for security.' });
    return;
  }

  next();
}
