import React, { useState } from 'react';
import { ArrowUpRight, ShieldCheck, Mail, Globe, ExternalLink } from 'lucide-react';
import { InnosightLogo } from '../brand/InnosightLogo';
import { ViewRoute } from '../../types';
import { InteractiveModal } from '../ui/InteractiveModal';
import { useTheme } from '../../context/ThemeContext';

interface FooterProps {
  onNavigate: (route: ViewRoute) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact }) => {
  const { theme } = useTheme();
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const isLight = theme === 'light';

  const handleNav = (route: ViewRoute) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`border-t pt-16 pb-12 transition-colors ${
        isLight
          ? 'bg-[#F1F3F9] border-[#E4E7F0] text-[#4B5565]'
          : 'bg-[#060A13] border-[#1E293B] text-[#A8B3C9]'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b ${
            isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]'
          }`}
        >
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <button
              onClick={() => handleNav('home')}
              className="text-left focus:outline-none"
              aria-label="Innosight Home"
            >
              <InnosightLogo
                variant={isLight ? 'light' : 'dark'}
                size="md"
                showTagline={true}
              />
            </button>
            <p
              className={`text-sm leading-relaxed max-w-sm mt-1 ${
                isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'
              }`}
            >
              Jannatul — Full-stack developer and technical partner. Helping founders turn complex
              business ideas into reliable SaaS platforms, custom software, and practical AI integrations.
            </p>
            <div
              className={`flex items-center gap-2 text-xs mt-2 ${
                isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-[#08C9F5]" />
              <span>Available for worldwide remote collaboration (EST, PST, GMT, CET timezone overlap)</span>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
              }`}
            >
              Navigation
            </span>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('work')}
                  className={`transition-colors ${
                    isLight ? 'hover:text-[#11172A]' : 'hover:text-white'
                  }`}
                >
                  Selected Work & Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className={`transition-colors ${
                    isLight ? 'hover:text-[#11172A]' : 'hover:text-white'
                  }`}
                >
                  Services & Capabilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className={`transition-colors ${
                    isLight ? 'hover:text-[#11172A]' : 'hover:text-white'
                  }`}
                >
                  About Jannatul & Background
                </button>
              </li>
              <li>
                <a
                  href="#team"
                  className={`transition-colors ${
                    isLight ? 'hover:text-[#11172A]' : 'hover:text-white'
                  }`}
                >
                  Core Engineering Team (5 Specialists)
                </a>
              </li>
              <li>
                <button
                  onClick={() => handleNav('insights')}
                  className={`transition-colors ${
                    isLight ? 'hover:text-[#11172A]' : 'hover:text-white'
                  }`}
                >
                  Founder Insights & Articles
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#08C9F5] transition-colors"
                >
                  Start a Project Conversation
                </button>
              </li>
            </ul>
          </div>

          {/* Verified Credentials & Direct Contact (4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
              }`}
            >
              Verified Credentials
            </span>
            <div
              className={`p-4 rounded-xl border flex flex-col gap-2.5 ${
                isLight
                  ? 'bg-white border-[#E4E7F0] shadow-sm'
                  : 'bg-[#0E1627] border-[#1E293B]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-semibold flex items-center gap-1.5 ${
                    isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-[#08C9F5]" />
                  Fiverr Top Rated Seller
                </span>
                <span className="text-xs font-mono font-medium text-[#7025E8] bg-[#7025E8]/10 px-2 py-0.5 rounded">
                  4.9 / 5.0
                </span>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'
                }`}
              >
                799 completed orders across 637 unique clients worldwide with $162k+ in verified marketplace deliverables.
              </p>
              <a
                href="https://www.fiverr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#08C9F5] hover:text-[#2364F5] font-medium pt-1 transition-colors"
              >
                <span>View verified seller credentials</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="mt-1 flex items-center gap-2 text-xs">
              <Mail className="w-3.5 h-3.5 text-[#E000C9]" />
              <button
                onClick={onOpenContact}
                className={`font-medium underline underline-offset-4 transition-colors ${
                  isLight
                    ? 'text-[#11172A] hover:text-[#08C9F5]'
                    : 'text-[#F6F7FF] hover:text-[#08C9F5]'
                }`}
              >
                Open Project Inquiry Desk
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
            isLight ? 'text-[#64748B]' : 'text-[#64748B]'
          }`}
        >
          <div>
            © {new Date().getFullYear()} Innosight / Jannatul. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setLegalModal('privacy')}
              className={`transition-colors ${
                isLight ? 'hover:text-[#11172A]' : 'hover:text-[#A8B3C9]'
              }`}
            >
              Privacy & Data Policy
            </button>
            <button
              onClick={() => setLegalModal('terms')}
              className={`transition-colors ${
                isLight ? 'hover:text-[#11172A]' : 'hover:text-[#A8B3C9]'
              }`}
            >
              Working Terms & Handoff
            </button>
            <button
              onClick={() => handleNav('admin')}
              className={`transition-colors font-mono text-[11px] flex items-center gap-1 ${
                isLight ? 'text-slate-400 hover:text-[#7025E8]' : 'text-slate-500 hover:text-[#08C9F5]'
              }`}
            >
              <span>🔒 Admin CMS</span>
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`flex items-center gap-1 transition-colors ${
                isLight ? 'hover:text-[#11172A]' : 'hover:text-[#A8B3C9]'
              }`}
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <InteractiveModal
        isOpen={legalModal === 'privacy'}
        onClose={() => setLegalModal(null)}
        title="Privacy & Data Protection Notice"
      >
        <div className={`space-y-4 text-sm ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
          <p>
            This website collects information exclusively when you voluntarily submit a project inquiry
            through the project discussion form. The collected information includes your name, email address,
            project requirements, budget tier, and project specifications.
          </p>
          <h4 className={`text-base font-semibold ${isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'}`}>How Information Is Used</h4>
          <p>
            Your inquiry details are used solely to evaluate your technical requirements, prepare architecture
            recommendations, and respond to your direct project inquiry. Your email address and project details
            are never sold, leased, or shared with third-party advertisers.
          </p>
          <h4 className={`text-base font-semibold ${isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'}`}>Confidentiality & Non-Disclosure</h4>
          <p>
            All business ideas, intellectual property, and proprietary workflows shared during discussions
            are treated under strict professional confidentiality. Mutual Non-Disclosure Agreements (NDAs)
            are readily signed prior to in-depth technical scoping upon request.
          </p>
        </div>
      </InteractiveModal>

      {/* Working Terms Modal */}
      <InteractiveModal
        isOpen={legalModal === 'terms'}
        onClose={() => setLegalModal(null)}
        title="Working Terms & Code Ownership"
      >
        <div className={`space-y-4 text-sm ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
          <h4 className={`text-base font-semibold ${isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'}`}>100% Client Code Ownership</h4>
          <p>
            Upon project milestone completion and settlement, the client owns 100% of the custom codebase,
            repositories, architecture assets, and documentation. No proprietary lock-in.
          </p>
          <h4 className={`text-base font-semibold ${isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'}`}>Milestone-Based Delivery</h4>
          <p>
            Projects are structured into clear, transparent milestones (e.g. Architecture & Schema, Core MVP
            Development, Testing & Integrations, Production Deployment). You review working demos at each stage
            before approving subsequent phases.
          </p>
          <h4 className={`text-base font-semibold ${isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'}`}>30-Day Post-Launch Warranty</h4>
          <p>
            Every completed production build includes a complimentary 30-day warranty window for bug fixes,
            deployment adjustments, and handoff support to guarantee stability.
          </p>
        </div>
      </InteractiveModal>
    </footer>
  );
};
