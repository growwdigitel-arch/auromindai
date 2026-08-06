'use client';

import React from 'react';
import { Bot, Database, Zap, Shield, BarChart3, Globe, MessageSquare, Users, Sparkles, Cpu, Layers, Lock } from 'lucide-react';

export function LandingFeatures() {
  const features = [
    {
      icon: Zap,
      title: 'AuroVex 1 Fast Neural Engine',
      description: 'Our proprietary model outputs 185 tokens/sec with 12ms TTFT. Built specifically for sub-second agent loops and instant chat.',
      color: 'bg-emerald-500',
      glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]',
    },
    {
      icon: Bot,
      title: 'Autonomous Multi-Agent AI Workers',
      description: 'Deploy pre-trained AI employees for Sales, Support, Marketing, and Coding that execute complex workflows independently.',
      color: 'bg-blue-500',
      glow: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]',
    },
    {
      icon: Database,
      title: 'Instant Document RAG & Vector Search',
      description: 'Connect PDF, DOCX, Notion, and website URLs. Our pgvector engine chunks and indexes knowledge with zero data leakage.',
      color: 'bg-amber-500',
      glow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]',
    },
    {
      icon: Shield,
      title: 'Enterprise RBAC & Zero Data Retention',
      description: 'Granular permissions, SSO, MFA, JWT auth, and cryptographically verified audit trails for strict SOC2 compliance.',
      color: 'bg-violet-500',
      glow: 'group-hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]',
    },
  ];

  const stats = [
    { value: '185 t/s', label: 'Inference Speed', icon: Zap },
    { value: '4,200+', label: 'Active Businesses', icon: Users },
    { value: '140M+', label: 'Prompts Processed', icon: Bot },
    { value: '99.99%', label: 'Uptime SLA', icon: BarChart3 },
  ];

  const channels = [
    { emoji: '💬', name: 'WhatsApp', sub: 'Real-time messaging' },
    { emoji: '📸', name: 'Instagram', sub: 'DM automation' },
    { emoji: '📧', name: 'Email', sub: 'Outreach & threads' },
    { emoji: '💼', name: 'Slack', sub: 'Team workflows' },
    { emoji: '📞', name: 'Voice AI', sub: 'Inbound / Outbound' },
    { emoji: '🌐', name: 'Web Chat', sub: 'Website widget' },
    { emoji: '📲', name: 'SMS', sub: 'Mass messaging' },
    { emoji: '🔗', name: 'API', sub: 'Any platform' },
  ];

  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto space-y-24">
      {/* Features Header & Cards Grid */}
      <div className="space-y-12">
        <div className="text-center space-y-3">
          <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block">
            Proprietary Tech Stack
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
            Engineered around <span className="text-emerald-600">AuroVex 1 Fast</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Everything your business needs to chat, automate workflows, and deploy enterprise AI teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <div key={idx} className={`floating-card p-6 space-y-4 group transition-all duration-300 ${f.glow}`}>
              <div className={`w-11 h-11 rounded-2xl ${f.color} flex items-center justify-center shadow-soft`}>
                <f.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold text-primary tracking-tight">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Banner */}
      <div className="rounded-3xl bg-primary p-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map(({ value, label, icon: Icon }, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-center">
              <Icon className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl md:text-4xl font-black text-white">{value}</div>
            <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{label}</div>
          </div>
        ))}
      </div>

      {/* Omnichannel Grid */}
      <div className="space-y-12">
        <div className="text-center space-y-3">
          <div className="text-xs font-bold text-secondary uppercase tracking-wider">Omnichannel Intelligence</div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">AuroVex 1 Fast Everywhere</h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Deploy your custom AI agents across all communication channels with a single click.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {channels.map((ch, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-border/80 shadow-soft hover:border-emerald-300 transition-all flex items-center gap-3">
              <span className="text-2xl">{ch.emoji}</span>
              <div>
                <div className="text-xs font-bold text-primary">{ch.name}</div>
                <div className="text-[10px] text-muted-foreground">{ch.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
