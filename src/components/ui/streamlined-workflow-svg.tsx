import React from 'react';

interface StreamlinedWorkflowSVGProps {
  className?: string;
  width?: number;
  height?: number;
}

export const StreamlinedWorkflowSVG: React.FC<StreamlinedWorkflowSVGProps> = ({
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
        {/* Gradient for the tool box */}
        <linearGradient id="toolGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="1" />
          <stop offset="50%" stopColor="var(--primary-color)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0.8" />
        </linearGradient>

        {/* Arrow marker for the output */}
        <marker
          id="streamlined-arrow"
          markerWidth="15"
          markerHeight="10"
          refX="14"
          refY="5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon
            points="0 0, 15 5, 0 10"
            fill="var(--accent-color)"
          />
        </marker>

        {/* Animation styles */}
        <style>
          {`
            .chaotic-lines {
              animation: chaos-wiggle 3s ease-in-out infinite;
            }
            
            .tool-processing {
              animation: tool-pulse 2s ease-in-out infinite;
            }
            
            .streamlined-output {
              animation: output-flow 2.5s ease-in-out infinite;
            }
            
            .gear-rotation {
              animation: gear-spin 4s linear infinite;
              transform-origin: 225px 125px;
            }
            
            @keyframes chaos-wiggle {
              0%, 100% {
                transform: translateY(0px);
              }
              25% {
                transform: translateY(-2px);
              }
              50% {
                transform: translateY(1px);
              }
              75% {
                transform: translateY(-1px);
              }
            }
            
            @keyframes tool-pulse {
              0%, 100% {
                filter: drop-shadow(0 0 8px var(--primary-color));
              }
              50% {
                filter: drop-shadow(0 0 16px var(--accent-color));
              }
            }
            
            @keyframes output-flow {
              0%, 100% {
                opacity: 0.9;
                stroke-width: 6;
              }
              50% {
                opacity: 1;
                stroke-width: 8;
              }
            }
            
            @keyframes gear-spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </defs>

      {/* Background subtle grid */}
      <defs>
        <pattern id="workflow-grid" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="var(--secondary-color)" strokeWidth="0.3" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#workflow-grid)" />

      {/* Left side: Chaotic tangled lines */}
      <g className="chaotic-lines">
        {/* Tangled line 1 */}
        <path
          d="M 30 80 Q 60 60, 80 90 Q 100 120, 120 100 Q 140 80, 160 110"
          fill="none"
          stroke="var(--secondary-color)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
        />
        
        {/* Tangled line 2 */}
        <path
          d="M 25 110 Q 55 140, 75 115 Q 95 90, 115 125 Q 135 160, 155 135"
          fill="none"
          stroke="var(--secondary-color)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        />
        
        {/* Tangled line 3 */}
        <path
          d="M 35 140 Q 65 170, 85 145 Q 105 120, 125 155 Q 145 190, 165 165"
          fill="none"
          stroke="var(--secondary-color)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
        />
        
        {/* Tangled line 4 */}
        <path
          d="M 40 100 Q 70 80, 90 110 Q 110 140, 130 115 Q 150 90, 170 125"
          fill="none"
          stroke="var(--secondary-color)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
        
        {/* Tangled line 5 */}
        <path
          d="M 20 125 Q 50 105, 70 135 Q 90 165, 110 140 Q 130 115, 150 150"
          fill="none"
          stroke="var(--secondary-color)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        />
        
        {/* Tangled line 6 */}
        <path
          d="M 45 160 Q 75 140, 95 170 Q 115 200, 135 175 Q 155 150, 175 180"
          fill="none"
          stroke="var(--secondary-color)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
        />
      </g>

      {/* Center: Tool processing box */}
      <g className="tool-processing">
        {/* Main tool rectangle */}
        <rect
          x="190"
          y="100"
          width="70"
          height="50"
          rx="8"
          ry="8"
          fill="url(#toolGradient)"
          stroke="var(--primary-color)"
          strokeWidth="2"
        />
        
        {/* Tool label */}
        <text
          x="225"
          y="115"
          textAnchor="middle"
          fontSize="10"
          fill="white"
          fontWeight="600"
          opacity="0.9"
        >
          CHKware
        </text>
        
        {/* Gear icon inside tool */}
        <g className="gear-rotation">
          <circle
            cx="225"
            cy="125"
            r="12"
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity="0.8"
          />
          
          {/* Gear teeth */}
          {[0, 60, 120, 180, 240, 300].map((angle, index) => {
            const radian = (angle * Math.PI) / 180;
            const x1 = 225 + Math.cos(radian) * 8;
            const y1 = 125 + Math.sin(radian) * 8;
            const x2 = 225 + Math.cos(radian) * 14;
            const y2 = 125 + Math.sin(radian) * 14;
            
            return (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.8"
              />
            );
          })}
          
          {/* Center dot */}
          <circle
            cx="225"
            cy="125"
            r="3"
            fill="white"
            opacity="0.9"
          />
        </g>
        
        {/* Processing indicators */}
        <g opacity="0.6">
          <circle cx="200" cy="110" r="2" fill="var(--accent-color)">
            <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0s"/>
          </circle>
          <circle cx="210" cy="110" r="2" fill="var(--accent-color)">
            <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0.3s"/>
          </circle>
          <circle cx="220" cy="110" r="2" fill="var(--accent-color)">
            <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0.6s"/>
          </circle>
        </g>
      </g>

      {/* Right side: Streamlined output arrow */}
      <g className="streamlined-output">
        <line
          x1="280"
          y1="125"
          x2="450"
          y2="125"
          stroke="var(--accent-color)"
          strokeWidth="6"
          markerEnd="url(#streamlined-arrow)"
          strokeLinecap="round"
        />
        
        {/* Speed lines effect */}
        <g opacity="0.6">
          <line x1="300" y1="125" x2="330" y2="125" stroke="var(--accent-color)" strokeWidth="2" opacity="0.8"/>
          <line x1="340" y1="125" x2="370" y2="125" stroke="var(--accent-color)" strokeWidth="2" opacity="0.6"/>
          <line x1="380" y1="125" x2="410" y2="125" stroke="var(--accent-color)" strokeWidth="2" opacity="0.4"/>
        </g>
      </g>

      {/* Labels and indicators */}
      <g>
        {/* Before label */}
        <text
          x="100"
          y="200"
          textAnchor="middle"
          fontSize="14"
          fill="var(--secondary-color)"
          fontWeight="500"
        >
          Complex Input
        </text>
        <text
          x="100"
          y="215"
          textAnchor="middle"
          fontSize="12"
          fill="var(--secondary-color)"
          opacity="0.7"
        >
          Tangled Processes
        </text>
        
        {/* Tool label */}
        <text
          x="225"
          y="175"
          textAnchor="middle"
          fontSize="14"
          fill="var(--primary-color)"
          fontWeight="600"
        >
          Processing Engine
        </text>
        
        {/* After label */}
        <text
          x="365"
          y="200"
          textAnchor="middle"
          fontSize="14"
          fill="var(--accent-color)"
          fontWeight="600"
        >
          Streamlined Output
        </text>
        <text
          x="365"
          y="215"
          textAnchor="middle"
          fontSize="12"
          fill="var(--accent-color)"
          opacity="0.8"
        >
          Fast & Precise
        </text>
      </g>

      {/* Performance indicators */}
      <g opacity="0.8">
        {/* Complexity indicator */}
        <circle cx="100" cy="50" r="4" fill="var(--secondary-color)" />
        <text x="110" y="55" fontSize="12" fill="var(--secondary-color)" fontWeight="500">High Complexity</text>
        
        {/* Efficiency indicator */}
        <circle cx="365" cy="50" r="4" fill="var(--accent-color)" />
        <text x="375" y="55" fontSize="12" fill="var(--accent-color)" fontWeight="600">High Efficiency</text>
      </g>

      {/* Transformation flow indicators */}
      <g opacity="0.5">
        {/* Input flow */}
        <path
          d="M 175 125 Q 185 120, 190 125"
          fill="none"
          stroke="var(--secondary-color)"
          strokeWidth="2"
          strokeDasharray="3,3"
        />
        
        {/* Output flow */}
        <path
          d="M 260 125 Q 270 120, 280 125"
          fill="none"
          stroke="var(--accent-color)"
          strokeWidth="2"
          strokeDasharray="3,3"
        />
      </g>
    </svg>
  );
};

export default StreamlinedWorkflowSVG;