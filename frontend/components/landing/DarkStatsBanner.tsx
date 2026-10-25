'use client';

import React from 'react';
import { Building2, MessageSquare, TrendingDown, Zap } from 'lucide-react';

export function DarkStatsBanner() {
  const stats = [
    {
      value: '250+',
      label: 'Businesses Automating',
      icon: Building2,
    },
    {
      value: '5M+',
      label: 'Customer Interactions',
      icon: MessageSquare,
    },
    {
      value: '60%',
      label: 'Average Cost Reduction',
      icon: TrendingDown,
    },
    {
      value: '3x',
      label: 'Faster Business Growth',
      icon: Zap,
    },
  ];

  return (
    <section className="bg-[#064e3b] text-white py-12 sm:py-16 relative overflow-hidden">
      {/* Subtle radial emerald background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-600/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-emerald-100/80 mt-0.5">
                    {s.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
