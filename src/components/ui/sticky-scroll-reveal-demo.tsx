"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

interface StickyScrollRevealDemoProps {
  content: {
    title: string;
    description: string;
    content: React.ReactNode;
  }[];
}

export default function StickyScrollRevealDemo({ content }: StickyScrollRevealDemoProps) {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}