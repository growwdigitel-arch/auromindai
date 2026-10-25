'use client';

import React from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/landing/SiteHeader';
import { SiteFooter } from '@/components/landing/SiteFooter';
import { CaseStudiesGridSection } from '@/components/landing/CaseStudiesGridSection';
import {
  ArrowRight,
  TrendingUp,
  Award,
  Users2,
  CheckCircle2,
  Sparkles,
  Zap
} from 'lucide-react';

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <SiteHeader activePage="case-studies" />

      <main className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-[#059669]">Home</Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">Case Studies</span>
          </div>

          {/* Page Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
              Verified Client Outcomes
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-4 leading-tight">
              Real Businesses. Quantified Impact.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              Explore how healthcare chains, e-commerce brands, fintech leaders, and real estate developers deploy AuromindAI to eliminate latency, slash operational overhead, and capture millions in pipeline revenue.
            </p>

            {/* Quick Aggregate Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-6 border-t border-slate-100">
              {[
                { label: 'Avg No-Show Drop', value: '40%', icon: TrendingUp },
                { label: 'Avg Inbound Speed', value: '< 1.5s', icon: Zap },
                { label: 'E-com Sales Lift', value: '3.1x', icon: Sparkles },
                { label: 'Compliance Precision', value: '99.8%', icon: CheckCircle2 }
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                    <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500">
                      <Icon className="w-3.5 h-3.5 text-[#059669]" />
                      <span>{s.label}</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-mono">
                      {s.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Dynamic Category Filter Grid & Click-to-Read Modal */}
        <CaseStudiesGridSection />

        {/* Bottom Callout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-[#064e3b] text-white rounded-3xl p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-3 text-center md:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-bold border border-emerald-700/60">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enterprise Custom Pilots</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Want to achieve similar metrics for your company?
              </h3>
              <p className="text-sm text-emerald-100/90 leading-relaxed">
                Let our solutions engineers walk you through the exact technical architecture, data pipelines, and business ROI in an interactive walkthrough.
              </p>
            </div>

            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-white text-[#064e3b] font-bold text-sm hover:bg-emerald-50 transition-all shadow-md shrink-0 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Request a Custom Pilot</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
