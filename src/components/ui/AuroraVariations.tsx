"use client";
import React from "react";
import { motion } from "framer-motion";

interface AuroraVariationsProps {
  variant: "aurora-1" | "aurora-2" | "aurora-3" | "aurora-4" | "aurora-5" | "aurora-6" | "aurora-7" | "aurora-8" | "aurora-9" | "aurora-10" | "aurora-11" | "aurora-12" | "aurora-13" | "aurora-14" | "aurora-15" | "aurora-16" | "aurora-17" | "aurora-18" | "aurora-19" | "aurora-20";
  interactive?: boolean;
}

export function AuroraVariations({ variant, interactive = false }: AuroraVariationsProps) {
  // Interactive functionality can be implemented later if needed
  React.useEffect(() => {
    // Placeholder for interactive functionality
  }, [interactive]);

  // Aurora 1: Classic Northern Lights
  const renderAurora1 = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-purple-950/10 to-black/5"></div>

      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${45 + i * 30}deg, 
              rgba(34, 197, 94, 0.1) 0%, 
              rgba(59, 130, 246, 0.15) 30%, 
              rgba(147, 51, 234, 0.1) 60%, 
              rgba(236, 72, 153, 0.05) 100%)`,
            filter: `blur(${40 + i * 20}px)`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  // Aurora 2: Plasma Waves
  const renderAurora2 = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/10 to-pink-950/10"></div>

      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: '200%',
            height: '100px',
            left: '-50%',
            top: `${20 + i * 20}%`,
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(236, 72, 153, 0.3) 25%, 
              rgba(147, 51, 234, 0.4) 50%, 
              rgba(59, 130, 246, 0.3) 75%, 
              transparent 100%)`,
            filter: 'blur(30px)',
            borderRadius: '50%',
          }}
          animate={{
            x: ['-100%', '100%'],
            scaleY: [1, 1.5, 1],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );

  // Aurora 3: Cosmic Storm
  const renderAurora3 = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-purple-950/10 to-slate-950/20"></div>

      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, 
            rgba(139, 69, 19, 0.1) 0deg,
            rgba(255, 20, 147, 0.2) 60deg,
            rgba(0, 191, 255, 0.25) 120deg,
            rgba(50, 205, 50, 0.15) 180deg,
            rgba(255, 165, 0, 0.1) 240deg,
            rgba(147, 51, 234, 0.2) 300deg,
            rgba(139, 69, 19, 0.1) 360deg)`,
          filter: 'blur(60px)',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Cosmic particles */}
      {Array.from({ length: 15 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 100%)',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );

  // Aurora 4: Electric Dreams
  const renderAurora4 = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/10 to-blue-950/10"></div>

      {/* Electric bolts */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: '2px',
            height: '100%',
            left: `${10 + i * 15}%`,
            background: `linear-gradient(to bottom, 
              transparent 0%, 
              rgba(0, 255, 255, 0.8) 20%, 
              rgba(147, 51, 234, 0.6) 50%, 
              rgba(0, 255, 255, 0.8) 80%, 
              transparent 100%)`,
            filter: 'blur(2px)',
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scaleY: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Electric glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
    </div>
  );

  // Aurora 5: Sunset Aurora
  const renderAurora5 = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 bg-gradient-to-t from-orange-950/10 via-red-950/5 to-yellow-950/10"></div>

      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: '100%',
            height: `${60 + i * 20}px`,
            top: `${10 + i * 15}%`,
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(255, 165, 0, 0.2) 20%, 
              rgba(255, 69, 0, 0.3) 40%, 
              rgba(255, 20, 147, 0.25) 60%, 
              rgba(147, 51, 234, 0.2) 80%, 
              transparent 100%)`,
            filter: `blur(${25 + i * 10}px)`,
            borderRadius: '50%',
          }}
          animate={{
            x: ['-20%', '20%', '-20%'],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  // Aurora 6: Quantum Field
  const renderAurora6 = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/15 to-purple-950/15"></div>

      {/* Quantum waves */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
            left: '50%',
            top: '50%',
            border: `1px solid rgba(147, 51, 234, ${0.3 - i * 0.03})`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Quantum particles */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, 
            rgba(147, 51, 234, 0.2) 0%, 
            rgba(59, 130, 246, 0.1) 30%, 
            transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
        }}
      />
    </div>
  );

  // Aurora 7: Nebula Storm
  const renderAurora7 = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/10 via-pink-950/5 to-blue-950/10"></div>

      {/* Nebula clouds */}
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: `${300 + i * 100}px`,
            height: `${200 + i * 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(ellipse, 
              rgba(147, 51, 234, 0.15) 0%, 
              rgba(236, 72, 153, 0.1) 40%, 
              rgba(59, 130, 246, 0.05) 70%, 
              transparent 100%)`,
            filter: `blur(${40 + i * 15}px)`,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -20, 30, 0],
            scale: [1, 1.2, 0.9, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 25 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Stellar dust */}
      {Array.from({ length: 30 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'rgba(255, 255, 255, 0.6)',
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.4)',
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );



  // Aurora 8: Ocean Breeze - Blue/Teal/Cyan
  const renderAurora8 = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/20 via-blue-50/10 to-teal-50/20 dark:from-cyan-950/15 dark:via-blue-950/10 dark:to-teal-950/15"></div>

      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${60 + i * 45}deg, 
              rgba(6, 182, 212, 0.15) 0%, 
              rgba(59, 130, 246, 0.2) 40%, 
              rgba(20, 184, 166, 0.15) 80%, 
              transparent 100%)`,
            filter: `blur(${35 + i * 10}px)`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 18 + i * 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  // Aurora 9: Forest Glow - Green/Emerald/Lime
  const renderAurora9 = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 to-lime-50/20 dark:from-emerald-950/15 dark:to-lime-950/15"></div>

      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: '100%',
            height: `${70 + i * 15}px`,
            top: `${i * 18}%`,
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(34, 197, 94, 0.2) 25%, 
              rgba(16, 185, 129, 0.25) 50%, 
              rgba(132, 204, 22, 0.2) 75%, 
              transparent 100%)`,
            filter: `blur(${25 + i * 8}px)`,
            borderRadius: '50%',
          }}
          animate={{
            x: ['-15%', '15%', '-15%'],
            scaleY: [1, 1.3, 1],
          }}
          transition={{
            duration: 14 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
  );

  // Aurora 10: Rose Gold - Pink/Rose/Gold
  const renderAurora10 = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/20 via-pink-50/15 to-amber-50/20 dark:from-rose-950/15 dark:via-pink-950/10 dark:to-amber-950/15"></div>

      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, 
            rgba(236, 72, 153, 0.15) 0deg,
            rgba(251, 113, 133, 0.2) 90deg,
            rgba(245, 158, 11, 0.15) 180deg,
            rgba(236, 72, 153, 0.15) 270deg,
            rgba(236, 72, 153, 0.15) 360deg)`,
          filter: 'blur(45px)',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 60 + 30,
            height: Math.random() * 60 + 30,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );

  // Aurora 11: Midnight Blue - Deep Blue/Navy/Indigo
  const renderAurora11 = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-blue-950/15 to-slate-950/20"></div>

      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at ${30 + i * 20}% ${40 + i * 15}%, 
              rgba(30, 58, 138, 0.2) 0%, 
              rgba(67, 56, 202, 0.15) 40%, 
              rgba(15, 23, 42, 0.1) 70%, 
              transparent 100%)`,
            filter: `blur(${50 + i * 15}px)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  // Aurora 12: Coral Reef - Coral/Orange/Peach
  const renderAurora12 = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 via-red-50/15 to-pink-50/20 dark:from-orange-950/15 dark:via-red-950/10 dark:to-pink-950/15"></div>

      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: `${150 + i * 30}px`,
            height: `${100 + i * 20}px`,
            left: `${10 + i * 15}%`,
            top: `${5 + i * 15}%`,
            background: `radial-gradient(ellipse, 
              rgba(251, 146, 60, 0.2) 0%, 
              rgba(239, 68, 68, 0.15) 50%, 
              rgba(236, 72, 153, 0.1) 80%, 
              transparent 100%)`,
            filter: `blur(${20 + i * 5}px)`,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -10, 15, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 16 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1,
          }}
        />
      ))}
    </div>
  );

  // Aurora 13: Arctic Ice - Light Blue/White/Silver
  const renderAurora13 = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/30 via-slate-50/20 to-blue-50/30 dark:from-sky-950/20 dark:via-slate-950/15 dark:to-blue-950/20"></div>

      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: '100%',
            height: `${60 + i * 20}px`,
            top: `${20 + i * 20}%`,
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(186, 230, 253, 0.3) 20%, 
              rgba(241, 245, 249, 0.4) 50%, 
              rgba(219, 234, 254, 0.3) 80%, 
              transparent 100%)`,
            filter: `blur(${15 + i * 5}px)`,
            borderRadius: '50%',
          }}
          animate={{
            x: ['-10%', '10%', '-10%'],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  // Aurora 14: Lavender Dreams - Purple/Lavender/Violet
  const renderAurora14 = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 via-violet-50/15 to-fuchsia-50/20 dark:from-purple-950/15 dark:via-violet-950/10 dark:to-fuchsia-950/15"></div>

      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 30% 70%, 
            rgba(147, 51, 234, 0.2) 0%, 
            rgba(139, 92, 246, 0.15) 30%, 
            rgba(196, 181, 253, 0.1) 60%, 
            transparent 100%)`,
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 70% 30%, 
            rgba(196, 181, 253, 0.15) 0%, 
            rgba(147, 51, 234, 0.1) 50%, 
            transparent 100%)`,
          filter: 'blur(35px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );

  // Aurora 15: Golden Hour - Gold/Yellow/Amber
  const renderAurora15 = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/25 via-yellow-50/20 to-orange-50/25 dark:from-amber-950/20 dark:via-yellow-950/15 dark:to-orange-950/20"></div>

      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: `${200 + i * 40}px`,
            height: `${80 + i * 15}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `linear-gradient(${Math.random() * 360}deg, 
              rgba(245, 158, 11, 0.2) 0%, 
              rgba(251, 191, 36, 0.25) 50%, 
              rgba(252, 211, 77, 0.2) 100%)`,
            filter: `blur(${25 + i * 8}px)`,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  );

  // Aurora 16: Mint Fresh - Mint/Green/Teal
  const renderAurora16 = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 via-teal-50/15 to-cyan-50/20 dark:from-emerald-950/15 dark:via-teal-950/10 dark:to-cyan-950/15"></div>

      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: '100%',
            height: `${50 + i * 12}px`,
            top: `${i * 16}%`,
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(16, 185, 129, 0.15) 30%, 
              rgba(20, 184, 166, 0.2) 50%, 
              rgba(6, 182, 212, 0.15) 70%, 
              transparent 100%)`,
            filter: `blur(${18 + i * 4}px)`,
            borderRadius: '50%',
          }}
          animate={{
            x: ['-20%', '20%', '-20%'],
            scaleY: [1, 1.4, 1],
          }}
          transition={{
            duration: 13 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.7,
          }}
        />
      ))}
    </div>
  );

  // Aurora 17: Crimson Fire - Red/Crimson/Burgundy
  const renderAurora17 = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-rose-950/15 to-pink-950/20"></div>

      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${120 + i * 60}deg, 
              rgba(220, 38, 38, 0.15) 0%, 
              rgba(239, 68, 68, 0.2) 40%, 
              rgba(190, 18, 60, 0.15) 80%, 
              transparent 100%)`,
            filter: `blur(${40 + i * 12}px)`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 20 + i * 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Fire particles */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={`fire-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.8) 0%, transparent 100%)',
            boxShadow: '0 0 10px rgba(239, 68, 68, 0.4)',
          }}
          animate={{
            y: [0, -40],
            opacity: [0.8, 0],
            scale: [1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );

  // Aurora 18: Monochrome - Black/White/Gray
  const renderAurora18 = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/30 via-slate-100/20 to-zinc-100/30 dark:from-gray-900/30 dark:via-slate-900/20 dark:to-zinc-900/30"></div>

      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: `${180 + i * 35}px`,
            height: `${120 + i * 25}px`,
            left: `${15 + i * 18}%`,
            top: `${10 + i * 18}%`,
            background: `radial-gradient(ellipse, 
              rgba(0, 0, 0, 0.1) 0%, 
              rgba(100, 116, 139, 0.15) 40%, 
              rgba(148, 163, 184, 0.1) 70%, 
              transparent 100%)`,
            filter: `blur(${30 + i * 8}px)`,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: [0, 25, -20, 0],
            y: [0, -15, 20, 0],
            scale: [1, 1.1, 0.95, 1],
            opacity: [0.3, 0.6, 0.4, 0.3],
          }}
          transition={{
            duration: 18 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.2,
          }}
        />
      ))}
    </div>
  );

  // Aurora 19: Tropical Sunset - Orange/Pink/Yellow
  const renderAurora19 = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/25 via-pink-50/20 to-yellow-50/25 dark:from-orange-950/20 dark:via-pink-950/15 dark:to-yellow-950/20"></div>

      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(45deg, 
            rgba(251, 146, 60, 0.2) 0%, 
            rgba(236, 72, 153, 0.25) 30%, 
            rgba(251, 191, 36, 0.2) 60%, 
            rgba(252, 165, 165, 0.15) 100%)`,
          filter: 'blur(50px)',
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: `${80 + Math.random() * 60}px`,
            height: `${60 + Math.random() * 40}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(ellipse, 
              rgba(251, 146, 60, 0.3) 0%, 
              rgba(236, 72, 153, 0.2) 60%, 
              transparent 100%)`,
            filter: `blur(${15 + Math.random() * 10}px)`,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );

  // Aurora 20: Deep Space - Dark Purple/Black/Blue
  const renderAurora20 = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/25 via-purple-950/20 to-black/30"></div>

      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at ${40 + i * 20}% ${30 + i * 25}%, 
              rgba(67, 56, 202, 0.15) 0%, 
              rgba(30, 27, 75, 0.2) 40%, 
              rgba(0, 0, 0, 0.1) 70%, 
              transparent 100%)`,
            filter: `blur(${60 + i * 20}px)`,
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.7, 0.4],
            rotate: [0, 120, 240, 360],
          }}
          transition={{
            duration: 25 + i * 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Stars */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.6)',
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );

  const variants = {
    "aurora-1": renderAurora1,
    "aurora-2": renderAurora2,
    "aurora-3": renderAurora3,
    "aurora-4": renderAurora4,
    "aurora-5": renderAurora5,
    "aurora-6": renderAurora6,
    "aurora-7": renderAurora7,
    "aurora-8": renderAurora8,
    "aurora-9": renderAurora9,
    "aurora-10": renderAurora10,
    "aurora-11": renderAurora11,
    "aurora-12": renderAurora12,
    "aurora-13": renderAurora13,
    "aurora-14": renderAurora14,
    "aurora-15": renderAurora15,
    "aurora-16": renderAurora16,
    "aurora-17": renderAurora17,
    "aurora-18": renderAurora18,
    "aurora-19": renderAurora19,
    "aurora-20": renderAurora20,
  };

  return variants[variant]();
}