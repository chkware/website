import React from 'react';

interface AutomationSpeedSVGProps {
  className?: string;
  width?: number;
  height?: number;
}

export const AutomationSpeedSVG: React.FC<AutomationSpeedSVGProps> = ({
  className = "",
  width = 500,
  height = 250
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 500 250"
      className={className}
      style={{
        '--background-color': 'transparent',
        '--primary-color': '#3b82f6',
        '--secondary-color': '#94a3b8',
        '--accent-color': '#06b6d4',
        '--foreground-color': '#1e293b',
      } as React.CSSProperties}
    >
      <defs>
        {/* Arrowhead marker for fast lines */}
        <marker
          id="arrowhead-fast"
          markerWidth="12"
          markerHeight="8"
          refX="11"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon
            points="0 0, 12 4, 0 8"
            fill="var(--accent-color)"
          />
        </marker>

        {/* Gradient for the processor chip */}
        <linearGradient id="chipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.9" />
          <stop offset="50%" stopColor="var(--primary-color)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--accent-color)" stopOpacity="0.8" />
        </linearGradient>

        {/* Animation styles */}
        <style>
          {`
            .slow-line {
              stroke-dasharray: 12,6;
              animation: dash-slow 4s linear infinite;
            }
            
            .fast-lines {
              animation: pulse-fast 2.5s ease-in-out infinite;
            }
            
            .chip-glow {
              animation: glow 3s ease-in-out infinite;
            }
            
            @keyframes dash-slow {
              to {
                stroke-dashoffset: -36;
              }
            }
            
            @keyframes pulse-fast {
              0%, 100% {
                opacity: 0.9;
                stroke-width: 3;
              }
              50% {
                opacity: 1;
                stroke-width: 3.5;
              }
            }
            
            @keyframes glow {
              0%, 100% {
                filter: drop-shadow(0 0 8px var(--primary-color));
              }
              50% {
                filter: drop-shadow(0 0 16px var(--accent-color));
              }
            }
          `}
        </style>
      </defs>

      {/* Left side: Single slow, jagged line */}
      <g>
        <path
          d="M 30 125 Q 70 105, 90 125 Q 110 145, 130 125 Q 150 105, 170 125"
          fill="none"
          stroke="var(--secondary-color)"
          strokeWidth="4"
          className="slow-line"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Slow process label */}
        <text
          x="100"
          y="170"
          textAnchor="middle"
          fontSize="14"
          fill="var(--secondary-color)"
          fontWeight="500"
        >
          Single Process
        </text>
        <text
          x="100"
          y="185"
          textAnchor="middle"
          fontSize="12"
          fill="var(--secondary-color)"
          opacity="0.7"
        >
          Slow & Sequential
        </text>
      </g>

      {/* Center: Sleek processor chip */}
      <g className="chip-glow">
        {/* Main chip body */}
        <rect
          x="225"
          y="100"
          width="50"
          height="50"
          rx="8"
          ry="8"
          fill="url(#chipGradient)"
          stroke="var(--primary-color)"
          strokeWidth="2"
        />

        {/* Chip pins/connectors */}
        {/* Left pins */}
        {[110, 125, 140].map((y, index) => (
          <rect
            key={`left-${index}`}
            x="215"
            y={y}
            width="10"
            height="4"
            fill="var(--primary-color)"
          />
        ))}

        {/* Right pins */}
        {[110, 125, 140].map((y, index) => (
          <rect
            key={`right-${index}`}
            x="275"
            y={y}
            width="10"
            height="4"
            fill="var(--primary-color)"
          />
        ))}

        {/* Circuit pattern inside chip */}
        <g opacity="0.6">
          <line x1="235" y1="115" x2="265" y2="115" stroke="var(--accent-color)" strokeWidth="1" />
          <line x1="235" y1="125" x2="265" y2="125" stroke="var(--accent-color)" strokeWidth="1" />
          <line x1="235" y1="135" x2="265" y2="135" stroke="var(--accent-color)" strokeWidth="1" />
          <line x1="245" y1="110" x2="245" y2="140" stroke="var(--accent-color)" strokeWidth="1" />
          <line x1="255" y1="110" x2="255" y2="140" stroke="var(--accent-color)" strokeWidth="1" />
        </g>

        {/* Center processing indicator */}
        <circle
          cx="250"
          cy="125"
          r="6"
          fill="var(--accent-color)"
          opacity="0.8"
        />
      </g>

      {/* Right side: Four perfectly straight, parallel fast lines */}
      <g className="fast-lines">
        {[105, 120, 130, 145].map((y, index) => (
          <line
            key={index}
            x1="300"
            y1={y}
            x2="450"
            y2={y}
            stroke="var(--primary-color)"
            strokeWidth="3"
            markerEnd="url(#arrowhead-fast)"
            strokeLinecap="round"
          />
        ))}

        {/* Parallel processing label */}
        <text
          x="375"
          y="175"
          textAnchor="middle"
          fontSize="14"
          fill="var(--primary-color)"
          fontWeight="600"
        >
          Parallel Processing
        </text>
        <text
          x="375"
          y="190"
          textAnchor="middle"
          fontSize="12"
          fill="var(--primary-color)"
          opacity="0.8"
        >
          4x Faster Execution
        </text>
      </g>

      {/* Transformation indicators */}
      <g opacity="0.8">
        {/* Speed indicator - Before */}
        <circle cx="100" cy="80" r="4" fill="var(--secondary-color)" />
        <text x="110" y="85" fontSize="12" fill="var(--secondary-color)" fontWeight="500">1x Speed</text>

        {/* Speed indicator - After */}
        <circle cx="375" cy="80" r="4" fill="var(--accent-color)" />
        <text x="385" y="85" fontSize="12" fill="var(--accent-color)" fontWeight="600">4x Speed</text>
      </g>

      {/* Subtle transformation arrow */}
      <g opacity="0.5">
        <path
          d="M 190 125 Q 210 115, 225 125"
          fill="none"
          stroke="var(--accent-color)"
          strokeWidth="2"
          strokeDasharray="3,3"
          markerEnd="url(#arrowhead-fast)"
        />
      </g>
    </svg>
  );
};

export default AutomationSpeedSVG;