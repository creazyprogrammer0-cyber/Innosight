import React, { useState } from 'react';
import {
  ArrowUpRight,
  ArrowDown,
  Activity,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Cpu,
  Database,
  Lock,
} from 'lucide-react';
import { InnosightLogo } from '../brand/InnosightLogo';
import { useTheme } from '../../context/ThemeContext';

interface HeroSectionProps {
  onDiscussProject: () => void;
  onExploreWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onDiscussProject,
  onExploreWork,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [activeTab, setActiveTab] = useState<'saas' | 'ai' | 'erp'>('saas');

  return (
    <section
      className={`relative pt-32 sm:pt-40 pb-20 md:pb-28 overflow-hidden transition-colors ${
        isLight ? 'bg-[#F7F8FC]' : 'bg-[#080D18]'
      }`}
    >
      {/* Restrained atmospheric gradient glow tied strictly to brand electric blue, violet, and magenta */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#08C9F5]/8 via-[#7025E8]/12 to-[#E000C9]/8 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#7025E8]/5 blur-[90px] pointer-events-none rounded-full" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split-Screen Hero: Left typographic hierarchy + Right layered software interface panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column (7 cols): High-Converting Founder Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Eyebrow kicker: Product Thinking × Software Engineering */}
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#08C9F5] uppercase">
              <span>FOUNDING FULL-STACK ENGINEER</span>
              <span className="text-[#E000C9]" aria-hidden="true">×</span>
              <span>TECHNICAL PARTNER</span>
            </div>

            {/* Primary Headline with text-wrap: balance */}
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] text-balance ${
                isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
              }`}
            >
              Turn complex founder visions into{' '}
              <span className="brand-gradient-text">revenue-ready software.</span>
            </h1>

            {/* Supporting Copy - Sharp, outcome-focused, anti-generic */}
            <p
              className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
                isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'
              }`}
            >
              I partner directly with early-stage & non-technical founders to architect, build, and ship
              production SaaS platforms, web applications, and practical AI workflows in 4–8 week fixed
              sprint milestones. No agency bloat. No junior handoffs.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={onDiscussProject}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-[#2364F5] via-[#7025E8] to-[#E000C9] hover:opacity-95 rounded-xl shadow-lg shadow-[#7025E8]/25 transition-all duration-200 active:scale-[0.98]"
              >
                <span>Book 20-Min Scoping Call</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={onExploreWork}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wide rounded-xl border transition-all duration-200 ${
                  isLight
                    ? 'bg-white text-[#11172A] border-[#E4E7F0] hover:bg-slate-50 shadow-sm'
                    : 'bg-[#0E1627] text-[#F6F7FF] border-[#1E293B] hover:bg-[#131E33] hover:border-[#7025E8]/40'
                }`}
              >
                <span>Explore Proven Builds</span>
                <ArrowDown className={`w-4 h-4 ${isLight ? 'text-[#64748B]' : 'text-[#A8B3C9]'}`} />
              </button>
            </div>

            {/* Founder Friction-Reduction Reassurances */}
            <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
              <div
                className={`flex items-center gap-1.5 font-medium ${
                  isLight ? 'text-[#334155]' : 'text-[#CBD5E1]'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Code & IP Ownership</span>
              </div>
              <span aria-hidden="true" className={isLight ? 'text-[#CBD5E1]' : 'text-[#334155]'}>
                ·
              </span>
              <div
                className={`flex items-center gap-1.5 font-medium ${
                  isLight ? 'text-[#334155]' : 'text-[#CBD5E1]'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#08C9F5]" />
                <span>Fixed-Price Milestone Scoping</span>
              </div>
              <span aria-hidden="true" className={isLight ? 'text-[#CBD5E1]' : 'text-[#334155]'}>
                ·
              </span>
              <div
                className={`flex items-center gap-1.5 font-medium ${
                  isLight ? 'text-[#334155]' : 'text-[#CBD5E1]'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-violet-500" />
                <span>24-Hour Scoping Response</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Layered Software Interface Composition */}
          <div className="lg:col-span-5 relative">
            <div
              className={`relative rounded-2xl border p-5 overflow-hidden group transition-colors ${
                isLight
                  ? 'bg-white border-[#E4E7F0] shadow-xl text-[#11172A]'
                  : 'bg-[#0E1627] border-[#1E293B] shadow-2xl text-[#F6F7FF]'
              }`}
            >
              {/* Top Window Bar + Interactive Architecture Switcher */}
              <div
                className={`flex items-center justify-between pb-3 mb-3 border-b ${
                  isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]/70'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80" />
                  <span
                    className={`text-[11px] font-mono ml-2 truncate max-w-[150px] ${
                      isLight ? 'text-[#64748B]' : 'text-[#64748B]'
                    }`}
                  >
                    innosight.cloud/core
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-[#08C9F5] bg-[#08C9F5]/10 px-2 py-0.5 rounded">
                  <span>PRODUCTION READY</span>
                </div>
              </div>

              {/* Architecture Switcher Tabs */}
              <div
                className={`flex items-center gap-1 p-1 rounded-lg mb-3 text-[11px] border ${
                  isLight
                    ? 'bg-[#F7F8FC] border-[#E4E7F0]'
                    : 'bg-[#080D18] border-[#1E293B]/60'
                }`}
              >
                <button
                  onClick={() => setActiveTab('saas')}
                  className={`flex-1 py-1 px-2 rounded font-medium transition-all ${
                    activeTab === 'saas'
                      ? isLight
                        ? 'bg-white text-[#11172A] shadow-sm font-semibold'
                        : 'bg-[#1E293B] text-white shadow-sm font-semibold'
                      : isLight
                        ? 'text-[#64748B] hover:text-[#11172A]'
                        : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  SaaS Pipeline
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`flex-1 py-1 px-2 rounded font-medium transition-all ${
                    activeTab === 'ai'
                      ? isLight
                        ? 'bg-white text-[#11172A] shadow-sm font-semibold'
                        : 'bg-[#1E293B] text-white shadow-sm font-semibold'
                      : isLight
                        ? 'text-[#64748B] hover:text-[#11172A]'
                        : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  AI Doc Engine
                </button>
                <button
                  onClick={() => setActiveTab('erp')}
                  className={`flex-1 py-1 px-2 rounded font-medium transition-all ${
                    activeTab === 'erp'
                      ? isLight
                        ? 'bg-white text-[#11172A] shadow-sm font-semibold'
                        : 'bg-[#1E293B] text-white shadow-sm font-semibold'
                      : isLight
                        ? 'text-[#64748B] hover:text-[#11172A]'
                        : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  Custom ERP
                </button>
              </div>

              {/* Dynamic Software Panel View */}
              {activeTab === 'saas' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div
                      className={`p-3 rounded-xl border ${
                        isLight
                          ? 'bg-[#F7F8FC] border-[#E4E7F0]'
                          : 'bg-[#080D18] border-[#1E293B]'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-[#64748B] uppercase block">
                        Ingestion Latency
                      </span>
                      <span
                        className={`text-lg font-bold font-mono tabular-nums ${
                          isLight ? 'text-[#11172A]' : 'text-white'
                        }`}
                      >
                        142ms
                      </span>
                      <span className="text-[10px] text-emerald-500 font-mono block mt-0.5">
                        Redis queue buffered
                      </span>
                    </div>
                    <div
                      className={`p-3 rounded-xl border ${
                        isLight
                          ? 'bg-[#F7F8FC] border-[#E4E7F0]'
                          : 'bg-[#080D18] border-[#1E293B]'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-[#64748B] uppercase block">
                        Stripe Webhook Sync
                      </span>
                      <span
                        className={`text-lg font-bold font-mono tabular-nums ${
                          isLight ? 'text-[#11172A]' : 'text-white'
                        }`}
                      >
                        99.98%
                      </span>
                      <span className="text-[10px] text-[#08C9F5] font-mono block mt-0.5">
                        Zero dropped events
                      </span>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-xl border space-y-2 ${
                      isLight
                        ? 'bg-[#F7F8FC] border-[#E4E7F0]'
                        : 'bg-[#080D18] border-[#1E293B]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-semibold ${isLight ? 'text-[#11172A]' : 'text-white'}`}>
                        Event Architecture Pipeline
                      </span>
                      <span className="text-[10px] font-mono text-[#64748B]">PostgreSQL + BullMQ</span>
                    </div>
                    <div className="space-y-1.5 font-mono text-[11px]">
                      <div
                        className={`flex items-center justify-between p-2 rounded border ${
                          isLight
                            ? 'bg-white border-[#E4E7F0] text-[#334155]'
                            : 'bg-[#0E1627] border-[#1E293B]/60 text-[#CBD5E1]'
                        }`}
                      >
                        <span>Stripe Webhook Ingestion</span>
                        <span className="text-emerald-500 font-bold">Idempotent 200</span>
                      </div>
                      <div
                        className={`flex items-center justify-between p-2 rounded border ${
                          isLight
                            ? 'bg-white border-[#E4E7F0] text-[#334155]'
                            : 'bg-[#0E1627] border-[#1E293B]/60 text-[#CBD5E1]'
                        }`}
                      >
                        <span>Materialized Revenue Cohort</span>
                        <span className="text-[#08C9F5] font-bold">Refreshed</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div
                      className={`p-3 rounded-xl border ${
                        isLight
                          ? 'bg-[#F7F8FC] border-[#E4E7F0]'
                          : 'bg-[#080D18] border-[#1E293B]'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-[#64748B] uppercase block">
                        Schema Accuracy
                      </span>
                      <span
                        className={`text-lg font-bold font-mono tabular-nums ${
                          isLight ? 'text-[#11172A]' : 'text-white'
                        }`}
                      >
                        98.4%
                      </span>
                      <span className="text-[10px] text-emerald-500 font-mono block mt-0.5">
                        Strict JSON typing
                      </span>
                    </div>
                    <div
                      className={`p-3 rounded-xl border ${
                        isLight
                          ? 'bg-[#F7F8FC] border-[#E4E7F0]'
                          : 'bg-[#080D18] border-[#1E293B]'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-[#64748B] uppercase block">
                        Processing Time
                      </span>
                      <span
                        className={`text-lg font-bold font-mono tabular-nums ${
                          isLight ? 'text-[#11172A]' : 'text-white'
                        }`}
                      >
                        4.2s
                      </span>
                      <span className="text-[10px] text-[#08C9F5] font-mono block mt-0.5">
                        20-page PDF contract
                      </span>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-xl border space-y-2 ${
                      isLight
                        ? 'bg-[#F7F8FC] border-[#E4E7F0]'
                        : 'bg-[#080D18] border-[#1E293B]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-semibold ${isLight ? 'text-[#11172A]' : 'text-white'}`}>
                        Gemini Extraction Stream
                      </span>
                      <span className="text-[10px] font-mono text-[#E000C9]">pgvector RAG</span>
                    </div>
                    <div className="space-y-1.5 font-mono text-[11px]">
                      <div
                        className={`flex items-center justify-between p-2 rounded border ${
                          isLight
                            ? 'bg-white border-[#E4E7F0] text-[#334155]'
                            : 'bg-[#0E1627] border-[#1E293B]/60 text-[#CBD5E1]'
                        }`}
                      >
                        <span>contract_liability_cap</span>
                        <span className="text-[#08C9F5] font-semibold">$250,000 Verified</span>
                      </div>
                      <div
                        className={`flex items-center justify-between p-2 rounded border ${
                          isLight
                            ? 'bg-white border-[#E4E7F0] text-[#334155]'
                            : 'bg-[#0E1627] border-[#1E293B]/60 text-[#CBD5E1]'
                        }`}
                      >
                        <span>clause_renewal_notice</span>
                        <span className="text-emerald-500 font-semibold">60 Days Prior</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'erp' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div
                      className={`p-3 rounded-xl border ${
                        isLight
                          ? 'bg-[#F7F8FC] border-[#E4E7F0]'
                          : 'bg-[#080D18] border-[#1E293B]'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-[#64748B] uppercase block">
                        Dispatch Velocity
                      </span>
                      <span
                        className={`text-lg font-bold font-mono tabular-nums ${
                          isLight ? 'text-[#11172A]' : 'text-white'
                        }`}
                      >
                        18 min
                      </span>
                      <span className="text-[10px] text-emerald-500 font-mono block mt-0.5">
                        Down from 55 min
                      </span>
                    </div>
                    <div
                      className={`p-3 rounded-xl border ${
                        isLight
                          ? 'bg-[#F7F8FC] border-[#E4E7F0]'
                          : 'bg-[#080D18] border-[#1E293B]'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-[#64748B] uppercase block">
                        Stock Accuracy
                      </span>
                      <span
                        className={`text-lg font-bold font-mono tabular-nums ${
                          isLight ? 'text-[#11172A]' : 'text-white'
                        }`}
                      >
                        99.88%
                      </span>
                      <span className="text-[10px] text-[#08C9F5] font-mono block mt-0.5">
                        Barcode verification
                      </span>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-xl border space-y-2 ${
                      isLight
                        ? 'bg-[#F7F8FC] border-[#E4E7F0]'
                        : 'bg-[#080D18] border-[#1E293B]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-semibold ${isLight ? 'text-[#11172A]' : 'text-white'}`}>
                        Warehouse Manifest Engine
                      </span>
                      <span className="text-[10px] font-mono text-[#7025E8]">Laravel + Node WS</span>
                    </div>
                    <div className="space-y-1.5 font-mono text-[11px]">
                      <div
                        className={`flex items-center justify-between p-2 rounded border ${
                          isLight
                            ? 'bg-white border-[#E4E7F0] text-[#334155]'
                            : 'bg-[#0E1627] border-[#1E293B]/60 text-[#CBD5E1]'
                        }`}
                      >
                        <span>Manifest #HUB-04 Route</span>
                        <span className="text-emerald-500 font-semibold">14 Stops Active</span>
                      </div>
                      <div
                        className={`flex items-center justify-between p-2 rounded border ${
                          isLight
                            ? 'bg-white border-[#E4E7F0] text-[#334155]'
                            : 'bg-[#0E1627] border-[#1E293B]/60 text-[#CBD5E1]'
                        }`}
                      >
                        <span>QuickBooks Invoice Sync</span>
                        <span className="text-[#08C9F5] font-semibold">Instant Trigger</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom footer footnote */}
              <div
                className={`flex items-center justify-between pt-2 text-[11px] border-t ${
                  isLight
                    ? 'border-[#E4E7F0] text-[#64748B]'
                    : 'border-[#1E293B]/60 text-[#64748B]'
                }`}
              >
                <span>System: Innosight Production Engine</span>
                <span className={isLight ? 'text-[#334155] font-medium' : 'text-[#A8B3C9]'}>
                  Client Audited
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
