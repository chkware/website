"use client";
import React from "react";
import { motion } from "framer-motion";

interface TrendingBackgroundProps {
  variant: "gradient-mesh" | "particles" | "grid" | "aurora" | "geometric" | "glass-morphism" | "organic-flow" | "holographic" | "wave-distortion" | "matrix-rain" | "floating-orbs";
  interactive?: boolean;
}

export function TrendingBackgrounds({ variant, interactive = false }: TrendingBackgroundProps) {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (!interactive) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  const renderGradientMesh = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      {/* Animated gradient mesh */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(119, 198, 255, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 60% 60%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(119, 198, 255, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.3) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Interactive gradient overlay */}
      {interactive && (
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`
          }}
        />
      )}
    </div>
  );

  const renderParticles = () => {
    const particles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4, // Larger particles (4-12px)
      duration: Math.random() * 15 + 8,
      delay: Math.random() * 3,
    }));

    return (
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
        {/* Base particle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10"></div>
        
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              background: `radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0.4) 50%, transparent 100%)`,
              boxShadow: `0 0 ${particle.size * 2}px rgba(59, 130, 246, 0.3)`,
            }}
            animate={{
              x: [0, Math.random() * 60 - 30, Math.random() * 60 - 30, 0],
              y: [0, Math.random() * 60 - 30, Math.random() * 60 - 30, 0],
              opacity: [0.3, 0.9, 0.5, 0.3],
              scale: [1, 1.3, 0.9, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Connecting lines with better visibility */}
        <svg className="absolute inset-0 w-full h-full">
          {particles.slice(0, 15).map((particle, i) => {
            const nextParticle = particles[(i + 1) % 15];
            const distance = Math.sqrt(
              Math.pow(particle.x - nextParticle.x, 2) + 
              Math.pow(particle.y - nextParticle.y, 2)
            );
            
            // Only draw lines between nearby particles
            if (distance < 30) {
              return (
                <motion.line
                  key={`line-${i}`}
                  x1={`${particle.x}%`}
                  y1={`${particle.y}%`}
                  x2={`${nextParticle.x}%`}
                  y2={`${nextParticle.y}%`}
                  stroke="rgba(59, 130, 246, 0.4)"
                  strokeWidth="1"
                  animate={{
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    delay: i * 0.3,
                    repeat: Infinity,
                  }}
                />
              );
            }
            return null;
          })}
        </svg>

        {/* Interactive mouse effect */}
        {interactive && (
          <motion.div
            className="absolute w-20 h-20 rounded-full pointer-events-none"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
              boxShadow: '0 0 40px rgba(59, 130, 246, 0.3)',
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        )}
      </div>
    );
  };

  const renderGrid = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      {/* Base grid background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-transparent to-slate-100/50 dark:from-slate-900/20 dark:via-transparent dark:to-slate-800/20"></div>
      
      {/* Animated grid lines */}
      <motion.div
        className="absolute inset-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px', '0px 0px'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Pulsing grid intersections */}
      {Array.from({ length: 25 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 6,
            height: 6,
            left: `${(i % 5) * 20 + 10}%`,
            top: `${Math.floor(i / 5) * 20 + 10}%`,
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0.3) 70%, transparent 100%)',
            boxShadow: '0 0 12px rgba(59, 130, 246, 0.4)',
          }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 3,
            delay: i * 0.15,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Interactive grid effect */}
      {interactive && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
            width: '100px',
            height: '100px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
            border: '2px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '50%',
          }}
        />
      )}
    </div>
  );

  const renderAurora = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      {/* Aurora waves */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(45deg, 
              rgba(139, 69, 19, 0.1) 0%, 
              rgba(255, 20, 147, 0.2) 25%, 
              rgba(0, 191, 255, 0.2) 50%, 
              rgba(50, 205, 50, 0.1) 75%, 
              rgba(255, 165, 0, 0.1) 100%
            )
          `,
          filter: 'blur(40px)',
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, 
              rgba(138, 43, 226, 0.1) 0%, 
              rgba(30, 144, 255, 0.15) 30%, 
              transparent 70%
            )
          `,
          filter: 'blur(60px)',
        }}
        animate={{
          x: ['-20%', '20%', '-20%'],
          y: ['-10%', '10%', '-10%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );

  const renderGeometric = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      {/* Base geometric background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-transparent to-purple-50/30 dark:from-indigo-900/10 dark:via-transparent dark:to-purple-900/10"></div>
      
      {/* Floating geometric shapes */}
      {Array.from({ length: 8 }, (_, i) => {
        const size = Math.random() * 80 + 40;
        const colors = [
          'rgba(59, 130, 246, 0.15)', // blue
          'rgba(147, 51, 234, 0.15)', // purple  
          'rgba(236, 72, 153, 0.15)', // pink
          'rgba(16, 185, 129, 0.15)', // emerald
        ];
        
        return (
          <motion.div
            key={i}
            className="absolute backdrop-blur-sm"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              borderRadius: i % 2 === 0 ? '50%' : i % 3 === 0 ? '20%' : '0%',
              background: colors[i % colors.length],
              border: `1px solid ${colors[i % colors.length].replace('0.15', '0.3')}`,
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 ${size/2}px ${colors[i % colors.length].replace('0.15', '0.1')}`,
            }}
            animate={{
              rotate: [0, i % 2 === 0 ? 360 : -360],
              scale: [1, 1.1, 0.9, 1],
              x: [0, Math.random() * 40 - 20, Math.random() * 40 - 20, 0],
              y: [0, Math.random() * 40 - 20, Math.random() * 40 - 20, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 12,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      })}

      {/* Interactive geometric effect */}
      {interactive && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
            width: '80px',
            height: '80px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '2px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '20%',
          }}
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
      )}
    </div>
  );

  // Wave Distortion - Smooth flowing waves
  const renderWaveDistortion = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-950/20 dark:via-purple-950/15 dark:to-pink-950/20"></div>
      
      {/* Flowing waves */}
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-full"
          style={{
            height: `${80 + i * 20}px`,
            top: `${i * 15}%`,
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(59, 130, 246, ${0.1 + i * 0.02}) 25%, 
              rgba(147, 51, 234, ${0.15 + i * 0.02}) 50%, 
              rgba(236, 72, 153, ${0.1 + i * 0.02}) 75%, 
              transparent 100%)`,
            filter: `blur(${20 + i * 5}px)`,
            borderRadius: '50%',
          }}
          animate={{
            x: ['-20%', '20%', '-20%'],
            scaleY: [1, 1.2, 1],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Wave particles */}
      {Array.from({ length: 15 }, (_, i) => (
        <motion.div
          key={`wave-particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 100%)',
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 50 - 25],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Interactive wave effect */}
      {interactive && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(20px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      )}
    </div>
  );

  // Matrix Rain - Digital rain effect
  const renderMatrixRain = () => {
    const columns = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (i * 5) + Math.random() * 3,
      delay: Math.random() * 5,
      speed: 0.5 + Math.random() * 1,
    }));

    return (
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
        {/* Matrix base */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-green-950/10 to-black/20"></div>
        
        {/* Matrix columns */}
        {columns.map((column) => (
          <motion.div
            key={column.id}
            className="absolute"
            style={{
              left: `${column.x}%`,
              width: '2px',
              height: '100%',
              background: `linear-gradient(to bottom, 
                transparent 0%, 
                rgba(0, 255, 0, 0.8) 10%, 
                rgba(0, 255, 0, 0.4) 50%, 
                rgba(0, 255, 0, 0.1) 90%, 
                transparent 100%)`,
              filter: 'blur(0.5px)',
              boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
            }}
            animate={{
              y: ['-100%', '100%'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3 / column.speed,
              repeat: Infinity,
              delay: column.delay,
              ease: "linear"
            }}
          />
        ))}

        {/* Matrix characters */}
        {Array.from({ length: 30 }, (_, i) => (
          <motion.div
            key={`char-${i}`}
            className="absolute text-green-400 font-mono text-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              textShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
            }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, 50],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            {String.fromCharCode(0x30A0 + Math.random() * 96)}
          </motion.div>
        ))}

        {/* Digital glitch effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 0, 0.05) 50%, transparent 100%)',
            width: '200%',
          }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    );
  };

  // Glass Morphism - Premium glass effect
  const renderGlassMorphism = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20"></div>
      
      {/* Glass panels */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute backdrop-blur-md border border-white/20 dark:border-white/10"
          style={{
            width: Math.random() * 300 + 200,
            height: Math.random() * 200 + 150,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            rotate: [0, 2, -2, 0],
            scale: [1, 1.02, 0.98, 1],
            x: [0, 10, -10, 0],
            y: [0, -5, 5, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Floating glass orbs */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full backdrop-blur-sm border border-white/30 dark:border-white/20"
          style={{
            width: Math.random() * 60 + 20,
            height: Math.random() * 60 + 20,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  // Floating Orbs - Elegant floating spheres
  const renderFloatingOrbs = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      {/* Orb base */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/20 via-purple-50/10 to-pink-50/20 dark:from-indigo-950/15 dark:via-purple-950/10 dark:to-pink-950/15"></div>
      
      {/* Large floating orbs */}
      {Array.from({ length: 6 }, (_, i) => {
        const size = 120 + Math.random() * 80;
        const colors = [
          'rgba(59, 130, 246, 0.15)',
          'rgba(147, 51, 234, 0.15)',
          'rgba(236, 72, 153, 0.15)',
          'rgba(16, 185, 129, 0.15)',
          'rgba(245, 158, 11, 0.15)',
          'rgba(239, 68, 68, 0.15)',
        ];
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle at 30% 30%, 
                ${colors[i].replace('0.15', '0.25')} 0%, 
                ${colors[i]} 50%, 
                transparent 100%)`,
              boxShadow: `0 0 ${size/2}px ${colors[i].replace('0.15', '0.1')}`,
              filter: 'blur(1px)',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              x: [0, Math.random() * 60 - 30, Math.random() * 60 - 30, 0],
              y: [0, Math.random() * 60 - 30, Math.random() * 60 - 30, 0],
              scale: [1, 1.1, 0.9, 1],
              opacity: [0.4, 0.7, 0.5, 0.4],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        );
      })}

      {/* Small accent orbs */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={`small-${i}`}
          className="absolute rounded-full"
          style={{
            width: 20 + Math.random() * 30,
            height: 20 + Math.random() * 30,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.1) 70%, transparent 100%)',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Connecting light beams */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        {Array.from({ length: 8 }, (_, i) => {
          const x1 = Math.random() * 100;
          const y1 = Math.random() * 100;
          const x2 = Math.random() * 100;
          const y2 = Math.random() * 100;
          
          return (
            <motion.line
              key={`beam-${i}`}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="rgba(147, 51, 234, 0.3)"
              strokeWidth="1"
              animate={{
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          );
        })}
      </svg>

      {/* Interactive orb effect */}
      {interactive && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
            width: '100px',
            height: '100px',
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)',
            boxShadow: '0 0 50px rgba(147, 51, 234, 0.3)',
          }}
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      )}
    </div>
  );

  // Organic Flow - Natural flowing patterns
  const renderOrganicFlow = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      {/* Organic base */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-cyan-50/50 dark:from-emerald-950/20 dark:via-teal-950/15 dark:to-cyan-950/20"></div>
      
      {/* Flowing organic shapes */}
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: 400 + Math.random() * 200,
            height: 200 + Math.random() * 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `linear-gradient(${Math.random() * 360}deg, 
              rgba(16, 185, 129, 0.1) 0%, 
              rgba(20, 184, 166, 0.15) 50%, 
              rgba(6, 182, 212, 0.1) 100%)`,
            borderRadius: `${50 + Math.random() * 50}% ${50 + Math.random() * 50}% ${50 + Math.random() * 50}% ${50 + Math.random() * 50}%`,
            filter: 'blur(40px)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            borderRadius: [
              `${50 + Math.random() * 50}% ${50 + Math.random() * 50}% ${50 + Math.random() * 50}% ${50 + Math.random() * 50}%`,
              `${30 + Math.random() * 70}% ${30 + Math.random() * 70}% ${30 + Math.random() * 70}% ${30 + Math.random() * 70}%`,
              `${50 + Math.random() * 50}% ${50 + Math.random() * 50}% ${50 + Math.random() * 50}% ${50 + Math.random() * 50}%`,
            ],
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 50 - 25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            delay: i * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Organic particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, transparent 100%)',
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  // Holographic - Futuristic hologram effect
  const renderHolographic = () => (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      {/* Holographic base */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-cyan-900/10"></div>
      
      {/* Holographic scan lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px)',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '0px 20px'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Holographic elements */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute border border-cyan-400/30"
          style={{
            width: Math.random() * 150 + 100,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)',
            borderRadius: '8px',
            transform: 'translate(-50%, -50%)',
            boxShadow: 'inset 0 0 20px rgba(0, 255, 255, 0.1)',
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.02, 1],
            rotateY: [0, 5, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: i * 0.5,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Holographic glitch effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.1) 50%, transparent 100%)',
          width: '200%',
        }}
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );

  const variants = {
    "gradient-mesh": renderGradientMesh,
    "particles": renderParticles,
    "grid": renderGrid,
    "aurora": renderAurora,
    "geometric": renderGeometric,
    "glass-morphism": renderGlassMorphism,
    "organic-flow": renderOrganicFlow,
    "holographic": renderHolographic,
    "wave-distortion": renderWaveDistortion,
    "matrix-rain": renderMatrixRain,
    "floating-orbs": renderFloatingOrbs,
  };

  return variants[variant]();
}