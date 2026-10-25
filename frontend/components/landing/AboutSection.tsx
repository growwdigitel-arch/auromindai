'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play, Compass, Eye, Heart, Users, CheckCircle2 } from 'lucide-react';
import { TrustAccreditations } from './TrustAccreditations';

export function AboutSection() {
  const [videoModal, setVideoModal] = useState(false);

  const pillars = [
    {
      title: 'Our Mission',
      description: 'Make AI accessible and useful for every business.',
      icon: Compass,
    },
    {
      title: 'Our Vision',
      description: 'To be a global leader in AI-driven business solutions.',
      icon: Eye,
    },
    {
      title: 'Our Values',
      description: 'Innovation, Simplicity, Impact and Trust.',
      icon: Heart,
    },
    {
      title: 'Our Team',
      description: 'A passionate team of builders, engineers and domain experts.',
      icon: Users,
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            About AuromindAI
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Building Intelligent Solutions for a Smarter, Automated World.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
            AuromindAI Private Limited is an AI technology company focused on building innovative solutions and AI employees that help businesses automate operations, improve efficiency and achieve sustainable growth.
          </p>
        </div>

        {/* Office Photo Card with Play Overlay */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white mb-14 group">
          <div className="relative w-full h-64 sm:h-80 md:h-[360px]">
            <Image
              src="/office-boardroom.jpg"
              alt="AuromindAI Executive Office"
              fill
              className="object-cover group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent flex flex-col justify-end p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-sm font-bold shadow-md hover:scale-[1.02] transition-all"
                >
                  <span>Our Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setVideoModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/90 hover:bg-white text-slate-900 text-sm font-bold shadow-md hover:scale-[1.02] transition-all"
                >
                  <Play className="w-4 h-4 fill-slate-900" />
                  <span>Watch Our Story</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid: Mission, Vision, Values, Team */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#059669] border border-emerald-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Executive Leadership Spotlight */}
        <div className="rounded-3xl bg-slate-900 text-white p-7 sm:p-9 shadow-xl relative overflow-hidden mb-8 border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950/60 border border-emerald-800/80 px-3 py-1 rounded-full">
                EXECUTIVE LEADERSHIP
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight text-white">
                The Minds Behind AuromindAI
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Led by <span className="text-white font-semibold">Ajmal</span> (CEO &amp; Co-founder, 12+ years in Fintech &amp; Growth) and <span className="text-white font-semibold">Santhosh</span> (CTO &amp; Co-founder, AI Architecture &amp; Scalable Systems).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <Link
                href="/about#leadership"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all"
              >
                <span>Read Full Leadership Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Video Modal */}
      {videoModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setVideoModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">The Story of AuromindAI</h3>
              <button
                onClick={() => setVideoModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video bg-slate-900 rounded-2xl mt-4 flex items-center justify-center relative overflow-hidden">
              <Image
                src="/office-boardroom.jpg"
                alt="Story thumbnail"
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-lg mb-3">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                <h4 className="text-xl font-bold">Building Enterprise AI for the Future</h4>
                <p className="text-sm text-slate-200 mt-1">Founders&apos; vision, values, and client outcomes</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
