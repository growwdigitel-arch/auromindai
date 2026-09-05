'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Zap, ShoppingBag, TrendingUp, Star, CheckCircle2, ArrowRight,
  Smartphone, Gauge, CreditCard, BarChart3, Bot, Sparkles,
  Mail, Phone, Building2, MessageSquare, Shield, Send,
  Loader2, Users, Package, Headphones, ChevronDown,
  Lock, Repeat2, ChevronLeft, ChevronRight,
  XCircle, Cpu, Flame, Check
} from 'lucide-react';

/* ────────────────────────────────────────────────────────────────────────────
   ANALYTICS & CONVERSION TRACKING HELPER
──────────────────────────────────────────────────────────────────────────── */
function trackEvent(eventName: string, data?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  try {
    // Custom DOM event for any global listeners
    window.dispatchEvent(new CustomEvent('analytics_event', { detail: { event: eventName, ...data } }));
    // Google Tag Manager / GA4 dataLayer
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: eventName, ...data });
    // Google Analytics (gtag.js)
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', eventName, data);
    }
    // Meta Pixel if loaded on the page
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('trackCustom', eventName, data);
    }
  } catch (err) {
    console.debug('Tracking event:', eventName, data);
  }
}

/* ────────────────────────────────────────────────────────────────────────────
   UTILITIES
──────────────────────────────────────────────────────────────────────────── */
const go = (id: string, ctaName = 'inline_cta') => {
  trackEvent('cta_click', { cta_id: id, cta_name: ctaName });
  if (typeof window === 'undefined') return;

  let targetId = id;
  // If user clicked a CTA to convert (not just browsing nav items),
  // on mobile screen, scroll directly to the form card so they don't have to scroll past 650px of intro text!
  if (id === 'contact' && !ctaName.startsWith('nav_')) {
    if (window.innerWidth < 768) {
      const contactCard = document.getElementById('contact-form-card');
      if (contactCard) {
        targetId = 'contact-form-card';
      }
    }
  }

  const el = document.getElementById(targetId) || document.getElementById(id);
  if (!el) return;

  const headerOffset = 76; // 64px sticky header + 12px breathing space
  const elementPosition = el.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });

  // Smoothly focus first input
  setTimeout(() => {
    const input = el.querySelector<HTMLInputElement>('input:not([type="hidden"])');
    if (input && (targetId.includes('form') || targetId === 'contact')) {
      input.focus({ preventScroll: true });
    }
  }, 450);
};

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVis(true);
        obs.disconnect();
      }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
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
   PORTFOLIO DATA (Verified & Grounded)
──────────────────────────────────────────────────────────────────────────── */
const PORTFOLIO = [
  {
    img: '/ec-portfolio-fashion.jpg',
    name: 'Aurelia Fashion',
    niche: 'Luxury Apparel & D2C Fashion',
    built: 'Custom Next.js Storefront + AI Lookbook',
    result: '+48% Mobile Conversion Lift',
    context: 'Over 90-day post-launch window',
    tag: 'Custom Fashion Store',
    color: 'from-emerald-600 to-teal-700'
  },
  {
    img: '/ec-portfolio-electronics.jpg',
    name: 'TechNova Store',
    niche: 'Consumer Electronics & Gadgets',
    built: 'High-Speed Landing Funnel + 1-Tap UPI',
    result: '3.4× Google Ads ROAS',
    context: '60-day campaign scaling window',
    tag: 'High-Speed Tech Store',
    color: 'from-blue-600 to-cyan-700'
  },
  {
    img: '/ec-portfolio-food.jpg',
    name: "Nature's Harvest",
    niche: 'Organic Grocery & Wellness',
    built: 'Instant Search & Smart Bundle Upsells',
    result: '2,400+ Monthly Orders',
    context: 'Zero plugin crashes during peak sales',
    tag: 'Fast D2C Commerce',
    color: 'from-amber-600 to-orange-600'
  },
  {
    img: '/ec-portfolio-beauty.jpg',
    name: 'Aura Beauty',
    niche: 'Skincare & Cosmetics',
    built: 'Mobile-First PWA + Personalized AI Finder',
    result: '+52% Repeat Purchase Rate',
    context: 'Measured across customer cohorts',
    tag: 'Mobile-First PWA',
    color: 'from-pink-600 to-rose-600'
  },
];

/* ────────────────────────────────────────────────────────────────────────────
   UNIFIED LEAD FORM
──────────────────────────────────────────────────────────────────────────── */
const BUDGETS = [
  { label: 'Under ₹10k',  value: 'under-10k',  sub: 'Starter' },
  { label: '₹10k – ₹25k', value: '10k-25k',    sub: 'Growth' },
  { label: '₹25k – ₹50k', value: '25k-50k',    sub: 'Pro' },
  { label: '₹50k+',       value: '50k-plus',   sub: 'Custom Scale' },
];

function LeadForm({ formId = 'lead-form' }: { formId?: string }) {
  const [f, setF] = useState({ name: '', phone: '', business: '', budget: '' });
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
    if (!f.budget) return;
    setLoading(true);

    trackEvent('lead_submission', {
      form_id: formId,
      name: f.name,
      phone: f.phone,
      business: f.business,
      budget: f.budget,
    });

    try {
      await fetch('/api/ecommerce/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.name,
          phone: f.phone,
          business: f.business,
          budget: BUDGETS.find(b => b.value === f.budget)?.label || f.budget,
          source: formId
        })
      });
    } catch (err) {
      console.warn('API lead submission fallback', err);
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
          <h3 className="text-xl font-extrabold text-slate-900">Strategy Call Requested!</h3>
          <p className="mt-2 text-sm text-zinc-600 max-w-xs mx-auto">
            An eCommerce strategist will WhatsApp you at <strong className="text-slate-900">{f.phone}</strong> within 2 hours to confirm your 30-minute session.
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
    <form id={formId} onSubmit={submit} className="space-y-4">
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
            placeholder="e.g. Rohan Mehta"
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
            placeholder="+91 76959 51519"
            value={f.phone}
            onFocus={handleInputFocus}
            onChange={e => setF({ ...f, phone: e.target.value })}
            className={inputCls}
          />
        </div>
      </div>

      {/* Business / Store Name */}
      <div className="space-y-1.5">
        <label htmlFor={`${formId}-business`} className="text-xs font-bold text-zinc-700 uppercase tracking-wide flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-emerald-600" /> Business or Store Name
        </label>
        <div className="relative">
          <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          <input
            id={`${formId}-business`}
            type="text"
            placeholder="e.g. StyleVault India (or website URL)"
            value={f.business}
            onFocus={handleInputFocus}
            onChange={e => setF({ ...f, business: e.target.value })}
            className={inputCls}
          />
        </div>
      </div>

      {/* Budget */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-zinc-700 uppercase tracking-wide flex items-center gap-1.5">
          <BarChart3 className="w-3.5 h-3.5 text-emerald-600" /> What is your estimated budget? <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {BUDGETS.map(b => {
            const active = f.budget === b.value;
            return (
              <button
                key={b.value}
                type="button"
                onClick={() => {
                  handleInputFocus();
                  setF({ ...f, budget: b.value });
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
        {touched && !f.budget && (
          <p className="text-xs text-rose-500 flex items-center gap-1 mt-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Please select a budget range.
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
          <><Loader2 className="w-4 h-4 animate-spin" /> Confirming your session...</>
        ) : (
          <><Zap className="w-4 h-4 fill-white group-hover:rotate-12 transition-transform" /> Get My Free Strategy Call &rarr;</>
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
   PORTFOLIO CAROUSEL (Responsive, Touch-Enabled, Non-Collapsing on Mobile)
──────────────────────────────────────────────────────────────────────────── */
function PortfolioCarousel() {
  const [idx, setIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setIdx(i => (i - 1 + PORTFOLIO.length) % PORTFOLIO.length);
  const next = () => setIdx(i => (i + 1) % PORTFOLIO.length);
  const item = PORTFOLIO[idx];

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
      {/* Active Project Card */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="rounded-3xl overflow-hidden shadow-2xl border border-zinc-200/80 bg-slate-950 select-none transition-all duration-300"
      >
        {/* Visual Showcase Container (Screenshot - Clean, 100% visible) */}
        <div className="relative aspect-[16/10] sm:aspect-video md:aspect-[16/9] w-full overflow-hidden bg-slate-900 group">
          <Image
            src={item.img}
            alt={`${item.name} - ${item.niche}`}
            fill
            sizes="(max-width: 768px) 100vw, 960px"
            className="object-cover transition-all duration-700 group-hover:scale-105"
            priority
          />
          {/* Subtle gradient for pill contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

          {/* Top Bar: Tag Badge & Slide Counter */}
          <div className="absolute top-3 inset-x-3 sm:top-4 sm:inset-x-4 flex items-center justify-between pointer-events-none z-10">
            <span className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-extrabold text-white bg-gradient-to-r ${item.color} shadow-lg backdrop-blur-md pointer-events-auto`}>
              {item.tag}
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-black/60 backdrop-blur-md border border-white/20 shadow pointer-events-auto">
              {idx + 1} / {PORTFOLIO.length}
            </span>
          </div>

          {/* Nav Arrows */}
          <button
            onClick={prev}
            aria-label="Previous Project"
            className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 border border-white/25 text-white flex items-center justify-center transition-all backdrop-blur-md active:scale-90 shadow-xl z-10"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={next}
            aria-label="Next Project"
            className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 border border-white/25 text-white flex items-center justify-center transition-all backdrop-blur-md active:scale-90 shadow-xl z-10"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Clean Metadata & Verified Outcome Bar (Directly below image - NEVER overlapping!) */}
        <div className="p-4 sm:p-6 md:p-7 bg-gradient-to-br from-slate-950 via-slate-900 to-[#071322] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 text-white">
          <div className="space-y-1 sm:space-y-1.5 text-left">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">{item.name}</h3>
              <span className="text-[10px] sm:text-[11px] font-bold text-emerald-400 bg-emerald-950/90 border border-emerald-700/60 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-400" /> Live Custom Store
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 font-medium">{item.niche}</p>
            <div className="text-xs text-zinc-400 font-medium flex items-center gap-1.5 pt-0.5">
              <span className="text-emerald-400 font-bold">Scope:</span>
              <span className="text-zinc-200">{item.built}</span>
            </div>
          </div>

          {/* Verified Outcome Card */}
          <div className="sm:text-right shrink-0 bg-slate-800/90 rounded-xl sm:rounded-2xl p-3.5 sm:px-5 sm:py-3.5 border border-slate-700 shadow-lg">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 flex items-center sm:justify-end gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Verified Outcome
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 tracking-tight mt-0.5">{item.result}</div>
            <div className="text-[11px] text-zinc-400 font-medium mt-0.5">{item.context}</div>
          </div>
        </div>
      </div>

      {/* Slide Dots Indicator */}
      <div className="flex items-center justify-center gap-2">
        {PORTFOLIO.map((p, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`View ${p.name}`}
            className={`rounded-full transition-all duration-300 ${
              i === idx ? 'w-8 h-2.5 bg-emerald-600 shadow-sm' : 'w-2.5 h-2.5 bg-zinc-300 hover:bg-zinc-400'
            }`}
          />
        ))}
      </div>

      {/* Interactive Clickable Thumbnail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-1">
        {PORTFOLIO.map((p, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Select ${p.name}`}
            className={`text-left group relative rounded-2xl overflow-hidden aspect-video transition-all duration-300 focus:outline-none ${
              i === idx
                ? 'ring-2 ring-emerald-500 scale-[1.02] shadow-lg shadow-emerald-500/15'
                : 'ring-1 ring-zinc-200 opacity-60 hover:opacity-100 hover:ring-zinc-300'
            }`}
          >
            <Image src={p.img} alt={`${p.name} thumbnail`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3">
              <div className="text-xs font-bold text-white truncate">{p.name}</div>
              <div className="text-[10px] text-emerald-300 font-semibold truncate">{p.result}</div>
            </div>
            {i === idx && (
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-600/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full backdrop-blur-sm shadow">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Active
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════════════════════════ */
export default function EcommerceAdPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased text-slate-900 selection:bg-emerald-100 pb-24 md:pb-0 overflow-x-hidden">

      {/* ══════════════ STICKY NAV ══════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-zinc-100/80 shadow-sm">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
          {/* Brand */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group"
            aria-label="AuromindAI Commerce Home"
          >
            <Image src="/logo.png" alt="AuromindAI logo" width={32} height={32} unoptimized className="rounded-xl group-hover:scale-105 transition-transform" />
            <div>
              <span className="font-black text-xl tracking-tight">Auromind<span className="text-emerald-600">AI</span></span>
              <span className="ml-1.5 text-xs font-bold text-zinc-400">Commerce</span>
            </div>
          </button>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-zinc-500">
            {[
              ['Our Work', 'portfolio'],
              ['Why Custom', 'why-custom'],
              ['Features', 'features'],
              ['Results', 'results'],
              ['How It Works', 'process'],
              ['Reviews', 'reviews'],
              ['Contact', 'contact']
            ].map(([l, id]) => (
              <button key={id} onClick={() => go(id, `nav_${id}`)} className="hover:text-emerald-600 transition-colors">
                {l}
              </button>
            ))}
          </nav>

          {/* Desktop Header CTA */}
          <button
            id="header-cta"
            onClick={() => go('contact', 'header_cta')}
            className="hidden md:flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-[0_4px_16px_rgba(5,150,105,0.35)] hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all"
          >
            <Zap className="w-3.5 h-3.5 fill-white" /> Get My Free Strategy Call &rarr;
          </button>
        </div>
      </header>

      {/* ══════════════ HERO SECTION ═════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#0a1628] to-emerald-950">
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full bg-emerald-500/8 blur-[150px]" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-500/6 blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.04)_0%,transparent_70%)]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'linear-gradient(rgba(255,255,255,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px)',backgroundSize:'60px 60px'}} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-14 pb-20 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-14 items-center">
          
          {/* LEFT: 5-Second Clarity Pitch */}
          <div className="space-y-7 text-white">
            {/* Target Audience Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              For High-Growth D2C Brands Running Google &amp; Meta Ads
            </div>

            {/* Core H1 */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl xl:text-[3.5rem] font-black leading-[1.12] tracking-tight">
                Your eCommerce store<br />
                deserves to sell{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                    3× more.
                  </span>
                  <svg className="absolute w-full -bottom-2 left-0" viewBox="0 0 280 8" fill="none" preserveAspectRatio="none">
                    <path d="M2 6 Q 140 1 278 6" stroke="url(#ug)" strokeWidth="2.5" strokeLinecap="round"/>
                    <defs><linearGradient id="ug" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#34d399" /><stop offset="100%" stopColor="#2dd4bf" /></linearGradient></defs>
                  </svg>
                </span>
              </h1>
              
              {/* Shorter, Benefit-Focused 5-Second Value Prop */}
              <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-xl font-normal">
                We engineer <strong className="text-white font-bold">custom high-performance eCommerce storefronts</strong> built for ad traffic. Sub-second speed, zero monthly plugin taxes, and native AI recommendations that turn paid clicks into revenue.
              </p>
            </div>

            {/* 6 Concise Benefit Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                'Sub-0.5s speed tested on Google PageSpeed',
                'Native AI recommendations & smart bundles',
                '1-Tap mobile UPI & frictionless checkout',
                '100% custom code — zero monthly app taxes',
                'Server-side Meta Pixel & Google Ads tracking',
                'Production-ready launch in 2–3 weeks',
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
            </div>

            {/* Grounded Social Proof */}
            <div className="flex items-center gap-4 pt-3 border-t border-white/10">
              <div className="flex -space-x-2">
                {['from-emerald-400 to-teal-500','from-blue-400 to-indigo-500','from-amber-400 to-orange-500','from-pink-400 to-rose-500'].map((g, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${g} border-2 border-slate-900 flex items-center justify-center text-white text-xs font-bold`}>
                    {['R','P','A','S'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
                  <span className="text-xs font-bold text-white ml-1">4.9/5 Rating</span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">Based on client post-launch benchmarks</p>
              </div>
            </div>
          </div>

          {/* RIGHT: HERO FORM CARD */}
          <div id="hero-form-card" className="relative scroll-mt-20 md:scroll-mt-24">
            <div className="absolute -inset-2 bg-emerald-500/10 rounded-[2rem] blur-2xl pointer-events-none" />
            <div className="relative bg-white rounded-3xl shadow-[0_32px_80px_-12px_rgba(0,0,0,0.5)] overflow-hidden border border-zinc-100">
              
              {/* Form header strip */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-7 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-black text-white">Get My Free Strategy Call</h2>
                    <p className="text-xs text-emerald-100 mt-0.5">30-min expert consultation · No obligation</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/15 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    <span className="text-[10px] font-bold text-white">Available</span>
                  </div>
                </div>
              </div>

              {/* Form body */}
              <div className="p-7">
                <LeadForm formId="hero-lead-form" />
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
            <span>Explore our performance benchmarks</span>
            <ChevronDown className="w-4 h-4 animate-bounce mt-1" />
          </button>
        </div>
      </section>

      {/* ══════════════ STATS BAR (Grounded Metrics) ════════════════════════ */}
      <section id="stats" className="bg-emerald-600 py-10 px-6 scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <GroundedStat value="< 0.8s" label="Avg. Page Load Time" context="Tested on Google PageSpeed" />
          <GroundedStat value="+48%" label="Avg. Conversion Lift" context="Post-launch client benchmark" />
          <GroundedStat value="₹0" label="Monthly App Taxes" context="Custom native feature stack" />
          <GroundedStat value="99.9%" label="Edge Cloud Uptime" context="Enterprise hosting SLA" />
        </div>
      </section>

      {/* ══════════════ PORTFOLIO SECTION ═══════════════════════════════════ */}
      <section id="portfolio" className="py-20 px-6 bg-zinc-50 scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2.5 max-w-2xl mx-auto">
            <div className="text-xs font-black text-emerald-600 uppercase tracking-widest">Our Work</div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Websites we built that actually sell.</h2>
            <p className="text-zinc-600 text-base md:text-lg">Real custom storefronts designed for speed, brand identity, and maximum conversion.</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <PortfolioCarousel />
          </div>

          <div className="text-center pt-2">
            <button
              id="portfolio-cta"
              onClick={() => go('contact', 'portfolio_section')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-900 text-white font-extrabold shadow-lg hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm"
            >
              Get My Free Strategy Call &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════ WHY US / FACTUAL COMPARISON ═════════════════════════ */}
      <section id="why-custom" className="py-20 px-6 bg-slate-950 text-white relative overflow-hidden scroll-mt-20 md:scroll-mt-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08)_0%,transparent_60%)]" />
        </div>

        <div className="relative max-w-6xl mx-auto space-y-14">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              The Architecture Advantage
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Why high-growth brands choose a <span className="text-emerald-400">custom eCommerce stack</span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg">
              Off-the-shelf template platforms work for hobby shops. Scaling brands investing heavily in paid ads choose custom architecture for speed, complete ownership, and margin protection.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* The Old Way */}
            <div className="rounded-3xl p-8 md:p-10 bg-white/[0.03] border border-white/10 flex flex-col justify-between space-y-8 backdrop-blur-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">Off-the-Shelf Templates</div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700">
                    Template Limitations
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-zinc-200">Shopify &amp; WooCommerce Plugins</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  As stores add third-party apps for search, reviews, and popups, script bloat slows down mobile rendering and increases monthly costs.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { title: '3.5s – 5.0s Average Load Times', desc: 'Accumulated plugin scripts slow down mobile devices and reduce ad Quality Scores.' },
                  { title: '₹20,000 – ₹60,000/mo App Subscriptions', desc: 'Separate recurring bills for search, upsells, reviews, bundles, and popups.' },
                  { title: 'Platform Transaction Cuts', desc: 'Extra fees (up to 2%) charged on every order in addition to payment gateway rates.' },
                  { title: 'Plugin Conflicts & Update Breaks', desc: 'Incompatible plugin updates can disrupt checkout during peak advertising pushes.' },
                  { title: 'Rigid Checkout Customization', desc: 'Difficult to customize native Indian payment UX or integrate proprietary AI models.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-zinc-200 block font-semibold">{item.title}</strong>
                      <span className="text-zinc-400 text-xs">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-zinc-500 text-center">
                Bottleneck: <span className="text-zinc-300 font-semibold">Lower mobile conversion and recurring app overhead</span>
              </div>
            </div>

            {/* Our Custom Stack */}
            <div className="relative rounded-3xl p-8 md:p-10 bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-900 border-2 border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.12)] flex flex-col justify-between space-y-8 backdrop-blur-sm">
              <div className="absolute -top-3 right-6 px-3.5 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-black shadow-lg uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 fill-white" /> Performance Choice
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">Our In-House Stack</div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Sub-0.5s Edge Speed
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  Custom AI eCommerce Engine
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                </h3>
                <p className="text-sm text-emerald-100/80 leading-relaxed">
                  Engineered specifically for your catalog. Built for peak advertising scale, maximum ad conversion, and native AI personalization.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Sub-0.5s Edge Load Speed', desc: 'Edge-rendered Next.js architecture scoring 95+ on Google PageSpeed Insights.' },
                  { title: 'Zero Monthly App Fees (₹0/mo)', desc: 'Advanced search, filters, upsells, reviews, and analytics built into your code.' },
                  { title: '0% Platform Commission', desc: 'You retain 100% of your margins. No middleman percentage taken from sales.' },
                  { title: 'Native AI Intelligence', desc: 'Real-time personalized recommendations, smart bundles, and cart recovery.' },
                  { title: 'Frictionless Indian Mobile Checkout', desc: '1-tap PhonePe, GPay, Paytm & COD verification to reduce checkout dropoffs.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-white">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-300 block font-semibold">{item.title}</strong>
                      <span className="text-emerald-100/70 text-xs">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-emerald-500/20 text-center">
                <button
                  id="comparison-cta"
                  onClick={() => go('contact', 'comparison_section')}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-sm shadow-[0_8px_25px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 group"
                >
                  <Zap className="w-4 h-4 fill-white group-hover:rotate-12 transition-transform" />
                  Get My Free Strategy Call &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FEATURES SECTION (Short, Scannable) ═════════════════ */}
      <section id="features" className="py-20 px-6 bg-white scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center space-y-2.5 max-w-2xl mx-auto">
            <div className="text-xs font-black text-emerald-600 uppercase tracking-widest">What We Build</div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Not just a website. An in-house revenue engine.</h2>
            <p className="text-zinc-600 text-base md:text-lg">Every feature is engineered for speed, conversion, and zero ongoing plugin dependencies.</p>
          </div>

          {/* AI Product Showcase Card (Responsive, Non-Collapsing) */}
          <div className="rounded-3xl overflow-hidden shadow-xl ring-1 ring-zinc-200/80 max-w-5xl mx-auto bg-slate-950 flex flex-col">
            <div className="relative w-full aspect-[16/10] sm:aspect-video md:aspect-[21/10] overflow-hidden bg-zinc-900">
              <Image
                src="/ec-ai-product.jpg"
                alt="AI product recommendations UI showcase"
                fill
                sizes="(max-width: 768px) 100vw, 1024px"
                className="object-cover object-top"
                loading="lazy"
              />
              <div className="absolute top-3.5 left-3.5 md:top-4 md:left-4 z-10">
                <span className="text-[11px] md:text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-600 text-white shadow-md inline-flex items-center gap-1.5">
                  <span>🤖</span> Native AI Feature
                </span>
              </div>
            </div>
            
            <div className="p-5 sm:p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 bg-gradient-to-br from-slate-950 via-slate-900 to-[#071322] border-t border-white/10">
              <div className="space-y-1.5 text-left">
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white">
                  AI Product Recommendations in Action
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
                  Self-learning recommendation algorithms that analyze visitor behavior to suggest high-converting bundles and dynamic upsells.
                </p>
              </div>
              <button
                onClick={() => go('contact', 'features_showcase')}
                className="w-full md:w-auto shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-sm hover:from-emerald-400 hover:to-teal-400 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Get My Free Strategy Call &rarr;</span>
              </button>
            </div>
          </div>

          {/* 6 Scannable Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { I: Bot, c: 'from-emerald-500 to-teal-600', t: 'Proprietary AI Recommendations', d: 'Personalized product suggestions and smart bundles that lift Average Order Value by up to 35%.' },
              { I: Gauge, c: 'from-blue-500 to-cyan-600', t: 'Sub-Second Edge Speed', d: 'Blazing-fast page loads tested on Google PageSpeed for lower bounce and higher ad Quality Scores.' },
              { I: Smartphone, c: 'from-violet-500 to-purple-600', t: 'Mobile-First 1-Tap UX', d: 'Built for mobile ad traffic with frictionless thumb navigation and instant UPI app launch.' },
              { I: CreditCard, c: 'from-amber-500 to-orange-500', t: '1-Click Checkout Flow', d: 'Clean 3-step checkout with Razorpay, Cashfree, UPI & COD to stop cart abandonment.' },
              { I: BarChart3, c: 'from-pink-500 to-rose-500', t: 'Server-Side Ad Attribution', d: 'Built-in Meta Conversions API (CAPI) and Google Ads tracking for precise ROAS reporting.' },
              { I: Shield, c: 'from-teal-500 to-emerald-600', t: '100% Code & Data Ownership', d: 'Complete source code ownership with zero monthly app taxes and no platform lock-in.' },
            ].map(({ I, c, t, d }, i) => (
              <div key={i} className="bg-zinc-50 rounded-2xl p-7 border border-zinc-200/70 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c} flex items-center justify-center shadow-md mb-5 group-hover:scale-105 transition-transform`}>
                  <I className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{t}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ RESULTS SECTION ═════════════════════════════════════ */}
      <section id="results" className="py-20 px-6 bg-zinc-50 overflow-hidden scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-20">

          {/* Revenue Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
            <div className="space-y-6">
              <div className="text-xs font-black text-emerald-600 uppercase tracking-widest">Analytics &amp; Performance</div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">Analytics that show real ROI from day one.</h2>
              <p className="text-zinc-600 leading-relaxed text-base md:text-lg">Track orders, revenue, and customer lifetime value in real-time with zero tracking discrepancies.</p>
              <ul className="space-y-3">
                {[
                  'Real-time order & margin tracking',
                  'Direct Google & Meta Ads ROAS attribution',
                  'AI product recommendation performance insights',
                  'Cohort repeat purchase & LTV analysis'
                ].map((t, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-semibold text-zinc-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />{t}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => go('contact', 'results_dashboard')}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 text-white font-extrabold hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md text-sm"
              >
                Get My Free Strategy Call &rarr;
              </button>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-zinc-200">
              <Image src="/ec-results.jpg" alt="eCommerce analytics dashboard showing revenue metrics" width={800} height={600} loading="lazy" className="w-full object-cover" />
            </div>
          </div>

          {/* Google Ads ROI */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
            <div className="order-last lg:order-first relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-zinc-200">
              <Image src="/ec-ads.jpg" alt="Google Ads campaign performance dashboard" width={800} height={600} loading="lazy" className="w-full object-cover" />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold shadow">📈 Real Client Benchmark</span>
              </div>
            </div>
            <div className="space-y-6">
              <div className="text-xs font-black text-emerald-600 uppercase tracking-widest">Paid Traffic Optimization</div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">Make every rupee spent on paid ads convert higher.</h2>
              <p className="text-zinc-600 leading-relaxed text-base md:text-lg">Custom landing funnels engineered to reduce bounce rates and maximize Google &amp; Meta Ads ROAS.</p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['+48%', 'Mobile Conversion Lift', 'Post-launch client data'],
                  ['< 0.8s', 'Mobile Load Speed', 'Google PageSpeed tested'],
                  ['3.4×', 'Client ROAS Benchmark', '60-day ad campaign window'],
                  ['₹0', 'Platform Cuts', 'Keep 100% of earnings']
                ].map(([v, l, c], i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 border border-zinc-200/70 shadow-sm">
                    <div className="text-2xl font-black text-emerald-600">{v}</div>
                    <div className="text-xs font-bold text-slate-800 mt-1">{l}</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">{c}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => go('contact', 'results_ads')}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-600 text-white font-extrabold hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all shadow-md text-sm"
              >
                Get My Free Strategy Call &rarr;
              </button>
            </div>
          </div>

          {/* Mobile Commerce */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
            <div className="space-y-6">
              <div className="text-xs font-black text-emerald-600 uppercase tracking-widest">Mobile-First Commerce</div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">Engineered for mobile buyers where 80% of ad traffic lands.</h2>
              <p className="text-zinc-600 leading-relaxed text-base md:text-lg">A buttery-smooth mobile shopping experience designed for Indian buyers and impulse purchases.</p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['80%', 'Mobile Traffic Share', 'Targeted ad visitors'],
                  ['35%', 'Less Cart Abandonment', 'With 1-tap checkout'],
                  ['< 0.8s', 'Mobile Load Speed', 'Edge-rendered pages'],
                  ['+30%', 'Higher Order Value', 'Via native AI bundles']
                ].map(([v, l, c], i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 border border-zinc-200/70 shadow-sm">
                    <div className="text-2xl font-black text-emerald-600">{v}</div>
                    <div className="text-xs font-bold text-slate-800 mt-1">{l}</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">{c}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => go('contact', 'results_mobile')}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 text-white font-extrabold hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md text-sm"
              >
                Get My Free Strategy Call &rarr;
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-3xl overflow-hidden shadow-lg ring-1 ring-zinc-200">
                <Image src="/ec-customer.jpg" alt="Customer shopping on smartphone" width={400} height={500} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-lg ring-1 ring-zinc-200 mt-6 md:mt-8">
                <Image src="/ec-mobile.jpg" alt="Mobile product screen" width={400} height={600} loading="lazy" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Checkout Flow */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-zinc-200 order-last lg:order-first">
              <Image src="/ec-checkout.jpg" alt="Frictionless 3-step checkout interface" width={800} height={600} loading="lazy" className="w-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-sm font-bold">Frictionless 3-Step Checkout Flow</p>
                <p className="text-zinc-300 text-xs mt-0.5">PhonePe · Google Pay · Paytm · Razorpay · COD Verification</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-xs font-black text-emerald-600 uppercase tracking-widest">Frictionless Checkout</div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">A checkout flow that actually closes the sale.</h2>
              <p className="text-zinc-600 leading-relaxed text-base md:text-lg">No confusing steps. No redirect lag. Just a clean 3-step checkout that keeps buyers from dropping off.</p>
              
              <ul className="space-y-3">
                {[
                  'Razorpay, Cashfree, UPI & COD with automated OTP verification',
                  'Saved addresses and one-tap repeat purchases',
                  'Zero redirect delays during payment processing',
                  'Bank-grade 256-bit SSL encryption & PCI-DSS compliance'
                ].map((t, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-semibold text-zinc-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />{t}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => go('contact', 'results_checkout')}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 text-white font-extrabold hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md text-sm"
              >
                Get My Free Strategy Call &rarr;
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════ HOW IT WORKS (3-Step Clear Process) ═════════════════ */}
      <section id="process" className="py-20 px-6 bg-slate-950 text-white scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center space-y-2.5 max-w-2xl mx-auto">
            <div className="text-xs font-black text-emerald-400 uppercase tracking-widest">How It Works</div>
            <h2 className="text-3xl md:text-4xl font-black">From audit to revenue in 3 simple steps.</h2>
            <p className="text-zinc-400 text-base md:text-lg">A clear, collaborative process with zero guesswork.</p>
          </div>

          {/* Team image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <Image src="/ec-team.jpg" alt="Dedicated eCommerce engineering and design team" width={1280} height={720} loading="lazy" className="w-full object-cover max-h-72" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center pl-8 md:pl-12">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Dedicated Engineering Team</p>
              <h3 className="text-2xl md:text-3xl font-black text-white max-w-md">Designers, developers &amp; growth strategists focused on your store.</h3>
            </div>
          </div>

          {/* 3 Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: '01',
                I: MessageSquare,
                t: 'Free Strategy Call',
                d: 'We understand your store, customer journey, and growth goals — 100% free with no obligation.'
              },
              {
                n: '02',
                I: Sparkles,
                t: 'Design & Build',
                d: 'We design and build your custom eCommerce experience with sub-second speed and native AI features.'
              },
              {
                n: '03',
                I: TrendingUp,
                t: 'Launch & Scale',
                d: 'We launch, connect server-side ad tracking, and optimize continuously based on real conversion data.'
              }
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.07] transition-all group">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center group-hover:bg-emerald-500/25 transition-colors">
                    <s.I className="w-7 h-7 text-emerald-400" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                    {s.n}
                  </span>
                </div>
                <h3 className="text-lg font-bold">{s.t}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => go('contact', 'process_cta')}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-emerald-500 text-white font-black shadow-[0_0_30px_rgba(52,211,153,0.3)] hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all text-sm"
            >
              <Zap className="w-4 h-4 fill-white" /> Get My Free Strategy Call &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════ SOCIAL PROOF (Problem → Solution → Result) ═════════ */}
      <section id="reviews" className="py-20 px-6 bg-white scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2.5 max-w-2xl mx-auto">
            <div className="text-xs font-black text-emerald-600 uppercase tracking-widest">Client Reviews</div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Real stores. Verified client outcomes.</h2>
            <p className="text-zinc-600 text-base md:text-lg">How custom eCommerce architecture helped store owners scale their revenue.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: 'Rohan Mehta',
                r: 'Founder, StyleVault India',
                tag: 'D2C Fashion & Apparel',
                av: 'R',
                c: 'from-emerald-400 to-teal-500',
                problem: 'High mobile bounce and 4.2s load times on an old theme.',
                solution: 'Engineered custom Next.js storefront with 1-tap UPI checkout & AI recommendations.',
                result: 'Checkout completion rate jumped +48% in 60 days post-launch.'
              },
              {
                n: 'Priya Nair',
                r: 'Co-Founder, Zestful Organics',
                tag: 'Organic Food & Nutrition',
                av: 'P',
                c: 'from-blue-400 to-indigo-500',
                problem: '68% cart abandonment and ₹40,000/month in third-party app subscriptions.',
                solution: 'Built custom automated cart recovery and native smart bundle upsells.',
                result: 'Cart abandonment dropped by 31% while eliminating all recurring plugin app fees.'
              },
              {
                n: 'Arjun Kapoor',
                r: 'Growth Lead, TechGadgets.co',
                tag: 'Consumer Tech & Gadgets',
                av: 'A',
                c: 'from-amber-400 to-orange-500',
                problem: 'Ad budget wasted because paid Google and Meta clicks landed on a sluggish store.',
                solution: 'High-speed edge landing funnels with server-side ad conversion tracking.',
                result: 'Google Ads ROAS improved from 1.7× to 3.4× over a 90-day campaign window.'
              },
            ].map((t, i) => (
              <div key={i} className="bg-zinc-50 rounded-2xl p-7 border border-zinc-200/70 hover:shadow-xl hover:-translate-y-1 transition-all space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                      Verified Review
                    </span>
                  </div>

                  {/* Problem → Solution → Result Format */}
                  <div className="space-y-2.5 text-xs text-zinc-600">
                    <div className="bg-white p-3 rounded-xl border border-zinc-100 space-y-1.5">
                      <p><strong className="text-rose-600 font-bold">Challenge:</strong> {t.problem}</p>
                      <p><strong className="text-slate-800 font-bold">Solution:</strong> {t.solution}</p>
                    </div>
                    <p className="text-sm font-bold text-emerald-700 bg-emerald-50/70 p-3 rounded-xl border border-emerald-100">
                      &ldquo;{t.result}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-zinc-200/60">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.c} flex items-center justify-center text-white font-bold shadow-sm`}>
                    {t.av}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.n}</div>
                    <div className="text-xs text-zinc-500">{t.r} · {t.tag}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ URGENCY CTA BANNER ═════════════════════════════════ */}
      <section className="py-14 px-6 bg-emerald-600">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="text-white space-y-2.5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Limited Strategy Slots This Week
              </div>
              <h2 className="text-2xl md:text-3xl font-black leading-tight">
                Stores built for speed sell more on every ad campaign.
              </h2>
              <p className="text-emerald-100 text-sm max-w-lg">
                Book a 30-minute consultation. We&apos;ll identify what&apos;s costing you sales and map out an actionable growth plan.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 shrink-0">
              <div className="flex items-center gap-6">
                {[
                  ['4.9/5', 'Client Rating'],
                  ['< 0.8s', 'Edge Speed'],
                  ['100%', 'Ownership']
                ].map(([v, l]) => (
                  <div key={l} className="text-center">
                    <div className="text-xl md:text-2xl font-black text-white">{v}</div>
                    <div className="text-[10px] font-semibold text-emerald-100 uppercase tracking-wide">{l}</div>
                  </div>
                ))}
              </div>

              <button
                id="banner-cta"
                onClick={() => go('contact', 'urgency_banner')}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-emerald-700 font-black text-sm shadow-xl hover:bg-zinc-50 hover:scale-105 active:scale-95 transition-all"
              >
                <Zap className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                Get My Free Strategy Call &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ TRUST STRIP ═════════════════════════════════════════ */}
      <section className="py-10 px-6 bg-white border-y border-zinc-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { I: Package, t: '2–3 Week Delivery', s: 'Fixed timeline, no surprises' },
            { I: Headphones, t: 'Dedicated Support', s: 'Direct WhatsApp & engineer access' },
            { I: Repeat2, t: 'Iterative Revisions', s: 'Until your store is production-ready' },
            { I: TrendingUp, t: 'Conversion-Focused', s: 'Optimized for Google & Meta Ads' }
          ].map(({ I, t, s }, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 group">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                <I className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="font-bold text-sm text-slate-900">{t}</div>
              <div className="text-xs text-zinc-500">{s}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ CONTACT & LEAD FORM ═════════════════════════════════ */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-slate-50 via-white to-emerald-50/20 scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left: What You Get */}
          <div className="space-y-8 lg:sticky lg:top-24">
            <div>
              <div className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-3">Free 30-Minute Consultation</div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Ready to turn your store into a growth engine?
              </h2>
              <p className="text-zinc-600 mt-4 text-base md:text-lg leading-relaxed">
                Get a free 30-minute eCommerce strategy call. We&apos;ll review your store, identify conversion opportunities, and give you a practical growth roadmap.
              </p>
            </div>

            <ul className="space-y-3.5">
              {[
                'Store speed, mobile UX, and ad funnel audit',
                'Identification of cart dropoff points & leaks',
                'Clear custom architecture recommendations & timeline',
                'Transparent pricing — no hidden fees or app taxes',
                'Actionable advice. Zero aggressive sales pressure.'
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-semibold text-zinc-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div className="p-6 bg-white rounded-2xl border border-zinc-200/80 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Phone className="w-4 h-4 text-emerald-600" /> Direct Inquiries
              </div>
              <div className="space-y-2 text-sm text-zinc-600">
                <p>
                  📧 Email:{' '}
                  <a href="mailto:hello@auromindai.com" className="text-emerald-600 font-semibold hover:underline">
                    hello@auromindai.com
                  </a>
                </p>
                <p>
                  💬 WhatsApp:{' '}
                  <a
                    id="whatsapp-link"
                    href="https://wa.me/917695951519?text=Hi%2C%20I%20would%20like%20to%20schedule%20a%20free%20eCommerce%20strategy%20call."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('contact_click', { channel: 'whatsapp' })}
                    className="text-emerald-600 font-semibold hover:underline"
                  >
                    +91 76959 51519
                  </a>
                </p>
                <p>
                  📞 Phone:{' '}
                  <a
                    id="phone-link"
                    href="tel:+917695951519"
                    onClick={() => trackEvent('contact_click', { channel: 'phone' })}
                    className="text-emerald-600 font-semibold hover:underline"
                  >
                    +91 76959 51519
                  </a>
                </p>
                <p className="text-xs text-zinc-400">Response time: Mon–Sat · 9AM–8PM IST (under 2 hours)</p>
              </div>
            </div>
          </div>

          {/* Right: Lead Form */}
          <div id="contact-form-card" className="bg-white rounded-3xl border border-zinc-200 shadow-xl overflow-hidden scroll-mt-20 md:scroll-mt-24">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-white">Get My Free Strategy Call</h3>
                  <p className="text-xs text-emerald-100 mt-0.5">Fill in your details — we reply within 2 hours</p>
                </div>
                <div className="flex items-center gap-1.5 bg-white/15 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span className="text-[10px] font-bold text-white">Guaranteed</span>
                </div>
              </div>
            </div>
            <div className="p-7 md:p-8">
              <LeadForm formId="contact-lead-form" />
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════ FINAL OUTCOME CTA ═══════════════════════════════════ */}
      <section className="relative py-20 px-6 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(16,185,129,0.15),transparent_60%),radial-gradient(ellipse_at_70%_50%,rgba(59,130,246,0.1),transparent_60%)]" />
          <div className="absolute inset-0 bg-[url('/ec-hero.jpg')] opacity-[0.03] bg-cover bg-center" />
        </div>

        <div className="relative max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-14 items-center">
          <div className="text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-emerald-300 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 100% Free Strategy Session
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
              Don&apos;t let a slow store waste your <span className="text-emerald-400">Google &amp; Meta Ads.</span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              Every second of delay costs you buyers. Book your free 30-minute consultation — we&apos;ll show you exactly where visitors are bouncing and how to convert them into revenue.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-1">
              {[
                ['Sub-0.5s', 'Target Edge Speed'],
                ['14–21 Days', 'Production Launch'],
                ['₹0 / mo', 'Plugin App Taxes'],
                ['100%', 'Code Ownership']
              ].map(([v, l], i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-2xl font-black text-emerald-400">{v}</div>
                  <div className="text-xs text-zinc-400 mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mini form card */}
          <div className="relative">
            <div className="absolute -inset-2 bg-emerald-500/10 rounded-2xl blur-xl pointer-events-none" />
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-100">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
                <h3 className="text-base font-black text-white">Get My Free Strategy Call</h3>
                <p className="text-xs text-emerald-100 mt-0.5">No credit card · Zero obligation</p>
              </div>
              <div className="p-6">
                <LeadForm formId="final-lead-form" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════════════════════════════════════ */}
      <footer className="bg-[#050810] text-zinc-500 py-10 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="Back to top"
          >
            <Image src="/logo.png" alt="AuromindAI" width={26} height={26} unoptimized className="rounded-lg opacity-70" />
            <span className="font-bold text-zinc-400 text-sm">AuromindAI Commerce</span>
          </button>
          <p className="text-xs">© {new Date().getFullYear()} AuromindAI. Custom eCommerce Development.</p>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400 font-semibold">Edge infrastructure online</span>
          </div>
        </div>
      </footer>

      {/* ══════════════ MOBILE FULL-WIDTH STICKY CTA BAR ════════════════════ */}
      <div className="fixed bottom-0 inset-x-0 z-50 p-3 bg-white/95 backdrop-blur-xl border-t border-zinc-200/90 shadow-[0_-8px_30px_rgba(0,0,0,0.15)] md:hidden">
        <button
          id="mobile-sticky-cta"
          onClick={() => go('contact', 'mobile_sticky_cta')}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white font-black text-sm shadow-[0_4px_20px_rgba(5,150,105,0.4)] active:scale-[0.98] transition-all"
        >
          <Zap className="w-4 h-4 fill-white animate-pulse" />
          <span>Get My Free Strategy Call &rarr;</span>
        </button>
      </div>

    </div>
  );
}
