'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingCart, TrendingUp, Zap } from 'lucide-react';

export function EcommerceHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-emerald-50/50 to-transparent -z-10 blur-3xl rounded-full" />
      
      <div className="text-center space-y-8 relative z-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold tracking-wide uppercase">
          <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
          High-Conversion eCommerce Stores
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-primary leading-[1.1]">
          Stop losing sales to a <span className="text-emerald-600 relative">slow<svg className="absolute w-full h-3 -bottom-1 left-0 text-emerald-200" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none"/></svg></span>, outdated website.
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          We design and build lightning-fast, conversion-optimized eCommerce websites that turn your visitors into loyal customers. Let us build your ultimate digital storefront.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 text-white font-bold shadow-[0_0_24px_rgba(5,150,105,0.4)] hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
          >
            <span>Get a Free Proposal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#portfolio"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-border text-primary font-bold shadow-soft hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            <span>View Our Work</span>
          </Link>
        </div>
        
        {/* Trust Badges */}
        <div className="pt-12 flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 font-bold text-xl text-zinc-400">
            <ShoppingCart className="w-6 h-6" />
            Shopify Partners
          </div>
          <div className="flex items-center gap-2 font-bold text-xl text-zinc-400">
            <TrendingUp className="w-6 h-6" />
            Conversion Experts
          </div>
          <div className="flex items-center gap-2 font-bold text-xl text-zinc-400">
            <Zap className="w-6 h-6" />
            Next.js Masters
          </div>
        </div>
      </div>
    </section>
  );
}
