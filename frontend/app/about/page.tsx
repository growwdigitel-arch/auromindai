'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SiteHeader } from '@/components/landing/SiteHeader';
import { SiteFooter } from '@/components/landing/SiteFooter';
import { LeadershipSection } from '@/components/landing/LeadershipSection';
import { TrustAccreditations } from '@/components/landing/TrustAccreditations';
import { Compass, Eye, Cpu, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const missionCards = [
    {
      title: 'Our Mission',
      description: 'Make AI accessible, reliable, and profoundly useful for every enterprise.',
      icon: Compass,
    },
    {
      title: 'Our Vision',
      description: 'To be the global benchmark in autonomous AI systems and digital workforce transformation.',
      icon: Eye,
    },
    {
      title: 'Engineering DNA',
      description: 'Practical AI employees and autonomous multi-agent systems designed for verifiable ROI.',
      icon: Cpu,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      <SiteHeader activePage="about" />

      <main>
        {/* Hero Section */}
        <div className="pt-10 pb-12 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-[#059669] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">About Us</span>
          </nav>

          {/* Page Heading */}
          <div className="max-w-3xl mb-10">
            <span className="inline-block text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200/80">
              Company Overview
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-4">
              About AuromindAI
            </h1>
            <h2 className="text-lg sm:text-xl font-bold text-slate-700 mt-2">
              Building Intelligent Solutions for a Smarter, Automated World.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3.5 leading-relaxed">
              AuromindAI Private Limited is an AI technology company focused on building innovative solutions and AI employees that help businesses automate operations, improve efficiency, and achieve sustainable growth.
            </p>
          </div>

          {/* Hero Boardroom Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white mb-12">
            <div className="relative w-full h-64 sm:h-80 md:h-[360px]">
              <Image
                src="/office-boardroom.jpg"
                alt="AuromindAI Executive Boardroom"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent flex items-end p-6 sm:p-10">
                <div className="text-white space-y-1.5 max-w-xl">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                    Chennai HQ • Global Delivery
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    Pioneering Enterprise AI Autonomous Systems
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {missionCards.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-3xl bg-slate-50/90 border border-slate-200/80 hover:bg-white hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#059669] border border-emerald-100 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full-width Leadership & Shared Vision Section */}
        <LeadershipSection />

        {/* Accreditations & CTA Section */}
        <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Corporate Accreditations & Trust */}
          <TrustAccreditations />

          {/* Join Our Mission Banner */}
          <div className="bg-[#064e3b] rounded-3xl text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Ready to modernize your operations?
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 max-w-lg leading-relaxed">
                Speak directly with an AuromindAI specialist and see how custom AI agents can automate your workflows and multiply team output.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-emerald-50 text-[#064e3b] font-bold text-sm shadow-lg hover:scale-105 transition-all shrink-0"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
