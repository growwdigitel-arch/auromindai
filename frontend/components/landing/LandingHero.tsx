'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, Bot, TrendingUp, Headphones, ShieldCheck, Zap, Star } from 'lucide-react';

export function LandingHero() {
  const router = useRouter();
  const [input, setInput] = useState('');

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      router.push('/dashboard');
      return;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('pending_prompt', input);
    }
    router.push('/dashboard');
  };

  const trustedBrands = ['Shopify', 'Stripe', 'Notion', 'Figma', 'Linear', 'Vercel'];

  return (
    <section className="relative overflow-hidden pt-16 pb-20 px-6 max-w-7xl mx-auto">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content - Two Column */}
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Copy */}
        <div className="space-y-8 text-left">
          {/* Top badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            AuroVex 1.5 Architecture · Now Live
          </div>

          <div className="space-y-5">
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-primary leading-[1.05]">
              AI Employees <br/>
              that work{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-400">24/7.</span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full opacity-60" />
              </span>
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
              Automate Sales, Customer Support, Marketing, and Operations with autonomous AI agents trained on your enterprise data. Deploy in minutes, scale to millions.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-primary text-white font-bold text-sm shadow-floating hover:bg-gray-900 transition-all hover:scale-105 active:scale-100"
            >
              <span>Start Free</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </Link>
            <Link
              href="#pricing"
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl border border-border bg-white text-primary font-semibold text-sm shadow-soft hover:bg-card transition-all"
            >
              <span>Book Demo</span>
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex -space-x-2">
              {['bg-emerald-500', 'bg-blue-500', 'bg-amber-500', 'bg-pink-500', 'bg-violet-500'].map((c, i) => (
                <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-[9px] font-bold shadow-sm`}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">
              <span className="font-bold text-primary">4,200+</span> businesses trust AuromindAI
            </div>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
              ))}
              <span className="text-xs font-bold text-primary ml-1">4.9</span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Prompt + Live Agent Preview */}
        <div className="space-y-5">
          {/* Prompt Box */}
          <form onSubmit={handlePromptSubmit}>
            <div className="rounded-3xl bg-white border border-border/80 shadow-floating p-4 text-left space-y-3 focus-within:border-emerald-300 focus-within:shadow-[0_0_20px_rgba(16,185,129,0.12)] transition-all duration-300">
              <div className="flex items-center gap-2 px-2 pb-1 border-b border-border/40">
                <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center">
                  <Image src="/logo.png" alt="Logo" width={16} height={16} unoptimized className="rounded-sm" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground">AuromindAI</span>
                <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">● LIVE</span>
              </div>
              <textarea
                rows={3}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handlePromptSubmit(e);
                  }
                }}
                placeholder="Try: 'Automate my customer support emails' or 'Build a sales outreach bot'..."
                className="w-full resize-none bg-transparent px-2 text-sm text-primary placeholder:text-gray-400 focus:outline-none"
              />
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <button type="button" className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black hover:border-gray-300 transition-colors text-base leading-none">+</button>
                  <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                    <span className="text-sm">🌐</span>
                    <span>Web search</span>
                  </button>
                </div>
                <button type="submit" className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:bg-gray-800 transition-all shadow-soft cursor-pointer hover:scale-105">
                  <span className="text-base font-bold leading-none">↑</span>
                </button>
              </div>
            </div>
          </form>

          {/* Live Agent Status Card */}
          <div className="rounded-2xl border border-border bg-white shadow-soft p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center overflow-hidden">
                  <Image src="/logo.png" alt="Agent" width={28} height={28} unoptimized className="rounded-lg" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary">Auromind Sales Agent</div>
                  <div className="text-[11px] text-emerald-600 font-semibold">● Autonomous Mode · 1,240 emails sent</div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-extrabold uppercase tracking-wider">Online 24/7</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: TrendingUp, label: 'Conversion', value: '34.2%', sub: '+8.4% vs human', color: 'text-emerald-600' },
                { icon: Headphones, label: 'Response', value: '<4s', sub: 'Zero latency', color: 'text-blue-600' },
                { icon: ShieldCheck, label: 'Compliance', value: '100%', sub: 'SOC2 Ready', color: 'text-violet-600' },
              ].map(({ icon: Icon, label, value, sub, color }, i) => (
                <div key={i} className="p-3 rounded-xl bg-gray-50 border border-border/60">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground mb-1">
                    <Icon className={`w-3.5 h-3.5 ${color}`} />
                    {label}
                  </div>
                  <div className="text-lg font-black text-primary">{value}</div>
                  <div className={`text-[10px] font-semibold ${color}`}>{sub}</div>
                </div>
              ))}
            </div>

            {/* Live activity feed */}
            <div className="space-y-2">
              {[
                { action: 'Sent follow-up to Acme Corp', time: '2s ago', dot: 'bg-emerald-500' },
                { action: 'Qualified lead: John Smith (Enterprise)', time: '14s ago', dot: 'bg-blue-500' },
                { action: 'Scheduled demo call for Tuesday', time: '1m ago', dot: 'bg-amber-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                  <span className={`w-1.5 h-1.5 rounded-full ${item.dot} shrink-0`} />
                  <span className="flex-1 truncate">{item.action}</span>
                  <span className="text-[10px] text-gray-400 shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trusted by brands strip */}
      <div className="mt-20 text-center space-y-5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Trusted by teams at</p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {trustedBrands.map((brand, i) => (
            <span key={i} className="text-sm font-black text-gray-300 tracking-tight hover:text-gray-500 transition-colors select-none">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
