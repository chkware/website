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
      <PrimaryFeaturesSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <ResourcesSection />
      <ContactSection />
    </>
  );
}
