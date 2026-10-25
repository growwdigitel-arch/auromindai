'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2, ArrowRight, Play, MessageSquare, Users, BarChart3,
  Bot, Settings, Sparkles, Send, PhoneCall, Check, Layers, ShieldCheck,
  ExternalLink
} from 'lucide-react';

export function ProductShowcaseSection() {
  const [activeTab, setActiveTab] = useState('leads');

  const contacts = [
    { name: 'Priya Sharma', channel: 'WhatsApp', status: 'Booked Demo', time: '2m ago', active: true },
    { name: 'Rohit Mehta', channel: 'Instagram', status: 'Payment Completed', time: '14m ago', active: false },
    { name: 'Karthik R', channel: 'Website Bot', status: 'Evaluating Pricing', time: '45m ago', active: false },
    { name: 'Sneha Iyer', channel: 'WhatsApp', status: 'Lead Qualified', time: '1h ago', active: false },
    { name: 'Vikram G', channel: 'WhatsApp', status: 'Follow-up Sent', time: '2h ago', active: false },
    { name: 'Anita Desai', channel: 'Instagram', status: 'Meeting Scheduled', time: '3h ago', active: false },
  ];

  return (
    <section id="products" className="py-16 sm:py-24 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Our Product
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            AI Employees for Your Business
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Automate routine operations and scale customer interactions 24/7 without hiring extra staff.
          </p>
        </div>

        {/* Featured Product Box */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Product Info & Bullets */}
            <div className="lg:col-span-5 space-y-6">
              {/* Featured Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#059669] text-xs font-bold border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Product</span>
              </div>

              {/* Product Brand */}
              <div className="space-y-3">
                <a
                  href="https://orbionagents.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3.5 hover:opacity-95 transition-all"
                  title="Visit OrbionAgents.com"
                >
                  <div className="w-12 h-12 rounded-2xl bg-black border border-purple-500/30 shadow-[0_4px_20px_rgba(176,87,255,0.25)] p-2 flex items-center justify-center group-hover:scale-105 group-hover:border-purple-400 transition-all">
                    <Image
                      src="/orbion-logo-tight.png"
                      alt="OrbionAgents"
                      width={40}
                      height={40}
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      <span>Orbion<span className="text-[#9333ea]">Agents</span></span>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#9333ea] transition-colors" />
                    </div>
                    <span className="text-xs font-semibold text-purple-600 group-hover:underline">orbionagents.com</span>
                  </div>
                </a>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 leading-snug">
                  Your AI Employees for Sales, Marketing, Support and More.
                </h3>
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-3 pt-2">
                {[
                  'WhatsApp, Instagram, Website & more',
                  'Sales & Marketing Automation',
                  'Lead Generation & CRM',
                  'Multi-Channel Integration',
                  'Custom AI Agents for Your Business',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#059669] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="https://orbionagents.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#10b981] hover:bg-[#059669] text-white text-sm font-bold shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
                >
                  <span>Explore OrbionAgents</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href="https://orbionagents.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-900 text-sm font-bold border border-purple-200 hover:border-purple-300 transition-all hover:scale-[1.02]"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-purple-600" />
                  <span>orbionagents.com</span>
                </a>
              </div>
            </div>

            {/* Right Column: SaaS Dashboard & Floating Phone Chat Mockup */}
            <div className="lg:col-span-7 relative">
              <div className="relative rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-4 sm:p-6 text-slate-100 overflow-hidden">
                
                {/* App Header Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <a
                      href="https://orbionagents.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-slate-300 hover:text-purple-300 transition-colors ml-2 flex items-center gap-2"
                      title="Visit OrbionAgents.com"
                    >
                      <Image
                        src="/orbion-logo-tight.png"
                        alt="Orbion"
                        width={14}
                        height={14}
                        unoptimized
                        className="object-contain"
                      />
                      <span>app.orbionagents.com</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 font-semibold text-[11px]">System Online (24/7)</span>
                  </div>
                </div>

                {/* Dashboard Inner Layout */}
                <div className="grid grid-cols-12 gap-4 pt-4">
                  
                  {/* Left Mini Sidebar */}
                  <div className="hidden sm:block sm:col-span-4 space-y-1 pr-2 border-r border-slate-800 text-[11px]">
                    <div className="font-bold text-[10px] text-slate-500 uppercase tracking-wider mb-2">Navigation</div>
                    {[
                      { icon: Layers, label: 'Dashboard' },
                      { icon: MessageSquare, label: 'Live Inbox', active: true },
                      { icon: Users, label: 'Leads & CRM' },
                      { icon: BarChart3, label: 'Campaigns' },
                      { icon: Bot, label: 'AI Agents' },
                      { icon: Settings, label: 'Integrations' },
                    ].map((m, i) => {
                      const Icon = m.icon;
                      return (
                        <div
                          key={i}
                          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg font-medium cursor-pointer transition-colors ${
                            m.active
                              ? 'bg-[#059669] text-white font-bold'
                              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{m.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Leads Queue / Active Stream */}
                  <div className="col-span-12 sm:col-span-8 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-400 pb-1">
                      <span>Real-time Conversational Stream</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
                        6 Active AI Sessions
                      </span>
                    </div>

                    <div className="space-y-1.5 max-h-[260px] overflow-hidden">
                      {contacts.map((c, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-colors ${
                            c.active
                              ? 'bg-slate-800/90 border-emerald-500/40 text-white'
                              : 'bg-slate-850/50 border-slate-800/80 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center font-bold text-[10px] text-emerald-400">
                              {c.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-slate-100">{c.name}</div>
                              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                                <span>{c.channel}</span>
                                <span>•</span>
                                <span className="text-emerald-400">{c.status}</span>
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-500">{c.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Mobile WhatsApp Chat Mockup - visible on XL displays without overflowing card */}
                <div className="hidden xl:block absolute -bottom-6 -right-4 w-[230px] rounded-3xl bg-slate-900 border-4 border-slate-800 shadow-2xl overflow-hidden z-20">
                  {/* Phone Notch & Header */}
                  <div className="bg-[#075E54] text-white p-3 text-[11px] flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold">
                      A
                    </div>
                    <div>
                      <div className="font-bold leading-tight">Auromind AI Agent</div>
                      <div className="text-[9px] text-emerald-200">Online • Typically replies instantly</div>
                    </div>
                  </div>

                  {/* WhatsApp Messages */}
                  <div className="p-3 bg-[#0B141A] space-y-2 text-[10px] min-h-[170px]">
                    <div className="bg-[#202C33] text-slate-200 p-2 rounded-lg rounded-tl-none max-w-[85%]">
                      Hello! I noticed you are interested in automating your customer support.
                    </div>
                    <div className="bg-[#005C4B] text-white p-2 rounded-lg rounded-tr-none ml-auto max-w-[85%]">
                      Yes! Can this integrate with our Shopify store?
                    </div>
                    <div className="bg-[#202C33] text-slate-200 p-2 rounded-lg rounded-tl-none max-w-[90%]">
                      <p>Absolutely! It auto-syncs orders, updates tracking, and answers queries 24/7.</p>
                      <div className="mt-1.5 pt-1.5 border-t border-slate-700/60 flex items-center justify-between text-emerald-400 font-bold">
                        <span>Book 15-min Demo</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
