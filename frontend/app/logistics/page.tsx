'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SiteHeader } from '@/components/landing/SiteHeader';
import { SiteFooter } from '@/components/landing/SiteFooter';
import { TrustAccreditations } from '@/components/landing/TrustAccreditations';
import {
  Truck,
  Boxes,
  FileSpreadsheet,
  Clock,
  ArrowRight,
  CheckCircle2,
  Bot,
  Check,
  ShieldCheck,
  Navigation2,
  BarChart3,
  MapPin,
} from 'lucide-react';

export default function LogisticsPage() {
  const cards = [
    {
      title: 'Autonomous Dispatch & Route Planning',
      description: 'Dynamic load allocation, multi-stop fleet routing, and real-time carrier capacity matching for zero deadhead miles.',
      icon: Truck,
    },
    {
      title: 'Automated BOL & Customs Processing',
      description: 'Zero-touch document parsing for Bills of Lading (BOL), commercial invoices, customs entries, and proof of delivery (POD).',
      icon: FileSpreadsheet,
    },
    {
      title: 'Predictive ETA & Disruption Management',
      description: 'Proactive detection of port congestion, weather halts, and border delays with automated shipper notifications.',
      icon: Clock,
    },
    {
      title: '24/7 Driver & Shipper AI Copilot',
      description: 'Automated WhatsApp and SMS assistants for live container tracking, gate check-in, detention fees, and carrier queries.',
      icon: Bot,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      <SiteHeader activePage="industries" />

      <main className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-[#059669] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#industries" className="hover:text-[#059669] transition-colors">Industries</Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">Logistics &amp; Supply Chain</span>
          </nav>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200/80">
                Supply Chain &amp; Logistics AI
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                AI for Modern Logistics &amp; Supply Chain
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Streamline fleet dispatch, automate freight documentation, eliminate billing delays, and provide 24/7 real-time consignment visibility with autonomous AI agents.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/contact?industry=logistics"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm shadow-md hover:scale-[1.02] transition-all"
                >
                  <span>Request a Logistics Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Visual Card with Checklist Overlay */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-72 sm:h-80 md:h-[340px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                <Image
                  src="/industry-logistics.jpg"
                  alt="Modern Logistics Warehouse and Fleet"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Floating Feature Checklist Overlay Card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-100 space-y-2 text-xs text-slate-800">
                {[
                  'Instant Freight BOL & POD Extraction',
                  'Dynamic Multi-Stop Route Optimization',
                  '24/7 WhatsApp Shipment Tracking',
                  'Zero-Touch Carrier Rate Quoting',
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

          {/* Core Capabilities Grid */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200/80">
              CORE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Engineered for End-to-End Freight Operations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Transform legacy freight brokerage and 3PL operations into autonomous, zero-latency workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {cards.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-3xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#059669] border border-emerald-100 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Operational Metrics Bar */}
          <div className="rounded-3xl bg-gradient-to-r from-[#063b2f] via-[#084b3c] to-[#063b2f] text-white p-8 sm:p-12 mb-20 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-emerald-800/80">
              <div className="pt-4 md:pt-0">
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-300">&lt; 15s</div>
                <div className="text-sm font-semibold text-white mt-1">Dispatch Matching Time</div>
                <div className="text-xs text-emerald-100/70 mt-1">Automated load-to-carrier assignment</div>
              </div>
              <div className="pt-4 md:pt-0">
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-300">92%</div>
                <div className="text-sm font-semibold text-white mt-1">Reduction in Billing Disputes</div>
                <div className="text-xs text-emerald-100/70 mt-1">Instant OCR auditing of accessorials</div>
              </div>
              <div className="pt-4 md:pt-0">
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-300">99.98%</div>
                <div className="text-sm font-semibold text-white mt-1">BOL Extraction Accuracy</div>
                <div className="text-xs text-emerald-100/70 mt-1">Deterministic schema validation</div>
              </div>
            </div>
          </div>

          {/* Trust Accreditations */}
          <div className="mb-20">
            <TrustAccreditations />
          </div>

          {/* Bottom CTA Banner */}
          <div className="bg-[#064e3b] rounded-3xl text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold">
                Ready to automate your supply chain?
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 max-w-lg leading-relaxed">
                Connect your TMS, WMS, and ERP with AuromindAI to eliminate paperwork delays and cut freight overheads.
              </p>
            </div>
            <Link
              href="/contact?industry=logistics"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-emerald-50 text-[#064e3b] font-bold text-sm shadow-lg hover:scale-105 transition-all shrink-0"
            >
              <span>Schedule a Logistics Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
