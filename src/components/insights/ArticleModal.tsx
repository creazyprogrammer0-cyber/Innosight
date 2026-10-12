import React from 'react';
import { ArrowUpRight, BookOpen, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { InsightArticle } from '../../types';
import { InteractiveModal } from '../ui/InteractiveModal';
import { useTheme } from '../../context/ThemeContext';

interface ArticleModalProps {
  article: InsightArticle | null;
  isOpen: boolean;
  onClose: () => void;
  onDiscussTopic: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  isOpen,
  onClose,
  onDiscussTopic,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  if (!article) return null;

  return (
    <InteractiveModal
      isOpen={isOpen}
      onClose={onClose}
      title={article.title}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-8 text-left">
        {/* Article Meta Bar (Zero-Pill Discipline) */}
        <div className={`space-y-3 pb-6 border-b ${isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]'}`}>
          <div className={`flex items-center gap-3 text-xs font-mono ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
            <span className="text-[#08C9F5] font-semibold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishedDate}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
            isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
          }`}>
            {article.title}
          </h1>

          <p className={`text-base leading-relaxed italic border-l-2 border-[#7025E8] pl-4 py-1 ${
            isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'
          }`}>
            "{article.summary}"
          </p>
        </div>

        {/* Introduction */}
        <div className={`text-base leading-relaxed ${isLight ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
          {article.content.introduction}
        </div>

        {/* Structured Sections */}
        <div className="space-y-8">
          {article.content.sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className={`text-lg font-bold tracking-tight ${
                isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
              }`}>
                {section.heading}
              </h3>

              <div className={`space-y-3 text-sm leading-relaxed ${
                isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'
              }`}>
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {section.keyTakeaways && (
                <div className={`p-4 rounded-xl border space-y-2 mt-4 transition-colors ${
                  isLight
                    ? 'bg-[#F7F8FC] border-[#E4E7F0]'
                    : 'bg-[#080D18] border-[#1E293B]'
                }`}>
                  <span className="text-xs font-mono font-semibold text-[#08C9F5] uppercase tracking-wider block">
                    Key Practical Rule
                  </span>
                  <ul className={`space-y-1.5 text-xs ${isLight ? 'text-[#334155]' : 'text-[#E2E8F0]'}`}>
                    {section.keyTakeaways.map((takeaway, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className={`p-5 rounded-xl border space-y-2 transition-colors ${
          isLight
            ? 'bg-[#F7F8FC] border-[#E4E7F0]'
            : 'bg-[#080D18] border-[#1E293B]'
        }`}>
          <span className="text-xs font-mono text-[#E000C9] uppercase tracking-wider block">
            Founder Takeaway
          </span>
          <p className={`text-sm leading-relaxed ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
            {article.content.conclusion}
          </p>
        </div>

        {/* Discussion CTA */}
        <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border transition-colors ${
          isLight
            ? 'border-[#E4E7F0] bg-[#F7F8FC]'
            : 'border-[#1E293B] bg-[#0E1627] border-[#7025E8]/30'
        }`}>
          <div>
            <h4 className={`text-base font-bold ${isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'}`}>
              Have questions regarding your product architecture?
            </h4>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-[#64748B]' : 'text-[#A8B3C9]'}`}>
              Discuss your specific technical challenges with Jannatul.
            </p>
          </div>
          <button
            onClick={() => {
              onClose();
              onDiscussTopic();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#2364F5] to-[#7025E8] hover:from-[#08C9F5] hover:to-[#2364F5] rounded-xl transition-all shadow-md shadow-[#7025E8]/20 shrink-0"
          >
            <span>Ask a question</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </InteractiveModal>
  );
};
