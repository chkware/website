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
    variant?: "hero" | "subtle" | "vibrant" | "gradient";
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
    gradient: [
        {
            id: "blob1",
            size: 600,
            color: "bg-indigo-200",
            darkColor: "dark:bg-indigo-900",
            initialX: 20,
            initialY: 15,
            animationDuration: 35,
            delay: 0,
            morphIntensity: "low",
        },
        {
            id: "blob2",
            size: 550,
            color: "bg-teal-200",
            darkColor: "dark:bg-teal-900",
            initialX: 80,
            initialY: 30,
            animationDuration: 30,
            delay: 2,
            morphIntensity: "low",
        },
        {
            id: "blob3",
            size: 500,
            color: "bg-amber-200",
            darkColor: "dark:bg-amber-900",
            initialX: 40,
            initialY: 70,
            animationDuration: 32,
            delay: 4,
            morphIntensity: "low",
        },
        {
            id: "blob4",
            size: 480,
            color: "bg-fuchsia-200",
            darkColor: "dark:bg-fuchsia-900",
            initialX: 65,
            initialY: 85,
            animationDuration: 28,
            delay: 1,
            morphIntensity: "low",
        },
        {
            id: "blob5",
            size: 450,
            color: "bg-lime-200",
            darkColor: "dark:bg-lime-900",
            initialX: 10,
            initialY: 50,
            animationDuration: 33,
            delay: 5,
            morphIntensity: "low",
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
            ease: [0.4, 0, 0.2, 1],
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        },
    }),
};

// Basic float animation for smooth movement
const floatAnimation = "float";

export function AnimatedBackground({
    variant = "hero",
    showSlateTexture = true,
    customBlobs
}: AnimatedBackgroundProps) {
    const blobs = customBlobs || defaultBlobConfigs[variant] || defaultBlobConfigs.hero;



    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden opacity-60 dark:opacity-40 pointer-events-none" style={{ zIndex: -1 }}>

            {/* Animated liquid blobs */}
            {blobs.map((blob) => (
                <motion.div
                    key={blob.id}
                    className={`absolute ${blob.color} ${blob.darkColor} mix-blend-multiply filter blur-3xl`}
                    style={{
                        width: blob.size,
                        height: blob.size,
                        left: `${blob.initialX}%`,
                        top: `${blob.initialY}%`,
                        transform: 'translate(-50%, -50%)',
                        animation: `${floatAnimation} ${blob.animationDuration}s ease-in-out infinite`,
                        animationDelay: `${blob.delay}s`,
                    }}
                    animate={{
                        x: [0, 20, -15, 25, -10, 0],
                        y: [0, -20, 25, -15, 20, 0],
                        scale: [1, 1.05, 0.98, 1.03, 0.99, 1],
                        rotate: [0, 2, -1, 3, -1, 0],
                    }}
                    transition={{
                        duration: blob.animationDuration,
                        delay: blob.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}


        </div>
    );
}