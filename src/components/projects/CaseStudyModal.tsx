import React from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Layers,
  Database,
  ShieldCheck,
  Zap,
  Clock,
  UserCheck,
} from 'lucide-react';
import { Project } from '../../types';
import { InteractiveModal } from '../ui/InteractiveModal';
import { useTheme } from '../../context/ThemeContext';

interface CaseStudyModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onDiscussProject: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  isOpen,
  onClose,
  onDiscussProject,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  if (!project) return null;

  // Domain-specific sprint timeline and founder decision context based on real project specs
  const projectMetadataMap: { [key: string]: { duration: string; whyChosen: string } } = {
    apexmetrics: {
      duration: '6-Week Fixed Sprint',
      whyChosen: 'Founder needed a senior developer with Stripe webhook and high-volume PostgreSQL experience, avoiding a $45k agency fee and 4-month timeline.',
    },
    documind: {
      duration: '4-Week Fixed Sprint',
      whyChosen: 'Client needed deterministic, grounded JSON extraction with zero hallucination risk, requiring custom schema validation rather than generic chat wrapper.',
    },
    logicore: {
      duration: '8-Week Production Phase',
      whyChosen: 'Needed a full-stack partner who could design both offline-resilient warehouse PWA and deep Laravel ERP APIs without junior subcontracting.',
    },
    kinetix: {
      duration: '5-Week Delivery Sprint',
      whyChosen: 'Required an executive client-facing portal with AWS S3 encrypted asset vault and Stripe milestone escrow logic delivered on an aggressive deadline.',
    },
  };

  const currentMeta = projectMetadataMap[project.id] || {
    duration: '6-Week Sprint',
    whyChosen: 'Founder required a dedicated full-stack technical partner with direct communication and 100% IP ownership.',
  };

  return (
    <InteractiveModal
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      maxWidth="max-w-5xl"
    >
      <div className="space-y-10 text-left">
        {/* Header Kicker & Overview */}
        <div className={`space-y-3 pb-6 border-b ${isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]'}`}>
          {/* Zero-Pill Metadata */}
          <div className={`flex flex-wrap items-center gap-2 text-xs font-mono ${
            isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'
          }`}>
            <span className="text-[#08C9F5] font-semibold">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>Client: {project.clientContext}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#E000C9] flex items-center gap-1 font-semibold">
              <Clock className="w-3 h-3" /> {currentMeta.duration}
            </span>
          </div>

          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
            isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
          }`}>
            {project.title}
          </h1>

          <p className={`text-base leading-relaxed max-w-3xl ${
            isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'
          }`}>
            {project.fullOverview}
          </p>
        </div>

        {/* Quantifiable Results Banner */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl border transition-colors ${
          isLight
            ? 'bg-[#F7F8FC] border-[#E4E7F0]'
            : 'bg-[#080D18] border-[#1E293B]'
        }`}>
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="space-y-1">
              <span className={`text-2xl sm:text-3xl font-extrabold font-mono tabular-nums tracking-tight ${
                isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
              }`}>
                {metric.value}
              </span>
              <span className="text-xs font-semibold text-[#08C9F5] block">
                {metric.label}
              </span>
              <span className={`text-xs block leading-snug ${isLight ? 'text-[#64748B]' : 'text-[#64748B]'}`}>
                {metric.context}
              </span>
            </div>
          ))}
        </div>

        {/* Why Founder Chose Innosight Trust Callout */}
        <div className={`p-4 rounded-xl border flex items-start gap-3 transition-colors ${
          isLight
            ? 'bg-[#EEF2FF] border-[#7025E8]/20'
            : 'bg-[#0E1627] border-[#7025E8]/30'
        }`}>
          <UserCheck className="w-5 h-5 text-[#08C9F5] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <span className={`font-bold uppercase tracking-wider font-mono ${
              isLight ? 'text-[#1E1B4B]' : 'text-[#F6F7FF]'
            }`}>
              Why the Founder Chose Innosight
            </span>
            <p className={`leading-relaxed ${isLight ? 'text-[#374151]' : 'text-[#CBD5E1]'}`}>
              {currentMeta.whyChosen}
            </p>
          </div>
        </div>

        {/* Target Users & Constraints Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Target Users */}
          <div className={`space-y-3 p-5 rounded-xl border transition-colors ${
            isLight
              ? 'bg-[#F7F8FC] border-[#E4E7F0]'
              : 'bg-[#080D18]/60 border-[#1E293B]'
          }`}>
            <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${
              isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
            }`}>
              <Layers className="w-4 h-4 text-[#08C9F5]" />
              Target Users & Stakeholders
            </h3>
            <p className={`text-sm leading-relaxed ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
              {project.targetUsers}
            </p>
          </div>

          {/* Hard Constraints */}
          <div className={`space-y-3 p-5 rounded-xl border transition-colors ${
            isLight
              ? 'bg-[#F7F8FC] border-[#E4E7F0]'
              : 'bg-[#080D18]/60 border-[#1E293B]'
          }`}>
            <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${
              isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
            }`}>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Technical & Business Constraints
            </h3>
            <ul className={`space-y-2 text-sm ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
              {project.constraints.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#08C9F5] font-mono mt-0.5">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Problem Statement vs Implemented Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem */}
          <div className="space-y-3">
            <h3 className={`text-sm font-bold uppercase tracking-wider ${
              isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
            }`}>
              The Core Problem
            </h3>
            <ul className={`space-y-2.5 text-sm ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
              {project.problem.map((prob, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400/80 mt-2 shrink-0" />
                  <span>{prob}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="space-y-3">
            <h3 className={`text-sm font-bold uppercase tracking-wider ${
              isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
            }`}>
              Engineered Solution
            </h3>
            <ul className={`space-y-2.5 text-sm ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
              {project.solution.map((sol, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{sol}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technical Architecture Breakdown */}
        <div className={`space-y-4 pt-4 border-t ${isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]'}`}>
          <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${
            isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
          }`}>
            <Cpu className="w-4 h-4 text-[#7025E8]" />
            Technical Architecture & Stack
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
            <div className={`p-3.5 rounded-lg border transition-colors ${
              isLight ? 'bg-[#F7F8FC] border-[#E4E7F0]' : 'bg-[#080D18] border-[#1E293B]'
            }`}>
              <span className={`block text-[10px] uppercase ${isLight ? 'text-[#64748B]' : 'text-[#64748B]'}`}>Frontend Layer</span>
              <span className={`font-medium mt-1 block ${isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'}`}>{project.architecture.frontend}</span>
            </div>
            <div className={`p-3.5 rounded-lg border transition-colors ${
              isLight ? 'bg-[#F7F8FC] border-[#E4E7F0]' : 'bg-[#080D18] border-[#1E293B]'
            }`}>
              <span className={`block text-[10px] uppercase ${isLight ? 'text-[#64748B]' : 'text-[#64748B]'}`}>Backend Services</span>
              <span className={`font-medium mt-1 block ${isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'}`}>{project.architecture.backend}</span>
            </div>
            <div className={`p-3.5 rounded-lg border transition-colors ${
              isLight ? 'bg-[#F7F8FC] border-[#E4E7F0]' : 'bg-[#080D18] border-[#1E293B]'
            }`}>
              <span className={`block text-[10px] uppercase ${isLight ? 'text-[#64748B]' : 'text-[#64748B]'}`}>Database & Storage</span>
              <span className={`font-medium mt-1 block ${isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'}`}>{project.architecture.database}</span>
            </div>
            <div className={`p-3.5 rounded-lg border transition-colors ${
              isLight ? 'bg-[#F7F8FC] border-[#E4E7F0]' : 'bg-[#080D18] border-[#1E293B]'
            }`}>
              <span className={`block text-[10px] uppercase ${isLight ? 'text-[#64748B]' : 'text-[#64748B]'}`}>Infrastructure & Deploy</span>
              <span className={`font-medium mt-1 block ${isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'}`}>{project.architecture.infrastructure}</span>
            </div>
            <div className={`p-3.5 rounded-lg border sm:col-span-2 transition-colors ${
              isLight ? 'bg-[#F7F8FC] border-[#E4E7F0]' : 'bg-[#080D18] border-[#1E293B]'
            }`}>
              <span className={`block text-[10px] uppercase ${isLight ? 'text-[#64748B]' : 'text-[#64748B]'}`}>Critical Integrations</span>
              <span className={`font-medium mt-1 block ${isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'}`}>
                {project.architecture.integrations.join(' · ')}
              </span>
            </div>
          </div>
        </div>

        {/* Engineering Trade-Offs (Critical for Senior Founders) */}
        <div className={`space-y-3 p-5 rounded-xl border transition-colors ${
          isLight
            ? 'bg-[#F7F8FC] border-[#E4E7F0]'
            : 'bg-[#080D18] border-[#1E293B]'
        }`}>
          <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${
            isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
          }`}>
            <Zap className="w-4 h-4 text-[#E000C9]" />
            Key Architectural Trade-Offs
          </h3>
          <ul className={`space-y-2.5 text-sm ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
            {project.tradeoffs.map((tradeoff, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-[#E000C9] font-mono mt-0.5">✦</span>
                <span className="leading-relaxed">{tradeoff}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Completed Deliverables */}
        <div className="space-y-3">
          <h3 className={`text-sm font-bold uppercase tracking-wider ${
            isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
          }`}>
            Completed Deliverables Handed Over to Client
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {project.deliverables.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 p-2.5 rounded-lg border transition-colors ${
                  isLight
                    ? 'bg-[#F7F8FC] border-[#E4E7F0] text-[#334155]'
                    : 'bg-[#080D18]/40 border-[#1E293B]/60 text-[#A8B3C9]'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#08C9F5] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contextual CTA for Founders */}
        <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border transition-colors ${
          isLight
            ? 'border-[#E4E7F0] bg-gradient-to-r from-slate-50 to-indigo-50/50 border-[#7025E8]/20'
            : 'border-[#1E293B] bg-gradient-to-r from-[#0E1627] to-[#131E33] border-[#7025E8]/30'
        }`}>
          <div>
            <h4 className={`text-base font-bold ${isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'}`}>
              Building a {project.category} on a similar timeline?
            </h4>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-[#64748B]' : 'text-[#A8B3C9]'}`}>
              Let’s review your database schema, architecture trade-offs, and estimated sprint delivery.
            </p>
          </div>
          <button
            onClick={() => {
              onClose();
              onDiscussProject();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#2364F5] to-[#7025E8] hover:from-[#08C9F5] hover:to-[#2364F5] rounded-xl transition-all shadow-md shadow-[#7025E8]/20 shrink-0"
          >
            <span>Estimate a similar build</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </InteractiveModal>
  );
};
