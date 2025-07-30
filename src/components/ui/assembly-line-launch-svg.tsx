import React from 'react';

interface AssemblyLineLaunchSVGProps {
  className?: string;
  width?: number;
  height?: number;
}

export const AssemblyLineLaunchSVG: React.FC<AssemblyLineLaunchSVGProps> = ({
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
        {/* Gradient for rocket */}
        <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="1" />
          <stop offset="50%" stopColor="var(--accent-color)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0.8" />
        </linearGradient>

        {/* Animation styles */}
        <style>
          {`
            .conveyor-belt {
              animation: belt-move 3s linear infinite;
            }
            
            .robotic-arm-1 {
              animation: arm-work-1 4s ease-in-out infinite;
              transform-origin: 200px 120px;
            }
            
            .robotic-arm-2 {
              animation: arm-work-2 4s ease-in-out infinite;
              transform-origin: 280px 120px;
            }
            
            .input-shapes {
              animation: shape-process 6s ease-in-out infinite;
            }
            
            .rocket-launch {
              animation: launch-sequence 3s ease-out infinite;
            }
            
            .motion-lines {
              animation: speed-trail 2s ease-out infinite;
            }
            
            .precision-indicator {
              animation: precision-scan 2.5s ease-in-out infinite;
            }
            
            @keyframes belt-move {
              0% {
                stroke-dashoffset: 0;
              }
              100% {
                stroke-dashoffset: -20;
              }
            }
            
            @keyframes arm-work-1 {
              0%, 100% {
                transform: rotate(0deg);
              }
              25% {
                transform: rotate(-15deg);
              }
              50% {
                transform: rotate(10deg);
              }
              75% {
                transform: rotate(-5deg);
              }
            }
            
            @keyframes arm-work-2 {
              0%, 100% {
                transform: rotate(0deg);
              }
              30% {
                transform: rotate(20deg);
              }
              60% {
                transform: rotate(-10deg);
              }
              90% {
                transform: rotate(5deg);
              }
            }
            
            @keyframes shape-process {
              0% {
                transform: translateX(0px);
                opacity: 0.8;
              }
              50% {
                transform: translateX(100px);
                opacity: 0.6;
              }
              100% {
                transform: translateX(200px);
                opacity: 0.3;
              }
            }
            
            @keyframes launch-sequence {
              0%, 100% {
                transform: translateY(0px) rotate(45deg);
              }
              50% {
                transform: translateY(-5px) rotate(45deg);
              }
            }
            
            @keyframes speed-trail {
              0% {
                opacity: 1;
                stroke-width: 3;
              }
              100% {
                opacity: 0.3;
                stroke-width: 1;
              }
            }
            
            @keyframes precision-scan {
              0%, 100% {
                opacity: 0.6;
                transform: scale(1);
              }
              50% {
                opacity: 1;
                transform: scale(1.2);
              }
            }
          `}
        </style>
      </defs>

      {/* Background grid for industrial feel */}
      <defs>
        <pattern id="industrial-grid" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="var(--secondary-color)" strokeWidth="0.3" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#industrial-grid)" />

      {/* Conveyor Belt System */}
      <g>
        {/* Main belt line */}
        <line
          x1="50"
          y1="160"
          x2="400"
          y2="160"
          stroke="var(--secondary-color)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        
        {/* Belt movement pattern */}
        <line
          x1="50"
          y1="160"
          x2="400"
          y2="160"
          stroke="var(--secondary-color)"
          strokeWidth="2"
          strokeDasharray="10,10"
          className="conveyor-belt"
          opacity="0.6"
        />
        
        {/* Belt supports */}
        {[80, 160, 240, 320].map((x, index) => (
          <rect
            key={index}
            x={x-3}
            y="160"
            width="6"
            height="15"
            fill="var(--secondary-color)"
            opacity="0.7"
          />
        ))}
      </g>

      {/* Input: Jumbled Shapes (Left Side) */}
      <g className="input-shapes">
        {/* Rough cube */}
        <path
          d="M 70 140 L 85 135 L 90 145 L 85 155 L 70 150 Z"
          fill="var(--secondary-color)"
          stroke="var(--secondary-color)"
          strokeWidth="1"
          opacity="0.8"
        />
        
        {/* Jagged puzzle piece */}
        <path
          d="M 100 135 L 115 130 Q 120 135, 115 140 L 120 145 L 110 150 Q 105 145, 110 140 L 100 145 Z"
          fill="var(--secondary-color)"
          stroke="var(--secondary-color)"
          strokeWidth="1"
          opacity="0.7"
        />
        
        {/* Irregular triangle */}
        <path
          d="M 130 145 L 140 130 L 150 150 Z"
          fill="var(--secondary-color)"
          stroke="var(--secondary-color)"
          strokeWidth="1"
          opacity="0.6"
        />
      </g>

      {/* Processing: Robotic Arms (Center) */}
      <g>
        {/* Robotic Arm 1 - Assembly */}
        <g className="robotic-arm-1">
          {/* Arm base */}
          <circle
            cx="200"
            cy="120"
            r="8"
            fill="var(--primary-color)"
            stroke="var(--primary-color)"
            strokeWidth="2"
          />
          
          {/* Arm segments */}
          <line
            x1="200"
            y1="120"
            x2="200"
            y2="140"
            stroke="var(--primary-color)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="200"
            y1="140"
            x2="220"
            y2="150"
            stroke="var(--primary-color)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          
          {/* Arm tool/gripper */}
          <circle
            cx="220"
            cy="150"
            r="4"
            fill="var(--primary-color)"
          />
          <path
            d="M 216 150 L 224 150 M 218 148 L 222 152"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </g>

        {/* Robotic Arm 2 - Precision */}
        <g className="robotic-arm-2">
          {/* Arm base */}
          <circle
            cx="280"
            cy="120"
            r="8"
            fill="var(--primary-color)"
            stroke="var(--primary-color)"
            strokeWidth="2"
          />
          
          {/* Arm segments */}
          <line
            x1="280"
            y1="120"
            x2="280"
            y2="135"
            stroke="var(--primary-color)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="280"
            y1="135"
            x2="295"
            y2="145"
            stroke="var(--primary-color)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          
          {/* Precision tool with crosshair */}
          <circle
            cx="295"
            cy="145"
            r="6"
            fill="none"
            stroke="var(--accent-color)"
            strokeWidth="2"
            className="precision-indicator"
          />
          <line
            x1="290"
            y1="145"
            x2="300"
            y2="145"
            stroke="var(--accent-color)"
            strokeWidth="1"
            className="precision-indicator"
          />
          <line
            x1="295"
            y1="140"
            x2="295"
            y2="150"
            stroke="var(--accent-color)"
            strokeWidth="1"
            className="precision-indicator"
          />
        </g>
      </g>

      {/* Output: Sleek Rocket Launch (Right Side) */}
      <g className="rocket-launch" transform="translate(380, 140) rotate(45)">
        {/* Rocket body */}
        <ellipse
          cx="0"
          cy="0"
          rx="8"
          ry="25"
          fill="url(#rocketGradient)"
        />
        
        {/* Rocket nose */}
        <path
          d="M 0 -25 Q 5 -30, 0 -35 Q -5 -30, 0 -25"
          fill="var(--accent-color)"
        />
        
        {/* Rocket fins */}
        <path
          d="M -8 15 L -12 25 L -8 20 Z"
          fill="var(--primary-color)"
        />
        <path
          d="M 8 15 L 12 25 L 8 20 Z"
          fill="var(--primary-color)"
        />
        
        {/* Rocket window */}
        <circle
          cx="0"
          cy="-10"
          r="3"
          fill="var(--accent-color)"
          opacity="0.8"
        />
      </g>

      {/* Motion Lines (Speed Trail) */}
      <g className="motion-lines">
        <line
          x1="350"
          y1="120"
          x2="330"
          y2="140"
          stroke="var(--accent-color)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
        />
        <line
          x1="360"
          y1="130"
          x2="340"
          y2="150"
          stroke="var(--accent-color)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <line
          x1="370"
          y1="140"
          x2="350"
          y2="160"
          stroke="var(--accent-color)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.4"
        />
      </g>

      {/* Process Flow Indicators */}
      <g opacity="0.7">
        {/* Flow arrows */}
        <path
          d="M 160 150 L 180 150"
          stroke="var(--accent-color)"
          strokeWidth="2"
          markerEnd="url(#flow-arrow)"
        />
        <path
          d="M 320 150 L 340 150"
          stroke="var(--accent-color)"
          strokeWidth="2"
          markerEnd="url(#flow-arrow)"
        />
        
        {/* Arrow marker */}
        <defs>
          <marker
            id="flow-arrow"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon
              points="0 0, 8 3, 0 6"
              fill="var(--accent-color)"
            />
          </marker>
        </defs>
      </g>

      {/* Labels */}
      <g>
        {/* Input label */}
        <text
          x="110"
          y="200"
          textAnchor="middle"
          fontSize="12"
          fill="var(--secondary-color)"
          fontWeight="500"
        >
          Complex Tasks
        </text>
        
        {/* Process label */}
        <text
          x="240"
          y="200"
          textAnchor="middle"
          fontSize="12"
          fill="var(--primary-color)"
          fontWeight="600"
        >
          Streamlined Workflow
        </text>
        
        {/* Output label */}
        <text
          x="380"
          y="200"
          textAnchor="middle"
          fontSize="12"
          fill="var(--accent-color)"
          fontWeight="600"
        >
          Fast Launch
        </text>
      </g>

      {/* Process stages */}
      <g opacity="0.8">
        <text
          x="240"
          y="100"
          textAnchor="middle"
          fontSize="10"
          fill="var(--primary-color)"
          fontWeight="500"
        >
          Precision Tools at Work
        </text>
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
          Assembly Line to Launch
        </text>
        <text
          x="250"
          y="50"
          textAnchor="middle"
          fontSize="11"
          fill="var(--foreground-color)"
          opacity="0.8"
        >
          Streamlined Workflow • Precision Tools • Speedy Delivery
        </text>
      </g>

      {/* Performance indicators */}
      <g opacity="0.7">
        {/* Efficiency meter */}
        <rect x="420" y="60" width="60" height="8" rx="4" fill="var(--secondary-color)" fillOpacity="0.3"/>
        <rect x="420" y="60" width="50" height="8" rx="4" fill="var(--accent-color)"/>
        <text x="450" y="55" textAnchor="middle" fontSize="9" fill="var(--accent-color)" fontWeight="600">Efficiency</text>
        
        {/* Speed indicator */}
        <circle cx="430" cy="90" r="3" fill="var(--accent-color)"/>
        <text x="440" y="95" fontSize="9" fill="var(--accent-color)" fontWeight="500">High Speed</text>
      </g>
    </svg>
  );
};

export default AssemblyLineLaunchSVG;