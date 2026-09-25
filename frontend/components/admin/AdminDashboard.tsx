'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  Users, 
  Activity, 
  Search, 
  Check, 
  X, 
  Plus, 
  Trash2, 
  DollarSign, 
  Calendar, 
  RefreshCw, 
  Mail, 
  TrendingUp, 
  Clock, 
  ShoppingBag, 
  Building2, 
  Phone, 
  MessageSquare, 
  ExternalLink, 
  Download, 
  CheckCircle2, 
  ArrowUpRight, 
  Eye, 
  UserCheck, 
  LogIn,
  LogOut,
  Video,
  CreditCard,
  Sparkles,
  AlertCircle,
  Copy
} from 'lucide-react';

/* ────────────────────────────────────────────────────────
   TYPES
──────────────────────────────────────────────────────── */
interface EcommerceLead {
  id: string;
  name: string;
  phone: string;
  business: string;
  budget: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'proposal' | 'converted' | 'lost';
  source?: string;
  notes?: string;
}

interface RealEstateLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company_type: string;
  lead_volume: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'tour_scheduled' | 'converted' | 'lost';
  notes?: string;
}

interface WebinarRegistration {
  id: string;
  name: string;
  email: string;
  phone: string;
  amount: number;
  currency: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  paymentId?: string;
  orderId?: string;
  registeredAt: string;
  webinarDate: string;
  webinarTime: string;
  source?: string;
  notes?: string;
}

interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Member' | 'Client';
  plan: string;
  credits: number;
  status: 'Active' | 'Suspended' | 'Pending';
  joined: string;
  lastLogin: string;
  chats: number;
  tokens: number;
}

/* ────────────────────────────────────────────────────────
   MAIN OWNER ADMIN DASHBOARD
──────────────────────────────────────────────────────── */
export function AdminDashboard({ onLogout }: { onLogout?: () => void } = {}) {
  const [activeTab, setActiveTab] = useState<'metrics' | 'ecommerce' | 'realestate' | 'webinar' | 'users'>('metrics');
  
  // Real dynamic counts from database
  const [ecLeadCount, setEcLeadCount] = useState<number>(0);
  const [reLeadCount, setReLeadCount] = useState<number>(0);
  const [webinarCount, setWebinarCount] = useState<number>(0);
  const [webinarPaidCount, setWebinarPaidCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);

  const refreshCounts = useCallback(() => {
    fetch('/api/admin/overview?t=' + Date.now(), { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data) {
          setEcLeadCount(data.totalEcommerceLeads || 0);
          setReLeadCount(data.totalRealEstateLeads || 0);
          setWebinarCount(data.totalWebinarRegistrations || 0);
          setWebinarPaidCount(data.paidWebinarRegistrations || 0);
          setUserCount(data.totalUsers || 0);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    refreshCounts();
    const interval = setInterval(refreshCounts, 6000);
    return () => clearInterval(interval);
  }, [refreshCounts]);

  return (
    <div className="flex flex-col h-full w-full bg-[#121214] overflow-hidden text-zinc-100 font-sans">
      {/* Top Executive Header */}
      <header className="h-14 border-b border-zinc-800 bg-[#141416] px-6 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm tracking-tight text-white">Auromind Owner Admin</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                PROD DB
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 font-mono">Inbound Leads, Webinar Attendees &amp; User Audit Portal</p>
          </div>
        </div>

        {/* Center Live Metric Quick Badges */}
        <div className="hidden md:flex items-center gap-3 text-xs">
          <button
            onClick={() => setActiveTab('ecommerce')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
              activeTab === 'ecommerce' 
                ? 'bg-emerald-500/15 border-emerald-500/50 text-white' 
                : 'bg-zinc-900 border-zinc-800 hover:border-emerald-500/40'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-zinc-400">eCommerce:</span>
            <span className="font-mono font-bold text-white">{ecLeadCount}</span>
          </button>
          <button
            onClick={() => setActiveTab('realestate')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
              activeTab === 'realestate' 
                ? 'bg-teal-500/15 border-teal-500/50 text-white' 
                : 'bg-zinc-900 border-zinc-800 hover:border-teal-500/40'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-zinc-400">Real Estate:</span>
            <span className="font-mono font-bold text-white">{reLeadCount}</span>
          </button>
          <button
            onClick={() => setActiveTab('webinar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
              activeTab === 'webinar' 
                ? 'bg-amber-500/15 border-amber-500/50 text-white' 
                : 'bg-zinc-900 border-zinc-800 hover:border-amber-500/40'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-zinc-400">AI Webinar:</span>
            <span className="font-mono font-bold text-amber-300">{webinarCount}</span>
            {webinarPaidCount > 0 && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold ml-1">
                {webinarPaidCount} Paid
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
              activeTab === 'users' 
                ? 'bg-blue-500/15 border-blue-500/50 text-white' 
                : 'bg-zinc-900 border-zinc-800 hover:border-blue-500/40'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-zinc-400">Signed Users:</span>
            <span className="font-mono font-bold text-white">{userCount}</span>
          </button>
        </div>

        {/* Right Action Links */}
        <div className="flex items-center gap-2.5 text-xs">
          <Link
            href="/ai-webinar"
            target="_blank"
            className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>/ai-webinar</span>
            <ExternalLink className="w-3 h-3 text-amber-400" />
          </Link>
          <Link
            href="/ecommerce"
            target="_blank"
            className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>/ecommerce</span>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </Link>
          <Link
            href="/real-estate"
            target="_blank"
            className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>/real-estate</span>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </Link>
          {onLogout && (
            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/50 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Lock Admin Panel"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>Lock Panel</span>
            </button>
          )}
        </div>
      </header>

      {/* Body: Sidebar + Main Tab View */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: Dashboard, Leads, Webinar & Users */}
        <aside className="w-64 border-r border-zinc-800 bg-[#141416] p-4 flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <nav className="space-y-1.5">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-3 pb-1">
                Executive Views
              </div>

              {/* Dashboard Overview */}
              <button
                onClick={() => setActiveTab('metrics')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'metrics'
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/20'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-white">Dashboard Overview</span>
                </div>
              </button>

              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-3 pt-4 pb-1">
                Campaign Leads &amp; Registrations
              </div>

              {/* AI Webinar Registrations Option */}
              <button
                onClick={() => setActiveTab('webinar')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'webinar'
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/20'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Video className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-white">AI Webinar (₹99)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    {webinarCount}
                  </span>
                  {webinarPaidCount > 0 && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                      {webinarPaidCount}✓
                    </span>
                  )}
                </div>
              </button>

              {/* eCommerce Leads Option */}
              <button
                onClick={() => setActiveTab('ecommerce')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'ecommerce'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/20'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-white">eCommerce Leads</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  {ecLeadCount}
                </span>
              </button>

              {/* Real Estate Leads Option */}
              <button
                onClick={() => setActiveTab('realestate')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'realestate'
                    ? 'bg-teal-500/15 text-teal-300 border border-teal-500/40 shadow-[0_0_15px_rgba(20,184,166,0.15)]'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/20'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-teal-400" />
                  <span className="font-bold text-white">Real Estate Leads</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30">
                  {reLeadCount}
                </span>
              </button>

              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-3 pt-4 pb-1">
                User Sign-Ins &amp; Accounts
              </div>

              {/* All Users & Sign-Ins Option */}
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'users'
                    ? 'bg-blue-500/15 text-blue-300 border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/20'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="font-bold text-white">Users &amp; Sign-Ins</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">
                  {userCount}
                </span>
              </button>
            </nav>
          </div>

          {/* Live Status Pill */}
          <div className="space-y-2">
            <div className="p-3 bg-zinc-900/70 rounded-xl border border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Leads &amp; Webinar Funnel
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">DB Synced</span>
            </div>
            <div className="text-[10px] text-zinc-500 font-mono text-center">
              Auromind Owner Admin
            </div>
          </div>
        </aside>

        {/* Main Tab View */}
        <main className="flex-1 overflow-y-auto bg-[#121214] p-8">
          {activeTab === 'metrics' && (
            <OverviewTab 
              onGoEcommerce={() => setActiveTab('ecommerce')} 
              onGoRealEstate={() => setActiveTab('realestate')}
              onGoWebinar={() => setActiveTab('webinar')}
              onGoUsers={() => setActiveTab('users')}
            />
          )}
          {activeTab === 'webinar' && <WebinarRegistrationsView onRefreshParent={refreshCounts} />}
          {activeTab === 'ecommerce' && <EcommerceLeadsView onRefreshParent={refreshCounts} />}
          {activeTab === 'realestate' && <RealEstateLeadsView onRefreshParent={refreshCounts} />}
          {activeTab === 'users' && <UsersSignInView onRefreshParent={refreshCounts} />}
        </main>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* ── TAB 1: OVERVIEW (LEADS & SIGN-INS STATS)          ── */
/* ──────────────────────────────────────────────────────── */
function OverviewTab({ 
  onGoEcommerce, 
  onGoRealEstate, 
  onGoWebinar,
  onGoUsers 
}: { 
  onGoEcommerce: () => void; 
  onGoRealEstate: () => void; 
  onGoWebinar: () => void;
  onGoUsers: () => void; 
}) {
  const [metrics, setMetrics] = useState<any>(null);
  const [users, setUsers] = useState<PlatformUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOverview = () => {
    setLoading(true);
    Promise.all([
      fetch('/api/admin/overview?t=' + Date.now(), { cache: 'no-store' }).then(r => r.json()),
      fetch('/api/admin/users?t=' + Date.now(), { cache: 'no-store' }).then(r => r.json())
    ])
      .then(([overviewData, usersData]) => {
        setMetrics(overviewData);
        setUsers(usersData.users || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-200 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Owner Dashboard</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Executive overview of inbound leads captured from marketing pages, webinar ticket sales, and user sign-in activity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchOverview}
            disabled={loading}
            className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-750 transition-all"
            title="Refresh Dashboard"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={onGoWebinar}
            className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-2 transition-all"
          >
            <Video className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Webinar ({metrics?.totalWebinarRegistrations ?? '...'})</span>
          </button>
          <button
            onClick={onGoEcommerce}
            className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-2 transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>eCommerce Leads ({metrics?.totalEcommerceLeads ?? '...'})</span>
          </button>
          <button
            onClick={onGoUsers}
            className="px-3.5 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold flex items-center gap-2 transition-all"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Users ({metrics?.totalUsers ?? '...'})</span>
          </button>
        </div>
      </div>

      {/* 5 Focused KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Card 1: AI Webinar */}
        <div 
          onClick={onGoWebinar}
          className="p-4 rounded-2xl bg-[#18191E] border border-amber-500/30 hover:border-amber-400/60 cursor-pointer space-y-2 transition-all group shadow-[0_0_15px_rgba(245,158,11,0.06)]"
        >
          <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400">
            <span className="text-amber-300">AI Webinar</span>
            <Video className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            {metrics ? `${metrics.totalWebinarRegistrations ?? 0}` : '...'}
          </div>
          <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
            <span className="text-emerald-400 font-bold">{metrics?.paidWebinarRegistrations ?? 0} Paid</span>
            <span className="text-amber-400 font-bold">{metrics?.pendingWebinarRegistrations ?? 0} Pending</span>
          </div>
        </div>

        {/* Card 2: eCommerce Leads */}
        <div 
          onClick={onGoEcommerce}
          className="p-4 rounded-2xl bg-[#18191E] border border-zinc-800 hover:border-emerald-500/40 cursor-pointer space-y-2 transition-all group"
        >
          <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400">
            <span>eCommerce Leads</span>
            <ShoppingBag className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            {metrics ? `${metrics.totalEcommerceLeads}` : '...'}
          </div>
          <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
            <span>Form submissions</span>
            <span className="text-emerald-400 font-bold">{metrics?.newEcommerceLeads ?? 0} New</span>
          </div>
        </div>

        {/* Card 3: Real Estate Leads */}
        <div 
          onClick={onGoRealEstate}
          className="p-4 rounded-2xl bg-[#18191E] border border-zinc-800 hover:border-teal-500/40 cursor-pointer space-y-2 transition-all group"
        >
          <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400">
            <span>Real Estate</span>
            <Building2 className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            {metrics ? `${metrics.totalRealEstateLeads}` : '...'}
          </div>
          <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
            <span>Demo requests</span>
            <span className="text-teal-300 font-bold">{metrics?.newRealEstateLeads ?? 0} New</span>
          </div>
        </div>

        {/* Card 4: Total Users Signed Up */}
        <div 
          onClick={onGoUsers}
          className="p-4 rounded-2xl bg-[#18191E] border border-zinc-800 hover:border-blue-500/40 cursor-pointer space-y-2 transition-all group"
        >
          <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400">
            <span>Registered Users</span>
            <Users className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            {metrics ? `${metrics.totalUsers}` : '...'}
          </div>
          <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
            <span>Database logins</span>
            <span className="text-blue-400 font-bold">{metrics?.activeUsers ?? 0} Active</span>
          </div>
        </div>

        {/* Card 5: Converted Leads */}
        <div 
          className="p-4 rounded-2xl bg-[#18191E] border border-zinc-800 space-y-2 transition-all"
        >
          <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400">
            <span>Converted &amp; Paid</span>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-black text-green-400 tracking-tight">
            {metrics ? `${(metrics.totalConverted ?? 0) + (metrics.paidWebinarRegistrations ?? 0)}` : '...'} Won
          </div>
          <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
            <span>eCom + Webinar</span>
            <span className="text-green-400 font-bold">100% Real</span>
          </div>
        </div>
      </div>

      {/* Two-Column Layout: Recent Leads on Left, Recent User Sign-ins on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Recent Inbound Leads Stream (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#18191E] border border-zinc-800 space-y-4 text-left">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
                Latest Inbound Activity (Webinar, eCommerce &amp; Real Estate)
              </h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Real-time stream from landing page submissions &amp; ticket checkouts.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onGoWebinar}
                className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
              >
                <span>Webinar</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onGoEcommerce}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
              >
                <span>eCommerce</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 font-semibold uppercase text-[10px]">
                  <th className="pb-2.5">Attendee / Client</th>
                  <th className="pb-2.5">Channel</th>
                  <th className="pb-2.5">Status / Fee</th>
                  <th className="pb-2.5">Date</th>
                  <th className="pb-2.5 text-right">WhatsApp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-850 text-zinc-300">
                {metrics?.recentActivity?.slice(0, 6).map((item: any) => {
                  const cleanPhone = item.contact?.replace(/[^\d]/g, '');
                  const isWebinar = item.type === 'webinar';
                  const isEcommerce = item.type === 'ecommerce';
                  const isPaid = item.status === 'paid';

                  return (
                    <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="py-3">
                        <div className="font-bold text-white text-xs">{item.title}</div>
                        <div className="text-[11px] text-zinc-500">{item.subtitle}</div>
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isWebinar
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                            : isEcommerce 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                        }`}>
                          {isWebinar ? 'AI Webinar' : isEcommerce ? 'eCommerce' : 'Real Estate'}
                        </span>
                      </td>
                      <td className="py-3">
                        {isWebinar ? (
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isPaid
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {isPaid ? 'PAID (₹99)' : 'PENDING'}
                          </span>
                        ) : (
                          <span className="font-semibold text-white">{item.detail}</span>
                        )}
                      </td>
                      <td className="py-3 text-zinc-500 font-mono text-[10px]">{item.time}</td>
                      <td className="py-3 text-right">
                        <a
                          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                            isWebinar
                              ? isPaid
                                ? `Hi ${item.title}! Welcome to Auromind's AI Automation Workshop (Oct 10th). Your ₹99 seat is confirmed!`
                                : `Hi ${item.title}! We noticed you started registering for our AI Automation Workshop (Oct 10th). Would you like help securing your seat?`
                              : `Hi ${item.title}! This is Auromind regarding your inquiry.`
                          )}`}
                          target="_blank"
                          className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-[10px] inline-flex items-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>Chat</span>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: User Sign-Ins & Platform Accounts (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#18191E] border border-zinc-800 space-y-4 text-left">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <LogIn className="w-4 h-4 text-blue-400" />
                User Sign-Ins &amp; Accounts
              </h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                How many users signed in and their active status.
              </p>
            </div>
            <button
              onClick={onGoUsers}
              className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
            >
              <span>Manage Users</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {users.slice(0, 5).map(u => (
              <div 
                key={u.id}
                className="p-3 rounded-xl bg-black/40 border border-zinc-800 flex items-center justify-between text-xs hover:border-zinc-700 transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">{u.name}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                      u.role === 'Owner' ? 'bg-purple-500/20 text-purple-300' :
                      u.role === 'Admin' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-zinc-800 text-zinc-400'
                    }`}>
                      {u.role}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-500">{u.email}</div>
                </div>

                <div className="text-right space-y-0.5">
                  <div className="text-[10px] text-emerald-400 font-mono flex items-center justify-end gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{u.lastLogin}</span>
                  </div>
                  <span className={`text-[10px] font-bold ${u.status === 'Active' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {u.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* ── TAB: AI WEBINAR REGISTRATIONS (₹99 & FORM FILLS)  ── */
/* ──────────────────────────────────────────────────────── */
function WebinarRegistrationsView({ onRefreshParent }: { onRefreshParent?: () => void }) {
  const [registrations, setRegistrations] = useState<WebinarRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'failed'>('all');
  const [selectedReg, setSelectedReg] = useState<WebinarRegistration | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/webinar/register?t=' + Date.now(), {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data.registrations || []);
      }
    } catch (err) {
      console.error('Failed to load webinar registrations:', err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRegistrations();
    const interval = setInterval(fetchRegistrations, 6000);
    return () => clearInterval(interval);
  }, [fetchRegistrations]);

  const handleStatusChange = async (regId: string, newStatus: 'paid' | 'pending' | 'failed') => {
    setUpdatingId(regId);
    setRegistrations(prev => prev.map(r => r.id === regId ? { ...r, paymentStatus: newStatus } : r));
    if (selectedReg && selectedReg.id === regId) {
      setSelectedReg(prev => prev ? { ...prev, paymentStatus: newStatus } : null);
    }
    try {
      await fetch('/api/webinar/register', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: regId, paymentStatus: newStatus })
      });
      if (onRefreshParent) onRefreshParent();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
    setUpdatingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this webinar registration?')) return;
    setRegistrations(prev => prev.filter(r => r.id !== id));
    if (selectedReg?.id === id) setSelectedReg(null);
    try {
      await fetch(`/api/webinar/register?id=${id}`, { method: 'DELETE' });
      if (onRefreshParent) onRefreshParent();
    } catch (err) {
      console.error('Failed to delete registration:', err);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(label);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportCSV = () => {
    const headers = 'ID,Name,Email,Phone,Amount,Currency,PaymentStatus,PaymentID,OrderID,Date,Source,Notes\n';
    const rows = registrations.map(r => 
      `"${r.id}","${r.name}","${r.email}","${r.phone}","${r.amount}","${r.currency}","${r.paymentStatus}","${r.paymentId || ''}","${r.orderId || ''}","${r.registeredAt}","${r.source || ''}","${(r.notes || '').replace(/"/g, '""')}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-webinar-registrations-${new Date().toISOString().substring(0, 10)}.csv`;
    a.click();
  };

  const filtered = registrations.filter(r => {
    const term = search.toLowerCase();
    const matchSearch = 
      r.name.toLowerCase().includes(term) ||
      r.email.toLowerCase().includes(term) ||
      r.phone.includes(term) ||
      (r.orderId && r.orderId.toLowerCase().includes(term)) ||
      (r.paymentId && r.paymentId.toLowerCase().includes(term));
    const matchStatus = statusFilter === 'all' || r.paymentStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalCount = registrations.length;
  const paidCount = registrations.filter(r => r.paymentStatus === 'paid').length;
  const pendingCount = registrations.filter(r => r.paymentStatus === 'pending').length;
  const failedCount = registrations.filter(r => r.paymentStatus === 'failed').length;
  const totalRevenue = paidCount * 99;

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">AI Automation Webinar Registrations</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-mono font-bold border border-amber-500/30">
                  {totalCount} Registrations
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono font-bold border border-emerald-500/30">
                  {paidCount} Paid (₹{totalRevenue})
                </span>
              </div>
            </div>
          </div>
          <p className="text-xs text-zinc-400 mt-1.5">
            Live attendee list for the <span className="text-amber-300 font-semibold">AI Automation Workshop</span> (Sat, Oct 10th · 10 AM – 12 PM IST · ₹99). Real-time tracking of form fills and Razorpay payment status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchRegistrations}
            disabled={loading}
            className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-300 border border-zinc-700 transition-colors"
            title="Refresh Registrations"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={exportCSV}
            className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-200 border border-zinc-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <Link
            href="/ai-webinar"
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <span>View Landing Page</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </Link>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-[#18191E] border border-zinc-800 space-y-1">
          <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Total Registrations</span>
          <div className="text-2xl font-black text-white">{totalCount}</div>
          <div className="text-[10px] text-zinc-400">Total forms submitted</div>
        </div>
        <div className="p-4 rounded-xl bg-[#18191E] border border-emerald-500/25 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-emerald-400 uppercase font-bold block">Paid &amp; Confirmed</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{paidCount}</div>
          <div className="text-[10px] text-zinc-400 font-mono">₹{totalRevenue} collected (@ ₹99/seat)</div>
        </div>
        <div className="p-4 rounded-xl bg-[#18191E] border border-amber-500/25 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-amber-400 uppercase font-bold block">Pending Payment</span>
            <Clock className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300">{pendingCount}</div>
          <div className="text-[10px] text-zinc-400">Form filled; checkout in-progress</div>
        </div>
        <div className="p-4 rounded-xl bg-[#18191E] border border-zinc-800 space-y-1">
          <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Payment Conversion</span>
          <div className="text-2xl font-black text-white">
            {totalCount > 0 ? `${Math.round((paidCount / totalCount) * 100)}%` : '0%'}
          </div>
          <div className="text-[10px] text-zinc-400">Paid / Form completion rate</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-[#18191E] border border-zinc-800 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, phone, order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-black/50 border border-zinc-750 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-zinc-500 text-[11px] font-semibold">Payment Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 rounded-lg bg-black/50 border border-zinc-750 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="all">All Registrations ({totalCount})</option>
            <option value="paid">✓ Paid (₹99 Confirmed) ({paidCount})</option>
            <option value="pending">⏳ Pending Payment ({pendingCount})</option>
            <option value="failed">✕ Failed / Incomplete ({failedCount})</option>
          </select>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="rounded-2xl border border-zinc-800 bg-[#18191E] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 bg-black/30 text-zinc-400 font-semibold uppercase text-[10px]">
                <th className="py-3 px-4">Attendee Info</th>
                <th className="py-3 px-4">Phone / WhatsApp</th>
                <th className="py-3 px-4">Fee</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4">Payment &amp; Order ID</th>
                <th className="py-3 px-4">Registered At</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-850 text-zinc-300">
              {filtered.map(reg => {
                const cleanPhone = reg.phone.replace(/[^\d]/g, '');
                const isPaid = reg.paymentStatus === 'paid';
                const isPending = reg.paymentStatus === 'pending';

                return (
                  <tr key={reg.id} className="hover:bg-zinc-800/30 transition-colors">
                    {/* Attendee */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-white text-sm flex items-center gap-1.5">
                        <span>{reg.name}</span>
                        {isPaid && (
                          <span className="text-[10px] text-emerald-400 font-bold" title="Seat confirmed">✓</span>
                        )}
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">{reg.email}</div>
                      {reg.notes && (
                        <div className="text-[10px] text-zinc-500 italic mt-0.5 max-w-[200px] truncate">
                          {reg.notes}
                        </div>
                      )}
                    </td>

                    {/* Phone / WhatsApp */}
                    <td className="py-3 px-4">
                      <div className="font-mono text-white text-xs">{reg.phone}</div>
                      <a
                        href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                          isPaid 
                            ? `Hi ${reg.name}! Welcome to Auromind's AI Automation Workshop (Oct 10, 10 AM - 12 PM IST). We have confirmed your ₹99 seat registration. Your Zoom link will be shared 24h prior. Any questions?` 
                            : `Hi ${reg.name}! We noticed you started registering for our AI Automation Workshop (Oct 10, 10 AM). Would you like help completing your ₹99 registration?`
                        )}`}
                        target="_blank"
                        className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1 mt-0.5 font-semibold"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>1-Click WhatsApp</span>
                      </a>
                    </td>

                    {/* Fee */}
                    <td className="py-3 px-4">
                      <span className="font-bold text-white bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">
                        ₹{reg.amount}
                      </span>
                    </td>

                    {/* Payment Status Dropdown with Live Patch */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <select
                          value={reg.paymentStatus}
                          disabled={updatingId === reg.id}
                          onChange={(e) => handleStatusChange(reg.id, e.target.value as any)}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer transition-all ${
                            isPaid
                              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-sm'
                              : isPending
                              ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                              : 'bg-red-500/15 text-red-400 border-red-500/40'
                          }`}
                        >
                          <option value="paid">✓ Paid (Confirmed)</option>
                          <option value="pending">⏳ Pending Payment</option>
                          <option value="failed">✕ Failed / Incomplete</option>
                        </select>
                      </div>
                      <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                        {isPaid ? 'Seat Reserved' : isPending ? 'Follow-up Needed' : 'Abandoned'}
                      </div>
                    </td>

                    {/* Payment & Order ID */}
                    <td className="py-3 px-4 font-mono text-[11px]">
                      {reg.paymentId ? (
                        <div className="flex items-center gap-1 text-emerald-400">
                          <CreditCard className="w-3 h-3" />
                          <span>{reg.paymentId}</span>
                          <button
                            onClick={() => copyToClipboard(reg.paymentId || '', reg.paymentId || '')}
                            title="Copy Payment ID"
                            className="p-0.5 hover:text-white"
                          >
                            <Copy className="w-3 h-3 text-zinc-500 hover:text-zinc-300" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-zinc-600 text-[10px]">No payment ID yet</span>
                      )}
                      {reg.orderId && (
                        <div className="text-[10px] text-zinc-500 flex items-center gap-1 mt-0.5">
                          <span>{reg.orderId}</span>
                          <button
                            onClick={() => copyToClipboard(reg.orderId || '', reg.orderId || '')}
                            title="Copy Order ID"
                            className="p-0.5 hover:text-white"
                          >
                            <Copy className="w-2.5 h-2.5 text-zinc-600 hover:text-zinc-300" />
                          </button>
                        </div>
                      )}
                      {copiedId && (copiedId === reg.paymentId || copiedId === reg.orderId) && (
                        <div className="text-[9px] text-emerald-400">Copied!</div>
                      )}
                    </td>

                    {/* Registered Date */}
                    <td className="py-3 px-4 text-zinc-400 text-[11px] font-mono">
                      <div>{reg.registeredAt}</div>
                      <div className="text-[10px] text-zinc-600">{reg.source || 'Webinar Form'}</div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedReg(reg)}
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-750 text-zinc-300 hover:text-white transition-colors"
                          title="View Attendee Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={`tel:${cleanPhone}`}
                          className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors"
                          title="Call Attendee"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleDelete(reg.id)}
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-950 text-zinc-400 hover:text-red-400 transition-colors"
                          title="Delete Registration"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-500 text-xs">
                    No webinar registrations found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Attendee Inspector Modal */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#18191E] border border-zinc-800 shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-150 text-left">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-white">{selectedReg.name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    selectedReg.paymentStatus === 'paid'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : selectedReg.paymentStatus === 'pending'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {selectedReg.paymentStatus.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">{selectedReg.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-emerald-400 text-xs font-bold">{selectedReg.phone}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">Registered: {selectedReg.registeredAt}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedReg(null)}
                className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Event & Payment Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Webinar Date &amp; Time</span>
                <span className="font-bold text-white text-xs block mt-0.5">{selectedReg.webinarDate}</span>
                <span className="text-[11px] text-amber-400 font-semibold">{selectedReg.webinarTime}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Registration Fee</span>
                <span className="font-bold text-emerald-400 text-lg">₹{selectedReg.amount} {selectedReg.currency}</span>
                <span className="text-[10px] text-zinc-400 block mt-0.5">Status: {selectedReg.paymentStatus}</span>
              </div>
            </div>

            {/* IDs Box */}
            <div className="p-3 rounded-xl bg-black/40 border border-zinc-800 space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-[10px] text-zinc-500 uppercase">Razorpay Order ID:</span>
                <span className="text-white">{selectedReg.orderId || 'None'}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-[10px] text-zinc-500 uppercase">Payment ID:</span>
                <span className={selectedReg.paymentId ? 'text-emerald-400' : 'text-zinc-600'}>
                  {selectedReg.paymentId || 'Pending Payment'}
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-[10px] text-zinc-500 uppercase">Funnel Source:</span>
                <span className="text-zinc-300">{selectedReg.source || 'AI Webinar Page'}</span>
              </div>
            </div>

            {/* WhatsApp Script Card */}
            <div className={`p-4 rounded-xl border space-y-2 text-xs ${
              selectedReg.paymentStatus === 'paid' 
                ? 'bg-[#0B1E14] border-emerald-500/30' 
                : 'bg-amber-950/20 border-amber-500/30'
            }`}>
              <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                <span className={selectedReg.paymentStatus === 'paid' ? 'text-emerald-400' : 'text-amber-400'}>
                  {selectedReg.paymentStatus === 'paid' ? 'Paid Confirmation WhatsApp Script' : 'Follow-up Reminder WhatsApp Script'}
                </span>
                <button
                  onClick={() => {
                    const text = selectedReg.paymentStatus === 'paid'
                      ? `Hi ${selectedReg.name}! 🎉 Welcome to Auromind's AI Automation Workshop on Saturday, October 10th (10:00 AM – 12:00 PM IST). We have confirmed your ₹99 registration. Your Zoom link will be sent 24h prior. See you inside!`
                      : `Hi ${selectedReg.name}! 👋 This is the Auromind team. We noticed you started registering for our AI Automation Workshop (Oct 10th, 10 AM - 12 PM IST) but the ₹99 payment wasn't completed. Would you like a direct payment link to secure your seat before early-bird closes?`;
                    navigator.clipboard.writeText(text);
                    alert('Copied WhatsApp message to clipboard!');
                  }}
                  className={`hover:underline font-bold ${selectedReg.paymentStatus === 'paid' ? 'text-emerald-400' : 'text-amber-400'}`}
                >
                  Copy Message
                </button>
              </div>
              <p className={`leading-relaxed text-[11px] ${selectedReg.paymentStatus === 'paid' ? 'text-emerald-100' : 'text-amber-100'}`}>
                {selectedReg.paymentStatus === 'paid'
                  ? `“Hi ${selectedReg.name}! 🎉 Welcome to Auromind's AI Automation Workshop on Saturday, October 10th (10:00 AM – 12:00 PM IST). We have confirmed your ₹99 registration. Your Zoom link will be sent 24h prior. See you inside!”`
                  : `“Hi ${selectedReg.name}! 👋 This is the Auromind team. We noticed you started registering for our AI Automation Workshop (Oct 10th, 10 AM - 12 PM IST) but the ₹99 payment wasn't completed. Would you like a direct payment link to secure your seat before early-bird closes?”`
                }
              </p>
            </div>

            {/* Quick Status Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-zinc-800 text-xs">
              <span className="text-zinc-400 font-semibold">Change Payment Status:</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleStatusChange(selectedReg.id, 'paid')}
                  className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all ${
                    selectedReg.paymentStatus === 'paid'
                      ? 'bg-emerald-500 text-black'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                  }`}
                >
                  Paid (₹99)
                </button>
                <button
                  onClick={() => handleStatusChange(selectedReg.id, 'pending')}
                  className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all ${
                    selectedReg.paymentStatus === 'pending'
                      ? 'bg-amber-500 text-black'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                  }`}
                >
                  Pending
                </button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${selectedReg.phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(
                  selectedReg.paymentStatus === 'paid'
                    ? `Hi ${selectedReg.name}! 🎉 Welcome to Auromind's AI Automation Workshop on Saturday, October 10th (10:00 AM – 12:00 PM IST). We have confirmed your ₹99 registration.`
                    : `Hi ${selectedReg.name}! 👋 This is Auromind regarding your registration for the AI Automation Workshop on Oct 10th.`
                )}`}
                target="_blank"
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Open WhatsApp Chat</span>
              </a>
              <button
                onClick={() => setSelectedReg(null)}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-300 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* ── TAB 2: ECOMMERCE LEADS (FORM SUBMISSIONS ONLY)    ── */
/* ──────────────────────────────────────────────────────── */
function EcommerceLeadsView({ onRefreshParent }: { onRefreshParent?: () => void }) {
  const [leads, setLeads] = useState<EcommerceLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<EcommerceLead | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ecommerce/lead?t=' + Date.now(), {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (res.ok) {
        const data = await res.json();
        let apiLeads: EcommerceLead[] = data.leads || [];

        // Check if there are local leads stored in browser
        try {
          const stored = localStorage.getItem('auromind_submitted_leads');
          if (stored) {
            const localLeads = JSON.parse(stored);
            if (Array.isArray(localLeads)) {
              const existingIds = new Set(apiLeads.map(l => l.id));
              const missing = localLeads.filter(l => !existingIds.has(l.id));
              if (missing.length > 0) {
                apiLeads = [...missing, ...apiLeads];
              }
            }
          }
        } catch {}

        setLeads(apiLeads);
      }
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 6000);
    return () => clearInterval(interval);
  }, [fetchLeads]);

  const handleStatusChange = async (leadId: string, newStatus: EcommerceLead['status']) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
    }
    try {
      await fetch('/api/ecommerce/lead', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status: newStatus })
      });
      if (onRefreshParent) onRefreshParent();
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this lead record?')) return;
    setLeads(prev => prev.filter(l => l.id !== id));
    if (selectedLead?.id === id) setSelectedLead(null);
    try {
      await fetch(`/api/ecommerce/lead?id=${id}`, { method: 'DELETE' });
      if (onRefreshParent) onRefreshParent();
    } catch {}
  };

  const exportCSV = () => {
    const headers = 'ID,Name,Phone,Business,Budget,Date,Status\n';
    const rows = leads.map(l => `"${l.id}","${l.name}","${l.phone}","${l.business}","${l.budget}","${l.submittedAt}","${l.status}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ecommerce-leads-${new Date().toISOString().substring(0,10)}.csv`;
    a.click();
  };

  const filtered = leads.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.business.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search);
    const matchStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">eCommerce Form Submissions</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono font-bold border border-emerald-500/30">
              {leads.length} Leads Stored
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Form fills captured from the high-converting strategy call form on <Link href="/ecommerce" target="_blank" className="text-emerald-400 hover:underline">/ecommerce</Link>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-300 border border-zinc-700 transition-colors"
            title="Refresh Leads"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={exportCSV}
            className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-200 border border-zinc-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-[#18191E] border border-zinc-800 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client name, business, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-black/50 border border-zinc-750 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-zinc-500 text-[11px] font-semibold">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-black/50 border border-zinc-750 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Statuses ({leads.length})</option>
            <option value="new">New Inbound ({leads.filter(l => l.status === 'new').length})</option>
            <option value="contacted">Contacted</option>
            <option value="proposal">Proposal Sent</option>
            <option value="converted">Converted Won</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-2xl border border-zinc-800 bg-[#18191E] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 bg-black/30 text-zinc-400 font-semibold uppercase text-[10px]">
                <th className="py-3 px-4">Client &amp; Store Name</th>
                <th className="py-3 px-4">WhatsApp / Phone</th>
                <th className="py-3 px-4">Budget</th>
                <th className="py-3 px-4">Submission Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-850 text-zinc-300">
              {filtered.map(lead => {
                const cleanPhone = lead.phone.replace(/[^\d]/g, '');
                return (
                  <tr key={lead.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white text-sm">{lead.name}</div>
                      <div className="text-[11px] text-zinc-400 flex items-center gap-1 mt-0.5">
                        <ShoppingBag className="w-3 h-3 text-emerald-400" />
                        <span>{lead.business}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-mono text-white text-xs">{lead.phone}</div>
                      <a
                        href={`https://wa.me/${cleanPhone}`}
                        target="_blank"
                        className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1 mt-0.5 font-semibold"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>1-Click WhatsApp</span>
                      </a>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold text-white bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">
                        {lead.budget}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-zinc-400 text-[11px] font-mono">
                      {lead.submittedAt}
                    </td>

                    <td className="py-3 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                          lead.status === 'new'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : lead.status === 'contacted'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                            : lead.status === 'proposal'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : lead.status === 'converted'
                            ? 'bg-green-500/10 text-green-400 border-green-500/30'
                            : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                        }`}
                      >
                        <option value="new">New Inbound</option>
                        <option value="contacted">Contacted</option>
                        <option value="proposal">Proposal Sent</option>
                        <option value="converted">Converted Won</option>
                        <option value="lost">Lost</option>
                      </select>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={`tel:${cleanPhone}`}
                          className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors"
                          title="Call Lead"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-950 text-zinc-400 hover:text-red-400 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500 text-xs">
                    No leads found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Lead Inspector Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#18191E] border border-zinc-800 shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-black text-white">{selectedLead.name}</h3>
                <p className="text-xs text-zinc-400">{selectedLead.business}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-emerald-400 text-xs font-bold">{selectedLead.phone}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">Submitted: {selectedLead.submittedAt}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Budget Selected</span>
                <span className="font-bold text-white text-sm">{selectedLead.budget}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Funnel Source</span>
                <span className="font-bold text-emerald-400 text-sm">{selectedLead.source || 'Hero Form'}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1E14] border border-emerald-500/30 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[10px] font-bold text-emerald-400 uppercase">
                <span>Suggested WhatsApp Follow-Up</span>
                <button
                  onClick={() => {
                    const text = `Hi ${selectedLead.name}! This is the Auromind eCommerce team. We received your request regarding custom store development for ${selectedLead.business}. Would today at 4:00 PM work for a quick 15-minute strategy walkthrough?`;
                    navigator.clipboard.writeText(text);
                    alert('Copied message to clipboard!');
                  }}
                  className="hover:underline"
                >
                  Copy
                </button>
              </div>
              <p className="text-emerald-100 leading-relaxed">
                &quot;Hi {selectedLead.name}! This is the Auromind eCommerce team. We received your request regarding custom store development for ${selectedLead.business}. Would today at 4:00 PM work for a quick 15-minute strategy walkthrough?&quot;
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${selectedLead.phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(`Hi ${selectedLead.name}! This is AuromindAI regarding your eCommerce store ${selectedLead.business}.`)}`}
                target="_blank"
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Open WhatsApp Chat</span>
              </a>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-300 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* ── TAB 3: REAL ESTATE LEADS                         ── */
/* ──────────────────────────────────────────────────────── */
function RealEstateLeadsView({ onRefreshParent }: { onRefreshParent?: () => void }) {
  const [reLeads, setReLeads] = useState<RealEstateLead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = useCallback(() => {
    setLoading(true);
    fetch('/api/real-estate/lead')
      .then(res => res.json())
      .then(data => setReLeads(data.leads || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this real estate lead?')) return;
    setReLeads(prev => prev.filter(l => l.id !== id));
    try {
      await fetch(`/api/real-estate/lead?id=${id}`, { method: 'DELETE' });
      if (onRefreshParent) onRefreshParent();
    } catch {}
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-left">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">Real Estate Demo Submissions</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/15 text-teal-300 font-mono font-bold border border-teal-500/30">
              {reLeads.length} Leads Stored
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Inbound consultation requests submitted from <Link href="/real-estate" target="_blank" className="text-teal-400 hover:underline">/real-estate</Link>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-300 border border-zinc-700 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            href="/real-estate-crm"
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <span>Open Real Estate CRM</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-[#18191E] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-800 bg-black/30 text-zinc-400 font-semibold uppercase text-[10px]">
              <th className="py-3 px-4">Broker / Client</th>
              <th className="py-3 px-4">WhatsApp / Contact</th>
              <th className="py-3 px-4">Firm Type</th>
              <th className="py-3 px-4">Monthly Lead Volume</th>
              <th className="py-3 px-4">Submitted At</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-850 text-zinc-300">
            {reLeads.map(l => (
              <tr key={l.id} className="hover:bg-zinc-800/30 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-bold text-white text-sm">{l.name}</div>
                  <div className="text-[11px] text-zinc-500">{l.email}</div>
                </td>
                <td className="py-3 px-4 font-mono text-teal-400">{l.phone}</td>
                <td className="py-3 px-4 font-semibold text-white">{l.company_type}</td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 font-medium">
                    {l.lead_volume}
                  </span>
                </td>
                <td className="py-3 px-4 text-zinc-500 font-mono text-[11px]">{l.submittedAt}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <a
                      href={`https://wa.me/${l.phone.replace(/[^\d]/g, '')}`}
                      target="_blank"
                      className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-black font-extrabold text-[11px] inline-flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                    <button
                      onClick={() => handleDelete(l.id)}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-950 text-zinc-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
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
/* ── TAB 4: USERS & SIGN-INS DIRECTORY                 ── */
/* ──────────────────────────────────────────────────────── */
function UsersSignInView({ onRefreshParent }: { onRefreshParent?: () => void }) {
  const [users, setUsers] = useState<PlatformUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<PlatformUser | null>(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  // New user form state
  const [addName, setAddName] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addRole, setAddRole] = useState<'Owner' | 'Admin' | 'Member' | 'Client'>('Client');
  const [addPlan, setAddPlan] = useState('Pro SaaS');

  const fetchUsers = useCallback(() => {
    setLoading(true);
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => setUsers(data.users || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleStatus = async (id: string) => {
    const user = users.find(u => u.id === id);
    if (!user) return;
    const newStatus = user.status === 'Active' ? 'Suspended' : 'Active';

    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
    if (selectedUser && selectedUser.id === id) {
      setSelectedUser(prev => prev ? { ...prev, status: newStatus } : null);
    }

    try {
      await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (onRefreshParent) onRefreshParent();
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    setUsers(prev => prev.filter(u => u.id !== id));
    if (selectedUser?.id === id) setSelectedUser(null);

    try {
      await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
      if (onRefreshParent) onRefreshParent();
    } catch {}
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: addName,
          email: addEmail,
          role: addRole,
          plan: addPlan
        })
      });
      if (res.ok) {
        setShowAddUserModal(false);
        setAddName('');
        setAddEmail('');
        fetchUsers();
        if (onRefreshParent) onRefreshParent();
      }
    } catch {}
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">Platform Users &amp; Sign-Ins</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 font-mono font-bold border border-blue-500/30">
              {users.length} Accounts
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Audit user sign-ins, registration dates, active roles, and account status.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchUsers}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-300 border border-zinc-700"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setShowAddUserModal(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add User Account</span>
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 space-y-4">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search users by name, email, or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#18191E] border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-700"
            />
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#18191E] overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800 bg-black/30 text-zinc-400 font-semibold uppercase text-[10px]">
                  <th className="py-3 px-4">User Name &amp; Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Plan Tier</th>
                  <th className="py-3 px-4">Last Sign-In</th>
                  <th className="py-3 px-4">Account Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-850 text-zinc-300">
                {filtered.map((u) => (
                  <tr 
                    key={u.id}
                    onClick={() => setSelectedUser(u)}
                    className={`cursor-pointer transition-colors ${selectedUser?.id === u.id ? 'bg-zinc-800/60' : 'hover:bg-zinc-800/30'}`}
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-white">{u.name}</div>
                      <div className="text-[11px] text-zinc-500">{u.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.role === 'Owner' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                        u.role === 'Admin' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                        'bg-zinc-800 text-zinc-400'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-white">{u.plan}</td>
                    <td className="py-3 px-4 font-mono text-emerald-400 text-[11px]">{u.lastLogin}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.status === 'Active' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' : 'bg-red-950 text-red-400 border border-red-800/40'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleToggleStatus(u.id)}
                          className="text-[11px] text-zinc-400 hover:text-white p-1 hover:bg-zinc-800 rounded"
                          title={u.status === 'Active' ? 'Suspend' : 'Activate'}
                        >
                          {u.status === 'Active' ? 'Suspend' : 'Activate'}
                        </button>
                        <button 
                          onClick={() => handleDelete(u.id)}
                          className="text-zinc-500 hover:text-red-400 p-1 hover:bg-zinc-800 rounded"
                          title="Delete User"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected User Details Drawer */}
        {selectedUser && (
          <div className="w-80 rounded-2xl bg-[#18191E] border border-zinc-800 p-5 space-y-4 shrink-0 animate-in slide-in-from-right-2 duration-150 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider">User Account Profile</span>
              <button onClick={() => setSelectedUser(null)} className="text-zinc-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-bold text-white">{selectedUser.name}</div>
              <div className="text-xs text-zinc-400 font-mono">{selectedUser.email}</div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2">
              <div className="p-2.5 rounded-xl bg-black/40 border border-zinc-850">
                <span className="text-[10px] text-zinc-500 block">Assigned Role</span>
                <span className="font-bold text-white">{selectedUser.role}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-zinc-850">
                <span className="text-[10px] text-zinc-500 block">Status</span>
                <span className={`font-bold ${selectedUser.status === 'Active' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {selectedUser.status}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-zinc-850">
                <span className="text-[10px] text-zinc-500 block">Last Sign-In</span>
                <span className="font-bold text-emerald-400 text-[11px]">{selectedUser.lastLogin}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-zinc-850">
                <span className="text-[10px] text-zinc-500 block">Registered On</span>
                <span className="font-bold text-white text-[11px]">{selectedUser.joined}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <button
                onClick={() => handleToggleStatus(selectedUser.id)}
                className="w-full py-2 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-xs font-bold text-white transition-colors"
              >
                {selectedUser.status === 'Active' ? 'Suspend Account' : 'Reactivate Account'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleAddUser} className="w-full max-w-md rounded-2xl bg-[#18191E] border border-zinc-800 p-6 space-y-4 shadow-2xl text-left">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Add User Account</h3>
              <button type="button" onClick={() => setShowAddUserModal(false)} className="text-zinc-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-400">Full Name</label>
              <input
                required
                type="text"
                placeholder="e.g. Santhosh Kumar"
                value={addName}
                onChange={e => setAddName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black/50 border border-zinc-750 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-400">Email Address</label>
              <input
                required
                type="email"
                placeholder="user@groww.digital"
                value={addEmail}
                onChange={e => setAddEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black/50 border border-zinc-750 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-400">Role</label>
                <select
                  value={addRole}
                  onChange={e => setAddRole(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-zinc-750 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Client">Client</option>
                  <option value="Member">Member</option>
                  <option value="Admin">Admin</option>
                  <option value="Owner">Owner</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-400">Plan</label>
                <select
                  value={addPlan}
                  onChange={e => setAddPlan(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-zinc-750 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Free Plan">Free Plan</option>
                  <option value="Pro SaaS">Pro SaaS</option>
                  <option value="Enterprise Pro">Enterprise Pro</option>
                  <option value="Commerce Custom">Commerce Custom</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setShowAddUserModal(false)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
              >
                Save Account
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
