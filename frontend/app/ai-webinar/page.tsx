'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import {
  Calendar, Clock, ShieldCheck, CheckCircle2, Star, Sparkles,
  ArrowRight, Users, Zap, Award, Gift, HelpCircle, AlertCircle,
  Video, Lock, ChevronDown, Check, Flame, MessageSquare,
  ExternalLink, Download, ArrowUpRight, Share2, Layers,
  Terminal, BarChart, Smartphone, Laptop, CheckCircle, Crown,
  X, Compass, Bell, Shield, Rocket, Target, PlayCircle
} from 'lucide-react';

/* ────────────────────────────────────────────────────────────────────────────
   EARLY BIRD COUNTDOWN TIMER HOOK (Creates immediate action & urgency)
──────────────────────────────────────────────────────────────────────────── */
function useEarlyBirdCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 48,
    seconds: 19,
  });

  useEffect(() => {
    function tick() {
      const now = new Date();
      // Daily Early-Bird midnight deadline in IST
      const midnight = new Date();
      midnight.setHours(23, 59, 59, 999);
      const diff = Math.max(0, +midnight - +now);

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    }
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}

/* ────────────────────────────────────────────────────────────────────────────
   RAZORPAY TYPES
──────────────────────────────────────────────────────────────────────────── */
declare global {
  interface Window {
    Razorpay?: any;
    dataLayer?: any[];
  }
}

export default function AIWebinarPage() {
  const countdown = useEarlyBirdCountdown();

  // Registration Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Business Owner / Founder');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Success Confirmation Modal State
  const [confirmedTicket, setConfirmedTicket] = useState<{
    registrationId: string;
    attendeeName: string;
    attendeeEmail: string;
    amountPaid: string;
    paymentId: string;
    webinarDate: string;
    webinarTime: string;
    calendarUrl: string;
  } | null>(null);

  // Instant Checkout Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Seats Remaining Tracker
  const [seatsRemaining, setSeatsRemaining] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeatsRemaining(prev => (prev > 4 ? prev - 1 : prev));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Universal CTA Trigger - Navigate directly to dedicated payment checkout page
  const triggerRegistration = (sourceTag = 'CTA') => {
    const params = new URLSearchParams();
    if (name.trim()) params.set('name', name.trim());
    if (email.trim()) params.set('email', email.trim());
    if (phone.trim()) params.set('phone', phone.trim());
    const query = params.toString() ? `?${params.toString()}` : '';
    window.location.href = `/ai-webinar/checkout${query}`;
  };

  const handleRegisterAndPay = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid work email.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit WhatsApp number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/webinar/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          role,
          source: 'AI Automation Workshop Landing Page',
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.orderId) {
        throw new Error(data.error || 'Failed to initialize workshop registration.');
      }

      const { orderId, keyId, registrationId, isLiveRazorpay } = data;

      // Ensure Razorpay SDK is loaded if not already in window
      if (typeof window !== 'undefined' && !(window as any).Razorpay) {
        await new Promise<void>((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => resolve();
          document.body.appendChild(script);
        });
      }

      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        const activeKey = keyId || 'rzp_test_TExpVoOTKpnFY8';
        const options: any = {
          key: activeKey,
          amount: 9900, // Rs 99 in paise
          currency: 'INR',
          name: 'AI Automation Workshop',
          description: 'Saturday Oct 10 • 10 AM to 12 PM (2h Live Workshop)',
          image: '/logo.png',
          prefill: {
            name: name.trim(),
            email: email.trim(),
            contact: phone.trim(),
          },
          theme: {
            color: '#F59E0B',
          },
          handler: async function (response: any) {
            await verifyPayment({
              registrationId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id || orderId,
              razorpay_signature: response.razorpay_signature,
              name,
              email,
              phone,
            });
          },
          modal: {
            ondismiss: function () {
              setIsSubmitting(false);
            },
          },
        };

        if (isLiveRazorpay && orderId) {
          options.order_id = orderId;
        }

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', function (failRes: any) {
          setErrorMessage(failRes.error?.description || 'Payment was declined. Please try again.');
          setIsSubmitting(false);
        });
        rzp.open();
      } else {
        await verifyPayment({
          registrationId,
          razorpay_payment_id: `pay_gold_${Date.now()}`,
          razorpay_order_id: orderId,
          razorpay_signature: 'sig_gold_verified',
          name,
          email,
          phone,
        });
      }
    } catch (err: any) {
      console.error('Registration failed:', err);
      setErrorMessage(err.message || 'Something went wrong. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  };

  const verifyPayment = async (payload: any) => {
    try {
      const verifyRes = await fetch('/api/webinar/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const verifyData = await verifyRes.json();
      if (verifyRes.ok && verifyData.ticket) {
        setConfirmedTicket(verifyData.ticket);
        setIsModalOpen(false);
      } else {
        throw new Error(verifyData.error || 'Payment verification encountered an issue.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Verification failed. Please contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0A0D] text-white font-sans selection:bg-amber-400 selection:text-black antialiased relative overflow-x-hidden pb-24 sm:pb-16">
      {/* Razorpay Script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* Ambient Gold Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-amber-500/15 via-yellow-600/10 to-transparent blur-[140px]" />
        <div className="absolute top-[35%] -left-32 w-80 h-80 bg-amber-600/8 rounded-full blur-[130px]" />
        <div className="absolute top-[65%] -right-32 w-80 h-80 bg-yellow-500/8 rounded-full blur-[130px]" />
      </div>

      {/* ────────────────────────────────────────────────────────────────────────
          1. TOP BOLD GOLD URGENCY BAR (RESPONSIVE)
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="relative z-50 bg-[#161208] border-b border-amber-500/30 px-3 sm:px-4 py-2 sm:py-2.5 text-center text-xs font-bold shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-2 sm:gap-3 text-amber-200">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 font-black px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] border border-amber-500/40">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              LIVE
            </span>
            <span className="text-white font-black tracking-wide text-[11px] sm:text-xs">
              SATURDAY, OCT 10TH • 10:00 AM – 12:00 PM IST
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-white font-black text-xs sm:text-sm">₹99 ONLY</span>
              <span className="line-through text-zinc-500 text-[10px] sm:text-xs font-normal">₹1,999</span>
              <span className="text-[10px] sm:text-[11px] font-black text-amber-300 bg-amber-950/80 px-1.5 sm:px-2 py-0.5 rounded border border-amber-500/40">
                SAVE 95%
              </span>
            </div>

            <Link
              href="/ai-webinar/checkout"
              className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full gold-btn text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <span>Book ₹99</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────────
          2. HEADER NAVIGATION (RESPONSIVE)
      ──────────────────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full bg-[#0A0A0D]/95 backdrop-blur-xl border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-900 border-2 border-emerald-500/50 p-1 flex items-center justify-center shadow-lg group-hover:border-emerald-400 transition-colors shrink-0">
              <Image src="/logo.png" alt="AuromindAI" width={32} height={32} className="object-contain" priority />
            </div>
            <div>
              <div className="font-black text-lg sm:text-2xl tracking-tight text-white flex items-center gap-1">
                Auromind<span className="text-[#00D06C] font-black drop-shadow-[0_0_12px_rgba(0,208,108,0.5)]">AI</span>
              </div>
              <div className="text-[9px] sm:text-[10px] font-black tracking-widest text-amber-400 uppercase">
                AI Automation Workshop
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-zinc-300">
            <a href="#curriculum" className="hover:text-amber-400 transition-colors">Curriculum</a>
            <a href="#bonuses" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <span>₹12,000 Bonuses</span>
              <span className="text-[10px] bg-amber-500 text-black px-1.5 py-0.5 rounded font-black">FREE</span>
            </a>
            <a href="#who" className="hover:text-amber-400 transition-colors">Who Is It For</a>
            <a href="#instructor" className="hover:text-amber-400 transition-colors">Instructor</a>
            <a href="#reviews" className="hover:text-amber-400 transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-amber-400 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/ai-webinar/checkout"
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl gold-btn text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-black" />
              <span><span className="hidden sm:inline">Claim Seat • </span>₹99</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ────────────────────────────────────────────────────────────────────────
          3. BOLD HERO SECTION (RESPONSIVE)
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 pt-6 pb-12 sm:pt-14 sm:pb-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Top Eyebrow Badge */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-zinc-900 border-2 border-amber-500/50 shadow-lg text-[10px] sm:text-xs font-black text-amber-300 tracking-wide uppercase text-center">
            <Rocket className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
            <span>LIVE 2-HOUR WORKSHOP • SATURDAY, OCT 10TH</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Bold Headline & Details */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            <div className="inline-block">
              <span className="text-[10px] sm:text-xs font-black tracking-widest text-amber-400 uppercase bg-amber-500/10 px-2.5 sm:px-3 py-1 rounded-lg border border-amber-500/25">
                The Practical Implementation Playbook
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] break-words">
              AI AUTOMATION <br />
              <span className="gold-gradient-text drop-shadow-[0_2px_20px_rgba(245,158,11,0.35)]">
                WORKSHOP
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Build &amp; deploy autonomous AI employees that eliminate repetitive work, run 24/7 lead qualification, and automate 80% of business operations.
            </p>

            {/* 4 Bold Event Spec Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
              <div className="bg-[#121217] border-2 border-zinc-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-left">
                <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-zinc-400">Date</span>
                </div>
                <div className="text-sm sm:text-base font-black text-white">Oct 10, 2026</div>
                <div className="text-[11px] sm:text-xs font-bold text-amber-400">Saturday</div>
              </div>

              <div className="bg-[#121217] border-2 border-zinc-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-left">
                <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-zinc-400">Time</span>
                </div>
                <div className="text-sm sm:text-base font-black text-white">10 AM – 12 PM</div>
                <div className="text-[11px] sm:text-xs font-bold text-amber-400">2 Hours Live IST</div>
              </div>

              <div className="bg-[#121217] border-2 border-zinc-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-left">
                <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                  <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-zinc-400">Delivery</span>
                </div>
                <div className="text-sm sm:text-base font-black text-white">Live on Zoom</div>
                <div className="text-[11px] sm:text-xs font-bold text-amber-400">+ HD Recording</div>
              </div>

              <div className="bg-gradient-to-br from-[#241A0A] to-[#141006] border-2 border-amber-500/60 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-left shadow-lg">
                <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-amber-400">Ticket</span>
                </div>
                <div className="text-base sm:text-xl font-black text-white flex items-baseline gap-1.5">
                  ₹99 <span className="line-through text-zinc-500 text-xs font-normal">₹1,999</span>
                </div>
                <div className="text-[10px] sm:text-[11px] font-black text-amber-400">95% Launch Off</div>
              </div>
            </div>

            {/* High-Urgency Early Bird Countdown & Seat Progress */}
            <div className="bg-gradient-to-r from-[#181308] via-[#241B0B] to-[#181308] border-2 border-amber-500/50 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3.5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-center sm:text-left">
                  <div className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center justify-center sm:justify-start gap-1.5">
                    <Flame className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                    <span>Batch 1 Early Bird Offer Closes In:</span>
                  </div>
                  <div className="text-xs font-bold text-zinc-300 mt-0.5">
                    Price increases to <span className="line-through text-zinc-500">₹1,999</span> once timer ends
                  </div>
                </div>

                {/* 3-Unit Digital Clock: Hours, Mins, Secs (No 14-day delay) */}
                <div className="flex items-center gap-1.5 sm:gap-2.5 text-center">
                  <div className="bg-[#0D0D11] border-2 border-amber-500/40 rounded-xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 min-w-[50px] sm:min-w-[62px] shadow-inner">
                    <div className="text-lg sm:text-2xl font-black text-white font-mono leading-none">
                      {String(countdown.hours).padStart(2, '0')}
                    </div>
                    <div className="text-[8px] sm:text-[9px] uppercase tracking-wider text-amber-400/90 font-black mt-1">
                      Hours
                    </div>
                  </div>

                  <span className="text-amber-400 font-black text-base sm:text-xl">:</span>

                  <div className="bg-[#0D0D11] border-2 border-amber-500/40 rounded-xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 min-w-[50px] sm:min-w-[62px] shadow-inner">
                    <div className="text-lg sm:text-2xl font-black text-white font-mono leading-none">
                      {String(countdown.minutes).padStart(2, '0')}
                    </div>
                    <div className="text-[8px] sm:text-[9px] uppercase tracking-wider text-amber-400/90 font-black mt-1">
                      Mins
                    </div>
                  </div>

                  <span className="text-amber-400 font-black text-base sm:text-xl">:</span>

                  <div className="bg-[#0D0D11] border-2 border-amber-400 rounded-xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 min-w-[50px] sm:min-w-[62px] shadow-lg shadow-amber-500/20">
                    <div className="text-lg sm:text-2xl font-black text-amber-400 font-mono leading-none">
                      {String(countdown.seconds).padStart(2, '0')}
                    </div>
                    <div className="text-[8px] sm:text-[9px] uppercase tracking-wider text-amber-300 font-black mt-1">
                      Secs
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Seats Progress Bar & Counter */}
              <div className="pt-2 border-t border-zinc-800/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-zinc-300 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    Seats Claimed: <strong className="text-white">{100 - seatsRemaining} / 100</strong>
                  </span>
                  <span className="text-amber-400 font-black">
                    Only {seatsRemaining} Spots Left at ₹99
                  </span>
                </div>
                <div className="w-full bg-[#101015] rounded-full h-2.5 overflow-hidden border border-zinc-700/80 p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                    style={{ width: `${((100 - seatsRemaining) / 100) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-zinc-400 font-medium pt-0.5">
                  <span className="text-amber-300 font-bold">📅 Workshop Date: Saturday, October 10th</span>
                  <span className="text-zinc-300 font-semibold">10:00 AM – 12:00 PM IST</span>
                </div>
              </div>
            </div>

            {/* Checklist of key benefits */}
            <div className="space-y-2 pt-1 text-xs sm:text-sm font-bold text-zinc-300 text-left">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
                <span>Instant Zoom Link Sent Directly on WhatsApp &amp; Work Email</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
                <span>Full Lifetime Access to 1080p Recording + Prompts Vault Included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
                <span>100% Money-Back Satisfaction Guarantee (Zero Risk)</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Workshop Card + Free Value Stack (No Gap) */}
          <div id="registration-section" className="lg:col-span-5 w-full space-y-4">
            {/* Card Matching User Upload (Image 2) */}
            <div className="relative rounded-3xl p-6 sm:p-7 bg-[#111218] border-2 border-zinc-700 shadow-2xl shadow-amber-500/15 overflow-hidden">
              {/* Speaker Header with Gnananand */}
              <div className="flex items-center gap-3.5 pb-4 mb-5 border-b border-zinc-800">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden relative shrink-0 border-2 border-amber-500 shadow-xl bg-zinc-900">
                  <Image src="/gnananand.jpg" alt="Gnananand" fill className="object-cover object-center" priority />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl font-black text-white">Gnananand</span>
                    <span className="text-[10px] bg-amber-500 text-black px-2 py-0.5 rounded font-black tracking-wide">
                      10+ YRS SALES EXP
                    </span>
                  </div>
                  <div className="text-xs text-amber-400 font-bold mt-0.5">
                    10+ Years Enterprise Sales Veteran &amp; AI Conversion Mentor
                  </div>
                </div>
              </div>

              {/* Title & Date/Time Row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                    AI Business Automation
                  </div>
                  <div className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2 mt-0.5">
                    <span className="border-l-4 border-red-500 pl-2 text-red-500">WORKSHOP</span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-sm sm:text-base font-black text-white">
                    Saturday, Oct 10, 2026
                  </div>
                  <div className="inline-block px-2.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 font-semibold border border-zinc-700 mt-1">
                    Online Webinar
                  </div>
                  <div className="text-xs text-zinc-400 font-bold mt-1 font-mono">
                    10:00 AM – 12:00 PM IST
                  </div>
                </div>
              </div>

              {/* Gold Glowing CTA Button -> Goes to /ai-webinar/checkout */}
              <Link
                href="/ai-webinar/checkout"
                className="w-full mt-6 py-4 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:via-yellow-300 hover:to-amber-400 active:scale-[0.99] text-black font-black text-sm sm:text-base shadow-[0_0_30px_rgba(245,158,11,0.65)] hover:shadow-[0_0_45px_rgba(245,158,11,0.95)] border border-amber-300 flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-200 group relative overflow-hidden"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
                <Sparkles className="w-5 h-5 text-black shrink-0 animate-pulse" />
                <span>Pay ₹99 to Unlock Sales Revenue</span>
                <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Three Bullet Points Matching Image 2 */}
              <div className="mt-4 text-center space-y-1 text-xs text-zinc-400 font-medium">
                <div className="flex items-center justify-center gap-4 text-zinc-300">
                  <span>● No fluff.</span>
                  <span>● No generic theory.</span>
                </div>
                <div className="text-zinc-400 text-[11px]">
                  ● Just the clearest 2 hours your business has ever had.
                </div>
              </div>
            </div>

            {/* Fast-Action Bonuses Card (Fills Right Column Gap Seamlessly) */}
            <div className="rounded-3xl p-5 sm:p-5.5 bg-gradient-to-b from-[#13131A] to-[#0E0E14] border-2 border-zinc-800 shadow-xl space-y-3.5">
              <div className="flex items-center justify-between border-b border-zinc-800/90 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                    Included Free With Your ₹99 Pass
                  </span>
                </div>
                <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  ₹12,000 VALUE
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 font-black text-[11px] flex items-center justify-center shrink-0 border border-amber-500/30">
                    01
                  </div>
                  <div>
                    <div className="text-xs font-black text-white">50+ Enterprise AI Sales &amp; Lead Prompts</div>
                    <div className="text-[11px] text-zinc-400 font-medium">Copy-paste prompts to automate prospect qualification (Worth ₹4,999)</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 font-black text-[11px] flex items-center justify-center shrink-0 border border-amber-500/30">
                    02
                  </div>
                  <div>
                    <div className="text-xs font-black text-white">Full HD Workshop Replay + Architecture Slides</div>
                    <div className="text-[11px] text-zinc-400 font-medium">Lifetime access so your team can re-watch any time (Worth ₹3,999)</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 font-black text-[11px] flex items-center justify-center shrink-0 border border-amber-500/30">
                    03
                  </div>
                  <div>
                    <div className="text-xs font-black text-white">Live Pipeline Hotseat &amp; Q&amp;A With Gnananand</div>
                    <div className="text-[11px] text-zinc-400 font-medium">Get actionable critique on your sales automation setup (Worth ₹3,000)</div>
                  </div>
                </div>
              </div>

              {/* Social Proof & Guarantee Pill */}
              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-zinc-300 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Satisfaction Guarantee</span>
                </div>
                <span className="text-amber-400 font-black">Rated 4.9/5 ★ (1,400+ Alumni)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          4. BRAND & ARCHITECTURE TRUST BAR (RESPONSIVE)
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="border-y-2 border-zinc-800 bg-[#0E0E14] py-5 sm:py-6 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-400">
              Modern Autonomous AI Frameworks
            </div>
            <div className="text-[11px] sm:text-xs text-zinc-400 font-medium">
              We teach production-grade multi-agent swarms, not toy ChatGPT prompts
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-white text-xs sm:text-sm font-black">
            <span>Claude 3.7 Sonnet</span>
            <span>OpenAI GPT-4o</span>
            <span>Google Gemini 2.5</span>
            <span>LangGraph &amp; Swarms</span>
            <span>Razorpay API</span>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          5. WHY ATTEND THIS SATURDAY + CTA (RESPONSIVE)
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-black border border-amber-500/30 mb-3">
            THE 2026 AI AUTOMATION ADVANTAGE
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Single Prompts Are Outdated. <br />
            <span className="gold-gradient-text">Autonomous Multi-Agent Swarms</span> Win.
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 mt-2 sm:mt-3 font-medium">
            Typing one-off prompts into a chatbot is slow and manual. Companies winning right now are orchestrating autonomous AI agent swarms that run sales, answer queries, and update databases with zero human lag.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Outdated */}
          <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-[#141010] border-2 border-red-900/50 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 font-black text-xs mb-3 sm:mb-4">
              <span>✕</span> The Outdated Manual Way
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4">Manual, Slow &amp; Expensive</h3>
            <ul className="space-y-3 text-xs sm:text-sm font-medium text-zinc-300">
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-black shrink-0 text-sm sm:text-base">✕</span>
                <span>Manually copying and pasting text into ChatGPT 40 times a day</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-black shrink-0 text-sm sm:text-base">✕</span>
                <span>Hiring expensive reps for basic lead qualification and support triage</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-black shrink-0 text-sm sm:text-base">✕</span>
                <span>Fragile rule-based chatbots that fail when customers ask nuanced questions</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-black shrink-0 text-sm sm:text-base">✕</span>
                <span>Falling behind competitors who automate entire departments with AI</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Workshop Method */}
          <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-gradient-to-br from-[#1C150A] to-[#120E06] border-2 border-amber-500/60 relative shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-black text-xs mb-3 sm:mb-4 border border-amber-500/40">
              <Crown className="w-3.5 h-3.5 text-amber-400" /> What You Master in This Workshop (₹99)
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4">24/7 Autonomous AI Swarms</h3>
            <ul className="space-y-3 text-xs sm:text-sm font-bold text-white">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>Autonomous agents that qualify leads, book calendar calls, and close sales</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>Visual orchestration connecting webhooks, WhatsApp, Google Sheets &amp; CRMs</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>Multi-agent reasoning loops where agents audit each other to kill hallucinations</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>Downloadable production templates ready to deploy in under 48 hours</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOLD CTA BANNER #1 */}
        <div className="mt-8 sm:mt-12 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#1E170A] via-[#2A1F0D] to-[#1E170A] border-2 border-amber-500/50 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left shadow-xl">
          <div>
            <div className="text-white font-black text-lg sm:text-2xl">
              Lock In Your Ticket for Saturday, Oct 10th
            </div>
            <div className="text-xs sm:text-sm font-bold text-amber-300 mt-1">
              Live Zoom Masterclass (10:00 AM – 12:00 PM IST) • ₹99 Early Bird
            </div>
          </div>
          <button
            onClick={() => triggerRegistration('cta_after_why')}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl gold-btn text-xs sm:text-sm uppercase tracking-wider cursor-pointer shrink-0 flex items-center justify-center gap-2"
          >
            <span>Reserve Seat for ₹99</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          6. DETAILED 2-HOUR CURRICULUM + CTA (RESPONSIVE)
      ──────────────────────────────────────────────────────────────────────── */}
      <section id="curriculum" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-2 border-zinc-800">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-black border border-amber-500/30 mb-3">
            SATURDAY, OCT 10 • 10:00 AM TO 12:00 PM IST
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            2-Hour Hands-On Curriculum
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 mt-2 sm:mt-3 font-medium">
            Straight to practical execution. Every segment is designed to give you deployable frameworks immediately.
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
          {/* Module 1 */}
          <div className="bg-[#111116] border-2 border-zinc-800 hover:border-amber-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 sm:pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-amber-500/20 text-amber-300 font-black text-sm sm:text-base flex items-center justify-center border border-amber-500/40 shrink-0">
                  01
                </span>
                <h3 className="text-base sm:text-xl font-black text-white">
                  Part 1: Modern Autonomous AI &amp; Reasoning Loops
                </h3>
              </div>
              <span className="text-[11px] sm:text-xs font-black text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full w-fit">
                10:00 AM – 10:30 AM
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-zinc-300 mt-3 leading-relaxed">
              Understand the shift from basic prompts to Agentic Workflows. Why AI Agents succeed where simple prompts fail, and how memory, tool use, and reasoning loops work under the hood.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-zinc-300">
              <span className="bg-[#181822] px-2.5 py-1 rounded-lg border border-zinc-700">State of LLMs in 2026</span>
              <span className="bg-[#181822] px-2.5 py-1 rounded-lg border border-zinc-700">Agent Reasoning Loops</span>
              <span className="bg-[#181822] px-2.5 py-1 rounded-lg border border-zinc-700">Function Calling</span>
            </div>
          </div>

          {/* Module 2 */}
          <div className="bg-[#111116] border-2 border-zinc-800 hover:border-amber-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 sm:pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-amber-500/20 text-amber-300 font-black text-sm sm:text-base flex items-center justify-center border border-amber-500/40 shrink-0">
                  02
                </span>
                <h3 className="text-base sm:text-xl font-black text-white">
                  Part 2: Live Build — Multi-Agent Sales &amp; Support Swarm
                </h3>
              </div>
              <span className="text-[11px] sm:text-xs font-black text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full w-fit">
                10:30 AM – 11:00 AM
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-zinc-300 mt-3 leading-relaxed">
              Watch step-by-step as we construct a live multi-agent swarm in front of your eyes: An Inbound Triage Agent, a Lead Qualifier, a Calendar Booker, and a Knowledge Search Agent connected to live business data.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-zinc-300">
              <span className="bg-[#181822] px-2.5 py-1 rounded-lg border border-zinc-700">Live Agent Building</span>
              <span className="bg-[#181822] px-2.5 py-1 rounded-lg border border-zinc-700">RAG &amp; Embeddings</span>
              <span className="bg-[#181822] px-2.5 py-1 rounded-lg border border-zinc-700">WhatsApp &amp; CRM Sync</span>
            </div>
          </div>

          {/* Module 3 */}
          <div className="bg-[#111116] border-2 border-zinc-800 hover:border-amber-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 sm:pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-amber-500/20 text-amber-300 font-black text-sm sm:text-base flex items-center justify-center border border-amber-500/40 shrink-0">
                  03
                </span>
                <h3 className="text-base sm:text-xl font-black text-white">
                  Part 3: 4 Enterprise Use Cases Generating ₹10L+
                </h3>
              </div>
              <span className="text-[11px] sm:text-xs font-black text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full w-fit">
                11:00 AM – 11:30 AM
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-zinc-300 mt-3 leading-relaxed">
              Real teardowns of deployed agent systems across eCommerce, Real Estate, B2B SaaS, and Service Agencies. How these businesses replaced 60+ manual hours per week with zero extra headcount.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-zinc-300">
              <span className="bg-[#181822] px-2.5 py-1 rounded-lg border border-zinc-700">eCommerce Order AI</span>
              <span className="bg-[#181822] px-2.5 py-1 rounded-lg border border-zinc-700">Real Estate Tour Automation</span>
              <span className="bg-[#181822] px-2.5 py-1 rounded-lg border border-zinc-700">B2B Outbound</span>
            </div>
          </div>

          {/* Module 4 */}
          <div className="bg-[#111116] border-2 border-zinc-800 hover:border-amber-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 sm:pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-amber-500/20 text-amber-300 font-black text-sm sm:text-base flex items-center justify-center border border-amber-500/40 shrink-0">
                  04
                </span>
                <h3 className="text-base sm:text-xl font-black text-white">
                  Part 4: Live Q&amp;A, Workflow Teardowns &amp; Vault Handout
                </h3>
              </div>
              <span className="text-[11px] sm:text-xs font-black text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full w-fit">
                11:30 AM – 12:00 PM
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-zinc-300 mt-3 leading-relaxed">
              Get your specific business questions answered live. We will teardown attendee workflows, provide direct implementation feedback, and hand out all download links for the ₹12,000 bonus vault.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-zinc-300">
              <span className="bg-[#181822] px-2.5 py-1 rounded-lg border border-zinc-700">Live 1-on-1 Teardowns</span>
              <span className="bg-[#181822] px-2.5 py-1 rounded-lg border border-zinc-700">Download Vault Access</span>
              <span className="bg-[#181822] px-2.5 py-1 rounded-lg border border-zinc-700">VIP Group Admission</span>
            </div>
          </div>
        </div>

        {/* BOLD CTA #2 */}
        <div className="text-center mt-8 sm:mt-12">
          <button
            onClick={() => triggerRegistration('curriculum_cta')}
            className="w-full sm:w-auto px-6 sm:px-9 py-3.5 sm:py-4 rounded-xl gold-btn text-xs sm:text-sm uppercase tracking-wider cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <span>Enroll in AI Automation Workshop for ₹99</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="text-[11px] sm:text-xs font-bold text-zinc-400 mt-2">
            Instant WhatsApp confirmation + 100% money-back guarantee
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          7. FREE BONUSES (WORTH ₹12,000+ INCLUDED FOR ₹99) + CTA (RESPONSIVE)
      ──────────────────────────────────────────────────────────────────────── */}
      <section id="bonuses" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-2 border-zinc-800 bg-[#0C0C10]">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-black border border-amber-500/30 mb-3">
            <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" /> ₹12,000 VALUE INCLUDED FREE WITH ₹99 TICKET
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Register Today &amp; Unlock All 4 Bonuses Free
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 mt-2 sm:mt-3 font-medium">
            Instant digital access delivered directly to your inbox immediately upon booking.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Bonus 1 */}
          <div className="bg-[#13131A] border-2 border-zinc-800 hover:border-amber-500/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all shadow-lg">
            <div className="text-[10px] sm:text-xs font-black text-amber-400 uppercase tracking-wider mb-1">Bonus #1</div>
            <div className="text-[10px] sm:text-xs font-bold text-zinc-500 line-through">Value: ₹3,500</div>
            <h3 className="text-base sm:text-lg font-black text-white mt-1.5 mb-1.5">2026 AI Agent Blueprint</h3>
            <p className="text-xs font-medium text-zinc-300 leading-relaxed">
              Complete architectural diagrams and schema maps showing how to link LLMs, memory stores, and webhooks reliably.
            </p>
          </div>

          {/* Bonus 2 */}
          <div className="bg-[#13131A] border-2 border-zinc-800 hover:border-amber-500/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all shadow-lg">
            <div className="text-[10px] sm:text-xs font-black text-amber-400 uppercase tracking-wider mb-1">Bonus #2</div>
            <div className="text-[10px] sm:text-xs font-bold text-zinc-500 line-through">Value: ₹4,000</div>
            <h3 className="text-base sm:text-lg font-black text-white mt-1.5 mb-1.5">50+ Tested System Prompts</h3>
            <p className="text-xs font-medium text-zinc-300 leading-relaxed">
              Production-tested prompts for customer support, lead qualification, email copywriting, and meeting summarization.
            </p>
          </div>

          {/* Bonus 3 */}
          <div className="bg-[#13131A] border-2 border-zinc-800 hover:border-amber-500/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all shadow-lg">
            <div className="text-[10px] sm:text-xs font-black text-amber-400 uppercase tracking-wider mb-1">Bonus #3</div>
            <div className="text-[10px] sm:text-xs font-bold text-zinc-500 line-through">Value: ₹2,500</div>
            <h3 className="text-base sm:text-lg font-black text-white mt-1.5 mb-1.5">Full Lifetime HD Recording</h3>
            <p className="text-xs font-medium text-zinc-300 leading-relaxed">
              Cannot attend live? No problem. Receive lifetime access to the full recording, transcripts, and timestamps within 2 hours.
            </p>
          </div>

          {/* Bonus 4 */}
          <div className="bg-[#13131A] border-2 border-zinc-800 hover:border-amber-500/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all shadow-lg">
            <div className="text-[10px] sm:text-xs font-black text-amber-400 uppercase tracking-wider mb-1">Bonus #4</div>
            <div className="text-[10px] sm:text-xs font-bold text-zinc-500 line-through">Value: ₹2,000</div>
            <h3 className="text-base sm:text-lg font-black text-white mt-1.5 mb-1.5">VIP WhatsApp Community</h3>
            <p className="text-xs font-medium text-zinc-300 leading-relaxed">
              Private community access with 1,200+ founders, builders, and AI leaders to share templates, hire talent, and get help.
            </p>
          </div>
        </div>

        {/* BOLD CTA #3 */}
        <div className="mt-8 sm:mt-12 text-center">
          <button
            onClick={() => triggerRegistration('bonus_cta')}
            className="w-full sm:w-auto px-6 sm:px-9 py-3.5 sm:py-4 rounded-xl gold-btn text-xs sm:text-sm uppercase tracking-wider cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <Crown className="w-4 h-4 fill-black shrink-0" />
            <span>Claim All 4 Bonuses Free with Your ₹99 Ticket</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          8. WHO IS THIS WORKSHOP FOR? + CTA (RESPONSIVE)
      ──────────────────────────────────────────────────────────────────────── */}
      <section id="who" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-2 border-zinc-800">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-black border border-amber-500/30 mb-3">
            WHO IS THIS FOR
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Built for Modern Business Leaders &amp; Builders
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 mt-2 sm:mt-3 font-medium">
            Whether you run a company or want to future-proof your career, this session delivers immediate leverage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-[#121218] border-2 border-zinc-800 rounded-xl sm:rounded-2xl p-5 sm:p-7 text-left shadow-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 sm:mb-5 border border-amber-500/40">
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white mb-2">Founders &amp; Business Owners</h3>
            <p className="text-xs sm:text-sm font-medium text-zinc-300 leading-relaxed">
              Cut payroll overhead and automate customer response, CRM data entry, and sales qualification without hiring 5 new employees.
            </p>
          </div>

          <div className="bg-[#121218] border-2 border-zinc-800 rounded-xl sm:rounded-2xl p-5 sm:p-7 text-left shadow-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 sm:mb-5 border border-amber-500/40">
              <Laptop className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white mb-2">Engineers &amp; Tech Leads</h3>
            <p className="text-xs sm:text-sm font-medium text-zinc-300 leading-relaxed">
              Level up beyond basic LLM wrappers. Master production multi-agent design patterns, state machines, tool calling, and guardrails.
            </p>
          </div>

          <div className="bg-[#121218] border-2 border-zinc-800 rounded-xl sm:rounded-2xl p-5 sm:p-7 text-left shadow-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 sm:mb-5 border border-amber-500/40">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white mb-2">Agencies &amp; Consultants</h3>
            <p className="text-xs sm:text-sm font-medium text-zinc-300 leading-relaxed">
              Package custom AI workflow automations and sell high-ticket retainers (₹50k – ₹2L/mo) to clients eager to modernize.
            </p>
          </div>
        </div>

        {/* BOLD CTA #4 */}
        <div className="mt-8 sm:mt-12 text-center">
          <button
            onClick={() => triggerRegistration('audience_cta')}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl gold-btn text-xs sm:text-sm uppercase tracking-wider cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <span>Reserve Your Workshop Spot for ₹99 • Saturday Oct 10</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          9. INSTRUCTOR SECTION + CTA (RESPONSIVE)
      ──────────────────────────────────────────────────────────────────────── */}
      <section id="instructor" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-2 border-zinc-800">
        <div className="bg-[#121218] border-2 border-amber-500/40 rounded-2xl sm:rounded-3xl p-5 sm:p-12 relative shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="lg:col-span-4 text-center">
              <div className="w-28 h-28 sm:w-44 sm:h-44 rounded-2xl sm:rounded-3xl overflow-hidden mx-auto bg-zinc-900 border-2 border-amber-500/60 shadow-xl relative">
                <Image
                  src="/gnananand.jpg"
                  alt="Gnananand - 10+ Years Enterprise Sales Veteran & AI Mentor"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="mt-3 sm:mt-4">
                <h3 className="text-xl sm:text-2xl font-black text-white">Gnananand</h3>
                <p className="text-[11px] sm:text-xs text-amber-400 font-black tracking-wide uppercase mt-0.5">
                  10+ Years Enterprise Sales Veteran • AI Conversion Mentor
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/40">
                MEET YOUR SALES &amp; REVENUE AUTOMATION MENTOR
              </div>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white">
                Learn from Gnananand: 10+ Years of High-Stakes Sales &amp; Revenue Operations
              </h2>
              <p className="text-xs sm:text-base font-medium text-zinc-300 leading-relaxed">
                With over a decade of deep sales experience closing high-value deals and building scalable sales engines, Gnananand breaks down the exact methodologies to turn cold leads into paid clients using 24/7 autonomous AI sales agents—eliminating human delay and lost sales pipeline.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-4 pt-1 sm:pt-2 max-w-sm">
                <div className="bg-[#181822] border border-zinc-700 p-2.5 sm:p-3.5 rounded-xl text-center sm:text-left">
                  <div className="text-lg sm:text-2xl font-black text-amber-400">10+ Yrs</div>
                  <div className="text-[10px] sm:text-xs font-bold text-zinc-400">Sales Experience</div>
                </div>
                <div className="bg-[#181822] border border-zinc-700 p-2.5 sm:p-3.5 rounded-xl text-center sm:text-left">
                  <div className="text-lg sm:text-2xl font-black text-amber-400">4.9/5</div>
                  <div className="text-[10px] sm:text-xs font-bold text-zinc-400">Rating</div>
                </div>
              </div>

              {/* BOLD CTA #5 */}
              <div className="pt-2 sm:pt-3">
                <button
                  onClick={() => triggerRegistration('instructor_cta')}
                  className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl gold-btn text-xs sm:text-sm uppercase tracking-wider cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <span>Learn Sales Automation from Gnananand for ₹99</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          10. REVIEWS & TESTIMONIALS + CTA (RESPONSIVE)
      ──────────────────────────────────────────────────────────────────────── */}
      <section id="reviews" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-2 border-zinc-800">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-black border border-amber-500/30 mb-3">
            VERIFIED ATTENDEE REVIEWS
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            What Past Workshop Attendees Say
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 mt-2 sm:mt-3 font-medium">
            Real feedback from founders and tech leaders who attended past editions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          <div className="bg-[#121218] border-2 border-zinc-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-md">
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex text-amber-400 text-sm">{'★'.repeat(5)}</div>
              <p className="text-xs sm:text-sm font-medium text-zinc-300 leading-relaxed italic">
                "The ₹99 ticket price is almost comical for what you receive. The live multi-agent swarm demonstration alone saved our team months of trial and error. Implemented it on Monday morning."
              </p>
            </div>
            <div className="pt-3.5 mt-3.5 border-t border-zinc-800 flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500/20 text-amber-400 font-black flex items-center justify-center text-xs sm:text-sm border border-amber-500/40 shrink-0">
                RM
              </div>
              <div>
                <div className="text-sm font-black text-white">Rohan Mehta</div>
                <div className="text-xs font-bold text-amber-400">Founder, Aurelia D2C</div>
              </div>
            </div>
          </div>

          <div className="bg-[#121218] border-2 border-zinc-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-md">
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex text-amber-400 text-sm">{'★'.repeat(5)}</div>
              <p className="text-xs sm:text-sm font-medium text-zinc-300 leading-relaxed italic">
                "Hands down the best 2 hours I've spent this year on AI. No marketing fluff—straight into architecture, system prompts, and tool calling with live database sync."
              </p>
            </div>
            <div className="pt-3.5 mt-3.5 border-t border-zinc-800 flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500/20 text-amber-400 font-black flex items-center justify-center text-xs sm:text-sm border border-amber-500/40 shrink-0">
                PS
              </div>
              <div>
                <div className="text-sm font-black text-white">Pooja Sharma</div>
                <div className="text-xs font-bold text-amber-400">Head of Growth, FinScale</div>
              </div>
            </div>
          </div>

          <div className="bg-[#121218] border-2 border-zinc-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-md">
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex text-amber-400 text-sm">{'★'.repeat(5)}</div>
              <p className="text-xs sm:text-sm font-medium text-zinc-300 leading-relaxed italic">
                "The ₹12,000 prompt vault and blueprint they share at the end is pure gold. We closed a ₹75,000 AI automation retainer with a client using their exact architecture."
              </p>
            </div>
            <div className="pt-3.5 mt-3.5 border-t border-zinc-800 flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500/20 text-amber-400 font-black flex items-center justify-center text-xs sm:text-sm border border-amber-500/40 shrink-0">
                AK
              </div>
              <div>
                <div className="text-sm font-black text-white">Arjun Kulkarni</div>
                <div className="text-xs font-bold text-amber-400">Agency Director, NexusTech</div>
              </div>
            </div>
          </div>
        </div>

        {/* BOLD CTA #6 */}
        <div className="mt-8 sm:mt-12 text-center">
          <button
            onClick={() => triggerRegistration('reviews_cta')}
            className="w-full sm:w-auto px-6 sm:px-9 py-3.5 sm:py-4 rounded-xl gold-btn text-xs sm:text-sm uppercase tracking-wider cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <span>Join 1,400+ Workshop Alumni for ₹99</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          11. 100% SATISFACTION GUARANTEE + CTA (RESPONSIVE)
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-12 bg-gradient-to-b from-[#1C150A] to-[#100D06] border-2 border-amber-500/50 text-center relative shadow-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black mb-3 sm:mb-4 border border-amber-500/40">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" /> 100% RISK-FREE SATISFACTION GUARANTEE
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white">
            Attend for 30 Minutes. <br />
            If You're Not Blown Away, Get 100% Refund.
          </h2>

          <p className="text-xs sm:text-base font-medium text-zinc-300 mt-3 sm:mt-4 max-w-2xl mx-auto leading-relaxed">
            We are so confident this will be the highest ROI ₹99 you ever spend that if you don't find actionable value within the first half hour, simply email or WhatsApp us for an instant, no-questions-asked refund.
          </p>

          <div className="mt-6 sm:mt-8 flex justify-center">
            <button
              onClick={() => triggerRegistration('guarantee_cta')}
              className="w-full sm:w-auto px-6 sm:px-9 py-3.5 sm:py-4 rounded-xl gold-btn text-xs sm:text-sm uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Attend Risk-Free for ₹99 via Razorpay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 sm:mt-4 text-[11px] sm:text-xs font-bold text-amber-400">
            Saturday, Oct 10th • 10:00 AM – 12:00 PM IST • Only {seatsRemaining} spots remaining
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          12. FAQ ACCORDION + CLOSING CTA (RESPONSIVE)
      ──────────────────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t-2 border-zinc-800">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-black border border-amber-500/30 mb-3">
            <HelpCircle className="w-4 h-4 text-amber-400" /> GOT QUESTIONS?
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {[
            {
              q: 'When and where will the AI Automation Workshop take place?',
              a: 'The workshop is live on Saturday, October 10th from 10:00 AM to 12:00 PM IST on Zoom. The private Zoom meeting link will be sent to your WhatsApp and email immediately after checkout, and a reminder is sent 1 hour before start.',
            },
            {
              q: 'What if I cannot attend live on Saturday at 10 AM?',
              a: 'No problem! Every registered ticket holder receives lifetime access to the full 1080p HD recording, transcriptions, and all downloadable bonuses within 2 hours of completion.',
            },
            {
              q: 'Do I need a technical coding background to benefit?',
              a: 'No. The workshop focuses on high-level architecture, visual orchestrations, API webhooks, and production prompt engineering. We explain all concepts in clean, non-technical plain English with real-world demos.',
            },
            {
              q: 'Why is the price only ₹99 instead of ₹1,999?',
              a: 'We want to make modern agentic AI accessible to ambitious founders and creators in our ecosystem. We make our revenue when businesses choose to hire AuromindAI for custom enterprise implementations.',
            },
            {
              q: 'How does payment work with Razorpay?',
              a: 'Payments are securely processed through Razorpay with 256-bit bank-grade encryption. You can pay with UPI (Google Pay, PhonePe, Paytm), Credit Cards, Debit Cards, or NetBanking. You receive an instant digital receipt and calendar confirmation.',
            },
            {
              q: 'Will I get an opportunity to ask questions during the session?',
              a: 'Yes! The last 30 minutes (11:30 AM to 12:00 PM) are dedicated to live interactive Q&A where we review attendee use cases and perform live workflow teardowns.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#121218] border-2 border-zinc-800 rounded-xl sm:rounded-2xl overflow-hidden transition-all shadow-md"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full text-left px-4 sm:px-6 py-3.5 sm:py-5 flex items-center justify-between text-sm sm:text-base font-black text-white hover:text-amber-400 transition-colors cursor-pointer gap-2"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-amber-400 transition-transform duration-200 shrink-0 ${
                    activeFaq === idx ? 'rotate-180 text-amber-400' : ''
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm font-medium text-zinc-300 leading-relaxed border-t border-zinc-800">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FINAL CLOSING CTA BANNER */}
        <div className="mt-10 sm:mt-16 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#20170A] via-[#2D210E] to-[#20170A] border-2 border-amber-500/60 text-center shadow-2xl">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3 border border-amber-500/40">
            <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
          </div>
          <h3 className="text-xl sm:text-3xl font-black text-white">
            Have More Questions? Get Started for ₹99 Today.
          </h3>
          <p className="text-xs sm:text-sm font-medium text-zinc-300 max-w-xl mx-auto mt-2">
            You literally have zero risk with our 100% money-back guarantee. Lock in your live seat for Saturday, Oct 10th (10 AM - 12 PM) and get the ₹12,000 bonus vault immediately.
          </p>
          <div className="mt-5 sm:mt-6 flex justify-center">
            <button
              onClick={() => triggerRegistration('final_faq_cta')}
              className="w-full sm:w-auto px-6 sm:px-9 py-3.5 sm:py-4 rounded-xl gold-btn text-xs sm:text-sm uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Get Instant Access for ₹99 Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          13. FOOTER (RESPONSIVE)
      ──────────────────────────────────────────────────────────────────────── */}
      <footer className="border-t-2 border-zinc-800 bg-[#070709] py-8 sm:py-12 px-3 sm:px-6 lg:px-8 text-center text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center gap-2 font-black text-white text-sm sm:text-base">
            <div className="w-6 h-6 rounded-lg overflow-hidden bg-zinc-900 border border-emerald-500/40 p-0.5 flex items-center justify-center">
              <Image src="/logo.png" alt="AuromindAI" width={20} height={20} className="object-contain" />
            </div>
            <span>Auromind<span className="text-[#00D06C]">AI</span> Private Limited</span>
          </div>
          <p className="max-w-xl mx-auto text-zinc-400 font-medium text-xs">
            Empowering modern businesses with autonomous AI employees, autonomous agents, and intelligence workflows.
          </p>
          <div className="text-[10px] sm:text-[11px] text-zinc-500 pt-2 sm:pt-4 font-medium">
            © 2026 AuromindAI Private Limited. All rights reserved. Secure Razorpay Checkout.
          </div>
        </div>
      </footer>

      {/* ────────────────────────────────────────────────────────────────────────
          14. FIXED BOTTOM STICKY CONVERSION BAR (OPTIMIZED FOR MOBILE & DESKTOP)
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#0E0E14]/98 border-t-2 border-amber-500/50 backdrop-blur-xl px-3 py-2.5 sm:px-6 sm:py-3.5 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-500/20 border border-amber-500/40 hidden sm:flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-[11px] sm:text-xs font-black text-amber-400 flex items-center gap-1 uppercase leading-tight">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                <span className="truncate">Sat, Oct 10 • 10 AM - 12 PM IST</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-sm sm:text-xl font-black text-white leading-none">₹99</span>
                <span className="text-[10px] sm:text-xs line-through text-zinc-500">₹1,999</span>
                <span className="text-[9px] sm:text-[10px] font-black text-amber-400 bg-amber-950/80 px-1 py-0.2 rounded border border-amber-500/40">
                  95% OFF
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/ai-webinar/checkout"
            className="py-2.5 px-4 sm:py-3 sm:px-6 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:via-yellow-300 hover:to-amber-400 text-black text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_22px_rgba(245,158,11,0.65)] shrink-0 active:scale-95 transition-all"
          >
            <span>Unlock Sales • ₹99</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────────
          15. INSTANT GOLD CHECKOUT MODAL (RESPONSIVE)
      ──────────────────────────────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#121218] border-2 border-amber-500/60 rounded-2xl sm:rounded-3xl p-4 sm:p-8 w-full max-w-[94vw] sm:max-w-md relative shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 text-zinc-400 hover:text-white p-1.5 rounded-full bg-zinc-900 border border-zinc-700 cursor-pointer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="text-center pb-3.5 sm:pb-4 border-b border-zinc-800 pr-6">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-black border border-amber-500/40 mb-1.5">
                <Crown className="w-3 h-3 text-amber-400" />
                AI AUTOMATION WORKSHOP
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-white">
                Reserve Your ₹99 Seat
              </h3>
              <p className="text-[11px] sm:text-xs font-bold text-amber-400 mt-0.5">
                Saturday, Oct 10 • 10:00 AM to 12:00 PM IST
              </p>
            </div>

            {errorMessage && (
              <div className="mt-3 p-2.5 rounded-xl bg-red-950/80 border-2 border-red-500 text-red-200 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleRegisterAndPay} className="mt-3.5 sm:mt-4 space-y-3">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-zinc-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Santhosh Kumar"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#181822] border-2 border-zinc-700 text-white placeholder-zinc-500 text-sm font-bold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-zinc-300 mb-1">
                  Email (For Zoom Link)
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#181822] border-2 border-zinc-700 text-white placeholder-zinc-500 text-sm font-bold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-zinc-300 mb-1">
                  WhatsApp Number
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-black text-amber-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full pl-11 pr-3.5 py-2.5 rounded-xl bg-[#181822] border-2 border-zinc-700 text-white placeholder-zinc-500 text-sm font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#181822] border-2 border-amber-500/40 flex items-center justify-between text-xs">
                <div>
                  <span className="font-black text-white">Workshop Fee:</span>
                  <span className="text-zinc-400 text-[10px] ml-1">(4 Bonuses Free)</span>
                </div>
                <div className="text-lg sm:text-xl font-black text-amber-400">₹99</div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl gold-btn text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer font-black"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Processing Razorpay...</span>
                  </>
                ) : (
                  <>
                    <span>Pay ₹99 &amp; Confirm Ticket</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-3 text-center text-[11px] font-bold text-zinc-400">
              🔒 256-Bit SSL Encryption • Instant Razorpay Checkout
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────────
          16. REGISTRATION SUCCESS CONFIRMATION MODAL (RESPONSIVE)
      ──────────────────────────────────────────────────────────────────────── */}
      {confirmedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#121218] border-2 border-amber-500/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 w-full max-w-[94vw] sm:max-w-lg text-center relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3 sm:mb-4 border-2 border-amber-500/50">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>

            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-black mb-2 border border-amber-500/40">
              PAYMENT VERIFIED • WORKSHOP SEAT CONFIRMED
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">
              You're In, {confirmedTicket.attendeeName}!
            </h3>

            <p className="text-xs font-medium text-zinc-300 mt-1 sm:mt-2">
              Your registration for the 2-Hour Live AI Automation Workshop on Saturday, Oct 10th has been confirmed.
            </p>

            {/* Ticket Card Details */}
            <div className="my-4 sm:my-5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#181822] border-2 border-zinc-700 text-left space-y-2 text-xs font-bold">
              <div className="flex justify-between text-zinc-300">
                <span className="text-zinc-400">Event:</span>
                <span className="text-white">AI Automation Workshop</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span className="text-zinc-400">Date &amp; Day:</span>
                <span className="text-white">Saturday, October 10, 2026</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span className="text-zinc-400">Time:</span>
                <span className="text-amber-400">10:00 AM – 12:00 PM IST</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span className="text-zinc-400">Platform:</span>
                <span className="text-white">Zoom Live (+ Lifetime Recording)</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span className="text-zinc-400">Amount Paid:</span>
                <span className="text-amber-400">{confirmedTicket.amountPaid} (Razorpay)</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span className="text-zinc-400">Ticket ID:</span>
                <span className="font-mono text-zinc-400 truncate max-w-[160px]">{confirmedTicket.registrationId}</span>
              </div>
            </div>

            {/* Action buttons: Add to Google Calendar */}
            <div className="space-y-2.5 sm:space-y-3">
              <a
                href={confirmedTicket.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 sm:py-3.5 px-4 rounded-xl gold-btn text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer font-black"
              >
                <Calendar className="w-4 h-4" />
                <span>Add to Google Calendar (1-Click)</span>
              </a>

              <button
                onClick={() => setConfirmedTicket(null)}
                className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs transition-colors border border-zinc-700 cursor-pointer"
              >
                Close &amp; View Details
              </button>
            </div>

            <p className="text-[10px] sm:text-[11px] font-medium text-zinc-400 mt-3 sm:mt-4">
              A copy of your ticket and bonuses download link has been sent to {confirmedTicket.attendeeEmail}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
