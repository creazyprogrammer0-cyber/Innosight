import React from 'react';
import { ShieldCheck, ArrowUpRight, Terminal, Globe, Award, Layers, Users } from 'lucide-react';
import { credentialsData } from '../../data/credentialsData';
import { InnosightLogo } from '../brand/InnosightLogo';
import { useTheme } from '../../context/ThemeContext';
import { getFounder } from '../../data/teamData';
import { TeamAvatar } from '../ui/TeamAvatar';

interface AboutSectionProps {
  onOpenContact: () => void;
  onViewTeam?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact, onViewTeam }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const founder = getFounder();

  return (
    <section
      id="about"
      className={`py-24 border-t transition-colors ${
        isLight
          ? 'bg-white border-[#E4E7F0]'
          : 'bg-[#080D18] border-[#1E293B]'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`pb-12 border-b flex flex-col sm:flex-row sm:items-end justify-between gap-4 ${
            isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]'
          }`}
        >
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#08C9F5]">
              BACKGROUND & CRAFT
            </span>
            <h2
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 ${
                isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
              }`}
            >
              The person behind the product.
            </h2>
          </div>

          <a
            href="#team"
            className={`inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
              isLight
                ? 'bg-[#F7F8FC] border-[#E4E7F0] text-[#11172A] hover:bg-slate-100'
                : 'bg-[#0E1627] border-[#1E293B] text-white hover:bg-[#131E33]'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#08C9F5]" />
            <span>Meet the Core 5-Person Team</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 2-Column Split: Story & Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-10">
          {/* Left Column: Narrative, Picture and Reputation (7 cols) */}
          <div
            className={`lg:col-span-7 space-y-6 text-base leading-relaxed text-left ${
              isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'
            }`}
          >
            {/* Jannatul Profile Header with Picture */}
            <div
              className={`p-5 rounded-2xl border flex items-center gap-5 transition-all ${
                isLight
                  ? 'bg-[#F7F8FC] border-[#E4E7F0] shadow-sm'
                  : 'bg-[#0E1627] border-[#1E293B]'
              }`}
            >
              <TeamAvatar
                name={founder.name}
                avatar={founder.avatar}
                avatarFallbacks={founder.avatarFallbacks}
                fallbackInitials={founder.fallbackInitials}
                size="lg"
                isLead={true}
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className={`text-xl font-extrabold tracking-tight ${isLight ? 'text-[#11172A]' : 'text-white'}`}>
                    {founder.name}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded font-semibold bg-[#08C9F5]/10 text-[#08C9F5] border border-[#08C9F5]/20">
                    Founder
                  </span>
                </div>
                <p className="text-xs font-mono font-medium text-[#7025E8]">
                  {founder.role}
                </p>
                <p className={`text-xs ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
                  {founder.experience} · 637 Clients Served · 799 Milestones Delivered
                </p>
              </div>
            </div>

            <p
              className={`text-lg font-medium leading-relaxed ${
                isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
              }`}
            >
              I’m Jannatul, a full-stack developer and software development partner focused on
              custom software, SaaS platforms, and practical AI systems.
            </p>

            <p>
              My work spans frontend experiences, robust backend development, complex API
              integrations, and cloud deployment. I care about building products that are genuinely useful
              to their users, practical to maintain, and strictly aligned with the commercial goals
              behind them.
            </p>

            <p>
              Through more than 9 years of stated development experience and extensive marketplace
              work on Fiverr, I’ve served 637 unique clients and delivered 799 client orders. I’ve built
              my professional reputation around clear communication, dependable milestone delivery,
              and ongoing technical support.
            </p>

            {/* Language & Communication Box */}
            <div
              className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                isLight
                  ? 'bg-[#F7F8FC] border-[#E4E7F0]'
                  : 'bg-[#0E1627] border-[#1E293B]'
              }`}
            >
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase text-[#08C9F5] block font-semibold flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" /> Direct Communication
                </span>
                <span className={`text-sm font-semibold block ${isLight ? 'text-[#11172A]' : 'text-white'}`}>
                  English (Professional Working) & Bengali (Native)
                </span>
                <span className={`text-xs block ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
                  Asynchronous updates via Slack/Loom, weekly sprint video demos, or scheduled calls.
                </span>
              </div>
              <button
                onClick={onOpenContact}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border transition-colors shrink-0 ${
                  isLight
                    ? 'bg-white text-[#11172A] border-[#E4E7F0] hover:bg-slate-50'
                    : 'bg-[#131E33] text-white border-[#1E293B] hover:bg-[#1E293B]'
                }`}
              >
                <span>Discuss collaboration</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#08C9F5]" />
              </button>
            </div>
          </div>

          {/* Right Column: Technical Capabilities Matrix (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div
              className={`p-6 rounded-2xl border space-y-5 transition-colors ${
                isLight
                  ? 'bg-[#F7F8FC] border-[#E4E7F0] shadow-sm'
                  : 'bg-[#0E1627] border-[#1E293B]'
              }`}
            >
              <div
                className={`flex items-center justify-between border-b pb-3 ${
                  isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]/70'
                }`}
              >
                <span
                  className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                    isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
                  }`}
                >
                  <Terminal className="w-4 h-4 text-[#08C9F5]" />
                  Technical Capabilities Matrix
                </span>
                <span className="text-[11px] font-mono text-[#08C9F5] font-semibold">9+ Years Craft</span>
              </div>

              <div className="space-y-4">
                {credentialsData.techStackCore.map((stack) => (
                  <div key={stack.category} className="space-y-1.5">
                    <span className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider block">
                      {stack.category}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {stack.items.map((item) => (
                        <span
                          key={item}
                          className={`text-xs font-mono px-2.5 py-1 rounded border transition-colors ${
                            isLight
                              ? 'bg-white text-[#11172A] border-[#E4E7F0]'
                              : 'bg-[#080D18] text-[#CBD5E1] border-[#1E293B]/70'
                          }`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Verified Badge footnote */}
              <div
                className={`pt-3 border-t flex items-center justify-between text-xs ${
                  isLight ? 'border-[#E4E7F0] text-[#64748B]' : 'border-[#1E293B]/60 text-[#94A3B8]'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Top Rated on Fiverr
                </span>
                <span className={`font-mono font-semibold ${isLight ? 'text-[#11172A]' : 'text-white'}`}>
                  4.9 / 5.0 (799 orders)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
