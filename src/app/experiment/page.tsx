import React from "react";
import { ImprovedHeroSection } from "./ImprovedHeroSection";
import { PrimaryFeaturesSection } from "@/app/home/PrimaryFeaturesSection";
import { ImprovedFeaturesSection } from "./ImprovedFeaturesSection";
import { ImprovedHowItWorksSection } from "./ImprovedHowItWorksSection";
import { TestimonialShowcase } from "./TestimonialShowcase";
import { ContactSection } from "@/app/home/ContactSection";

export default function ExperimentPage() {
  return (
    <>
      <ImprovedHeroSection />
      <PrimaryFeaturesSection />
      <ImprovedFeaturesSection />
      <ImprovedHowItWorksSection />
      <TestimonialShowcase />
      <ContactSection />
    </>
  );
}