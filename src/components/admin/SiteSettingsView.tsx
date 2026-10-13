import React, { useEffect, useState } from 'react';
import { cmsClient } from '../../services/cmsClient';
import { Save, CheckCircle, Settings, AlertCircle } from 'lucide-react';

export const SiteSettingsView: React.FC = () => {
  const [settings, setSettings] = useState<any>({
    siteTitle: '',
    defaultMetaDescription: '',
    contactEmail: '',
    socialGithub: '',
    socialLinkedin: '',
    socialTwitter: '',
    announcementBanner: {
      enabled: false,
      text: '',
      link: '',
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await cmsClient.getSiteSettings();
      setSettings(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const updated = await cmsClient.saveSiteSettings(settings);
      setSettings(updated);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 border-3 border-[#7025E8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-700" />
            Global Website Settings & SEO
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure global website metadata, contact emails, social channels, and top banner alerts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <CheckCircle className="w-4 h-4" />
              <span>Saved</span>
            </div>
          )}
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7025E8] hover:bg-[#5E1DC7] text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* SEO Defaults */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          Global SEO & Brand Meta
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Website Title</label>
          <input
            type="text"
            value={settings.siteTitle || ''}
            onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Default Meta Description</label>
          <textarea
            rows={3}
            value={settings.defaultMetaDescription || ''}
            onChange={(e) => setSettings({ ...settings, defaultMetaDescription: e.target.value })}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
          />
        </div>
      </div>

      {/* Contact & Social Links */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          Communication & Social Matrix
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Inquiries Email</label>
          <input
            type="email"
            value={settings.contactEmail || ''}
            onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub Profile URL</label>
            <input
              type="url"
              value={settings.socialGithub || ''}
              onChange={(e) => setSettings({ ...settings, socialGithub: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono focus:outline-none focus:border-[#7025E8]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile URL</label>
            <input
              type="url"
              value={settings.socialLinkedin || ''}
              onChange={(e) => setSettings({ ...settings, socialLinkedin: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono focus:outline-none focus:border-[#7025E8]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">X / Twitter URL</label>
            <input
              type="url"
              value={settings.socialTwitter || ''}
              onChange={(e) => setSettings({ ...settings, socialTwitter: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono focus:outline-none focus:border-[#7025E8]"
            />
          </div>
        </div>
      </div>

      {/* Announcement Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">Global Announcement Banner</h3>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="bannerToggle"
              checked={settings.announcementBanner?.enabled || false}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcementBanner: {
                    ...settings.announcementBanner,
                    enabled: e.target.checked,
                  },
                })
              }
              className="rounded border-slate-300 text-[#7025E8] focus:ring-[#7025E8]"
            />
            <label htmlFor="bannerToggle" className="text-xs font-semibold text-slate-700 cursor-pointer">
              Enable Banner on Website
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Banner Announcement Text</label>
          <input
            type="text"
            value={settings.announcementBanner?.text || ''}
            onChange={(e) =>
              setSettings({
                ...settings,
                announcementBanner: {
                  ...settings.announcementBanner,
                  text: e.target.value,
                },
              })
            }
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7025E8]"
          />
        </div>
      </div>
    </form>
  );
};
