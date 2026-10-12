import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { InnosightLogo } from '../brand/InnosightLogo';
import { ViewRoute } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  currentRoute: ViewRoute;
  onNavigate: (route: ViewRoute) => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  onOpenContact,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; route: ViewRoute }[] = [
    { label: 'Work', route: 'work' },
    { label: 'Services', route: 'services' },
    { label: 'About', route: 'about' },
    { label: 'Insights', route: 'insights' },
    { label: 'Contact', route: 'contact' },
  ];

  const handleNavClick = (route: ViewRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLight = theme === 'light';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? isLight
              ? 'bg-[#F7F8FC]/90 backdrop-blur-md border-b border-[#E4E7F0] py-3 shadow-md shadow-slate-200/50'
              : 'bg-[#080D18]/90 backdrop-blur-md border-b border-[#1E293B]/70 py-3 shadow-lg shadow-black/20'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar Contract: Zone 1 (Brand) — Zone 2 (4-5 Nav Links) — Zone 3 (1 Primary Action + Theme Toggle) */}
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand Wordmark (Theme-aware Innosight Logo) */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7025E8] rounded-md transition-opacity hover:opacity-95"
              aria-label="Innosight Home"
            >
              <InnosightLogo variant={isLight ? 'light' : 'dark'} size="sm" showTagline={false} />
            </button>

            {/* Zone 2: 4–5 single-line clean text links with subtle active states */}
            <nav className={`hidden md:flex items-center gap-7 text-sm font-medium ${
              isLight ? 'text-[#4B5565]' : 'text-[#A8B3C9]'
            }`}>
              {navItems.map((item) => {
                const isActive = currentRoute === item.route;
                return (
                  <button
                    key={item.route}
                    onClick={() => handleNavClick(item.route)}
                    className={`whitespace-nowrap shrink-0 transition-colors py-1 relative hover:text-white ${
                      isLight
                        ? isActive
                          ? 'text-[#11172A] font-bold'
                          : 'text-[#4B5565] hover:text-[#11172A]'
                        : isActive
                          ? 'text-white font-semibold'
                          : 'text-[#A8B3C9] hover:text-white'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#08C9F5] via-[#7025E8] to-[#E000C9] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Actions (Theme Toggle + Primary CTA) */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`px-3 py-2 min-h-[44px] flex items-center gap-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  isLight
                    ? 'bg-white border-[#E4E7F0] text-[#11172A] hover:bg-slate-100 shadow-sm'
                    : 'bg-[#0E1627] border-[#1E293B] text-[#A8B3C9] hover:text-white hover:bg-[#131E33]'
                }`}
                aria-label={`Switch to ${isLight ? 'dark' : 'white'} theme`}
                title={`Switch to ${isLight ? 'dark' : 'white'} theme`}
              >
                {isLight ? (
                  <>
                    <Moon className="w-4 h-4 text-[#7025E8]" />
                    <span className="hidden xl:inline text-[11px] font-mono font-medium text-[#4B5565]">Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4 text-amber-300" />
                    <span className="hidden xl:inline text-[11px] font-mono font-medium text-[#A8B3C9]">White Theme</span>
                  </>
                )}
              </button>

              {/* Primary Action Button */}
              <button
                onClick={onOpenContact}
                className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-[#2364F5] to-[#7025E8] hover:from-[#08C9F5] hover:to-[#2364F5] rounded-xl transition-all duration-200 shadow-sm hover:shadow-[0_0_15px_rgba(112,37,232,0.35)] whitespace-nowrap shrink-0 group`}
              >
                <span>Book Scoping Call</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {/* Mobile hamburger button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#7025E8] ${
                  isLight
                    ? 'text-[#11172A] hover:bg-slate-100'
                    : 'text-[#A8B3C9] hover:text-white hover:bg-[#131E33]'
                }`}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className={`fixed inset-0 backdrop-blur-md ${
              isLight ? 'bg-slate-900/40' : 'bg-[#080D18]/90'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div
            className={`fixed top-[65px] left-0 right-0 p-6 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-top duration-200 border-b ${
              isLight
                ? 'bg-white border-[#E4E7F0] text-[#11172A]'
                : 'bg-[#0E1627] border-[#1E293B] text-white'
            }`}
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`text-left px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                    currentRoute === item.route
                      ? isLight
                        ? 'bg-slate-100 text-[#11172A] font-bold'
                        : 'bg-[#131E33] text-white font-semibold'
                      : isLight
                        ? 'text-[#4B5565] hover:text-[#11172A] hover:bg-slate-50'
                        : 'text-[#A8B3C9] hover:text-white hover:bg-[#131E33]/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className={`pt-3 border-t flex items-center justify-between gap-3 ${
              isLight ? 'border-[#E4E7F0]' : 'border-[#1E293B]'
            }`}>
              <button
                onClick={toggleTheme}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold border ${
                  isLight
                    ? 'bg-slate-100 border-[#E4E7F0] text-[#11172A]'
                    : 'bg-[#131E33] border-[#1E293B] text-[#A8B3C9]'
                }`}
              >
                {isLight ? (
                  <>
                    <Moon className="w-4 h-4 text-[#7025E8]" />
                    <span>Dark theme</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4 text-amber-300" />
                    <span>White theme</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-gradient-to-r from-[#2364F5] to-[#7025E8] rounded-xl shadow-lg shadow-[#7025E8]/20"
              >
                <span>Book Scoping Call</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
