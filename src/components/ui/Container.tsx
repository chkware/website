import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "default" | "small" | "large" | "blog";
}

export function Container({
  children,
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        {
          "max-w-5xl": size === "small",
          "max-w-6xl": size === "default",
          "max-w-7xl": size === "large",
          "max-w-3xl": size === "blog",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
