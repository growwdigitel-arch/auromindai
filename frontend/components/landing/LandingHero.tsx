'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, Bot, TrendingUp, ShieldCheck, Zap, Star, Sparkles, Globe, Cpu, Flame, CheckCircle2 } from 'lucide-react';

export function LandingHero() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState<'AuroVex 1 Fast' | 'AuroVex 1.5 Pro'>('AuroVex 1 Fast');

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && input.trim()) {
      localStorage.setItem('pending_prompt', input);
    }
    router.push('/login');
  };

  const samplePrompts = [
    { label: '⚡ Test AuroVex Speed', text: 'Write a Python FastAPI service using AuroVex 1 Fast' },
    { label: '📊 Analyze Market Data', text: 'Predict Q4 SaaS sales conversion metrics' },
    { label: '✉️ Sales Email Campaign', text: 'Draft outbound sales sequence for enterprise buyers' },
    { label: '🤖 Deploy AI Employee', text: 'Create an autonomous support bot trained on my docs' }
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 px-6 max-w-7xl mx-auto space-y-16">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-32 left-1/4 w-[350px] h-[350px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 text-xs font-extrabold shadow-soft animate-pulse">
          <Flame className="w-4 h-4 fill-emerald-500 text-emerald-500" />
          <span>AuroVex 1 Fast Engine Live · 185 Tokens/Sec · Sub-15ms Latency</span>
        </div>
      </div>

      {/* Hero Headline & Prompt Bar Grid */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Vision & CTAs */}
        <div className="space-y-8 text-left">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-primary leading-[1.08]">
              Next-Gen AI <br />
              Powered by <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-green-400">
                AuroVex 1 Fast.
              </span>
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
              Experience our flagship proprietary AI model. Chat, code, analyze data, and run autonomous agent teams like GPT-4o—at <strong className="text-primary font-bold">5x the speed</strong> and <strong className="text-primary font-bold">94% lower latency</strong>.
            </p>
          </div>

          {/* Core Spec Badges */}
          <div className="grid grid-cols-3 gap-3 max-w-lg">
            <div className="p-3 rounded-2xl bg-gray-50 border border-border">
              <div className="text-[10px] font-extrabold text-emerald-600 uppercase">Throughput</div>
              <div className="text-lg font-black text-primary">185 t/s</div>
              <div className="text-[10px] text-muted-foreground">Ultra Fast</div>
            </div>
            <div className="p-3 rounded-2xl bg-gray-50 border border-border">
              <div className="text-[10px] font-extrabold text-blue-600 uppercase">Latency</div>
              <div className="text-lg font-black text-primary">12 ms</div>
              <div className="text-[10px] text-muted-foreground">Sub-second</div>
            </div>
            <div className="p-3 rounded-2xl bg-gray-50 border border-border">
              <div className="text-[10px] font-extrabold text-violet-600 uppercase">Context</div>
              <div className="text-lg font-black text-primary">128K</div>
              <div className="text-[10px] text-muted-foreground">Up to 1M</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/login"
              className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-primary text-white font-black text-sm shadow-floating hover:bg-gray-900 transition-all hover:scale-105"
            >
              <span>Try AuroVex 1 Fast Free</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </Link>
            <a
              href="#auravex-model"
              className="flex items-center gap-2 px-7 py-4 rounded-2xl border border-border bg-white text-primary font-bold text-sm shadow-soft hover:bg-gray-50 transition-all"
            >
              <Cpu className="w-4 h-4 text-emerald-600" />
              <span>Model Benchmarks</span>
            </a>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-3 pt-2 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              {['bg-emerald-500', 'bg-blue-500', 'bg-teal-500', 'bg-violet-500'].map((c, i) => (
                <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-[9px] font-bold`}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div>
              <span className="font-bold text-primary">4,200+ teams</span> build on AuroVex 1 Fast
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
              ))}
              <span className="font-bold text-primary">4.9/5</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live ChatGPT-style Prompt Interface */}
        <div className="space-y-4">
          <form onSubmit={handlePromptSubmit}>
            <div className="rounded-3xl bg-white border border-border/90 shadow-floating p-5 space-y-4 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-400/20 transition-all">
              {/* Header inside prompt card */}
              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-xs font-black">
                    AV
                  </div>
                  <span className="text-xs font-bold text-primary">AuroVex Playground</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedModel('AuroVex 1 Fast')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      selectedModel === 'AuroVex 1 Fast'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'text-gray-500 hover:text-primary'
                    }`}
                  >
                    ⚡ AuroVex 1 Fast
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedModel('AuroVex 1.5 Pro')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      selectedModel === 'AuroVex 1.5 Pro'
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'text-gray-500 hover:text-primary'
                    }`}
                  >
                    🧠 AuroVex 1.5 Pro
                  </button>
                </div>
              </div>

              {/* Textarea */}
              <textarea
                rows={4}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handlePromptSubmit(e);
                  }
                }}
                placeholder={`Ask ${selectedModel} anything... e.g. 'Build a React dashboard component' or 'Analyze my revenue data'`}
                className="w-full resize-none bg-transparent text-sm text-primary placeholder:text-gray-400 focus:outline-none leading-relaxed"
              />

              {/* Preset prompt buttons */}
              <div className="space-y-2 pt-1">
                <div className="text-[10px] font-bold uppercase text-muted-foreground">Sample Prompts</div>
                <div className="flex flex-wrap gap-2">
                  {samplePrompts.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setInput(p.text)}
                      className="px-2.5 py-1 rounded-xl bg-gray-50 border border-border text-[11px] font-semibold text-gray-700 hover:bg-emerald-50 hover:border-emerald-200 transition-all text-left truncate max-w-[220px]"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action bar */}
              <div className="flex items-center justify-between pt-2 border-t border-border/40">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Web Search Active
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-gray-900 transition-all shadow-soft flex items-center gap-2 cursor-pointer hover:scale-105"
                >
                  <span>Run Prompt</span>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </div>
            </div>
          </form>

          {/* Model Status Card */}
          <div className="p-4 rounded-2xl bg-gray-900 text-white flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <span className="font-bold">AuroVex 1 Fast Neural Cluster:</span>
                <span className="text-gray-300 ml-1.5">99.99% Operational · Sub-15ms Latency</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-gray-800 text-emerald-400 font-mono font-bold text-[10px]">
              185.4 TPS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
