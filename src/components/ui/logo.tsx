"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "@/lib/theme-context";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className, width = 177.3, height = 42 }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const logoSrc = resolvedTheme === 'dark'
    ? "/images/logo-dark-mode.png"
    : "/images/logo-img.png";

  return (
    <Image
      src={logoSrc}
      alt="CHKware Logo"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
