'use client';

import React, { useState } from 'react';
import { Zap, Cpu, Code2, Brain, Shield, Sparkles, CheckCircle2, ArrowRight, Gauge, Layers, Lock, Flame } from 'lucide-react';

export function AuroVexShowcase() {
  const [selectedTab, setSelectedTab] = useState<'benchmarks' | 'architecture' | 'comparison'>('benchmarks');

  const models = [
    {
      id: 'auravex-1-fast',
      name: 'AuroVex 1 Fast',
      tag: 'FLAGSHIP MODEL',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30',
      description: 'Ultra-low latency model engineered for instant chat, sub-second agent loops, and real-time streaming.',
      speed: '185 tokens/sec',
      latency: '12ms TTFT',
      context: '128,000 tokens',
      mmlu: '88.4%',
      humanEval: '89.2%',
      recommendedFor: 'Real-time Chat, Voice Assistants, High-volume Support & Sales Bots',
      highlight: true
    },
    {
      id: 'auravex-1-5-pro',
      name: 'AuroVex 1.5 Pro',
      tag: 'DEEP REASONING',
      badgeColor: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
      description: 'Maximum intelligence model for complex multi-step reasoning, mathematical proofing, and deep data analysis.',
      speed: '95 tokens/sec',
      latency: '45ms TTFT',
      context: '1,000,000 tokens',
      mmlu: '94.8%',
      humanEval: '92.6%',
      recommendedFor: 'Complex Financial Modeling, Legal Document Analysis, Strategy RAG',
      highlight: false
    },
    {
      id: 'auravex-code',
      name: 'AuroVex Code',
      tag: 'SOFTWARE ENG',
      badgeColor: 'bg-violet-500/10 text-violet-600 border-violet-500/30',
      description: 'Specialized code completion & architecture LLM trained on billions of lines of audited repository code.',
      speed: '160 tokens/sec',
      latency: '18ms TTFT',
      context: '256,000 tokens',
      mmlu: '90.1%',
      humanEval: '95.4%',
      recommendedFor: 'Full-stack Code Generation, Automated Refactoring & Bug Fixing',
      highlight: false
    }
  ];

  const benchmarks = [
    {
      metric: 'Inference Speed (Tokens/sec)',
      auravexFast: '185 t/s',
      auravexPro: '95 t/s',
      gpt4o: '82 t/s',
      claude35: '74 t/s',
      gemini15: '90 t/s',
      win: 'AuroVex 1 Fast is 2.2x Faster'
    },
    {
      metric: 'Time to First Token (TTFT)',
      auravexFast: '12 ms',
      auravexPro: '45 ms',
      gpt4o: '280 ms',
      claude35: '320 ms',
      gemini15: '250 ms',
      win: '23x Lower Latency'
    },
    {
      metric: 'HumanEval (Coding Accuracy)',
      auravexFast: '89.2%',
      auravexPro: '92.6%',
      gpt4o: '90.2%',
      claude35: '92.0%',
      gemini15: '84.1%',
      win: 'Industry Leading Code Score'
    },
    {
      metric: 'MMLU (57 Academic Subjects)',
      auravexFast: '88.4%',
      auravexPro: '94.8%',
      gpt4o: '88.6%',
      claude35: '88.7%',
      gemini15: '85.9%',
      win: 'State-of-the-Art Intelligence'
    },
    {
      metric: 'Price per 1M Input Tokens',
      auravexFast: '$0.15',
      auravexPro: '$1.25',
      gpt4o: '$2.50',
      claude35: '$3.00',
      gemini15: '$1.25',
      win: 'Up to 94% Cost Reduction'
    }
  ];

  return (
    <section id="auravex-model" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 text-xs font-bold uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500 animate-pulse" />
          Our Proprietary AI Engine
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-primary">
          Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">AuroVex 1 Fast</span>
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Engineered from the ground up for sub-second streaming, razor-sharp reasoning, and seamless ChatGPT-style conversations at enterprise scale.
        </p>
      </div>

      {/* Grid of Models */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {models.map((m) => (
          <div
            key={m.id}
            className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
              m.highlight
                ? 'bg-gradient-to-b from-white to-emerald-50/50 border-2 border-emerald-500 shadow-[0_12px_40px_rgba(16,185,129,0.15)] scale-[1.02]'
                : 'bg-white border border-border shadow-soft hover:border-gray-300'
            }`}
          >
            {m.highlight && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-black uppercase tracking-widest shadow-md flex items-center gap-1.5">
                <Zap className="w-3 h-3 fill-white" /> Recommended Flagship
              </div>
            )}

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black ${m.highlight ? 'bg-emerald-600 text-white' : 'bg-primary text-white'}`}>
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-primary">{m.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${m.badgeColor}`}>
                      {m.tag}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {m.description}
              </p>

              {/* Specs pill list */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <div className="p-2.5 rounded-xl bg-gray-50 border border-border/60">
                  <div className="text-[10px] font-bold text-muted-foreground">Speed</div>
                  <div className="text-sm font-black text-emerald-600">{m.speed}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 border border-border/60">
                  <div className="text-[10px] font-bold text-muted-foreground">Latency</div>
                  <div className="text-sm font-black text-primary">{m.latency}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 border border-border/60">
                  <div className="text-[10px] font-bold text-muted-foreground">HumanEval</div>
                  <div className="text-sm font-black text-primary">{m.humanEval}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 border border-border/60">
                  <div className="text-[10px] font-bold text-muted-foreground">Context Window</div>
                  <div className="text-sm font-black text-primary">{m.context}</div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border/40 mt-6 space-y-3">
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Best Suited For</div>
              <p className="text-xs font-semibold text-primary">{m.recommendedFor}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Benchmark Matrix Section */}
      <div className="rounded-3xl border border-border bg-white shadow-floating p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <h3 className="text-2xl font-black text-primary flex items-center gap-2">
              <Gauge className="w-6 h-6 text-emerald-600" />
              Benchmark Performance Matrix
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Independent evaluation comparing AuroVex 1 Fast against leading global frontier models.
            </p>
          </div>
          <div className="flex items-center gap-2 p-1 rounded-xl bg-gray-100 border border-border">
            <button
              onClick={() => setSelectedTab('benchmarks')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedTab === 'benchmarks' ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:text-primary'}`}
            >
              Speed & Latency
            </button>
            <button
              onClick={() => setSelectedTab('architecture')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedTab === 'architecture' ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:text-primary'}`}
            >
              Accuracy Scores
            </button>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/60 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <th className="pb-3 px-3">Benchmark / Metric</th>
                <th className="pb-3 px-3 text-emerald-600 bg-emerald-50/50 rounded-t-xl font-extrabold">AuroVex 1 Fast (Ours)</th>
                <th className="pb-3 px-3">AuroVex 1.5 Pro</th>
                <th className="pb-3 px-3">GPT-4o</th>
                <th className="pb-3 px-3">Claude 3.5 Sonnet</th>
                <th className="pb-3 px-3">Gemini 1.5 Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-xs">
              {benchmarks.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-3 font-bold text-primary">{row.metric}</td>
                  <td className="py-4 px-3 font-black text-emerald-600 bg-emerald-50/30">
                    <div className="flex items-center gap-1.5">
                      <span>{row.auravexFast}</span>
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">WIN</span>
                    </div>
                  </td>
                  <td className="py-4 px-3 font-semibold text-gray-700">{row.auravexPro}</td>
                  <td className="py-4 px-3 text-muted-foreground">{row.gpt4o}</td>
                  <td className="py-4 px-3 text-muted-foreground">{row.claude35}</td>
                  <td className="py-4 px-3 text-muted-foreground">{row.gemini15}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer callout inside benchmark box */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-900 to-gray-900 text-white mt-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs font-bold">100% Zero Data Retention & Enterprise Privacy</div>
              <div className="text-[11px] text-gray-300">Your prompts and proprietary business documents are never used for model training.</div>
            </div>
          </div>
          <a
            href="/login"
            className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-all shrink-0"
          >
            Start Free with AuroVex 1 Fast
          </a>
        </div>
      </div>
    </section>
  );
}
