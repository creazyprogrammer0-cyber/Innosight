import React, { useState } from 'react';
import {
  Calculator,
  ArrowRight,
  Clock,
  Layers,
  CheckCircle2,
  Cpu,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ScopeEstimatorProps {
  onApplyScopeToInquiry: (scopeSummary: {
    archetype: string;
    modules: string[];
    timeline: string;
    budgetEstimate: string;
    description: string;
  }) => void;
}

export const ScopeEstimator: React.FC<ScopeEstimatorProps> = ({
  onApplyScopeToInquiry,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [archetype, setArchetype] = useState<string>('B2B SaaS Platform');
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'User Auth & Team RBAC',
    'Stripe Recurring Subscriptions',
  ]);
  const [timelineSpeed, setTimelineSpeed] = useState<'standard' | 'express'>('standard');

  const archetypeOptions = [
    {
      id: 'B2B SaaS Platform',
      title: 'B2B SaaS Platform',
      baseWeeks: 5,
      baseBudget: 7500,
      defaultStack: 'Next.js 15, Node.js, PostgreSQL, Stripe, Redis',
    },
    {
      id: 'AI-Native Workflow App',
      title: 'AI-Native Workflow App',
      baseWeeks: 4,
      baseBudget: 6500,
      defaultStack: 'React 19, FastAPI, Google Gemini API, pgvector',
    },
    {
      id: 'Custom Operations / Internal ERP',
      title: 'Custom Internal ERP / Portal',
      baseWeeks: 6,
      baseBudget: 8500,
      defaultStack: 'React, Laravel 11, MySQL, REST Webhooks',
    },
    {
      id: 'API Modernization & Refactor',
      title: 'Legacy Refactor & Integration',
      baseWeeks: 3,
      baseBudget: 4500,
      defaultStack: 'Node.js, Express, TypeScript, Docker',
    },
  ];

  const availableModules = [
    { id: 'User Auth & Team RBAC', label: 'Multi-Tenant Auth & Roles', addWeeks: 1, addBudget: 1200 },
    { id: 'Stripe Recurring Subscriptions', label: 'Stripe Billing & Customer Portal', addWeeks: 1, addBudget: 1500 },
    { id: 'Gemini AI Structured Extraction', label: 'AI Document Parsing (Gemini API)', addWeeks: 1.5, addBudget: 2200 },
    { id: 'Real-Time WebSocket Feed', label: 'Real-Time Live Updates / WebSockets', addWeeks: 1, addBudget: 1400 },
    { id: 'Third-Party CRM / QuickBooks Sync', label: 'External ERP / CRM Integrations', addWeeks: 1, addBudget: 1600 },
    { id: 'High-Density Analytics Dashboard', label: 'Cohort Charts & CSV/PDF Exports', addWeeks: 1, addBudget: 1200 },
  ];

  const toggleModule = (modId: string) => {
    if (selectedModules.includes(modId)) {
      setSelectedModules(selectedModules.filter((m) => m !== modId));
    } else {
      setSelectedModules([...selectedModules, modId]);
    }
  };

  const currentArchetypeObj =
    archetypeOptions.find((a) => a.id === archetype) || archetypeOptions[0];

  const additionalWeeks = selectedModules.reduce((acc, modId) => {
    const mod = availableModules.find((m) => m.id === modId);
    return acc + (mod ? mod.addWeeks : 0);
  }, 0);

  const totalCalculatedWeeks = Math.max(
    3,
    Math.round((currentArchetypeObj.baseWeeks + additionalWeeks * 0.6) * (timelineSpeed === 'express' ? 0.75 : 1))
  );

  const additionalBudget = selectedModules.reduce((acc, modId) => {
    const mod = availableModules.find((m) => m.id === modId);
    return acc + (mod ? mod.addBudget : 0);
  }, 0);

  const totalEstimatedMin = Math.round((currentArchetypeObj.baseBudget + additionalBudget * 0.8) / 500) * 500;
  const totalEstimatedMax = Math.round((totalEstimatedMin * 1.35) / 500) * 500;

  const budgetDisplay = `$${totalEstimatedMin.toLocaleString()} – $${totalEstimatedMax.toLocaleString()}`;
  const timelineDisplay = `${totalCalculatedWeeks} to ${totalCalculatedWeeks + 2} Weeks`;

  const handleApply = () => {
    const summary = {
      archetype,
      modules: selectedModules,
      timeline: timelineDisplay,
      budgetEstimate: budgetDisplay,
      description: `Targeting a ${archetype} (${timelineDisplay} timeline, ${budgetDisplay} tier) with modules: ${selectedModules.join(', ')}.`,
    };
    onApplyScopeToInquiry(summary);
  };

  return (
    <section
      className={`py-20 border-t transition-colors ${
        isLight
          ? 'bg-[#F7F8FC] border-[#E4E7F0]'
          : 'bg-[#080D18] border-[#1E293B]'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`pb-10 border-b space-y-2 ${
            isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#08C9F5]">
            <Calculator className="w-3.5 h-3.5" />
            <span>TRANSPARENT SCOPING ENGINE</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
            }`}
          >
            Estimate your MVP timeline & architecture.
          </h2>
          <p className={`text-base max-w-2xl leading-relaxed ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
            Configure your product specifications to receive a realistic sprint estimate, recommended
            technology stack, and transparent fixed-price bracket.
          </p>
        </div>

        {/* Interactive Calculator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* Configuration Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Archetype */}
            <div className="space-y-3">
              <span className={`text-xs font-mono uppercase tracking-wider block ${isLight ? 'text-[#64748B]' : 'text-[#64748B]'}`}>
                01. Select Product Archetype
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {archetypeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setArchetype(opt.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      archetype === opt.id
                        ? isLight
                          ? 'bg-white border-[#2364F5] text-[#11172A] shadow-md shadow-blue-500/10 ring-1 ring-[#2364F5]'
                          : 'bg-[#131E33] border-[#08C9F5] text-white shadow-md shadow-[#08C9F5]/10'
                        : isLight
                          ? 'bg-white border-[#E4E7F0] text-[#4B5565] hover:text-[#11172A]'
                          : 'bg-[#0E1627] border-[#1E293B] text-[#A8B3C9] hover:border-[#334155] hover:text-white'
                    }`}
                  >
                    <span className="text-sm font-semibold block">{opt.title}</span>
                    <span className={`text-[11px] font-mono mt-0.5 block truncate ${isLight ? 'text-[#64748B]' : 'text-[#64748B]'}`}>
                      {opt.defaultStack.split(',').slice(0, 3).join(', ')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Modules */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono uppercase tracking-wider block ${isLight ? 'text-[#64748B]' : 'text-[#64748B]'}`}>
                  02. Choose Critical Architecture Modules
                </span>
                <span className="text-[11px] font-mono text-[#08C9F5] font-semibold">
                  {selectedModules.length} selected
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {availableModules.map((mod) => {
                  const isChecked = selectedModules.includes(mod.id);
                  return (
                    <button
                      key={mod.id}
                      onClick={() => toggleModule(mod.id)}
                      className={`p-3 rounded-lg border text-left text-xs flex items-center justify-between transition-all ${
                        isChecked
                          ? isLight
                            ? 'bg-white border-[#7025E8] text-[#11172A] shadow-sm'
                            : 'bg-[#0E1627] border-[#7025E8] text-white'
                          : isLight
                            ? 'bg-white border-[#E4E7F0] text-[#4B5565] hover:text-[#11172A]'
                            : 'bg-[#080D18] border-[#1E293B] text-[#94A3B8] hover:border-[#334155]'
                      }`}
                    >
                      <span className="truncate pr-2">{mod.label}</span>
                      <span
                        className={`w-4 h-4 rounded flex items-center justify-center shrink-0 text-[10px] ${
                          isChecked
                            ? 'bg-[#7025E8] text-white font-bold'
                            : isLight
                              ? 'border border-[#CBD5E1]'
                              : 'border border-[#475569]'
                        }`}
                      >
                        {isChecked ? '✓' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Sprint Velocity */}
            <div className="space-y-3">
              <span className={`text-xs font-mono uppercase tracking-wider block ${isLight ? 'text-[#64748B]' : 'text-[#64748B]'}`}>
                03. Target Velocity
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTimelineSpeed('standard')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    timelineSpeed === 'standard'
                      ? isLight
                        ? 'bg-white border-[#2364F5] text-[#11172A] shadow-sm ring-1 ring-[#2364F5]'
                        : 'bg-[#131E33] border-[#08C9F5] text-white'
                      : isLight
                        ? 'bg-white border-[#E4E7F0] text-[#4B5565]'
                        : 'bg-[#0E1627] border-[#1E293B] text-[#A8B3C9]'
                  }`}
                >
                  <span className="text-xs font-semibold block">Standard Fixed Sprint</span>
                  <span className={`text-[11px] ${isLight ? 'text-[#64748B]' : 'text-[#64748B]'}`}>
                    Weekly demos & iterative sign-offs
                  </span>
                </button>
                <button
                  onClick={() => setTimelineSpeed('express')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    timelineSpeed === 'express'
                      ? isLight
                        ? 'bg-white border-[#E000C9] text-[#11172A] shadow-sm ring-1 ring-[#E000C9]'
                        : 'bg-[#131E33] border-[#E000C9] text-white'
                      : isLight
                        ? 'bg-white border-[#E4E7F0] text-[#4B5565]'
                        : 'bg-[#0E1627] border-[#1E293B] text-[#A8B3C9]'
                  }`}
                >
                  <span className="text-xs font-semibold block flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-[#E000C9]" /> Express MVP Sprint
                  </span>
                  <span className={`text-[11px] ${isLight ? 'text-[#64748B]' : 'text-[#64748B]'}`}>
                    Accelerated delivery timeline
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary Card (5 cols) */}
          <div
            className={`lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl border space-y-6 shadow-xl transition-colors ${
              isLight
                ? 'bg-white border-[#E4E7F0] text-[#11172A]'
                : 'bg-[#0E1627] border-[#1E293B] text-white'
            }`}
          >
            <div className="space-y-5">
              <div
                className={`flex items-center justify-between border-b pb-3 ${
                  isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]'
                }`}
              >
                <span className="text-xs font-mono uppercase tracking-wider text-[#08C9F5] font-semibold">
                  Scoping Synthesis
                </span>
                <span className={`text-[11px] font-mono ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
                  Direct Fixed Quote
                </span>
              </div>

              {/* Estimates Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  className={`p-3.5 rounded-xl border space-y-1 ${
                    isLight
                      ? 'bg-[#F7F8FC] border-[#E4E7F0]'
                      : 'bg-[#080D18] border-[#1E293B]'
                  }`}
                >
                  <span className="text-[10px] font-mono text-[#64748B] uppercase block">
                    Estimated Timeline
                  </span>
                  <span
                    className={`text-xl font-bold font-mono tabular-nums block ${
                      isLight ? 'text-[#11172A]' : 'text-white'
                    }`}
                  >
                    {timelineDisplay}
                  </span>
                  <span className="text-[10px] text-emerald-500 font-mono font-semibold">
                    Structured sprint milestones
                  </span>
                </div>

                <div
                  className={`p-3.5 rounded-xl border space-y-1 ${
                    isLight
                      ? 'bg-[#F7F8FC] border-[#E4E7F0]'
                      : 'bg-[#080D18] border-[#1E293B]'
                  }`}
                >
                  <span className="text-[10px] font-mono text-[#64748B] uppercase block">
                    Fixed-Scope Bracket
                  </span>
                  <span
                    className={`text-xl font-bold font-mono tabular-nums block ${
                      isLight ? 'text-[#11172A]' : 'text-white'
                    }`}
                  >
                    {budgetDisplay}
                  </span>
                  <span className="text-[10px] text-[#08C9F5] font-mono font-semibold">
                    Milestone released
                  </span>
                </div>
              </div>

              {/* Recommended Stack */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider block">
                  Recommended Architecture Stack
                </span>
                <div
                  className={`p-3 rounded-xl border font-mono text-xs ${
                    isLight
                      ? 'bg-[#F7F8FC] border-[#E4E7F0] text-[#334155]'
                      : 'bg-[#080D18] border-[#1E293B] text-[#CBD5E1]'
                  }`}
                >
                  {currentArchetypeObj.defaultStack}
                </div>
              </div>

              {/* Included in this engagement */}
              <div className={`space-y-2 text-xs ${isLight ? 'text-[#4B5565]' : 'text-[#94A3B8]'}`}>
                <span className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider block">
                  Guaranteed Deliverables
                </span>
                <ul className="space-y-1.5 text-[11px]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Complete source code & 100% IP transferred to your GitHub</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Live staging environment with weekly milestone check-ins</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>30-Day post-launch bug warranty & deployment walkthrough</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* High-Intent Conversion CTA */}
            <button
              onClick={handleApply}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-[#2364F5] via-[#7025E8] to-[#E000C9] hover:opacity-95 rounded-xl shadow-lg shadow-[#7025E8]/20 transition-all cursor-pointer"
            >
              <span>Transfer Scope to Project Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
