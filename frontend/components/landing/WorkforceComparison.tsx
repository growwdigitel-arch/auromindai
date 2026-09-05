'use client';

import React from 'react';
import { Check, X, Sparkles, Bot, Clock, DollarSign, Zap, Layers } from 'lucide-react';

export function WorkforceComparison() {
  const rows = [
    {
      feature: 'Availability & Response Latency',
      traditional: 'Limited to office hours; 4 to 24-hour delayed replies',
      auromind: 'Instant 24/7/365 active response within 38 seconds'
    },
    {
      feature: 'Task & Workflow Execution',
      traditional: 'Rigid decision trees; fails whenever user goes off-script',
      auromind: 'Autonomous goal reasoning; executes complex multi-step APIs'
    },
    {
      feature: 'Channel Coverage',
      traditional: 'Fragmented apps; separate tools for email, chat, and CRM',
      auromind: 'Unified omnichannel swarm: WhatsApp, Web, SMS, CRM & API'
    },
    {
      feature: 'Customer Context & Memory',
      traditional: 'Memory resets on session close; repetitive questioning',
      auromind: 'Persistent semantic vector memory across weeks & months'
    },
    {
      feature: 'Scalability Under Traffic Spikes',
      traditional: 'Requires hiring & training new staff; high overhead',
      auromind: 'Instantly scales to thousands of concurrent conversations'
    },
    {
      feature: 'Operational Cost Efficiency',
      traditional: 'High recurring salaries, benefits, and software seat licenses',
      auromind: 'Up to 80% reduction in customer acquisition & support costs'
    }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Workforce Evolution</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          Legacy Systems vs. <span className="text-[#16A34A]">AuromindAI Swarms</span>.
        </h2>

        <p className="text-base text-slate-600 font-normal leading-relaxed">
          See why forward-thinking enterprises are transitioning from static chatbots and manual operations to AuromindAI autonomous swarms.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-extrabold text-xs uppercase tracking-wider">
                <th className="py-5 px-6 w-1/3">Capability / Dimension</th>
                <th className="py-5 px-6 w-1/3 text-slate-500">Traditional Software &amp; Legacy Bots</th>
                <th className="py-5 px-6 w-1/3 bg-emerald-50/70 text-emerald-800 border-l border-r border-emerald-200 font-black">
                  AuromindAI Autonomous Swarms
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900 text-sm">
                    {row.feature}
                  </td>
                  <td className="py-4 px-6 text-slate-500 font-medium">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{row.traditional}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 bg-emerald-50/40 border-l border-r border-emerald-100 font-bold text-slate-900">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span>{row.auromind}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
