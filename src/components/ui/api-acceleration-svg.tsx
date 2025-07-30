import React from 'react';

interface APIAccelerationSVGProps {
  className?: string;
  width?: number;
  height?: number;
}

export const APIAccelerationSVG: React.FC<APIAccelerationSVGProps> = ({
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
        {/* Gradient for speed trails */}
        <linearGradient id="speedTrail" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent-color)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--accent-color)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="1" />
        </linearGradient>

        {/* Gradient for API nodes */}
        <radialGradient id="apiNodeGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="1" />
          <stop offset="70%" stopColor="var(--accent-color)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0.6" />
        </radialGradient>

        {/* Glow filter */}
        <filter id="acceleration-glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Animation styles */}
        <style>
          {`
            .speed-particle {
              animation: particle-flow 2s linear infinite;
            }
            
            .api-node {
              animation: node-pulse 3s ease-in-out infinite;
            }
            
            .acceleration-wave {
              animation: wave-expand 2.5s ease-out infinite;
            }
            
            .development-timeline {
              animation: timeline-progress 4s ease-in-out infinite;
            }
            
            .launch-indicator {
              animation: launch-ready 2s ease-in-out infinite;
            }
            
            @keyframes particle-flow {
              0% {
                transform: translateX(-20px);
                opacity: 0;
              }
              20% {
                opacity: 1;
              }
              80% {
                opacity: 1;
              }
              100% {
                transform: translateX(100px);
                opacity: 0;
              }
            }
            
            @keyframes node-pulse {
              0%, 100% {
                filter: drop-shadow(0 0 8px var(--primary-color));
                transform: scale(1);
              }
              50% {
                filter: drop-shadow(0 0 16px var(--accent-color));
                transform: scale(1.1);
              }
            }
            
            @keyframes wave-expand {
              0% {
                transform: scale(0.8);
                opacity: 0.8;
              }
              50% {
                transform: scale(1.2);
                opacity: 0.4;
              }
              100% {
                transform: scale(1.5);
                opacity: 0;
              }
            }
            
            @keyframes timeline-progress {
              0% {
                stroke-dashoffset: 100;
              }
              100% {
                stroke-dashoffset: 0;
              }
            }
            
            @keyframes launch-ready {
              0%, 100% {
                opacity: 0.7;
                transform: translateY(0px);
              }
              50% {
                opacity: 1;
                transform: translateY(-3px);
              }
            }
          `}
        </style>
      </defs>

      {/* Background acceleration field */}
      <defs>
        <pattern id="acceleration-field" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill="var(--accent-color)" opacity="0.2">
            <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite"/>
          </circle>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#acceleration-field)" />

      {/* Development Timeline - Left to Right */}
      <g>
        {/* Timeline base */}
        <line
          x1="50"
          y1="125"
          x2="450"
          y2="125"
          stroke="var(--secondary-color)"
          strokeWidth="2"
          opacity="0.3"
        />
        
        {/* Accelerated timeline */}
        <line
          x1="50"
          y1="125"
          x2="450"
          y2="125"
          stroke="var(--primary-color)"
          strokeWidth="4"
          strokeDasharray="20,5"
          className="development-timeline"
          filter="url(#acceleration-glow)"
        />
      </g>

      {/* API Development Stages */}
      <g>
        {/* Stage 1: Planning */}
        <g className="api-node">
          <circle
            cx="100"
            cy="125"
            r="15"
            fill="url(#apiNodeGradient)"
            stroke="var(--primary-color)"
            strokeWidth="2"
          />
          <text x="100" y="130" textAnchor="middle" fontSize="8" fill="white" fontWeight="600">PLAN</text>
          <text x="100" y="155" textAnchor="middle" fontSize="10" fill="var(--primary-color)" fontWeight="500">Planning</text>
        </g>

        {/* Stage 2: Development */}
        <g className="api-node">
          <circle
            cx="200"
            cy="125"
            r="15"
            fill="url(#apiNodeGradient)"
            stroke="var(--primary-color)"
            strokeWidth="2"
          />
          <text x="200" y="130" textAnchor="middle" fontSize="8" fill="white" fontWeight="600">DEV</text>
          <text x="200" y="155" textAnchor="middle" fontSize="10" fill="var(--primary-color)" fontWeight="500">Development</text>
        </g>

        {/* Stage 3: Testing */}
        <g className="api-node">
          <circle
            cx="300"
            cy="125"
            r="15"
            fill="url(#apiNodeGradient)"
            stroke="var(--primary-color)"
            strokeWidth="2"
          />
          <text x="300" y="130" textAnchor="middle" fontSize="8" fill="white" fontWeight="600">TEST</text>
          <text x="300" y="155" textAnchor="middle" fontSize="10" fill="var(--primary-color)" fontWeight="500">Testing</text>
        </g>

        {/* Stage 4: Launch */}
        <g className="api-node launch-indicator">
          <circle
            cx="400"
            cy="125"
            r="15"
            fill="var(--success-color)"
            stroke="var(--accent-color)"
            strokeWidth="2"
          />
          <text x="400" y="130" textAnchor="middle" fontSize="7" fill="white" fontWeight="600">LAUNCH</text>
          <text x="400" y="155" textAnchor="middle" fontSize="10" fill="var(--success-color)" fontWeight="600">Launch</text>
        </g>
      </g>

      {/* Speed particles flowing between stages */}
      <g>
        {/* Particles from Planning to Development */}
        {[0, 0.5, 1, 1.5].map((delay, index) => (
          <circle
            key={`p1-${index}`}
            cx="120"
            cy="125"
            r="3"
            fill="var(--accent-color)"
            className="speed-particle"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}

        {/* Particles from Development to Testing */}
        {[0.3, 0.8, 1.3, 1.8].map((delay, index) => (
          <circle
            key={`p2-${index}`}
            cx="220"
            cy="125"
            r="3"
            fill="var(--accent-color)"
            className="speed-particle"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}

        {/* Particles from Testing to Launch */}
        {[0.6, 1.1, 1.6, 2.1].map((delay, index) => (
          <circle
            key={`p3-${index}`}
            cx="320"
            cy="125"
            r="3"
            fill="var(--success-color)"
            className="speed-particle"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </g>

      {/* Acceleration waves */}
      <g>
        {[100, 200, 300, 400].map((x, index) => (
          <circle
            key={`wave-${index}`}
            cx={x}
            cy="125"
            r="20"
            fill="none"
            stroke="var(--accent-color)"
            strokeWidth="1"
            opacity="0.3"
            className="acceleration-wave"
            style={{ animationDelay: `${index * 0.5}s` }}
          />
        ))}
      </g>

      {/* Speed indicators */}
      <g>
        {/* Traditional speed indicator */}
        <g opacity="0.7">
          <line x1="80" y1="80" x2="120" y2="80" stroke="var(--secondary-color)" strokeWidth="2"/>
          <text x="100" y="75" textAnchor="middle" fontSize="10" fill="var(--secondary-color)">Traditional</text>
          <text x="100" y="95" textAnchor="middle" fontSize="8" fill="var(--secondary-color)" opacity="0.7">Weeks</text>
        </g>

        {/* Accelerated speed indicator */}
        <g opacity="0.9">
          <line x1="380" y1="80" x2="420" y2="80" stroke="var(--success-color)" strokeWidth="4"/>
          <text x="400" y="75" textAnchor="middle" fontSize="10" fill="var(--success-color)" fontWeight="600">CHKware</text>
          <text x="400" y="95" textAnchor="middle" fontSize="8" fill="var(--success-color)" opacity="0.8">Hours</text>
        </g>
      </g>

      {/* Precision indicators */}
      <g opacity="0.8">
        {/* Precision crosshairs at each stage */}
        {[100, 200, 300, 400].map((x, index) => (
          <g key={`precision-${index}`}>
            <line x1={x-5} y1="125" x2={x+5} y2="125" stroke="var(--accent-color)" strokeWidth="1" opacity="0.6"/>
            <line x1={x} y1="120" x2={x} y2="130" stroke="var(--accent-color)" strokeWidth="1" opacity="0.6"/>
          </g>
        ))}
      </g>

      {/* Performance metrics */}
      <g>
        {/* Speed boost indicator */}
        <g transform="translate(50, 200)">
          <rect x="0" y="0" width="100" height="20" rx="10" fill="var(--primary-color)" fillOpacity="0.2"/>
          <rect x="0" y="0" width="85" height="20" rx="10" fill="var(--accent-color)"/>
          <text x="50" y="14" textAnchor="middle" fontSize="10" fill="white" fontWeight="600">85% Faster</text>
        </g>

        {/* Precision indicator */}
        <g transform="translate(350, 200)">
          <rect x="0" y="0" width="100" height="20" rx="10" fill="var(--primary-color)" fillOpacity="0.2"/>
          <rect x="0" y="0" width="95" height="20" rx="10" fill="var(--success-color)"/>
          <text x="50" y="14" textAnchor="middle" fontSize="10" fill="white" fontWeight="600">95% Accurate</text>
        </g>
      </g>

      {/* Main title and description */}
      <g>
        <text
          x="250"
          y="40"
          textAnchor="middle"
          fontSize="18"
          fill="var(--primary-color)"
          fontWeight="700"
        >
          Accelerate Your API Development
        </text>
        <text
          x="250"
          y="60"
          textAnchor="middle"
          fontSize="12"
          fill="var(--foreground-color)"
          opacity="0.8"
        >
          Launch Projects Faster Than Ever with Streamlined Workflow Tools
        </text>
      </g>

      {/* Workflow streamlining arrows */}
      <g opacity="0.6">
        {/* Arrow from traditional to accelerated */}
        <path
          d="M 130 85 Q 200 70, 270 85"
          fill="none"
          stroke="var(--accent-color)"
          strokeWidth="2"
          strokeDasharray="4,2"
          markerEnd="url(#acceleration-arrow)"
        />
        
        {/* Arrow marker */}
        <defs>
          <marker
            id="acceleration-arrow"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="var(--accent-color)"
            />
          </marker>
        </defs>
      </g>
    </svg>
  );
};

export default APIAccelerationSVG;