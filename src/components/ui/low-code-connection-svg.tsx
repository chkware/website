import React from 'react';

interface LowCodeConnectionSVGProps {
  className?: string;
  width?: number;
  height?: number;
}

export const LowCodeConnectionSVG: React.FC<LowCodeConnectionSVGProps> = ({
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
        '--tertiary-color': '#e2e8f0',
        '--foreground-color': '#1e293b',
      } as React.CSSProperties}
    >
      <defs>
        {/* Gradient for main blocks */}
        <linearGradient id="blockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="1" />
          <stop offset="50%" stopColor="var(--accent-color)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0.8" />
        </linearGradient>

        {/* Animation styles */}
        <style>
          {`
            .user-hand {
              animation: hand-draw 4s ease-in-out infinite;
            }
            
            .main-connection {
              animation: connection-pulse 3s ease-in-out infinite;
            }
            
            .automated-pathways {
              animation: pathway-flow 2s linear infinite;
            }
            
            .goal-block {
              animation: block-ready 3s ease-in-out infinite;
            }
            
            .result-block {
              animation: result-achieved 3s ease-in-out infinite;
            }
            
            .network-expansion {
              animation: network-grow 4s ease-out infinite;
            }
            
            @keyframes hand-draw {
              0%, 100% {
                transform: translateX(0px);
              }
              50% {
                transform: translateX(10px);
              }
            }
            
            @keyframes connection-pulse {
              0%, 100% {
                stroke-width: 6;
                opacity: 0.9;
              }
              50% {
                stroke-width: 8;
                opacity: 1;
              }
            }
            
            @keyframes pathway-flow {
              0% {
                stroke-dashoffset: 0;
              }
              100% {
                stroke-dashoffset: -20;
              }
            }
            
            @keyframes block-ready {
              0%, 100% {
                filter: drop-shadow(0 0 10px var(--primary-color));
              }
              50% {
                filter: drop-shadow(0 0 20px var(--accent-color));
              }
            }
            
            @keyframes result-achieved {
              0%, 100% {
                filter: drop-shadow(0 0 10px var(--primary-color));
                transform: scale(1);
              }
              50% {
                filter: drop-shadow(0 0 20px var(--accent-color));
                transform: scale(1.05);
              }
            }
            
            @keyframes network-grow {
              0% {
                opacity: 0;
                stroke-width: 0;
              }
              30% {
                opacity: 0.6;
                stroke-width: 1;
              }
              100% {
                opacity: 0.8;
                stroke-width: 1.5;
              }
            }
          `}
        </style>
      </defs>

      {/* Background grid for low-code feel */}
      <defs>
        <pattern id="lowcode-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--tertiary-color)" strokeWidth="0.5" opacity="0.3" />
          <circle cx="10" cy="10" r="1" fill="var(--tertiary-color)" opacity="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lowcode-grid)" />

      {/* Goal Block (Left) */}
      <g className="goal-block" transform="translate(80, 100)">
        {/* Main block */}
        <rect
          x="0"
          y="0"
          width="60"
          height="50"
          rx="8"
          fill="url(#blockGradient)"
          stroke="var(--primary-color)"
          strokeWidth="2"
        />

        {/* Target icon */}
        <g transform="translate(30, 25)">
          <circle cx="0" cy="0" r="12" fill="none" stroke="white" strokeWidth="2" />
          <circle cx="0" cy="0" r="8" fill="none" stroke="white" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="4" fill="white" />
        </g>

        {/* Goal label */}
        <text
          x="30"
          y="70"
          textAnchor="middle"
          fontSize="14"
          fill="var(--primary-color)"
          fontWeight="600"
        >
          Goal
        </text>
      </g>

      {/* Result Block (Right) */}
      <g className="result-block" transform="translate(420, 100)">
        {/* Main block */}
        <rect
          x="0"
          y="0"
          width="60"
          height="50"
          rx="8"
          fill="url(#blockGradient)"
          stroke="var(--primary-color)"
          strokeWidth="2"
        />

        {/* Checkmark icon */}
        <g transform="translate(30, 25)">
          <path
            d="M -8 0 L -2 6 L 8 -6"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Result label */}
        <text
          x="30"
          y="70"
          textAnchor="middle"
          fontSize="14"
          fill="var(--primary-color)"
          fontWeight="600"
        >
          Result
        </text>
      </g>

      {/* User Hand Drawing Connection */}
      <g className="user-hand" transform="translate(160, 110)">
        {/* Hand outline */}
        <path
          d="M 0 10 Q 5 5, 10 10 L 15 8 Q 20 5, 25 8 L 30 6 Q 35 3, 40 6 L 45 4 Q 50 1, 55 4 L 60 10 L 55 15 L 50 18 L 45 20 L 40 22 L 35 23 L 30 24 L 25 23 L 20 22 L 15 20 L 10 18 L 5 15 Z"
          fill="var(--secondary-color)"
          stroke="var(--primary-color)"
          strokeWidth="1"
          opacity="0.8"
        />

        {/* Finger pointing */}
        <circle
          cx="60"
          cy="10"
          r="3"
          fill="var(--primary-color)"
        />
      </g>

      {/* Main Connection Line */}
      <line
        x1="140"
        y1="125"
        x2="420"
        y2="125"
        stroke="var(--primary-color)"
        strokeWidth="6"
        strokeLinecap="round"
        className="main-connection"
      />

      {/* Automated Network Pathways */}
      <g className="network-expansion">
        {/* Upper pathways */}
        <path
          d="M 180 125 Q 220 100, 260 110 Q 340 120, 400 115"
          fill="none"
          stroke="var(--secondary-color)"
          strokeWidth="1.5"
          strokeDasharray="5,3"
          className="automated-pathways"
          opacity="0.7"
        />

        <path
          d="M 190 125 Q 230 90, 270 95 Q 350 100, 410 105"
          fill="none"
          stroke="var(--secondary-color)"
          strokeWidth="1"
          strokeDasharray="4,2"
          className="automated-pathways"
          opacity="0.6"
        />

        {/* Lower pathways */}
        <path
          d="M 180 125 Q 220 150, 260 140 Q 340 130, 400 135"
          fill="none"
          stroke="var(--secondary-color)"
          strokeWidth="1.5"
          strokeDasharray="5,3"
          className="automated-pathways"
          opacity="0.7"
        />

        <path
          d="M 190 125 Q 230 160, 270 155 Q 350 150, 410 145"
          fill="none"
          stroke="var(--secondary-color)"
          strokeWidth="1"
          strokeDasharray="4,2"
          className="automated-pathways"
          opacity="0.6"
        />

        {/* Middle branching pathways */}
        <path
          d="M 200 125 Q 240 115, 280 125 Q 360 135, 400 125"
          fill="none"
          stroke="var(--secondary-color)"
          strokeWidth="1.5"
          strokeDasharray="6,2"
          className="automated-pathways"
          opacity="0.8"
        />

        {/* Complex routing around obstacles */}
        <path
          d="M 210 125 Q 230 105, 250 125 Q 270 145, 290 125 Q 350 105, 390 125"
          fill="none"
          stroke="var(--secondary-color)"
          strokeWidth="1"
          strokeDasharray="3,2"
          className="automated-pathways"
          opacity="0.5"
        />
      </g>

      {/* Abstract Obstacles */}
      <g opacity="0.3">
        <circle cx="240" cy="100" r="8" fill="var(--tertiary-color)" />
        <rect x="270" y="140" width="12" height="12" rx="2" fill="var(--tertiary-color)" />
        <path d="M 300 110 L 310 105 L 315 115 L 305 120 Z" fill="var(--tertiary-color)" />
      </g>

      {/* Connection Points */}
      <g>
        {/* Connection nodes along pathways */}
        <circle cx="220" cy="110" r="3" fill="var(--accent-color)" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="0s" />
        </circle>
        <circle cx="260" cy="125" r="3" fill="var(--accent-color)" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="0.5s" />
        </circle>
        <circle cx="340" cy="135" r="3" fill="var(--accent-color)" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="1s" />
        </circle>
      </g>

      {/* Simplicity Indicators */}
      <g opacity="0.8">
        {/* Simple input */}
        <text
          x="110"
          y="90"
          textAnchor="middle"
          fontSize="10"
          fill="var(--primary-color)"
          fontWeight="500"
        >
          Simple Input
        </text>

        {/* Complex automation */}
        <text
          x="250"
          y="80"
          textAnchor="middle"
          fontSize="9"
          fill="var(--secondary-color)"
          fontWeight="400"
        >
          Complex Automation
        </text>

        {/* Robust output */}
        <text
          x="450"
          y="90"
          textAnchor="middle"
          fontSize="10"
          fill="var(--primary-color)"
          fontWeight="600"
        >
          Robust Output
        </text>
      </g>

      {/* Low-Code Building Blocks */}
      <g opacity="0.6">
        {/* Block connectors */}
        <circle cx="140" cy="125" r="4" fill="var(--primary-color)" />
        <circle cx="420" cy="125" r="4" fill="var(--primary-color)" />

        {/* Connection indicators */}
        <rect x="135" y="120" width="10" height="10" rx="2" fill="none" stroke="var(--accent-color)" strokeWidth="1" strokeDasharray="2,1" />
        <rect x="415" y="120" width="10" height="10" rx="2" fill="none" stroke="var(--accent-color)" strokeWidth="1" strokeDasharray="2,1" />
      </g>

      {/* Process Flow Labels */}
      <g>
        <text
          x="250"
          y="200"
          textAnchor="middle"
          fontSize="12"
          fill="var(--secondary-color)"
          fontWeight="500"
        >
          Automated Detail Handling
        </text>

        <text
          x="250"
          y="215"
          textAnchor="middle"
          fontSize="10"
          fill="var(--secondary-color)"
          opacity="0.7"
        >
          Complex pathways navigate obstacles automatically
        </text>
      </g>

      {/* Main Title */}
      <g>
        <text
          x="250"
          y="35"
          textAnchor="middle"
          fontSize="16"
          fill="var(--primary-color)"
          fontWeight="700"
        >
          Low-Code Connection
        </text>
        <text
          x="250"
          y="50"
          textAnchor="middle"
          fontSize="11"
          fill="var(--foreground-color)"
          opacity="0.8"
        >
          Simple Goals • Automated Pathways • Robust Results
        </text>
      </g>

      {/* Capability Metrics */}
      <g opacity="0.7">
        {/* Simplicity meter */}
        <rect x="50" y="220" width="60" height="6" rx="3" fill="var(--tertiary-color)" />
        <rect x="50" y="220" width="55" height="6" rx="3" fill="var(--primary-color)" />
        <text x="80" y="215" textAnchor="middle" fontSize="9" fill="var(--primary-color)" fontWeight="600">Simplicity</text>

        {/* Automation coverage */}
        <rect x="410" y="220" width="60" height="6" rx="3" fill="var(--tertiary-color)" />
        <rect x="410" y="220" width="50" height="6" rx="3" fill="var(--accent-color)" />
        <text x="440" y="215" textAnchor="middle" fontSize="9" fill="var(--accent-color)" fontWeight="600">Automation</text>
      </g>

      {/* Data flow particles */}
      <g opacity="0.5">
        {[
          { x: 180, y: 125, delay: '0s' },
          { x: 250, y: 125, delay: '0.5s' },
          { x: 320, y: 125, delay: '1s' },
          { x: 390, y: 125, delay: '1.5s' }
        ].map((particle, index) => (
          <circle
            key={index}
            cx={particle.x}
            cy={particle.y}
            r="2"
            fill="var(--accent-color)"
          >
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="3s"
              repeatCount="indefinite"
              begin={particle.delay}
            />
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 30,0; 60,0"
              dur="3s"
              repeatCount="indefinite"
              begin={particle.delay}
            />
          </circle>
        ))}
      </g>
    </svg>
  );
};

export default LowCodeConnectionSVG;