'use client';

import React from 'react';
import { Search, PenTool, Code, Rocket } from 'lucide-react';

export function EcommerceProcess() {
  const steps = [
    {
      number: '01',
      title: 'Discovery & Strategy',
      description: 'We analyze your brand, competitors, and target audience to craft a tailored eCommerce strategy.',
      icon: Search,
    },
    {
      number: '02',
      title: 'UX/UI Design',
      description: 'Our designers create wireframes and high-fidelity mockups focused on user experience and conversion.',
      icon: PenTool,
    },
    {
      number: '03',
      title: 'Development',
      description: 'We build your store using modern, headless tech stacks or premium Shopify Plus architectures.',
      icon: Code,
    },
    {
      number: '04',
      title: 'Launch & Scale',
      description: 'Rigorous testing, SEO setup, and a smooth launch, followed by ongoing optimization.',
      icon: Rocket,
    },
  ];

  return (
    <section className="py-24 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Our Streamlined Process
          </h2>
          <p className="text-zinc-400 text-lg">
            From concept to launch, we make building your dream store effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-1/8 right-1/8 h-0.5 bg-zinc-800 -z-0" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-zinc-900 border-4 border-[#09090B] flex items-center justify-center relative shadow-lg">
                <step.icon className="w-8 h-8 text-emerald-400" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
