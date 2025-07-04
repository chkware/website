"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactElement & { props: { className?: string } };
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
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className={cn(
        "h-full overflow-hidden border border-gray-100 dark:border-gray-800",
        "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-8",
        "transition-all duration-300 hover:border-gray-100 dark:hover:border-gray-700",
        "group relative",
        "flex flex-col",
        className
      )}>
        {/* Background effect */}
        <div className="absolute inset-0 bg-white dark:bg-gray-900 -z-10" />

        {/* Icon container */}
        {icon && (
          <div className="mb-6 relative">
            {/* Icon with no background or shadow */}
            <div className="text-gray-600 dark:text-gray-300">
              {React.cloneElement(icon, { className: 'h-16 w-16' })}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="space-y-3 flex-grow">
          <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>

      </Card>
    </motion.div>
  );
}
