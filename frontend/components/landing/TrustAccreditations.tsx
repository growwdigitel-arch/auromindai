'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

export function MetaLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <Image
      src="/meta-logo-transparent.png"
      alt="Meta"
      width={40}
      height={26}
      className={`object-contain ${className}`}
      unoptimized
    />
  );
}

export function DpiitLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/dpiit-logo-transparent.png"
      alt="DPIIT #startupindia"
      width={120}
      height={50}
      className={`object-contain ${className}`}
      unoptimized
    />
  );
}

export function StartupTnLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/startuptn-logo.png"
      alt="StartupTN"
      width={130}
      height={32}
      className={`object-contain rounded-md ${className}`}
      unoptimized
    />
  );
}

interface TrustAccreditationsProps {
  variant?: 'cards' | 'compact' | 'footer' | 'header-bar';
  className?: string;
}

export function TrustAccreditations({ variant = 'cards', className = '' }: TrustAccreditationsProps) {
  // Top micro-bar for navigation
  if (variant === 'header-bar') {
    return (
      <div className={`bg-slate-900 text-slate-300 py-1.5 px-4 text-[11px] border-b border-slate-800 ${className}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-medium">Enterprise AI Solutions &amp; AI Employees</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 font-medium">
            <span className="flex items-center gap-1.5 text-orange-400">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              DPIIT Recognized Startup
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              StartupTN Approved
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-[#0081FB]">
              <MetaLogo className="w-3.5 h-3.5" />
              Meta Tech Provider
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Compact inline pills (e.g., right under hero buttons)
  if (variant === 'compact') {
    return (
      <div className={`space-y-2.5 ${className}`}>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Official Accreditations &amp; Alliances
          </span>
          <div className="h-px flex-1 bg-slate-200/80" />
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* DPIIT Pill */}
          <div className="h-9 inline-flex items-center gap-2 px-3 rounded-full bg-white border border-slate-200/90 shadow-2xs hover:border-orange-300 transition-colors shrink-0">
            <div className="h-5 flex items-center justify-center shrink-0">
              <Image
                src="/dpiit-logo-transparent.png"
                alt="DPIIT"
                width={70}
                height={20}
                style={{ height: '18px', width: 'auto' }}
                className="object-contain"
                unoptimized
              />
            </div>
            <span className="text-xs font-bold text-slate-800 whitespace-nowrap">DPIIT Recognized</span>
          </div>

          {/* StartupTN Pill */}
          <div className="h-9 inline-flex items-center gap-2 px-2.5 rounded-full bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-colors shrink-0">
            <div className="h-5 flex items-center justify-center shrink-0">
              <Image
                src="/startuptn-logo.png"
                alt="StartupTN"
                width={80}
                height={20}
                style={{ height: '18px', width: 'auto' }}
                className="object-contain rounded-xs"
                unoptimized
              />
            </div>
            <span className="text-xs font-bold text-slate-800 whitespace-nowrap">Approved Startup</span>
          </div>

          {/* Meta Tech Provider Pill */}
          <div className="h-9 inline-flex items-center gap-2 px-3 rounded-full bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-colors shrink-0">
            <div className="h-5 flex items-center justify-center shrink-0">
              <Image
                src="/meta-logo-transparent.png"
                alt="Meta"
                width={24}
                height={16}
                style={{ height: '16px', width: 'auto' }}
                className="object-contain"
                unoptimized
              />
            </div>
            <span className="text-xs font-bold text-slate-800 whitespace-nowrap">Meta Tech Provider</span>
          </div>
        </div>
      </div>
    );
  }

  // Dark-mode footer variant
  if (variant === 'footer') {
    return (
      <div className={`py-8 border-t border-b border-slate-800 my-8 ${className}`}>
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 text-[11px] font-bold uppercase tracking-wider border border-emerald-800/60">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Credentials</span>
              </div>
              <h4 className="text-base font-bold text-white mt-1">
                Government Recognitions &amp; Global Tech Alliances
              </h4>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              AuromindAI Private Limited is officially recognized under Startup India, StartupTN, and the Meta Business Partner ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* DPIIT Card */}
            <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center gap-4 hover:border-orange-500/50 transition-all">
              <div className="w-24 h-14 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 shadow-xs">
                <Image
                  src="/dpiit-logo-transparent.png"
                  alt="DPIIT #startupindia"
                  width={90}
                  height={40}
                  className="h-10 w-auto object-contain"
                  unoptimized
                />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>DPIIT Recognized</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Startup India • Govt. of India
                </div>
              </div>
            </div>

            {/* StartupTN Card */}
            <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center gap-4 hover:border-emerald-500/50 transition-all">
              <div className="w-24 h-14 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 shadow-xs">
                <Image
                  src="/startuptn-logo.png"
                  alt="StartupTN"
                  width={100}
                  height={28}
                  className="h-7 w-auto object-contain"
                  unoptimized
                />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>StartupTN Approved</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Govt. of Tamil Nadu Mission
                </div>
              </div>
            </div>

            {/* Meta Card */}
            <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center gap-4 hover:border-blue-500/50 transition-all">
              <div className="w-24 h-14 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 shadow-xs">
                <Image
                  src="/meta-logo-transparent.png"
                  alt="Meta"
                  width={56}
                  height={36}
                  className="h-8 w-auto object-contain"
                  unoptimized
                />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Meta Tech Provider</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0081FB] shrink-0" />
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  WhatsApp &amp; Meta Business
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full 'cards' variant (default: neat, clear, high-contrast 3-card showcase)
  return (
    <div className={`w-full ${className}`}>
      <div className="bg-gradient-to-r from-emerald-50/60 via-slate-50 to-emerald-50/60 rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#059669] text-xs font-bold uppercase tracking-wider border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Accreditations</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-2">
              Recognized &amp; Certified by Leading Government &amp; Tech Bodies
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm sm:text-right">
            Operating with verified startup certifications and enterprise technology partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: DPIIT #startupindia */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                  Government of India
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Recognized</span>
                </span>
              </div>

              {/* Logo Presentation Area */}
              <div className="h-16 flex items-center justify-start bg-slate-50/60 rounded-xl px-4 py-2 border border-slate-100 group-hover:bg-white transition-colors">
                <Image
                  src="/dpiit-logo-transparent.png"
                  alt="DPIIT #startupindia"
                  width={140}
                  height={55}
                  className="h-12 w-auto object-contain"
                  unoptimized
                />
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  DPIIT Recognized Startup
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Certified startup recognized by the Department for Promotion of Industry and Internal Trade under Startup India.
                </p>
              </div>
            </div>

            <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
              <span>Entity: AuromindAI Pvt Ltd</span>
              <span className="text-orange-600 font-bold">#startupindia</span>
            </div>
          </div>

          {/* Card 2: StartupTN */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Govt. of Tamil Nadu
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Approved</span>
                </span>
              </div>

              {/* Logo Presentation Area */}
              <div className="h-16 flex items-center justify-start bg-[#1d4ed8] rounded-xl px-4 py-2 shadow-xs group-hover:brightness-105 transition-all">
                <Image
                  src="/startuptn-logo.png"
                  alt="StartupTN - Government of Tamil Nadu"
                  width={150}
                  height={40}
                  className="h-10 w-auto object-contain"
                  unoptimized
                />
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  StartupTN Approved
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Registered and approved by Tamil Nadu Startup and Innovation Mission (TANSIM), supporting high-impact AI innovation.
                </p>
              </div>
            </div>

            <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
              <span>State: Tamil Nadu, India</span>
              <span className="text-emerald-700 font-bold">TANSIM Approved</span>
            </div>
          </div>

          {/* Card 3: Meta Tech Provider */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0081FB] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  Global Tech Alliance
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0081FB]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0081FB]" />
                  <span>Certified</span>
                </span>
              </div>

              {/* Logo Presentation Area */}
              <div className="h-16 flex items-center justify-start bg-slate-50/60 rounded-xl px-4 py-2 border border-slate-100 group-hover:bg-white transition-colors gap-3">
                <Image
                  src="/meta-logo-transparent.png"
                  alt="Meta Logo"
                  width={56}
                  height={38}
                  className="h-10 w-auto object-contain"
                  unoptimized
                />
                <div className="border-l border-slate-200 pl-3">
                  <div className="text-xs font-black tracking-tight text-slate-900">Meta</div>
                  <div className="text-[10px] font-bold uppercase text-[#0081FB]">Tech Provider</div>
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0081FB] transition-colors">
                  Meta Tech Provider
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Official technology provider building enterprise WhatsApp Cloud API solutions and automated AI customer interactions.
                </p>
              </div>
            </div>

            <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
              <span>Platform: WhatsApp &amp; Meta</span>
              <span className="text-[#0081FB] font-bold">Official Partner</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
