import React from 'react';
import { Lightbulb, Wrench, MessageSquare, CheckCircle2 } from 'lucide-react';
import { credentialsData } from '../../data/credentialsData';
import { useTheme } from '../../context/ThemeContext';

export const EngineeringPillarsSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const iconList = [
    <Lightbulb className="w-5 h-5 text-[#08C9F5]" />,
    <Wrench className="w-5 h-5 text-[#7025E8]" />,
    <MessageSquare className="w-5 h-5 text-[#E000C9]" />,
  ];

  return (
    <section
      className={`py-24 border-t transition-colors ${
        isLight
          ? 'bg-[#F7F8FC] border-[#E4E7F0]'
          : 'bg-[#0A101D] border-[#1E293B]'
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
            FOUNDER-ALIGNED CRAFT
          </span>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 ${
              isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
            }`}
          >
            More than features. Thoughtful product decisions.
          </h2>
          <p className={`text-base max-w-2xl mt-2 leading-relaxed ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
            A successful product needs more than working code. It needs a clear purpose, a useful
            experience, sound engineering decisions, and a foundation that can evolve as the business grows.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
          {credentialsData.engineeringPillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className={`p-8 rounded-2xl border space-y-5 flex flex-col justify-between transition-colors ${
                isLight
                  ? 'bg-white border-[#E4E7F0] shadow-sm hover:shadow-md'
                  : 'bg-[#0E1627] border-[#1E293B] shadow-md'
              }`}
            >
              <div className="space-y-4">
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center ${
                    isLight
                      ? 'bg-[#F7F8FC] border-[#E4E7F0]'
                      : 'bg-[#080D18] border-[#1E293B]'
                  }`}
                >
                  {iconList[idx]}
                </div>

                <h3
                  className={`text-xl font-bold tracking-tight ${
                    isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
                  }`}
                >
                  {pillar.title}
                </h3>

                <p className={`text-sm leading-relaxed ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
                  {pillar.description}
                </p>
              </div>

              {/* Trait Tags (Zero-Pill Discipline: clean unboxed text) */}
              <div
                className={`pt-4 border-t space-y-2 ${
                  isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]/70'
                }`}
              >
                <span className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider block">
                  Core Working Principles
                </span>
                <ul className="space-y-1.5 text-xs">
                  {pillar.traits.map((trait, tIdx) => (
                    <li
                      key={tIdx}
                      className={`flex items-center gap-2 ${
                        isLight ? 'text-[#334155]' : 'text-[#CBD5E1]'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#08C9F5] shrink-0" />
                      <span>{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
