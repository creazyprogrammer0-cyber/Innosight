import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  AlertCircle,
  ArrowUpRight,
  MessageSquare,
  Lock,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ContactFormProps {
  initialProjectType?: string;
  initialMessage?: string;
  initialBudget?: string;
  onSuccessClose?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  initialProjectType = 'SaaS Platform',
  initialMessage = '',
  initialBudget = '$5k – $15k',
  onSuccessClose,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(initialProjectType);
  const [projectStage, setProjectStage] = useState('Idea & Scoping');
  const [budgetRange, setBudgetRange] = useState(initialBudget);
  const [message, setMessage] = useState(initialMessage);
  const [kickoffTiming, setKickoffTiming] = useState('Immediately (Ready to start)');
  const [preferredChannel, setPreferredChannel] = useState<'video' | 'email'>('video');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showCallScheduler, setShowCallScheduler] = useState(false);

  useEffect(() => {
    if (initialProjectType) setProjectType(initialProjectType);
    if (initialMessage) setMessage(initialMessage);
    if (initialBudget) setBudgetRange(initialBudget);
  }, [initialProjectType, initialMessage, initialBudget]);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Please provide your name or company name.';
    if (!email.trim()) {
      errs.email = 'Please provide your contact email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!message.trim() || message.length < 15) {
      errs.message = 'Please provide a short summary of what you are looking to build (min 15 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const sanitizedName = name.trim().replace(/<[^>]*>?/gm, '');
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedMessage = message.trim().replace(/<[^>]*>?/gm, '');

    const inquiry = {
      name: sanitizedName,
      email: sanitizedEmail,
      projectType,
      projectStage,
      budgetRange,
      kickoffTiming,
      preferredChannel,
      message: sanitizedMessage,
      timestamp: new Date().toISOString(),
    };

    try {
      const webhookUrl = (import.meta as any).env?.VITE_CONTACT_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inquiry),
        });
      }
    } catch (err) {
      console.warn('Webhook dispatch skipped (offline or unconfigured):', err);
    }

    try {
      const existing = JSON.parse(localStorage.getItem('innosight_inquiries') || '[]');
      existing.push(inquiry);
      localStorage.setItem('innosight_inquiries', JSON.stringify(existing));
      window.dispatchEvent(new CustomEvent('innosight:inquiry', { detail: inquiry }));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  if (submitted) {
    return (
      <div
        className={`p-8 sm:p-10 rounded-2xl border text-center space-y-5 animate-in fade-in duration-300 ${
          isLight
            ? 'bg-[#F7F8FC] border-emerald-500/30'
            : 'bg-[#080D18] border-emerald-500/30'
        }`}
      >
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className={`text-2xl font-bold ${isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'}`}>
            Inquiry Dispatched, {name.split(' ')[0]}!
          </h3>
          <p className={`text-sm max-w-md mx-auto leading-relaxed ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
            Thank you for reaching out. I personally review every technical proposal and will respond
            to <span className={`font-mono font-semibold ${isLight ? 'text-[#11172A]' : 'text-white'}`}>{email}</span> within 24 hours with architectural
            feedback and proposed next steps.
          </p>
        </div>

        {/* Next Steps Road Map */}
        <div
          className={`p-4 rounded-xl border max-w-md mx-auto text-left text-xs space-y-2 ${
            isLight
              ? 'bg-white border-[#E4E7F0] shadow-sm'
              : 'bg-[#0E1627] border-[#1E293B]'
          }`}
        >
          <span className="text-[10px] font-mono text-[#08C9F5] uppercase tracking-wider block font-semibold">
            What Happens Next
          </span>
          <div className={`space-y-1.5 ${isLight ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
            <div className="flex items-start gap-2">
              <span className="text-[#08C9F5] font-mono font-bold">1.</span>
              <span>I audit your tech stack requirements & data model feasibility.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#7025E8] font-mono font-bold">2.</span>
              <span>We hold a focused 20-min video scoping call to establish sprint goals.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#E000C9] font-mono font-bold">3.</span>
              <span>You receive a fixed-scope milestone timeline before any commitment.</span>
            </div>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setSubmitted(false)}
            className={`text-xs underline underline-offset-4 transition-colors ${
              isLight ? 'text-[#64748B] hover:text-[#11172A]' : 'text-[#A8B3C9] hover:text-white'
            }`}
          >
            Send another inquiry
          </button>
          {onSuccessClose && (
            <button
              onClick={onSuccessClose}
              className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors ${
                isLight
                  ? 'bg-white text-[#11172A] border border-[#E4E7F0] hover:bg-slate-50'
                  : 'bg-[#131E33] text-white hover:bg-[#1E293B]'
              }`}
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left">
      {/* Header Toggle */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
          isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]'
        }`}
      >
        <div>
          <h2
            className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
              isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
            }`}
          >
            Start a Project Conversation
          </h2>
          <p className={`text-xs mt-1 ${isLight ? 'text-[#64748B]' : 'text-[#A8B3C9]'}`}>
            Direct collaboration with Jannatul. Honest scoping, fixed-price milestones, and zero junior handoffs.
          </p>
        </div>

        {/* Discovery Call Secondary Toggle */}
        <button
          type="button"
          onClick={() => setShowCallScheduler(!showCallScheduler)}
          className="text-xs font-semibold text-[#08C9F5] hover:text-[#2364F5] flex items-center gap-1.5 whitespace-nowrap transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{showCallScheduler ? 'Switch to Form' : 'Prefer a Video Call?'}</span>
        </button>
      </div>

      {showCallScheduler ? (
        <div
          className={`p-6 rounded-2xl border space-y-6 ${
            isLight
              ? 'bg-[#F7F8FC] border-[#E4E7F0]'
              : 'bg-[#080D18] border-[#1E293B]'
          }`}
        >
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-5 h-5 text-[#08C9F5]" />
            <div>
              <span className={`font-bold block ${isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'}`}>
                20-Minute Technical Scoping Call
              </span>
              <span className={`text-xs ${isLight ? 'text-[#64748B]' : 'text-[#A8B3C9]'}`}>
                Walk through your product idea, discuss architecture trade-offs, and assess technical feasibility directly with Jannatul.
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono text-[#64748B] uppercase tracking-wider block">
              Active Founder Windows (Mon – Fri)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div
                className={`p-3 rounded-lg border ${
                  isLight
                    ? 'bg-white border-[#E4E7F0]'
                    : 'bg-[#0E1627] border-[#1E293B]'
                }`}
              >
                <span className={`font-semibold block ${isLight ? 'text-[#11172A]' : 'text-white'}`}>
                  Morning Window (Europe / Asia)
                </span>
                <span className={isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}>
                  09:00 AM – 01:00 PM GMT
                </span>
              </div>
              <div
                className={`p-3 rounded-lg border ${
                  isLight
                    ? 'bg-white border-[#E4E7F0]'
                    : 'bg-[#0E1627] border-[#1E293B]'
                }`}
              >
                <span className={`font-semibold block ${isLight ? 'text-[#11172A]' : 'text-white'}`}>
                  Afternoon Window (US East / West)
                </span>
                <span className={isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}>
                  02:00 PM – 06:00 PM EST
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="mailto:contact@innosight.dev?subject=Discovery%20Call%20Request%20—%20Innosight"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 text-xs font-semibold text-white bg-gradient-to-r from-[#2364F5] to-[#7025E8] rounded-xl hover:opacity-95 transition-all shadow-md"
            >
              <span>Schedule 20-Min Call via Email</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label
                htmlFor="contact-name"
                className={`text-xs font-semibold block ${isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'}`}
              >
                Your Name / Startup <span className="text-[#E000C9]">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Elena Vance (SaaS founder)"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#7025E8] ${
                  isLight
                    ? 'bg-[#F7F8FC] border-[#E4E7F0] text-[#11172A] placeholder-[#94A3B8]'
                    : 'bg-[#080D18] border-[#1E293B] text-white placeholder-[#475569]'
                } ${errors.name ? 'border-red-500/80 ring-1 ring-red-500/50' : ''}`}
              />
              {errors.name && (
                <p className="text-[11px] text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-email"
                className={`text-xs font-semibold block ${isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'}`}
              >
                Work Email <span className="text-[#E000C9]">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="elena@company.com"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#7025E8] ${
                  isLight
                    ? 'bg-[#F7F8FC] border-[#E4E7F0] text-[#11172A] placeholder-[#94A3B8]'
                    : 'bg-[#080D18] border-[#1E293B] text-white placeholder-[#475569]'
                } ${errors.email ? 'border-red-500/80 ring-1 ring-red-500/50' : ''}`}
              />
              {errors.email && (
                <p className="text-[11px] text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Category & Stage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label
                htmlFor="project-type"
                className={`text-xs font-semibold block ${isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'}`}
              >
                Product Category
              </label>
              <select
                id="project-type"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#7025E8] ${
                  isLight
                    ? 'bg-[#F7F8FC] border-[#E4E7F0] text-[#11172A]'
                    : 'bg-[#080D18] border-[#1E293B] text-white'
                }`}
              >
                <option value="SaaS Platform">SaaS / Product MVP</option>
                <option value="AI Application">AI Application / Document Pipeline</option>
                <option value="Custom Operational System">Custom ERP / Internal Portal</option>
                <option value="Web Application">Modern Web App / API Modernization</option>
                <option value="Technical Advisory">Technical Advisory & Scoping</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="kickoff-timing"
                className={`text-xs font-semibold block ${isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'}`}
              >
                Target Kickoff Timing
              </label>
              <select
                id="kickoff-timing"
                value={kickoffTiming}
                onChange={(e) => setKickoffTiming(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#7025E8] ${
                  isLight
                    ? 'bg-[#F7F8FC] border-[#E4E7F0] text-[#11172A]'
                    : 'bg-[#080D18] border-[#1E293B] text-white'
                }`}
              >
                <option value="Immediately (Ready to start)">Immediately (Ready to start)</option>
                <option value="Within 2 to 4 weeks">Within 2 to 4 weeks</option>
                <option value="Exploring & Scoping for Q2">Exploring & Scoping for next month</option>
              </select>
            </div>
          </div>

          {/* Row 3: Budget Range */}
          <div className="space-y-1.5">
            <label
              className={`text-xs font-semibold flex items-center justify-between ${
                isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
              }`}
            >
              <span>Estimated Budget Bracket</span>
              <span className="text-[11px] text-[#64748B] font-normal">(Milestone based)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['< $5k (Sprint)', '$5k – $15k (MVP)', '$15k – $30k (Scale)', 'Retainer / Custom'].map(
                (tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setBudgetRange(tier)}
                    className={`py-2 px-3 text-xs font-mono rounded-lg border text-center transition-all cursor-pointer ${
                      budgetRange === tier
                        ? isLight
                          ? 'bg-slate-100 text-[#11172A] border-[#2364F5] font-bold ring-1 ring-[#2364F5]'
                          : 'bg-[#1E293B] text-white border-[#08C9F5] shadow-sm'
                        : isLight
                          ? 'bg-[#F7F8FC] text-[#4B5565] border-[#E4E7F0] hover:bg-white'
                          : 'bg-[#080D18] text-[#94A3B8] border-[#1E293B] hover:text-white hover:border-[#334155]'
                    }`}
                  >
                    {tier}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Row 4: Project Summary */}
          <div className="space-y-1.5">
            <label
              htmlFor="project-desc"
              className={`text-xs font-semibold block ${isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'}`}
            >
              What are you looking to build? <span className="text-[#E000C9]">*</span>
            </label>
            <textarea
              id="project-desc"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me a bit about your user workflows, target timeline, or existing technical bottlenecks..."
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-all resize-y focus:outline-none focus:ring-2 focus:ring-[#7025E8] ${
                isLight
                  ? 'bg-[#F7F8FC] border-[#E4E7F0] text-[#11172A] placeholder-[#94A3B8]'
                  : 'bg-[#080D18] border-[#1E293B] text-white placeholder-[#475569]'
              } ${errors.message ? 'border-red-500/80 ring-1 ring-red-500/50' : ''}`}
            />
            {errors.message && (
              <p className="text-[11px] text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.message}
              </p>
            )}
          </div>

          {/* Trust Guarantees */}
          <div
            className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
              isLight
                ? 'bg-[#F7F8FC] border-[#E4E7F0] text-[#64748B]'
                : 'bg-[#080D18] border-[#1E293B] text-[#94A3B8]'
            }`}
          >
            <span className={`flex items-center gap-1.5 ${isLight ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
              <Lock className="w-3.5 h-3.5 text-[#08C9F5]" />
              100% Confidential · Mutual NDA available upon request
            </span>
            <span className="text-[#64748B]">Response within 24h</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-[#2364F5] via-[#7025E8] to-[#E000C9] hover:opacity-95 rounded-xl shadow-lg shadow-[#7025E8]/25 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <span>Submitting inquiry...</span>
            ) : (
              <>
                <span>Request Project Scoping & Estimate</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
