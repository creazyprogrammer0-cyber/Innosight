import React, { useState } from 'react';
import { InnosightLogo } from '../brand/InnosightLogo';
import { OverviewView } from './OverviewView';
import { HomepageEditorView } from './HomepageEditorView';
import { ProjectsManagerView } from './ProjectsManagerView';
import { ServicesManagerView } from './ServicesManagerView';
import { ArticlesManagerView } from './ArticlesManagerView';
import { TestimonialsManagerView } from './TestimonialsManagerView';
import { MediaLibraryView } from './MediaLibraryView';
import { SiteSettingsView } from './SiteSettingsView';
import { AuditLogsView } from './AuditLogsView';
import { cmsClient } from '../../services/cmsClient';
import {
  LayoutDashboard,
  LayoutTemplate,
  FolderKanban,
  Briefcase,
  FileText,
  Quote,
  Image as ImageIcon,
  Settings,
  ShieldCheck,
  LogOut,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  User,
} from 'lucide-react';

interface AdminDashboardProps {
  currentUser: { id: string; email: string; role: string };
  onLogout: () => void;
  onViewLiveSite: () => void;
}

export type AdminTab =
  | 'overview'
  | 'homepage'
  | 'projects'
  | 'services'
  | 'articles'
  | 'testimonials'
  | 'media'
  | 'settings'
  | 'audit';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  onLogout,
  onViewLiveSite,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await cmsClient.logout();
    } finally {
      onLogout();
    }
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'homepage', label: 'Homepage Editor', icon: LayoutTemplate },
    { id: 'projects', label: 'Projects & Work', icon: FolderKanban },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'articles', label: 'Articles & Notes', icon: FileText },
    { id: 'testimonials', label: 'Testimonials', icon: Quote },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'settings', label: 'Site Settings', icon: Settings },
    { id: 'audit', label: 'Audit Trail', icon: ShieldCheck },
  ];

  const currentTabLabel = navItems.find((n) => n.id === activeTab)?.label || 'Overview';

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-64 bg-[#0A0F1D] text-slate-300 flex-col shrink-0 border-r border-slate-800/80">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <InnosightLogo size="sm" />
            <div>
              <div className="text-white font-bold text-xs tracking-tight">Innosight CMS</div>
              <div className="text-[10px] text-slate-400 font-mono">v2.4 Production</div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as AdminTab)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#7025E8] to-[#8B5CF6] text-white shadow-md shadow-[#7025E8]/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-850/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-[#070B14]/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-full bg-[#7025E8]/20 border border-[#7025E8]/40 text-[#A855F7] flex items-center justify-center shrink-0">
                <User className="w-3.5 h-3.5" />
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-medium text-white truncate">{currentUser.email}</div>
                <div className="text-[10px] text-slate-400 font-mono capitalize">{currentUser.role}</div>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Dashboard</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-slate-900 font-bold">{currentTabLabel}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200" title="Changes persist across your browser and sync with the public portfolio">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{cmsClient.getStorageMode() === 'client' ? 'Client Storage Active' : 'API Server Connected'}</span>
            </div>

            <button
              onClick={onViewLiveSite}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all cursor-pointer"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm flex">
            <div className="w-64 bg-[#0A0F1D] text-slate-300 flex flex-col h-full">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <InnosightLogo size="sm" />
                <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as AdminTab);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
                        isActive ? 'bg-[#7025E8] text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* Workspace Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && <OverviewView onNavigateTab={(t) => setActiveTab(t as AdminTab)} />}
          {activeTab === 'homepage' && <HomepageEditorView />}
          {activeTab === 'projects' && <ProjectsManagerView />}
          {activeTab === 'services' && <ServicesManagerView />}
          {activeTab === 'articles' && <ArticlesManagerView />}
          {activeTab === 'testimonials' && <TestimonialsManagerView />}
          {activeTab === 'media' && <MediaLibraryView />}
          {activeTab === 'settings' && <SiteSettingsView />}
          {activeTab === 'audit' && <AuditLogsView />}
        </main>
      </div>
    </div>
  );
};
