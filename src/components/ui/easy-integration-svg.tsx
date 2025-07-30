import React from 'react';

interface EasyIntegrationSVGProps {
  className?: string;
  width?: number;
  height?: number;
}

export const EasyIntegrationSVG: React.FC<EasyIntegrationSVGProps> = ({
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
      } as React.CSSProperties}
    >
      <defs>
        {/* Connection line gradient */}
        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.3" />
          <stop offset="50%" stopColor="var(--accent-color)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--success-color)" stopOpacity="1" />
        </linearGradient>

        {/* Node gradient */}
        <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="1" />
        </radialGradient>

        <style>
          {`
            .connection-flow {
              animation: flow 2s ease-in-out infinite;
            }
            
            .node-pulse {
              animation: node-pulse 3s ease-in-out infinite;
            }
            
            .integration-complete {
              animation: integration-complete 4s ease-in-out infinite;
            }
            
            @keyframes flow {
              0%, 100% { stroke-dashoffset: 0; }
              50% { stroke-dashoffset: -20; }
            }
            
            @keyframes node-pulse {
              0%, 100% { 
                transform: scale(1);
                opacity: 0.8;
              }
              50% { 
                transform: scale(1.1);
                opacity: 1;
              }
            }
            
            @keyframes integration-complete {
              0%, 90% { opacity: 0; }
              95%, 100% { opacity: 1; }
            }
          `}
        </style>
      </defs>

      {/* Left side: Complex manual integration */}
      <g>
        {/* Tangled connections */}
        <g opacity="0.6">
          <path d="M 30 60 Q 60 40, 90 80 Q 120 120, 80 100" fill="none" stroke="var(--secondary-color)" strokeWidth="2" strokeDasharray="5,3" />
          <path d="M 40 120 Q 70 100, 100 140 Q 130 160, 90 130" fill="none" stroke="var(--secondary-color)" strokeWidth="2" strokeDasharray="5,3" />
          <path d="M 50 80 Q 80 60, 110 100 Q 140 140, 100 110" fill="none" stroke="var(--secondary-color)" strokeWidth="2" strokeDasharray="5,3" />
        </g>
        
        {/* Disconnected nodes */}
        <circle cx="40" cy="70" r="8" fill="var(--secondary-color)" opacity="0.7" />
        <circle cx="80" cy="50" r="8" fill="var(--secondary-color)" opacity="0.7" />
        <circle cx="60" cy="120" r="8" fill="var(--secondary-color)" opacity="0.7" />
        <circle cx="100" cy="90" r="8" fill="var(--secondary-color)" opacity="0.7" />
        
        {/* Warning indicators */}
        <g>
          <polygon points="70,30 75,40 65,40" fill="orange" opacity="0.8" />
          <text x="70" y="25" textAnchor="middle" fontSize="8" fill="var(--foreground-color)" opacity="0.6">!</text>
        </g>
        
        <text x="70" y="170" textAnchor="middle" fontSize="12" fill="var(--foreground-color)" opacity="0.6">
          Complex Setup
        </text>
      </g>

      {/* Center: Integration hub */}
      <g transform="translate(200, 100)">
        {/* Central hub */}
        <circle 
          cx="0" 
          cy="0" 
          r="20" 
          fill="url(#nodeGradient)" 
          stroke="var(--primary-color)" 
          strokeWidth="3"
          className="node-pulse"
        />
        
        {/* Hub icon (puzzle piece) */}
        <path
          d="M -8 -8 L 8 -8 L 8 0 L 12 0 Q 15 0, 15 3 Q 15 6, 12 6 L 8 6 L 8 8 L -8 8 L -8 0 L -12 0 Q -15 0, -15 -3 Q -15 -6, -12 -6 L -8 -6 Z"
          fill="white"
          opacity="0.9"
        />
        
        {/* Connection points */}
        {[0, 60, 120, 180, 240, 300].map((angle, index) => {
          const radian = (angle * Math.PI) / 180;
          const x = Math.cos(radian) * 35;
          const y = Math.sin(radian) * 35;
          
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill="var(--accent-color)"
              className="node-pulse"
              style={{animationDelay: `${index * 0.2}s`}}
            />
          );
        })}
      </g>

      {/* Right side: Simple integrated system */}
      <g>
        {/* Clean, organized connections */}
        <g>
          {/* Horizontal connections */}
          <line x1="280" y1="60" x2="360" y2="60" stroke="url(#connectionGradient)" strokeWidth="3" className="connection-flow" strokeDasharray="10,5" />
          <line x1="280" y1="100" x2="360" y2="100" stroke="url(#connectionGradient)" strokeWidth="3" className="connection-flow" strokeDasharray="10,5" style={{animationDelay: '0.5s'}} />
          <line x1="280" y1="140" x2="360" y2="140" stroke="url(#connectionGradient)" strokeWidth="3" className="connection-flow" strokeDasharray="10,5" style={{animationDelay: '1s'}} />
        </g>
        
        {/* Connected service nodes */}
        <g>
          <circle cx="290" cy="60" r="8" fill="var(--success-color)" className="node-pulse" />
          <circle cx="290" cy="100" r="8" fill="var(--success-color)" className="node-pulse" style={{animationDelay: '0.3s'}} />
          <circle cx="290" cy="140" r="8" fill="var(--success-color)" className="node-pulse" style={{animationDelay: '0.6s'}} />
          
          <circle cx="350" cy="60" r="8" fill="var(--success-color)" className="node-pulse" style={{animationDelay: '0.9s'}} />
          <circle cx="350" cy="100" r="8" fill="var(--success-color)" className="node-pulse" style={{animationDelay: '1.2s'}} />
          <circle cx="350" cy="140" r="8" fill="var(--success-color)" className="node-pulse" style={{animationDelay: '1.5s'}} />
        </g>
        
        {/* Success indicator */}
        <g className="integration-complete">
          <circle cx="320" cy="30" r="6" fill="var(--success-color)" />
          <path d="M 317 30 L 319 32 L 323 28" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </g>
        
        <text x="320" y="170" textAnchor="middle" fontSize="12" fill="var(--foreground-color)" opacity="0.6">
          One-Click Setup
        </text>
      </g>

      {/* Transformation arrow */}
      <g opacity="0.6">
        <defs>
          <marker
            id="arrowhead-integration"
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
          markerEnd="url(#arrowhead-integration)"
          strokeDasharray="4,2"
        />
      </g>

      {/* Service labels */}
      <g fontSize="8" fill="var(--foreground-color)" opacity="0.5">
        <text x="295" y="55">API</text>
        <text x="295" y="95">CI/CD</text>
        <text x="295" y="135">DB</text>
        
        <text x="345" y="55">Tests</text>
        <text x="340" y="95">Deploy</text>
        <text x="340" y="135">Monitor</text>
      </g>

      {/* Time indicators */}
      <g>
        <text x="70" y="190" textAnchor="middle" fontSize="10" fill="var(--foreground-color)" opacity="0.7">
          Hours of Setup
        </text>
        <text x="320" y="190" textAnchor="middle" fontSize="10" fill="var(--foreground-color)" opacity="0.7">
          Minutes to Deploy
        </text>
      </g>
    </svg>
  );
};

export default EasyIntegrationSVG;