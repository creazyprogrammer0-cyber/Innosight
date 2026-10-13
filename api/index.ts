import type { IncomingMessage, ServerResponse } from 'http';

// Light Vercel Serverless Function endpoint
export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Admin-Session-Id, Content-Type, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const url = req.url || '';

  // Auth login
  if (url.includes('/api/auth/login') && req.method === 'POST') {
    const { email, password } = req.body || {};
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (
      (cleanEmail === 'admin@innosight.dev' && (cleanPass === 'Innosight2026!' || cleanPass === 'innosight2026!')) ||
      (cleanEmail === 'editor@innosight.dev' && (cleanPass === 'Innosight2026!' || cleanPass === 'innosight2026!'))
    ) {
      const role = cleanEmail.includes('editor') ? 'editor' : 'admin';
      return res.status(200).json({
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

    return res.status(401).json({
      error: 'Invalid email or password. Please verify credentials.',
    });
  }

  // Auth Me
  if (url.includes('/api/auth/me')) {
    const sessionId = req.headers['x-admin-session-id'];
    if (sessionId) {
      return res.status(200).json({
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
    return res.status(200).json({ authenticated: false });
  }

  // Default response
  return res.status(200).json({
    status: 'ok',
    message: 'Innosight Vercel API Gateway Active',
  });
}
