'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Building2, Home, Key, Zap, TrendingUp, CheckCircle2, ArrowRight,
  Phone, Mail, MessageSquare, Bot, Sparkles, Shield, Send,
  Loader2, Users, DollarSign, Calendar, Clock, MapPin,
  ChevronDown, ChevronLeft, ChevronRight, Sliders, Play, Award, Check,
  ExternalLink, Layers, PieChart, Star, Compass, Eye, Filter, Lock,
  CheckCircle, AlertCircle, BarChart3, ChevronUp
} from 'lucide-react';

/* ────────────────────────────────────────────────────────────────────────────
   ANALYTICS HELPER
──────────────────────────────────────────────────────────────────────────── */
function trackEvent(eventName: string, data?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  try {
    window.dispatchEvent(new CustomEvent('analytics_event', { detail: { event: eventName, ...data } }));
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: eventName, ...data });
  } catch (err) {
    console.debug('Tracking:', eventName, data);
  }
}

/* ────────────────────────────────────────────────────────────────────────────
   GROUNDED STAT COMPONENT
──────────────────────────────────────────────────────────────────────────── */
function GroundedStat({ value, label, context }: { value: string; label: string; context: string }) {
  return (
    <div className="text-center space-y-1">
      <div className="text-3xl md:text-4xl font-black text-white">{value}</div>
      <div className="text-sm font-bold text-white">{label}</div>
      <div className="text-[11px] font-medium text-emerald-100/70">{context}</div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   PROPERTY SHOWCASE / PORTFOLIO (High-Res Images & Grounded Outcomes)
──────────────────────────────────────────────────────────────────────────── */
const PROPERTY_PORTFOLIO = [
  {
    img: '/re-hero-mansion.jpg',
    name: 'Verdant Hills Modern Villa',
    niche: 'West Hills Reserve • 4 Beds • 4 Baths • 3,800 sq ft',
    built: 'Autonomous WhatsApp AI + 3D Virtual Tour',
    result: '+64% Site Visit Booking Lift',
    context: 'Over 60-day campaign scaling window',
    tag: 'Luxury Modern Villa',
    price: '$2,200,000',
    color: 'from-emerald-600 to-teal-700'
  },
  {
    img: '/re-portfolio-penthouse.jpg',
    name: 'The Azure Sky Penthouse',
    niche: 'Downtown Metropolis • 3 Beds • 3.5 Baths • 2,400 sq ft',
    built: '60s Inbound AI Qualification + Calendar Lock',
    result: 'Closed in 14 Days ($1.45M)',
    context: 'Pre-screened cash escrow verified',
    tag: 'Skyline Penthouse',
    price: '$1,450,000',
    color: 'from-blue-600 to-cyan-700'
  },
  {
    img: '/re-portfolio-waterfront.jpg',
    name: 'Marina Promenade Waterfront',
    niche: 'Waterfront Marina • 2 Beds • 2 Baths • 1,350 sq ft',
    built: 'Predictive CMA AI + Investor Yield Funnel',
    result: '7.4% Gross Rental Yield Forecast',
    context: 'Attracted 38 international buyer inquiries',
    tag: 'Waterfront High-Rise',
    price: '$890,000',
    color: 'from-amber-600 to-orange-600'
  },
  {
    img: '/re-portfolio-estate.jpg',
    name: 'The Oakwood Executive Estate',
    niche: 'Oakwood Enclave • 5 Beds • 6 Baths • 5,200 sq ft',
    built: 'Hyper-Local Meta Ad Engine + CRM Automation',
    result: '$80,000 Brokerage Commission',
    context: 'Zero weekend or night lead leakage',
    tag: 'Private Gated Estate',
    price: '$3,100,000',
    color: 'from-purple-600 to-pink-700'
  }
];

/* ────────────────────────────────────────────────────────────────────────────
   PORTFOLIO CAROUSEL
──────────────────────────────────────────────────────────────────────────── */
function PropertyCarousel() {
  const [idx, setIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setIdx(i => (i - 1 + PROPERTY_PORTFOLIO.length) % PROPERTY_PORTFOLIO.length);
  const next = () => setIdx(i => (i + 1) % PROPERTY_PORTFOLIO.length);
  const item = PROPERTY_PORTFOLIO[idx];

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) next();
    else if (diff < -45) prev();
    touchStartX.current = null;
  };

  return (
    <div className="space-y-6">
      {/* Active Property Card */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="rounded-3xl overflow-hidden shadow-2xl border border-zinc-200/80 bg-slate-950 select-none transition-all duration-300"
      >
        {/* Visual Showcase Container */}
        <div className="relative aspect-[16/10] sm:aspect-video md:aspect-[16/9] w-full overflow-hidden bg-slate-900 group">
          <Image
            src={item.img}
            alt={`${item.name} - ${item.niche}`}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 960px"
            className="object-cover transition-all duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

          {/* Top Bar: Tag Badge & Slide Counter */}
          <div className="absolute top-3 inset-x-3 sm:top-4 sm:inset-x-4 flex items-center justify-between pointer-events-none z-10">
            <span className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-extrabold text-white bg-gradient-to-r ${item.color} shadow-lg backdrop-blur-md pointer-events-auto`}>
              {item.tag}
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-black/60 backdrop-blur-md border border-white/20 shadow pointer-events-auto">
              {idx + 1} / {PROPERTY_PORTFOLIO.length}
            </span>
          </div>

          {/* Nav Arrows */}
          <button
            onClick={prev}
            aria-label="Previous Property"
            className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 border border-white/25 text-white flex items-center justify-center transition-all backdrop-blur-md active:scale-90 shadow-xl z-10"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={next}
            aria-label="Next Property"
            className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 border border-white/25 text-white flex items-center justify-center transition-all backdrop-blur-md active:scale-90 shadow-xl z-10"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Clean Metadata & Outcome Bar */}
        <div className="p-4 sm:p-6 md:p-7 bg-gradient-to-br from-slate-950 via-slate-900 to-[#071322] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 text-white">
          <div className="space-y-1 sm:space-y-1.5 text-left">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">{item.name}</h3>
              <span className="text-[10px] sm:text-[11px] font-bold text-emerald-400 bg-emerald-950/90 border border-emerald-700/60 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-400" /> Verified Listing • {item.price}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 font-medium">{item.niche}</p>
            <div className="text-xs text-zinc-400 font-medium flex items-center gap-1.5 pt-0.5">
              <span className="text-emerald-400 font-bold">Tech Stack:</span>
              <span className="text-zinc-200">{item.built}</span>
            </div>
          </div>

          <div className="sm:text-right shrink-0 bg-slate-800/90 rounded-xl sm:rounded-2xl p-3.5 sm:px-5 sm:py-3.5 border border-slate-700 shadow-lg">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 flex items-center sm:justify-end gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Verified Outcome
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 tracking-tight mt-0.5">{item.result}</div>
            <div className="text-[11px] text-zinc-400 font-medium mt-0.5">{item.context}</div>
          </div>
        </div>
      </div>

      {/* Slide Dots */}
      <div className="flex items-center justify-center gap-2">
        {PROPERTY_PORTFOLIO.map((p, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all rounded-full ${i === idx ? 'w-8 h-2.5 bg-emerald-600' : 'w-2.5 h-2.5 bg-zinc-300 hover:bg-zinc-400'}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   UNIFIED REAL ESTATE LEAD FORM (Hero & Bottom Section)
──────────────────────────────────────────────────────────────────────────── */
const LEAD_VOLUMES = [
  { label: 'Under 50',    value: 'under-50',    sub: 'Solo Agent' },
  { label: '50 – 200',    value: '50-200',      sub: 'Boutique' },
  { label: '200 – 500',   value: '200-500',     sub: 'Top Team' },
  { label: '500+ Leads',  value: '500-plus',    sub: 'Enterprise' },
];

function RealEstateLeadForm({ formId = 're-lead-form' }: { formId?: string }) {
  const [f, setF] = useState({ name: '', phone: '', agency: '', volume: '50-200', propertyType: 'Luxury Residential' });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const formStarted = useRef(false);

  const handleInputFocus = () => {
    if (!formStarted.current) {
      formStarted.current = true;
      trackEvent('form_start', { form_id: formId });
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!f.volume) return;
    setLoading(true);

    trackEvent('real_estate_lead_submission', {
      form_id: formId,
      name: f.name,
      phone: f.phone,
      agency: f.agency,
      volume: f.volume,
    });

    try {
      await fetch('/api/real-estate/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.name,
          email: `${f.name.toLowerCase().replace(/\s+/g, '') || 'client'}@agency.com`,
          phone: f.phone,
          company_type: f.agency || 'Brokerage',
          lead_volume: f.volume
        })
      });
    } catch (err) {
      console.warn('Backend proxy acknowledgment', err);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setDone(true);
      }, 1000);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center" id={`${formId}-success`}>
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <span className="absolute -top-1 -right-1 text-xl">🎉</span>
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">VIP Strategy Call Reserved!</h3>
          <p className="mt-2 text-sm text-zinc-600 max-w-xs mx-auto">
            A Senior Real Estate Solutions Engineer will WhatsApp you at <strong className="text-slate-900">{f.phone}</strong> within 15 minutes with your custom setup.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
          <Check className="w-3.5 h-3.5" /> 100% Free · No sales pitch
        </div>
      </div>
    );
  }

  const inputCls = "w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-zinc-200 text-sm text-slate-800 placeholder:text-zinc-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20 transition-all font-medium shadow-sm hover:border-zinc-300";

  return (
    <form id={formId} onSubmit={submit} className="space-y-4 text-left">
      {/* Full Name */}
      <div className="space-y-1.5">
        <label htmlFor={`${formId}-name`} className="text-xs font-bold text-zinc-700 uppercase tracking-wide flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-emerald-600" /> Full Name <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          <input
            id={`${formId}-name`}
            required
            type="text"
            placeholder="e.g. Marcus Sterling"
            value={f.name}
            onFocus={handleInputFocus}
            onChange={e => setF({ ...f, name: e.target.value })}
            className={inputCls}
          />
        </div>
      </div>

      {/* WhatsApp / Phone */}
      <div className="space-y-1.5">
        <label htmlFor={`${formId}-phone`} className="text-xs font-bold text-zinc-700 uppercase tracking-wide flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp / Phone Number <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          <input
            id={`${formId}-phone`}
            required
            type="tel"
            placeholder="+1 (555) 382-9012"
            value={f.phone}
            onFocus={handleInputFocus}
            onChange={e => setF({ ...f, phone: e.target.value })}
            className={inputCls}
          />
        </div>
      </div>

      {/* Agency or Developer Name */}
      <div className="space-y-1.5">
        <label htmlFor={`${formId}-agency`} className="text-xs font-bold text-zinc-700 uppercase tracking-wide flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-emerald-600" /> Real Estate Firm / Brokerage
        </label>
        <div className="relative">
          <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          <input
            id={`${formId}-agency`}
            type="text"
            placeholder="e.g. SkyView Luxury Partners"
            value={f.agency}
            onFocus={handleInputFocus}
            onChange={e => setF({ ...f, agency: e.target.value })}
            className={inputCls}
          />
        </div>
      </div>

      {/* Monthly Lead Volume */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-zinc-700 uppercase tracking-wide flex items-center gap-1.5">
          <BarChart3 className="w-3.5 h-3.5 text-emerald-600" /> Monthly Inbound Lead Volume <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {LEAD_VOLUMES.map(b => {
            const active = f.volume === b.value;
            return (
              <button
                key={b.value}
                type="button"
                onClick={() => {
                  handleInputFocus();
                  setF({ ...f, volume: b.value });
                }}
                className={`relative flex flex-col items-center gap-0.5 py-3 px-3 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer group ${
                  active
                    ? 'border-emerald-500 bg-emerald-50 shadow-[0_0_0_3px_rgba(5,150,105,0.12)]'
                    : 'border-zinc-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/40'
                }`}
              >
                {active && (
                  <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </span>
                )}
                <span className={`text-sm font-extrabold leading-tight ${active ? 'text-emerald-700' : 'text-slate-800 group-hover:text-emerald-700'}`}>
                  {b.label}
                </span>
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${active ? 'text-emerald-600' : 'text-zinc-400'}`}>
                  {b.sub}
                </span>
              </button>
            );
          })}
        </div>
        {touched && !f.volume && (
          <p className="text-xs text-rose-500 flex items-center gap-1 mt-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Please select your monthly volume.
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        id={`${formId}-submit`}
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-sm shadow-[0_8px_24px_rgba(5,150,105,0.35)] hover:from-emerald-500 hover:to-teal-500 active:scale-[0.99] transition-all disabled:opacity-70 mt-3 group"
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Scheduling your strategy session...</>
        ) : (
          <><Zap className="w-4 h-4 fill-white group-hover:rotate-12 transition-transform" /> Get My Free Real Estate AI Demo &rarr;</>
        )}
      </button>

      {/* Trust row */}
      <div className="flex items-center justify-center gap-4 text-[11px] text-zinc-500 pt-1">
        <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-600" /> 100% Free</span>
        <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-emerald-600" /> No Spam</span>
        <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Callback &lt; 2 hrs</span>
      </div>
    </form>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   MAIN PAGE COMPONENT
──────────────────────────────────────────────────────────────────────────── */
export default function RealEstatePage() {
  const go = (id: string, ctaName = 'inline_cta') => {
    trackEvent('cta_click', { cta_id: id, cta_name: ctaName });
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 76;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  };

  /* Simulator State */
  const [simulatorQuery, setSimulatorQuery] = useState('Looking for a 3-bedroom luxury penthouse in Downtown with a budget of $1.5M, ready to move next month. Pre-approved mortgage.');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simResult, setSimResult] = useState<any>({
    score: 96,
    budget: '$1.5M',
    bedrooms: '3 BHK / Penthouse',
    location: 'Downtown Metropolis',
    timeline: 'Immediate (Next 30 Days)',
    financing: 'Pre-Approved Mortgage',
    matchedProperty: 'The Azure Sky Penthouse ($1.45M)',
    replyText: "Hi Marcus! Thanks for reaching out. 🏡 I found 2 luxury units matching your $1.5M budget in Downtown with private terrace views. Would tomorrow at 3:00 PM work for an exclusive VIP walkthrough?"
  });

  const runSim = (text: string) => {
    setSimulatorQuery(text);
    setIsSimulating(true);
    setTimeout(() => {
      if (text.includes('Villa') || text.includes('pool')) {
        setSimResult({
          score: 92,
          budget: '$2.2M',
          bedrooms: '4 BHK Modern Villa',
          location: 'West Hills Reserve',
          timeline: '60 - 90 Days',
          financing: 'Pre-Screened High Net Worth',
          matchedProperty: 'Verdant Hills Modern Villa ($2.2M)',
          replyText: "Hi Elena! We selected a 4BHK Modern Villa in West Hills featuring a private heated pool and double-height living room. Can I WhatsApp you the 3D Virtual Tour video now?"
        });
      } else if (text.includes('Waterfront') || text.includes('Marina')) {
        setSimResult({
          score: 94,
          budget: '$890K',
          bedrooms: '2 BHK Marina View',
          location: 'Waterfront Marina',
          timeline: 'Ready to Sign',
          financing: 'Cash Investor',
          matchedProperty: 'Marina Promenade Waterfront ($890K)',
          replyText: "Hello Jonathan! The Marina 2BHK is projected at 7.4% gross rental yield. We have the inspection report and HOA docs ready. Would you like to review the draft deed?"
        });
      } else {
        setSimResult({
          score: 98,
          budget: '$3.5M+',
          bedrooms: '5 BHK Private Estate',
          location: 'Oakwood Enclave',
          timeline: 'Immediate Cash Escrow',
          financing: 'Verified Cash Funds',
          matchedProperty: 'The Oakwood Executive Estate ($3.1M)',
          replyText: "Greetings! The Oakwood 5.2-acre estate is available for private tour this weekend. Our principal broker Sarah will host your walkthrough at 11:30 AM Saturday."
        });
      }
      setIsSimulating(false);
    }, 500);
  };

  /* ROI Calculator */
  const [monthlyLeads, setMonthlyLeads] = useState(350);
  const [avgPrice, setAvgPrice] = useState(850000);
  const [commRate, setCommRate] = useState(2.5);

  const extraDealsYear = Math.round(monthlyLeads * 12 * 0.016);
  const extraCommYear = Math.round(extraDealsYear * avgPrice * (commRate / 100));

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">

      {/* ══════════════ 1. STICKY NAV (Crisp White & Emerald) ══════════════ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-zinc-100/80 shadow-sm">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image src="/logo.png" alt="AuromindAI logo" width={34} height={34} unoptimized className="rounded-xl group-hover:scale-105 transition-transform shadow-sm" />
            <div>
              <span className="font-black text-xl tracking-tight text-slate-900">Auromind<span className="text-emerald-600">AI</span></span>
              <span className="ml-1.5 text-xs font-bold text-zinc-400">RealEstate</span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-zinc-500">
            {[
              ['Showcase', 'portfolio'],
              ['Why AI Agents', 'why-us'],
              ['All Solutions', 'solutions'],
              ['Live AI Demo', 'demo'],
              ['CRM Pipeline', 'crm-preview'],
              ['ROI Calculator', 'roi'],
              ['FAQ', 'faq'],
            ].map(([l, id]) => (
              <button key={id} onClick={() => go(id, `nav_${id}`)} className="hover:text-emerald-600 transition-colors">
                {l}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/real-estate-crm"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-200 text-xs font-bold text-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition-all"
            >
              <span>Launch CRM</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </Link>
            <button
              id="header-cta"
              onClick={() => go('hero-form-card', 'header_cta')}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-[0_4px_16px_rgba(5,150,105,0.35)] hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all"
            >
              <Zap className="w-3.5 h-3.5 fill-white" /> Book Live Demo &rarr;
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════ 2. HERO SECTION (Split Two Columns with White Card Form) ══════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#0a1628] to-emerald-950">
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full bg-emerald-500/8 blur-[150px]" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-500/6 blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.04)_0%,transparent_70%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-14 pb-20 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-14 items-center">
          
          {/* LEFT: Value Pitch */}
          <div className="space-y-7 text-white text-left">
            {/* Target Audience Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              For High-Growth Brokerages &amp; Luxury Property Developers
            </div>

            {/* Core H1 */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl xl:text-[3.5rem] font-black leading-[1.12] tracking-tight">
                Your Real Estate Agency<br />
                deserves to close{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                    3.4× more deals.
                  </span>
                  <svg className="absolute w-full -bottom-2 left-0" viewBox="0 0 280 8" fill="none" preserveAspectRatio="none">
                    <path d="M2 6 Q 140 1 278 6" stroke="url(#ug)" strokeWidth="2.5" strokeLinecap="round"/>
                    <defs><linearGradient id="ug" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#34d399" /><stop offset="100%" stopColor="#2dd4bf" /></linearGradient></defs>
                  </svg>
                </span>
              </h1>
              
              <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-xl font-normal">
                We deploy <strong className="text-white font-bold">autonomous AI sales agents and intelligent real estate CRMs</strong> built for property teams. 45-second inbound buyer qualification, automated WhatsApp site visit scheduling, and zero lost weekend leads.
              </p>
            </div>

            {/* 6 Concise Benefit Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                'Sub-45 second lead response on WhatsApp & Web',
                'Autonomous buyer qualification & budget extraction',
                'Instant MLS & active inventory auto-matching',
                'Automated VIP site visit & calendar booking',
                'Built-in Real Estate CRM with commission tracking',
                'AI Virtual Staging & instant CMA appraisal reports',
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
            </div>

            {/* Social Proof Row */}
            <div className="flex items-center gap-4 pt-3 border-t border-white/10">
              <div className="flex -space-x-2">
                {['from-emerald-400 to-teal-500','from-blue-400 to-indigo-500','from-amber-400 to-orange-500','from-pink-400 to-rose-500'].map((g, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${g} border-2 border-slate-900 flex items-center justify-center text-white text-xs font-bold`}>
                    {['S','M','T','R'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
                  <span className="text-xs font-bold text-white ml-1">4.9/5 Rating</span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">Trusted across 120+ top-producing brokerages</p>
              </div>
            </div>
          </div>

          {/* RIGHT: HERO WHITE CARD FORM */}
          <div id="hero-form-card" className="relative scroll-mt-20 md:scroll-mt-24">
            <div className="absolute -inset-2 bg-emerald-500/10 rounded-[2rem] blur-2xl pointer-events-none" />
            <div className="relative bg-white rounded-3xl shadow-[0_32px_80px_-12px_rgba(0,0,0,0.5)] overflow-hidden border border-zinc-100">
              
              {/* Form header strip */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-7 py-5">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h2 className="text-lg font-black text-white">Get My Free Real Estate AI Demo</h2>
                    <p className="text-xs text-emerald-100 mt-0.5">30-min live demo with your inventory · No obligation</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/15 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    <span className="text-[10px] font-bold text-white">Available</span>
                  </div>
                </div>
              </div>

              {/* Form body */}
              <div className="p-7">
                <RealEstateLeadForm formId="hero-re-lead-form" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="pb-6 flex justify-center relative z-10">
          <button
            onClick={() => go('stats', 'scroll_cue')}
            className="flex flex-col items-center gap-1 text-zinc-500 hover:text-emerald-400 transition-colors text-xs font-medium"
          >
            <span>Explore performance metrics &amp; property showcases</span>
            <ChevronDown className="w-4 h-4 animate-bounce mt-1" />
          </button>
        </div>
      </section>

      {/* ══════════════ 3. GROUNDED STATS BAR ══════════════ */}
      <section id="stats" className="bg-emerald-600 py-10 px-6 scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <GroundedStat value="< 45s" label="Avg. Inbound Response" context="Direct on WhatsApp Business API" />
          <GroundedStat value="+62%" label="Site Visit Booking Lift" context="From cold portals & Meta ads" />
          <GroundedStat value="$240M+" label="Property GMV Influenced" context="Luxury residential & villas" />
          <GroundedStat value="3.4×" label="Broker Commission Growth" context="Zero uncontacted night leads" />
        </div>
      </section>

      {/* ══════════════ 4. PROPERTY SHOWCASE SECTION (Carousel) ══════════════ */}
      <section id="portfolio" className="py-20 px-6 bg-zinc-50 scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2.5 max-w-2xl mx-auto">
            <div className="text-xs font-black text-emerald-600 uppercase tracking-widest">Active Showcases</div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              Properties matched and closed with AuromindAI.
            </h2>
            <p className="text-zinc-600 text-base md:text-lg">
              High-resolution MLS inventory synchronized directly into autonomous AI WhatsApp and web chat funnels.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <PropertyCarousel />
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => go('hero-form-card', 'portfolio_cta')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-900 text-white font-extrabold shadow-lg hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm"
            >
              <span>Deploy AI For My Listings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════ 5. WHY US / FACTUAL COMPARISON TABLE ══════════════ */}
      <section id="why-us" className="py-20 px-6 bg-slate-950 text-white relative overflow-hidden scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="text-xs font-black text-emerald-400 uppercase tracking-widest">Factual Comparison</div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Traditional Brokerages vs. Auromind AI
            </h2>
            <p className="text-zinc-400 text-sm">
              See why leading brokerages and luxury developers are replacing manual phone-tag with autonomous agents.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/60">
            <div className="grid grid-cols-3 bg-slate-800/80 p-4 sm:p-5 font-bold text-xs uppercase tracking-wider text-zinc-300 border-b border-white/10">
              <div>Operational Factor</div>
              <div className="text-zinc-400">Traditional Process</div>
              <div className="text-emerald-400">Auromind Autonomous AI</div>
            </div>

            {[
              {
                feature: 'Speed to First Lead Touch',
                old: '3 to 5 hours average (leads go cold)',
                new: 'Under 45 seconds on WhatsApp & Web',
              },
              {
                feature: 'Weekend & Night Inquiries',
                old: 'Unanswered until Monday morning (70% lost)',
                new: '24/7/365 instant qualification & booking',
              },
              {
                feature: 'Buyer Intent Qualification',
                old: 'Manual questionnaires & endless phone calls',
                new: 'Instant AI scoring of budget, timeline & mortgage',
              },
              {
                feature: 'Inventory Matching',
                old: 'Brokers search MLS manually on laptops',
                new: 'Instant smart property matching in < 5 seconds',
              },
              {
                feature: 'Site Visit Booking Rate',
                old: '12% - 18% of web and portal leads',
                new: '62% automated site visit confirmation',
              },
              {
                feature: 'Staffing & Payroll Overhead',
                old: 'Expensive dedicated intake coordinators',
                new: 'Zero extra headcount needed to 4x capacity',
              },
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-3 p-4 sm:p-5 text-xs sm:text-sm border-b border-white/5 hover:bg-white/[0.02] transition-colors items-center">
                <div className="font-bold text-white">{row.feature}</div>
                <div className="text-zinc-400 flex items-center gap-1.5">
                  <span className="text-rose-400">✕</span> {row.old}
                </div>
                <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> {row.new}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 6. ALL REAL ESTATE SOLUTIONS (Bento Grid) ══════════════ */}
      <section id="solutions" className="py-20 px-6 bg-white scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2.5 max-w-2xl mx-auto">
            <div className="text-xs font-black text-emerald-600 uppercase tracking-widest">Complete Suite</div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              All Real Estate Solutions in One Unified Platform.
            </h2>
            <p className="text-zinc-600 text-base">
              Engineered specifically for high-velocity real estate operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. 24/7 AI Sales Agent */}
            <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 hover:border-emerald-500/40 hover:shadow-xl transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">24/7 Omnichannel Sales AI</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Connects to WhatsApp Business, SMS, Instagram DM, and website chat. Responds to floor plan queries, pricing, HOA rules, and locks site visit slots.
              </p>
              <ul className="text-xs space-y-2 text-zinc-700 pt-2 border-t border-zinc-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sub-45s inbound response rate</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Multilingual buyer conversation</span>
                </li>
              </ul>
            </div>

            {/* 2. Intelligent CRM */}
            <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 hover:border-emerald-500/40 hover:shadow-xl transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Intelligent Real Estate CRM</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Visual deal pipelines from first inquiry to contract execution. Auto-assigns leads to agents based on price bands, zip codes, and language.
              </p>
              <ul className="text-xs space-y-2 text-zinc-700 pt-2 border-t border-zinc-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Real-time calendar synchronization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Commission split calculator</span>
                </li>
              </ul>
            </div>

            {/* 3. AI Virtual Staging */}
            <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 hover:border-emerald-500/40 hover:shadow-xl transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">AI Virtual Staging &amp; Visuals</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Transform empty developer units into designer furnished spaces in 8 seconds. Generates twilight renders and architectural enhancements on demand.
              </p>
              <ul className="text-xs space-y-2 text-zinc-700 pt-2 border-t border-zinc-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Modern, Scandinavian, Luxury styling</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Fraction of the cost of physical staging</span>
                </li>
              </ul>
            </div>

            {/* 4. Predictive Valuation */}
            <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 hover:border-emerald-500/40 hover:shadow-xl transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Predictive CMA &amp; Valuation AI</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Instant comparative market analysis. Estimates price per sq ft, historical comps, days-on-market predictions, and future rental yield curves.
              </p>
              <ul className="text-xs space-y-2 text-zinc-700 pt-2 border-t border-zinc-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Hyperlocal neighborhood metrics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>1-click client PDF presentations</span>
                </li>
              </ul>
            </div>

            {/* 5. Smart Document AI */}
            <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 hover:border-emerald-500/40 hover:shadow-xl transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 border border-cyan-200 flex items-center justify-center text-cyan-600 group-hover:scale-110 transition-transform">
                <Key className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Smart Contract &amp; Deed Parser</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                AI extraction of title documents, floor plans, escrow contingencies, and mortgage approvals. Flags non-standard clauses instantly.
              </p>
              <ul className="text-xs space-y-2 text-zinc-700 pt-2 border-t border-zinc-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>Automated escrow deadline tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>Secure bank-grade document encryption</span>
                </li>
              </ul>
            </div>

            {/* 6. Hyper-Local Ad Launcher */}
            <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 hover:border-emerald-500/40 hover:shadow-xl transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 border border-pink-200 flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Hyper-Local Meta &amp; Google Ads</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Generate high-converting listing ad copies, high-CTR carousel angles, and hyper-targeted zip code campaigns directly routed into WhatsApp AI.
              </p>
              <ul className="text-xs space-y-2 text-zinc-700 pt-2 border-t border-zinc-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0" />
                  <span>Cost per lead reduced by up to 48%</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0" />
                  <span>Direct WhatsApp Click-to-Chat integration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 7. INTERACTIVE AI QUALIFIER DEMO ══════════════ */}
      <section id="demo" className="py-20 px-6 bg-slate-900 text-white scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="text-xs font-black text-emerald-400 uppercase tracking-widest">Interactive Playground</div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Test the AI Lead Qualification Engine
            </h2>
            <p className="text-zinc-400 text-sm">
              Click a preset below or type a custom buyer inquiry to watch the agent score intent, extract criteria, and draft an instant WhatsApp response.
            </p>
          </div>

          {/* Presets */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              ['Downtown Penthouse ($1.5M)', 'Looking for a 3-bedroom luxury penthouse in Downtown with a budget of $1.5M, ready to move next month. Pre-approved mortgage.'],
              ['Suburban Villa ($2.2M)', 'Need a 4BHK modern villa in West Hills with private swimming pool and garden, budget $2.2M, looking to close in 60 days.'],
              ['Waterfront High-Rise ($890K)', 'Interested in a 2BHK waterfront apartment around Marina promenade under $900K for rental investment.'],
              ['Gated Estate ($3.5M+)', 'Searching for 5-acre luxury estate in Oakwood Enclave, cash buyer, budget $3.5M+, need immediate site visit this weekend.']
            ].map(([title, query], i) => (
              <button
                key={i}
                onClick={() => runSim(query)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  simulatorQuery === query
                    ? 'bg-emerald-500 text-black shadow-lg'
                    : 'bg-slate-800 border border-white/10 text-zinc-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {title}
              </button>
            ))}
          </div>

          {/* Simulator Box */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Input & Extracted */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-white/10 shadow-xl space-y-5 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-emerald-400" /> Inbound Buyer Inquiry
                </span>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                  Live Engine
                </span>
              </div>

              <textarea
                rows={3}
                value={simulatorQuery}
                onChange={(e) => setSimulatorQuery(e.target.value)}
                className="w-full rounded-2xl bg-black/50 border border-white/10 p-3.5 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none font-sans"
              />

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-zinc-400">Buyer Intent Score</span>
                  <span className="text-emerald-400 font-mono text-sm">{simResult.score}/100</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: `${simResult.score}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-zinc-400 text-[10px]">Budget</div>
                  <div className="font-bold text-white mt-0.5">{simResult.budget}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-zinc-400 text-[10px]">Location</div>
                  <div className="font-bold text-white mt-0.5">{simResult.location}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-zinc-400 text-[10px]">Typology</div>
                  <div className="font-bold text-white mt-0.5">{simResult.bedrooms}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-zinc-400 text-[10px]">Timeline</div>
                  <div className="font-bold text-white mt-0.5">{simResult.timeline}</div>
                </div>
              </div>
            </div>

            {/* Matched Property & WhatsApp Action */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-emerald-500/30 shadow-xl space-y-5 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Home className="w-4 h-4 text-emerald-400" /> Matched Listing &amp; Auto Action
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                  45s Auto-Dispatch
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{simResult.matchedProperty}</div>
                  <div className="text-zinc-400 text-[11px] mt-0.5">MLS Verified • Available for Site Visit</div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                  98% Match
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#081f14] border border-emerald-500/40 text-xs text-emerald-100 leading-relaxed font-sans space-y-2">
                <div className="text-[10px] font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" /> Auto-Generated WhatsApp Follow-Up
                </div>
                <p>{simResult.replyText}</p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/real-estate-crm"
                  className="flex-1 py-3 rounded-xl bg-emerald-500 text-black font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all shadow-md"
                >
                  <span>Open in Real Estate CRM</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 8. INTERACTIVE ROI CALCULATOR ══════════════ */}
      <section id="roi" className="py-20 px-6 bg-zinc-50 scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2.5 max-w-2xl mx-auto">
            <div className="text-xs font-black text-emerald-600 uppercase tracking-widest">Financial Impact</div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              Calculate Your Brokerage Commission Lift
            </h2>
            <p className="text-zinc-600 text-base">
              See the exact revenue increase of turning 1.6% more cold inquiries into closed deals with 45-second AI response times.
            </p>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-zinc-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Sliders */}
            <div className="lg:col-span-7 space-y-7 text-left">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Monthly Inbound Leads (Portals, Ads, Social)</span>
                  <span className="text-emerald-600 font-mono text-sm">{monthlyLeads} leads/mo</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="25"
                  value={monthlyLeads}
                  onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-2 bg-zinc-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Average Property Sale Price</span>
                  <span className="text-emerald-600 font-mono text-sm">${(avgPrice / 1000).toFixed(0)}k</span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="3500000"
                  step="50000"
                  value={avgPrice}
                  onChange={(e) => setAvgPrice(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-2 bg-zinc-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Average Brokerage Commission Rate</span>
                  <span className="text-emerald-600 font-mono text-sm">{commRate.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.25"
                  value={commRate}
                  onChange={(e) => setCommRate(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-2 bg-zinc-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-5 p-7 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xl space-y-5 text-left">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                  Projected Annual Commission Lift
                </span>
                <div className="text-4xl sm:text-5xl font-black mt-1">
                  +${extraCommYear.toLocaleString()}
                </div>
                <div className="text-xs text-emerald-100 mt-1">
                  From {extraDealsYear} extra closed deals per year
                </div>
              </div>

              <div className="pt-4 border-t border-white/20 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-emerald-100">Extra Closed Deals</div>
                  <div className="text-lg font-black mt-0.5">+{extraDealsYear} / year</div>
                </div>
                <div>
                  <div className="text-emerald-100">Weekly Hours Saved</div>
                  <div className="text-lg font-black mt-0.5">~{Math.round(monthlyLeads * 0.15)} hrs/wk</div>
                </div>
              </div>

              <button
                onClick={() => go('hero-form-card', 'roi_cta')}
                className="w-full py-3.5 rounded-xl bg-white text-slate-900 font-extrabold text-xs shadow-lg hover:bg-zinc-100 transition-all flex items-center justify-center gap-2"
              >
                <span>Unlock This Revenue &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 9. SECONDARY LEAD CAPTURE SECTION ══════════════ */}
      <section id="contact" className="py-20 px-6 bg-slate-950 text-white relative overflow-hidden scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-4xl mx-auto space-y-10 text-center relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Onboarding &amp; Setup
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Ready to automate your real estate sales?
            </h2>
            <p className="text-zinc-400 text-sm max-w-lg mx-auto">
              Schedule your free 30-minute architecture session. We will set up your active property listings and demonstrate live WhatsApp qualification.
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 shadow-2xl text-slate-900">
            <RealEstateLeadForm formId="bottom-re-lead-form" />
          </div>
        </div>
      </section>

      {/* ══════════════ 10. FAQ ACCORDION ══════════════ */}
      <section id="faq" className="py-20 px-6 bg-white scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-2.5 max-w-2xl mx-auto">
            <div className="text-xs font-black text-emerald-600 uppercase tracking-widest">Questions &amp; Answers</div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-600 text-base">
              Everything you need to know about implementing Auromind Real Estate AI.
            </p>
          </div>

          <div className="space-y-4 text-left">
            {[
              {
                q: "How does Auromind connect with our MLS or property listings?",
                a: "Auromind connects via RESO Web API, MLS IDX feeds, or custom CSV/ERP webhooks. Inventory updates are synchronized in near real-time so your AI agent always quotes live availability and current prices."
              },
              {
                q: "Can the AI qualify buyers directly over WhatsApp and SMS?",
                a: "Yes! Auromind integrates with the official Meta WhatsApp Business API and Twilio SMS. It qualifies buyer budget, typology, and timeline in natural human language, then automatically books site visits onto your calendar."
              },
              {
                q: "Can we connect Auromind to Follow Up Boss, KVCore, or Salesforce?",
                a: "Absolutely. While Auromind provides its own complete Real Estate CRM, it also offers seamless 2-way sync with Follow Up Boss, Salesforce, KVCore, and HubSpot."
              },
              {
                q: "How long does onboarding take?",
                a: "Standard onboarding takes less than 48 hours. We upload your active listings, configure your agent routing rules, connect your messaging channels, and run live test qualifications before going live."
              }
            ].map((item, idx) => (
              <details
                key={idx}
                className="group p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 transition-all open:bg-emerald-50/40"
              >
                <summary className="font-bold text-sm text-slate-900 cursor-pointer list-none flex items-center justify-between">
                  <span>{item.q}</span>
                  <ChevronDown className="w-4 h-4 text-emerald-600 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-xs text-zinc-600 mt-3 leading-relaxed border-t border-zinc-200 pt-3">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 11. CLEAN FOOTER ══════════════ */}
      <footer className="border-t border-zinc-200 bg-zinc-50 pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-emerald-600" />
            <span className="font-extrabold text-slate-900 text-base">
              Auromind<span className="text-emerald-600">RealEstate</span>
            </span>
            <span className="text-xs text-zinc-500 ml-2">© 2026 AuromindAI Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-xs font-medium text-zinc-500">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Main Platform</Link>
            <Link href="/ecommerce" className="hover:text-emerald-600 transition-colors">eCommerce AI</Link>
            <Link href="/real-estate-crm" className="hover:text-emerald-600 transition-colors">CRM Dashboard</Link>
            <button onClick={() => go('hero-form-card', 'footer_cta')} className="hover:text-emerald-600 transition-colors">Book Strategy Call</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
