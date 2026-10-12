import React from 'react';
import { ArrowUpRight, CheckCircle2, Layers, Cpu, Database, Activity } from 'lucide-react';
import { Project } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenCaseStudy,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <article
      onClick={() => onOpenCaseStudy(project)}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 flex flex-col cursor-pointer border ${
        isLight
          ? 'bg-white hover:bg-slate-50 border-[#E4E7F0] hover:border-[#7025E8]/40 shadow-sm hover:shadow-xl'
          : 'bg-[#0E1627] hover:bg-[#121B30] border-[#1E293B] hover:border-[#7025E8]/40 shadow-lg hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)]'
      }`}
    >
      {/* Interface Visual Preview Header */}
      <div
        className={`relative h-60 sm:h-64 w-full border-b overflow-hidden flex flex-col justify-between p-5 transition-colors ${
          isLight
            ? 'bg-[#F1F3F9] border-[#E4E7F0]'
            : 'bg-[#080D18] border-[#1E293B]'
        }`}
      >
        {/* Decorative subtle atmospheric background glow tied to brand */}
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-[#08C9F5]/10 via-[#7025E8]/10 to-transparent blur-2xl pointer-events-none" />

        {/* Mock Application Window Header Chrome */}
        <div
          className={`flex items-center justify-between border-b pb-3 relative z-10 ${
            isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]/60'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${isLight ? 'bg-slate-300' : 'bg-[#334155]'}`} />
            <span className={`w-2.5 h-2.5 rounded-full ${isLight ? 'bg-slate-300' : 'bg-[#334155]'}`} />
            <span className={`w-2.5 h-2.5 rounded-full ${isLight ? 'bg-slate-300' : 'bg-[#334155]'}`} />
            <span
              className={`text-[11px] font-mono ml-2 truncate max-w-[180px] ${
                isLight ? 'text-[#64748B]' : 'text-[#64748B]'
              }`}
            >
              {project.slug}.app
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#08C9F5] flex items-center gap-1 font-semibold">
            <Activity className="w-3 h-3" />
            <span>Production Verified</span>
          </span>
        </div>

        {/* Specialized High-Fidelity UI Visualization based on Project Type */}
        <div className="relative z-10 py-3 flex-1 flex flex-col justify-center">
          {project.id === 'apexmetrics' && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div
                  className={`p-2.5 rounded-lg border ${
                    isLight
                      ? 'bg-white border-[#E4E7F0]'
                      : 'bg-[#0E1627] border-[#1E293B]'
                  }`}
                >
                  <span className="text-[10px] text-[#64748B] block uppercase tracking-wider">MRR Growth</span>
                  <span
                    className={`text-sm font-bold font-mono tabular-nums ${
                      isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
                    }`}
                  >
                    $48,250
                  </span>
                  <span className="text-[10px] text-emerald-500 font-mono font-semibold">+18.4%</span>
                </div>
                <div
                  className={`p-2.5 rounded-lg border ${
                    isLight
                      ? 'bg-white border-[#E4E7F0]'
                      : 'bg-[#0E1627] border-[#1E293B]'
                  }`}
                >
                  <span className="text-[10px] text-[#64748B] block uppercase tracking-wider">Net Retention</span>
                  <span
                    className={`text-sm font-bold font-mono tabular-nums ${
                      isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
                    }`}
                  >
                    114.2%
                  </span>
                  <span className="text-[10px] text-emerald-500 font-mono font-semibold">Top Quartile</span>
                </div>
                <div
                  className={`p-2.5 rounded-lg border ${
                    isLight
                      ? 'bg-white border-[#E4E7F0]'
                      : 'bg-[#0E1627] border-[#1E293B]'
                  }`}
                >
                  <span className="text-[10px] text-[#64748B] block uppercase tracking-wider">Active Subs</span>
                  <span
                    className={`text-sm font-bold font-mono tabular-nums ${
                      isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
                    }`}
                  >
                    4,280
                  </span>
                  <span className="text-[10px] text-[#08C9F5] font-mono font-semibold">Live Sync</span>
                </div>
              </div>
              {/* Mini Sparkline Bar Chart */}
              <div className="flex items-end gap-1.5 h-10 pt-2 px-1">
                {[35, 45, 40, 60, 55, 75, 70, 85, 95, 90, 110, 125].map((val, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-gradient-to-t from-[#2364F5] to-[#08C9F5] rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity"
                    style={{ height: `${(val / 130) * 100}%` }}
                  />
                ))}
              </div>
            </div>
          )}

          {project.id === 'documind' && (
            <div
              className={`space-y-2 p-3 rounded-lg border ${
                isLight
                  ? 'bg-white border-[#E4E7F0]'
                  : 'bg-[#0E1627]/80 border-[#1E293B]'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className={`font-medium flex items-center gap-1.5 ${isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'}`}>
                  <Cpu className="w-3.5 h-3.5 text-[#E000C9]" />
                  <span>Gemini Schema Extraction Pipeline</span>
                </span>
                <span className="text-[11px] font-mono text-emerald-500 font-semibold">98.4% Match</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                <div
                  className={`p-2 rounded border ${
                    isLight
                      ? 'bg-[#F7F8FC] border-[#E4E7F0] text-[#4B5565]'
                      : 'bg-[#080D18] border-[#1E293B]/60 text-[#94A3B8]'
                  }`}
                >
                  <span className="text-[#E000C9] block">clause_liability:</span>
                  <span className={isLight ? 'text-[#11172A] font-semibold truncate block' : 'text-white truncate block'}>
                    capped_at_12_mo_fees
                  </span>
                </div>
                <div
                  className={`p-2 rounded border ${
                    isLight
                      ? 'bg-[#F7F8FC] border-[#E4E7F0] text-[#4B5565]'
                      : 'bg-[#080D18] border-[#1E293B]/60 text-[#94A3B8]'
                  }`}
                >
                  <span className="text-[#08C9F5] block">payment_terms:</span>
                  <span className={isLight ? 'text-[#11172A] font-semibold truncate block' : 'text-white truncate block'}>
                    net_30_days_ach
                  </span>
                </div>
              </div>
              <div className="text-[10px] text-[#64748B] flex items-center justify-between pt-1">
                <span>Vector Chunk ID: 0x88F9</span>
                <span className="text-[#08C9F5] font-semibold">Source PDF: Section 4.2 Citation</span>
              </div>
            </div>
          )}

          {project.id === 'logicore' && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                <span className={`flex items-center gap-1.5 font-medium ${isLight ? 'text-[#11172A]' : 'text-white'}`}>
                  <Database className="w-3.5 h-3.5 text-[#08C9F5]" />
                  <span>Warehouse Hub Dispatcher</span>
                </span>
                <span className="font-mono text-xs text-amber-500 font-semibold">28 Active Routes</span>
              </div>
              <div
                className={`p-2.5 rounded-lg border flex items-center justify-between text-xs font-mono ${
                  isLight
                    ? 'bg-white border-[#E4E7F0]'
                    : 'bg-[#0E1627] border-[#1E293B]'
                }`}
              >
                <div>
                  <span className="text-[#64748B] block text-[10px]">ROUTE #MD-402</span>
                  <span className={`font-semibold ${isLight ? 'text-[#11172A]' : 'text-white'}`}>
                    14 Stops · 180 SKUs
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-500 font-semibold text-[11px]">Manifest Verified</span>
                  <span className="text-[#64748B] block text-[10px]">ETA: 10:45 AM</span>
                </div>
              </div>
              <div className="h-1.5 w-full bg-[#1E293B]/40 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#08C9F5] to-[#7025E8] w-4/5 rounded-full" />
              </div>
            </div>
          )}

          {project.id === 'kinetix' && (
            <div
              className={`space-y-2 p-3 rounded-lg border ${
                isLight
                  ? 'bg-white border-[#E4E7F0]'
                  : 'bg-[#0E1627]/90 border-[#1E293B]'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className={`font-medium flex items-center gap-1.5 ${isLight ? 'text-[#11172A]' : 'text-white'}`}>
                  <Layers className="w-3.5 h-3.5 text-[#7025E8]" />
                  <span>Milestone 03: Production Delivery</span>
                </span>
                <span className="text-[11px] font-mono text-emerald-500 font-semibold">Approved</span>
              </div>
              <div className="space-y-1.5 pt-1 text-[11px]">
                <div className={`flex items-center justify-between ${isLight ? 'text-[#4B5565]' : 'text-[#94A3B8]'}`}>
                  <span>API Integration & Webhooks</span>
                  <span className="text-emerald-500 font-mono font-semibold">Complete</span>
                </div>
                <div className={`flex items-center justify-between ${isLight ? 'text-[#4B5565]' : 'text-[#94A3B8]'}`}>
                  <span>Escrow Milestone Release</span>
                  <span className={`font-mono font-semibold ${isLight ? 'text-[#11172A]' : 'text-white'}`}>
                    $12,500 Signed
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Kicker Label */}
        <div
          className={`flex items-center justify-between text-xs pt-2 border-t ${
            isLight ? 'border-[#E4E7F0] text-[#64748B]' : 'border-[#1E293B]/60 text-[#64748B]'
          }`}
        >
          <span className={`text-[11px] font-mono tracking-wider ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
            {project.eyebrow}
          </span>
          <span className="text-[11px] text-[#08C9F5] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-semibold">
            Read Case Study <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Zero-Pill Metadata Discipline: Clean unboxed text with typographic separator */}
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="text-[#08C9F5] font-semibold">{project.category}</span>
            <span aria-hidden="true" className={isLight ? 'text-[#CBD5E1]' : 'text-[#475569]'}>
              ·
            </span>
            <span className={isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}>
              Production Deployment
            </span>
          </div>

          <h3
            className={`text-xl font-bold tracking-tight transition-colors ${
              isLight
                ? 'text-[#11172A] group-hover:text-[#2364F5]'
                : 'text-[#F6F7FF] group-hover:text-white'
            }`}
          >
            {project.title}
          </h3>

          <p
            className={`text-sm leading-relaxed line-clamp-2 ${
              isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'
            }`}
          >
            {project.shortDescription}
          </p>
        </div>

        {/* Metrics Grid */}
        <div
          className={`mt-5 pt-4 border-t grid grid-cols-3 gap-2 ${
            isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]'
          }`}
        >
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col">
              <span
                className={`text-xs font-mono font-bold tabular-nums ${
                  isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
                }`}
              >
                {metric.value}
              </span>
              <span className="text-[10px] text-[#64748B] truncate">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Zero-Pill Tech Tags: Unboxed text with subtle separators */}
        <div
          className={`mt-4 pt-3 border-t flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono ${
            isLight
              ? 'border-[#E4E7F0] text-[#64748B]'
              : 'border-[#1E293B]/60 text-[#64748B]'
          }`}
        >
          {project.tags.map((tag, idx) => (
            <React.Fragment key={tag}>
              <span
                className={`transition-colors ${
                  isLight ? 'hover:text-[#11172A]' : 'hover:text-[#A8B3C9]'
                }`}
              >
                {tag}
              </span>
              {idx < project.tags.length - 1 && (
                <span aria-hidden="true" className={isLight ? 'text-[#CBD5E1]' : 'text-[#334155]'}>
                  /
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </article>
  );
};
