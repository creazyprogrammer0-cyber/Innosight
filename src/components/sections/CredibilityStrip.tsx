import React from 'react';
import { Star, ShieldCheck, CheckCircle2, Lock, GitPullRequest, Headphones, ExternalLink } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const CredibilityStrip: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section
      className={`border-y py-10 transition-colors ${
        isLight
          ? 'bg-white border-[#E4E7F0]'
          : 'bg-[#0A101D] border-[#1E293B]'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Marketplace Metrics Header Row */}
        <div
          className={`flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b ${
            isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]/70'
          }`}
        >
          {/* Label Context */}
          <div className="flex flex-col max-w-sm">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#08C9F5] font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Marketplace Track Record
            </span>
            <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
              Transparent track record independently verified on the Fiverr marketplace, representing 9+ years of production software delivery.
            </p>
          </div>

          {/* Metrics Row (Tabular Numerals, Clean Editorial) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 flex-1 max-w-2xl">
            {/* Metric 1 */}
            <div className="flex flex-col">
              <div
                className={`flex items-center gap-1 text-base font-extrabold font-mono tabular-nums ${
                  isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
                }`}
              >
                <span>4.9 / 5.0</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline" />
              </div>
              <span className={`text-xs font-medium mt-0.5 ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
                Client Rating
              </span>
              <span className={`text-[10px] ${isLight ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                Across client orders
              </span>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col">
              <span
                className={`text-base font-extrabold font-mono tabular-nums ${
                  isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
                }`}
              >
                799
              </span>
              <span className={`text-xs font-medium mt-0.5 ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
                Orders Delivered
              </span>
              <span className={`text-[10px] ${isLight ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                Custom systems & apps
              </span>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col">
              <span
                className={`text-base font-extrabold font-mono tabular-nums ${
                  isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
                }`}
              >
                637
              </span>
              <span className={`text-xs font-medium mt-0.5 ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
                Unique Clients
              </span>
              <span className={`text-[10px] ${isLight ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                Founders & businesses
              </span>
            </div>

            {/* Metric 4 */}
            <div className="flex flex-col">
              <span className="text-base font-extrabold text-[#08C9F5] font-mono">
                Top Rated
              </span>
              <span className={`text-xs font-medium mt-0.5 ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
                Fiverr Status
              </span>
              <span className={`text-[10px] ${isLight ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                Highest seller tier
              </span>
            </div>
          </div>

          {/* Outbound Link */}
          <div className="shrink-0 pt-2 md:pt-0">
            <a
              href="https://www.fiverr.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 text-xs transition-colors group ${
                isLight ? 'text-[#4B5565] hover:text-[#11172A]' : 'text-[#A8B3C9] hover:text-white'
              }`}
            >
              <span>Verify credentials</span>
              <ExternalLink className="w-3 h-3 text-[#08C9F5] group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* The Founder Trust Architecture: 4 Non-Negotiable Guarantees */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            className={`p-4 rounded-xl border space-y-1.5 transition-colors ${
              isLight
                ? 'bg-[#F7F8FC] border-[#E4E7F0]'
                : 'bg-[#0E1627] border-[#1E293B]'
            }`}
          >
            <div
              className={`flex items-center gap-2 text-xs font-semibold ${
                isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
              }`}
            >
              <Lock className="w-4 h-4 text-[#08C9F5] shrink-0" />
              <span>100% Code & IP Ownership</span>
            </div>
            <p className={`text-[11px] leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
              All source code lives in your GitHub repository and cloud accounts. Zero proprietary lock-in.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border space-y-1.5 transition-colors ${
              isLight
                ? 'bg-[#F7F8FC] border-[#E4E7F0]'
                : 'bg-[#0E1627] border-[#1E293B]'
            }`}
          >
            <div
              className={`flex items-center gap-2 text-xs font-semibold ${
                isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
              }`}
            >
              <GitPullRequest className="w-4 h-4 text-[#7025E8] shrink-0" />
              <span>Milestone-Based Demos</span>
            </div>
            <p className={`text-[11px] leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
              Working builds demoed every Friday. You approve working software before milestone releases.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border space-y-1.5 transition-colors ${
              isLight
                ? 'bg-[#F7F8FC] border-[#E4E7F0]'
                : 'bg-[#0E1627] border-[#1E293B]'
            }`}
          >
            <div
              className={`flex items-center gap-2 text-xs font-semibold ${
                isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Direct Developer Partner</span>
            </div>
            <p className={`text-[11px] leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
              No account managers or junior subcontractors. You work directly with Jannatul at every step.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border space-y-1.5 transition-colors ${
              isLight
                ? 'bg-[#F7F8FC] border-[#E4E7F0]'
                : 'bg-[#0E1627] border-[#1E293B]'
            }`}
          >
            <div
              className={`flex items-center gap-2 text-xs font-semibold ${
                isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
              }`}
            >
              <Headphones className="w-4 h-4 text-[#E000C9] shrink-0" />
              <span>30-Day Launch Warranty</span>
            </div>
            <p className={`text-[11px] leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
              Complimentary 30-day post-launch support for bug fixes, performance monitoring, and team handoff.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
