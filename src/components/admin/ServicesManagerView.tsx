import React, { useEffect, useState } from 'react';
import { cmsClient } from '../../services/cmsClient';
import { Plus, Edit2, Trash2, CheckCircle, Clock, Archive, Save, X, Briefcase, AlertCircle } from 'lucide-react';

export const ServicesManagerView: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadServices = async () => {
    setLoading(true);
    try {
      const data = await cmsClient.getServices();
      setServices(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || 'Failed to load services');
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleCreateNew = () => {
    setEditingService({
      id: `new_${Date.now()}`,
      title: '',
      slug: '',
      tagline: '',
      description: '',
      idealFor: [''],
      problemsSolved: [''],
      capabilities: [''],
      deliverables: [''],
      techStack: ['TypeScript', 'React', 'Node.js'],
      status: 'published',
      featured: true,
      order: services.length + 1,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    setSaving(true);
    setError(null);
    try {
      await cmsClient.saveService(editingService);
      setEditingService(null);
      await loadServices();
    } catch (err: any) {
      setError(err.message || 'Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete service "${title}"?`)) return;
    try {
      await cmsClient.deleteService(id);
      await loadServices();
    } catch (err: any) {
      alert(err.message || 'Failed to delete service');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#08C9F5]" />
            Software Engineering Services
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage public capability offerings, service cards, problems solved, and client deliverables.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#7025E8] hover:bg-[#5E1DC7] text-white text-xs font-semibold rounded-xl shadow-sm transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Service</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-3 border-[#7025E8] border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {(Array.isArray(services) ? services : []).map((s) => (
              <div key={s.id} className="p-5 flex items-start justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{s.title}</span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        s.status === 'published'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {s.status}
                    </span>
                  </div>
                  <p className="text-xs text-purple-700 font-medium">{s.tagline}</p>
                  <p className="text-xs text-slate-500 line-clamp-2">{s.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setEditingService({ ...s })}
                    className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id, s.title)}
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

      {editingService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl my-8 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">
                {editingService.id.startsWith('new_') ? 'Create Service Offering' : `Edit: ${editingService.title}`}
              </h3>
              <button onClick={() => setEditingService(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingService.tagline || ''}
                  onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Comprehensive Description</label>
                <textarea
                  rows={3}
                  value={editingService.description || ''}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Publication Status</label>
                  <select
                    value={editingService.status}
                    onChange={(e) => setEditingService({ ...editingService, status: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8]"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingService.order || 1}
                    onChange={(e) => setEditingService({ ...editingService, order: parseInt(e.target.value, 10) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
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
                  <span>Save Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
