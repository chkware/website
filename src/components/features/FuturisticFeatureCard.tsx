"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FuturisticFeatureCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  delay?: number;
  reverse?: boolean;
  variant?: "cyberpunk" | "neon" | "holographic";
}

export function FuturisticFeatureCard({
  title,
  description,
  image,
  imageAlt,
  delay = 0,
  reverse = false,
  variant = "cyberpunk"
}: FuturisticFeatureCardProps) {
  const variants = {
    cyberpunk: {
      container: "bg-gradient-to-br from-slate-900/90 via-purple-900/20 to-cyan-900/30 border-cyan-500/30",
      title: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400",
      description: "text-slate-300",
      imageContainer: "border-cyan-500/50 shadow-cyan-500/25",
      glow: "shadow-2xl shadow-cyan-500/20"
    },
    neon: {
      container: "bg-gradient-to-br from-black/95 via-pink-900/20 to-blue-900/30 border-pink-500/40",
      title: "text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400",
      description: "text-gray-300",
      imageContainer: "border-pink-500/60 shadow-pink-500/30",
      glow: "shadow-2xl shadow-pink-500/25"
    },
    holographic: {
      container: "bg-gradient-to-br from-slate-900/80 via-indigo-900/30 to-emerald-900/20 border-emerald-400/40",
      title: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400",
      description: "text-slate-200",
      imageContainer: "border-emerald-400/50 shadow-emerald-400/25",
      glow: "shadow-2xl shadow-emerald-400/20"
    }
  };

  const currentVariant = variants[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: delay * 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      viewport={{ once: true }}
      className={cn(
        "flex flex-col lg:flex-row items-center gap-12 lg:gap-20",
        reverse && "lg:flex-row-reverse"
      )}
    >
      {/* Content */}
      <div className="flex-1 space-y-8">
        <motion.div
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: delay * 0.3 + 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className={cn(
            "text-3xl md:text-4xl font-bold leading-tight mb-6",
            currentVariant.title
          )}>
            {title}
          </h3>
          <p className={cn(
            "text-lg leading-relaxed",
            currentVariant.description
          )}>
            {description}
          </p>
        </motion.div>

        {/* Futuristic accent lines */}
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            transition={{ duration: 0.8, delay: delay * 0.3 + 0.4 }}
            viewport={{ once: true }}
            className={cn(
              "h-0.5 bg-gradient-to-r",
              variant === "cyberpunk" && "from-cyan-400 to-blue-500",
              variant === "neon" && "from-pink-400 to-purple-500",
              variant === "holographic" && "from-emerald-400 to-cyan-500"
            )}
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: delay * 0.3 + 0.6 }}
            viewport={{ once: true }}
            className={cn(
              "text-xs font-mono uppercase tracking-wider",
              variant === "cyberpunk" && "text-cyan-400",
              variant === "neon" && "text-pink-400",
              variant === "holographic" && "text-emerald-400"
            )}
          >
            NEXT-GEN TECHNOLOGY
          </motion.div>
        </div>
      </div>

      {/* Image */}
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: reverse ? -15 : 15 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, delay: delay * 0.3 + 0.3 }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.05, 
            rotateY: reverse ? -5 : 5,
            transition: { duration: 0.3 }
          }}
          className={cn(
            "relative rounded-2xl overflow-hidden border-2 backdrop-blur-sm",
            currentVariant.imageContainer,
            currentVariant.glow
          )}
          style={{ perspective: "1000px" }}
        >
          <Image
            src={image}
            alt={imageAlt}
            width={600}
            height={400}
            className="w-full h-auto object-cover"
            priority={delay === 0}
          />
          
          {/* Holographic overlay effect */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-20",
            variant === "cyberpunk" && "from-cyan-500/30 via-transparent to-purple-500/30",
            variant === "neon" && "from-pink-500/30 via-transparent to-blue-500/30",
            variant === "holographic" && "from-emerald-500/30 via-transparent to-cyan-500/30"
          )} />
          
          {/* Scanning line effect */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "linear"
            }}
            className={cn(
              "absolute inset-y-0 w-1 opacity-60",
              variant === "cyberpunk" && "bg-gradient-to-b from-transparent via-cyan-400 to-transparent",
              variant === "neon" && "bg-gradient-to-b from-transparent via-pink-400 to-transparent",
              variant === "holographic" && "bg-gradient-to-b from-transparent via-emerald-400 to-transparent"
            )}
          />

          {/* Corner accents */}
          <div className={cn(
            "absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2",
            variant === "cyberpunk" && "border-cyan-400",
            variant === "neon" && "border-pink-400",
            variant === "holographic" && "border-emerald-400"
          )} />
          <div className={cn(
            "absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2",
            variant === "cyberpunk" && "border-cyan-400",
            variant === "neon" && "border-pink-400",
            variant === "holographic" && "border-emerald-400"
          )} />
          <div className={cn(
            "absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2",
            variant === "cyberpunk" && "border-cyan-400",
            variant === "neon" && "border-pink-400",
            variant === "holographic" && "border-emerald-400"
          )} />
          <div className={cn(
            "absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2",
            variant === "cyberpunk" && "border-cyan-400",
            variant === "neon" && "border-pink-400",
            variant === "holographic" && "border-emerald-400"
          )} />
        </motion.div>
      </div>
    </motion.div>
  );
}