'use client';

import React from 'react';
import { SiteHeader } from '@/components/landing/SiteHeader';
import { HeroSection } from '@/components/landing/HeroSection';
import { IndustriesSection } from '@/components/landing/IndustriesSection';
import { ProductShowcaseSection } from '@/components/landing/ProductShowcaseSection';
import { DarkStatsBanner } from '@/components/landing/DarkStatsBanner';
import { WhyChooseSection } from '@/components/landing/WhyChooseSection';
import { AboutSection } from '@/components/landing/AboutSection';
import { ServicesSection } from '@/components/landing/ServicesSection';
import { HighIncomeNichesSection } from '@/components/landing/HighIncomeNichesSection';
import { CaseStudiesGridSection } from '@/components/landing/CaseStudiesGridSection';
import { ContactSection } from '@/components/landing/ContactSection';
import { SiteFooter } from '@/components/landing/SiteFooter';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 w-full">
      {/* 1. Brand Navbar */}
      <SiteHeader activePage="home" />

      <main>
        {/* 2. Hero Section: "Intelligent AI Solutions for Real Business Impact" with floating agent pills */}
        <HeroSection />

        {/* 3. Industries We Serve (Healthcare, E-commerce, Fintech, Real Estate) */}
        <IndustriesSection />

        {/* 4. Our Product: OrbionAgents with live SaaS & WhatsApp Chat Dashboard */}
        <ProductShowcaseSection />

        {/* 5. Deep Forest Green Stats Counter Bar (250+ Businesses, 5M+ Interactions, etc.) */}
        <DarkStatsBanner />

        {/* 6. Why Choose AuromindAI? (4 core advantages) */}
        <WhyChooseSection />

        {/* 7. About AuromindAI (Executive Office image, Mission, Vision, Values, Team) */}
        <AboutSection />

        {/* 8. Our Services (6 Core AI Solutions) */}
        <ServicesSection />

        {/* 9. High-Income Niches We Focus On (Logistics, Legal, Education, Healthcare, etc.) */}
        <HighIncomeNichesSection />

        {/* 10. Case Studies (Real businesses, real results with interactive filter pills) */}
        <CaseStudiesGridSection />

        {/* 12. Contact Us (Direct coordinates & interactive form) */}
        <ContactSection />
      </main>

      {/* 13. Brand Footer */}
      <SiteFooter />
    </div>
  );
}
