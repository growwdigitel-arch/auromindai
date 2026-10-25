'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SiteHeader } from '@/components/landing/SiteHeader';
import { SiteFooter } from '@/components/landing/SiteFooter';
import { TrustAccreditations } from '@/components/landing/TrustAccreditations';
import {
  Calendar, Clock, ShieldCheck, HeartPulse, ArrowRight,
  CheckCircle2, Bot, FileText, Check, PhoneCall
} from 'lucide-react';

export default function HealthcarePage() {
  const cards = [
    {
      title: 'Patient Engagement',
      description: 'Automate patient inquiries, onboarding, and routine follow-ups via WhatsApp and SMS.',
      icon: HeartPulse,
    },
    {
      title: 'Appointment Scheduling',
      description: 'AI-powered 24/7 scheduling, doctor slot management, and zero-conflict calendar sync.',
      icon: Calendar,
    },
    {
      title: 'Medical Records Handling',
      description: 'Secure, HIPAA-aligned patient documentation and automated prescription reminders.',
      icon: FileText,
    },
    {
      title: 'Patient Support Bot',
      description: '24/7 AI assistant answering FAQs, clinic hours, pricing, and emergency directions.',
      icon: Bot,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <SiteHeader activePage="industries" />

      <main className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-[#059669]">Home</Link>
            <span>/</span>
            <Link href="/#industries" className="hover:text-[#059669]">Industries</Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">Healthcare</span>
          </div>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Healthcare Solutions
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                AI for Healthcare
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Improve patient experience, streamline clinic operations and reduce costs with AI-powered conversational solutions.
              </p>

              <div className="pt-2">
                <Link
                  href="/contact?industry=healthcare"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm shadow-md hover:scale-[1.02] transition-all"
                >
                  <span>Get a Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Doctor Visual with Checklist Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-72 sm:h-80 md:h-[340px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                <Image
                  src="/industry-healthcare.jpg"
                  alt="Doctor with Stethoscope"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Floating Feature Checklist Overlay Card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-100 space-y-2 text-xs text-slate-800">
                {[
                  'Appointment Scheduling',
                  'Follow-up Reminders',
                  'Medical Records Handling',
                  'Multi-language Support',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 font-medium">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-[#059669] flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4 Feature Cards */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Clinical Workflow AI
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                Built for High-Trust Healthcare &amp; Clinical Operations
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cards.map((c, i) => {
                const Icon = c.icon;
                return (
                  <div
                    key={i}
                    className="p-7 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-emerald-300 hover:shadow-xl hover:bg-white transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-200/80 flex items-center justify-center text-[#059669]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{c.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{c.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Metrics Banner */}
          <div className="bg-[#064e3b] text-white rounded-3xl p-8 sm:p-12 mb-20 shadow-xl border border-emerald-700/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-emerald-800">
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-300">74%</div>
                <div className="text-sm font-semibold">Hold Time Reduction</div>
                <div className="text-xs text-emerald-200/80">Instant AI patient triage &amp; slot booking</div>
              </div>
              <div className="space-y-1 pt-6 md:pt-0">
                <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-300">99.8%</div>
                <div className="text-sm font-semibold">Schedule Accuracy</div>
                <div className="text-xs text-emerald-200/80">Zero double-booking across multi-doctor clinics</div>
              </div>
              <div className="space-y-1 pt-6 md:pt-0">
                <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-300">100%</div>
                <div className="text-sm font-semibold">HIPAA &amp; BAA Aligned</div>
                <div className="text-xs text-emerald-200/80">End-to-end encrypted medical data handling</div>
              </div>
            </div>
          </div>

          {/* Trust & Accreditations */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200/80">
                Enterprise Trust &amp; Certifications
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                Compliant with Stringent Healthcare Standards
              </h2>
            </div>
            <TrustAccreditations variant="compact" />
          </div>

          {/* Bottom CTA */}
          <div className="text-center max-w-xl mx-auto space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">
              Modernize Your Healthcare Practice with Auromind AI
            </h3>
            <p className="text-sm text-slate-600">
              Schedule a clinical demo to see live patient scheduling, WhatsApp automation, and EHR integration.
            </p>
            <div className="pt-2">
              <Link
                href="/contact?industry=healthcare"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm shadow-md transition-all hover:scale-105"
              >
                <span>Schedule a Clinical AI Demo</span>
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

