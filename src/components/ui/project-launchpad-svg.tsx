import React from 'react';

interface ProjectLaunchpadSVGProps {
  className?: string;
  width?: number;
  height?: number;
}

export const ProjectLaunchpadSVG: React.FC<ProjectLaunchpadSVGProps> = ({
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
        '--success-color': '#10b981',
      } as React.CSSProperties}
    >
      <defs>
        {/* Gradient for rocket body */}
        <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="1" />
          <stop offset="50%" stopColor="var(--accent-color)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0.8" />
        </linearGradient>

        {/* Gradient for rocket flames */}
        <radialGradient id="flameGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
          <stop offset="50%" stopColor="#f97316" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0.6" />
        </radialGradient>

        {/* Glow effect for energy */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Animation styles */}
        <style>
          {`
            .rocket-body {
              animation: rocket-hover 3s ease-in-out infinite;
            }
            
            .flame-animation {
              animation: flame-flicker 0.5s ease-in-out infinite alternate;
            }
            
            .energy-lines {
              animation: energy-pulse 2s ease-in-out infinite;
            }
            
            .code-structure {
              animation: code-glow 4s ease-in-out infinite;
            }
            
            @keyframes rocket-hover {
              0%, 100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-5px);
              }
            }
            
            @keyframes flame-flicker {
              0% {
                opacity: 0.8;
                transform: scale(1);
              }
              100% {
                opacity: 1;
                transform: scale(1.1);
              }
            }
            
            @keyframes energy-pulse {
              0%, 100% {
                opacity: 0.6;
                stroke-width: 2;
              }
              50% {
                opacity: 1;
                stroke-width: 3;
              }
            }
            
            @keyframes code-glow {
              0%, 100% {
                filter: drop-shadow(0 0 5px var(--accent-color));
              }
              50% {
                filter: drop-shadow(0 0 15px var(--primary-color));
              }
            }
          `}
        </style>
      </defs>

      {/* Background elements - subtle grid */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--secondary-color)" strokeWidth="0.5" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Code-based launchpad structure */}
      <g className="code-structure">
        {/* Left curly brace */}
        <path
          d="M 180 180 Q 170 170, 170 160 L 170 140 Q 170 130, 160 130 Q 170 130, 170 120 L 170 100 Q 170 90, 180 80"
          fill="none"
          stroke="var(--accent-color)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* Right curly brace */}
        <path
          d="M 320 180 Q 330 170, 330 160 L 330 140 Q 330 130, 340 130 Q 330 130, 330 120 L 330 100 Q 330 90, 320 80"
          fill="none"
          stroke="var(--accent-color)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* API endpoint brackets */}
        <g opacity="0.7">
          <path d="M 200 190 L 190 190 L 190 200 L 200 200" fill="none" stroke="var(--primary-color)" strokeWidth="2"/>
          <path d="M 300 190 L 310 190 L 310 200 L 300 200" fill="none" stroke="var(--primary-color)" strokeWidth="2"/>
        </g>
        
        {/* Platform base */}
        <rect
          x="190"
          y="185"
          width="120"
          height="8"
          rx="4"
          fill="var(--secondary-color)"
          opacity="0.6"
        />
      </g>

      {/* Rocket body */}
      <g className="rocket-body">
        {/* Main rocket body */}
        <ellipse
          cx="250"
          cy="140"
          rx="15"
          ry="45"
          fill="url(#rocketGradient)"
          transform="rotate(-30 250 140)"
        />
        
        {/* Rocket nose cone */}
        <path
          d="M 265 115 Q 275 105, 280 120 Q 275 125, 265 125 Z"
          fill="var(--accent-color)"
        />
        
        {/* Rocket fins */}
        <path
          d="M 235 165 L 225 175 L 235 175 Z"
          fill="var(--primary-color)"
          opacity="0.8"
        />
        <path
          d="M 240 170 L 230 180 L 240 180 Z"
          fill="var(--primary-color)"
          opacity="0.8"
        />
        
        {/* Rocket window */}
        <circle
          cx="255"
          cy="130"
          r="6"
          fill="var(--accent-color)"
          opacity="0.7"
        />
        <circle
          cx="255"
          cy="130"
          r="3"
          fill="var(--success-color)"
          opacity="0.9"
        />
      </g>

      {/* Rocket flames/exhaust */}
      <g className="flame-animation">
        <ellipse
          cx="225"
          cy="175"
          rx="8"
          ry="20"
          fill="url(#flameGradient)"
          transform="rotate(-30 225 175)"
          filter="url(#glow)"
        />
        <ellipse
          cx="220"
          cy="180"
          rx="5"
          ry="15"
          fill="#fbbf24"
          transform="rotate(-30 220 180)"
          opacity="0.8"
        />
      </g>

      {/* Energy/motion lines */}
      <g className="energy-lines">
        {[0, 1, 2].map((index) => (
          <line
            key={index}
            x1={200 - index * 15}
            y1={185 + index * 5}
            x2={180 - index * 15}
            y2={195 + index * 5}
            stroke="var(--accent-color)"
            strokeWidth="2"
            opacity={0.8 - index * 0.2}
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* Trajectory path */}
      <path
        d="M 280 120 Q 350 80, 420 50"
        fill="none"
        stroke="var(--primary-color)"
        strokeWidth="2"
        strokeDasharray="5,5"
        opacity="0.5"
      />

      {/* Success indicators */}
      <g opacity="0.8">
        {/* Launch status */}
        <circle cx="400" cy="60" r="4" fill="var(--success-color)" />
        <text x="410" y="65" fontSize="12" fill="var(--success-color)" fontWeight="600">Launch Ready</text>
        
        {/* Speed indicator */}
        <circle cx="100" cy="50" r="4" fill="var(--accent-color)" />
        <text x="110" y="55" fontSize="12" fill="var(--accent-color)" fontWeight="500">Rapid Deploy</text>
      </g>

      {/* Labels */}
      <g>
        <text
          x="250"
          y="220"
          textAnchor="middle"
          fontSize="14"
          fill="var(--primary-color)"
          fontWeight="600"
        >
          Project Launchpad
        </text>
        <text
          x="250"
          y="235"
          textAnchor="middle"
          fontSize="12"
          fill="var(--foreground-color)"
          opacity="0.7"
        >
          Accelerated Development & Deployment
        </text>
      </g>

      {/* Sparkle effects around rocket */}
      <g opacity="0.6">
        {[
          { x: 290, y: 100, delay: '0s' },
          { x: 310, y: 130, delay: '0.5s' },
          { x: 270, y: 90, delay: '1s' },
          { x: 300, y: 110, delay: '1.5s' }
        ].map((sparkle, index) => (
          <g key={index}>
            <circle
              cx={sparkle.x}
              cy={sparkle.y}
              r="2"
              fill="var(--accent-color)"
            >
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="2s"
                repeatCount="indefinite"
                begin={sparkle.delay}
              />
            </circle>
          </g>
        ))}
      </g>
    </svg>
  );
};

export default ProjectLaunchpadSVG;