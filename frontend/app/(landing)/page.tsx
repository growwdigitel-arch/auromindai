import React from 'react';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingFeatures } from '@/components/landing/LandingFeatures';
import { LandingPricing } from '@/components/landing/LandingPricing';
import { LandingFooter } from '@/components/landing/LandingFooter';
import Link from 'next/link';
import Image from 'next/image';

import { LandingVisuals } from '@/components/landing/LandingVisuals';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent-light selection:text-secondary font-sans">
      {/* Landing Navbar */}
      <header className="sticky top-0 z-40 h-16 w-full glass-nav flex items-center justify-between px-8">
        <Link href="/" className="flex items-center gap-2.5 font-black text-xl text-primary">
          <Image src="/logo.png" alt="AuromindAI" width={32} height={32} unoptimized className="rounded-xl shadow-soft" />
          <span>Auromind<span className="text-secondary">AI</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-muted-foreground">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
          <Link href="/login" className="hover:text-primary transition-colors">Solutions</Link>
          <Link href="/login" className="hover:text-primary transition-colors">API & Docs</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-primary hover:bg-card transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-soft hover:bg-gray-900 transition-all"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Sections */}
      <LandingHero />
      <LandingFeatures />
      <LandingVisuals />
      <LandingPricing />
      <LandingFooter />
    </div>
  );
}
