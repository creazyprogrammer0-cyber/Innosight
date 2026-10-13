import React, { useState } from 'react';
import { cmsClient } from '../../services/cmsClient';
import { InnosightLogo } from '../brand/InnosightLogo';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (user: any) => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToSite }) => {
  const [email, setEmail] = useState('admin@innosight.dev');
  const [password, setPassword] = useState('Innosight2026!');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await cmsClient.login(email, password);
      if (result.success) {
        onLoginSuccess(result.user);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] bg-gradient-to-tr from-[#7025E8]/20 to-[#08C9F5]/15 blur-[120px] pointer-events-none rounded-full" />

      {/* Card Container */}
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <InnosightLogo size="lg" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
            CMS Admin Portal
            <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-[#7025E8]/20 border border-[#7025E8]/40 text-[#A855F7]">
              Secure
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Production content management and architecture controller
          </p>
        </div>

        <div className="bg-[#0E1526]/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-7 shadow-2xl relative">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@innosight.dev"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#090D1A] border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#7025E8] focus:ring-1 focus:ring-[#7025E8] transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Master Password
                </label>
                <span className="text-[11px] text-slate-500">Protected session</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#090D1A] border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#7025E8] focus:ring-1 focus:ring-[#7025E8] transition-all"
                />
              </div>
            </div>

            {/* Quick Demo Credentials Helper */}
            <div className="p-3 bg-[#7025E8]/10 border border-[#7025E8]/25 rounded-xl text-[11px] text-purple-200">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#08C9F5]" />
                  <span>Initial Admin Credentials</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('admin@innosight.dev');
                    setPassword('Innosight2026!');
                    setError(null);
                  }}
                  className="text-[10px] text-[#08C9F5] hover:underline cursor-pointer font-semibold"
                >
                  Auto-fill Admin
                </button>
              </div>
              <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
                <span>admin@innosight.dev</span>
                <span className="text-purple-300">Innosight2026!</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-[#7025E8] to-[#9333EA] hover:from-[#6019D0] hover:to-[#7E22CE] text-white font-medium text-sm rounded-xl shadow-lg shadow-[#7025E8]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800 text-center flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={onBackToSite}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ← Return to public website
            </button>
            <div className="flex items-center gap-1 text-slate-500 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>HttpOnly Session</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-[11px] text-slate-500">
          Innosight Production CMS • Row-level isolation & cryptographic authentication
        </div>
      </div>
    </div>
  );
};
