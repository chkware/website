"use client";
import React from "react";
import { motion } from "framer-motion";

interface BlobConfig {
    id: string;
    size: number;
    color: string;
    darkColor: string;
    initialX: number;
    initialY: number;
    animationDuration: number;
    delay: number;
    morphIntensity?: "low" | "medium" | "high";
}

interface AnimatedBackgroundProps {
    variant?: "hero" | "subtle" | "vibrant";
    showSlateTexture?: boolean;
    customBlobs?: BlobConfig[];
}

const defaultBlobConfigs: Record<string, BlobConfig[]> = {
    hero: [
        {
            id: "blob1",
            size: 384, // w-96
            color: "bg-blue-200",
            darkColor: "dark:bg-blue-900",
            initialX: 25, // left-1/4
            initialY: 25, // top-1/4
            animationDuration: 20,
            delay: 0,
            morphIntensity: "high",
        },
        {
            id: "blob2",
            size: 384,
            color: "bg-purple-200",
            darkColor: "dark:bg-purple-900",
            initialX: 75, // right-1/4
            initialY: 33, // top-1/3
            animationDuration: 25,
            delay: 2,
            morphIntensity: "high",
        },
        {
            id: "blob3",
            size: 256, // w-64
            color: "bg-pink-200",
            darkColor: "dark:bg-pink-900",
            initialX: 60,
            initialY: 70,
            animationDuration: 18,
            delay: 4,
            morphIntensity: "medium",
        },
        {
            id: "blob4",
            size: 320, // w-80
            color: "bg-cyan-200",
            darkColor: "dark:bg-cyan-900",
            initialX: 10,
            initialY: 60,
            animationDuration: 22,
            delay: 1,
            morphIntensity: "high",
        },
        {
            id: "blob5",
            size: 200, // w-50
            color: "bg-emerald-200",
            darkColor: "dark:bg-emerald-900",
            initialX: 85,
            initialY: 80,
            animationDuration: 16,
            delay: 6,
            morphIntensity: "medium",
        },
    ],
    subtle: [
        {
            id: "blob1",
            size: 320,
            color: "bg-gray-200",
            darkColor: "dark:bg-gray-800",
            initialX: 20,
            initialY: 30,
            animationDuration: 25,
            delay: 0,
            morphIntensity: "low",
        },
        {
            id: "blob2",
            size: 256,
            color: "bg-gray-300",
            darkColor: "dark:bg-gray-700",
            initialX: 80,
            initialY: 40,
            animationDuration: 30,
            delay: 3,
            morphIntensity: "low",
        },
    ],
    vibrant: [
        {
            id: "blob1",
            size: 400,
            color: "bg-orange-200",
            darkColor: "dark:bg-orange-900",
            initialX: 15,
            initialY: 20,
            animationDuration: 15,
            delay: 0,
            morphIntensity: "high",
        },
        {
            id: "blob2",
            size: 350,
            color: "bg-emerald-200",
            darkColor: "dark:bg-emerald-900",
            initialX: 70,
            initialY: 25,
            animationDuration: 20,
            delay: 1,
            morphIntensity: "high",
        },
        {
            id: "blob3",
            size: 300,
            color: "bg-violet-200",
            darkColor: "dark:bg-violet-900",
            initialX: 50,
            initialY: 65,
            animationDuration: 18,
            delay: 2,
            morphIntensity: "medium",
        },
        {
            id: "blob4",
            size: 280,
            color: "bg-rose-200",
            darkColor: "dark:bg-rose-900",
            initialX: 30,
            initialY: 75,
            animationDuration: 24,
            delay: 3,
            morphIntensity: "high",
        },
    ],
};

// Enhanced floating animation variants for ultra-liquid movement
const floatingVariants = {
    animate: (custom: { duration: number; delay: number; intensity?: string }) => ({
        x: [0, 30, -20, 40, -15, 0],
        y: [0, -25, 35, -20, 30, 0],
        scale: [1, 1.1, 0.9, 1.15, 0.95, 1],
        rotate: [0, 5, -3, 8, -2, 0],
        borderRadius: [
            "50%",
            "60% 40% 30% 70%",
            "40% 60% 70% 30%",
            "55% 45% 35% 65%",
            "45% 55% 50% 50%",
            "50%"
        ],
        transition: {
            duration: custom.duration,
            delay: custom.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        },
    }),
};

// Enhanced CSS animation names for different liquid movements
const liquidAnimations = [
    "liquidFloat1", "liquidFloat2", "liquidFloat3", "liquidFloat4",
    "liquidMorph1", "liquidMorph2", "liquidPulse1", "liquidPulse2"
];

export function AnimatedBackground({
    variant = "hero",
    showSlateTexture = true,
    customBlobs
}: AnimatedBackgroundProps) {
    const blobs = customBlobs || defaultBlobConfigs[variant] || defaultBlobConfigs.hero;

    // Generate random positions for particles
    const generateParticles = () => {
        return Array.from({ length: 8 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 15 + 10,
            delay: Math.random() * 8,
        }));
    };

    const particles = React.useMemo(generateParticles, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden opacity-60 dark:opacity-40 pointer-events-none" style={{ zIndex: -1 }}>
            {/* Enhanced Slate texture background with depth */}
            {showSlateTexture && (
                <>
                    {/* Base slate texture */}
                    <div
                        className="absolute inset-0 opacity-30 dark:opacity-15"
                        style={{
                            backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(148, 163, 184, 0.12) 0%, transparent 60%),
                radial-gradient(circle at 75% 75%, rgba(100, 116, 139, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 50% 10%, rgba(71, 85, 105, 0.06) 0%, transparent 40%),
                linear-gradient(45deg, rgba(148, 163, 184, 0.04) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(100, 116, 139, 0.04) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(148, 163, 184, 0.03) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(100, 116, 139, 0.03) 75%)
              `,
                            backgroundSize: '120px 120px, 160px 160px, 200px 200px, 40px 40px, 40px 40px, 40px 40px, 40px 40px',
                            backgroundPosition: '0 0, 80px 80px, 40px 20px, 0 0, 20px 20px, 20px 20px, 40px 40px'
                        }}
                    />

                    {/* Subtle noise texture overlay */}
                    <div
                        className="absolute inset-0 opacity-20 dark:opacity-10 mix-blend-overlay"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                            backgroundSize: '180px 180px'
                        }}
                    />

                    {/* Animated subtle grain */}
                    <motion.div
                        className="absolute inset-0 opacity-10 dark:opacity-5"
                        animate={{
                            backgroundPosition: ['0px 0px', '100px 100px', '0px 0px'],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            backgroundImage: `radial-gradient(circle, rgba(148, 163, 184, 0.3) 1px, transparent 1px)`,
                            backgroundSize: '50px 50px'
                        }}
                    />
                </>
            )}

            {/* Animated liquid blobs */}
            {blobs.map((blob, index) => (
                <motion.div
                    key={blob.id}
                    className={`absolute ${blob.color} ${blob.darkColor} mix-blend-multiply filter blur-3xl`}
                    style={{
                        width: blob.size,
                        height: blob.size,
                        left: `${blob.initialX}%`,
                        top: `${blob.initialY}%`,
                        transform: 'translate(-50%, -50%)',
                        animation: `${liquidAnimations[index % liquidAnimations.length]} ${blob.animationDuration}s ease-in-out infinite`,
                        animationDelay: `${blob.delay}s`,
                    }}
                    variants={floatingVariants}
                    animate="animate"
                    custom={{
                        duration: blob.animationDuration,
                        delay: blob.delay
                    }}
                />
            ))}

            {/* Additional floating particles for extra life */}
            {particles.map((particle) => (
                <motion.div
                    key={`particle-${particle.id}`}
                    className="absolute bg-white/20 dark:bg-white/10 rounded-full"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                    }}
                    animate={{
                        x: [0, Math.random() * 80 - 40],
                        y: [0, Math.random() * 80 - 40],
                        opacity: [0.1, 0.6, 0.1],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}