'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiteHeader } from '@/components/landing/SiteHeader';
import { SiteFooter } from '@/components/landing/SiteFooter';
import {
  Sparkles,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Check,
  MessageSquare,
  Bot,
  Users,
  Database,
  Clock,
  Zap,
  ShieldCheck,
  Layers,
  Send,
  Smartphone,
  Globe,
  Workflow,
  Cpu,
  PhoneCall,
  Sliders,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  BarChart3,
  Headphones,
  Share2,
  Search,
  FileText,
  RefreshCw,
  Play,
  Lock,
  Settings,
  DollarSign,
  Award,
  Radio
} from 'lucide-react';

interface ScenarioMessage {
  sender: 'customer' | 'agent';
  time: string;
  text: string;
  badge?: string;
  isAction?: boolean;
  actionText?: string;
  isThinking?: boolean;
}

interface Scenario {
  name: string;
  channel: string;
  customerName: string;
  customerTitle: string;
  messages: ScenarioMessage[];
}

export default function ProductsPage() {
  // Interactive Dashboard Tab
  const [activeCockpitTab, setActiveCockpitTab] = useState<'inbox' | 'fleet' | 'simulator' | 'integrations'>('inbox');
  
  // Interactive Simulator Scenario
  const [activeScenario, setActiveScenario] = useState<'sales' | 'support' | 'ecommerce' | 'appointment'>('sales');

  // ROI Calculator Inquiries Slider
  const [monthlyInquiries, setMonthlyInquiries] = useState<number>(3500);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Scenarios for interactive simulator
  const scenarios: Record<'sales' | 'support' | 'ecommerce' | 'appointment', Scenario> = {
    sales: {
      name: 'B2B Sales Qualification',
      channel: 'WhatsApp Business',
      customerName: 'Vikram Malhotra',
      customerTitle: 'VP Growth at Enterprise Tech',
      messages: [
        { sender: 'customer', time: '10:14 AM', text: 'Hi, we are exploring AI automation for our 20-person sales team. Do you support HubSpot and WhatsApp simultaneously?' },
        { sender: 'agent', time: '10:14 AM', text: 'Hello Vikram! Yes, absolutely. OrbionAgents offers native bidirectional sync with HubSpot and supports the official WhatsApp Business Cloud API. Leads are enriched and updated instantly.', badge: 'Intent: Qualified B2B Buyer' },
        { sender: 'customer', time: '10:15 AM', text: 'Great. Can we book a custom demo with an AI solutions architect this Thursday at 3 PM?' },
        { sender: 'agent', time: '10:15 AM', text: "I've locked in Thursday, 3:00 PM IST for your executive walkthrough. Calendar invite and preparation brief have been sent to your email. Looking forward to speaking!", isAction: true, actionText: '✓ Meeting Confirmed • Synced to HubSpot & Google Calendar' }
      ]
    },
    support: {
      name: '24/7 Customer Support',
      channel: 'Website Live Concierge',
      customerName: 'Ananya Roy',
      customerTitle: 'Premium Tier Customer',
      messages: [
        { sender: 'customer', time: '02:20 AM', text: 'My order #AURO-9481 has not arrived yet. Can you check where it is?' },
        { sender: 'agent', time: '02:20 AM', text: 'Checking your order right now, Ananya...', isThinking: true },
        { sender: 'agent', time: '02:20 AM', text: 'Found it! Your package #AURO-9481 is out for delivery with BlueDart and is scheduled to reach your doorstep today by 4:30 PM. Here is your live courier tracking link.', badge: 'Database Vector Lookup: 0.4s' },
        { sender: 'customer', time: '02:21 AM', text: 'Amazing, thank you for the super quick response in the middle of the night!' }
      ]
    },
    ecommerce: {
      name: 'Abandoned Cart Recovery',
      channel: 'Instagram Direct',
      customerName: 'Sneha Kapur',
      customerTitle: 'Shopper',
      messages: [
        { sender: 'agent', time: '04:02 PM', text: 'Hey Sneha! 👋 We noticed you left the Velvet Luxe Jacket in your cart. Would you like a 10% VIP discount code before stock runs out?' },
        { sender: 'customer', time: '04:05 PM', text: 'Oh wow yes! Does this come in size Medium with express delivery?' },
        { sender: 'agent', time: '04:05 AM', text: 'Yes! We have 3 units of Medium in stock with 2-day express shipping. Use code VIP10 at checkout here: store.link/checkout/9382', isAction: true, actionText: '✓ Cart Recovered • $145 Order Completed' }
      ]
    },
    appointment: {
      name: 'Clinic / Real Estate Booking',
      channel: 'Omnichannel Web Bot',
      customerName: 'Dr. Sameer Patel',
      customerTitle: 'Property Investor',
      messages: [
        { sender: 'customer', time: '11:42 AM', text: 'I would like to schedule a private tour of the 4BHK Penthouse in Worli.' },
        { sender: 'agent', time: '11:42 AM', text: 'Excellent choice Dr. Patel. The Skyline Penthouse in Worli is available for private walkthroughs this Saturday at 11 AM or Sunday at 4 PM. Which time suits your schedule best?' },
        { sender: 'customer', time: '11:43 AM', text: 'Saturday at 11 AM works perfectly for me.' },
        { sender: 'agent', time: '11:43 AM', text: 'Confirmed! Private concierge walkthrough confirmed for Saturday 11:00 AM. Brocure and gate entry pass dispatched to your WhatsApp.', isAction: true, actionText: '✓ Site Visit Scheduled • High Net-Worth Lead Tagged' }
      ]
    }
  };

  // Calculations for ROI Slider
  const hoursSavedPerMonth = Math.round((monthlyInquiries * 4.5) / 60);
  const costSavedDollars = Math.round(monthlyInquiries * 1.35);
  const costSavedRupees = Math.round(monthlyInquiries * 112).toLocaleString('en-IN');
  const responseSpeedReduction = '99.8%';
  const extraLeadsConverted = Math.round(monthlyInquiries * 0.08);

  const faqs = [
    {
      q: 'What is OrbionAgents and how does it connect to AuromindAI?',
      a: 'OrbionAgents (orbionagents.com) is AuromindAI\'s flagship autonomous AI agent platform. While AuromindAI provides comprehensive AI architecture and enterprise solutions, OrbionAgents is our ready-to-deploy SaaS product that equips businesses with pre-trained AI employees for sales, marketing, customer support, and operational workflows across WhatsApp, Instagram, Web, and CRM systems.'
    },
    {
      q: 'How fast can our business go live with OrbionAgents?',
      a: 'Most businesses are fully live within 15 to 30 minutes! Simply sync your company knowledge base (PDFs, Notion docs, helpdesk URLs, or e-commerce catalog), connect your communication channels via QR scan or API token, customize your agent\'s persona and guardrails, and start handling customer inquiries automatically.'
    },
    {
      q: 'Can human agents take over conversations at any time?',
      a: 'Yes, seamlessly. OrbionAgents includes a unified Live Inbox where human team members can monitor conversations in real-time. If a complex query arises or a customer requests human assistance, the AI gracefully pauses, notifies your human staff, and provides a full contextual briefing summary.'
    },
    {
      q: 'Which channels and CRMs are natively supported?',
      a: 'OrbionAgents natively integrates with WhatsApp Business Cloud API, Instagram Direct & Comments, Website Live Widgets, AI Voice/Telephony, HubSpot, Salesforce, Zoho, Shopify, WooCommerce, Google Sheets, Slack, and custom webhooks / REST APIs.'
    },
    {
      q: 'How does OrbionAgents prevent hallucinations and incorrect answers?',
      a: 'We implement rigorous multi-tier deterministic guardrails. Agents prioritize your verified knowledge base through high-accuracy vector embeddings (RAG). When information is not found in your approved documents, the agent politely admits it or routes the customer to human staff rather than guessing.'
    },
    {
      q: 'Does OrbionAgents support multilingual conversations?',
      a: 'Yes! OrbionAgents automatically detects and responds fluently in over 95 languages — including Hindi, Spanish, Arabic, French, German, Japanese, Portuguese, and regional Indian vernaculars — without requiring separate translation software.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      <SiteHeader activePage="products" />

      <main className="py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb & Live System Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-8 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-400">
              <Link href="/" className="hover:text-[#059669] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-slate-600 font-medium">Products</span>
              <span>/</span>
              <span className="text-[#059669] font-bold">OrbionAgents</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200/80 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>OrbionAgents v2.6 Online</span>
              <span className="text-emerald-400">•</span>
              <span className="text-slate-600">99.98% Uptime SLA</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PRODUCT HERO SECTION */}
          {/* ========================================================================= */}
          <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-24">
            
            {/* Category Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-[#9333ea] text-xs sm:text-sm font-bold border border-purple-200 shadow-xs mb-6 hover:bg-purple-100 transition-colors">
              <Sparkles className="w-4 h-4 text-[#9333ea]" />
              <span>Next-Generation Autonomous AI Workforce</span>
            </div>

            {/* Brand Logo & Title Link */}
            <div className="mb-6">
              <a
                href="https://orbionagents.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 sm:gap-4 text-4xl sm:text-6xl font-black text-slate-900 tracking-tight hover:opacity-95 transition-all"
                title="Visit OrbionAgents.com"
              >
                <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-black border border-purple-500/40 shadow-[0_8px_32px_rgba(147,51,234,0.3)] p-2.5 flex items-center justify-center group-hover:scale-105 group-hover:border-purple-400 transition-all shrink-0">
                  <Image
                    src="/orbion-logo-tight.png"
                    alt="OrbionAgents Logo"
                    width={56}
                    height={56}
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span>Orbion<span className="text-[#9333ea]">Agents</span></span>
                  <ExternalLink className="w-5 h-5 sm:w-7 sm:h-7 text-slate-400 group-hover:text-[#9333ea] transition-colors" />
                </div>
              </a>

              <div className="mt-2.5">
                <a
                  href="https://orbionagents.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-semibold text-purple-600 hover:text-purple-800 hover:underline inline-flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>https://orbionagents.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Hero Main Heading */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-snug">
              AI Employees for Your Sales, Marketing, Support &amp; Operations.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 mt-5 leading-relaxed max-w-3xl mx-auto">
              Empower your business with multi-agent intelligence that operates 24/7 across WhatsApp, Instagram, Web, and your CRM — answering inquiries in under 2 seconds, qualifying high-value leads, and booking appointments without hiring extra headcount.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 pt-8">
              <a
                href="https://orbionagents.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#10b981] hover:bg-[#059669] text-white font-bold text-sm sm:text-base shadow-[0_10px_25px_-5px_rgba(16,185,129,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(16,185,129,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Launch OrbionAgents</span>
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Schedule Solution Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust Metric Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-10 max-w-3xl mx-auto">
              {[
                { label: 'Inbound Response', value: '< 1.2s', icon: Zap, color: 'text-emerald-600' },
                { label: 'Uptime & Availability', value: '24/7/365', icon: Clock, color: 'text-purple-600' },
                { label: 'Languages Supported', value: '95+ Nat.', icon: Globe, color: 'text-blue-600' },
                { label: 'Average Pipeline Lift', value: '4.8x', icon: TrendingUp, color: 'text-emerald-600' },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
                      <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
                      <span>{stat.label}</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                      {stat.value}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* ========================================================================= */}
          {/* INTERACTIVE SAAS PLATFORM COCKPIT & LIVE SIMULATOR */}
          {/* ========================================================================= */}
          <section className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Live Interactive Experience
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2.5">
                Experience OrbionAgents in Action
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Switch tabs below to inspect how the autonomous dashboard, multi-agent fleet, and live inbox work in production.
              </p>
            </div>

            {/* Interactive Cockpit Container */}
            <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden text-slate-100">
              
              {/* Cockpit Top Navigation Bar */}
              <div className="flex flex-wrap items-center justify-between p-4 sm:p-5 border-b border-slate-800/90 gap-4 bg-slate-900/60 backdrop-blur-md">
                
                {/* Window Dots & Domain */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <a
                    href="https://orbionagents.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-slate-400 hover:text-purple-300 transition-colors flex items-center gap-2 pl-2 border-l border-slate-800"
                  >
                    <Image
                      src="/orbion-logo-tight.png"
                      alt="Orbion"
                      width={16}
                      height={16}
                      unoptimized
                      className="object-contain"
                    />
                    <span>app.orbionagents.com</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </div>

                {/* Cockpit Mode Switcher Tabs */}
                <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold overflow-x-auto max-w-full">
                  <button
                    onClick={() => setActiveCockpitTab('inbox')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                      activeCockpitTab === 'inbox'
                        ? 'bg-[#059669] text-white shadow-xs font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Live Inbox</span>
                  </button>

                  <button
                    onClick={() => setActiveCockpitTab('simulator')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                      activeCockpitTab === 'simulator'
                        ? 'bg-[#9333ea] text-white shadow-xs font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>AI Simulator</span>
                  </button>

                  <button
                    onClick={() => setActiveCockpitTab('fleet')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                      activeCockpitTab === 'fleet'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Agent Fleet</span>
                  </button>

                  <button
                    onClick={() => setActiveCockpitTab('integrations')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                      activeCockpitTab === 'integrations'
                        ? 'bg-emerald-600 text-white shadow-xs font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Integrations</span>
                  </button>
                </div>

                {/* Status Indicator */}
                <div className="hidden sm:flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono text-emerald-400 font-medium">Cluster Active (Sub-second RAG)</span>
                </div>

              </div>

              {/* Cockpit Content Area */}
              <div className="p-4 sm:p-8 min-h-[480px]">
                
                {/* 1. TAB: LIVE INBOX */}
                {activeCockpitTab === 'inbox' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in duration-300">
                    
                    {/* Inbox Sidebar Streams */}
                    <div className="lg:col-span-5 space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-1">
                        <span>Active Inbound Sessions</span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                          6 Active AI Dialogues
                        </span>
                      </div>

                      <div className="space-y-2">
                        {[
                          { name: 'Priya Sharma', channel: 'WhatsApp', status: 'Demo Booked', time: '1m ago', preview: 'Locked in for Thursday 3:00 PM', active: true, tag: 'High Intent' },
                          { name: 'Rohit Mehta', channel: 'Instagram DM', status: 'Payment Link Sent', time: '5m ago', preview: 'Invoice sent for Enterprise Tier', active: false, tag: 'Deal In Progress' },
                          { name: 'Karthik R', channel: 'Website Bot', status: 'Evaluating Pricing', time: '12m ago', preview: 'Inquiring about 50,000 MAU volume', active: false, tag: 'Lead Scored 94' },
                          { name: 'Sneha Iyer', channel: 'WhatsApp', status: 'Lead Qualified', time: '24m ago', preview: 'Forwarded to Regional Account Exec', active: false, tag: 'B2B Wholesale' },
                          { name: 'Vikram G', channel: 'Voice Telephony', status: 'Call Transcribed', time: '1h ago', preview: 'AI conducted 3m phone screening', active: false, tag: 'Audio Processed' },
                        ].map((c, i) => (
                          <div
                            key={i}
                            className={`p-3 rounded-2xl border text-xs transition-all cursor-pointer ${
                              c.active
                                ? 'bg-slate-800/90 border-emerald-500/50 shadow-md'
                                : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/50 text-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                                  c.active ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                                }`}>
                                  {c.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-bold text-white text-xs">{c.name}</div>
                                  <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                                    <span className="text-emerald-400 font-medium">{c.channel}</span>
                                    <span>•</span>
                                    <span>{c.status}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] text-slate-500 block">{c.time}</span>
                                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60 mt-1 inline-block">
                                  {c.tag}
                                </span>
                              </div>
                            </div>
                            <div className="mt-2 text-[11px] text-slate-400 truncate pl-1 border-l-2 border-slate-700">
                              {c.preview}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Inbox Detail Chat View */}
                    <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between min-h-[420px]">
                      
                      {/* Active Chat Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                            <MessageSquare className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-white flex items-center gap-2">
                              <span>Priya Sharma</span>
                              <span className="text-[10px] font-normal px-2 py-0.2 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                                WhatsApp Verified
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400">Chief Marketing Officer at Omnichannel Brands</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-1 rounded border border-purple-800/40">
                            Agent: Sales Sentinel v2
                          </span>
                        </div>
                      </div>

                      {/* Chat Messages */}
                      <div className="py-4 space-y-3 font-sans text-xs flex-1">
                        <div className="bg-slate-800/80 text-slate-200 p-3 rounded-2xl rounded-tl-none max-w-[85%] border border-slate-700/50">
                          <p>Hello! We currently get around 8,000 customer DMs every month on WhatsApp and Instagram. How does OrbionAgents handle peak surges without lagging?</p>
                          <span className="text-[9px] text-slate-400 block mt-1">10:12 AM</span>
                        </div>

                        <div className="bg-emerald-950/70 text-emerald-100 p-3.5 rounded-2xl rounded-tr-none ml-auto max-w-[88%] border border-emerald-800/60 space-y-2">
                          <div className="flex items-center justify-between text-[10px] text-emerald-400 font-mono pb-1 border-b border-emerald-800/40">
                            <span className="flex items-center gap-1">
                              <Bot className="w-3 h-3" />
                              <span>Orbion Autonomous Agent</span>
                            </span>
                            <span>Latency: 0.9s</span>
                          </div>
                          <p className="leading-relaxed">
                            Hi Priya! OrbionAgents runs on serverless containerized clusters that auto-scale horizontally. Whether you receive 10 or 10,000 inquiries in a single minute, every user experiences an average response time under 1.2 seconds with full contextual memory.
                          </p>
                          <div className="bg-emerald-900/50 p-2 rounded-xl text-[11px] border border-emerald-700/40 flex items-center justify-between">
                            <span className="font-semibold text-emerald-200">Would you like to review our High-Volume Architecture whitepaper?</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px]">Auto-Prepared</span>
                          </div>
                          <span className="text-[9px] text-emerald-400/70 block text-right">10:12 AM • Read</span>
                        </div>

                        <div className="bg-slate-800/80 text-slate-200 p-3 rounded-2xl rounded-tl-none max-w-[85%] border border-slate-700/50">
                          <p>Yes please, and let us schedule a 20-min demo with your team this Thursday.</p>
                          <span className="text-[9px] text-slate-400 block mt-1">10:13 AM</span>
                        </div>

                        <div className="bg-emerald-950/70 text-emerald-100 p-3.5 rounded-2xl rounded-tr-none ml-auto max-w-[88%] border border-emerald-800/60 space-y-1.5">
                          <p className="leading-relaxed">
                            All set! I have reserved Thursday at 3:00 PM IST with an enterprise AI solutions engineer. An invite has been dispatched to your WhatsApp and email.
                          </p>
                          <div className="px-3 py-1.5 rounded-lg bg-emerald-900/80 border border-emerald-700 text-[10px] font-mono text-emerald-300 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>Action Executed: Calendar Invite Generated &amp; Synced to CRM</span>
                          </div>
                        </div>
                      </div>

                      {/* Message Input Bottom Strip */}
                      <div className="pt-3 border-t border-slate-800 flex items-center gap-2 text-xs">
                        <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-400 flex items-center justify-between">
                          <span>AI is monitoring this live session (Human takeover ready)...</span>
                          <span className="text-[10px] font-mono text-emerald-400">Autopilot On</span>
                        </div>
                        <a
                          href="https://orbionagents.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shrink-0"
                        >
                          <span>Launch Live</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                    </div>

                  </div>
                )}

                {/* 2. TAB: AI SIMULATOR */}
                {activeCockpitTab === 'simulator' && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="text-center max-w-xl mx-auto">
                      <h3 className="text-lg font-bold text-white">Choose a Customer Scenario to Test</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        See how OrbionAgents autonomously resolves different real-world scenarios across channels.
                      </p>
                    </div>

                    {/* Scenario Pills */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-3xl mx-auto">
                      {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map((key) => {
                        const s = scenarios[key];
                        return (
                          <button
                            key={key}
                            onClick={() => setActiveScenario(key)}
                            className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                              activeScenario === key
                                ? 'bg-purple-950/80 border-purple-500 text-white shadow-md'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
                            }`}
                          >
                            <div className="text-[10px] text-purple-400 font-mono uppercase">{s.channel}</div>
                            <div className="mt-1 text-xs truncate">{s.name}</div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Scenario Interactive Window */}
                    <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                        <div>
                          <div className="font-bold text-white">{scenarios[activeScenario].customerName}</div>
                          <div className="text-[10px] text-slate-400">{scenarios[activeScenario].customerTitle} • {scenarios[activeScenario].channel}</div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                          Automated Handling
                        </span>
                      </div>

                      <div className="space-y-3 text-xs">
                        {scenarios[activeScenario].messages.map((m, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-2xl text-xs ${
                              m.sender === 'customer'
                                ? 'bg-slate-800/90 text-slate-200 rounded-tl-none max-w-[85%] border border-slate-700/60'
                                : 'bg-purple-950/70 text-purple-100 rounded-tr-none ml-auto max-w-[88%] border border-purple-800/60'
                            }`}
                          >
                            {m.badge && (
                              <div className="text-[9px] font-mono text-purple-300 pb-1 mb-1 border-b border-purple-800/40">
                                ⚡ {m.badge}
                              </div>
                            )}
                            <p className="leading-relaxed">{m.text}</p>
                            {m.isAction && (
                              <div className="mt-2 p-2 rounded-lg bg-emerald-950/80 border border-emerald-700/60 text-[10px] font-mono text-emerald-300 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span>{m.actionText}</span>
                              </div>
                            )}
                            <span className="text-[9px] text-slate-500 block text-right mt-1">{m.time}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-slate-800 text-center">
                        <a
                          href="https://orbionagents.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300"
                        >
                          <span>Deploy this exact workflow for your business</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                  </div>
                )}

                {/* 3. TAB: FLEET INSPECTOR */}
                {activeCockpitTab === 'fleet' && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="text-center max-w-xl mx-auto">
                      <h3 className="text-lg font-bold text-white">4 Specialized Pre-Trained AI Agents</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Each agent runs specialized system prompts, domain knowledge vectors, and API execution tools.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          name: 'Sales Sentinel Agent',
                          status: 'Autonomous • Pipeline Closer',
                          metric: '99.4% Qualification Precision',
                          desc: 'Continuously chats with inbound prospects across WhatsApp & Web, scores purchase authority, addresses objections, and locks executive appointments.',
                          color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400',
                          tools: ['HubSpot CRM', 'Stripe Links', 'Google Calendar', 'WhatsApp API']
                        },
                        {
                          name: 'Support Guardian Agent',
                          status: '24/7 Resolver • Zero Latency',
                          metric: '42s Average Ticket Resolution',
                          desc: 'Instant answers for warranty, order status, return policies, and complex technical manuals. Contextually escalates edge cases with summarized notes.',
                          color: 'border-blue-500/40 bg-blue-950/20 text-blue-400',
                          tools: ['Zendesk', 'Shopify API', 'Vector Knowledge Base', 'Email Sync']
                        },
                        {
                          name: 'Campaign Activator Agent',
                          status: 'Proactive • Drip Optimizer',
                          metric: '98% WhatsApp Open Rate',
                          desc: 'Executes triggered re-engagement sequences, sends abandoned cart recovery coupons, and broadcasts seasonal updates with personalized customer names.',
                          color: 'border-purple-500/40 bg-purple-950/20 text-purple-400',
                          tools: ['Meta Marketing API', 'Segment Analytics', 'Twilio SMS', 'Webhooks']
                        },
                        {
                          name: 'Operations Copilot Agent',
                          status: 'Enterprise • Tool Orchestrator',
                          metric: 'Zero Manual Data Entry',
                          desc: 'Connects directly with SQL databases, reconciles inventory counts, drafts custom contract proposals, and alerts internal team channels.',
                          color: 'border-amber-500/40 bg-amber-950/20 text-amber-400',
                          tools: ['PostgreSQL', 'Slack Webhooks', 'PDF Generator', 'Zapier/Make']
                        },
                      ].map((agent, i) => (
                        <div key={i} className={`p-5 rounded-2xl border ${agent.color} space-y-3`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              <h4 className="font-bold text-white text-sm">{agent.name}</h4>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                              {agent.metric}
                            </span>
                          </div>

                          <div className="text-[10px] font-mono text-slate-400">{agent.status}</div>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans">{agent.desc}</p>

                          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] text-slate-500 font-mono">Tools:</span>
                            {agent.tools.map((t, idx) => (
                              <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. TAB: INTEGRATIONS */}
                {activeCockpitTab === 'integrations' && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="text-center max-w-xl mx-auto">
                      <h3 className="text-lg font-bold text-white">Native Ecosystem &amp; API Connectors</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Connect OrbionAgents to your current stack in a single click with pre-built authenticated connectors.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { name: 'WhatsApp Cloud API', desc: 'Official Meta Partner pipeline', status: 'Connected', icon: MessageSquare, color: 'text-emerald-400' },
                        { name: 'Instagram Direct', desc: 'Keyword DMs & story replies', status: 'Connected', icon: Smartphone, color: 'text-purple-400' },
                        { name: 'Shopify / E-com', desc: 'Live product sync & carts', status: 'Connected', icon: Database, color: 'text-blue-400' },
                        { name: 'HubSpot & CRM', desc: 'Automatic contact & deal update', status: 'Connected', icon: Users, color: 'text-amber-400' },
                        { name: 'Google Calendar', desc: 'Zero-conflict slot bookings', status: 'Connected', icon: Clock, color: 'text-rose-400' },
                        { name: 'PostgreSQL / SQL', desc: 'Enterprise data query layer', status: 'Connected', icon: Cpu, color: 'text-teal-400' },
                        { name: 'Slack & Teams', desc: 'Instant human rep escalation', status: 'Connected', icon: Share2, color: 'text-indigo-400' },
                        { name: 'REST Webhooks', desc: 'Trigger any custom workflow', status: 'Connected', icon: Workflow, color: 'text-emerald-400' },
                      ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <div key={i} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all text-left space-y-2">
                            <div className="flex items-center justify-between">
                              <div className={`w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center ${item.color}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                                {item.status}
                              </span>
                            </div>
                            <div className="font-bold text-white text-xs">{item.name}</div>
                            <p className="text-[11px] text-slate-400">{item.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>

              {/* Cockpit Bottom Callout Bar */}
              <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black border border-purple-500/40 p-1 flex items-center justify-center">
                    <Image
                      src="/orbion-logo-tight.png"
                      alt="Orbion Logo"
                      width={22}
                      height={22}
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Ready to deploy your enterprise agents?</span>
                    <span className="text-slate-400 text-[11px]">Free sandbox testing available on orbionagents.com</span>
                  </div>
                </div>

                <a
                  href="https://orbionagents.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md hover:scale-105"
                >
                  <span>Get Started on OrbionAgents.com</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* WHERE YOUR AGENTS WORK: 4 OMNICHANNEL POWERHOUSES */}
          {/* ========================================================================= */}
          <section className="mb-24">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Omnichannel Reach
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                Meet Your Customers Where They Actually Are
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                Deploy single-brain intelligence across every messaging surface. Conversation context follows the user wherever they message you next.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* WhatsApp Business */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-emerald-300 hover:shadow-lg transition-all group flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#059669] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-lg font-bold text-slate-900">WhatsApp Automation</h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Official WhatsApp Business Cloud API integration. Send interactive buttons, catalog lists, payment links, and handle support 24/7 with a verified green tick.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 space-y-2 text-[11px] font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>98% Average Open Rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Abandoned Cart Recovery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Rich Media &amp; PDF Invoices</span>
                  </div>
                </div>
              </div>

              {/* Instagram Direct & Reels */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-purple-300 hover:shadow-lg transition-all group flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#9333ea] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-slate-900">Instagram Auto-DMs</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Automatically convert comment triggers on Reels and posts into instant Direct Message sales funnels. Answer buyer questions before they leave your profile.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 space-y-2 text-[11px] font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-600" />
                    <span>Comment-to-DM Triggering</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-600" />
                    <span>Story Mention Re-engagement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-600" />
                    <span>Influencer &amp; VIP Lead Tagging</span>
                  </div>
                </div>
              </div>

              {/* Website Smart Concierge */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-blue-300 hover:shadow-lg transition-all group flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-slate-900">Website Smart Widget</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Intelligent context-aware web bubble that tracks user scroll depth and pages visited. Proactively greets high-intent visitors and books appointments live.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 space-y-2 text-[11px] font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600" />
                    <span>Sub-Second Vector Search</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600" />
                    <span>Embedded Calendly / Meet Sync</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600" />
                    <span>Custom Brand Theming &amp; CSS</span>
                  </div>
                </div>
              </div>

              {/* AI Voice & Telephony */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-emerald-300 hover:shadow-lg transition-all group flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#059669] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-slate-900">AI Voice &amp; Telephony</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Natural speech conversational voice agents for inbound phone calls and outbound appointment confirmations. Zero robotic delays with human-like intonation.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 space-y-2 text-[11px] font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Ultra-low Latency Speech RAG</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Warm Human Transfer Logic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Full Call Transcript &amp; CRM Sync</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* INTERACTIVE ROI & PRODUCTIVITY CALCULATOR */}
          {/* ========================================================================= */}
          <section className="mb-24">
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-[#064e3b] rounded-3xl p-6 sm:p-12 text-white border border-slate-800 shadow-2xl">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Left: Interactive Slider */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-800">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Interactive Value Estimator</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                    Calculate Your Business ROI with OrbionAgents
                  </h2>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    Slide to your approximate monthly customer conversations across WhatsApp, Website, and Instagram to calculate time and capital savings.
                  </p>

                  <div className="space-y-3 pt-3">
                    <div className="flex items-center justify-between font-bold text-sm">
                      <span className="text-slate-300">Monthly Inbound Inquiries:</span>
                      <span className="text-2xl font-black text-emerald-400 font-mono">
                        {monthlyInquiries.toLocaleString()} /mo
                      </span>
                    </div>

                    <input
                      type="range"
                      min="500"
                      max="30000"
                      step="500"
                      value={monthlyInquiries}
                      onChange={(e) => setMonthlyInquiries(Number(e.target.value))}
                      className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#10b981]"
                    />

                    <div className="flex justify-between text-[11px] font-mono text-slate-400">
                      <span>500 Inquiries</span>
                      <span>15,000 Inquiries</span>
                      <span>30,000+ Inquiries</span>
                    </div>
                  </div>
                </div>

                {/* Right: Dynamic Computed Metrics */}
                <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                  
                  <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
                    <div className="text-xs text-slate-400 font-medium flex items-center justify-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Staff Hours Saved</span>
                    </div>
                    <div className="text-2xl sm:text-4xl font-black text-white font-mono">
                      ~{hoursSavedPerMonth} hrs
                    </div>
                    <div className="text-[10px] text-emerald-400">Every single month</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
                    <div className="text-xs text-slate-400 font-medium flex items-center justify-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Estimated Cost Saved</span>
                    </div>
                    <div className="text-2xl sm:text-4xl font-black text-emerald-400 font-mono">
                      ₹{costSavedRupees}
                    </div>
                    <div className="text-[10px] text-slate-400">(${costSavedDollars.toLocaleString()} USD /mo)</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
                    <div className="text-xs text-slate-400 font-medium flex items-center justify-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-purple-400" />
                      <span>Response Latency Drop</span>
                    </div>
                    <div className="text-2xl sm:text-4xl font-black text-white font-mono">
                      {responseSpeedReduction}
                    </div>
                    <div className="text-[10px] text-purple-400">From 3 hrs to 1.2 seconds</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
                    <div className="text-xs text-slate-400 font-medium flex items-center justify-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Extra Deals Closed</span>
                    </div>
                    <div className="text-2xl sm:text-4xl font-black text-emerald-400 font-mono">
                      +{extraLeadsConverted} deals
                    </div>
                    <div className="text-[10px] text-emerald-400">Via instant zero-drop replies</div>
                  </div>

                </div>

              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* HOW IT WORKS: 4-STEP ZERO-FRICTION DEPLOYMENT */}
          {/* ========================================================================= */}
          <section className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Setup Workflow
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                Live in 15 Minutes. Zero Coding Required.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                Our intuitive dashboard makes deploying multi-agent swarms as simple as four quick configuration steps.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Upload Knowledge Base',
                  desc: 'Sync PDFs, product catalogs, FAQs, or paste your website URL. Our RAG engine parses and vector-indexes everything in under 2 minutes.',
                  icon: Database,
                },
                {
                  step: '02',
                  title: 'Connect Channels',
                  desc: 'Scan your WhatsApp QR code, connect your Instagram Business account with OAuth, or drop a single line script tag into your website header.',
                  icon: Smartphone,
                },
                {
                  step: '03',
                  title: 'Define Tone & Guardrails',
                  desc: 'Set custom personality guidelines, response limits, approved pricing ranges, and define when conversations should route to human staff.',
                  icon: ShieldCheck,
                },
                {
                  step: '04',
                  title: 'Turn on Autopilot',
                  desc: 'Your AI agent fleet immediately starts answering inquiries, qualifying leads, and updating CRM records 24/7 without missing a beat.',
                  icon: Zap,
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="relative p-6 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-white text-[#059669] shadow-xs flex items-center justify-center font-bold">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-2xl font-black text-slate-300 font-mono">{item.step}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* COMPARISON TABLE: TRADITIONAL VS LEGACY BOTS VS ORBIONAGENTS */}
          {/* ========================================================================= */}
          <section className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Performance Comparison
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                Why Industry Leaders Choose OrbionAgents
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                See how autonomous agents outperform traditional support teams and rigid rule-based chatbots.
              </p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-200/90 shadow-sm bg-white">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="p-4 sm:p-5 font-bold">Capability / Feature</th>
                    <th className="p-4 sm:p-5 font-bold text-slate-500">Traditional Support Staff</th>
                    <th className="p-4 sm:p-5 font-bold text-slate-500">Legacy Keyword Chatbots</th>
                    <th className="p-4 sm:p-5 font-bold text-[#059669] bg-emerald-50/70 border-l border-r border-emerald-200">
                      OrbionAgents (AuromindAI)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {[
                    {
                      feat: 'Response Speed',
                      manual: '30 mins to 4 hours',
                      legacy: 'Instant (Static text)',
                      orbion: 'Sub-second (< 1.2s contextual)',
                    },
                    {
                      feat: 'Availability',
                      manual: '8-hour shifts / Expensive overtime',
                      legacy: '24/7 (Rigid button trees)',
                      orbion: '24/7/365 Autonomous intelligence',
                    },
                    {
                      feat: 'Language Handling',
                      manual: 'Requires hiring bilingual agents',
                      legacy: 'English only / broken translation',
                      orbion: '95+ Languages detected & spoken natively',
                    },
                    {
                      feat: 'Sales & Objection Handling',
                      manual: 'High skill, high turnover',
                      legacy: 'Cannot handle nuance or pricing',
                      orbion: 'Advanced multi-turn reasoning & closing',
                    },
                    {
                      feat: 'CRM & Tool Execution',
                      manual: 'Manual copy-paste entry prone to errors',
                      legacy: 'Basic webhook notifications',
                      orbion: 'Bidirectional sync with HubSpot, DB & APIs',
                    },
                    {
                      feat: 'Scalability during surges',
                      manual: 'Backlogs & dropped customer inquiries',
                      legacy: 'Unchanged (Frustrates users)',
                      orbion: 'Scales from 1 to 50,000 queries instantly',
                    },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">{row.feat}</td>
                      <td className="p-4 sm:p-5 text-slate-500">{row.manual}</td>
                      <td className="p-4 sm:p-5 text-slate-500">{row.legacy}</td>
                      <td className="p-4 sm:p-5 font-bold text-emerald-950 bg-emerald-50/50 border-l border-r border-emerald-100 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{row.orbion}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* FREQUENTLY ASKED QUESTIONS (FAQ) */}
          {/* ========================================================================= */}
          <section className="mb-24 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Got Questions?
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                Everything you need to know about OrbionAgents deployment, integrations, and pricing.
              </p>
            </div>

            <div className="space-y-3.5">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className="border border-slate-200/90 rounded-2xl overflow-hidden transition-all bg-white"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full p-5 text-left font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#059669] shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* GRAND CONVERSION CALL TO ACTION BANNER */}
          {/* ========================================================================= */}
          <section className="mb-12">
            <div className="relative rounded-3xl bg-gradient-to-r from-slate-950 via-[#064e3b] to-slate-950 p-8 sm:p-14 text-white overflow-hidden shadow-2xl border border-emerald-800/40 text-center">
              
              {/* Subtle Background Glow */}
              <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                
                {/* Logo Pill */}
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-black/60 border border-purple-500/30 backdrop-blur-md">
                  <Image
                    src="/orbion-logo-tight.png"
                    alt="Orbion Logo"
                    width={28}
                    height={28}
                    unoptimized
                    className="object-contain"
                  />
                  <span className="font-extrabold text-sm sm:text-base text-white">
                    Orbion<span className="text-[#9333ea]">Agents</span>
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  Ready to Put Your Sales &amp; Customer Support on Autopilot?
                </h2>

                <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
                  Join forward-thinking businesses automating customer communications, qualifying leads in seconds, and scaling operations 24/7 with OrbionAgents.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <a
                    href="https://orbionagents.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#10b981] hover:bg-[#059669] text-white font-black text-sm sm:text-base shadow-[0_10px_25px_-5px_rgba(16,185,129,0.5)] hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>Launch OrbionAgents Platform</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 backdrop-blur-md hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>Talk to AI Solutions Architect</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Trust Guarantees */}
                <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-emerald-200/80">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    15-Minute Zero-Code Onboarding
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Official WhatsApp Cloud API
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Enterprise SOC-2 Aligned Security
                  </span>
                </div>

              </div>

            </div>
          </section>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
