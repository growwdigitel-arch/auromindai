'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export function LandingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is AuromindAI and what products/solutions do you offer?',
      a: 'AuromindAI is an enterprise AI systems studio and engineering platform. We architect custom autonomous AI swarms, AI software, and mobile applications across 6 core industries: eCommerce, Healthcare, Giving AI, Real Estate, AI Software, and Mobile Applications. Our flagship production platform is AuromindAI Swarms (auromindai.com).'
    },
    {
      q: 'What makes AuromindAI autonomous swarms different from standard chatbots?',
      a: 'Traditional chatbots only generate conversational text based on static scripts. AuromindAI builds autonomous execution swarms that break down complex high-level business goals into sub-tasks, plan multi-agent workflows, interact with databases, trigger webhooks, and autonomously finish operations from start to finish.'
    },
    {
      q: 'How does AuromindAI connect to WhatsApp, databases, and custom APIs?',
      a: 'We engineer native connectors for WhatsApp Cloud API, Shopify, PostgreSQL, MySQL, and custom REST/GraphQL APIs. Integration takes minimal time: connect credentials or webhooks, and the system begins processing operations with zero friction.'
    },
    {
      q: 'How is data privacy, HIPAA compliance, and data sovereignty handled?',
      a: 'All enterprise and customer data is strictly isolated within dedicated tenant sandboxes. We enforce Zero Data Retention (ZDR) policies with LLM providers, AES-256 encryption in transit and at rest, and HIPAA-compliant audit trails.'
    },
    {
      q: 'Can human staff review or override agent decisions?',
      a: 'Yes. AuromindAI implements configurable Human-in-the-Loop guardrails. You can set financial thresholds, sensitive contract review points, or high-tier clinical or lead actions to require explicit manager approval before execution.'
    }
  ];

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold shadow-sm">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>Got Questions?</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          Frequently Asked <span className="text-[#16A34A]">Questions</span>.
        </h2>

        <p className="text-base text-slate-600 font-normal">
          Everything you need to know about our technology, deployment timelines, and security.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4 text-left">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-6 flex items-center justify-between text-left gap-4 hover:bg-slate-50/50 transition-colors"
              >
                <span className="text-base font-bold text-slate-900">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-emerald-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
