let inMemoryCsrfToken: string = '';
let inMemorySessionId: string = '';

// Retrieve cached tokens from session storage if available
if (typeof window !== 'undefined') {
  try {
    inMemoryCsrfToken = sessionStorage.getItem('innosight_csrf') || '';
    inMemorySessionId = sessionStorage.getItem('innosight_session_id') || '';
  } catch {}
}

export function setClientAuthTokens(csrf: string, sessionId?: string) {
  inMemoryCsrfToken = csrf;
  if (sessionId) inMemorySessionId = sessionId;
  try {
    sessionStorage.setItem('innosight_csrf', csrf);
    if (sessionId) sessionStorage.setItem('innosight_session_id', sessionId);
  } catch {}
}

export function clearClientAuthTokens() {
  inMemoryCsrfToken = '';
  inMemorySessionId = '';
  try {
    sessionStorage.removeItem('innosight_csrf');
    sessionStorage.removeItem('innosight_session_id');
  } catch {}
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

  if (!res.ok) {
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
  // Auth
  async login(email: string, password: string) {
    const data = await apiRequest<{
      success: boolean;
      user: { id: string; email: string; username: string; role: 'admin' | 'editor' };
      csrfToken: string;
      sessionId: string;
    }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setClientAuthTokens(data.csrfToken, data.sessionId);
    return data;
  },

  async logout() {
    try {
      await apiRequest('/api/auth/logout', { method: 'POST' });
    } finally {
      clearClientAuthTokens();
    }
  },

  async getMe() {
    const data = await apiRequest<{
      authenticated: boolean;
      user?: { id: string; email: string; role: 'admin' | 'editor' };
      csrfToken?: string;
      sessionId?: string;
    }>('/api/auth/me');
    if (data.authenticated && data.csrfToken) {
      setClientAuthTokens(data.csrfToken, data.sessionId);
    }
    return data;
  },

  // Overview
  async getOverview() {
    return apiRequest<{
      totalProjects: number;
      publishedProjects: number;
      draftProjects: number;
      archivedProjects: number;
      totalServices: number;
      publishedServices: number;
      totalArticles: number;
      publishedArticles: number;
      draftArticles: number;
      totalTestimonials: number;
      mediaCount: number;
      recentAudit: Array<{
        id: string;
        timestamp: string;
        actorEmail: string;
        action: string;
        resourceType: string;
        details: string;
        outcome: string;
      }>;
    }>('/api/cms/overview');
  },

  // Projects
  async getProjects() {
    return apiRequest<any[]>('/api/cms/projects');
  },

  async saveProject(project: any) {
    if (project.id && !project.id.startsWith('new_')) {
      return apiRequest<any>(`/api/cms/projects/${project.id}`, {
        method: 'PUT',
        body: JSON.stringify(project),
      });
    } else {
      const { id, ...payload } = project;
      return apiRequest<any>('/api/cms/projects', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    }
  },

  async deleteProject(id: string) {
    return apiRequest<{ success: boolean }>(`/api/cms/projects/${id}`, {
      method: 'DELETE',
    });
  },

  // Services
  async getServices() {
    return apiRequest<any[]>('/api/cms/services');
  },

  async saveService(service: any) {
    if (service.id && !service.id.startsWith('new_')) {
      return apiRequest<any>(`/api/cms/services/${service.id}`, {
        method: 'PUT',
        body: JSON.stringify(service),
      });
    } else {
      const { id, ...payload } = service;
      return apiRequest<any>('/api/cms/services', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    }
  },

  async deleteService(id: string) {
    return apiRequest<{ success: boolean }>(`/api/cms/services/${id}`, {
      method: 'DELETE',
    });
  },

  // Articles
  async getArticles() {
    return apiRequest<any[]>('/api/cms/articles');
  },

  async saveArticle(article: any) {
    if (article.id && !article.id.startsWith('new_')) {
      return apiRequest<any>(`/api/cms/articles/${article.id}`, {
        method: 'PUT',
        body: JSON.stringify(article),
      });
    } else {
      const { id, ...payload } = article;
      return apiRequest<any>('/api/cms/articles', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    }
  },

  async deleteArticle(id: string) {
    return apiRequest<{ success: boolean }>(`/api/cms/articles/${id}`, {
      method: 'DELETE',
    });
  },

  // Testimonials
  async getTestimonials() {
    return apiRequest<any[]>('/api/cms/testimonials');
  },

  async saveTestimonial(testimonial: any) {
    if (testimonial.id && !testimonial.id.startsWith('new_')) {
      return apiRequest<any>(`/api/cms/testimonials/${testimonial.id}`, {
        method: 'PUT',
        body: JSON.stringify(testimonial),
      });
    } else {
      const { id, ...payload } = testimonial;
      return apiRequest<any>('/api/cms/testimonials', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    }
  },

  async deleteTestimonial(id: string) {
    return apiRequest<{ success: boolean }>(`/api/cms/testimonials/${id}`, {
      method: 'DELETE',
    });
  },

  // Homepage
  async getHomepage() {
    return apiRequest<any>('/api/cms/homepage');
  },

  async saveHomepage(config: any) {
    return apiRequest<any>('/api/cms/homepage', {
      method: 'PUT',
      body: JSON.stringify(config),
    });
  },

  // Site Settings
  async getSiteSettings() {
    return apiRequest<any>('/api/cms/site-settings');
  },

  async saveSiteSettings(settings: any) {
    return apiRequest<any>('/api/cms/site-settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  },

  // Media
  async getMedia() {
    return apiRequest<any[]>('/api/cms/media');
  },

  async uploadMedia(file: File, altText?: string) {
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

    if (!res.ok) {
      let errMessage = 'Upload failed';
      try {
        const errJson = await res.json();
        errMessage = errJson.error || errMessage;
      } catch {}
      throw new Error(errMessage);
    }

    return res.json();
  },

  async updateMediaAlt(id: string, altText: string) {
    return apiRequest<any>(`/api/cms/media/${id}/alt`, {
      method: 'PUT',
      body: JSON.stringify({ altText }),
    });
  },

  async deleteMedia(id: string) {
    return apiRequest<{ success: boolean }>(`/api/cms/media/${id}`, {
      method: 'DELETE',
    });
  },

  // Audit Logs
  async getAuditLogs() {
    return apiRequest<any[]>('/api/cms/audit-logs');
  },
};
