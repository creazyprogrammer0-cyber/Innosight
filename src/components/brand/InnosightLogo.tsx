import React from 'react';

interface InnosightLogoProps {
  variant?: 'dark' | 'light';
  markOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
}

export const InnosightLogo: React.FC<InnosightLogoProps> = ({
  variant = 'dark',
  markOnly = false,
  size = 'md',
  className = '',
  showTagline = true,
}) => {
  // Dimensions map
  const sizeMap = {
    sm: { icon: 32, lockupH: 34, textScale: 'scale-75' },
    md: { icon: 42, lockupH: 44, textScale: 'scale-90' },
    lg: { icon: 56, lockupH: 58, textScale: 'scale-100' },
    xl: { icon: 72, lockupH: 76, textScale: 'scale-125' },
  };

  const { icon } = sizeMap[size];
  const isDark = variant === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#0B132B';
  const subtextColor = isDark ? '#9AA8C7' : '#4B5565';

  return (
    <div
      className={`inline-flex items-center gap-3 select-none ${className}`}
      aria-label="Innosight — Innovate • Insight • Impact"
    >
      {/* Visual Symbol: 3 stylized rising ribbon waves + luminous sphere */}
      <div className="relative shrink-0 flex items-center justify-center" style={{ width: icon, height: icon }}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Left Ribbon Gradient */}
            <linearGradient id="ribbonLeftGrad" x1="15%" y1="90%" x2="45%" y2="20%">
              <stop offset="0%" stopColor="#2364F5" />
              <stop offset="60%" stopColor="#7025E8" />
              <stop offset="100%" stopColor="#08C9F5" />
            </linearGradient>

            {/* Center Ribbon Gradient */}
            <linearGradient id="ribbonCenterGrad" x1="25%" y1="95%" x2="65%" y2="10%">
              <stop offset="0%" stopColor="#1B4BD8" />
              <stop offset="40%" stopColor="#2563EB" />
              <stop offset="70%" stopColor="#08C9F5" />
              <stop offset="100%" stopColor="#7BE5FF" />
            </linearGradient>

            {/* Right Ribbon Gradient */}
            <linearGradient id="ribbonRightGrad" x1="40%" y1="95%" x2="85%" y2="15%">
              <stop offset="0%" stopColor="#4A148C" />
              <stop offset="35%" stopColor="#7025E8" />
              <stop offset="75%" stopColor="#D9039E" />
              <stop offset="100%" stopColor="#F72585" />
            </linearGradient>

            {/* Sphere Radial Glow */}
            <radialGradient id="sphereRadial" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#FF77E9" />
              <stop offset="70%" stopColor="#B5179E" />
              <stop offset="100%" stopColor="#7025E8" />
            </radialGradient>

            {/* Glow Filter */}
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Ribbon 1: Left Wing / Wave */}
          <path
            d="M22 75 C18 68, 20 58, 36 50 C32 60, 29 70, 24 76 Z"
            fill="url(#ribbonLeftGrad)"
            opacity="0.95"
          />
          <path
            d="M24 73 C26 62, 33 53, 36 50 C33 58, 28 66, 24 73 Z"
            fill="#08C9F5"
            opacity="0.7"
          />

          {/* Ribbon 2: Center Wave (Main Swoop) */}
          <path
            d="M25 76 C36 76, 45 68, 48 55 C51 40, 52 35, 60 36 C55 45, 52 56, 47 67 C42 74, 33 77, 25 76 Z"
            fill="url(#ribbonCenterGrad)"
            filter="url(#softGlow)"
          />
          {/* Specular crest line on center wave */}
          <path
            d="M34 74 C42 70, 48 58, 51 45 C54 38, 57 37, 59 36"
            stroke="#C0F3FF"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Ribbon 3: Right Wave (Magenta Apex) */}
          <path
            d="M45 76 C55 76, 64 68, 68 55 C72 40, 71 36, 71 36 C71 46, 70 56, 67 66 C63 73, 54 77, 45 76 Z"
            fill="url(#ribbonRightGrad)"
            filter="url(#softGlow)"
          />
          {/* Specular edge on right wave */}
          <path
            d="M55 73 C62 67, 67 56, 69 46 C70 40, 71 36, 71 36"
            stroke="#FFB6F4"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Floating Luminous Sphere at Top */}
          <circle
            cx="65"
            cy="24"
            r="8.5"
            fill="url(#sphereRadial)"
            filter="url(#softGlow)"
          />
          {/* Sphere specular highlight point */}
          <circle cx="62.5" cy="21.5" r="2.2" fill="#FFFFFF" opacity="0.95" />
          {/* Starburst light ray on sphere */}
          <path
            d="M65 11 L65 17 M65 31 L65 37 M52 24 L58 24 M72 24 L78 24"
            stroke="#FFC6F9"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Brand Lockup: INNOSIGHT + TAGLINE */}
      {!markOnly && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center tracking-[0.16em] font-extrabold text-[1.125rem]">
            <span style={{ color: textColor }}>INN</span>
            {/* Stylized Glowing Magenta "O" Ring */}
            <span className="inline-flex items-center justify-center relative mx-[1.5px] w-[14px] h-[14px]">
              <span className="absolute inset-0 rounded-full border-[2.6px] border-[#E000C9] shadow-[0_0_8px_rgba(224,0,201,0.7)]" />
              <span className="w-[3px] h-[3px] rounded-full bg-white opacity-80" />
            </span>
            <span style={{ color: textColor }}>SIGHT</span>
          </div>

          {showTagline && (
            <div
              className="text-[0.55rem] tracking-[0.24em] font-semibold mt-[3.5px] uppercase flex items-center gap-[5px]"
              style={{ color: subtextColor }}
            >
              <span>INNOVATE</span>
              <span className="w-[3px] h-[3px] rounded-full bg-[#E000C9]" />
              <span>INSIGHT</span>
              <span className="w-[3px] h-[3px] rounded-full bg-[#08C9F5]" />
              <span>IMPACT</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
