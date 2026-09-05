'use client';

import React from 'react';
import Link from 'next/link';
import { Quote, Star, CheckCircle, ArrowUpRight, TrendingUp } from 'lucide-react';

export function ExecutiveReviewsSection() {
  const reviews = [
    {
      name: 'Alexander Sterling',
      role: 'Managing Principal',
      company: 'Sterling & Partners Luxury Real Estate',
      location: 'Dubai & London',
      metricBadge: '+42% Qualified Tour Bookings',
      quote: 'Before partnering with AuromindAI, our high-net-worth buyer inquiries on WhatsApp would sit for hours over weekends. Today, our AI agent responds within 35 seconds, qualifies financing, and syncs private showings directly into our broker calendars. It paid for itself in week one.',
      highlight: '35-second average weekend lead response',
    },
    {
      name: 'Elena Rostova',
      role: 'VP of Growth & eCommerce',
      company: 'Velox Direct Consumer Goods',
      location: 'New York, USA',
      metricBadge: '$380K Extra GMV Recovered',
      quote: 'Traditional email abandoned cart sequences were converting at less than 3%. AuromindAI autonomous swarms handle cart abandonment over conversational WhatsApp with personalized recommendations. We recovered $380,000 in lost revenue in our very first quarter.',
      highlight: '34% cart recovery rate via WhatsApp',
    },
    {
      name: 'Dr. Marcus Vance',
      role: 'Chief Medical Officer',
      company: 'CarePoint Clinical Network',
      location: 'San Francisco, CA',
      metricBadge: '85% Reduction in Phone Hold Time',
      quote: 'Front-desk triage was burning out our nursing staff. With HIPAA-compliant intake agents, routine appointment scheduling and pre-visit symptom history happen seamlessly before the patient walks through our clinic doors.',
      highlight: 'Zero data breaches; 100% HIPAA compliant',
    },
  ];

  return (
    <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Quote className="w-3.5 h-3.5" />
            <span>Verified Customer Results</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Trusted by Leaders Operating at <span className="text-emerald-400">Scale</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            Hear from enterprise founders, clinical operators, and brokers running autonomous AI agents engineered and deployed by AuromindAI.
          </p>
        </div>

        {/* 3 Executive Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div 
              key={idx}
              className="bg-slate-950/80 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between space-y-6 hover:border-emerald-500/50 hover:bg-slate-950 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {rev.metricBadge}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-base">{rev.name}</h4>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-xs text-slate-400 font-medium">{rev.role}</p>
                <p className="text-xs text-emerald-400 font-semibold">{rev.company} · <span className="text-slate-500">{rev.location}</span></p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="text-center pt-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-black text-sm hover:bg-emerald-400 transition-all shadow-lg hover:scale-105"
          >
            <span>Partner with AuromindAI</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
