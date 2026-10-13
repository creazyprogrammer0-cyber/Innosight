import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projectsData } from '../../data/projectsData';
import { Project } from '../../types';
import { ProjectCard } from '../projects/ProjectCard';
import { useTheme } from '../../context/ThemeContext';
import { useCms } from '../../context/CmsContext';

interface SelectedWorkSectionProps {
  onOpenCaseStudy: (project: Project) => void;
  showAllInitially?: boolean;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({
  onOpenCaseStudy,
  showAllInitially = false,
}) => {
  const { theme } = useTheme();
  const { projects: cmsProjects } = useCms();
  const isLight = theme === 'light';
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categories = [
    { label: 'All Projects', value: 'all' },
    { label: 'SaaS Platforms', value: 'SaaS Platform' },
    { label: 'AI Applications', value: 'AI Application' },
    { label: 'Custom Operations', value: 'Custom Operational System' },
  ];

  const sourceProjects = cmsProjects && cmsProjects.length > 0 ? cmsProjects : projectsData;

  const filteredProjects = sourceProjects.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  return (
    <section
      id="work"
      className={`py-24 transition-colors ${
        isLight ? 'bg-[#F7F8FC]' : 'bg-[#080D18]'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b ${
            isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]'
          }`}
        >
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#08C9F5]">
              PROVEN TECHNICAL DELIVERY
            </span>
            <h2
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
              }`}
            >
              Selected work
            </h2>
            <p className={`text-base max-w-xl ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
              A closer look at the products, systems, and digital experiences behind the work.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div
            className={`flex items-center gap-1 p-1 rounded-xl self-start md:self-auto overflow-x-auto max-w-full border ${
              isLight
                ? 'bg-white border-[#E4E7F0] shadow-sm'
                : 'bg-[#0E1627] border-[#1E293B]'
            }`}
          >
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  activeFilter === cat.value
                    ? isLight
                      ? 'bg-slate-100 text-[#11172A] shadow-sm font-bold'
                      : 'bg-[#1E293B] text-white shadow-sm font-semibold'
                    : isLight
                      ? 'text-[#64748B] hover:text-[#11172A]'
                      : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenCaseStudy={onOpenCaseStudy}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
