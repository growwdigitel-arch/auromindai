'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { LandingFooter } from '@/components/landing/LandingFooter';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-50 h-20 w-full glass-nav bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 font-black text-2xl text-slate-900 group">
            <div className="relative overflow-hidden rounded-2xl shadow-soft group-hover:scale-105 transition-transform duration-200">
              <Image src="/logo.png" alt="AuromindAI" width={40} height={40} unoptimized className="object-contain" />
            </div>
            <span className="tracking-tight text-xl sm:text-2xl font-black">Auromind<span className="text-[#16A34A]">AI</span></span>
          </Link>
          <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-slate-400 border-l border-slate-300 pl-3">
            Trust &amp; Legal Center
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-5 text-xs font-bold text-slate-600">
          <Link href="/privacy" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link>
          <Link href="/security" className="hover:text-emerald-600 transition-colors">Data Encryption &amp; Security</Link>
          <Link href="/terms" className="hover:text-emerald-600 transition-colors">Terms of Service</Link>
          <Link href="/compliance" className="hover:text-emerald-600 transition-colors">HIPAA &amp; Compliance</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-12 md:py-16">
        {children}
      </main>

      {/* Footer with rich legal and security links */}
      <LandingFooter />
    </div>
  );
}
