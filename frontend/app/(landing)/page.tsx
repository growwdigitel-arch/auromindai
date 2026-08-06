'use client';

import React from 'react';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingPlayground } from '@/components/landing/LandingPlayground';
import { AuroVexShowcase } from '@/components/landing/AuroVexShowcase';
import { LandingFeatures } from '@/components/landing/LandingFeatures';
import { LandingPricing } from '@/components/landing/LandingPricing';
import { LandingVisuals } from '@/components/landing/LandingVisuals';
import { LandingFooter } from '@/components/landing/LandingFooter';
import Link from 'next/link';
import Image from 'next/image';
import { Flame, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      {/* Landing Header / Navbar */}
      <header className="sticky top-0 z-50 h-16 w-full glass-nav flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5 font-black text-xl text-primary">
            <Image src="/logo.png" alt="AuromindAI" width={32} height={32} unoptimized className="rounded-xl shadow-soft" />
            <span>Auromind<span className="text-emerald-600">AI</span></span>
          </Link>

          <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
            <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600 animate-pulse" />
            AuroVex 1 Fast
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-muted-foreground">
          <Link href="#playground" className="hover:text-emerald-600 transition-colors">Playground</Link>
          <Link href="#auravex-model" className="hover:text-emerald-600 transition-colors">AuroVex Model</Link>
          <Link href="#features" className="hover:text-emerald-600 transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-emerald-600 transition-colors">Pricing</Link>
          <Link href="/login" className="hover:text-emerald-600 transition-colors">API Docs</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl text-xs font-bold text-primary hover:bg-card transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-soft hover:bg-gray-900 transition-all flex items-center gap-1.5"
          >
            <span>Try AuroVex</span>
            <Flame className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
          </Link>
        </div>
      </header>

      {/* Main Sections */}
      <main>
        <LandingHero />
        <LandingPlayground />
        <AuroVexShowcase />
        <LandingFeatures />
        <LandingVisuals />
        <LandingPricing />
      </main>

      <LandingFooter />
    </div>
  );
}
