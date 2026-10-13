import React, { useEffect, useState } from 'react';
import { cmsClient } from '../../services/cmsClient';
import {
  FolderKanban,
  FileText,
  Briefcase,
  Quote,
  Image as ImageIcon,
  ShieldAlert,
  ArrowUpRight,
  Plus,
  RefreshCw,
  CheckCircle2,
  Clock,
  Archive,
} from 'lucide-react';

interface OverviewViewProps {
  onNavigateTab: (tab: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ onNavigateTab }) => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadOverview = async () => {
    setLoading(true);
    try {
      const data = await cmsClient.getOverview();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOverview();
  }, []);

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 border-3 border-[#7025E8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">System Status & Content Health</h2>
          <p className="text-xs text-slate-500 mt-1">
            Production content synchronization active • Zero public draft leaks enforced
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={loadOverview}
            className="p-2 text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-xs transition-colors"
            title="Refresh statistics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigateTab('projects')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#7025E8] hover:bg-[#5E1DC7] text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Case Study</span>
          </button>
          <button
            onClick={() => onNavigateTab('articles')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Article</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Projects */}
        <div
          onClick={() => onNavigateTab('projects')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-[#7025E8]/40 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Projects</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#7025E8] flex items-center justify-center">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{stats?.totalProjects ?? 0}</div>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
              <CheckCircle2 className="w-3 h-3" /> {stats?.publishedProjects ?? 0} live
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-amber-600">
              <Clock className="w-3 h-3" /> {stats?.draftProjects ?? 0} drafts
            </span>
          </div>
        </div>

        {/* Services */}
        <div
          onClick={() => onNavigateTab('services')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-[#08C9F5]/40 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Services</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-50 text-[#08C9F5] flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{stats?.totalServices ?? 0}</div>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
              <CheckCircle2 className="w-3 h-3" /> {stats?.publishedServices ?? 0} published
            </span>
          </div>
        </div>

        {/* Articles */}
        <div
          onClick={() => onNavigateTab('articles')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Articles & Notes</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{stats?.totalArticles ?? 0}</div>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
              <CheckCircle2 className="w-3 h-3" /> {stats?.publishedArticles ?? 0} live
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-amber-600">
              <Clock className="w-3 h-3" /> {stats?.draftArticles ?? 0} drafts
            </span>
          </div>
        </div>

        {/* Media & Storage */}
        <div
          onClick={() => onNavigateTab('media')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Media Assets</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{stats?.mediaCount ?? 0}</div>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <span className="text-slate-600 font-medium">Magic-byte verified</span>
          </div>
        </div>
      </div>

      {/* Security & Audit Activity Panel */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#7025E8]" />
            <h3 className="text-sm font-bold text-slate-900">Recent Immutable Audit Activity</h3>
          </div>
          <button
            onClick={() => onNavigateTab('audit')}
            className="text-xs text-[#7025E8] hover:text-[#5E1DC7] font-semibold flex items-center gap-1"
          >
            <span>View Full Log</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {stats?.recentAudit?.length > 0 ? (
            stats.recentAudit.map((log: any) => (
              <div key={log.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-50/70 transition-colors">
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      log.outcome === 'success' ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  />
                  <div>
                    <span className="font-semibold text-slate-800 font-mono text-[11px] mr-2">
                      {log.action}
                    </span>
                    <span className="text-slate-500">{log.details}</span>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <div className="text-slate-400 text-[11px]">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="text-slate-500 font-mono text-[10px]">{log.actorEmail}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-slate-400">
              No audit records registered yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
