import React, { useEffect, useState } from 'react';
import { cmsClient } from '../../services/cmsClient';
import { Plus, Edit2, Trash2, CheckCircle, Save, X, Quote, ShieldCheck } from 'lucide-react';

export const TestimonialsManagerView: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await cmsClient.getTestimonials();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || 'Failed to load testimonials');
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateNew = () => {
    setEditingItem({
      id: `new_${Date.now()}`,
      quote: '',
      clientName: '',
      clientRole: '',
      clientCompany: '',
      verified: true,
      metric: '',
      order: testimonials.length + 1,
      status: 'published',
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    setError(null);
    try {
      await cmsClient.saveTestimonial(editingItem);
      setEditingItem(null);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Failed to save testimonial');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete testimonial from "${name}"?`)) return;
    try {
      await cmsClient.deleteTestimonial(id);
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Quote className="w-5 h-5 text-purple-600" />
            Client Testimonials & Credibility
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage authentic client reviews, verified performance metrics, and trust indicators.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#7025E8] hover:bg-[#5E1DC7] text-white text-xs font-semibold rounded-xl shadow-sm transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Testimonial</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-3 border-[#7025E8] border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {(Array.isArray(testimonials) ? testimonials : []).map((t) => (
              <div key={t.id} className="p-5 flex items-start justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{t.clientName}</span>
                    <span className="text-xs text-slate-500">
                      {t.clientRole} {t.clientCompany && `• ${t.clientCompany}`}
                    </span>
                    {t.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                        <ShieldCheck className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 italic">"{t.quote}"</p>
                  {t.metric && (
                    <div className="text-[11px] font-mono text-purple-700 font-semibold">
                      Metric Highlight: {t.metric}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setEditingItem({ ...t })}
                    className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id, t.clientName)}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg my-8 overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">
                {editingItem.id.startsWith('new_') ? 'Add Testimonial' : `Edit: ${editingItem.clientName}`}
              </h3>
              <button onClick={() => setEditingItem(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  value={editingItem.clientName || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, clientName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Role / Title</label>
                  <input
                    type="text"
                    value={editingItem.clientRole || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, clientRole: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={editingItem.clientCompany || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, clientCompany: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Verified Metric Highlight</label>
                <input
                  type="text"
                  value={editingItem.metric || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, metric: e.target.value })}
                  placeholder="e.g. 140k+ Daily Events"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Quote Statement *</label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.quote || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#7025E8] hover:bg-[#5E1DC7] text-white font-semibold rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>Save</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
