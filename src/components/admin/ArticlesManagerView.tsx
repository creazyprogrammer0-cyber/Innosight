import React, { useEffect, useState } from 'react';
import { cmsClient } from '../../services/cmsClient';
import { Plus, Edit2, Trash2, CheckCircle, Clock, Archive, Save, X, FileText, AlertCircle } from 'lucide-react';

export const ArticlesManagerView: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const data = await cmsClient.getArticles();
      setArticles(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleCreateNew = () => {
    setEditingArticle({
      id: `new_${Date.now()}`,
      title: '',
      slug: '',
      summary: '',
      category: 'Software Architecture',
      readTime: '5 min read',
      publishedDate: 'April 2026',
      author: 'Jannatul (Founder & Lead Architect)',
      tags: ['Architecture', 'Startups'],
      content: {
        introduction: '',
        sections: [
          {
            heading: '',
            paragraphs: [''],
            keyTakeaways: [''],
          },
        ],
        conclusion: '',
      },
      status: 'draft',
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;
    setSaving(true);
    setError(null);
    try {
      await cmsClient.saveArticle(editingArticle);
      setEditingArticle(null);
      await loadArticles();
    } catch (err: any) {
      setError(err.message || 'Failed to save article');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete article "${title}"?`)) return;
    try {
      await cmsClient.deleteArticle(id);
      await loadArticles();
    } catch (err: any) {
      alert(err.message || 'Failed to delete article');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            Insights & Architecture Notes
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Publish engineering articles, technical breakdown essays, and founder insights.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#7025E8] hover:bg-[#5E1DC7] text-white text-xs font-semibold rounded-xl shadow-sm transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-3 border-[#7025E8] border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {articles.map((art) => (
              <div key={art.id} className="p-5 flex items-start justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{art.title}</span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        art.status === 'published'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {art.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span>{art.category}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                    <span>•</span>
                    <span>{art.publishedDate}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">{art.summary}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setEditingArticle({ ...art })}
                    className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(art.id, art.title)}
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

      {editingArticle && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl my-8 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">
                {editingArticle.id.startsWith('new_') ? 'Create Technical Article' : `Edit: ${editingArticle.title}`}
              </h3>
              <button onClick={() => setEditingArticle(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={editingArticle.title || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingArticle.category || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Publication Status</label>
                  <select
                    value={editingArticle.status}
                    onChange={(e) => setEditingArticle({ ...editingArticle, status: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8]"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Summary / Excerpt</label>
                <textarea
                  rows={2}
                  value={editingArticle.summary || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, summary: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Introduction</label>
                <textarea
                  rows={3}
                  value={editingArticle.content?.introduction || ''}
                  onChange={(e) =>
                    setEditingArticle({
                      ...editingArticle,
                      content: { ...editingArticle.content, introduction: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Main Body Paragraphs (separated by blank lines)</label>
                <textarea
                  rows={5}
                  value={
                    editingArticle.content?.sections?.[0]?.paragraphs?.join('\n\n') || ''
                  }
                  onChange={(e) => {
                    const pars = e.target.value.split('\n\n').filter(Boolean);
                    setEditingArticle({
                      ...editingArticle,
                      content: {
                        ...editingArticle.content,
                        sections: [
                          {
                            heading: editingArticle.content?.sections?.[0]?.heading || 'Core Architectural Principle',
                            paragraphs: pars,
                            keyTakeaways: editingArticle.content?.sections?.[0]?.keyTakeaways || [],
                          },
                        ],
                      },
                    });
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Conclusion</label>
                <textarea
                  rows={2}
                  value={editingArticle.content?.conclusion || ''}
                  onChange={(e) =>
                    setEditingArticle({
                      ...editingArticle,
                      content: { ...editingArticle.content, conclusion: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#7025E8] focus:bg-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
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
                  <span>Save Article</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
