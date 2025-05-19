import React from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: HeadingLevel;
  children: React.ReactNode;
}

export function Heading({
                          level = 2,
                          as,
                          children,
                          className,
                          ...props
                        }: HeadingProps) {
  const Tag = `h${as || level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  const styles: Record<HeadingLevel, string> = {
    1: "text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight",
    2: "text-3xl md:text-4xl font-bold tracking-tight",
    3: "text-2xl md:text-3xl font-semibold tracking-tight",
    4: "text-xl font-semibold tracking-tight",
    5: "text-lg font-medium",
    6: "text-base font-medium",
  };

  return (
    <Tag className={cn(styles[level], className)} {...props}>
      {children}
    </Tag>
  );
}
