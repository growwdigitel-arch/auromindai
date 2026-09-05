'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function EcommerceCTA() {
  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="bg-emerald-950 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Ready to skyrocket your online sales?
          </h2>
          <p className="text-lg md:text-xl text-emerald-100/80">
            Book a free 30-minute strategy call with our eCommerce experts today. We'll audit your current setup and provide a custom growth roadmap.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-emerald-950 font-bold shadow-xl hover:bg-zinc-100 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
            >
              <span>Book Your Free Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <p className="text-xs text-emerald-400/60 font-medium">
            No commitment required. Spots are limited.
          </p>
        </div>
      </div>
    </section>
  );
}
