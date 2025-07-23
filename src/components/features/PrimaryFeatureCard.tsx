"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PrimaryFeatureCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  delay?: number;
  reverse?: boolean;
}

export function PrimaryFeatureCard({
  title,
  description,
  image,
  imageAlt,
  delay = 0,
  reverse = false
}: PrimaryFeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: delay * 0.2,
        ease: "easeOut"
      }}
      viewport={{ once: true }}
      className={cn(
        "flex flex-col lg:flex-row items-center gap-8 lg:gap-16",
        reverse && "lg:flex-row-reverse"
      )}
    >
      {/* Content */}
      <div className="flex-1 space-y-6">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
          {title}
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Image */}
      <div className="flex-1">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg"
        >
          <Image
            src={image}
            alt={imageAlt}
            width={600}
            height={400}
            className="w-full h-auto object-cover"
            priority={delay === 0}
          />
          {/* Subtle overlay for better text contrast if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent dark:from-black/20" />
        </motion.div>
      </div>
    </motion.div>
  );
}