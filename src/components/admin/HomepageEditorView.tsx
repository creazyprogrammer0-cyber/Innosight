import React, { useEffect, useState } from 'react';
import { cmsClient } from '../../services/cmsClient';
import { Save, CheckCircle, RefreshCw, AlertCircle, LayoutTemplate } from 'lucide-react';

export const HomepageEditorView: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    heroEyebrow: '',
    heroTitle: '',
    heroDescription: '',
    primaryCtaText: '',
    primaryCtaLink: '',
    secondaryCtaText: '',
    secondaryCtaLink: '',
    servicesHeading: '',
    servicesDescription: '',
    aboutHeadline: '',
    aboutBody: '',
    aboutPortrait: '',
    finalCtaHeadline: '',
    finalCtaBody: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await cmsClient.getHomepage();
      setFormData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch homepage settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    setSavedSuccess(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const updated = await cmsClient.saveHomepage(formData);
      setFormData(updated);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || 'Failed to save changes');
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
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-[#7025E8]" />
            Homepage Content Editor
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Update key messaging, hero copy, and strategic call-to-actions across the public landing page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <CheckCircle className="w-4 h-4" />
              <span>Published Live</span>
            </div>
          )}
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7025E8] hover:bg-[#5E1DC7] text-white text-xs font-bold rounded-xl shadow-sm shadow-[#7025E8]/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>Save & Publish</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 1. Hero Section Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          1. Hero Section & Main Positioning
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Eyebrow Badge</label>
          <input
            type="text"
            name="heroEyebrow"
            value={formData.heroEyebrow || ''}
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Main Headline</label>
          <input
            type="text"
            name="heroTitle"
            value={formData.heroTitle || ''}
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#7025E8] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Supporting Description</label>
          <textarea
            name="heroDescription"
            rows={3}
            value={formData.heroDescription || ''}
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Primary CTA Label</label>
            <input
              type="text"
              name="primaryCtaText"
              value={formData.primaryCtaText || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Primary CTA Destination</label>
            <input
              type="text"
              name="primaryCtaLink"
              value={formData.primaryCtaLink || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono focus:outline-none focus:border-[#7025E8] focus:bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Secondary CTA Label</label>
            <input
              type="text"
              name="secondaryCtaText"
              value={formData.secondaryCtaText || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Secondary CTA Destination</label>
            <input
              type="text"
              name="secondaryCtaLink"
              value={formData.secondaryCtaLink || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono focus:outline-none focus:border-[#7025E8] focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* 2. Services Section Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          2. Services Section Heading
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Section Title</label>
          <input
            type="text"
            name="servicesHeading"
            value={formData.servicesHeading || ''}
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Section Subheading & Value Proposition</label>
          <textarea
            name="servicesDescription"
            rows={2}
            value={formData.servicesDescription || ''}
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
          />
        </div>
      </div>

      {/* 3. About Section Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          3. About Section & Founder Presence
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">About Headline</label>
          <input
            type="text"
            name="aboutHeadline"
            value={formData.aboutHeadline || ''}
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">About Bio & Philosophy</label>
          <textarea
            name="aboutBody"
            rows={4}
            value={formData.aboutBody || ''}
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Founder Portrait Asset URL</label>
          <input
            type="text"
            name="aboutPortrait"
            value={formData.aboutPortrait || ''}
            onChange={handleChange}
            placeholder="/images/team/jannatul.svg"
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono focus:outline-none focus:border-[#7025E8] focus:bg-white"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Accepts uploaded media URLs (e.g., from the Media Library) or static paths.
          </p>
        </div>
      </div>

      {/* 4. Final CTA Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          4. Bottom Conversion CTA Banner
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Headline</label>
          <input
            type="text"
            name="finalCtaHeadline"
            value={formData.finalCtaHeadline || ''}
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Supporting Body Text</label>
          <textarea
            name="finalCtaBody"
            rows={2}
            value={formData.finalCtaBody || ''}
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
          />
        </div>
      </div>
    </form>
  );
};
