import React from "react";
import { HeroSection } from "@/app/home/HeroSection";
import { FeaturesSection } from "@/app/home/FeaturesSection";
import { HowItWorksSection } from "@/app/home/HowItWorksSection";
import { TestimonialsSection } from "@/app/home/TestimonialsSection";
import { ResourcesSection } from "@/app/home/ResourcesSection";
import { ContactSection } from "@/app/home/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <ResourcesSection />
      <ContactSection />
    </>
  );
}
