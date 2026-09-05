'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2, Home, Users, DollarSign, Calendar, Clock,
  Filter, Search, Plus, ArrowRight, CheckCircle2, ChevronRight,
  Phone, Mail, MessageSquare, Bot, Sparkles, SlidersHorizontal,
  ExternalLink, MoreHorizontal, ArrowUpRight, Check, X
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  budget: string;
  propertyType: string;
  location: string;
  score: number;
  stage: 'new' | 'qualified' | 'site_visit' | 'negotiation' | 'closed';
  agent: string;
  channel: string;
  timeline: string;
  notes: string;
  statusNote: string;
  matchedProperties: string[];
}

const INITIAL_PIPELINE: Lead[] = [
  {
    id: 'lead-01',
    name: 'Marcus Sterling',
    email: 'm.sterling@capitalgroup.com',
    phone: '+1 (555) 382-9012',
    budget: '$1,450,000',
    propertyType: '3BHK Penthouse',
    location: 'Downtown Metropolis',
    score: 96,
    stage: 'site_visit',
    agent: 'Sarah Jenkins',
    channel: 'WhatsApp AI',
    timeline: 'Immediate (Next 30 days)',
    notes: 'Verified pre-approved mortgage with Chase ($1.5M ceiling). Desires skyline terrace.',
    statusNote: 'VIP Walkthrough Confirmed: Tomorrow 3:00 PM',
    matchedProperties: ['The Azure Sky Penthouse', 'Marina Promenade High-Rise']
  },
  {
    id: 'lead-02',
    name: 'Elena Rostova',
    email: 'elena.r@luxdesign.co',
    phone: '+1 (555) 721-4491',
    budget: '$2,200,000',
    propertyType: '4BHK Villa with Pool',
    location: 'West Hills Reserve',
    score: 89,
    stage: 'qualified',
    agent: 'David Chen',
    channel: 'Website AI Bot',
    timeline: '60-90 days',
    notes: 'Relocating with 2 kids. Needs private pool and proximity to Pinecrest Academy.',
    statusNote: 'Sent 3D Virtual Tour link via SMS',
    matchedProperties: ['Verdant Hills Modern Villa']
  },
  {
    id: 'lead-03',
    name: 'Jonathan Vance',
    email: 'jvance@techseed.io',
    phone: '+1 (555) 903-1284',
    budget: '$890,000',
    propertyType: '2BHK Luxury Apartment',
    location: 'Waterfront Marina',
    score: 94,
    stage: 'negotiation',
    agent: 'Sarah Jenkins',
    channel: 'Meta Ad Campaign',
    timeline: 'Ready to sign',
    notes: 'Investment buyer. Targeted 7.4% gross rental yield. Agreed on $890,000 offer.',
    statusNote: 'Purchase contract sent to title attorney',
    matchedProperties: ['Marina Promenade High-Rise']
  },
  {
    id: 'lead-04',
    name: 'Tariq & Amina Khan',
    email: 'tariq.k@khanholdings.ae',
    phone: '+971 50 882 1903',
    budget: '$3,100,000',
    propertyType: '5BHK Private Estate',
    location: 'Oakwood Enclave',
    score: 100,
    stage: 'closed',
    agent: 'Elena Santos',
    channel: 'Google Luxury Ads',
    timeline: 'Funded',
    notes: 'Cash escrow wire verified. Transaction closed in 12 days. 2.5% commission: $77,500.',
    statusNote: 'Deal Won & Deed Registered',
    matchedProperties: ['The Oakwood Executive Estate']
  },
  {
    id: 'lead-05',
    name: 'Sophia Patel',
    email: 'spatel@neurohealth.org',
    phone: '+1 (555) 612-8821',
    budget: '$1,200,000',
    propertyType: '2BHK Modern Loft',
    location: 'Arts & Tech District',
    score: 84,
    stage: 'new',
    agent: 'Unassigned (AI Lead Bot)',
    channel: 'Instagram DM',
    timeline: 'Within 45 days',
    notes: 'Inquired about south-facing corner units with dual home offices.',
    statusNote: 'AI sent automated brochure & pre-qualification quiz',
    matchedProperties: ['The Azure Sky Penthouse']
  }
];

const COLUMNS: { id: Lead['stage']; title: string; color: string; dot: string }[] = [
  { id: 'new', title: 'New Inbound', color: 'border-blue-500/30 text-blue-400', dot: 'bg-blue-400' },
  { id: 'qualified', title: 'AI Qualified', color: 'border-emerald-500/30 text-emerald-400', dot: 'bg-emerald-400' },
  { id: 'site_visit', title: 'Site Visit Booked', color: 'border-purple-500/30 text-purple-400', dot: 'bg-purple-400' },
  { id: 'negotiation', title: 'Under Negotiation', color: 'border-amber-500/30 text-amber-400', dot: 'bg-amber-400' },
  { id: 'closed', title: 'Closed Won 🎉', color: 'border-green-500/30 text-green-400', dot: 'bg-green-400' },
];

export default function RealEstateCRMPage() {
  const [pipeline, setPipeline] = useState<Lead[]>(INITIAL_PIPELINE);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'inventory'>('pipeline');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(INITIAL_PIPELINE[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copilotAction, setCopilotAction] = useState<string | null>(null);
  const [copilotText, setCopilotText] = useState<string>('');
  const [isCopilotGenerating, setIsCopilotGenerating] = useState(false);

  // Filtered leads
  const filteredLeads = pipeline.filter(l =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.propertyType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Move lead forward in pipeline
  const advanceLead = (leadId: string) => {
    const stageOrder: Lead['stage'][] = ['new', 'qualified', 'site_visit', 'negotiation', 'closed'];
    setPipeline(prev =>
      prev.map(l => {
        if (l.id === leadId) {
          const currentIndex = stageOrder.indexOf(l.stage);
          const nextStage = stageOrder[Math.min(currentIndex + 1, stageOrder.length - 1)];
          return { ...l, stage: nextStage };
        }
        return l;
      })
    );
    if (selectedLead && selectedLead.id === leadId) {
      const currentIndex = stageOrder.indexOf(selectedLead.stage);
      const nextStage = stageOrder[Math.min(currentIndex + 1, stageOrder.length - 1)];
      setSelectedLead({ ...selectedLead, stage: nextStage });
    }
  };

  // Generate AI Copilot response
  const triggerCopilot = (action: string) => {
    if (!selectedLead) return;
    setCopilotAction(action);
    setIsCopilotGenerating(true);

    setTimeout(() => {
      if (action === 'pitch') {
        setCopilotText(
          `Hi ${selectedLead.name.split(' ')[0]}! This is ${selectedLead.agent} with Auromind Real Estate. I reviewed your search for a ${selectedLead.propertyType} in ${selectedLead.location}. We just unlocked exclusive off-market access to a unit in that exact price band ($${selectedLead.budget}). Can I send you a 60-second video walkthrough over WhatsApp?`
        );
      } else if (action === 'negotiation') {
        setCopilotText(
          `Analysis for ${selectedLead.name}: Buyer intent score is ${selectedLead.score}/100. Comps in ${selectedLead.location} show sales averaging $740/sq ft. Recommend countering at 2.5% below asking with a 14-day escrow contingency to preserve commission margin.`
        );
      } else if (action === 'summary') {
        setCopilotText(
          `Dossier Summary: ${selectedLead.name} (${selectedLead.channel}) has a verified budget of ${selectedLead.budget}. Timeline: ${selectedLead.timeline}. Matched to: ${selectedLead.matchedProperties.join(', ')}. Action: Lock walkthrough calendar.`
        );
      }
      setIsCopilotGenerating(false);
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0E0F12] text-zinc-200 overflow-hidden font-sans">
      {/* Top Header Bar */}
      <div className="h-16 border-b border-white/10 px-6 flex items-center justify-between bg-[#121318] shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white flex items-center gap-2">
                Real Estate CRM & Deal Pipeline
                <span className="text-[10px] font-mono font-normal bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  AI Live Sync
                </span>
              </h1>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5 text-xs">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'pipeline' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Pipeline Kanban
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'inventory' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Property Inventory
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/real-estate"
            className="text-xs text-zinc-400 hover:text-emerald-400 flex items-center gap-1 font-medium transition-colors"
          >
            <span>View Landing Page</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search leads, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/50 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 w-44 sm:w-60"
            />
          </div>
        </div>
      </div>

      {/* Quick Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-6 py-3 border-b border-white/5 bg-[#101116] shrink-0 text-xs">
        <div>
          <span className="text-zinc-500">Total Active Pipeline</span>
          <div className="text-base font-black text-emerald-400 mt-0.5">$8.64 Million</div>
        </div>
        <div>
          <span className="text-zinc-500">Avg Lead Intent Score</span>
          <div className="text-base font-black text-white mt-0.5">92.6 / 100</div>
        </div>
        <div>
          <span className="text-zinc-500">Site Visits Scheduled</span>
          <div className="text-base font-black text-purple-400 mt-0.5">14 Walkthroughs</div>
        </div>
        <div>
          <span className="text-zinc-500">AI Instant Response Rate</span>
          <div className="text-base font-black text-teal-400 mt-0.5">99.4% (&lt; 45s)</div>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Kanban Board Area */}
        <div className="flex-1 overflow-x-auto p-6 flex gap-5">
          {COLUMNS.map(col => {
            const colLeads = filteredLeads.filter(l => l.stage === col.id);
            return (
              <div
                key={col.id}
                className="w-72 sm:w-80 shrink-0 flex flex-col bg-[#14151B] rounded-2xl border border-white/5 overflow-hidden"
              >
                {/* Column Header */}
                <div className="p-3.5 border-b border-white/5 flex items-center justify-between bg-black/20">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                    <span className="text-xs font-bold text-white">{col.title}</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500 bg-white/5 px-2 py-0.5 rounded-full">
                    {colLeads.length}
                  </span>
                </div>

                {/* Column Leads List */}
                <div className="flex-1 p-3 overflow-y-auto space-y-3">
                  {colLeads.map(lead => (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2.5 ${
                        selectedLead?.id === lead.id
                          ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                          : 'bg-[#181920] border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white">{lead.name}</span>
                        <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                          {lead.score}%
                        </span>
                      </div>

                      <div className="text-xs text-zinc-400">
                        <div className="font-semibold text-zinc-200">{lead.propertyType}</div>
                        <div className="text-[11px] text-zinc-500">{lead.location}</div>
                      </div>

                      <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-[11px] text-zinc-300">
                        {lead.statusNote}
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-white/5">
                        <span className="font-mono text-emerald-400 font-bold">{lead.budget}</span>
                        <span>{lead.agent}</span>
                      </div>
                    </div>
                  ))}

                  {colLeads.length === 0 && (
                    <div className="text-center py-8 text-xs text-zinc-600">
                      No leads in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Lead Dossier & AI Sales Copilot Drawer */}
        {selectedLead && (
          <div className="w-96 shrink-0 border-l border-white/10 bg-[#121319] flex flex-col h-full overflow-y-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-black text-white">{selectedLead.name}</h2>
                <p className="text-xs text-zinc-400">{selectedLead.email}</p>
                <p className="text-xs text-emerald-400 font-mono mt-0.5">{selectedLead.phone}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-zinc-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Stage & Advance Button */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Stage</span>
                <span className="text-xs font-bold text-emerald-400 uppercase">{selectedLead.stage}</span>
              </div>
              {selectedLead.stage !== 'closed' && (
                <button
                  onClick={() => advanceLead(selectedLead.id)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold flex items-center gap-1 transition-all"
                >
                  <span>Advance Stage</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Buyer Profile Specifications */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-teal-400" />
                Buyer Intelligence
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] text-zinc-500 block">Verified Budget</span>
                  <span className="font-mono font-bold text-white">{selectedLead.budget}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] text-zinc-500 block">Buyer Readiness</span>
                  <span className="font-mono font-bold text-emerald-400">{selectedLead.score} / 100</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] text-zinc-500 block">Preferred Typology</span>
                  <span className="font-semibold text-zinc-300">{selectedLead.propertyType}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] text-zinc-500 block">Purchase Timeline</span>
                  <span className="font-semibold text-zinc-300">{selectedLead.timeline}</span>
                </div>
              </div>
              <p className="text-xs text-zinc-400 bg-white/[0.02] p-3 rounded-lg border border-white/5 leading-relaxed">
                {selectedLead.notes}
              </p>
            </div>

            {/* AI Sales Copilot */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  AI Sales Copilot
                </h3>
                <span className="text-[10px] font-mono text-emerald-400">AuroVex</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => triggerCopilot('pitch')}
                  className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors"
                >
                  Generate WhatsApp Pitch
                </button>
                <button
                  onClick={() => triggerCopilot('negotiation')}
                  className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors"
                >
                  CMA & Counter Strategy
                </button>
                <button
                  onClick={() => triggerCopilot('summary')}
                  className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors"
                >
                  Dossier Summary
                </button>
              </div>

              {copilotText && (
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-200 leading-relaxed font-sans space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold uppercase">
                    <span>Generated for {selectedLead.name}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(copilotText)}
                      className="hover:underline cursor-pointer"
                    >
                      Copy
                    </button>
                  </div>
                  <p>{copilotText}</p>
                </div>
              )}
            </div>

            {/* Matched Inventory Catalog */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-emerald-400" />
                Matched Inventory ({selectedLead.matchedProperties.length})
              </h3>
              <div className="space-y-2">
                {selectedLead.matchedProperties.map((prop, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                    <span className="font-semibold text-white truncate">{prop}</span>
                    <span className="text-[10px] text-emerald-400 font-mono shrink-0">MLS Active</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
