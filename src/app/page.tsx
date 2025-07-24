import React from "react";
import { HeroSection } from "@/app/home/HeroSection";
import { PrimaryFeaturesSection } from "@/app/home/PrimaryFeaturesSection";
import { FeaturesSection } from "@/app/home/FeaturesSection";
import { HowItWorksSection } from "@/app/home/HowItWorksSection";
import { TestimonialsSection } from "@/app/home/TestimonialsSection";
import { ResourcesSection } from "@/app/home/ResourcesSection";
import { ContactSection } from "@/app/home/ContactSection";
import { HomePageStructuredData } from "@/components/seo/StructuredData";


export default function Home() {
  return (
    <>
      <HomePageStructuredData />
      <HeroSection />
      <div id="features">
        <PrimaryFeaturesSection />
        <FeaturesSection />
      </div>
      <div id="how-it-works">
        <HowItWorksSection />
      </div>
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <ResourcesSection />
      <div id="contact">
        <ContactSection />
      </div>
    </>
  );
}
