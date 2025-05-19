"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FeatureCard({
  title,
  description,
  icon,
  className,
  delay = 0
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay * 0.1,
        ease: "easeOut"
      }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className={cn(
        "h-full overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6",
        "transition-all duration-300 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700",
        "group relative",
        className
      )}>
        {/* Gradient accent */}
        <div className="absolute inset-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

        {/* Icon container */}
        {icon && (
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors duration-300">
            {icon}
          </div>
        )}

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
        </div>

        {/* Hover indicator */}
        <div className="mt-6 flex items-center text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Learn more
          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Card>
    </motion.div>
  );
}
