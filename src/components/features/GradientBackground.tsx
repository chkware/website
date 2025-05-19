import React from "react";
import { cn } from "@/lib/utils";

interface GradientBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "blue" | "purple" | "mixed";
  intensity?: "light" | "medium" | "strong";
  children: React.ReactNode;
}

export function GradientBackground({
  variant = "mixed",
  intensity = "medium",
  children,
  className,
  ...props
}: GradientBackgroundProps) {
  const gradients = {
    blue: "from-blue-50 via-blue-100 to-transparent",
    purple: "from-purple-50 via-purple-100 to-transparent",
    mixed: "from-blue-50 to-purple-50",
  };

  const intensities = {
    light: "opacity-30 blur-2xl",
    medium: "opacity-50 blur-3xl",
    strong: "opacity-70 blur-3xl",
  };

  return (
    <div className="relative">
      <div className={cn("absolute -z-10 inset-0", className)} {...props}>
        <div
          className={cn(
            "absolute inset-0 rounded-[48px] bg-gradient-to-r",
            gradients[variant],
            intensities[intensity]
          )}
        />
      </div>
      {children}
    </div>
  );
}
