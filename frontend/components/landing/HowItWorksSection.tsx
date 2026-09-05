'use client';

import React from 'react';
import { Network, Zap, CheckCircle2, ArrowRight, ShieldCheck, Database, Bot, Sparkles } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Connect & Context Ingestion',
      badge: 'Zero-Code Integration',
      description: 'Connect your business channels in minutes. AuromindAI natively hooks into WhatsApp, your databases, product catalogs, and proprietary enterprise documentation.',
      icon: Database,
      details: ['One-click WhatsApp & Webhook sync', 'Secure semantic document ingestion', 'Instant enterprise schema mapping']
    },
    {
      number: '02',
      title: 'Autonomous Swarm Orchestration',
      badge: 'Multi-Agent Collaboration',
      description: 'State your business goal. The core engine dynamically spins up specialized agents (Sales, Research, Support, Tool Execution) that communicate and collaborate to solve the objective.',
      icon: Network,
      details: ['Autonomous goal decomposition', 'Sub-task delegation & peer review', 'Long-term customer memory retention']
    },
    {
      number: '03',
      title: 'Action Execution & Verified Outcomes',
      badge: 'Real-Time Delivery',
      description: 'Agents do not just generate text—they take action. From qualifying leads and triggering calendar bookings to updating CRM pipelines and recovering abandoned carts.',
      icon: Zap,
      details: ['Live API & webhook execution', 'Strict human-in-the-loop guardrails', 'Real-time telemetry & audit logging']
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Execution Engine</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          How <span className="text-[#16A34A]">AuromindAI</span> Works.
        </h2>

        <p className="text-base text-slate-600 font-normal leading-relaxed">
          From high-level business goals to verified outcomes in three seamless, autonomous phases.
        </p>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 space-y-6 flex flex-col justify-between text-left group"
            >
              <div className="space-y-4">
                {/* Step Top */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-slate-300 group-hover:text-emerald-500 transition-colors font-mono">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {step.badge}
                  </span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-emerald-500 group-hover:text-white flex items-center justify-center text-slate-700 transition-colors duration-200">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>

              {/* Bullet Points */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                {step.details.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
