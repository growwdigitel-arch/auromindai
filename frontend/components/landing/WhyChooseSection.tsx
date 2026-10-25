'use client';

import React from 'react';
import { Award, Layers, ShieldCheck, TrendingUp } from 'lucide-react';

export function WhyChooseSection() {
  const reasons = [
    {
      title: 'Industry Expertise',
      description: 'Deep domain knowledge across healthcare, e-commerce, real estate, and finance.',
      icon: Award,
    },
    {
      title: 'End-to-End Solutions',
      description: 'From strategy and AI model fine-tuning to deployment and 24/7 ongoing support.',
      icon: Layers,
    },
    {
      title: 'Scalable & Secure',
      description: 'Built for enterprise growth with SOC-2 standard controls, HIPAA compliance, and data encryption.',
      icon: ShieldCheck,
    },
    {
      title: 'Real Business Impact',
      description: 'Measurable ROI with real metrics: reduced overhead, accelerated sales, and customer delight.',
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose AuromindAI?
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Enterprise-grade artificial intelligence built for tangible ROI and scale.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-[#059669] mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#059669] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
