import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  Database,
  Cloud,
  CheckCircle2,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Info,
} from 'lucide-react';
import { teamMembers, getFounder, getCoreTeamMembers, getTeamDepartments } from '../../data/teamData';
import { TeamMember, TeamDepartment } from '../../types';
import { TeamAvatar } from '../ui/TeamAvatar';
import { useTheme } from '../../context/ThemeContext';

interface TeamSectionProps {
  onOpenContact: (prefRole?: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onOpenContact }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [showTemplateGuide, setShowTemplateGuide] = useState(false);

  const founder = getFounder();
  const allDepartments = getTeamDepartments();

  const safeMembers = Array.isArray(teamMembers) ? teamMembers : [];
  const filteredMembers = safeMembers.filter((member) => {
    if (!member) return false;
    if (selectedDept === 'All') return true;
    return member.department === selectedDept;
  });

  return (
    <section
      id="team"
      className={`py-24 border-t transition-colors relative ${
        isLight
          ? 'bg-[#F7F8FC] border-[#E4E7F0]'
          : 'bg-[#080D18] border-[#1E293B]'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-gradient-to-bl from-[#7025E8]/10 via-[#08C9F5]/5 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-tr from-[#E000C9]/5 to-transparent blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-inherit">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#08C9F5]">
                ENGINEERING CORE & TALENT
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-mono font-semibold bg-[#7025E8]/10 text-[#7025E8] border border-[#7025E8]/20">
                5 Active Specialists
              </span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
              }`}
            >
              The team building your software.
            </h2>
            <p
              className={`text-base max-w-2xl leading-relaxed ${
                isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'
              }`}
            >
              A focused, senior engineering collective led by founder Jannatul. We eliminate agency
              overhead and hand-off friction to deliver production-grade SaaS and AI platforms directly.
            </p>
          </div>

          {/* Template helper info button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowTemplateGuide(!showTemplateGuide)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors ${
                isLight
                  ? 'bg-white border-[#E4E7F0] text-[#4B5565] hover:bg-slate-50 hover:text-[#11172A]'
                  : 'bg-[#0E1627] border-[#1E293B] text-[#94A3B8] hover:bg-[#131E33] hover:text-white'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-[#08C9F5]" />
              <span>{showTemplateGuide ? 'Hide Template Info' : 'Template Config (Easy Edit)'}</span>
            </button>
          </div>
        </div>

        {/* Template Instructions Banner (Collapsible for developer/client convenience) */}
        {showTemplateGuide && (
          <div
            className={`mt-6 p-5 rounded-2xl border transition-colors animate-in fade-in duration-200 ${
              isLight
                ? 'bg-emerald-50/70 border-emerald-200 text-[#11172A]'
                : 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div className="space-y-2 text-xs leading-relaxed">
                <span className="font-bold text-sm block">
                  Template-Style Structure: Easily Edit or Add Team Members
                </span>
                <p>
                  All team members and photos are configured in{' '}
                  <code className="px-1.5 py-0.5 rounded font-mono font-bold bg-black/10">
                    src/data/teamData.ts
                  </code>
                  .
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-2.5 rounded-lg bg-black/5 dark:bg-white/5 space-y-1">
                    <span className="font-semibold block">1. Change Photos</span>
                    <span className="text-[11px] opacity-80 block">
                      Drop any file into <code className="font-mono">public/images/team/</code> or update the{' '}
                      <code className="font-mono">avatar</code> URL.
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/5 dark:bg-white/5 space-y-1">
                    <span className="font-semibold block">2. Add More Members</span>
                    <span className="text-[11px] opacity-80 block">
                      Copy any object in <code className="font-mono">teamData.ts</code>, give it an ID, role, and skills.
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/5 dark:bg-white/5 space-y-1">
                    <span className="font-semibold block">3. Adjust Metrics</span>
                    <span className="text-[11px] opacity-80 block">
                      Edit stats, badges, social links, or departments with instant hot-reload.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Spotlight: Jannatul Ferdous (Founder & Lead Architect) */}
        <div className="mt-12">
          <div
            className={`rounded-3xl border p-6 sm:p-8 lg:p-10 transition-all ${
              isLight
                ? 'bg-white border-[#E4E7F0] shadow-xl shadow-slate-200/60'
                : 'bg-[#0E1627] border-[#1E293B] shadow-2xl shadow-black/40'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Avatar & Quick Verified Badges (4 cols) */}
              <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
                <div className="relative group">
                  <TeamAvatar
                    name={founder.name}
                    avatar={founder.avatar}
                    avatarFallbacks={founder.avatarFallbacks}
                    fallbackInitials={founder.fallbackInitials}
                    size="xl"
                    isLead={true}
                  />
                  {/* Verified Founder Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#2364F5] to-[#7025E8] text-white p-2 rounded-xl shadow-lg shadow-[#7025E8]/30 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3
                    className={`text-2xl font-extrabold tracking-tight ${
                      isLight ? 'text-[#11172A]' : 'text-white'
                    }`}
                  >
                    {founder.name}
                  </h3>
                  <p className="text-sm font-semibold text-[#08C9F5] font-mono">
                    {founder.role}
                  </p>
                  <span
                    className={`inline-block text-xs font-mono px-2.5 py-0.5 rounded-full border mt-1 ${
                      isLight
                        ? 'bg-slate-100 text-[#4B5565] border-[#E4E7F0]'
                        : 'bg-[#131E33] text-[#A8B3C9] border-[#1E293B]'
                    }`}
                  >
                    {founder.experience}
                  </span>
                </div>

                {/* Social Connect Icons */}
                {founder.socials && (
                  <div className="flex items-center gap-2 pt-1">
                    {founder.socials.github && (
                      <a
                        href={founder.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg border transition-colors ${
                          isLight
                            ? 'bg-[#F7F8FC] border-[#E4E7F0] text-[#4B5565] hover:text-[#11172A] hover:bg-slate-100'
                            : 'bg-[#080D18] border-[#1E293B] text-[#94A3B8] hover:text-white hover:bg-[#131E33]'
                        }`}
                        title="GitHub Profile"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {founder.socials.linkedin && (
                      <a
                        href={founder.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg border transition-colors ${
                          isLight
                            ? 'bg-[#F7F8FC] border-[#E4E7F0] text-[#4B5565] hover:text-[#11172A] hover:bg-slate-100'
                            : 'bg-[#080D18] border-[#1E293B] text-[#94A3B8] hover:text-white hover:bg-[#131E33]'
                        }`}
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {founder.socials.email && (
                      <a
                        href={`mailto:${founder.socials.email}`}
                        className={`p-2 rounded-lg border transition-colors ${
                          isLight
                            ? 'bg-[#F7F8FC] border-[#E4E7F0] text-[#4B5565] hover:text-[#11172A] hover:bg-slate-100'
                            : 'bg-[#080D18] border-[#1E293B] text-[#94A3B8] hover:text-white hover:bg-[#131E33]'
                        }`}
                        title="Direct Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column: Narrative, Badges, Metrics & Core Skills (8 cols) */}
              <div className="lg:col-span-8 space-y-5 text-left">
                {/* Badges strip */}
                <div className="flex flex-wrap items-center gap-2">
                  {founder.badges.map((b) => (
                    <span
                      key={b}
                      className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-[#08C9F5]/10 text-[#08C9F5] border border-[#08C9F5]/25"
                    >
                      {b}
                    </span>
                  ))}
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Direct Engineering Access
                  </span>
                </div>

                {/* Narrative Overview */}
                <p
                  className={`text-base leading-relaxed ${
                    isLight ? 'text-[#334155]' : 'text-[#CBD5E1]'
                  }`}
                >
                  {founder.detailedBio || founder.bio}
                </p>

                {/* Founder Key Metrics Band */}
                <div className="grid grid-cols-3 gap-3 pt-1">
                  <div
                    className={`p-3.5 rounded-xl border text-center ${
                      isLight
                        ? 'bg-[#F7F8FC] border-[#E4E7F0]'
                        : 'bg-[#080D18] border-[#1E293B]'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl font-bold font-mono text-[#08C9F5] block">
                      637+
                    </span>
                    <span className="text-[11px] font-mono text-[#64748B] uppercase block">
                      Unique Clients
                    </span>
                  </div>
                  <div
                    className={`p-3.5 rounded-xl border text-center ${
                      isLight
                        ? 'bg-[#F7F8FC] border-[#E4E7F0]'
                        : 'bg-[#080D18] border-[#1E293B]'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl font-bold font-mono text-[#7025E8] block">
                      799
                    </span>
                    <span className="text-[11px] font-mono text-[#64748B] uppercase block">
                      Completed Orders
                    </span>
                  </div>
                  <div
                    className={`p-3.5 rounded-xl border text-center ${
                      isLight
                        ? 'bg-[#F7F8FC] border-[#E4E7F0]'
                        : 'bg-[#080D18] border-[#1E293B]'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-500 block">
                      4.9★
                    </span>
                    <span className="text-[11px] font-mono text-[#64748B] uppercase block">
                      Client Rating
                    </span>
                  </div>
                </div>

                {/* Technical Domain Specialties */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-mono text-[#64748B] uppercase tracking-wider block">
                    Core Technical Competencies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {founder.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`text-xs font-mono px-2.5 py-1 rounded border transition-colors ${
                          isLight
                            ? 'bg-[#F7F8FC] text-[#11172A] border-[#E4E7F0]'
                            : 'bg-[#080D18] text-[#CBD5E1] border-[#1E293B]'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Row */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => onOpenContact('Sprint Partnership with Jannatul')}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-[#2364F5] to-[#7025E8] hover:opacity-95 rounded-xl shadow-md transition-all duration-200"
                  >
                    <span>Schedule Technical Scope with Jannatul</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <span className={`text-xs font-mono ${isLight ? 'text-[#64748B]' : 'text-[#64748B]'}`}>
                    Fixed 4–8 week sprints · No agency middle-men
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Navigation for Team Members */}
        <div className="mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#08C9F5]">
              SPECIALIZED DISCIPLINES
            </span>
            <h3
              className={`text-2xl font-extrabold tracking-tight ${
                isLight ? 'text-[#11172A]' : 'text-white'
              }`}
            >
              The Core Engineering Team
            </h3>
          </div>

          {/* Department Filter Tabs */}
          <div
            className={`flex items-center gap-1.5 p-1 rounded-xl border overflow-x-auto max-w-full ${
              isLight
                ? 'bg-white border-[#E4E7F0]'
                : 'bg-[#0E1627] border-[#1E293B]'
            }`}
          >
            {allDepartments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                  selectedDept === dept
                    ? 'bg-gradient-to-r from-[#2364F5] to-[#7025E8] text-white font-semibold shadow-sm'
                    : isLight
                      ? 'text-[#4B5565] hover:text-[#11172A]'
                      : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Additional Members + Team Grid (Template Structured) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredMembers
            .filter((m) => !m.isLead)
            .map((member) => (
              <div
                key={member.id}
                className={`rounded-2xl border p-6 transition-all duration-300 group flex flex-col justify-between ${
                  isLight
                    ? 'bg-white border-[#E4E7F0] hover:border-[#7025E8]/40 hover:shadow-lg shadow-sm'
                    : 'bg-[#0E1627] border-[#1E293B] hover:border-[#7025E8]/40 hover:shadow-xl'
                }`}
              >
                <div className="space-y-4">
                  {/* Member Top Bar: Avatar + Name + Department */}
                  <div className="flex items-start gap-4">
                    <TeamAvatar
                      name={member.name}
                      avatar={member.avatar}
                      avatarFallbacks={member.avatarFallbacks}
                      fallbackInitials={member.fallbackInitials}
                      size="lg"
                    />

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono text-[#08C9F5] font-semibold truncate">
                          {member.department}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                            isLight
                              ? 'bg-slate-100 text-[#64748B] border-[#E4E7F0]'
                              : 'bg-[#080D18] text-[#94A3B8] border-[#1E293B]'
                          }`}
                        >
                          {member.experience}
                        </span>
                      </div>
                      <h4
                        className={`text-lg font-bold tracking-tight truncate ${
                          isLight ? 'text-[#11172A]' : 'text-white'
                        }`}
                      >
                        {member.name}
                      </h4>
                      <p
                        className={`text-xs font-medium line-clamp-1 ${
                          isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'
                        }`}
                      >
                        {member.role}
                      </p>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {member.badges.map((b) => (
                          <span
                            key={b}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#7025E8]/10 text-[#7025E8] border border-[#7025E8]/20"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bio Description */}
                  <p
                    className={`text-xs leading-relaxed ${
                      isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'
                    }`}
                  >
                    {member.bio}
                  </p>

                  {/* Technical Skills Tag Matrix */}
                  <div className="space-y-1.5 pt-2 border-t border-inherit">
                    <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block">
                      Core Stack & Systems
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`text-[11px] font-mono px-2 py-0.5 rounded border transition-colors ${
                            isLight
                              ? 'bg-[#F7F8FC] text-[#334155] border-[#E4E7F0]'
                              : 'bg-[#080D18] text-[#CBD5E1] border-[#1E293B]/70'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Bar: Metric highlight + Connect/Inquire CTA */}
                <div
                  className={`mt-5 pt-3.5 border-t flex items-center justify-between text-xs ${
                    isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]/70'
                  }`}
                >
                  {member.metrics ? (
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className="text-[#64748B] text-[11px]">{member.metrics.label}:</span>
                      <span className="text-[#08C9F5] font-bold">{member.metrics.value}</span>
                    </div>
                  ) : (
                    <span className="text-[#64748B] text-[11px] font-mono">Dedicated Sprint Pod</span>
                  )}

                  <button
                    onClick={() => onOpenContact(`${member.role} Inquiry`)}
                    className={`inline-flex items-center gap-1 text-xs font-semibold transition-colors ${
                      isLight
                        ? 'text-[#2364F5] hover:text-[#7025E8]'
                        : 'text-[#08C9F5] hover:text-white'
                    }`}
                  >
                    <span>Request pod with {member.name.split(' ')[0]}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Scalable "Join or Scale Team" Card for Template Completeness */}
        <div
          className={`mt-8 p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-6 transition-colors ${
            isLight
              ? 'bg-white border-[#E4E7F0]'
              : 'bg-[#0E1627] border-[#1E293B]'
          }`}
        >
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-mono font-semibold uppercase text-[#08C9F5]">
                SCALABLE POD CAPACITY
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                Sprint Ready
              </span>
            </div>
            <h4
              className={`text-base font-bold ${
                isLight ? 'text-[#11172A]' : 'text-white'
              }`}
            >
              Need a full dedicated development pod for your startup?
            </h4>
            <p
              className={`text-xs max-w-xl ${
                isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'
              }`}
            >
              From single-specialist architecture sprints to a full team covering UI/UX, backend, AI, and
              infrastructure, we scale sprint pods seamlessly to fit your launch timeline.
            </p>
          </div>

          <button
            onClick={() => onOpenContact('Dedicated Team Pod')}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-gradient-to-r from-[#2364F5] via-[#7025E8] to-[#E000C9] rounded-xl hover:opacity-95 shadow-md shadow-[#7025E8]/20 transition-all shrink-0"
          >
            <span>Discuss Team Scope</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
