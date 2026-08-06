'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Sparkles, Zap, Flame } from 'lucide-react';

export function LandingPricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'forever free',
      description: 'Ideal for individuals testing AuroVex 1 Fast and prompt prototyping.',
      features: [
        'AuroVex 1 Fast Access (50,000 tokens/mo)',
        '1 Autonomous AI Employee',
        'Standard Web Search & Reasoning',
        'Community Discord & Forum Support'
      ],
      cta: 'Start Free with AuroVex 1',
      highlight: false,
    },
    {
      name: 'Pro',
      price: '$49',
      period: 'per user / mo',
      description: 'For teams automating sales, coding, support, and business workflows.',
      features: [
        'Unlimited AuroVex 1 Fast & 1.5 Pro Tokens',
        'Unlimited Autonomous AI Employees',
        'pgvector Document RAG (PDF, DOCX, Web)',
        'Team Workspace & Role Permissions (RBAC)',
        'Priority Sub-Second SLA & 24/7 Support'
      ],
      cta: 'Upgrade to Pro',
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'tailored cluster',
      description: 'Dedicated infrastructure with on-premise AuroVex fine-tuning and custom RAG.',
      features: [
        'Custom Fine-Tuned AuroVex Models',
        'Dedicated Private VPC & GPU Nodes',
        'Zero Data Retention Guarantee',
        'SOC2 Type II & HIPAA Compliance',
        'Dedicated Solutions Architect & SLA'
      ],
      cta: 'Contact Enterprise Sales',
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-3">
        <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block">
          Predictable Pricing
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
          Simple Plans for <span className="text-emerald-600">AuroVex 1 Fast</span>
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Start for free, scale to millions of tokens without surprising usage bills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((p, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-8 flex flex-col justify-between space-y-6 transition-all ${
              p.highlight
                ? 'bg-primary text-white shadow-floating border-2 border-emerald-500 scale-105'
                : 'bg-white border border-border text-primary shadow-soft'
            }`}
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold tracking-wider uppercase">{p.name}</span>
                {p.highlight && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500 text-black text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-black" /> Most Popular
                  </span>
                )}
              </div>

              <div>
                <span className="text-4xl font-black">{p.price}</span>
                <span className={`text-xs ml-2 ${p.highlight ? 'text-gray-300' : 'text-muted-foreground'}`}>
                  / {p.period}
                </span>
              </div>

              <p className={`text-xs leading-relaxed ${p.highlight ? 'text-gray-300' : 'text-muted-foreground'}`}>
                {p.description}
              </p>

              <div className="border-t border-border/40 pt-4 space-y-3">
                {p.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${p.highlight ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/login"
              className={`w-full py-3.5 rounded-2xl font-bold text-xs text-center transition-all ${
                p.highlight
                  ? 'bg-emerald-500 text-black shadow-soft hover:bg-emerald-400 font-black'
                  : 'bg-primary text-white hover:bg-gray-900'
              }`}
            >
              {p.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
