'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  Sparkles, 
  Cpu, 
  Workflow, 
  ShieldCheck, 
  Zap, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  Network, 
  Activity, 
  Users2,
  Database,
  Lock,
  ExternalLink
} from 'lucide-react';

export function OrbionAgentsShowcase() {
  const [activeTab, setActiveTab] = useState<'architecture' | 'swarms' | 'tools' | 'enterprise'>('architecture');

  const agents = [
    {
      role: 'Sales Sentinel Agent',
      status: 'Active · Autonomous',
      metric: '99.4% Lead Qualification',
      task: 'Engaging inbound leads across WhatsApp & Web, qualifying budget, and booking VIP calendar slots.',
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-600 border-emerald-200'
    },
    {
      role: 'Research & Intelligence Agent',
      status: 'Active · Deep Query',
      metric: '10x Faster Market Research',
      task: 'Synthesizing competitor pricing, cross-referencing MLS listings, and compiling executive briefings.',
      color: 'from-blue-500/20 to-cyan-500/20 text-blue-600 border-blue-200'
    },
    {
      role: 'Workflow Execution Agent',
      status: 'Active · Tool Runner',
      metric: 'Zero Human Latency',
      task: 'Triggering database updates, generating client proposals, and orchestrating API webhooks.',
      color: 'from-purple-500/20 to-indigo-500/20 text-purple-600 border-purple-200'
    },
    {
      role: 'Support Guardian Agent',
      status: 'Active · 24/7 Resolver',
      metric: '42s Avg Resolution',
      task: 'Resolving customer queries, managing order status, and routing complex tickets with full context.',
      color: 'from-amber-500/20 to-orange-500/20 text-amber-600 border-amber-200'
    }
  ];

  return (
    <section id="orbionagents" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
      {/* Top Section Header - Highlighting orbionagents.com as our one ready product */}
      <div className="text-center space-y-5 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400 bg-emerald-50 text-emerald-800 text-xs font-bold shadow-sm">
          <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold text-[10px] uppercase tracking-wider">
            Our 1 Ready Product
          </span>
          <span className="font-extrabold text-slate-900 text-sm">orbionagents.com</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
          Ready to Deploy Today:<br />
          <a
            href="https://orbionagents.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#16A34A] hover:underline inline-flex items-center gap-2.5 transition-all hover:scale-105"
          >
            <span>orbionagents.com</span>
            <ExternalLink className="w-7 h-7 sm:w-9 sm:h-9 text-emerald-600 inline shrink-0" />
          </a>
        </h2>

        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
          As of now, our ready and fully operational flagship product is <strong className="text-slate-900 font-bold">OrbionAgents</strong> — an autonomous multi-agent AI workforce engineered to independently run sales, support, and business workflows 24/7.
        </p>

        {/* Highlighted Direct Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://orbionagents.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-2xl bg-[#16A34A] hover:bg-emerald-700 text-white font-black text-sm shadow-[0_12px_28px_-6px_rgba(22,163,74,0.45)] flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95"
          >
            <span>Launch Live Product (orbionagents.com)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Production Ready &amp; Live</span>
          </div>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto p-1.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold">
        <button
          onClick={() => setActiveTab('architecture')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'architecture'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-emerald-600" />
          <span>Core Architecture</span>
        </button>

        <button
          onClick={() => setActiveTab('swarms')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'swarms'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Network className="w-3.5 h-3.5 text-emerald-600" />
          <span>Multi-Agent Swarms</span>
        </button>

        <button
          onClick={() => setActiveTab('tools')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'tools'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Workflow className="w-3.5 h-3.5 text-emerald-600" />
          <span>Tool Execution</span>
        </button>

        <button
          onClick={() => setActiveTab('enterprise')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'enterprise'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Security &amp; Guardrails</span>
        </button>
      </div>

      {/* Main Feature Grid & Terminal Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: 4 Core Capabilities */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3 hover:border-emerald-300 transition-all group">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Autonomous Objective Decomposition</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Give OrbionAgents a high-level business goal (&quot;Qualify today&apos;s inbound real estate inquiries and prepare WhatsApp offers&quot;). The engine automatically synthesizes steps, creates subtasks, and assigns specialized agents.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3 hover:border-emerald-300 transition-all group">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Long-Term Enterprise Memory</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never forgets customer preferences or historical orders. OrbionAgents retains client context across months of conversation with sub-second vector retrieval.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3 hover:border-emerald-300 transition-all group">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Workflow className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Native API &amp; Tool Orchestration</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Integrates directly into your existing infrastructure: Shopify, HubSpot, MLS property registries, PostgreSQL databases, and custom REST APIs.
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Agent Swarm Inspector */}
        <div className="lg:col-span-6 rounded-3xl bg-slate-950 text-white p-6 sm:p-8 space-y-6 shadow-xl border border-slate-800">
          {/* Terminal Top Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2">orbion-swarm-cluster:v2.4</span>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              4 Agents Running
            </span>
          </div>

          {/* Active Agents List */}
          <div className="space-y-3">
            {agents.map((agent, i) => (
              <div 
                key={i} 
                className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all text-left space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-bold text-sm text-white">{agent.role}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    {agent.metric}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {agent.task}
                </p>
              </div>
            ))}
          </div>

          {/* Action CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80 text-xs">
            <span className="text-slate-400 font-mono">Live Cluster: orbionagents.com</span>
            <a
              href="https://orbionagents.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 transition-all shadow-md hover:scale-105"
            >
              <span>Visit orbionagents.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
