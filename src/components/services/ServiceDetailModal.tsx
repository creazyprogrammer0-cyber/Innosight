import React, { useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Layers,
  Sparkles,
  HelpCircle,
  Code2,
} from 'lucide-react';
import { ServiceItem } from '../../types';
import { InteractiveModal } from '../ui/InteractiveModal';
import { useTheme } from '../../context/ThemeContext';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onDiscussProject: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
  onDiscussProject,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  if (!service) return null;

  return (
    <InteractiveModal
      isOpen={isOpen}
      onClose={onClose}
      title={service.title}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-10 text-left">
        {/* Header Summary */}
        <div className={`space-y-3 pb-6 border-b ${isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]'}`}>
          <span className="text-xs font-mono font-semibold text-[#08C9F5] uppercase tracking-wider block">
            Specialized Development Offering
          </span>
          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
            isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
          }`}>
            {service.title}
          </h1>
          <p className={`text-base leading-relaxed max-w-2xl ${
            isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'
          }`}>
            {service.tagline} {service.description}
          </p>
        </div>

        {/* Who This Is For vs Problems Solved */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Who It's For */}
          <div className={`space-y-3 p-5 rounded-xl border transition-colors ${
            isLight
              ? 'bg-[#F7F8FC] border-[#E4E7F0]'
              : 'bg-[#080D18]/70 border-[#1E293B]'
          }`}>
            <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
              isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
            }`}>
              <Layers className="w-4 h-4 text-[#08C9F5]" />
              Who This Service Is Designed For
            </h3>
            <ul className={`space-y-2.5 text-sm ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
              {service.idealFor.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#08C9F5] font-mono mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Critical Problems Solved */}
          <div className={`space-y-3 p-5 rounded-xl border transition-colors ${
            isLight
              ? 'bg-[#F7F8FC] border-[#E4E7F0]'
              : 'bg-[#080D18]/70 border-[#1E293B]'
          }`}>
            <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
              isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
            }`}>
              <Sparkles className="w-4 h-4 text-[#E000C9]" />
              Business & Technical Bottlenecks Solved
            </h3>
            <ul className={`space-y-2.5 text-sm ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
              {service.problemsSolved.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Core Capabilities */}
        <div className="space-y-3">
          <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
            isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
          }`}>
            <Code2 className="w-4 h-4 text-[#7025E8]" />
            What I Architect & Implement
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm">
            {service.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border flex items-start gap-2.5 transition-colors ${
                  isLight
                    ? 'bg-[#F7F8FC] border-[#E4E7F0] text-[#334155]'
                    : 'bg-[#080D18] border-[#1E293B] text-[#A8B3C9]'
                }`}
              >
                <span className="text-[#7025E8] font-mono mt-0.5">0{idx + 1}.</span>
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables & Stack */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-xl border transition-colors ${
          isLight
            ? 'bg-[#F7F8FC] border-[#E4E7F0]'
            : 'bg-[#080D18] border-[#1E293B]'
        }`}>
          <div className="space-y-2.5">
            <span className={`text-xs font-mono uppercase tracking-wider block ${
              isLight ? 'text-[#64748B]' : 'text-[#64748B]'
            }`}>
              Tangible Deliverables
            </span>
            <ul className={`space-y-1.5 text-xs ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#08C9F5] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5">
            <span className={`text-xs font-mono uppercase tracking-wider block ${
              isLight ? 'text-[#64748B]' : 'text-[#64748B]'
            }`}>
              Core Tech Stack For This Discipline
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {service.techStack.map((tech) => (
                <span
                  key={tech}
                  className={`text-xs font-mono px-2.5 py-1 rounded border transition-colors ${
                    isLight
                      ? 'bg-white text-[#11172A] border-[#E4E7F0]'
                      : 'bg-[#131E33] text-[#F6F7FF] border-[#1E293B]'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className={`space-y-4 pt-4 border-t ${isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]'}`}>
          <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
            isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
          }`}>
            <HelpCircle className="w-4 h-4 text-[#08C9F5]" />
            Frequently Asked Questions
          </h3>

          <div className="space-y-2">
            {service.faq.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-lg border overflow-hidden transition-colors ${
                    isLight
                      ? 'bg-white border-[#E4E7F0]'
                      : 'bg-[#080D18] border-[#1E293B]'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className={`w-full flex items-center justify-between p-4 text-left text-sm font-semibold transition-colors ${
                      isLight
                        ? 'text-[#11172A] hover:text-[#2364F5]'
                        : 'text-[#F6F7FF] hover:text-[#08C9F5]'
                    }`}
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isLight ? 'text-[#64748B]' : 'text-[#64748B]'
                      } ${isOpen ? 'rotate-180 text-[#08C9F5]' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className={`px-4 pb-4 pt-1 text-sm leading-relaxed border-t ${
                      isLight
                        ? 'text-[#4B5565] border-[#E4E7F0]'
                        : 'text-[#A8B3C9] border-[#1E293B]/40'
                    }`}>
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer CTA */}
        <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border transition-colors ${
          isLight
            ? 'border-[#E4E7F0] bg-[#F7F8FC]'
            : 'border-[#1E293B] bg-[#080D18]'
        }`}>
          <div>
            <h4 className={`text-base font-bold ${isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'}`}>
              Ready to explore your product scope?
            </h4>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-[#64748B]' : 'text-[#A8B3C9]'}`}>
              Let’s schedule a brief conversation to clarify requirements and timelines.
            </p>
          </div>
          <button
            onClick={() => {
              onClose();
              onDiscussProject();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#2364F5] to-[#7025E8] hover:from-[#08C9F5] hover:to-[#2364F5] rounded-xl transition-all shadow-md shadow-[#7025E8]/20 shrink-0"
          >
            <span>Start a project inquiry</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </InteractiveModal>
  );
};
