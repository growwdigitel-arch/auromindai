'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ArrowUpRight, TrendingUp, Building2, ShoppingBag, HeartPulse, CheckCircle2 } from 'lucide-react';

export function CaseStudiesSection() {
  const cases = [
    {
      sector: 'Real Estate Brokerage',
      company: 'Apex Luxury Portfolio',
      headline: '42% Increase in Scheduled VIP Showings with 38-Second WhatsApp Lead Response',
      summary: 'Apex integrated AuromindAI autonomous swarms to autonomously qualify inbound property inquiries from Meta & Google ads. The agent matched high-net-worth buyers with suitable penthouses and scheduled viewings automatically.',
      stats: [
        { label: 'Response Time', value: '38s', sub: 'from 4.5 hours' },
        { label: 'Showings Booked', value: '+42%', sub: 'qualified tours' },
        { label: 'Pipeline Closed', value: '$14.2M', sub: 'in 90 days' }
      ],
      icon: Building2,
      href: '/real-estate',
      linkText: 'Explore Real Estate AI Solution'
    },
    {
      sector: 'D2C eCommerce Brand',
      company: 'Velox Direct Retail',
      headline: '$380,000 Extra GMV Recovered from Abandoned Carts via 24/7 WhatsApp AI',
      summary: 'Velox deployed an autonomous eCommerce sales agent that engaged checkout drop-offs within 3 minutes over WhatsApp, answered sizing questions, and provided personalized one-click discounts.',
      stats: [
        { label: 'Cart Recovery', value: '+34%', sub: 'conversion rate' },
        { label: 'Added Revenue', value: '$380k', sub: 'recovered GMV' },
        { label: 'Customer CSAT', value: '4.9/5', sub: 'satisfaction score' }
      ],
      icon: ShoppingBag,
      href: '/ecommerce',
      linkText: 'Explore eCommerce AI Solution'
    },
    {
      sector: 'Healthcare Network',
      company: 'CarePoint Clinical Centers',
      headline: '85% Drop in Front-Desk Phone Queue with 24/7 Automated Patient Triage',
      summary: 'CarePoint utilized our healthcare AI assistant to pre-screen patient symptoms, schedule specialist appointments, and automate post-consultation recovery check-ins with zero human administrative friction.',
      stats: [
        { label: 'Desk Load', value: '-85%', sub: 'call volume' },
        { label: 'No-Show Rate', value: '< 2%', sub: 'with SMS/WhatsApp' },
        { label: 'Compliance', value: '100%', sub: 'HIPAA-conscious' }
      ],
      icon: HeartPulse,
      href: '/#industries',
      linkText: 'View Healthcare AI Overview'
    }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold shadow-sm">
          <Award className="w-3.5 h-3.5 text-emerald-600" />
          <span>Proven Outcomes</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          Real Results from <span className="text-[#16A34A]">Real Deployments</span>.
        </h2>

        <p className="text-base text-slate-600 font-normal leading-relaxed">
          See how leading organizations accelerate growth and eliminate manual bottlenecks with our autonomous AI agents.
        </p>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {cases.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between space-y-6 text-left group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {c.sector}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">{c.company}</span>
                  <h3 className="text-base font-extrabold text-slate-900 leading-snug mt-1 group-hover:text-emerald-700 transition-colors">
                    {c.headline}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {c.summary}
                </p>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                  {c.stats.map((st, j) => (
                    <div key={j} className="p-2.5 rounded-xl bg-slate-50 border border-slate-150 text-center">
                      <span className="font-mono font-black text-slate-900 text-sm block">{st.value}</span>
                      <span className="text-[9px] text-slate-500 font-medium block leading-tight">{st.sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href={c.href}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 border border-slate-200 text-xs font-bold flex items-center justify-between transition-colors"
                >
                  <span>{c.linkText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
