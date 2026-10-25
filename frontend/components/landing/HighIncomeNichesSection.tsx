'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HighIncomeNichesSection() {
  const niches = [
    {
      title: 'Healthcare',
      description: 'Growing demand for digital healthcare solutions.',
      image: '/industry-healthcare.jpg',
      href: '/healthcare',
    },
    {
      title: 'E-commerce',
      description: 'Large market with high automation potential.',
      image: '/industry-ecommerce.jpg',
      href: '/ecommerce',
    },
    {
      title: 'Fintech',
      description: 'High-value use cases in financial services.',
      image: '/industry-fintech.jpg',
      href: '/fintech',
    },
    {
      title: 'Real Estate',
      description: 'High lead volume and strong conversion potential.',
      image: '/industry-realestate.jpg',
      href: '/real-estate',
    },
    {
      title: 'Logistics',
      description: 'Operational automation and customer support.',
      image: '/industry-logistics.jpg',
      href: '/logistics',
    },
    {
      title: 'Legal Services',
      description: 'Document automation and client management.',
      image: '/industry-legal.jpg',
      href: '/legal',
    },
    {
      title: 'Education',
      description: 'Student engagement and admissions support.',
      image: '/industry-education.jpg',
      href: '/contact?industry=education',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            High-Income Niches We Focus On
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            In addition to our core sectors, we also offer solutions for high-value industries with strong growth potential.
          </p>
        </div>

        {/* 7 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {niches.map((niche, idx) => (
            <Link
              key={idx}
              href={niche.href}
              className={`group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col hover:-translate-y-1 ${
                idx === 6 ? 'sm:col-span-2 md:col-span-1 lg:col-span-1' : ''
              }`}
            >
              <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-100">
                <Image
                  src={niche.image}
                  alt={niche.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#059669] transition-colors">
                    {niche.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {niche.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#059669]">
                  <span>Explore Niche</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
