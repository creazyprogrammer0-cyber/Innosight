import React from 'react';
import { ArrowUpRight, Calendar, MessageSquare, ShieldCheck, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface FinalCtaSectionProps {
  onOpenContact: () => void;
  onOpenScheduler: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onOpenContact,
  onOpenScheduler,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section
      className={`py-24 border-t relative overflow-hidden transition-colors ${
        isLight
          ? 'bg-white border-[#E4E7F0]'
          : 'bg-[#080D18] border-[#1E293B]'
      }`}
    >
      {/* Restrained brand radial glow */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`p-8 sm:p-14 rounded-3xl border text-center space-y-8 max-w-4xl mx-auto shadow-2xl transition-colors ${
            isLight
              ? 'bg-gradient-to-b from-[#F7F8FC] to-white border-[#E4E7F0]'
              : 'bg-gradient-to-b from-[#0E1627] to-[#0A101D] border-[#1E293B]'
          }`}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#08C9F5] uppercase">
            <span>GET IN TOUCH DIRECTLY</span>
          </div>

          {/* Primary Headline with text-wrap: balance */}
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-balance max-w-2xl mx-auto ${
              isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
            }`}
          >
            Let's figure out what you need to build—and the smartest way to build it.
          </h2>

          {/* Supporting Copy */}
          <p
            className={`text-base sm:text-lg max-w-xl mx-auto leading-relaxed ${
              isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'
            }`}
          >
            Share your idea, current challenges, or product goals. We'll start by clarifying the
            requirements and exploring the next steps.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-[#2364F5] via-[#7025E8] to-[#E000C9] hover:opacity-95 rounded-xl shadow-lg shadow-[#7025E8]/25 transition-all duration-200 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Start a project conversation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenScheduler}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold tracking-wide rounded-xl border transition-all duration-200 cursor-pointer ${
                isLight
                  ? 'bg-white text-[#11172A] border-[#E4E7F0] hover:bg-slate-50 shadow-sm'
                  : 'bg-[#131E33] text-[#F6F7FF] border-[#1E293B] hover:bg-[#1E293B] hover:border-[#7025E8]/40'
              }`}
            >
              <Calendar className="w-4 h-4 text-[#08C9F5]" />
              <span>Arrange a discovery call</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div
            className={`pt-6 border-t flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs ${
              isLight ? 'border-[#E4E7F0] text-[#64748B]' : 'border-[#1E293B]/70 text-[#94A3B8]'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Direct response within 24 hours
            </span>
            <span aria-hidden="true" className={isLight ? 'text-[#CBD5E1]' : 'text-[#334155]'}>
              ·
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#08C9F5]" />
              No spam or sales pressure
            </span>
            <span aria-hidden="true" className={isLight ? 'text-[#CBD5E1]' : 'text-[#334155]'}>
              ·
            </span>
            <span>NDA readily signed upon request</span>
          </div>
        </div>
      </div>
    </section>
  );
};
