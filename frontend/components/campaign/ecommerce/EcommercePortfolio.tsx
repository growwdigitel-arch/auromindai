'use client';

import React from 'react';
import Image from 'next/image';

export function EcommercePortfolio() {
  const projects = [
    {
      name: 'Lumina Cosmetics',
      metric: '+142% Conversion Rate',
      type: 'Shopify Plus Custom Theme',
      imagePlaceholder: 'bg-emerald-100', // Placeholder for actual image
    },
    {
      name: 'Aero Athletics',
      metric: 'Sub-1s Load Time',
      type: 'Next.js Headless Commerce',
      imagePlaceholder: 'bg-blue-100',
    },
    {
      name: 'Zenith Home Goods',
      metric: '$2.4M ARR Generated',
      type: 'WooCommerce Migration',
      imagePlaceholder: 'bg-amber-100',
    },
  ];

  return (
    <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            Our Proven Results
          </h2>
          <p className="text-muted-foreground text-lg">
            See how we've helped other brands scale their revenue with high-performance storefronts.
          </p>
        </div>
        <div className="hidden md:block">
          {/* Decorative element */}
          <div className="w-24 h-1 bg-emerald-500 rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className={`w-full aspect-[4/3] rounded-3xl ${project.imagePlaceholder} border border-border overflow-hidden relative mb-6`}>
              {/* Image would go here: <Image src={...} fill className="object-cover" /> */}
              <div className="absolute inset-0 flex items-center justify-center text-zinc-400 font-medium">
                [Project Image]
              </div>
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold tracking-wide">
                {project.metric}
              </div>
              <h3 className="text-2xl font-bold text-primary">{project.name}</h3>
              <p className="text-muted-foreground">{project.type}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
