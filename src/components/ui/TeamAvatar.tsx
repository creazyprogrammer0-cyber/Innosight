import React, { useState } from 'react';

interface TeamAvatarProps {
  name: string;
  avatar: string;
  avatarFallbacks?: string[];
  fallbackInitials: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLead?: boolean;
  className?: string;
}

export const TeamAvatar: React.FC<TeamAvatarProps> = ({
  name,
  avatar,
  avatarFallbacks = [],
  fallbackInitials,
  size = 'md',
  isLead = false,
  className = '',
}) => {
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  // Combine primary avatar with fallback options
  const sources = [avatar, ...avatarFallbacks].filter(Boolean);

  const handleImageError = () => {
    if (currentSourceIndex < sources.length - 1) {
      setCurrentSourceIndex((prev) => prev + 1);
    } else {
      setAllFailed(true);
    }
  };

  // Dimension classes
  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-16 h-16 text-sm',
    lg: 'w-24 h-24 text-lg',
    xl: 'w-32 h-32 sm:w-36 sm:h-36 text-xl sm:text-2xl',
  };

  const currentSrc = sources[currentSourceIndex] || avatar;

  return (
    <div
      className={`relative rounded-2xl overflow-hidden shrink-0 flex items-center justify-center font-bold tracking-wider select-none ${
        sizeClasses[size]
      } ${
        isLead
          ? 'ring-2 ring-[#08C9F5] shadow-lg shadow-[#08C9F5]/10'
          : 'ring-1 ring-[#1E293B] shadow-md shadow-black/20'
      } ${className}`}
    >
      {!allFailed ? (
        <img
          src={currentSrc}
          alt={name}
          referrerPolicy="no-referrer"
          onError={handleImageError}
          className="w-full h-full object-cover object-top transition-all duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#131E33] via-[#0E1627] to-[#080D18] text-[#08C9F5] border border-[#1E293B]">
          <span className="font-mono font-bold tracking-widest">{fallbackInitials}</span>
        </div>
      )}

      {/* Decorative subtle border overlay */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
    </div>
  );
};
