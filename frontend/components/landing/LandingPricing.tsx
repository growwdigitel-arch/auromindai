'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';

export function LandingPricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'forever',
      description: 'Ideal for individuals exploring AI Workers and rapid prototyping.',
      features: ['1 AI Employee', '10,000 AuroVex 1 tokens / mo', 'Standard Web Search', 'Community Support'],
      cta: 'Start Free',
      highlight: false,
    },
    {
      name: 'Pro',
      price: '$49',
      period: 'per user / mo',
      description: 'For growing teams automating sales, support, and marketing.',
      features: ['10 AI Employees', 'Unlimited AuroVex 1 & 1.5', 'pgvector Document RAG', 'Team RBAC & Workspace', 'Priority 24/7 SLA Support'],
      cta: 'Upgrade to Pro',
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'tailored billing',
      description: 'Dedicated infrastructure with on-premise model deployment and custom RAG.',
      features: ['Unlimited AI Employees', 'Custom Fine-tuned LLMs', 'Dedicated VPC Container', 'SOC2 / HIPAA Compliance', 'Dedicated Account Manager'],
      cta: 'Contact Sales',
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-3">
        <div className="text-xs font-semibold text-secondary uppercase tracking-wider">Transparent Billing</div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">Simple, Predictable Pricing</h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Scale from single-worker prototypes to multi-department enterprise AI workforces.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((p, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-8 flex flex-col justify-between space-y-6 transition-all ${
              p.highlight
                ? 'bg-primary text-white shadow-floating border-2 border-accent scale-105'
                : 'bg-card border border-border text-primary shadow-soft'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold tracking-wider uppercase">{p.name}</span>
                {p.highlight && (
                  <span className="px-3 py-1 rounded-full bg-accent text-white text-[10px] font-bold">
                    Most Popular
                  </span>
                )}
              </div>

              <div>
                <span className="text-4xl font-extrabold">{p.price}</span>
                <span className={`text-xs ml-2 ${p.highlight ? 'text-gray-300' : 'text-muted-foreground'}`}>
                  / {p.period}
                </span>
              </div>

              <p className={`text-xs leading-relaxed ${p.highlight ? 'text-gray-300' : 'text-muted-foreground'}`}>
                {p.description}
              </p>

              <div className="border-t border-border/40 pt-4 space-y-2.5">
                {p.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <Check className={`w-4 h-4 shrink-0 ${p.highlight ? 'text-accent' : 'text-secondary'}`} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/login"
              className={`w-full py-3 rounded-2xl font-bold text-xs text-center transition-all ${
                p.highlight
                  ? 'bg-secondary text-white shadow-soft hover:bg-emerald-600'
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
