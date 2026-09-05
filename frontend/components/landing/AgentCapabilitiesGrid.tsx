'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  MessageSquareCode, 
  TrendingUp, 
  Headphones, 
  ShieldCheck, 
  Database, 
  Code2, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  Sparkles,
  Zap
} from 'lucide-react';

interface AgentPersona {
  id: string;
  category: 'sales' | 'support' | 'engineering' | 'operations';
  title: string;
  role: string;
  speed: string;
  autonomyLevel: string;
  description: string;
  keySkills: string[];
  toolsIntegrated: string[];
  sampleTrigger: string;
  sampleAction: string;
}

const AGENTS: AgentPersona[] = [
  {
    id: 'sales-closer',
    category: 'sales',
    title: 'AuraSales Swarm',
    role: 'Autonomous Inbound Sales Closer & Qualification',
    speed: '< 45s Response',
    autonomyLevel: 'Full Autonomy w/ Guardrails',
    description: 'Engages high-intent leads across WhatsApp, web chat, and SMS. Discovers budget, handles complex objections, quotes pricing, and books calendar demos directly into executive schedules.',
    keySkills: ['BANT Qualification', 'Dynamic Objection Handling', 'Multi-timezone Booking', 'High-ticket Real Estate & SaaS Pitching'],
    toolsIntegrated: ['WhatsApp Business API', 'Google Calendar', 'Calendly', 'Stripe', 'HubSpot'],
    sampleTrigger: 'New inbound WhatsApp message asking for 3-bedroom villa floorplans & payment plans',
    sampleAction: 'Parses buyer preferences, sends PDF brochure, matches budget, checks real-time calendar, and books private showing',
  },
  {
    id: 'ecommerce-cart',
    category: 'sales',
    title: 'CartRecover Agent',
    role: 'eCommerce Abandonment & VIP Retention',
    speed: 'Instant Webhook',
    autonomyLevel: 'Autonomous with Human Escalation',
    description: 'Watches checkout drop-offs and initiates conversational, non-spammy WhatsApp recovery sequences with personalized bundles and instant 1-click checkout links.',
    keySkills: ['Abandoned Cart Winback', 'Dynamic Bundle Upsells', 'Order Tracking & Logistics', 'Post-purchase VIP Engagement'],
    toolsIntegrated: ['Shopify Webhooks', 'WooCommerce', 'WhatsApp Cloud API', 'Stripe Checkout', 'Klaviyo'],
    sampleTrigger: 'Customer abandons $240 luxury skincare cart on Step 2 of checkout',
    sampleAction: 'Delivers personalized WhatsApp offer with custom coupon code and pre-filled checkout link, recovering the order within 12 minutes',
  },
  {
    id: 'support-agent',
    category: 'support',
    title: 'OmniSupport Agent',
    role: 'Tier-1 & Tier-2 Customer Support Specialist',
    speed: '< 800ms Latency',
    autonomyLevel: '94% Autonomous Resolution',
    description: 'Resolves customer queries 24/7 without wait times. Deeply integrated with order databases, shipping APIs, and knowledge bases to process refunds, cancellations, and ticket routing.',
    keySkills: ['Order & Tracking Lookup', 'Automated Refund Processing', 'Multi-Language Translation (48+ langs)', 'Sentiment & Churn Risk Detection'],
    toolsIntegrated: ['Zendesk', 'Freshdesk', 'PostgreSQL DB', 'FedEx / DHL Tracking APIs', 'Slack Alerts'],
    sampleTrigger: 'User requests return authorization and shipping label for damaged order',
    sampleAction: 'Verifies purchase date against warranty policy, generates return shipping label, updates DB, and issues refund credit automatically',
  },
  {
    id: 'code-devops',
    category: 'engineering',
    title: 'AuroDevops Engineer',
    role: 'Full-Stack Code Generation & Microservice Agent',
    speed: 'Sub-second AST Synthesis',
    autonomyLevel: 'Human-Reviewed Pull Requests',
    description: 'Translates natural language functional specifications into production-grade TypeScript, Python FastAPI, and SQL schemas. Runs automated tests and creates verified GitHub pull requests.',
    keySkills: ['FastAPI & Next.js Architecture', 'Automated Unit & E2E Testing', 'PostgreSQL Schema Migration', 'API Gateway Rate-Limiting'],
    toolsIntegrated: ['GitHub API', 'Docker', 'FastAPI', 'Next.js 15', 'PostgreSQL'],
    sampleTrigger: 'Spec: "Add JWT token refresh endpoint with Redis blacklist and unit tests"',
    sampleAction: 'Generates secure code, writes pytest test cases with 98% coverage, creates branch, and opens PR with architectural changelog',
  },
  {
    id: 'bi-analyst',
    category: 'operations',
    title: 'InsightSentinel Agent',
    role: 'Continuous BI Analyst & Revenue Sentinel',
    speed: 'Continuous Real-Time',
    autonomyLevel: 'Fully Autonomous Reporting',
    description: 'Monitors transaction streams, advertising spend ROAS, and platform uptime. Automatically generates daily executive briefings and fires alerts if CAC spikes or churn surges.',
    keySkills: ['Natural Language to SQL', 'Cohort & Retention Analytics', 'Ad Spend ROAS Auditing', 'Automated Executive Briefings'],
    toolsIntegrated: ['PostgreSQL', 'Snowflake', 'Meta Marketing API', 'Google Ads API', 'Slack / Telegram'],
    sampleTrigger: 'Meta ad ROAS drops below 2.0x threshold over a rolling 4-hour window',
    sampleAction: 'Analyzes ad creative decay, pauses underperforming ad set, and pings CMO on Slack with actionable reallocation plan',
  },
  {
    id: 'healthcare-triage',
    category: 'operations',
    title: 'CareFlow Agent',
    role: 'Healthcare Intake & Compliance Triage',
    speed: '< 2s Medical Context',
    autonomyLevel: 'Clinician-in-the-Loop',
    description: 'Conducts pre-appointment clinical intake, symptom documentation, and insurance verification under HIPAA-compliant safeguards, eliminating front-desk queues.',
    keySkills: ['HIPAA Compliant Intake', 'Insurance Eligibility Verification', 'Automated Appointment Reminders', 'EHR / EMR Record Prep'],
    toolsIntegrated: ['Epic Systems API', 'Cerner', 'Twilio HIPAA Voice', 'DrChrono', 'Encrypted S3'],
    sampleTrigger: 'Patient books online consultation for recurring joint pain',
    sampleAction: 'Collects pre-visit medical history securely, verifies insurance copay, and generates formatted summary for physician review',
  },
];

export function AgentCapabilitiesGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeAgentId, setActiveAgentId] = useState<string>(AGENTS[0].id);

  const filteredAgents = selectedCategory === 'all' 
    ? AGENTS 
    : AGENTS.filter(a => a.category === selectedCategory);

  const activeAgent = AGENTS.find(a => a.id === activeAgentId) || AGENTS[0];

  return (
    <section id="agents" className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-emerald-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Bot className="w-3.5 h-3.5" />
            <span>Autonomous Workforce Roster</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Specialized AI Agents Ready to <span className="text-emerald-400">Join Your Team</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            Deploy goal-oriented AI agents equipped with role-specific skills, pre-built API connectors, and audited autonomous action capabilities engineered by AuromindAI.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Agents' },
            { id: 'sales', label: 'Inbound Sales & Growth' },
            { id: 'support', label: 'Customer Support' },
            { id: 'engineering', label: 'DevOps & Engineering' },
            { id: 'operations', label: 'Operations & Healthcare' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 2-Column Agent Roster & Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Agent Selector Cards */}
          <div className="lg:col-span-5 space-y-3">
            {filteredAgents.map((agent) => {
              const isSelected = agent.id === activeAgent.id;
              return (
                <div
                  key={agent.id}
                  onClick={() => setActiveAgentId(agent.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-500 shadow-lg shadow-emerald-500/10 translate-x-1'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-emerald-400'
                      }`}>
                        <Bot className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-base text-white">{agent.title}</h4>
                    </div>
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                      {agent.speed}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {agent.role}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Active Agent Deep Dive Panel */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                    {activeAgent.category.toUpperCase()} AGENT
                  </span>
                  <span className="text-xs font-medium text-slate-400">· {activeAgent.autonomyLevel}</span>
                </div>
                <h3 className="text-2xl font-black text-white">{activeAgent.title}</h3>
                <p className="text-sm text-emerald-400 font-semibold">{activeAgent.role}</p>
              </div>

              <Link
                href="/login"
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-black hover:bg-emerald-400 transition-all flex items-center gap-1.5 shadow-md shrink-0"
              >
                <span>Deploy with AuromindAI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {activeAgent.description}
            </p>

            {/* Core Competencies */}
            <div className="space-y-2">
              <h5 className="text-xs font-black text-slate-400 uppercase tracking-wider">Core Capabilities</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeAgent.keySkills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-200 bg-slate-900/90 px-3 py-2 rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pre-Built Tool Connectors */}
            <div className="space-y-2">
              <h5 className="text-xs font-black text-slate-400 uppercase tracking-wider">Connected Tools & APIs</h5>
              <div className="flex flex-wrap gap-2">
                {activeAgent.toolsIntegrated.map((tool, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono font-medium">
                    ⚡ {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Live Scenario Walkthrough Box */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Autonomous Action Walkthrough</span>
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-slate-300">
                  <span className="font-mono text-emerald-400 font-bold shrink-0">TRIGGER:</span>
                  <span>{activeAgent.sampleTrigger}</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <span className="font-mono text-emerald-400 font-bold shrink-0">ACTION:</span>
                  <span>{activeAgent.sampleAction}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
