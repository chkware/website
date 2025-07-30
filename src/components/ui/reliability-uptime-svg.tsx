import React from 'react';

interface ReliabilityUptimeSVGProps {
  className?: string;
  width?: number;
  height?: number;
}

export const ReliabilityUptimeSVG: React.FC<ReliabilityUptimeSVGProps> = ({
  className = "",
  width = 400,
  height = 200
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 200"
      className={className}
      style={{
        '--background-color': 'hsl(var(--background))',
        '--primary-color': 'hsl(var(--primary))',
        '--secondary-color': 'hsl(var(--muted-foreground))',
        '--accent-color': 'hsl(var(--accent))',
        '--foreground-color': 'hsl(var(--foreground))',
        '--success-color': '#10b981', // emerald-500
        '--warning-color': '#f59e0b', // amber-500
      } as React.CSSProperties}
    >
      <defs>
        {/* Gradient for uptime bar */}
        <linearGradient id="uptimeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--success-color)" />
          <stop offset="95%" stopColor="var(--success-color)" />
          <stop offset="100%" stopColor="var(--warning-color)" />
        </linearGradient>

        {/* Shield gradient */}
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="1" />
        </linearGradient>

        <style>
          {`
            .heartbeat {
              animation: heartbeat 2s ease-in-out infinite;
            }
            
            .uptime-bar {
              animation: fill-bar 3s ease-out;
            }
            
            .pulse-ring {
              animation: pulse-ring 2s ease-out infinite;
            }
            
            @keyframes heartbeat {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.1); }
            }
            
            @keyframes fill-bar {
              from { width: 0; }
              to { width: 95%; }
            }
            
            @keyframes pulse-ring {
              0% {
                transform: scale(0.8);
                opacity: 1;
              }
              100% {
                transform: scale(2.4);
                opacity: 0;
              }
            }
          `}
        </style>
      </defs>

      {/* Background grid */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--secondary-color)" strokeWidth="0.5" opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" opacity="0.1" />

      {/* Left side: Unreliable system */}
      <g>
        {/* Broken/intermittent signal */}
        <g opacity="0.7">
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={20 + i * 25}
              y={120 - Math.random() * 40}
              width="15"
              height={20 + Math.random() * 30}
              fill="var(--warning-color)"
              opacity={Math.random() > 0.3 ? 1 : 0.3}
            />
          ))}
        </g>
        
        {/* Downtime indicators */}
        <g>
          <circle cx="60" cy="60" r="8" fill="var(--warning-color)" opacity="0.8" />
          <text x="60" y="45" textAnchor="middle" fontSize="10" fill="var(--foreground-color)" opacity="0.7">
            Downtime
          </text>
        </g>
        
        <text x="80" y="170" textAnchor="middle" fontSize="12" fill="var(--foreground-color)" opacity="0.6">
          Before: 85% Uptime
        </text>
      </g>

      {/* Center: Shield/Protection symbol */}
      <g transform="translate(200, 100)">
        {/* Pulse rings */}
        <circle className="pulse-ring" cx="0" cy="0" r="15" fill="none" stroke="var(--primary-color)" strokeWidth="2" opacity="0.6" />
        <circle className="pulse-ring" cx="0" cy="0" r="15" fill="none" stroke="var(--primary-color)" strokeWidth="2" opacity="0.4" style={{animationDelay: '1s'}} />
        
        {/* Main shield */}
        <path
          d="M 0 -25 L 15 -15 L 15 10 L 0 25 L -15 10 L -15 -15 Z"
          fill="url(#shieldGradient)"
          stroke="var(--primary-color)"
          strokeWidth="2"
          className="heartbeat"
        />
        
        {/* Checkmark inside shield */}
        <path
          d="M -8 0 L -3 5 L 8 -8"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Right side: Reliable system */}
      <g>
        {/* Consistent uptime bars */}
        <g>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect
              key={i}
              x={280 + i * 15}
              y={90}
              width="10"
              height="40"
              fill="var(--success-color)"
              opacity="0.9"
            />
          ))}
        </g>
        
        {/* Uptime percentage bar */}
        <g>
          <rect x="280" y="50" width="100" height="8" fill="var(--secondary-color)" opacity="0.3" rx="4" />
          <rect x="280" y="50" width="95" height="8" fill="url(#uptimeGradient)" rx="4" className="uptime-bar" />
          <text x="330" y="45" textAnchor="middle" fontSize="10" fill="var(--foreground-color)" fontWeight="bold">
            99.9%
          </text>
        </g>
        
        <text x="330" y="170" textAnchor="middle" fontSize="12" fill="var(--foreground-color)" opacity="0.6">
          After: 99.9% Uptime
        </text>
      </g>

      {/* Transformation arrow */}
      <g opacity="0.6">
        <defs>
          <marker
            id="arrowhead-reliability"
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
        <path
          d="M 160 100 Q 180 90, 240 100"
          fill="none"
          stroke="var(--accent-color)"
          strokeWidth="2"
          markerEnd="url(#arrowhead-reliability)"
          strokeDasharray="4,2"
        />
      </g>

      {/* Status indicators */}
      <g>
        {/* Before status */}
        <circle cx="80" cy="30" r="4" fill="var(--warning-color)" />
        <text x="90" y="35" fontSize="10" fill="var(--foreground-color)" opacity="0.7">Unstable</text>
        
        {/* After status */}
        <circle cx="320" cy="30" r="4" fill="var(--success-color)" />
        <text x="330" y="35" fontSize="10" fill="var(--foreground-color)" opacity="0.7">Rock Solid</text>
      </g>
    </svg>
  );
};

export default ReliabilityUptimeSVG;