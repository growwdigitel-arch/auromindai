'use client';

import React from 'react';
import { Bot, Database, Zap, Shield, BarChart3, Globe, MessageSquare, Users } from 'lucide-react';

export function LandingFeatures() {
  const features = [
    {
      icon: Bot,
      title: 'Autonomous AI Employees',
      description: 'Deploy pre-trained AI workers for Sales, Support, Marketing, and Coding that execute complex multi-step workflows independently.',
      color: 'bg-emerald-500',
      glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]',
    },
    {
      icon: Database,
      title: 'Instant Document RAG',
      description: 'Connect PDF, DOCX, Notion, and website URLs. Our pgvector engine chunks and indexes knowledge with zero data leakage.',
      color: 'bg-blue-500',
      glow: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]',
    },
    {
      icon: Zap,
      title: 'AuroVex 1.5 Engine',
      description: 'Powered by high-speed reasoning with 1M token context window, sub-second streaming, and parallel multi-agent execution.',
      color: 'bg-amber-500',
      glow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]',
    },
    {
      icon: Shield,
      title: 'Enterprise RBAC & Audits',
      description: 'Granular permissions, SSO, MFA, JWT auth, and cryptographically verified audit trails for enterprise compliance.',
      color: 'bg-violet-500',
      glow: 'group-hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]',
    },
  ];

  const stats = [
    { value: '4,200+', label: 'Active Businesses', icon: Users },
    { value: '140M+', label: 'Tasks Automated', icon: Bot },
    { value: '99.98%', label: 'Uptime SLA', icon: BarChart3 },
    { value: '50+', label: 'Countries', icon: Globe },
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

      {/* ── Features Grid ── */}
      <div className="space-y-12">
        <div className="text-center space-y-3">
          <div className="text-xs font-semibold text-secondary uppercase tracking-wider">Enterprise Architecture</div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">Engineered for Maximum Performance</h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Everything your business needs to build, deploy, and scale autonomous AI teams.
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

      {/* ── Stats Banner ── */}
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

      {/* ── Multi-Channel Grid ── */}
      <div className="space-y-12">
        <div className="text-center space-y-3">
          <div className="text-xs font-semibold text-secondary uppercase tracking-wider">Omnichannel Reach</div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">One AI. Every Channel.</h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Your AI agents work simultaneously across all platforms your customers use — with a single unified dashboard.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {channels.map((ch, i) => (
            <div key={i} className="p-5 rounded-2xl bg-card border border-border hover:border-emerald-200 hover:shadow-soft transition-all duration-200 text-center group cursor-pointer">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{ch.emoji}</div>
              <div className="text-sm font-bold text-primary">{ch.name}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{ch.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── How It Works ── */}
      <div className="space-y-12">
        <div className="text-center space-y-3">
          <div className="text-xs font-semibold text-secondary uppercase tracking-wider">3-Step Setup</div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">Live in Under 5 Minutes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              title: 'Connect Your Data',
              desc: 'Upload documents, connect your CRM, or paste a website URL. Our RAG engine instantly indexes your knowledge base.',
              color: 'border-emerald-300 bg-emerald-50',
              num: 'text-emerald-600',
            },
            {
              step: '02',
              title: 'Configure Your Agent',
              desc: 'Choose a pre-built agent template or craft a custom one. Define tone, escalation rules, and multi-step automation logic.',
              color: 'border-blue-300 bg-blue-50',
              num: 'text-blue-600',
            },
            {
              step: '03',
              title: 'Deploy Everywhere',
              desc: 'Activate on WhatsApp, Email, Instagram, or your website with one click. Your AI agent is live and learning immediately.',
              color: 'border-violet-300 bg-violet-50',
              num: 'text-violet-600',
            },
          ].map((s, i) => (
            <div key={i} className={`p-7 rounded-3xl border-2 ${s.color} space-y-4 relative`}>
              <span className={`text-5xl font-black opacity-20 ${s.num}`}>{s.step}</span>
              <h3 className="text-lg font-bold text-primary tracking-tight">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-5 z-10 w-9 h-9 rounded-full bg-white border border-border shadow-soft flex items-center justify-center text-primary font-bold text-sm">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Testimonials ── */}
      <div className="space-y-10">
        <div className="text-center space-y-3">
          <div className="text-xs font-semibold text-secondary uppercase tracking-wider">Customer Stories</div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">Loved by 4,200+ Teams</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "Auromind replaced our entire BDR team. We now close 3× more deals with 40% lower customer acquisition cost.",
              name: 'Sarah Kline',
              role: 'VP Sales · TechVault',
              avatar: 'SK',
              color: 'bg-emerald-500',
            },
            {
              quote: "Our support CSAT went from 68% to 97% in 6 weeks. The AI handles 94% of tickets without human escalation.",
              name: 'Ravi Menon',
              role: 'Head of CX · Buildly',
              avatar: 'RM',
              color: 'bg-blue-500',
            },
            {
              quote: "I deployed a full healthcare intake bot in 2 days. HIPAA-compliant, zero hallucinations, patients love it.",
              name: 'Dr. Priya Shah',
              role: 'Founder · MedAssist AI',
              avatar: 'PS',
              color: 'bg-violet-500',
            },
          ].map((t, i) => (
            <div key={i} className="p-6 rounded-3xl bg-card border border-border shadow-soft space-y-5 hover:shadow-floating hover:border-gray-200 transition-all duration-200">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold`}>{t.avatar}</div>
                <div>
                  <div className="text-sm font-bold text-primary">{t.name}</div>
                  <div className="text-[11px] text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
