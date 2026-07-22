import React from "react";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ExampleApps } from "@/components/landing/ExampleApps";
import { TechStack } from "@/components/landing/TechStack";
import { WhyMorphOS } from "@/components/landing/WhyMorphOS";
import { CallToAction } from "@/components/landing/CallToAction";
import { BackgroundSystem } from "@/components/ui/BackgroundSystem";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--text-primary)] overflow-x-hidden selection:bg-[var(--primary)] selection:text-white">
      <BackgroundSystem />
      <div className="relative z-10">
        <Hero />
        <Features />
        <HowItWorks />
        <ExampleApps />
        <TechStack />
        <WhyMorphOS />
        <CallToAction />
      </div>
    </div>
  );
}
