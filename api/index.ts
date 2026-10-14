import type { IncomingMessage, ServerResponse } from 'http';

// Helper to parse JSON body from serverless request if needed
async function getParsedBody(req: any): Promise<any> {
  if (req.body) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch {
        return {};
      }
    }
    return req.body;
  }

  // If body is not pre-parsed (e.g. raw Node stream)
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk: any) => {
      raw += chunk;
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

// Light Vercel Serverless Function endpoint
export default async function handler(req: any, res: any) {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers?.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Admin-Session-Id, Content-Type, Authorization'
  );

  if (req.method === 'OPTIONS') {
    if (typeof res.status === 'function') {
      res.status(200).end();
    } else {
      res.statusCode = 200;
      res.end();
    }
    return;
  }

  const rawUrl = req.url || '';
  const pathname = rawUrl.split('?')[0];

  // Helper response sender
  const sendJson = (status: number, data: any) => {
    if (typeof res.status === 'function') {
      return res.status(status).json(data);
    }
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  };

  // 1. Auth Login
  if (pathname.endsWith('/api/auth/login') && req.method === 'POST') {
    const body = await getParsedBody(req);
    const { email, password } = body || {};
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (
      (cleanEmail === 'admin@innosight.dev' && (cleanPass === 'Innosight2026!' || cleanPass === 'innosight2026!')) ||
      (cleanEmail === 'editor@innosight.dev' && (cleanPass === 'Innosight2026!' || cleanPass === 'innosight2026!'))
    ) {
      const role = cleanEmail.includes('editor') ? 'editor' : 'admin';
      return sendJson(200, {
        success: true,
        user: {
          id: `usr_${role}_01`,
          email: cleanEmail,
          username: role,
          role,
        },
        csrfToken: `serverless_csrf_${Date.now()}`,
        sessionId: `serverless_sess_${Date.now()}`,
      });
    }

    return sendJson(401, {
      error: 'Invalid email or password. Please verify credentials.',
    });
  }

  // 2. Auth Me
  if (pathname.endsWith('/api/auth/me')) {
    const sessionId = req.headers?.['x-admin-session-id'];
    if (sessionId) {
      return sendJson(200, {
        authenticated: true,
        user: {
          id: 'usr_admin_01',
          email: 'admin@innosight.dev',
          role: 'admin',
        },
        csrfToken: `serverless_csrf_${Date.now()}`,
        sessionId: String(sessionId),
      });
    }
    return sendJson(200, { authenticated: false });
  }

  // 3. Auth Logout
  if (pathname.endsWith('/api/auth/logout')) {
    return sendJson(200, { success: true, message: 'Logged out successfully.' });
  }

  // Unhandled endpoints - Return 404 Not Found so client fallbacks activate gracefully
  return sendJson(404, {
    error: 'Endpoint not found or handler not available in serverless mode',
    code: 'NOT_FOUND',
    pathname,
  });
}
