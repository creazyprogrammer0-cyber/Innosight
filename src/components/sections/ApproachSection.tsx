import React from 'react';
import { credentialsData } from '../../data/credentialsData';
import { CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ApproachSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section
      className={`py-24 border-t transition-colors ${
        isLight
          ? 'bg-white border-[#E4E7F0]'
          : 'bg-[#080D18] border-[#1E293B]'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`pb-12 border-b ${
            isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]'
          }`}
        >
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#08C9F5]">
            DEVELOPMENT PROCESS
          </span>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 ${
              isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
            }`}
          >
            Good software starts with clear decisions.
          </h2>
          <p className={`text-base max-w-2xl mt-2 ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
            A disciplined five-stage delivery model that eliminates scope creep, minimizes technical
            surprises, and guarantees transparent milestones from kickoff to deployment.
          </p>
        </div>

        {/* 5-Stage Editorial Timeline / Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 pt-10">
          {credentialsData.approachStages.map((stage, idx) => (
            <div
              key={stage.step}
              className={`relative p-6 rounded-2xl border flex flex-col justify-between space-y-4 transition-colors ${
                isLight
                  ? 'bg-[#F7F8FC] border-[#E4E7F0] hover:border-[#7025E8]/40 shadow-sm'
                  : 'bg-[#0E1627] border-[#1E293B] hover:border-[#7025E8]/30 shadow-md'
              }`}
            >
              <div className="space-y-3">
                {/* Step indicator */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black font-mono text-[#08C9F5] tracking-tight">
                    {stage.step}
                  </span>
                  <span className={`text-[10px] font-mono uppercase ${isLight ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                    Stage 0{idx + 1}
                  </span>
                </div>

                <h3
                  className={`text-lg font-bold tracking-tight ${
                    isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
                  }`}
                >
                  {stage.title}
                </h3>

                <p className="text-xs font-semibold text-[#08C9F5] leading-snug">
                  {stage.lead}
                </p>

                <p className={`text-xs leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
                  {stage.detail}
                </p>
              </div>

              {/* Tangible deliverables at each stage */}
              <div
                className={`pt-3 border-t text-[11px] font-mono ${
                  isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]/60'
                }`}
              >
                <span className={`block font-semibold mb-0.5 ${isLight ? 'text-[#11172A]' : 'text-[#A8B3C9]'}`}>
                  Deliverable:
                </span>
                <span className={`block ${isLight ? 'text-[#4B5565]' : 'text-[#CBD5E1]'}`}>
                  {stage.deliverables}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
