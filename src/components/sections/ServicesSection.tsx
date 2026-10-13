import React from 'react';
import { ArrowUpRight, CheckCircle2, Layers, Cpu, Code2 } from 'lucide-react';
import { servicesData } from '../../data/servicesData';
import { ServiceItem } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useCms } from '../../context/CmsContext';

interface ServicesSectionProps {
  onOpenServiceDetail: (service: ServiceItem) => void;
  onOpenContact: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenServiceDetail,
  onOpenContact,
}) => {
  const { theme } = useTheme();
  const { services: cmsServices, homepage } = useCms();
  const isLight = theme === 'light';

  const sourceServices = cmsServices && cmsServices.length > 0 ? cmsServices : servicesData;

  const iconMap: { [key: string]: React.ReactNode } = {
    'saas-development': <Layers className="w-5 h-5 text-[#08C9F5]" />,
    'ai-development': <Cpu className="w-5 h-5 text-[#E000C9]" />,
    'custom-software': <Code2 className="w-5 h-5 text-[#7025E8]" />,
  };

  return (
    <section
      id="services"
      className={`py-24 border-t transition-colors ${
        isLight
          ? 'bg-white border-[#E4E7F0]'
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
            CORE CAPABILITIES
          </span>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 ${
              isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
            }`}
          >
            {homepage?.servicesHeading || "Build the right solution for the problem you're solving."}
          </h2>
          <p className={`text-base max-w-2xl mt-2 ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
            {homepage?.servicesDescription || "Every engagement starts by identifying your business constraints, user journeys, and the simplest architecture capable of achieving your business goals."}
          </p>
        </div>

        {/* 3 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
          {sourceServices.map((service, index) => (
            <div
              key={service.id}
              onClick={() => onOpenServiceDetail(service)}
              className={`group border rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                isLight
                  ? 'bg-[#F7F8FC] hover:bg-slate-50 border-[#E4E7F0] hover:border-[#7025E8]/40 shadow-sm hover:shadow-xl'
                  : 'bg-[#0E1627] hover:bg-[#121B30] border-[#1E293B] hover:border-[#7025E8]/40 shadow-lg hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
              }`}
            >
              <div className="space-y-5">
                {/* Header Icon + Editorial Number */}
                <div className="flex items-center justify-between">
                  <div
                    className={`p-3 rounded-xl border transition-colors ${
                      isLight
                        ? 'bg-white border-[#E4E7F0]'
                        : 'bg-[#080D18] border-[#1E293B]'
                    }`}
                  >
                    {iconMap[service.id]}
                  </div>
                  <span className={`text-xs font-mono font-semibold ${isLight ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                    0{index + 1}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3
                    className={`text-xl font-bold tracking-tight transition-colors ${
                      isLight
                        ? 'text-[#11172A] group-hover:text-[#2364F5]'
                        : 'text-[#F6F7FF] group-hover:text-white'
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'}`}>
                    {service.description}
                  </p>
                </div>

                {/* Problems Solved Highlights */}
                <div
                  className={`space-y-2 pt-2 border-t ${
                    isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]/70'
                  }`}
                >
                  <span className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider block">
                    Key Outcomes
                  </span>
                  <ul className="space-y-1.5 text-xs">
                    {service.capabilities.slice(0, 3).map((cap, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-2 ${
                          isLight ? 'text-[#334155]' : 'text-[#CBD5E1]'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#08C9F5] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Action Affordance */}
              <div
                className={`pt-6 mt-6 border-t flex items-center justify-between text-xs font-medium text-[#08C9F5] group-hover:text-[#2364F5] transition-colors ${
                  isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]'
                }`}
              >
                <span className="font-semibold">Explore Capabilities & Approach</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
