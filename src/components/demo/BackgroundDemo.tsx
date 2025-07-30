"use client";
import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Spotlight } from "@/components/ui/spotlight";
import { Meteors } from "@/components/ui/meteors";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Button } from "@/components/ui/button";

type BackgroundType = "current" | "beams" | "spotlight" | "meteors" | "combined";

export function BackgroundDemo() {
  const [activeBackground, setActiveBackground] = useState<BackgroundType>("current");

  const renderBackground = () => {
    switch (activeBackground) {
      case "current":
        return <AnimatedBackground variant="hero" showSlateTexture={true} />;
      case "beams":
        return <BackgroundBeams className="opacity-30" />;
      case "spotlight":
        return (
          <div className="absolute inset-0 bg-black/20">
            <Spotlight className="top-40 left-0 md:left-60 md:-top-20" fill="white" />
          </div>
        );
      case "meteors":
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800 opacity-20">
            <Meteors number={30} />
          </div>
        );
      case "combined":
        return (
          <>
            <BackgroundBeams className="opacity-20" />
            <div className="absolute inset-0">
              <Spotlight className="top-40 left-0 md:left-60 md:-top-20" fill="blue" />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center z-0">
      {renderBackground()}
      
      <Container size="large" className="relative z-10">
        <div className="text-center space-y-8">
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-black dark:text-white">
            Background Demo
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose different background options to see how they look with the hero content.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant={activeBackground === "current" ? "default" : "outline"}
              onClick={() => setActiveBackground("current")}
            >
              Current
            </Button>
            <Button 
              variant={activeBackground === "beams" ? "default" : "outline"}
              onClick={() => setActiveBackground("beams")}
            >
              Background Beams
            </Button>
            <Button 
              variant={activeBackground === "spotlight" ? "default" : "outline"}
              onClick={() => setActiveBackground("spotlight")}
            >
              Spotlight
            </Button>
            <Button 
              variant={activeBackground === "meteors" ? "default" : "outline"}
              onClick={() => setActiveBackground("meteors")}
            >
              Meteors
            </Button>
            <Button 
              variant={activeBackground === "combined" ? "default" : "outline"}
              onClick={() => setActiveBackground("combined")}
            >
              Combined
            </Button>
          </div>

          <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <h3 className="text-lg font-semibold mb-2">Current Selection: {activeBackground}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {activeBackground === "current" && "Original animated liquid background with slate texture"}
              {activeBackground === "beams" && "Flowing beam lines with gradient effects"}
              {activeBackground === "spotlight" && "Soft spotlight effect with blur"}
              {activeBackground === "meteors" && "Animated meteor shower effect"}
              {activeBackground === "combined" && "Combination of beams and spotlight"}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}