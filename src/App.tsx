import React, { useState, useEffect } from 'react';
import { ViewRoute, Project, ServiceItem, InsightArticle } from './types';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { CredibilityStrip } from './components/sections/CredibilityStrip';
import { SelectedWorkSection } from './components/sections/SelectedWorkSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { ScopeEstimator } from './components/sections/ScopeEstimator';
import { ApproachSection } from './components/sections/ApproachSection';
import { EngineeringPillarsSection } from './components/sections/EngineeringPillarsSection';
import { AboutSection } from './components/sections/AboutSection';
import { InsightsSection } from './components/sections/InsightsSection';
import { FinalCtaSection } from './components/sections/FinalCtaSection';
import { CaseStudyModal } from './components/projects/CaseStudyModal';
import { ServiceDetailModal } from './components/services/ServiceDetailModal';
import { ArticleModal } from './components/insights/ArticleModal';
import { InteractiveModal } from './components/ui/InteractiveModal';
import { ContactForm } from './components/forms/ContactForm';
import { projectsData } from './data/projectsData';
import { servicesData } from './data/servicesData';
import { credentialsData } from './data/credentialsData';
import { insightsData } from './data/insightsData';
import { ArrowLeft, ArrowUpRight, ShieldCheck, Mail, Calendar, Sparkles } from 'lucide-react';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [currentRoute, setCurrentRoute] = useState<ViewRoute>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Dynamic Contact Form Initial State
  const [contactProjectType, setContactProjectType] = useState('SaaS Platform');
  const [contactInitialMessage, setContactInitialMessage] = useState('');
  const [contactInitialBudget, setContactInitialBudget] = useState('$5k – $15k');

  // Handle URL hash or back button
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ViewRoute;
      if (['home', 'work', 'services', 'about', 'insights', 'contact'].includes(hash)) {
        setCurrentRoute(hash);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync dynamic document title and canonical URL for SEO and browser history
  useEffect(() => {
    const routeTitles: Record<ViewRoute, string> = {
      home: 'Innosight — Full-Stack Developer & Technical Partner',
      work: 'Selected Work & Systems Architecture — Innosight',
      services: 'Software Engineering Services & Capabilities — Innosight',
      about: 'About Jannatul & Technical Matrix — Innosight',
      insights: 'Founder Insights & Architecture Notes — Innosight',
      contact: 'Project Inquiry & Scoping Desk — Innosight',
    };
    document.title = routeTitles[currentRoute] || routeTitles.home;

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      const canonicalBase = 'https://innosight.dev/';
      canonicalEl.setAttribute(
        'href',
        currentRoute === 'home' ? canonicalBase : `${canonicalBase}#${currentRoute}`
      );
    }
  }, [currentRoute]);

  const handleNavigate = (route: ViewRoute) => {
    setCurrentRoute(route);
    window.location.hash = route === 'home' ? '' : route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenContact = (
    prefType: string = 'SaaS Platform',
    customMessage: string = '',
    customBudget: string = '$5k – $15k'
  ) => {
    setContactProjectType(prefType);
    setContactInitialMessage(customMessage);
    setContactInitialBudget(customBudget);
    setIsContactModalOpen(true);
  };

  const handleApplyScope = (scopeSummary: {
    archetype: string;
    modules: string[];
    timeline: string;
    budgetEstimate: string;
    description: string;
  }) => {
    handleOpenContact(
      scopeSummary.archetype,
      `Hello Jannatul,\n\nI'm exploring a ${scopeSummary.archetype}.\nTarget Timeline: ${scopeSummary.timeline}\nTarget Modules: ${scopeSummary.modules.join(', ')}\nEstimated Bracket: ${scopeSummary.budgetEstimate}.\n\nLet's discuss architecture feasibility and a potential kickoff window.`,
      scopeSummary.budgetEstimate.includes('15') ? '$15k – $30k' : '$5k – $15k'
    );
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      isLight
        ? 'bg-[#F7F8FC] text-[#11172A] selection:bg-[#7025E8]/20 selection:text-[#11172A]'
        : 'bg-[#080D18] text-[#F6F7FF] selection:bg-[#7025E8]/40 selection:text-white'
    }`}>
      {/* 3-Zone Top Bar Navigation */}
      <Header
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenContact={() => handleOpenContact('SaaS Platform')}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <>
            <HeroSection
              onDiscussProject={() => handleOpenContact('SaaS Platform')}
              onExploreWork={() => {
                const workElem = document.getElementById('work');
                if (workElem) {
                  workElem.scrollIntoView({ behavior: 'smooth' });
                } else {
                  handleNavigate('work');
                }
              }}
            />
            <CredibilityStrip />
            <SelectedWorkSection
              onOpenCaseStudy={(project) => setSelectedProject(project)}
            />
            <ServicesSection
              onOpenServiceDetail={(service) => setSelectedService(service)}
              onOpenContact={() => handleOpenContact('Custom Software')}
            />
            {/* High-Converting Scope & Cost Estimator */}
            <ScopeEstimator onApplyScopeToInquiry={handleApplyScope} />
            <ApproachSection />
            <EngineeringPillarsSection />
            <AboutSection
              onOpenContact={() => handleOpenContact('Collaboration Inquiry')}
            />
            <InsightsSection
              onOpenArticle={(article) => setSelectedArticle(article)}
            />
            <FinalCtaSection
              onOpenContact={() => handleOpenContact('SaaS Platform')}
              onOpenScheduler={() => handleOpenContact('Discovery Call')}
            />
          </>
        )}

        {/* Dedicated /work Page View */}
        {currentRoute === 'work' && (
          <div className="pt-32 pb-24 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`pb-10 border-b space-y-3 ${isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]'}`}>
              <button
                onClick={() => handleNavigate('home')}
                className={`inline-flex items-center gap-1.5 text-xs transition-colors mb-2 ${
                  isLight ? 'text-[#2364F5] hover:text-[#08C9F5]' : 'text-[#08C9F5] hover:text-[#7BE5FF]'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Overview
              </button>
              <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
                isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
              }`}>
                Selected Work & Systems Architecture
              </h1>
              <p className={`text-base max-w-2xl leading-relaxed ${
                isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'
              }`}>
                Detailed breakdowns of production SaaS applications, AI document extraction pipelines,
                and custom operational business software engineered for scale.
              </p>
            </div>
            <SelectedWorkSection
              onOpenCaseStudy={(project) => setSelectedProject(project)}
              showAllInitially={true}
            />
            <ScopeEstimator onApplyScopeToInquiry={handleApplyScope} />
          </div>
        )}

        {/* Dedicated /services Page View */}
        {currentRoute === 'services' && (
          <div className="pt-32 pb-24 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`pb-10 border-b space-y-3 ${isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]'}`}>
              <button
                onClick={() => handleNavigate('home')}
                className={`inline-flex items-center gap-1.5 text-xs transition-colors mb-2 ${
                  isLight ? 'text-[#2364F5] hover:text-[#08C9F5]' : 'text-[#08C9F5] hover:text-[#7BE5FF]'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Overview
              </button>
              <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
                isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
              }`}>
                Software Development Services
              </h1>
              <p className={`text-base max-w-2xl leading-relaxed ${
                isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'
              }`}>
                End-to-end technical partnerships tailored for founders: from initial architecture scoping
                and MVP build to complex third-party integrations and cloud deployment.
              </p>
            </div>
            <ServicesSection
              onOpenServiceDetail={(service) => setSelectedService(service)}
              onOpenContact={() => handleOpenContact('Custom Software')}
            />
            <ScopeEstimator onApplyScopeToInquiry={handleApplyScope} />
            <ApproachSection />
          </div>
        )}

        {/* Dedicated /about Page View */}
        {currentRoute === 'about' && (
          <div className="pt-32 pb-24 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`pb-10 border-b space-y-3 ${isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]'}`}>
              <button
                onClick={() => handleNavigate('home')}
                className={`inline-flex items-center gap-1.5 text-xs transition-colors mb-2 ${
                  isLight ? 'text-[#2364F5] hover:text-[#08C9F5]' : 'text-[#08C9F5] hover:text-[#7BE5FF]'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Overview
              </button>
              <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
                isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
              }`}>
                About Jannatul & Innosight
              </h1>
              <p className={`text-base max-w-2xl leading-relaxed ${
                isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'
              }`}>
                Background, development philosophy, verified credentials, and technical capabilities
                of your dedicated software development partner.
              </p>
            </div>
            <CredibilityStrip />
            <AboutSection
              onOpenContact={() => handleOpenContact('Collaboration Inquiry')}
            />
            <EngineeringPillarsSection />
          </div>
        )}

        {/* Dedicated /insights Page View */}
        {currentRoute === 'insights' && (
          <div className="pt-32 pb-24 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`pb-10 border-b space-y-3 ${isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]'}`}>
              <button
                onClick={() => handleNavigate('home')}
                className={`inline-flex items-center gap-1.5 text-xs transition-colors mb-2 ${
                  isLight ? 'text-[#2364F5] hover:text-[#08C9F5]' : 'text-[#08C9F5] hover:text-[#7BE5FF]'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Overview
              </button>
              <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
                isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
              }`}>
                Founder Insights & Technical Notes
              </h1>
              <p className={`text-base max-w-2xl leading-relaxed ${
                isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'
              }`}>
                Practical, actionable advice on MVP scoping, avoiding technical debt, and implementing
                grounded AI architectures without wasting founder runway.
              </p>
            </div>
            <InsightsSection
              onOpenArticle={(article) => setSelectedArticle(article)}
            />
          </div>
        )}

        {/* Dedicated /contact Page View */}
        {currentRoute === 'contact' && (
          <div className="pt-32 pb-24 max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`pb-8 border-b space-y-3 ${isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]'}`}>
              <button
                onClick={() => handleNavigate('home')}
                className={`inline-flex items-center gap-1.5 text-xs transition-colors mb-2 ${
                  isLight ? 'text-[#2364F5] hover:text-[#08C9F5]' : 'text-[#08C9F5] hover:text-[#7BE5FF]'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Overview
              </button>
              <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
                isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
              }`}>
                Project Inquiry Desk
              </h1>
              <p className={`text-base max-w-xl leading-relaxed ${
                isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'
              }`}>
                Have a new product idea, an existing codebase to modernize, or an AI workflow to build?
                Let’s talk through your goals and find the smartest path forward.
              </p>
            </div>
            <div className={`mt-8 p-6 sm:p-10 rounded-2xl border transition-colors ${
              isLight
                ? 'bg-white border-[#E4E7F0] shadow-xl'
                : 'bg-[#0E1627] border-[#1E293B] shadow-2xl'
            }`}>
              <ContactForm
                initialProjectType={contactProjectType}
                initialMessage={contactInitialMessage}
                initialBudget={contactInitialBudget}
                onSuccessClose={() => handleNavigate('home')}
              />
            </div>
          </div>
        )}
      </main>

      {/* Global Interactive Modals */}
      {/* 1. Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onDiscussProject={() => {
          const cat = selectedProject ? selectedProject.category : 'SaaS Platform';
          const title = selectedProject ? selectedProject.title : 'Selected Project';
          setSelectedProject(null);
          handleOpenContact(
            cat,
            `Hello Jannatul,\n\nI reviewed your case study on "${title}" and I'm looking to build something with similar architectural requirements.\n\nCould we discuss scope, timelines, and next steps?`
          );
        }}
      />

      {/* 2. Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        onDiscussProject={() => {
          const sTitle = selectedService ? selectedService.title : 'Custom Software';
          setSelectedService(null);
          handleOpenContact(
            sTitle,
            `Hello Jannatul,\n\nI'm interested in your "${sTitle}" offering. I'd like to explore how we could collaborate on our upcoming milestone.`
          );
        }}
      />

      {/* 3. Article Reader Modal */}
      <ArticleModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onDiscussTopic={() => {
          const aTitle = selectedArticle ? selectedArticle.title : 'Engineering Architecture';
          setSelectedArticle(null);
          handleOpenContact(
            'Technical Advisory',
            `Hello Jannatul,\n\nI read your article "${aTitle}" and had a question regarding our startup's technical decisions.`
          );
        }}
      />

      {/* 4. Contact Modal */}
      <InteractiveModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        maxWidth="max-w-2xl"
      >
        <ContactForm
          initialProjectType={contactProjectType}
          initialMessage={contactInitialMessage}
          initialBudget={contactInitialBudget}
          onSuccessClose={() => setIsContactModalOpen(false)}
        />
      </InteractiveModal>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenContact={() => handleOpenContact('General Project Inquiry')}
      />
    </div>
  );
}
