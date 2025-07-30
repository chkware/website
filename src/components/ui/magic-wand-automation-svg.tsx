import React from 'react';

interface MagicWandAutomationSVGProps {
  className?: string;
  width?: number;
  height?: number;
}

export const MagicWandAutomationSVG: React.FC<MagicWandAutomationSVGProps> = ({
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
        {/* Gradient for magic wand */}
        <linearGradient id="wandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="1" />
          <stop offset="50%" stopColor="var(--accent-color)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0.8" />
        </linearGradient>

        {/* Radial gradient for magic spark */}
        <radialGradient id="sparkGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent-color)" stopOpacity="1" />
          <stop offset="50%" stopColor="var(--accent-color)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--accent-color)" stopOpacity="0" />
        </radialGradient>

        {/* Animation styles */}
        <style>
          {`
            .magic-wand {
              animation: wand-tap 4s ease-in-out infinite;
            }
            
            .chaos-cluster {
              animation: chaos-shake 3s ease-in-out infinite;
            }
            
            .magic-spark {
              animation: spark-burst 2s ease-out infinite;
            }
            
            .ripple-effect {
              animation: ripple-expand 2.5s ease-out infinite;
            }
            
            .ordered-blocks {
              animation: blocks-stabilize 3s ease-in-out infinite;
            }
            
            .transformation-wave {
              animation: wave-sweep 3s ease-in-out infinite;
            }
            
            @keyframes wand-tap {
              0%, 100% {
                transform: translateY(0px) rotate(-15deg);
              }
              50% {
                transform: translateY(5px) rotate(-10deg);
              }
            }
            
            @keyframes chaos-shake {
              0%, 100% {
                transform: translateX(0px) translateY(0px);
              }
              25% {
                transform: translateX(-2px) translateY(1px);
              }
              50% {
                transform: translateX(1px) translateY(-1px);
              }
              75% {
                transform: translateX(-1px) translateY(2px);
              }
            }
            
            @keyframes spark-burst {
              0% {
                opacity: 0;
                transform: scale(0.5);
              }
              50% {
                opacity: 1;
                transform: scale(1.5);
              }
              100% {
                opacity: 0;
                transform: scale(2);
              }
            }
            
            @keyframes ripple-expand {
              0% {
                opacity: 0.8;
                transform: scale(0.8);
              }
              100% {
                opacity: 0;
                transform: scale(3);
              }
            }
            
            @keyframes blocks-stabilize {
              0%, 100% {
                filter: drop-shadow(0 0 8px var(--primary-color));
              }
              50% {
                filter: drop-shadow(0 0 16px var(--accent-color));
              }
            }
            
            @keyframes wave-sweep {
              0% {
                transform: translateX(-50px);
                opacity: 0;
              }
              50% {
                opacity: 0.6;
              }
              100% {
                transform: translateX(100px);
                opacity: 0;
              }
            }
          `}
        </style>
      </defs>

      {/* Background subtle pattern */}
      <defs>
        <pattern id="magic-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="15" cy="15" r="1" fill="var(--accent-color)" opacity="0.1">
            <animate attributeName="opacity" values="0.05;0.2;0.05" dur="4s" repeatCount="indefinite"/>
          </circle>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#magic-pattern)" />

      {/* Magic Wand (Top-Left) */}
      <g className="magic-wand" transform="translate(120, 80) rotate(-15)">
        {/* Wand handle */}
        <rect
          x="0"
          y="0"
          width="8"
          height="60"
          rx="4"
          fill="url(#wandGradient)"
        />
        
        {/* Wand tip */}
        <circle
          cx="4"
          cy="-5"
          r="6"
          fill="var(--accent-color)"
          stroke="var(--primary-color)"
          strokeWidth="2"
        />
        
        {/* Wand core */}
        <line
          x1="4"
          y1="10"
          x2="4"
          y2="50"
          stroke="var(--accent-color)"
          strokeWidth="2"
          opacity="0.8"
        />
        
        {/* Wand grip */}
        <rect
          x="1"
          y="45"
          width="6"
          height="10"
          rx="3"
          fill="var(--primary-color)"
          opacity="0.8"
        />
      </g>

      {/* Chaotic Cluster (Center-Left) */}
      <g className="chaos-cluster" transform="translate(180, 120)">
        {/* Jumbled shapes */}
        <path
          d="M 0 0 L 15 -10 L 25 5 L 10 15 Z"
          fill="var(--secondary-color)"
          opacity="0.8"
        />
        <circle
          cx="20"
          cy="0"
          r="8"
          fill="var(--secondary-color)"
          opacity="0.7"
        />
        <rect
          x="10"
          y="10"
          width="12"
          height="12"
          transform="rotate(25)"
          fill="var(--secondary-color)"
          opacity="0.6"
        />
        
        {/* Code symbols */}
        <text x="5" y="25" fontSize="12" fill="var(--secondary-color)" opacity="0.8">&lt;/&gt;</text>
        <text x="25" y="30" fontSize="12" fill="var(--secondary-color)" opacity="0.7">{}</text>
        <text x="15" y="-5" fontSize="12" fill="var(--secondary-color)" opacity="0.6">?</text>
        <text x="35" y="10" fontSize="12" fill="var(--secondary-color)" opacity="0.5">!</text>
        
        {/* Scattered elements */}
        <circle cx="40" cy="5" r="3" fill="var(--secondary-color)" opacity="0.5"/>
        <rect x="35" y="20" width="6" height="6" fill="var(--secondary-color)" opacity="0.4"/>
      </g>

      {/* Magic Spark at Contact Point */}
      <g className="magic-spark" transform="translate(200, 130)">
        <circle
          cx="0"
          cy="0"
          r="15"
          fill="url(#sparkGradient)"
        />
        
        {/* Spark rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
          const radian = (angle * Math.PI) / 180;
          const x = Math.cos(radian) * 20;
          const y = Math.sin(radian) * 20;
          
          return (
            <line
              key={index}
              x1="0"
              y1="0"
              x2={x}
              y2={y}
              stroke="var(--accent-color)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.8"
            />
          );
        })}
      </g>

      {/* Ripple Effect */}
      <g className="ripple-effect" transform="translate(200, 130)">
        <circle
          cx="0"
          cy="0"
          r="25"
          fill="none"
          stroke="var(--accent-color)"
          strokeWidth="2"
          opacity="0.6"
        />
        <circle
          cx="0"
          cy="0"
          r="35"
          fill="none"
          stroke="var(--accent-color)"
          strokeWidth="1"
          opacity="0.4"
        />
      </g>

      {/* Transformation Wave */}
      <g className="transformation-wave">
        <path
          d="M 220 130 Q 280 120, 340 130 Q 360 135, 380 130"
          fill="none"
          stroke="var(--accent-color)"
          strokeWidth="3"
          opacity="0.6"
          strokeLinecap="round"
        />
      </g>

      {/* Ordered Blocks (Right Side) */}
      <g className="ordered-blocks" transform="translate(320, 100)">
        {/* Perfect stack of blocks */}
        <rect
          x="0"
          y="40"
          width="40"
          height="15"
          rx="2"
          fill="var(--primary-color)"
          stroke="var(--primary-color)"
          strokeWidth="1"
        />
        <rect
          x="0"
          y="25"
          width="40"
          height="15"
          rx="2"
          fill="var(--primary-color)"
          stroke="var(--primary-color)"
          strokeWidth="1"
          opacity="0.9"
        />
        <rect
          x="0"
          y="10"
          width="40"
          height="15"
          rx="2"
          fill="var(--primary-color)"
          stroke="var(--primary-color)"
          strokeWidth="1"
          opacity="0.8"
        />
        <rect
          x="0"
          y="-5"
          width="40"
          height="15"
          rx="2"
          fill="var(--primary-color)"
          stroke="var(--primary-color)"
          strokeWidth="1"
          opacity="0.7"
        />
        
        {/* Stability indicators */}
        <line
          x1="-5"
          y1="55"
          x2="45"
          y2="55"
          stroke="var(--accent-color)"
          strokeWidth="2"
          opacity="0.6"
        />
        
        {/* Perfect alignment guides */}
        <line
          x1="0"
          y1="-10"
          x2="0"
          y2="60"
          stroke="var(--accent-color)"
          strokeWidth="1"
          opacity="0.4"
          strokeDasharray="2,2"
        />
        <line
          x1="40"
          y1="-10"
          x2="40"
          y2="60"
          stroke="var(--accent-color)"
          strokeWidth="1"
          opacity="0.4"
          strokeDasharray="2,2"
        />
      </g>

      {/* Labels and Descriptions */}
      <g>
        {/* Chaos label */}
        <text
          x="200"
          y="200"
          textAnchor="middle"
          fontSize="12"
          fill="var(--secondary-color)"
          fontWeight="500"
        >
          Complex Details
        </text>
        
        {/* Magic moment label */}
        <text
          x="200"
          y="100"
          textAnchor="middle"
          fontSize="10"
          fill="var(--accent-color)"
          fontWeight="600"
        >
          ✨ Automation Magic
        </text>
        
        {/* Order label */}
        <text
          x="340"
          y="200"
          textAnchor="middle"
          fontSize="12"
          fill="var(--primary-color)"
          fontWeight="600"
        >
          Perfect Structure
        </text>
      </g>

      {/* Process indicators */}
      <g opacity="0.8">
        {/* Before state */}
        <circle cx="180" cy="80" r="3" fill="var(--secondary-color)" />
        <text x="190" y="85" fontSize="10" fill="var(--secondary-color)" fontWeight="500">Chaotic</text>
        
        {/* After state */}
        <circle cx="340" cy="80" r="3" fill="var(--primary-color)" />
        <text x="350" y="85" fontSize="10" fill="var(--primary-color)" fontWeight="600">Organized</text>
      </g>

      {/* Main title */}
      <g>
        <text
          x="250"
          y="35"
          textAnchor="middle"
          fontSize="16"
          fill="var(--primary-color)"
          fontWeight="700"
        >
          Magic Wand of Automation
        </text>
        <text
          x="250"
          y="50"
          textAnchor="middle"
          fontSize="11"
          fill="var(--foreground-color)"
          opacity="0.8"
        >
          Effortless Transformation • Let Us Handle the Details
        </text>
      </g>

      {/* Capability indicators */}
      <g opacity="0.7">
        {/* Simplification power */}
        <rect x="50" y="220" width="80" height="6" rx="3" fill="var(--secondary-color)" fillOpacity="0.3"/>
        <rect x="50" y="220" width="70" height="6" rx="3" fill="var(--accent-color)"/>
        <text x="90" y="215" textAnchor="middle" fontSize="9" fill="var(--accent-color)" fontWeight="600">Simplification</text>
        
        {/* Accuracy indicator */}
        <rect x="370" y="220" width="80" height="6" rx="3" fill="var(--secondary-color)" fillOpacity="0.3"/>
        <rect x="370" y="220" width="75" height="6" rx="3" fill="var(--primary-color)"/>
        <text x="410" y="215" textAnchor="middle" fontSize="9" fill="var(--primary-color)" fontWeight="600">Accuracy</text>
      </g>

      {/* Magic particles floating around */}
      <g opacity="0.5">
        {[
          { x: 150, y: 60, delay: '0s' },
          { x: 280, y: 70, delay: '1s' },
          { x: 380, y: 90, delay: '2s' },
          { x: 160, y: 180, delay: '1.5s' }
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
            <animate
              attributeName="r"
              values="1;3;1"
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

export default MagicWandAutomationSVG;