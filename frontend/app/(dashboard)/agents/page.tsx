'use client';

import React, { useState } from 'react';
import { 
  Bot, 
  Plus, 
  Sparkles, 
  TrendingUp, 
  Headphones, 
  Megaphone, 
  Search, 
  UserCheck, 
  DollarSign, 
  CheckCircle2, 
  Wrench, 
  SlidersHorizontal 
} from 'lucide-react';
import { Agent, AIMode } from '@/lib/types';

const defaultAgents: Agent[] = [
  {
    id: 'agent-sales',
    name: 'AuroSales AI Employee',
    description: 'Autonomous B2B lead qualification, cold outreach sequencing, and interactive proposal generation 24/7.',
    category: 'Sales AI',
    systemPrompt: 'You are an elite enterprise B2B sales director specializing in tech stack optimization and rapid qualification.',
    avatarIcon: 'TrendingUp',
    status: 'active',
    tools: ['Web Search', 'LinkedIn Prospector', 'Email Sequencer'],
  },
  {
    id: 'agent-support',
    name: 'AuroSupport AI Employee',
    description: 'Resolves technical support tickets, handles customer refunds, and updates ticket status in Zendesk/Intercom.',
    category: 'Support AI',
    systemPrompt: 'You are an empathetic, technical customer support agent capable of reading logs and solving tier-1/tier-2 issues.',
    avatarIcon: 'Headphones',
    status: 'active',
    tools: ['Knowledge RAG', 'Ticket System API', 'Stripe Refund Tool'],
  },
  {
    id: 'agent-marketing',
    name: 'AuroMarketing AI Employee',
    description: 'Creates viral multi-channel social campaigns, drafts SEO blog posts, and plans targeted ad creative.',
    category: 'Marketing AI',
    systemPrompt: 'You are a growth marketer focusing on high-converting copywriting and SEO optimization.',
    avatarIcon: 'Megaphone',
    status: 'active',
    tools: ['Generate Images', 'SEO Analyzer', 'Social Publisher'],
  },
  {
    id: 'agent-finance',
    name: 'AuroFinance AI Employee',
    description: 'Analyzes financial statements, automates monthly expense reporting, and forecasts runway burn rate.',
    category: 'Finance AI',
    systemPrompt: 'You are a fractional CFO providing rigorous financial audits and spreadsheet parsing.',
    avatarIcon: 'DollarSign',
    status: 'paused',
    tools: ['Excel Parser', 'QuickBooks Sync', 'SQL Generator'],
  },
];

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>(defaultAgents);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentDesc, setNewAgentDesc] = useState('');
  const [newAgentCategory, setNewAgentCategory] = useState<AIMode>('Sales AI');

  const handleCreateAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgentName.trim()) return;

    const created: Agent = {
      id: `agent-${Date.now()}`,
      name: newAgentName,
      description: newAgentDesc || 'Custom employee tailored for enterprise automation.',
      category: newAgentCategory,
      systemPrompt: 'You are a specialized AI worker operating within AuromindAI workspace guidelines.',
      avatarIcon: 'Bot',
      status: 'active',
      tools: ['Web Search', 'Document RAG'],
    };

    setAgents([created, ...agents]);
    setIsBuilderOpen(false);
    setNewAgentName('');
    setNewAgentDesc('');
  };

  const toggleStatus = (id: string) => {
    setAgents(agents.map(a => a.id === id ? { ...a, status: a.status === 'active' ? 'paused' : 'active' } : a));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
            <Bot className="w-4 h-4" />
            <span>Autonomous Workforce</span>
          </div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">AI Employees</h1>
          <p className="text-sm text-muted-foreground mt-1">Deploy specialized 24/7 AI agents trained on your custom workflows.</p>
        </div>

        <button
          onClick={() => setIsBuilderOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary text-white text-xs font-semibold shadow-soft hover:bg-gray-900 transition-all"
        >
          <Plus className="w-4 h-4 text-accent" />
          <span>Build Custom Agent</span>
        </button>
      </div>

      {/* Grid of Agents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="floating-card p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-soft">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <button
                  onClick={() => toggleStatus(agent.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    agent.status === 'active'
                      ? 'bg-emerald-100 text-secondary'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {agent.status === 'active' ? '● Active' : '○ Paused'}
                </button>
              </div>

              <div>
                <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">{agent.category}</span>
                <h3 className="text-lg font-bold text-primary tracking-tight mt-0.5">{agent.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{agent.description}</p>
              </div>
            </div>

            {/* Tools Badges */}
            <div className="pt-3 border-t border-border space-y-2">
              <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Enabled Tools</div>
              <div className="flex flex-wrap gap-1.5">
                {agent.tools.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-card border border-border text-[10px] font-medium text-primary flex items-center gap-1">
                    <Wrench className="w-3 h-3 text-secondary" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Custom Agent Builder */}
      {isBuilderOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-border rounded-3xl p-6 max-w-lg w-full shadow-floating space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-primary">Build New AI Employee</h2>
              <button onClick={() => setIsBuilderOpen(false)} className="text-muted-foreground hover:text-primary">✕</button>
            </div>

            <form onSubmit={handleCreateAgent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Agent Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AuroLegal Compliance Worker"
                  value={newAgentName}
                  onChange={(e) => setNewAgentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-card text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Category Mode</label>
                <select
                  value={newAgentCategory}
                  onChange={(e) => setNewAgentCategory(e.target.value as AIMode)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-card text-xs focus:outline-none focus:border-accent"
                >
                  <option value="Sales AI">Sales AI</option>
                  <option value="Support AI">Support AI</option>
                  <option value="Marketing AI">Marketing AI</option>
                  <option value="HR AI">HR AI</option>
                  <option value="Legal AI">Legal AI</option>
                  <option value="Finance AI">Finance AI</option>
                  <option value="Coding AI">Coding AI</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Description & Role Responsibilities</label>
                <textarea
                  rows={3}
                  placeholder="Describe what this AI worker will automate daily..."
                  value={newAgentDesc}
                  onChange={(e) => setNewAgentDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-card text-xs focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBuilderOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-xs font-semibold hover:bg-card"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-soft hover:bg-gray-900"
                >
                  Deploy Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
