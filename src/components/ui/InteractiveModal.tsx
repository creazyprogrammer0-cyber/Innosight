import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface InteractiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'max-w-2xl' | 'max-w-3xl' | 'max-w-4xl' | 'max-w-5xl';
}

export const InteractiveModal: React.FC<InteractiveModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-4xl',
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 backdrop-blur-md transition-opacity ${
          isLight ? 'bg-slate-900/40' : 'bg-[#080D18]/85'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        className={`relative w-full ${maxWidth} rounded-2xl shadow-2xl z-10 max-h-[90vh] flex flex-col overflow-hidden my-auto border transition-colors ${
          isLight
            ? 'bg-white border-[#E4E7F0] text-[#11172A]'
            : 'bg-[#0E1627] border-[#1E293B] text-[#F6F7FF]'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b shrink-0 ${
            isLight
              ? 'border-[#E4E7F0] bg-white/95'
              : 'border-[#1E293B] bg-[#0E1627]/90'
          }`}
        >
          <div className="flex items-center gap-3">
            {title && (
              <h2
                id="modal-title"
                className={`text-lg font-bold tracking-tight ${
                  isLight ? 'text-[#11172A]' : 'text-[#F6F7FF]'
                }`}
              >
                {title}
              </h2>
            )}
          </div>
          <button
            onClick={onClose}
            className={`p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#7025E8] ${
              isLight
                ? 'text-[#64748B] hover:text-[#11172A] hover:bg-slate-100'
                : 'text-[#A8B3C9] hover:text-white hover:bg-[#1E293B]'
            }`}
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div
          className={`p-6 sm:p-8 overflow-y-auto leading-relaxed ${
            isLight ? 'text-[#334155]' : 'text-[#A8B3C9]'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
