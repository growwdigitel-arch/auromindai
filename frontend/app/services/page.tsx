'use client';

import React from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/landing/SiteHeader';
import { SiteFooter } from '@/components/landing/SiteFooter';
import { ServicesSection } from '@/components/landing/ServicesSection';
import { HighIncomeNichesSection } from '@/components/landing/HighIncomeNichesSection';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  Layers,
  Code2,
  Cpu,
  BarChart3
} from 'lucide-react';

export default function ServicesPage() {
  const pilotPhases = [
    {
      phase: 'Week 1',
      title: 'Audit & Feasibility',
      desc: 'Operational bottleneck assessment, data readiness review, and priority use-case selection.',
      deliverable: '90-Day Execution Roadmap & ROI Model',
      icon: Clock
    },
    {
      phase: 'Week 2',
      title: 'Prototype & Agent Design',
      desc: 'Prompt engineering, custom RAG vector ingestion, and multi-agent interaction flow design.',
      deliverable: 'Functional Interactive Sandbox Demo',
      icon: Code2
    },
    {
      phase: 'Week 3',
      title: 'Ecosystem Integration',
      desc: 'Connecting WhatsApp Cloud API, CRM webhooks, and enterprise database read/write pipelines.',
      deliverable: 'End-to-End Staging Environment',
      icon: Cpu
    },
    {
      phase: 'Week 4',
      title: 'Production Go-Live',
      desc: 'Deterministic guardrail verification, staff onboarding, and 24/7 telemetry monitoring setup.',
      deliverable: 'Live Production Deployment & SLA',
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <SiteHeader activePage="services" />

      <main className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-[#059669]">Home</Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">Services</span>
          </div>

          {/* Page Hero */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
              Enterprise Offerings
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-4 leading-tight">
              End-to-End Enterprise AI Services
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              We engineer bespoke AI software, autonomous multi-agent swarms, and enterprise API integrations that solve complex operational bottlenecks and generate measurable ROI.
            </p>
          </div>
        </div>

        {/* 6 Core Services with Click-to-Explain Modal */}
        <ServicesSection hideHeader />

        {/* 4-Week Fast-Track Pilot Blueprint */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Delivery Methodology
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                Our 4-Week Production Pilot Framework
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                We de-risk enterprise AI adoption with a structured, milestone-driven delivery process.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pilotPhases.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div
                    key={i}
                    className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-4 hover:border-emerald-300 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#059669] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          {p.phase}
                        </span>
                        <div className="w-8 h-8 rounded-xl bg-white text-slate-700 flex items-center justify-center shadow-xs">
                          <Icon className="w-4 h-4 text-[#059669]" />
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-200/80">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Key Deliverable:</div>
                      <div className="text-xs font-semibold text-slate-800 mt-0.5">{p.deliverable}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* High Income Niches We Focus On */}
        <HighIncomeNichesSection />

        {/* Bottom CTA Box */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-[#064e3b] text-white rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto space-y-5 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-bold border border-emerald-700/60">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Zero-Commitment Architecture Consultation</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Build Your Enterprise AI Architecture?
            </h3>
            <p className="text-sm sm:text-base text-emerald-100/90 max-w-xl mx-auto leading-relaxed">
              Book a 30-minute scoping call with an AuromindAI solutions engineer. We will review your workflows and map out a tailored execution plan.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#064e3b] font-bold text-sm shadow-md hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95"
              >
                <span>Schedule an AI Architecture Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
