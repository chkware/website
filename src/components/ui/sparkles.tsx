"use client";
import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface SparklesProps {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
}

export const SparklesCore = (props: SparklesProps) => {
  const {
    id,
    className,
    background = "transparent",
    minSize = 0.4,
    maxSize = 1,
    particleDensity = 1200,
    particleColor = "#FFF",
  } = props;
  const generatedId = useId();
  const sparkleId = id || generatedId;

  return (
    <div className={cn("h-full w-full", className)}>
      <svg
        className="h-full w-full"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`sparkle-pattern-${sparkleId}`}
            x="0"
            y="0"
            width="400"
            height="400"
            patternUnits="userSpaceOnUse"
          >
            {Array.from({ length: Math.floor(particleDensity / 100) }).map(
              (_, i) => (
                <circle
                  key={i}
                  cx={Math.random() * 400}
                  cy={Math.random() * 400}
                  r={Math.random() * (maxSize - minSize) + minSize}
                  fill={particleColor}
                  opacity={Math.random() * 0.8 + 0.2}
                >
                  <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur={`${Math.random() * 3 + 1}s`}
                    repeatCount="indefinite"
                    begin={`${Math.random() * 2}s`}
                  />
                </circle>
              )
            )}
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#sparkle-pattern-${sparkleId})`}
          style={{ background }}
        />
      </svg>
    </div>
  );
};

export const Sparkles = ({ children, ...props }: SparklesProps & { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <SparklesCore {...props} />
      <div className="relative z-10">{children}</div>
    </div>
  );
};