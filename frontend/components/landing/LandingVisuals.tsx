'use client';

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Share2, 
  Activity, 
  BarChart3, 
  Heart, 
  Building, 
  GraduationCap, 
  ShoppingBag, 
  Landmark, 
  Plane, 
  ShoppingCart,
  Send,
  Sparkles,
  Zap,
  Phone,
  MapPin,
  QrCode,
  CheckCircle2,
  Mail,
  Instagram,
  MessageCircle,
  Briefcase
} from 'lucide-react';

export function LandingVisuals() {
  const [activeTab, setActiveTab] = useState<'all' | 'sales' | 'support' | 'ops'>('all');

  const services = [
    {
      icon: MessageSquare,
      title: 'AI Chat Automation',
      description: 'Intelligent AI agents that understand, respond, and support 24/7.'
    },
    {
      icon: Share2,
      title: 'Multi-Channel Automation',
      description: 'Automate conversations across WhatsApp, Instagram, Gmail, and more.'
    },
    {
      icon: Zap,
      title: 'Workflow Automation',
      description: 'Streamline tasks and processes to save time and reduce manual work.'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Track performance and make data-driven decisions with ease.'
    }
  ];

  const industries = [
    {
      name: 'Healthcare & Medicine',
      emoji: '🏥',
      role: 'Patient Triage Specialist',
      color: 'from-[#059669]/10 via-zinc-950 to-zinc-950 border-[#10B981]/30 hover:border-[#10B981]/70',
      glow: 'group-hover:shadow-[0_0_35px_rgba(16,185,129,0.22)]',
      desc: 'Intelligently qualifies patient symptoms, triggers automated specialist scheduling, and streamlines HIPAA-compliant intake forms with 100% data privacy.',
      stat: '● 140k/mo Qualified Queries'
    },
    {
      name: 'Real Estate',
      emoji: '🏢',
      role: 'Virtual Property Broker',
      color: 'from-[#2563EB]/10 via-zinc-950 to-zinc-950 border-[#3B82F6]/30 hover:border-[#3B82F6]/70',
      glow: 'group-hover:shadow-[0_0_35px_rgba(59,130,246,0.22)]',
      desc: 'Books house tours on-demand, qualifies prospective buyer credit eligibility, and dynamically queries local MLS databases to present custom matching lists.',
      stat: '● 850+ Tours Booked'
    },
    {
      name: 'Education & EdTech',
      emoji: '🎓',
      role: 'Admissions Advisor',
      color: 'from-[#D97706]/10 via-zinc-950 to-zinc-950 border-[#F59E0B]/30 hover:border-[#F59E0B]/70',
      glow: 'group-hover:shadow-[0_0_35px_rgba(245,158,11,0.22)]',
      desc: 'Handles applicant registrations, resolves course syllabus FAQs, schedules advising meetings, and coordinates personalized online tutor sessions.',
      stat: '● 99.8% Academic SLA'
    },
    {
      name: 'Retail & Commerce',
      emoji: '🛍️',
      role: 'Omnichannel Concierge',
      color: 'from-[#E11D48]/10 via-zinc-950 to-zinc-950 border-[#F43F5E]/30 hover:border-[#F43F5E]/70',
      glow: 'group-hover:shadow-[0_0_35px_rgba(244,63,94,0.22)]',
      desc: 'Provides instant in-store inventory tracking, manages loyalty reward distributions, collects post-purchase reviews, and coordinates return logistics.',
      stat: '● 2.4M Inventory Syncs'
    },
    {
      name: 'Banking & Finance',
      emoji: '🏦',
      role: 'Compliance Officer AI',
      color: 'from-[#65A30D]/10 via-zinc-950 to-zinc-950 border-[#84CC16]/30 hover:border-[#84CC16]/70',
      glow: 'group-hover:shadow-[0_0_35px_rgba(132,204,22,0.22)]',
      desc: 'Parses complex multi-page SEC reporting files, executes first-level credit underwriting logic, and automates transaction auditing matching compliance requirements.',
      stat: '● SOC2 Audits Compliant'
    },
    {
      name: 'Travel & Lodging',
      emoji: '✈️',
      role: 'Booking Coordinator',
      color: 'from-[#0284C7]/10 via-zinc-950 to-zinc-950 border-[#0EA5E9]/30 hover:border-[#0EA5E9]/70',
      glow: 'group-hover:shadow-[0_0_35px_rgba(14,165,233,0.22)]',
      desc: 'Orchestrates flight & hotel bookings, processes cancellation claims instantly, and coordinates localized tour options based on user flight profiles.',
      stat: '● 45s Booking Completion'
    },
    {
      name: 'E-commerce Enterprise',
      emoji: '🛒',
      role: 'Cart Recovery Agent',
      color: 'from-[#7C3AED]/10 via-zinc-950 to-zinc-950 border-[#8B5CF6]/30 hover:border-[#8B5CF6]/70',
      glow: 'group-hover:shadow-[0_0_35px_rgba(139,92,246,0.22)]',
      desc: 'Automatically targets cart dropoffs via SMS, WhatsApp, and Instagram, offering personalized discount coupons to boost conversions by up to 25%.',
      stat: '● 24% Recovery Uplift'
    }
  ];

  return (
    <div className="space-y-32 py-16 px-6 max-w-7xl mx-auto">
      {/* 1. What We Do Section with phone mockup */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Content info */}
        <div className="lg:col-span-6 space-y-8 text-left">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-secondary text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> WHAT WE DO
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight leading-none">
              Smarter Conversations. <br/>
              <span className="text-secondary">Simplified.</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Deploy smart, pre-trained AI agents tailored for your business needs. Automate conversations across WhatsApp, Instagram, Email and Slack in minutes.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((srv, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-card border border-border/80 shadow-soft hover:shadow-floating hover:border-gray-300 transition-all group duration-300">
                <div className="w-9 h-9 rounded-xl bg-accent-light/40 border border-accent/20 flex items-center justify-center mb-3">
                  <srv.icon className="w-4.5 h-4.5 text-secondary group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-primary tracking-tight mb-1">{srv.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{srv.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: High-fidelity phone mockup */}
        <div className="lg:col-span-6 flex justify-center relative py-12">
          {/* Neon base podium */}
          <div className="absolute bottom-6 w-72 h-16 bg-gradient-to-t from-emerald-500/20 to-transparent blur-xl rounded-full" />
          <div className="absolute bottom-10 w-64 h-3 bg-emerald-950/10 border border-emerald-555 border-emerald-500/20 rounded-full scale-y-50 transform rotate-1" />

          {/* Surrounding Floating Integration Badges */}
          <div className="absolute -left-4 top-1/4 w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 shadow-md flex items-center justify-center animate-bounce duration-1000 select-none">
            <MessageCircle className="w-6 h-6 text-green-600 fill-green-600/10" />
          </div>
          <div className="absolute -right-4 top-1/3 w-12 h-12 rounded-full bg-pink-50 border border-pink-200 shadow-md flex items-center justify-center animate-bounce duration-1500 select-none">
            <Instagram className="w-6 h-6 text-pink-600" />
          </div>
          <div className="absolute left-6 bottom-1/4 w-12 h-12 rounded-full bg-blue-50 border border-blue-200 shadow-md flex items-center justify-center animate-bounce duration-2000 select-none">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <div className="absolute right-6 top-12 w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 shadow-md flex items-center justify-center animate-bounce duration-3000 select-none">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
          </div>

          {/* Mobile phone device wrapper */}
          <div className="w-[280px] h-[520px] rounded-[42px] border-[10px] border-zinc-950 bg-[#121214] shadow-2xl relative flex flex-col overflow-hidden select-none">
            {/* Top speaker notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-zinc-950 rounded-b-2xl z-20 flex justify-center items-center">
              <div className="w-8 h-1 bg-zinc-800 rounded-full mb-1" />
            </div>

            {/* Screen Content */}
            <div className="flex-1 flex flex-col pt-8 bg-zinc-950 relative">
              {/* Phone Header */}
              <div className="px-4 py-2 border-b border-zinc-900 flex items-center justify-between bg-zinc-950/80 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-zinc-100">AI Assistant</span>
                  <span className="px-1 py-0.5 rounded bg-zinc-900 text-[8px] font-semibold text-zinc-500">Online</span>
                </div>
                <div className="w-4 h-4 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 text-[10px] font-bold">+</div>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-left">
                {/* AI Msg */}
                <div className="space-y-1.5 max-w-[85%]">
                  <div className="text-[9px] font-semibold text-zinc-500">Auromind AI</div>
                  <div className="p-3 rounded-2xl rounded-tl-none bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 leading-relaxed shadow-sm">
                    Hi! How can I help you today?
                  </div>
                </div>

                {/* User Msg */}
                <div className="space-y-1.5 max-w-[85%] ml-auto text-right">
                  <div className="text-[9px] font-semibold text-zinc-500">User</div>
                  <div className="p-3 rounded-2xl rounded-tr-none bg-emerald-700/25 border border-emerald-800/30 text-[11px] text-emerald-250 text-left leading-relaxed shadow-sm">
                    I want to know about your services.
                  </div>
                </div>

                {/* AI Msg Response */}
                <div className="space-y-1.5 max-w-[85%]">
                  <div className="text-[9px] font-semibold text-zinc-500">Auromind AI</div>
                  <div className="p-3 rounded-2xl rounded-tl-none bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 leading-relaxed shadow-sm">
                    Sure! Here are our services for you.
                  </div>
                </div>
              </div>

              {/* Phone Footer */}
              <div className="p-3 border-t border-zinc-900 bg-zinc-950 shrink-0">
                <div className="rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-550">Type a message...</span>
                  <Send className="w-3.5 h-3.5 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Built For Every Industry Section */}
      <section className="space-y-12">
        {/* Neon Banner explaining the architecture */}
        <div className="relative rounded-3xl bg-zinc-950 border border-emerald-500/30 p-8 shadow-[0_0_40px_rgba(16,185,129,0.1)] overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-left max-w-2xl">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-455 text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-md border border-emerald-800/55">
                Zero-Config Industry Verticals
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Pre-trained Neural Workforces
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Connect your database to instantly activate dedicated AI agents trained on vertical compliance, specialized terminology, and multi-step execution workflows.
              </p>
            </div>
            <div className="shrink-0 flex gap-3 text-xs font-bold text-white">
              <div className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-1.5 shadow">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> 100% HIPAA/SOC2 Secure
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-3">
          <div className="text-xs font-semibold text-secondary uppercase tracking-wider">Enterprise Ingestion</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            Built for Every Industry
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Ready-to-run agents trained specifically on industry compliance, terminology, and workflows.
          </p>
        </div>

        {/* Big Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, idx) => {
            return (
              <div 
                key={idx} 
                className={`relative overflow-hidden rounded-3xl border bg-gradient-to-b ${ind.color} p-7 flex flex-col justify-between text-left group cursor-pointer shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-floating`}
              >
                {/* Glow Backdrop */}
                <div className={`absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${ind.glow}`} />

                <div className="space-y-6 relative z-10">
                  {/* Top Row: Emoji and Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-4xl select-none">{ind.emoji}</span>
                    <span className="text-[9px] font-extrabold text-emerald-450 bg-emerald-950/40 border border-emerald-900/30 px-2 py-0.5 rounded uppercase leading-none">
                      {ind.stat}
                    </span>
                  </div>

                  {/* Core Content */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold text-zinc-555 text-zinc-500 uppercase tracking-widest">{ind.name}</div>
                    <h3 className="text-lg font-black text-white tracking-tight leading-none group-hover:text-emerald-400 transition-colors">
                      {ind.role}
                    </h3>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-normal pt-1">
                      {ind.desc}
                    </p>
                  </div>
                </div>

                {/* Arrow indicator at bottom */}
                <div className="flex justify-end pt-4 mt-8 border-t border-zinc-900/60 relative z-10">
                  <span className="text-xs text-zinc-500 font-bold group-hover:text-white transition-colors flex items-center gap-1">
                    Deploy Agent <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Business Location contact details and QR Code widget */}
      <section className="pt-8 border-t border-border/80">
        <div className="rounded-3xl bg-zinc-900 border border-zinc-800/80 p-8 md:p-10 shadow-floating text-left flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-6 max-w-lg">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white tracking-tight">Let's Automate Your Business Growth</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Build better conversations. Create bigger impact. Integrate our autonomous AI Employees into your operational workflows today.
              </p>
            </div>

            <div className="space-y-3.5">
              <a href="tel:+917695951519" className="flex items-center gap-3 text-xs text-zinc-300 hover:text-white transition-colors">
                <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="font-bold">+91 7695951519</span>
              </a>
              <div className="flex items-center gap-3 text-xs text-zinc-300">
                <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="font-semibold">Chennai, Tamil Nadu, India</span>
              </div>
            </div>
          </div>

          {/* QR code widget */}
          <div className="flex items-center gap-5 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-sm shrink-0">
            <div className="w-20 h-20 bg-white rounded-xl p-1.5 flex items-center justify-center shrink-0 select-none relative group border border-zinc-800">
              <QrCode className="w-full h-full text-zinc-900" />
              {/* Dino mini icon center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded bg-white flex items-center justify-center border border-zinc-150 text-[9px]">🦖</div>
            </div>
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-zinc-200 uppercase tracking-wider">Scan to know more</div>
              <div className="text-[9px] text-zinc-500 leading-relaxed max-w-[120px]">
                Scan with your phone camera to explore Auromind AI details.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
