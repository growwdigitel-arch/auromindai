'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play, Sparkles, Building2, Brain, Zap, Globe, TrendingUp, Users, MessageSquare, Briefcase } from 'lucide-react';
import { TrustAccreditations } from './TrustAccreditations';

export function HeroSection() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-white pt-12 sm:pt-16 lg:pt-20 pb-16 lg:pb-24">
      {/* Decorative Mint Ambient Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-emerald-50/60 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
              <span>AI for a Smarter Tomorrow</span>
            </div>

            {/* Giant Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Intelligent AI Solutions <br className="hidden sm:inline" />
              <span className="text-[#059669]">for Real Business Impact</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              AuromindAI builds AI-powered solutions and digital employees to help businesses automate, grow and scale across industries.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-sm sm:text-base font-bold shadow-md shadow-emerald-700/20 hover:scale-[1.02] transition-all"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setVideoOpen(true)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 text-sm sm:text-base font-bold border border-slate-200 shadow-xs hover:border-slate-300 transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center">
                  <Play className="w-3 h-3 fill-white ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>

            {/* Quick Recognition Pills */}
            <TrustAccreditations variant="compact" className="pt-3" />
          </div>

          {/* Right Hero Visual: Natural, Unframed Composition */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Soft Ambient Radial Glows that blend with the background */}
            <div className="absolute -top-10 -right-10 w-80 h-80 bg-emerald-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-emerald-100/50 rounded-full blur-2xl -z-10 pointer-events-none" />

            {/* Seamless Natural Graphic — No card frame, No white border */}
            <div className="relative w-full max-w-[560px] select-none">
              <Image
                src="/hero-seamless.png"
                alt="AuromindAI - Intelligent AI Solutions for Real Business Impact"
                width={1200}
                height={896}
                priority
                className="w-full h-auto object-contain drop-shadow-sm transition-transform duration-500 hover:scale-[1.015]"
              />
            </div>
          </div>
        </div>

        {/* 4-Item Metric Strip Directly Below Hero */}
        <div className="mt-16 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-[#059669] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xl font-extrabold text-slate-900 leading-tight">4+</div>
              <div className="text-xs font-medium text-slate-500">Industries Served</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-[#059669] flex items-center justify-center shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xl font-extrabold text-slate-900 leading-tight">AI</div>
              <div className="text-xs font-medium text-slate-500">Powered Solutions</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-[#059669] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xl font-extrabold text-slate-900 leading-tight">Faster</div>
              <div className="text-xs font-medium text-slate-500">Business Growth</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-[#059669] flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xl font-extrabold text-slate-900 leading-tight">Global</div>
              <div className="text-xs font-medium text-slate-500">Expansion Focus</div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">AuromindAI Executive Overview</h3>
              <button
                onClick={() => setVideoOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video bg-slate-900 rounded-2xl mt-4 flex items-center justify-center relative overflow-hidden">
              <Image
                src="/hero-businesswoman.jpg"
                alt="Video thumbnail"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-lg mb-3">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                <h4 className="text-xl font-bold">Autonomous AI Employees in Action</h4>
                <p className="text-sm text-slate-200 mt-1">Discover how AuromindAI scales enterprise workflows 24/7</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
