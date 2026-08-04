'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Users, 
  Cpu, 
  Server, 
  Activity, 
  Settings, 
  Search, 
  Check, 
  X, 
  Plus, 
  Edit3, 
  Trash2, 
  Key, 
  Sparkles, 
  Terminal, 
  FileText, 
  DollarSign, 
  Calendar, 
  Lock, 
  RefreshCw, 
  Mail,
  UserCheck,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  Clock,
  Database
} from 'lucide-react';
import { useChatStore } from '@/lib/store/useChatStore';

/* ── MOCK DATA FOR THE MVP ADMIN WORKSPACE ── */

const initialUsers = [
  { id: '1', name: 'Santhosh Kumar', email: 'santhosh@groww.digital', plan: 'Enterprise Pro', credits: 12000, status: 'Active', joined: '2026-05-12', lastLogin: '2026-08-04 15:34', chats: 342, tokens: 489000 },
  { id: '2', name: 'Jane Doe', email: 'jane.doe@clover.io', plan: 'Free Plan', credits: 101, status: 'Active', joined: '2026-06-01', lastLogin: '2026-08-04 14:15', chats: 12, tokens: 18000 },
  { id: '3', name: 'Robert Chen', email: 'robert.c@apex.tech', plan: 'Pro SaaS', credits: 5000, status: 'Suspended', joined: '2026-02-18', lastLogin: '2026-07-29 09:30', chats: 118, tokens: 210000 },
  { id: '4', name: 'Alice Watson', email: 'alice@vibe.agency', plan: 'Enterprise Pro', credits: 15000, status: 'Active', joined: '2026-07-14', lastLogin: '2026-08-04 11:22', chats: 89, tokens: 145000 },
];

const initialModels = [
  { id: '1', name: 'AuroVex 1.5 Lite', provider: 'Auromind', version: 'v1.5.2', maxTokens: 8192, temperature: 0.7, topP: 0.95, priority: 1, active: true, price: 0.15 },
  { id: '2', name: 'AuroVex 1.5 Pro', provider: 'Auromind', version: 'v1.5.8', maxTokens: 16384, temperature: 0.4, topP: 0.9, priority: 2, active: true, price: 0.45 },
  { id: '3', name: 'Gemini 2.5 Flash', provider: 'Google', version: 'v2.5', maxTokens: 32768, temperature: 1.0, topP: 0.95, priority: 3, active: true, price: 0.075 },
  { id: '4', name: 'Gemini 2.5 Pro', provider: 'Google', version: 'v2.5-pro', maxTokens: 128000, temperature: 0.7, topP: 0.9, priority: 4, active: true, price: 1.25 },
];

const initialPrompts = [
  { id: '1', title: 'System Standard Agent', category: 'General Chat', description: 'Default system prompt for core assistant interactions.', prompt: 'You are AuromindAI, a helpful AI assistant...' },
  { id: '2', title: 'B2B Outbound Hook', category: 'Sales', description: 'Creates high-converting introductory cold email sequences.', prompt: 'Generate a B2B sales sequence for Enterprise clients...' },
  { id: '3', title: 'SLA Support Concierge', category: 'Customer Support', description: 'Resolves technical service requests politely under SLA guidelines.', prompt: 'You are a Senior SLA specialist addressing customer issues...' },
];

const initialConversations = [
  { id: 'c1', user: 'santhosh@groww.digital', model: 'AuroVex 1.5 Pro', tokens: 12450, latency: '1.24s', date: '2026-08-04 15:10', preview: 'Draft an automated sales outreach funnel...' },
  { id: 'c2', user: 'jane.doe@clover.io', model: 'AuroVex 1.5 Lite', tokens: 840, latency: '0.62s', date: '2026-08-04 14:02', preview: 'What is Next.js dynamic routing?' },
  { id: 'c3', user: 'alice@vibe.agency', model: 'Gemini 2.5 Flash', tokens: 4210, latency: '0.88s', date: '2026-08-04 11:15', preview: 'Analyze our landing page layout specs...' },
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'metrics' | 'users' | 'gemini' | 'models' | 'prompts' | 'conversations' | 'settings'>('metrics');

  return (
    <div className="flex flex-1 h-full bg-[#121214] overflow-hidden text-zinc-100 font-sans">
      {/* Sub-navigation sidebar for Admin controls */}
      <aside className="w-56 border-r border-zinc-800 bg-[#141416] p-4 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2 py-1">
            <ShieldAlert className="w-5 h-5 text-emerald-500" />
            <span className="font-bold text-sm tracking-tight text-white">Owner Operations</span>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'metrics', label: 'Dashboard', icon: Activity },
              { id: 'users', label: 'Users Directory', icon: Users },
              { id: 'gemini', label: 'Gemini API Config', icon: Sparkles },
              { id: 'models', label: 'Models Registry', icon: Cpu },
              { id: 'prompts', label: 'Prompt Repository', icon: FileText },
              { id: 'conversations', label: 'Chat Inspector', icon: Terminal },
              { id: 'settings', label: 'System Settings', icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/20'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-2 bg-zinc-900/50 rounded-xl border border-zinc-850 text-[10px] text-zinc-500 font-mono">
          Auromind v1.0.0-MVP
        </div>
      </aside>

      {/* Main tab view content */}
      <main className="flex-1 overflow-y-auto bg-[#121214] p-8">
        {activeTab === 'metrics' && <MetricsTab />}
        {activeTab === 'users' && <UsersTab />}
        {activeTab === 'gemini' && <GeminiTab />}
        {activeTab === 'models' && <ModelsTab />}
        {activeTab === 'prompts' && <PromptsTab />}
        {activeTab === 'conversations' && <ConversationsTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </main>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* ── TAB 1: METRICS & TELEMETRY                        ── */
/* ──────────────────────────────────────────────────────── */
function MetricsTab() {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Telemetry & Metrics</h2>
        <p className="text-xs text-zinc-500 mt-1">Real-time platform activity, token count usage, and provider latency analytics.</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Tokens Used', value: '41.2M', subtitle: 'AuroVex / Gemini Cluster', icon: Cpu, change: '+18% today' },
          { title: 'Monthly Recurring Revenue', value: '$148,200', subtitle: 'Stripe webhook sync', icon: DollarSign, change: '+22.4% vs targets' },
          { title: 'AI Response Time', value: '450ms', subtitle: 'Average API latency', icon: Clock, change: 'Stable health' },
          { title: 'System Status', value: '99.98%', subtitle: 'Database & Redis cluster operational', icon: Server, change: 'All active' },
        ].map((c, i) => (
          <div key={i} className="p-5 rounded-2xl bg-[#1C1C1F] border border-zinc-800 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-400">
              <span>{c.title}</span>
              <c.icon className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold text-white tracking-tight">{c.value}</div>
            <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
              <span>{c.subtitle}</span>
              <span className="text-emerald-400 font-semibold">{c.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#1C1C1F] border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Daily Token Usage</h3>
              <p className="text-[10px] text-zinc-500 mt-0.5">Aggregate model token consumption</p>
            </div>
            <span className="text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded-md border border-emerald-800/40">Real-time</span>
          </div>
          {/* Custom vector graph using simple Tailwind bars for high reliability */}
          <div className="h-40 flex items-end justify-between gap-1.5 pt-4">
            {[40, 55, 45, 60, 75, 50, 65, 80, 95, 70, 85, 100].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div 
                  className="w-full bg-emerald-600 rounded-t-md hover:bg-emerald-500 transition-colors"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[9px] text-zinc-600 font-mono">H{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#1C1C1F] border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Active Requests</h3>
              <p className="text-[10px] text-zinc-500 mt-0.5">API requests handled per hour</p>
            </div>
            <span className="text-[10px] px-2 py-0.5 bg-blue-950 text-blue-400 rounded-md border border-blue-800/40">API Logs</span>
          </div>
          {/* Custom blue line graph */}
          <div className="h-40 flex items-end justify-between gap-1.5 pt-4">
            {[30, 42, 50, 38, 48, 65, 55, 72, 85, 90, 80, 92].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div 
                  className="w-full bg-blue-600 rounded-t-md hover:bg-blue-500 transition-colors"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[9px] text-zinc-600 font-mono">H{i+1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* ── TAB 2: USERS DIRECTORY                            ── */
/* ──────────────────────────────────────────────────────── */
function UsersTab() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const newStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        return { ...u, status: newStatus };
      }
      return u;
    }));
    if (selectedUser && selectedUser.id === id) {
      setSelectedUser((prev: any) => ({ ...prev, status: prev.status === 'Active' ? 'Suspended' : 'Active' }));
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== id));
      setSelectedUser(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">User Directory</h2>
          <p className="text-xs text-zinc-500 mt-1">Manage platform accounts, subscriptions, suspend, and view audit telemetry.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200">
          Export Users
        </button>
      </div>

      <div className="flex gap-4">
        {/* Users Table Side */}
        <div className="flex-1 p-5 rounded-2xl bg-[#1C1C1F] border border-zinc-800 space-y-4">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800">
            <Search className="w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none w-full"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-850 text-zinc-500 font-semibold">
                  <th className="py-2.5">User</th>
                  <th className="py-2.5">Subscription</th>
                  <th className="py-2.5 text-right">Credits</th>
                  <th className="py-2.5 text-center">Status</th>
                  <th className="py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-850 text-zinc-300">
                {filtered.map((u) => (
                  <tr 
                    key={u.id} 
                    onClick={() => setSelectedUser(u)}
                    className={`hover:bg-zinc-800/30 cursor-pointer ${selectedUser?.id === u.id ? 'bg-zinc-850/40' : ''}`}
                  >
                    <td className="py-3 font-semibold text-zinc-100">
                      <div>{u.name}</div>
                      <div className="text-[10px] text-zinc-500 font-normal">{u.email}</div>
                    </td>
                    <td className="py-3 font-mono text-[11px]">{u.plan}</td>
                    <td className="py-3 text-right font-mono">{u.credits}</td>
                    <td className="py-3 text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold ${
                        u.status === 'Active' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40' : 'bg-red-950/60 text-red-400 border border-red-800/40'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => handleToggleStatus(u.id)}
                        className="p-1 hover:text-emerald-400 transition-colors"
                        title={u.status === 'Active' ? 'Suspend' : 'Activate'}
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(u.id)}
                        className="p-1 hover:text-red-400 ml-1 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Details side panel */}
        {selectedUser && (
          <div className="w-80 p-5 rounded-2xl bg-[#1C1C1F] border border-zinc-800 space-y-5 animate-in slide-in-from-right-4 duration-200">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-xs font-bold text-white">Account Inspector</h3>
              <button onClick={() => setSelectedUser(null)} className="text-zinc-500 hover:text-white">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-semibold">User Details</span>
                <div className="text-sm font-bold text-zinc-100 mt-1">{selectedUser.name}</div>
                <div className="text-xs text-zinc-400 mt-0.5">{selectedUser.email}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-sans font-semibold block">Plan Type</span>
                  <span className="text-white font-bold">{selectedUser.plan}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-sans font-semibold block">Joined Date</span>
                  <span className="text-zinc-300">{selectedUser.joined}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-sans font-semibold block">Tokens Ingested</span>
                  <span className="text-zinc-300">{selectedUser.tokens.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-sans font-semibold block">Chats count</span>
                  <span className="text-zinc-300">{selectedUser.chats}</span>
                </div>
              </div>

              <div className="border-t border-zinc-850 pt-3 space-y-2">
                <button 
                  onClick={() => handleToggleStatus(selectedUser.id)}
                  className={`w-full py-2 rounded-xl text-xs font-semibold border transition-all ${
                    selectedUser.status === 'Active'
                      ? 'border-red-900/60 bg-red-950/20 text-red-400 hover:bg-red-950/40'
                      : 'border-emerald-900/60 bg-emerald-950/20 text-emerald-400 hover:bg-emerald-950/40'
                  }`}
                >
                  {selectedUser.status === 'Active' ? 'Suspend Account' : 'Activate Account'}
                </button>
                <button 
                  onClick={() => {
                    const creds = prompt('Enter credit adjustment count:');
                    if (creds) {
                      setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, credits: parseInt(creds) } : u));
                      setSelectedUser((prev: any) => ({ ...prev, credits: parseInt(creds) }));
                    }
                  }}
                  className="w-full py-2 rounded-xl text-xs font-semibold border border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-850 transition-all"
                >
                  Modify Credits
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* ── TAB 3: GEMINI CONFIGURATION                       ── */
/* ──────────────────────────────────────────────────────── */
function GeminiTab() {
  const [apiKey, setApiKey] = useState('AIzaSyD_EXAMPLE_GEMINI_KEY');
  const [defaultModel, setDefaultModel] = useState('Gemini 2.5 Flash');
  const [thinkingMode, setThinkingMode] = useState(true);
  const [rateLimit, setRateLimit] = useState(120);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [availableModels, setAvailableModels] = useState<string[]>(['Gemini 2.5 Flash', 'Gemini 2.5 Pro']);

  const handleTestConnection = () => {
    setTestStatus('testing');
    setTimeout(() => {
      setTestStatus('success');
    }, 1500);
  };

  const handleFetchModels = () => {
    setTestStatus('testing');
    setTimeout(() => {
      setAvailableModels(['Gemini 2.5 Flash', 'Gemini 2.5 Pro', 'Gemini 2.0 Flash', 'Gemini Live']);
      setTestStatus('success');
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-2xl animate-in fade-in duration-200">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Gemini Integration Config</h2>
        <p className="text-xs text-zinc-500 mt-1">Configure API parameters, credentials, thinking model controls, and rate limits for Google Gemini.</p>
      </div>

      <div className="p-6 rounded-2xl bg-[#1C1C1F] border border-zinc-800 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 space-y-1.5">
            <label className="text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">Gemini API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-650 focus:outline-none focus:border-zinc-700 transition-all font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">Default Target Model</label>
            <select
              value={defaultModel}
              onChange={(e) => setDefaultModel(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700 transition-all font-sans"
            >
              {availableModels.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">Base URL (API Endpoint)</label>
            <input
              type="text"
              defaultValue="https://generativelanguage.googleapis.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700 transition-all font-sans"
            />
          </div>
        </div>

        {/* Sliders and Toggles */}
        <div className="space-y-4 border-t border-zinc-850 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">Thinking Mode</span>
              <span className="text-[10px] text-zinc-500">Enable advanced multi-step reasoning models</span>
            </div>
            <button 
              onClick={() => setThinkingMode(!thinkingMode)}
              className="text-emerald-500"
            >
              {thinkingMode ? <ToggleRight className="w-9 h-9" /> : <ToggleLeft className="w-9 h-9 text-zinc-600" />}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <span className="text-[10px] text-zinc-550 uppercase font-semibold block">Rate Limit (Requests / Min)</span>
              <input
                type="number"
                value={rateLimit}
                onChange={(e) => setRateLimit(parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] text-zinc-550 uppercase font-semibold block">Max Output Tokens</span>
              <input
                type="number"
                defaultValue={4096}
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Buttons / Telemetry */}
        <div className="flex items-center gap-3 border-t border-zinc-850 pt-4">
          <button 
            onClick={handleTestConnection}
            className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200"
          >
            Test Connection
          </button>
          <button 
            onClick={handleFetchModels}
            className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-850 font-semibold text-xs"
          >
            Fetch Models
          </button>
        </div>

        {testStatus !== 'idle' && (
          <div className={`p-4 rounded-xl border text-xs font-mono flex items-center justify-between ${
            testStatus === 'testing' ? 'bg-zinc-900 border-zinc-850 text-zinc-450' :
            testStatus === 'success' ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-400' :
            'bg-red-950/40 border-red-800/40 text-red-400'
          }`}>
            <div className="flex items-center gap-2">
              <RefreshCw className={`w-3.5 h-3.5 ${testStatus === 'testing' ? 'animate-spin' : ''}`} />
              <span>
                {testStatus === 'testing' && 'Testing Gemini Cluster Endpoint...'}
                {testStatus === 'success' && 'API Connected Successfully. Response verified.'}
              </span>
            </div>
            {testStatus === 'success' && (
              <span className="text-[10px] font-sans font-medium">Latency: 184ms</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* ── TAB 4: MODELS REGISTRY                            ── */
/* ──────────────────────────────────────────────────────── */
function ModelsTab() {
  const [models, setModels] = useState(initialModels);

  const handleToggleActive = (id: string) => {
    setModels(prev => prev.map(m => m.id === id ? { ...m, active: !m.active } : m));
  };

  const handlePriorityChange = (id: string, delta: number) => {
    setModels(prev => prev.map(m => m.id === id ? { ...m, priority: Math.max(1, m.priority + delta) } : m));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Models Registry</h2>
          <p className="text-xs text-zinc-500 mt-1">Configure models prioritization, token limitations, provider pricing, and routing priority.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200">
          Create Model
        </button>
      </div>

      <div className="p-5 rounded-2xl bg-[#1C1C1F] border border-zinc-800">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-850 text-zinc-500 font-semibold">
              <th className="py-2.5">Model name</th>
              <th className="py-2.5">Provider</th>
              <th className="py-2.5 text-center">Version</th>
              <th className="py-2.5 text-right">Max Tokens</th>
              <th className="py-2.5 text-right">Priority</th>
              <th className="py-2.5 text-right">Cost / 1M Tokens</th>
              <th className="py-2.5 text-center">Status</th>
              <th className="py-2.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-850 text-zinc-300 font-mono">
            {models.map((m) => (
              <tr key={m.id} className="hover:bg-zinc-800/10">
                <td className="py-3 font-semibold text-zinc-100 font-sans">{m.name}</td>
                <td className="py-3 text-zinc-400 font-sans">{m.provider}</td>
                <td className="py-3 text-center">{m.version}</td>
                <td className="py-3 text-right">{m.maxTokens.toLocaleString()}</td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <span>{m.priority}</span>
                    <div className="flex flex-col text-[8px] text-zinc-500">
                      <button onClick={() => handlePriorityChange(m.id, 1)} className="hover:text-white">▲</button>
                      <button onClick={() => handlePriorityChange(m.id, -1)} className="hover:text-white">▼</button>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-right text-emerald-400">${m.price}</td>
                <td className="py-3 text-center">
                  <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold ${
                    m.active ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40' : 'bg-zinc-850 text-zinc-500 border border-zinc-700/30'
                  }`}>
                    {m.active ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="py-3 text-right font-sans">
                  <button 
                    onClick={() => handleToggleActive(m.id)}
                    className="text-xs text-zinc-400 hover:text-white underline"
                  >
                    {m.active ? 'Disable' : 'Enable'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* ── TAB 5: PROMPT REPOSITORY                          ── */
/* ──────────────────────────────────────────────────────── */
function PromptsTab() {
  const [prompts, setPrompts] = useState(initialPrompts);
  const [selectedPrompt, setSelectedPrompt] = useState<any>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Prompt Repository</h2>
          <p className="text-xs text-zinc-500 mt-1">Manage system prompts templates categorized by workflows (Support, Sales, Writing).</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200">
          Create Template
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {prompts.map((p) => (
          <div 
            key={p.id} 
            onClick={() => setSelectedPrompt(p)}
            className={`p-5 rounded-2xl bg-[#1C1C1F] border border-zinc-800 space-y-3 cursor-pointer hover:border-zinc-700 transition-colors ${
              selectedPrompt?.id === p.id ? 'border-emerald-700/60 shadow-glow' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-400 font-semibold rounded-md uppercase tracking-wider font-mono">
                {p.category}
              </span>
              <FileText className="w-3.5 h-3.5 text-zinc-500" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">{p.title}</h3>
              <p className="text-[10px] text-zinc-500 mt-1 leading-normal">{p.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedPrompt && (
        <div className="p-6 rounded-2xl bg-[#1C1C1F] border border-zinc-800 space-y-4 animate-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">{selectedPrompt.title}</h3>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{selectedPrompt.category}</span>
            </div>
            <button onClick={() => setSelectedPrompt(null)} className="text-zinc-500 hover:text-white">✕</button>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">Prompt Body Content</label>
            <textarea
              rows={6}
              value={selectedPrompt.prompt}
              onChange={(e) => {
                const updatedPrompt = e.target.value;
                setPrompts(prev => prev.map(p => p.id === selectedPrompt.id ? { ...p, prompt: updatedPrompt } : p));
                setSelectedPrompt((prev: any) => ({ ...prev, prompt: updatedPrompt }));
              }}
              className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono focus:outline-none focus:border-zinc-700 leading-relaxed"
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* ── TAB 6: CHAT INSPECTOR                             ── */
/* ──────────────────────────────────────────────────────── */
function ConversationsTab() {
  const [searchUser, setSearchUser] = useState('');
  const [selectedChat, setSelectedChat] = useState<any>(null);

  const filtered = initialConversations.filter(c => 
    c.user.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Chat Inspector</h2>
        <p className="text-xs text-zinc-500 mt-1">Audit customer conversations telemetry logs, latencies, tokens consumed, and model choices.</p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 p-5 rounded-2xl bg-[#1C1C1F] border border-zinc-800 space-y-4">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800">
            <Search className="w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Filter by user email..."
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              className="bg-transparent text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none w-full"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-850 text-zinc-500 font-semibold">
                  <th className="py-2.5">User Account</th>
                  <th className="py-2.5">AI Model</th>
                  <th className="py-2.5 text-right">Tokens</th>
                  <th className="py-2.5 text-right">Latency</th>
                  <th className="py-2.5 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-850 text-zinc-300">
                {filtered.map((c) => (
                  <tr 
                    key={c.id} 
                    onClick={() => setSelectedChat(c)}
                    className={`hover:bg-zinc-800/30 cursor-pointer ${selectedChat?.id === c.id ? 'bg-zinc-850/40' : ''}`}
                  >
                    <td className="py-3 font-semibold text-zinc-100">
                      <div>{c.user}</div>
                      <div className="text-[10px] text-zinc-500 font-mono mt-0.5 truncate max-w-[200px]">{c.preview}</div>
                    </td>
                    <td className="py-3 font-mono text-[11px] text-zinc-400">{c.model}</td>
                    <td className="py-3 text-right font-mono">{c.tokens.toLocaleString()}</td>
                    <td className="py-3 text-right font-mono text-emerald-400">{c.latency}</td>
                    <td className="py-3 text-right font-mono text-zinc-500">{c.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedChat && (
          <div className="w-80 p-5 rounded-2xl bg-[#1C1C1F] border border-zinc-800 space-y-4 animate-in slide-in-from-right-4 duration-200">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-xs font-bold text-white">Conversation Audit</h3>
              <button onClick={() => setSelectedChat(null)} className="text-zinc-500 hover:text-white">✕</button>
            </div>
            
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase font-semibold">User Email</span>
                <span className="text-white font-mono">{selectedChat.user}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase font-semibold">Model Routing Choice</span>
                <span className="text-zinc-300 font-mono">{selectedChat.model}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 font-mono">
                <div>
                  <span className="text-[10px] text-zinc-400 block uppercase font-sans font-semibold">Tokens</span>
                  <span>{selectedChat.tokens}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block uppercase font-sans font-semibold">Latency</span>
                  <span className="text-emerald-400">{selectedChat.latency}</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-850 text-zinc-300 leading-relaxed font-sans italic text-[11px] whitespace-pre-wrap">
                "{selectedChat.preview}"
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* ── TAB 7: PLATFORM SETTINGS                          ── */
/* ──────────────────────────────────────────────────────── */
function SettingsTab() {
  const [platformName, setPlatformName] = useState('AuromindAI');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [whitelist, setWhitelist] = useState('127.0.0.1, 192.168.1.1');

  return (
    <div className="space-y-6 max-w-xl animate-in fade-in duration-200">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">System Settings</h2>
        <p className="text-xs text-zinc-500 mt-1">Manage global system secrets, security parameter whitelists, SMTP config, and webhooks.</p>
      </div>

      <div className="p-6 rounded-2xl bg-[#1C1C1F] border border-zinc-800 space-y-5">
        <div className="space-y-1.5">
          <label className="text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">Platform Brand Name</label>
          <input
            type="text"
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700 transition-all font-sans"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">IP Whitelist Rules</label>
          <input
            type="text"
            value={whitelist}
            onChange={(e) => setWhitelist(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700 transition-all font-mono"
          />
        </div>

        <div className="flex items-center justify-between border-t border-zinc-850 pt-4">
          <div>
            <span className="text-xs font-bold text-white block">Maintenance Lock</span>
            <span className="text-[10px] text-zinc-500">Lock application access to admin operations only</span>
          </div>
          <button 
            onClick={() => setMaintenanceMode(!maintenanceMode)}
            className="text-emerald-500"
          >
            {maintenanceMode ? <ToggleRight className="w-9 h-9" /> : <ToggleLeft className="w-9 h-9 text-zinc-600" />}
          </button>
        </div>

        <div className="border-t border-zinc-850 pt-4 flex gap-2">
          <button 
            onClick={() => alert('Platform Settings Saved successfully.')}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-500"
          >
            Save Configuration
          </button>
          <button className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-850 font-semibold text-xs">
            Export System Backup
          </button>
        </div>
      </div>
    </div>
  );
}
