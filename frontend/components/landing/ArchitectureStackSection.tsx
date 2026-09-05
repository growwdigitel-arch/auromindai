'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Layers, 
  Cpu, 
  Database, 
  Workflow, 
  ShieldCheck, 
  ArrowDown, 
  Sparkles, 
  Zap,
  Globe,
  Radio
} from 'lucide-react';

export function ArchitectureStackSection() {
  const [activeTier, setActiveTier] = useState<number>(1);

  const tiers = [
    {
      step: '01',
      title: 'Omnichannel Ingress & Stream Parsing',
      subtitle: 'Real-Time Event Gateway',
      icon: Globe,
      description: 'Ingests real-time events, customer inquiries, and data payloads from WhatsApp Cloud API, REST webhooks, SMS gateways, and enterprise web applications with sub-10ms edge ingestion.',
      specs: ['Sub-10ms Event Dispatch', 'End-to-End TLS 1.3 Encryption', 'Automatic Schema Normalization', 'DDoS & Rate-Limit Shield'],
      techBadges: ['WhatsApp Cloud API', 'Webhooks', 'WebSockets', 'REST / GraphQL', 'Twilio'],
    },
    {
      step: '02',
      title: 'Autonomous Multi-Agent Swarm Orchestrator',
      subtitle: 'Dynamic Reasoning & Goal Decomposition',
      icon: Cpu,
      description: 'The core engine splits broad high-level business goals into directed acyclic task graphs. Individual specialized agents (Sales, Support, BI) collaborate, cross-verify decisions, and synthesize execution plans.',
      specs: ['Hierarchical Agent Planning', 'Sub-second AST Synthesis', 'Consensus Verification Loops', 'Dynamic Fallback Routing'],
      techBadges: ['AuroVex 1 Fast Engine', 'Claude 3.5 Sonnet', 'GPT-4o', 'Llama 3.3 70B', 'Custom LoRA Adapters'],
    },
    {
      step: '03',
      title: 'Semantic Context & Hybrid RAG Memory',
      subtitle: 'Sub-15ms Enterprise Retrieval',
      icon: Database,
      description: 'Hybrid semantic vector search combined with structured relational databases. Agents access real-time inventory, medical protocols, lead histories, and legal contracts without token-limit degradation.',
      specs: ['Hybrid Vector + Full-Text BM25', 'Zero Hallucination Grounding', 'Context Window Compression', 'Row-Level RBAC Access'],
      techBadges: ['PostgreSQL pgvector', 'Qdrant', 'Pinecone', 'Redis Cluster', 'Encrypted S3'],
    },
    {
      step: '04',
      title: 'Sandboxed Tool Execution & Telemetry',
      subtitle: 'Safe Autonomous API Triggers',
      icon: Workflow,
      description: 'Safe containerized execution sandbox that triggers verified third-party API mutations: booking appointments, issuing refunds, sending WhatsApp confirmations, updating CRM pipelines, and logging full audit telemetry.',
      specs: ['Isolated Micro-VM Sandboxes', 'Tamper-Proof Audit Trails', 'Human-in-the-Loop Thresholds', '99.99% Execution Reliability'],
      techBadges: ['Docker / E2B Sandbox', 'Shopify Admin API', 'Stripe Payments', 'Google Calendar API', 'Epic / EHR'],
    },
  ];

  return (
    <section id="architecture" className="py-24 px-6 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Under The Hood</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Next-Gen Autonomous <span className="text-emerald-600">Agent Architecture</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            A 4-tier battle-tested stack built for high-throughput, low-latency enterprise operations with deterministic execution safety.
          </p>
        </div>

        {/* 4-Tier Interactive Architecture Diagram */}
        <div className="space-y-4 max-w-5xl mx-auto">
          {tiers.map((tier, idx) => {
            const Icon = tier.icon;
            const isSelected = activeTier === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveTier(idx)}
                className={`rounded-3xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'bg-slate-900 text-white border-emerald-500 shadow-2xl scale-[1.01]'
                    : 'bg-slate-50 text-slate-900 border-slate-200 hover:bg-slate-100/80 hover:border-slate-300'
                }`}
              >
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className={`font-mono text-2xl font-black ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`}>
                        {tier.step}
                      </span>
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                        isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-white border border-slate-200 text-emerald-600'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className={`text-lg sm:text-xl font-black ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {tier.title}
                        </h3>
                        <p className={`text-xs font-semibold ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`}>
                          {tier.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className={`text-xs font-bold px-3 py-1 rounded-full self-start sm:self-auto ${
                      isSelected ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-white text-slate-600 border border-slate-200'
                    }`}>
                      {isSelected ? 'Active Tier Inspector' : 'Click to inspect'}
                    </span>
                  </div>

                  {/* Expanded Details when Active */}
                  {isSelected && (
                    <div className="pt-4 border-t border-slate-800 space-y-5 animate-fadeIn">
                      <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
                        {tier.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                        {tier.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="bg-slate-950/80 border border-slate-800 p-3 rounded-2xl">
                            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-1">
                              <Zap className="w-3 h-3" />
                              <span>SPEC</span>
                            </div>
                            <span className="text-xs text-slate-200 font-medium">{spec}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <span className="text-xs font-mono text-slate-400 font-bold mr-2">TECH RUNTIME:</span>
                        {tier.techBadges.map((badge, bIdx) => (
                          <span key={bIdx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-mono font-medium border border-slate-700">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Live CTA Strip */}
        <div className="text-center pt-4">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-5 py-2.5 rounded-full border border-emerald-200 transition-colors"
          >
            <span>Learn how AuromindAI builds custom enterprise architectures</span>
            <span className="text-base font-black">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
