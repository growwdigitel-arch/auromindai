'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, HeartPulse, ShoppingBag, Smartphone, Home, Truck, Scale } from 'lucide-react';

export function IndustriesSection() {
  const industries = [
    {
      id: 'healthcare',
      title: 'Healthcare',
      description: 'AI for patient engagement, appointments, and operational clinic efficiency.',
      image: '/industry-healthcare.jpg',
      icon: HeartPulse,
      href: '/healthcare',
    },
    {
      id: 'ecommerce',
      title: 'E-commerce',
      description: 'AI for high-speed storefronts, customer support, and marketing automation.',
      image: '/industry-ecommerce.jpg',
      icon: ShoppingBag,
      href: '/ecommerce',
    },
    {
      id: 'fintech',
      title: 'Fintech',
      description: 'AI for customer onboarding, automated KYC, and fraud risk detection.',
      image: '/industry-fintech.jpg',
      icon: Smartphone,
      href: '/fintech',
    },
    {
      id: 'real-estate',
      title: 'Real Estate',
      description: 'AI for instant lead qualification, MLS property matching, and site visit scheduling.',
      image: '/industry-realestate.jpg',
      icon: Home,
      href: '/real-estate',
    },
    {
      id: 'logistics',
      title: 'Logistics & Supply Chain',
      description: 'AI for fleet dispatch, freight documentation, BOL parsing, and live tracking.',
      image: '/industry-logistics.jpg',
      icon: Truck,
      href: '/logistics',
    },
    {
      id: 'legal',
      title: 'Legal & Compliance',
      description: 'AI for contract redlining, regulatory compliance auditing, and confidential intake.',
      image: '/industry-legal.jpg',
      icon: Scale,
      href: '/legal',
    },
  ];

  return (
    <section id="industries" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200/80 mb-2">
              SECTOR SOLUTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Industries We Serve
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              Tailored autonomous AI solutions engineered for high-growth enterprise sectors.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#059669] hover:text-[#047857] transition-colors group"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 Cards Grid (3 columns on large screens) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {industries.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                {/* Photo with Overlapping Green Icon Badge */}
                <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Floating Circular Green Icon Badge */}
                  <div className="absolute bottom-3 left-4 w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-[#059669]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#059669] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#059669]">
                    <span>Explore {item.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
