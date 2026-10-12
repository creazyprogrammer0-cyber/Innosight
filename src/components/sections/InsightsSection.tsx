import React from 'react';
import { ArrowUpRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { insightsData } from '../../data/insightsData';
import { InsightArticle } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface InsightsSectionProps {
  onOpenArticle: (article: InsightArticle) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ onOpenArticle }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section
      id="insights"
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
            FOUNDER ADVISORY
          </span>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 ${
              isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
            }`}
          >
            Notes on building better digital products.
          </h2>
          <p className={`text-base max-w-2xl mt-2 leading-relaxed ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
            Practical essays on SaaS MVP scoping, pragmatic software architecture, and practical
            AI integration based on real production builds.
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
          {insightsData.map((article) => (
            <article
              key={article.id}
              onClick={() => onOpenArticle(article)}
              className={`group border rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-slate-50 border-[#E4E7F0] hover:border-[#7025E8]/40 shadow-sm hover:shadow-xl'
                  : 'bg-[#0E1627] hover:bg-[#121B30] border-[#1E293B] hover:border-[#7025E8]/40 shadow-lg hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
              }`}
            >
              <div className="space-y-4">
                {/* Zero-Pill Metadata Discipline */}
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-[#08C9F5] font-semibold">{article.category}</span>
                  <span aria-hidden="true" className={isLight ? 'text-[#CBD5E1]' : 'text-[#475569]'}>
                    ·
                  </span>
                  <span className={isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}>
                    {article.readTime}
                  </span>
                </div>

                <h3
                  className={`text-xl font-bold tracking-tight transition-colors leading-snug ${
                    isLight
                      ? 'text-[#11172A] group-hover:text-[#2364F5]'
                      : 'text-[#F6F7FF] group-hover:text-white'
                  }`}
                >
                  {article.title}
                </h3>

                <p className={`text-sm leading-relaxed line-clamp-3 ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
                  {article.summary}
                </p>
              </div>

              {/* Read Article Link */}
              <div
                className={`pt-6 mt-6 border-t flex items-center justify-between text-xs font-medium text-[#08C9F5] group-hover:text-[#2364F5] transition-colors ${
                  isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]'
                }`}
              >
                <span className="font-semibold">Read Full Essay</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
