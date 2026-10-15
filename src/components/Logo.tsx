import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // 'light' for white/light header, 'dark' for dark navy footer
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'light',
  showTagline = true,
  size = 'md',
}) => {
  const isDark = variant === 'dark';

  // Sizing configurations
  const heightMap = {
    sm: 'h-9',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-20',
  };

  const currentHeight = heightMap[size] || 'h-12';

  // Colors based on background variant
  const bluePrimary = isDark ? '#38BDF8' : '#0052CC';
  const blueDark = isDark ? '#0284C7' : '#003D99';
  const blueDecent = isDark ? '#60A5FA' : '#0052CC';
  const orangeAccent = '#FF7A00';
  const orangeLight = '#F59E0B';
  const taglineColor = isDark ? '#38BDF8' : '#0284C7';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 340 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${currentHeight} w-auto`}
        aria-label="Decent School Furniture - Better Study Better Future"
      >
        <defs>
          <linearGradient id={`blueGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A3FF" />
            <stop offset="40%" stopColor="#0066FF" />
            <stop offset="100%" stopColor="#003D99" />
          </linearGradient>
          <linearGradient id={`orangeGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FF5500" />
            <stop offset="60%" stopColor="#FF7A00" />
            <stop offset="100%" stopColor="#FFA000" />
          </linearGradient>
        </defs>

        {/* LEFT EMBLEM: Large "D" with Graduation Cap, Desk/Chair & Swoosh */}
        <g transform="translate(4, 8)">
          {/* Graduation Cap */}
          <g transform="translate(18, 0)">
            <polygon
              points="28,2 54,9 28,17 2,9"
              fill={`url(#blueGrad-${variant})`}
              stroke={isDark ? '#38BDF8' : '#0066FF'}
              strokeWidth="0.8"
            />
            <path
              d="M14,12 Q28,19 42,12 L42,15 Q28,22 14,15 Z"
              fill={blueDark}
            />
            <path
              d="M6,10 L3,17 L3,24"
              stroke={orangeAccent}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="3" cy="18" r="1.4" fill={orangeLight} />
            <path
              d="M1,24 L5,24 L4,30 L2,30 Z"
              fill={orangeAccent}
            />
          </g>

          {/* Main Stylized "D" Body */}
          <path
            d="M 12,18
               L 42,18
               C 68,18 84,34 84,54
               C 84,72 68,88 42,88
               L 12,88
               Z
               M 24,29
               L 41,29
               C 58,29 70,40 70,54
               C 70,68 58,78 41,78
               L 24,78
               Z"
            fill={`url(#blueGrad-${variant})`}
            fillRule="evenodd"
          />

          {/* Inside Desk & Chair Line-Art */}
          <g transform="translate(26, 32)">
            {/* Chair */}
            <path
              d="M 6,10 C 6,7 15,7 15,10 L 15,22 C 15,23 6,23 6,22 Z"
              fill="none"
              stroke={isDark ? '#60A5FA' : '#0066FF'}
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path
              d="M 4,22 L 18,22 L 16,27 L 3,27 Z"
              fill={isDark ? '#1E3A8A' : '#DBEAFE'}
              stroke={isDark ? '#60A5FA' : '#0066FF'}
              strokeWidth="1.8"
            />
            <line x1="5" y1="27" x2="4" y2="40" stroke={isDark ? '#60A5FA' : '#0066FF'} strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="27" x2="18" y2="40" stroke={isDark ? '#60A5FA' : '#0066FF'} strokeWidth="2" strokeLinecap="round" />

            {/* Desk */}
            <polygon
              points="19,16 46,16 43,23 16,23"
              fill={orangeAccent}
              stroke={orangeLight}
              strokeWidth="1.2"
            />
            <rect
              x="18"
              y="23"
              width="24"
              height="7"
              fill={isDark ? '#0F172A' : '#F1F5F9'}
              stroke={isDark ? '#38BDF8' : '#0052CC'}
              strokeWidth="1.6"
              rx="1"
            />
            <line x1="20" y1="30" x2="19" y2="41" stroke={isDark ? '#38BDF8' : '#0052CC'} strokeWidth="2" strokeLinecap="round" />
            <line x1="39" y1="30" x2="41" y2="41" stroke={isDark ? '#38BDF8' : '#0052CC'} strokeWidth="2" strokeLinecap="round" />
            <line x1="17" y1="40" x2="43" y2="40" stroke={isDark ? '#38BDF8' : '#0052CC'} strokeWidth="1.6" strokeLinecap="round" />
          </g>

          {/* Orange Dynamic Swoosh Arc under the "D" */}
          <path
            d="M 0,72
               C 12,88 38,98 84,68
               C 62,88 32,94 14,84
               C 8,80 3,76 0,72 Z"
            fill={`url(#orangeGrad-${variant})`}
          />
        </g>

        {/* RIGHT WORDMARK & TYPOGRAPHY */}
        <g transform="translate(100, 12)">
          {/* "Decent" */}
          <g>
            <text
              x="0"
              y="38"
              fontFamily="Outfit, Plus Jakarta Sans, system-ui, -apple-system, sans-serif"
              fontWeight="900"
              fontSize="44"
              letterSpacing="-0.5"
              fill={blueDecent}
            >
              Decent
            </text>
            <circle cx="166" cy="14" r="5" fill="none" stroke={blueDecent} strokeWidth="1.2" />
            <text
              x="166"
              y="16.8"
              fontFamily="system-ui, sans-serif"
              fontWeight="700"
              fontSize="6"
              textAnchor="middle"
              fill={blueDecent}
            >
              R
            </text>
          </g>

          {/* "School Furniture" */}
          <g transform="translate(0, 60)">
            <text
              x="0"
              y="0"
              fontFamily="Outfit, Plus Jakarta Sans, system-ui, -apple-system, sans-serif"
              fontWeight="800"
              fontSize="23.5"
              letterSpacing="0.2"
            >
              <tspan fill={blueDecent}>School </tspan>
              <tspan fill={orangeAccent}>Furniture</tspan>
            </text>
          </g>

          {/* "BETTER STUDY BETTER FUTURE" */}
          {showTagline && (
            <g transform="translate(0, 75)">
              <line
                x1="0"
                y1="-4"
                x2="15"
                y2="-4"
                stroke={orangeAccent}
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <text
                x="24"
                y="0"
                fontFamily="Plus Jakarta Sans, system-ui, -apple-system, sans-serif"
                fontWeight="800"
                fontSize="8.5"
                letterSpacing="2.2"
                fill={taglineColor}
              >
                BETTER STUDY BETTER FUTURE
              </text>
              <line
                x1="208"
                y1="-4"
                x2="223"
                y2="-4"
                stroke={orangeAccent}
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
