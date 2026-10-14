import React, { useEffect, useState } from 'react';
import { cmsClient } from '../../services/cmsClient';
import { ShieldCheck, Search, Filter, RefreshCw, AlertCircle } from 'lucide-react';

export const AuditLogsView: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [outcomeFilter, setOutcomeFilter] = useState<'all' | 'success' | 'failure'>('all');

  const loadLogs = async () => {
    setLoading(true);
    try {
      const data = await cmsClient.getAuditLogs();
      setLogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const safeLogs = Array.isArray(logs) ? logs : [];
  const filteredLogs = safeLogs.filter((l) => {
    if (!l) return false;
    const action = String(l.action || '').toLowerCase();
    const details = String(l.details || '').toLowerCase();
    const actorEmail = String(l.actorEmail || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = action.includes(query) || details.includes(query) || actorEmail.includes(query);
    const matchesOutcome = outcomeFilter === 'all' || l.outcome === outcomeFilter;
    return matchesSearch && matchesOutcome;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#7025E8]" />
            Security Audit Trail & Governance
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Immutable system logs capturing administrative mutations, media uploads, and authentication attempts.
          </p>
        </div>

        <button
          onClick={loadLogs}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search audit trail..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7025E8] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-slate-400 font-medium">Outcome:</span>
          {(['all', 'success', 'failure'] as const).map((outcome) => (
            <button
              key={outcome}
              onClick={() => setOutcomeFilter(outcome)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                outcomeFilter === outcome
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {outcome}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-3 border-[#7025E8] border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No audit records found matching the filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-5">Timestamp</th>
                  <th className="py-3.5 px-4">Action</th>
                  <th className="py-3.5 px-4">Actor</th>
                  <th className="py-3.5 px-4">Details</th>
                  <th className="py-3.5 px-5 text-right">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-5 text-slate-500 font-mono text-[11px]">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                      {log.actorEmail}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate" title={log.details}>
                      {log.details}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-medium text-[11px] ${
                          log.outcome === 'success'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            log.outcome === 'success' ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                        />
                        <span className="capitalize">{log.outcome}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
