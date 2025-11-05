import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const SIZES = {
  sm: { width: 120, height: 80, fontSize: '48px', subFontSize: '16px' },
  md: { width: 180, height: 120, fontSize: '72px', subFontSize: '24px' },
  lg: { width: 240, height: 160, fontSize: '96px', subFontSize: '32px' },
  xl: { width: 300, height: 200, fontSize: '120px', subFontSize: '40px' },
} as const;

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md'
}) => {
  const { width, height, fontSize, subFontSize } = SIZES[size];
  const uniqueId = React.useId();

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Logo Projeto 45 Graus"
    >
      <defs>
        <linearGradient
          id={`goldGradient-${uniqueId}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#f4d03f" />
        </linearGradient>

        <filter id={`goldGlow-${uniqueId}`}>
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient
          id={`metallicGold-${uniqueId}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#f4d03f" stopOpacity="1" />
          <stop offset="50%" stopColor="#d4af37" stopOpacity="1" />
          <stop offset="100%" stopColor="#aa8a2e" stopOpacity="1" />
        </linearGradient>
      </defs>

      <g transform={`translate(${width * 0.15}, ${height * 0.3})`}>
        <line
          x1="0"
          y1="0"
          x2={width * 0.25}
          y2="0"
          stroke={`url(#goldGradient-${uniqueId})`}
          strokeWidth="3"
          strokeLinecap="round"
          filter={`url(#goldGlow-${uniqueId})`}
        />
        <line
          x1={width * 0.25}
          y1="0"
          x2={width * 0.25}
          y2={-width * 0.25}
          stroke={`url(#goldGradient-${uniqueId})`}
          strokeWidth="3"
          strokeLinecap="round"
          filter={`url(#goldGlow-${uniqueId})`}
        />
        <path
          d={`M ${width * 0.2} 0 A ${width * 0.05} ${width * 0.05} 0 0 1 ${width * 0.25} ${-width * 0.05}`}
          stroke={`url(#goldGradient-${uniqueId})`}
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
      </g>

      <text
        x={width / 2}
        y={height * 0.5}
        textAnchor="middle"
        fill={`url(#metallicGold-${uniqueId})`}
        fontFamily="'Bebas Neue', sans-serif"
        fontSize={fontSize}
        fontWeight="700"
        letterSpacing="0.05em"
        filter={`url(#goldGlow-${uniqueId})`}
      >
        45°
      </text>

      <text
        x={width / 2}
        y={height * 0.8}
        textAnchor="middle"
        fill={`url(#goldGradient-${uniqueId})`}
        fontFamily="'Bebas Neue', sans-serif"
        fontSize={subFontSize}
        fontWeight="400"
        letterSpacing="0.3em"
        opacity="0.9"
      >
        GRAUS
      </text>

      <line
        x1={width * 0.3}
        y1={height * 0.85}
        x2={width * 0.7}
        y2={height * 0.85}
        stroke={`url(#goldGradient-${uniqueId})`}
        strokeWidth="1"
        opacity="0.6"
      />
    </svg>
  );
};
