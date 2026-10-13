import React, { useEffect, useState } from 'react';
import { cmsClient } from '../../services/cmsClient';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle,
  Clock,
  Archive,
  Save,
  X,
  Layers,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

export const ProjectsManagerView: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'basics' | 'arch' | 'metrics'>('basics');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await cmsClient.getProjects();
      setProjects(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreateNew = () => {
    setEditingProject({
      id: `new_${Date.now()}`,
      title: '',
      slug: '',
      category: 'SaaS Platform',
      eyebrow: '',
      shortDescription: '',
      fullOverview: '',
      targetUsers: '',
      clientContext: '',
      problem: [''],
      constraints: [''],
      solution: [''],
      architecture: {
        frontend: 'React 19, TypeScript, Tailwind CSS',
        backend: 'Node.js, Express',
        database: 'PostgreSQL',
        integrations: [],
        infrastructure: 'Docker, AWS',
      },
      tradeoffs: [''],
      metrics: [{ label: '', value: '', context: '' }],
      tags: ['TypeScript', 'React', 'Node.js'],
      featured: false,
      status: 'draft',
      deliverables: ['Production System', 'Admin Portal', 'Documentation'],
    });
    setActiveTab('basics');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    setSaving(true);
    setError(null);
    try {
      await cmsClient.saveProject(editingProject);
      setEditingProject(null);
      await loadProjects();
    } catch (err: any) {
      setError(err.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete project "${title}"?`)) {
      return;
    }
    try {
      await cmsClient.deleteProject(id);
      await loadProjects();
    } catch (err: any) {
      alert(err.message || 'Failed to delete project');
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesQuery =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || p.status === filterStatus;
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Portfolio Projects & Case Studies</h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage deep architectural case studies, technical deliverables, and publication statuses.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#7025E8] hover:bg-[#5E1DC7] text-white text-xs font-semibold rounded-xl shadow-sm transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Case Study</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7025E8] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-slate-400 font-medium">Status:</span>
          {['all', 'published', 'draft', 'archived'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filterStatus === status
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-3 border-[#7025E8] border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No projects found matching the criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-5">Project Details</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-semibold text-slate-900">{p.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">/{p.slug}</div>
                    </td>
                    <td className="py-4 px-4 text-slate-600">{p.category}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-medium text-[11px] ${
                          p.status === 'published'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : p.status === 'draft'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {p.status === 'published' && <CheckCircle className="w-3 h-3" />}
                        {p.status === 'draft' && <Clock className="w-3 h-3" />}
                        {p.status === 'archived' && <Archive className="w-3 h-3" />}
                        <span className="capitalize">{p.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {p.featured ? (
                        <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                          Yes
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">No</span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-right space-x-2">
                      <button
                        onClick={() => setEditingProject({ ...p })}
                        className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="Edit project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit / Create Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-3xl my-8 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingProject.id.startsWith('new_') ? 'Create New Case Study' : `Edit: ${editingProject.title}`}
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  Slug: /{editingProject.slug || 'auto-generated'}
                </span>
              </div>
              <button
                onClick={() => setEditingProject(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-slate-200 px-5 gap-4 bg-white text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('basics')}
                className={`py-3 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'basics'
                    ? 'border-[#7025E8] text-[#7025E8]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                General & Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('arch')}
                className={`py-3 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'arch'
                    ? 'border-[#7025E8] text-[#7025E8]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Architecture & Solutions
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('metrics')}
                className={`py-3 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'metrics'
                    ? 'border-[#7025E8] text-[#7025E8]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Metrics & SEO
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {activeTab === 'basics' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Project Title *</label>
                      <input
                        type="text"
                        required
                        value={editingProject.title || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">URL Slug</label>
                      <input
                        type="text"
                        value={editingProject.slug || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                        placeholder="leave blank to auto-generate"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono focus:outline-none focus:border-[#7025E8] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Category</label>
                      <select
                        value={editingProject.category}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8]"
                      >
                        <option value="SaaS Platform">SaaS Platform</option>
                        <option value="AI Application">AI Application</option>
                        <option value="Custom Operational System">Custom Operational System</option>
                        <option value="Web Application">Web Application</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Status</label>
                      <select
                        value={editingProject.status}
                        onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8]"
                      >
                        <option value="published">Published (Live)</option>
                        <option value="draft">Draft (Private)</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2 pt-6">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={editingProject.featured || false}
                        onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                        className="rounded border-slate-300 text-[#7025E8] focus:ring-[#7025E8]"
                      />
                      <label htmlFor="featured" className="font-semibold text-slate-700">
                        Featured on Homepage
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Eyebrow / Subtitle</label>
                    <input
                      type="text"
                      value={editingProject.eyebrow || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, eyebrow: e.target.value })}
                      placeholder="e.g. Distributed Multi-Warehouse Logistics Engine"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Short Description</label>
                    <textarea
                      rows={2}
                      value={editingProject.shortDescription || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full System Overview</label>
                    <textarea
                      rows={4}
                      value={editingProject.fullOverview || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, fullOverview: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'arch' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Frontend Stack</label>
                      <input
                        type="text"
                        value={editingProject.architecture?.frontend || ''}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            architecture: { ...editingProject.architecture, frontend: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Backend Stack</label>
                      <input
                        type="text"
                        value={editingProject.architecture?.backend || ''}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            architecture: { ...editingProject.architecture, backend: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Database & Caches</label>
                      <input
                        type="text"
                        value={editingProject.architecture?.database || ''}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            architecture: { ...editingProject.architecture, database: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Cloud Infrastructure</label>
                      <input
                        type="text"
                        value={editingProject.architecture?.infrastructure || ''}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            architecture: { ...editingProject.architecture, infrastructure: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Key Architectural Solutions (one per line)</label>
                    <textarea
                      rows={3}
                      value={(editingProject.solution || []).join('\n')}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          solution: e.target.value.split('\n').filter(Boolean),
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Core Problems Solved (one per line)</label>
                    <textarea
                      rows={3}
                      value={(editingProject.problem || []).join('\n')}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          problem: e.target.value.split('\n').filter(Boolean),
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8]"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'metrics' && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">SEO Title Tag</label>
                    <input
                      type="text"
                      value={editingProject.seoTitle || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, seoTitle: e.target.value })}
                      placeholder="e.g. Distributed Inventory SaaS Architecture — Innosight"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">SEO Meta Description</label>
                    <textarea
                      rows={2}
                      value={editingProject.seoDescription || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, seoDescription: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Live URL (optional)</label>
                      <input
                        type="url"
                        value={editingProject.liveUrl || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono focus:outline-none focus:border-[#7025E8]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">GitHub / Repo URL (optional)</label>
                      <input
                        type="url"
                        value={editingProject.repoUrl || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, repoUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono focus:outline-none focus:border-[#7025E8]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
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
                  <span>Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
