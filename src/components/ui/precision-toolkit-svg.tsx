import React from 'react';

interface PrecisionToolkitSVGProps {
  className?: string;
  width?: number;
  height?: number;
}

export const PrecisionToolkitSVG: React.FC<PrecisionToolkitSVGProps> = ({
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
        {/* Gradient for central hub */}
        <radialGradient id="hubGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.2" />
          <stop offset="70%" stopColor="var(--primary-color)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0" />
        </radialGradient>

        {/* Animation styles */}
        <style>
          {`
            .central-hub {
              animation: hub-pulse 3s ease-in-out infinite;
            }
            
            .tool-arm {
              animation: arm-extend 2s ease-in-out infinite;
            }
            
            .tool-icon {
              animation: icon-glow 2.5s ease-in-out infinite;
            }
            
            .schematic-grid {
              animation: grid-fade 4s ease-in-out infinite;
            }
            
            @keyframes hub-pulse {
              0%, 100% {
                filter: drop-shadow(0 0 10px var(--primary-color));
                transform: scale(1);
              }
              50% {
                filter: drop-shadow(0 0 20px var(--accent-color));
                transform: scale(1.05);
              }
            }
            
            @keyframes arm-extend {
              0%, 100% {
                stroke-width: 2;
                opacity: 0.8;
              }
              50% {
                stroke-width: 3;
                opacity: 1;
              }
            }
            
            @keyframes icon-glow {
              0%, 100% {
                filter: drop-shadow(0 0 5px var(--accent-color));
              }
              50% {
                filter: drop-shadow(0 0 12px var(--primary-color));
              }
            }
            
            @keyframes grid-fade {
              0%, 100% {
                opacity: 0.1;
              }
              50% {
                opacity: 0.2;
              }
            }
          `}
        </style>
      </defs>

      {/* Technical grid background */}
      <defs>
        <pattern id="technical-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="var(--primary-color)" strokeWidth="0.5" className="schematic-grid"/>
          <circle cx="15" cy="15" r="1" fill="var(--primary-color)" opacity="0.3" className="schematic-grid"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#technical-grid)" />

      {/* Central hexagonal hub */}
      <g className="central-hub">
        {/* Hub background glow */}
        <circle
          cx="250"
          cy="125"
          r="40"
          fill="url(#hubGradient)"
        />
        
        {/* Main hexagon */}
        <polygon
          points="250,95 270,105 270,125 270,145 250,155 230,145 230,125 230,105"
          fill="none"
          stroke="var(--primary-color)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        
        {/* Inner hexagon */}
        <polygon
          points="250,105 265,112.5 265,137.5 250,145 235,137.5 235,112.5"
          fill="var(--primary-color)"
          fillOpacity="0.1"
          stroke="var(--primary-color)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        
        {/* Central core */}
        <circle
          cx="250"
          cy="125"
          r="8"
          fill="var(--accent-color)"
          stroke="var(--primary-color)"
          strokeWidth="2"
        />
        
        {/* Hub label */}
        <text
          x="250"
          y="130"
          textAnchor="middle"
          fontSize="8"
          fill="white"
          fontWeight="600"
        >
          API
        </text>
      </g>

      {/* Tool Arm 1: Speed (Lightning) - Top Right */}
      <g>
        <line
          x1="270"
          y1="105"
          x2="380"
          y2="60"
          stroke="var(--primary-color)"
          strokeWidth="2"
          className="tool-arm"
          strokeLinecap="round"
        />
        
        {/* Speed tool circle */}
        <circle
          cx="380"
          cy="60"
          r="20"
          fill="var(--secondary-color)"
          fillOpacity="0.2"
          stroke="var(--primary-color)"
          strokeWidth="2"
          className="tool-icon"
        />
        
        {/* Lightning bolt icon */}
        <g className="tool-icon">
          <path
            d="M 375 50 L 380 50 L 377 60 L 382 60 L 377 70 L 372 70 L 375 60 L 370 60 Z"
            fill="var(--accent-color)"
          />
        </g>
        
        {/* Speed label */}
        <text
          x="380"
          y="90"
          textAnchor="middle"
          fontSize="12"
          fill="var(--primary-color)"
          fontWeight="600"
        >
          Speed
        </text>
      </g>

      {/* Tool Arm 2: Precision (Magnifying Glass) - Bottom Right */}
      <g>
        <line
          x1="270"
          y1="145"
          x2="380"
          y2="190"
          stroke="var(--primary-color)"
          strokeWidth="2"
          className="tool-arm"
          strokeLinecap="round"
        />
        
        {/* Precision tool circle */}
        <circle
          cx="380"
          cy="190"
          r="20"
          fill="var(--secondary-color)"
          fillOpacity="0.2"
          stroke="var(--primary-color)"
          strokeWidth="2"
          className="tool-icon"
        />
        
        {/* Magnifying glass icon */}
        <g className="tool-icon">
          <circle
            cx="377"
            cy="187"
            r="6"
            fill="none"
            stroke="var(--accent-color)"
            strokeWidth="2"
          />
          <line
            x1="382"
            y1="192"
            x2="386"
            y2="196"
            stroke="var(--accent-color)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        
        {/* Precision label */}
        <text
          x="380"
          y="220"
          textAnchor="middle"
          fontSize="12"
          fill="var(--primary-color)"
          fontWeight="600"
        >
          Precision
        </text>
      </g>

      {/* Tool Arm 3: Development (Code Brackets) - Left */}
      <g>
        <line
          x1="230"
          y1="125"
          x2="120"
          y2="125"
          stroke="var(--primary-color)"
          strokeWidth="2"
          className="tool-arm"
          strokeLinecap="round"
        />
        
        {/* Development tool circle */}
        <circle
          cx="120"
          cy="125"
          r="20"
          fill="var(--secondary-color)"
          fillOpacity="0.2"
          stroke="var(--primary-color)"
          strokeWidth="2"
          className="tool-icon"
        />
        
        {/* Code brackets icon */}
        <g className="tool-icon">
          <path
            d="M 115 115 L 110 120 L 115 125 L 110 130 L 115 135"
            fill="none"
            stroke="var(--accent-color)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 125 115 L 130 120 L 125 125 L 130 130 L 125 135"
            fill="none"
            stroke="var(--accent-color)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="120"
            y="130"
            textAnchor="middle"
            fontSize="8"
            fill="var(--accent-color)"
            fontWeight="600"
          >
            /
          </text>
        </g>
        
        {/* Development label */}
        <text
          x="120"
          y="155"
          textAnchor="middle"
          fontSize="12"
          fill="var(--primary-color)"
          fontWeight="600"
        >
          Development
        </text>
      </g>

      {/* Connection nodes along arms */}
      <g opacity="0.6">
        {/* Speed arm nodes */}
        <circle cx="310" cy="85" r="2" fill="var(--accent-color)">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="0s"/>
        </circle>
        <circle cx="340" cy="72" r="2" fill="var(--accent-color)">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="0.5s"/>
        </circle>
        
        {/* Precision arm nodes */}
        <circle cx="310" cy="165" r="2" fill="var(--accent-color)">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="1s"/>
        </circle>
        <circle cx="340" cy="178" r="2" fill="var(--accent-color)">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="1.5s"/>
        </circle>
        
        {/* Development arm nodes */}
        <circle cx="190" cy="125" r="2" fill="var(--accent-color)">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="0.7s"/>
        </circle>
        <circle cx="160" cy="125" r="2" fill="var(--accent-color)">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="1.2s"/>
        </circle>
      </g>

      {/* Technical specifications */}
      <g opacity="0.7">
        {/* Measurement lines */}
        <line x1="100" y1="40" x2="400" y2="40" stroke="var(--primary-color)" strokeWidth="1" strokeDasharray="2,2"/>
        <text x="250" y="35" textAnchor="middle" fontSize="10" fill="var(--primary-color)">API Toolkit Specifications</text>
        
        {/* Version indicator */}
        <text x="450" y="25" textAnchor="end" fontSize="10" fill="var(--accent-color)" fontWeight="500">v2.0</text>
      </g>

      {/* Main title */}
      <g>
        <text
          x="250"
          y="220"
          textAnchor="middle"
          fontSize="16"
          fill="var(--primary-color)"
          fontWeight="700"
        >
          Precision Toolkit
        </text>
        <text
          x="250"
          y="235"
          textAnchor="middle"
          fontSize="12"
          fill="var(--foreground-color)"
          opacity="0.8"
        >
          Engineered for Speed, Precision & Development Excellence
        </text>
      </g>
    </svg>
  );
};

export default PrecisionToolkitSVG;