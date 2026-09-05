'use client';

import React from 'react';
import { LandingHero } from '@/components/landing/LandingHero';
import { OrbionAgentsShowcase } from '@/components/landing/OrbionAgentsShowcase';
import { IndustriesShowcase } from '@/components/landing/IndustriesShowcase';
import { AgentCapabilitiesGrid } from '@/components/landing/AgentCapabilitiesGrid';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { ArchitectureStackSection } from '@/components/landing/ArchitectureStackSection';
import { InteractiveCalculator } from '@/components/landing/InteractiveCalculator';
import { WorkforceComparison } from '@/components/landing/WorkforceComparison';
import { SecurityComplianceSection } from '@/components/landing/SecurityComplianceSection';
import { CaseStudiesSection } from '@/components/landing/CaseStudiesSection';
import { ExecutiveReviewsSection } from '@/components/landing/ExecutiveReviewsSection';
import { LandingFAQ } from '@/components/landing/LandingFAQ';
import { LandingFooter } from '@/components/landing/LandingFooter';
import Link from 'next/link';
import Image from 'next/image';
import { Flame, Bot } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      {/* Landing Header / Navbar */}
      <header className="sticky top-0 z-50 h-20 w-full glass-nav flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 font-black text-2xl text-primary group">
            <div className="relative overflow-hidden rounded-2xl shadow-soft group-hover:scale-105 transition-transform duration-200">
              <Image src="/logo.png" alt="AuromindAI" width={44} height={44} unoptimized className="object-contain" />
            </div>
            <span className="tracking-tight text-2xl font-black">Auromind<span className="text-[#16A34A]">AI</span></span>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-muted-foreground">
          <Link href="#swarms" className="text-emerald-600 hover:text-emerald-700 font-extrabold transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>AI Swarms</span>
          </Link>
          <Link href="#industries" className="hover:text-emerald-600 transition-colors">Industries</Link>
          <Link href="#agents" className="hover:text-emerald-600 transition-colors">AI Capabilities</Link>
          <Link href="#architecture" className="hover:text-emerald-600 transition-colors">Architecture</Link>
          <Link href="/ecommerce" className="hover:text-emerald-600 transition-colors">eCommerce AI</Link>
          <Link href="/real-estate" className="hover:text-emerald-600 transition-colors">Real Estate AI</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-primary hover:bg-card transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-xl bg-[#16A34A] text-white text-xs font-black shadow-soft hover:bg-emerald-700 transition-all flex items-center gap-1.5 hover:scale-105"
          >
            <span>Get Started</span>
            <Flame className="w-3.5 h-3.5 text-emerald-200 fill-emerald-200" />
          </Link>
        </div>
      </header>

      {/* Main Content Flow */}
      <main>
        {/* 1. Hero Section (Kept intact with prompt box & pills) */}
        <LandingHero />

        {/* 2. AuromindAI Autonomous Swarms Platform (auromindai.com) */}
        <OrbionAgentsShowcase />

        {/* 3. 6 Core Industry Solutions: eCommerce, Healthcare, Giving AI, Real Estate, AI Software, Mobile Apps */}
        <IndustriesShowcase />

        {/* 4. Autonomous Agent Personas & Capabilities Grid */}
        <AgentCapabilitiesGrid />

        {/* 5. How It Works (3-Step Autonomous Execution Engine) */}
        <HowItWorksSection />

        {/* 6. 4-Tier Enterprise Architecture Stack */}
        <ArchitectureStackSection />

        {/* 7. Interactive ROI & Workforce Savings Calculator */}
        <InteractiveCalculator />

        {/* 8. Legacy Chatbots vs. AuromindAI Swarms Comparison Table */}
        <WorkforceComparison />

        {/* 9. Bank-Grade Security, HIPAA & SOC-2 Compliance */}
        <SecurityComplianceSection />

        {/* 10. Real-World Case Studies & Verified Metrics */}
        <CaseStudiesSection />

        {/* 11. Verified Customer Reviews & Executive Endorsements */}
        <ExecutiveReviewsSection />

        {/* 12. Frequently Asked Questions Accordion */}
        <LandingFAQ />
      </main>

      {/* Clean Global Footer */}
      <LandingFooter />
    </div>
  );
}
