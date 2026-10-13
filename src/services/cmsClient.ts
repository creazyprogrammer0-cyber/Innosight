import { clientStorage, LocalUser } from './clientStorage';

let inMemoryCsrfToken: string = '';
let inMemorySessionId: string = '';
let currentStorageMode: 'server' | 'client' = 'server';

// Check if we are running in an environment where server is known to be offline or client-mode was chosen
if (typeof window !== 'undefined') {
  try {
    inMemoryCsrfToken = sessionStorage.getItem('innosight_csrf') || '';
    inMemorySessionId = sessionStorage.getItem('innosight_session_id') || '';
    const storedMode = sessionStorage.getItem('innosight_storage_mode');
    if (storedMode === 'client') {
      currentStorageMode = 'client';
    }
  } catch {}
}

export function setClientAuthTokens(csrf: string, sessionId?: string, mode: 'server' | 'client' = 'server') {
  inMemoryCsrfToken = csrf;
  if (sessionId) inMemorySessionId = sessionId;
  currentStorageMode = mode;
  try {
    sessionStorage.setItem('innosight_csrf', csrf);
    if (sessionId) sessionStorage.setItem('innosight_session_id', sessionId);
    sessionStorage.setItem('innosight_storage_mode', mode);
  } catch {}
}

export function clearClientAuthTokens() {
  inMemoryCsrfToken = '';
  inMemorySessionId = '';
  try {
    sessionStorage.removeItem('innosight_csrf');
    sessionStorage.removeItem('innosight_session_id');
    sessionStorage.removeItem('innosight_admin_user');
  } catch {}
}

export function getCmsStorageMode(): 'server' | 'client' {
  return currentStorageMode;
}

async function apiRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (inMemoryCsrfToken) {
    headers['X-CSRF-Token'] = inMemoryCsrfToken;
  }
  if (inMemorySessionId) {
    headers['X-Admin-Session-Id'] = inMemorySessionId;
  }

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  const contentType = res.headers.get('content-type') || '';
  const isHtml = contentType.includes('text/html');

  if (!res.ok || isHtml) {
    // If static hosting returns 404, 405 Method Not Allowed, or HTML index.html
    if (res.status === 404 || res.status === 405 || isHtml) {
      const err = new Error('SERVER_ENDPOINT_UNAVAILABLE');
      (err as any).status = res.status;
      (err as any).isHtml = isHtml;
      throw err;
    }

    let errMessage = 'Request failed';
    try {
      const errJson = await res.json();
      errMessage = errJson.error || errJson.message || errMessage;
    } catch {}
    throw new Error(errMessage);
  }

  return res.json();
}

export const cmsClient = {
  getStorageMode() {
    return currentStorageMode;
  },

  // Auth
  async login(email: string, password: string) {
    // 1. Try server first if not explicitly in client-only mode
    if (currentStorageMode !== 'client') {
      try {
        const data = await apiRequest<{
          success: boolean;
          user: { id: string; email: string; username: string; role: 'admin' | 'editor' };
          csrfToken: string;
          sessionId: string;
        }>('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });
        setClientAuthTokens(data.csrfToken, data.sessionId, 'server');
        try {
          sessionStorage.setItem('innosight_admin_user', JSON.stringify(data.user));
        } catch {}
        return data;
      } catch (err: any) {
        // If the server rejected credentials (401 / 403 / 429), respect it unless the endpoint was missing/HTML
        if (err.message !== 'SERVER_ENDPOINT_UNAVAILABLE' && !err.message.includes('Failed to fetch')) {
          throw err;
        }
        // If server endpoint was missing (404/405/Vercel static rewrite/HTML), fall through to clientStorage
        console.warn('[cmsClient] Server endpoint unavailable or static hosting detected. Falling back to local storage engine.');
      }
    }

    // 2. Client-Side Authentication Fallback
    const localUser = clientStorage.authenticate(email, password);
    if (!localUser) {
      throw new Error('Invalid email or password. Please verify credentials.');
    }

    const sessionId = `client_sess_${Date.now()}`;
    const csrfToken = `client_csrf_${Date.now()}`;
    setClientAuthTokens(csrfToken, sessionId, 'client');
    try {
      sessionStorage.setItem('innosight_admin_user', JSON.stringify(localUser));
    } catch {}

    return {
      success: true,
      user: localUser,
      csrfToken,
      sessionId,
    };
  },

  async logout() {
    try {
      if (currentStorageMode === 'server') {
        await apiRequest('/api/auth/logout', { method: 'POST' });
      }
    } catch {}
    clearClientAuthTokens();
  },

  async getMe() {
    // Check if client-side session is already active
    if (typeof window !== 'undefined') {
      try {
        const storedUser = sessionStorage.getItem('innosight_admin_user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          return {
            authenticated: true,
            user,
            csrfToken: inMemoryCsrfToken || 'client-token',
            sessionId: inMemorySessionId || 'client-session',
          };
        }
      } catch {}
    }

    if (currentStorageMode === 'client') {
      return { authenticated: false };
    }

    try {
      const data = await apiRequest<{
        authenticated: boolean;
        user?: { id: string; email: string; role: 'admin' | 'editor' };
        csrfToken?: string;
        sessionId?: string;
      }>('/api/auth/me');
      if (data.authenticated && data.csrfToken) {
        setClientAuthTokens(data.csrfToken, data.sessionId, 'server');
        if (data.user) {
          try {
            sessionStorage.setItem('innosight_admin_user', JSON.stringify(data.user));
          } catch {}
        }
      }
      return data;
    } catch {
      return { authenticated: false };
    }
  },

  // Overview
  async getOverview() {
    if (currentStorageMode === 'server') {
      try {
        return await apiRequest<any>('/api/cms/overview');
      } catch (err: any) {
        if (err.message !== 'SERVER_ENDPOINT_UNAVAILABLE') throw err;
        currentStorageMode = 'client';
      }
    }
    return clientStorage.getOverview();
  },

  // Projects
  async getProjects() {
    if (currentStorageMode === 'server') {
      try {
        return await apiRequest<any[]>('/api/cms/projects');
      } catch (err: any) {
        if (err.message !== 'SERVER_ENDPOINT_UNAVAILABLE') throw err;
        currentStorageMode = 'client';
      }
    }
    return clientStorage.getProjects();
  },

  async saveProject(project: any) {
    if (currentStorageMode === 'server') {
      try {
        if (project.id && !project.id.startsWith('new_')) {
          return await apiRequest<any>(`/api/cms/projects/${project.id}`, {
            method: 'PUT',
            body: JSON.stringify(project),
          });
        } else {
          const { id, ...payload } = project;
          return await apiRequest<any>('/api/cms/projects', {
            method: 'POST',
            body: JSON.stringify(payload),
          });
        }
      } catch (err: any) {
        if (err.message !== 'SERVER_ENDPOINT_UNAVAILABLE') throw err;
        currentStorageMode = 'client';
      }
    }
    return clientStorage.saveProject(project);
  },

  async deleteProject(id: string) {
    if (currentStorageMode === 'server') {
      try {
        return await apiRequest<{ success: boolean }>(`/api/cms/projects/${id}`, {
          method: 'DELETE',
        });
      } catch (err: any) {
        if (err.message !== 'SERVER_ENDPOINT_UNAVAILABLE') throw err;
        currentStorageMode = 'client';
      }
    }
    return clientStorage.deleteProject(id);
  },

  // Services
  async getServices() {
    if (currentStorageMode === 'server') {
      try {
        return await apiRequest<any[]>('/api/cms/services');
      } catch (err: any) {
        if (err.message !== 'SERVER_ENDPOINT_UNAVAILABLE') throw err;
        currentStorageMode = 'client';
      }
    }
    return clientStorage.getServices();
  },

  async saveService(service: any) {
    if (currentStorageMode === 'server') {
      try {
        if (service.id && !service.id.startsWith('new_')) {
          return await apiRequest<any>(`/api/cms/services/${service.id}`, {
            method: 'PUT',
            body: JSON.stringify(service),
          });
        } else {
          const { id, ...payload } = service;
          return await apiRequest<any>('/api/cms/services', {
            method: 'POST',
            body: JSON.stringify(payload),
          });
        }
      } catch (err: any) {
        if (err.message !== 'SERVER_ENDPOINT_UNAVAILABLE') throw err;
        currentStorageMode = 'client';
      }
    }
    return clientStorage.saveService(service);
  },

  async deleteService(id: string) {
    if (currentStorageMode === 'server') {
      try {
        return await apiRequest<{ success: boolean }>(`/api/cms/services/${id}`, {
          method: 'DELETE',
        });
      } catch (err: any) {
        if (err.message !== 'SERVER_ENDPOINT_UNAVAILABLE') throw err;
        currentStorageMode = 'client';
      }
    }
    return clientStorage.deleteService(id);
  },

  // Articles
  async getArticles() {
    if (currentStorageMode === 'server') {
      try {
        return await apiRequest<any[]>('/api/cms/articles');
      } catch (err: any) {
        if (err.message !== 'SERVER_ENDPOINT_UNAVAILABLE') throw err;
        currentStorageMode = 'client';
      }
    }
    return clientStorage.getArticles();
  },

  async saveArticle(article: any) {
    if (currentStorageMode === 'server') {
      try {
        if (article.id && !article.id.startsWith('new_')) {
          return await apiRequest<any>(`/api/cms/articles/${article.id}`, {
            method: 'PUT',
            body: JSON.stringify(article),
          });
        } else {
          const { id, ...payload } = article;
          return await apiRequest<any>('/api/cms/articles', {
            method: 'POST',
            body: JSON.stringify(payload),
          });
        }
      } catch (err: any) {
        if (err.message !== 'SERVER_ENDPOINT_UNAVAILABLE') throw err;
        currentStorageMode = 'client';
      }
    }
    return clientStorage.saveArticle(article);
  },

  async deleteArticle(id: string) {
    if (currentStorageMode === 'server') {
      try {
        return await apiRequest<{ success: boolean }>(`/api/cms/articles/${id}`, {
          method: 'DELETE',
        });
      } catch (err: any) {
        if (err.message !== 'SERVER_ENDPOINT_UNAVAILABLE') throw err;
        currentStorageMode = 'client';
      }
    }
    return clientStorage.deleteArticle(id);
  },

  // Testimonials
  async getTestimonials() {
    if (currentStorageMode === 'server') {
      try {
        return await apiRequest<any[]>('/api/cms/testimonials');
      } catch (err: any) {
        if (err.message !== 'SERVER_ENDPOINT_UNAVAILABLE') throw err;
        currentStorageMode = 'client';
      }
    }
    return clientStorage.getTestimonials();
  },

  async saveTestimonial(testimonial: any) {
    if (currentStorageMode === 'server') {
      try {
        if (testimonial.id && !testimonial.id.startsWith('new_')) {
          return await apiRequest<any>(`/api/cms/testimonials/${testimonial.id}`, {
            method: 'PUT',
            body: JSON.stringify(testimonial),
          });
        } else {
          const { id, ...payload } = testimonial;
          return await apiRequest<any>('/api/cms/testimonials', {
            method: 'POST',
            body: JSON.stringify(payload),
          });
        }
      } catch (err: any) {
        if (err.message !== 'SERVER_ENDPOINT_UNAVAILABLE') throw err;
        currentStorageMode = 'client';
      }
    }
    return clientStorage.saveTestimonial(testimonial);
  },

  async deleteTestimonial(id: string) {
    if (currentStorageMode === 'server') {
      try {
        return await apiRequest<{ success: boolean }>(`/api/cms/testimonials/${id}`, {
          method: 'DELETE',
        });
      } catch (err: any) {
        if (err.message !== 'SERVER_ENDPOINT_UNAVAILABLE') throw err;
        currentStorageMode = 'client';
      }
    }
    return clientStorage.deleteTestimonial(id);
  },

  // Homepage
  async getHomepage() {
    if (currentStorageMode === 'server') {
      try {
        return await apiRequest<any>('/api/cms/homepage');
      } catch (err: any) {
        if (err.message !== 'SERVER_ENDPOINT_UNAVAILABLE') throw err;
        currentStorageMode = 'client';
      }
    }
    return clientStorage.getHomepage();
  },

  async saveHomepage(config: any) {
    if (currentStorageMode === 'server') {
      try {
        return await apiRequest<any>('/api/cms/homepage', {
          method: 'PUT',
          body: JSON.stringify(config),
        });
      } catch (err: any) {
        if (err.message !== 'SERVER_ENDPOINT_UNAVAILABLE') throw err;
        currentStorageMode = 'client';
      }
    }
    return clientStorage.saveHomepage(config);
  },

  // Site Settings
  async getSiteSettings() {
    if (currentStorageMode === 'server') {
      try {
        return await apiRequest<any>('/api/cms/site-settings');
      } catch (err: any) {
        if (err.message !== 'SERVER_ENDPOINT_UNAVAILABLE') throw err;
        currentStorageMode = 'client';
      }
    }
    return clientStorage.getSiteSettings();
  },

  async saveSiteSettings(settings: any) {
    if (currentStorageMode === 'server') {
      try {
        return await apiRequest<any>('/api/cms/site-settings', {
          method: 'PUT',
          body: JSON.stringify(settings),
        });
      } catch (err: any) {
        if (err.message !== 'SERVER_ENDPOINT_UNAVAILABLE') throw err;
        currentStorageMode = 'client';
      }
    }
    return clientStorage.saveSiteSettings(settings);
  },

  // Media
  async getMedia() {
    if (currentStorageMode === 'server') {
      try {
        return await apiRequest<any[]>('/api/cms/media');
      } catch (err: any) {
        if (err.message !== 'SERVER_ENDPOINT_UNAVAILABLE') throw err;
        currentStorageMode = 'client';
      }
    }
    return clientStorage.getMedia();
  },

  async uploadMedia(file: File, altText?: string) {
    if (currentStorageMode === 'server') {
      try {
        const formData = new FormData();
        formData.append('file', file);
        if (altText) formData.append('altText', altText);

        const headers: Record<string, string> = {};
        if (inMemoryCsrfToken) headers['X-CSRF-Token'] = inMemoryCsrfToken;
        if (inMemorySessionId) headers['X-Admin-Session-Id'] = inMemorySessionId;

        const res = await fetch('/api/cms/media/upload', {
          method: 'POST',
          headers,
          body: formData,
          credentials: 'include',
        });

        if (res.ok) {
          return await res.json();
        }
      } catch {}
    }
    return clientStorage.uploadMedia(file, altText);
  },

  async updateMediaAlt(id: string, altText: string) {
    if (currentStorageMode === 'server') {
      try {
        return await apiRequest<any>(`/api/cms/media/${id}/alt`, {
          method: 'PUT',
          body: JSON.stringify({ altText }),
        });
      } catch (err: any) {
        if (err.message !== 'SERVER_ENDPOINT_UNAVAILABLE') throw err;
        currentStorageMode = 'client';
      }
    }
    return clientStorage.updateMediaAlt(id, altText);
  },

  async deleteMedia(id: string) {
    if (currentStorageMode === 'server') {
      try {
        return await apiRequest<{ success: boolean }>(`/api/cms/media/${id}`, {
          method: 'DELETE',
        });
      } catch (err: any) {
        if (err.message !== 'SERVER_ENDPOINT_UNAVAILABLE') throw err;
        currentStorageMode = 'client';
      }
    }
    return clientStorage.deleteMedia(id);
  },

  // Audit Logs
  async getAuditLogs() {
    if (currentStorageMode === 'server') {
      try {
        return await apiRequest<any[]>('/api/cms/audit-logs');
      } catch (err: any) {
        if (err.message !== 'SERVER_ENDPOINT_UNAVAILABLE') throw err;
        currentStorageMode = 'client';
      }
    }
    return clientStorage.getAuditLogs();
  },

  // Backup & Recovery tools
  exportBackup() {
    return clientStorage.exportData();
  },

  importBackup(jsonString: string) {
    return clientStorage.importData(jsonString);
  },

  resetToDefaults() {
    return clientStorage.resetToDefaults();
  },
};
