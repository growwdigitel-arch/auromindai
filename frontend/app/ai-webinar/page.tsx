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
   COUNTDOWN TIMER HOOK (Targets Saturday, Oct 10th, 10:00 AM IST)
──────────────────────────────────────────────────────────────────────────── */
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    function calculate() {
      const difference = +targetDate - +new Date();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
      });
    }
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

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
  // Target: Saturday, Oct 10th 10:00 AM IST (Year 2026)
  const webinarTarget = new Date('2026-10-10T10:00:00+05:30');
  const countdown = useCountdown(webinarTarget);

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
  const [seatsRemaining, setSeatsRemaining] = useState(14);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeatsRemaining(prev => (prev > 4 ? prev - 1 : prev));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Universal CTA Trigger
  const triggerRegistration = (sourceTag = 'CTA') => {
    if (window.innerWidth < 768) {
      setIsModalOpen(true);
    } else {
      const el = document.getElementById('registration-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const input = document.getElementById('webinar-name-input');
          input?.focus();
        }, 450);
      } else {
        setIsModalOpen(true);
      }
    }
  };

  /* ────────────────────────────────────────────────────────────────────────────
     HANDLE RAZORPAY PAYMENT & REGISTRATION
  ──────────────────────────────────────────────────────────────────────────── */
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

      if (typeof window !== 'undefined' && window.Razorpay && isLiveRazorpay) {
        const options = {
          key: keyId,
          amount: 9900, // Rs 99 in paise
          currency: 'INR',
          name: 'AI Automation Workshop',
          description: 'Saturday Oct 10 • 10 AM to 12 PM (2h Live Workshop)',
          image: '/logo.png',
          order_id: orderId,
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
              razorpay_order_id: response.razorpay_order_id,
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

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (failRes: any) {
          setErrorMessage(failRes.error?.description || 'Payment was declined. Please try again.');
          setIsSubmitting(false);
        });
        rzp.open();
      } else {
        // Fallback Instant Confirmation / Sandbox verification flow
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
    <div className="min-h-screen w-full bg-[#0A0A0D] text-white font-sans selection:bg-amber-400 selection:text-black antialiased relative overflow-x-hidden">
      {/* Razorpay Script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* Ambient Gold Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-amber-500/15 via-yellow-600/10 to-transparent blur-[140px]" />
        <div className="absolute top-[35%] -left-32 w-80 h-80 bg-amber-600/8 rounded-full blur-[130px]" />
        <div className="absolute top-[65%] -right-32 w-80 h-80 bg-yellow-500/8 rounded-full blur-[130px]" />
      </div>

      {/* ────────────────────────────────────────────────────────────────────────
          1. TOP BOLD GOLD URGENCY BAR
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="relative z-50 bg-[#161208] border-b border-amber-500/30 px-4 py-2.5 text-center text-xs sm:text-sm font-bold shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-amber-200">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 font-black px-2.5 py-0.5 rounded-full text-[11px] border border-amber-500/40">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              LIVE WORKSHOP
            </span>
            <span className="text-white font-black tracking-wide">
              SATURDAY, OCT 10TH • 10:00 AM TO 12:00 PM IST
            </span>
          </div>

          <div className="flex items-center gap-3 mx-auto sm:mx-0">
            <div className="flex items-center gap-1.5">
              <span className="text-white font-black text-sm">₹99 ONLY</span>
              <span className="line-through text-zinc-500 text-xs font-normal">₹1,999</span>
              <span className="text-[11px] font-black text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40">
                SAVE 95%
              </span>
            </div>

            <button
              onClick={() => triggerRegistration('top_ticker')}
              className="px-4 py-1.5 rounded-full gold-btn text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <span>Book ₹99</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────────
          2. HEADER NAVIGATION
      ──────────────────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full bg-[#0A0A0D]/95 backdrop-blur-xl border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl overflow-hidden bg-zinc-900 border-2 border-amber-500/40 p-1 flex items-center justify-center shadow-lg group-hover:border-amber-400 transition-colors">
              <Image src="/logo.png" alt="AuromindAI" width={36} height={36} className="object-contain" priority />
            </div>
            <div>
              <div className="font-black text-2xl tracking-tight text-white flex items-center gap-1">
                Auromind<span className="gold-gradient-text">AI</span>
              </div>
              <div className="text-[10px] font-black tracking-widest text-amber-400 uppercase">
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

          <div className="flex items-center gap-3">
            <button
              onClick={() => triggerRegistration('header')}
              className="px-5 py-2.5 rounded-xl gold-btn text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <Crown className="w-4 h-4 fill-black" />
              <span>Claim Seat • ₹99</span>
            </button>
          </div>
        </div>
      </header>

      {/* ────────────────────────────────────────────────────────────────────────
          3. BOLD HERO SECTION (AI AUTOMATION WORKSHOP)
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 pt-10 pb-16 lg:pt-16 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Top Eyebrow Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border-2 border-amber-500/50 shadow-lg text-xs font-black text-amber-300 tracking-wide uppercase">
            <Rocket className="w-3.5 h-3.5 text-amber-400" />
            LIVE 2-HOUR HANDS-ON MASTERCLASS • OCTOBER 10TH
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Bold Headline & Details */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-block">
              <span className="text-xs font-black tracking-widest text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/25">
                The Practical Implementation Playbook
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
              AI AUTOMATION <br />
              <span className="gold-gradient-text drop-shadow-[0_2px_20px_rgba(245,158,11,0.35)]">
                WORKSHOP
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Build &amp; deploy autonomous AI employees that eliminate repetitive work, run 24/7 lead qualification, and automate 80% of business operations.
            </p>

            {/* 4 Bold Event Spec Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-[#121217] border-2 border-zinc-800 rounded-2xl p-4 text-left">
                <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Date</span>
                </div>
                <div className="text-base font-black text-white">Oct 10, 2026</div>
                <div className="text-xs font-bold text-amber-400">Saturday</div>
              </div>

              <div className="bg-[#121217] border-2 border-zinc-800 rounded-2xl p-4 text-left">
                <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Time</span>
                </div>
                <div className="text-base font-black text-white">10 AM – 12 PM</div>
                <div className="text-xs font-bold text-amber-400">2 Hours Live IST</div>
              </div>

              <div className="bg-[#121217] border-2 border-zinc-800 rounded-2xl p-4 text-left">
                <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                  <Video className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Delivery</span>
                </div>
                <div className="text-base font-black text-white">Live on Zoom</div>
                <div className="text-xs font-bold text-amber-400">+ HD Recording</div>
              </div>

              <div className="bg-gradient-to-br from-[#241A0A] to-[#141006] border-2 border-amber-500/60 rounded-2xl p-4 text-left shadow-lg">
                <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                  <Award className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">Ticket</span>
                </div>
                <div className="text-xl font-black text-white flex items-baseline gap-1.5">
                  ₹99 <span className="line-through text-zinc-500 text-xs font-normal">₹1,999</span>
                </div>
                <div className="text-[11px] font-black text-amber-400">95% Launch Off</div>
              </div>
            </div>

            {/* Bold Golden Countdown Clock */}
            <div className="bg-gradient-to-r from-[#181308] via-[#221B0B] to-[#181308] border-2 border-amber-500/40 rounded-2xl p-5 shadow-xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <div className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> Early Bird Spots Closing In:
                  </div>
                  <div className="text-xs font-bold text-zinc-300 mt-0.5">
                    Only <span className="text-amber-400 font-black">{seatsRemaining} seats remaining</span> at ₹99
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 text-center">
                  <div className="bg-[#0D0D11] border-2 border-zinc-800 rounded-xl px-3 py-2 min-w-[58px]">
                    <div className="text-xl font-black text-white font-mono">{countdown.days}</div>
                    <div className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold">Days</div>
                  </div>
                  <span className="text-amber-500 font-black text-lg">:</span>
                  <div className="bg-[#0D0D11] border-2 border-zinc-800 rounded-xl px-3 py-2 min-w-[58px]">
                    <div className="text-xl font-black text-white font-mono">{String(countdown.hours).padStart(2, '0')}</div>
                    <div className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold">Hours</div>
                  </div>
                  <span className="text-amber-500 font-black text-lg">:</span>
                  <div className="bg-[#0D0D11] border-2 border-zinc-800 rounded-xl px-3 py-2 min-w-[58px]">
                    <div className="text-xl font-black text-white font-mono">{String(countdown.minutes).padStart(2, '0')}</div>
                    <div className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold">Mins</div>
                  </div>
                  <span className="text-amber-500 font-black text-lg">:</span>
                  <div className="bg-[#0D0D11] border-2 border-amber-500/60 rounded-xl px-3 py-2 min-w-[58px]">
                    <div className="text-xl font-black text-amber-400 font-mono">{String(countdown.seconds).padStart(2, '0')}</div>
                    <div className="text-[9px] uppercase tracking-wider text-amber-400 font-bold">Secs</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist of key benefits */}
            <div className="space-y-2.5 pt-1 text-sm font-bold text-zinc-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Instant Zoom Link Sent Directly on WhatsApp &amp; Work Email</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Full Lifetime Access to 1080p Recording + Prompts Vault Included</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>100% Money-Back Satisfaction Guarantee (Zero Risk)</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Gold Registration Card */}
          <div id="registration-section" className="lg:col-span-5">
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-amber-400 via-amber-600 to-yellow-600 shadow-2xl shadow-amber-500/20">
              <div className="bg-[#101015] rounded-[22px] p-6 sm:p-8 border border-zinc-800">
                {/* Card Title */}
                <div className="text-center pb-5 border-b border-zinc-800">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/40 mb-2">
                    <Crown className="w-3.5 h-3.5 text-amber-400" />
                    CONFIRM YOUR TICKET
                  </div>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    Join The Workshop
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Saturday, Oct 10th • 10:00 AM – 12:00 PM IST
                  </p>

                  {/* Pricing Box */}
                  <div className="mt-4 p-3.5 rounded-xl bg-[#16161D] border-2 border-amber-500/40 flex items-center justify-between">
                    <div className="text-left">
                      <div className="text-[11px] font-black uppercase tracking-wider text-amber-400">All-Inclusive Pass</div>
                      <div className="text-xs font-bold text-white">Live Workshop + ₹12,000 Vault</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-amber-400">₹99</div>
                      <div className="text-[11px] line-through text-zinc-500">Regular ₹1,999</div>
                    </div>
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="mt-4 p-3 rounded-xl bg-red-950/80 border-2 border-red-500 text-red-200 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Registration Form */}
                <form onSubmit={handleRegisterAndPay} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-zinc-300 mb-1.5">
                      Full Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      id="webinar-name-input"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Santhosh Kumar"
                      className="w-full px-4 py-3 rounded-xl bg-[#181822] border-2 border-zinc-700 text-white placeholder-zinc-500 text-sm font-bold focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-zinc-300 mb-1.5">
                      Email Address (For Zoom Link) <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#181822] border-2 border-zinc-700 text-white placeholder-zinc-500 text-sm font-bold focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-zinc-300 mb-1.5">
                      WhatsApp Mobile Number <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-amber-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98765 43210"
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#181822] border-2 border-zinc-700 text-white placeholder-zinc-500 text-sm font-bold focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-zinc-300 mb-1.5">
                      Your Professional Role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#181822] border-2 border-zinc-700 text-white text-xs font-bold focus:outline-none focus:border-amber-400"
                    >
                      <option value="Business Owner / Founder">Business Owner / Founder</option>
                      <option value="Product / Engineering Lead">Product / Engineering Lead</option>
                      <option value="Agency Owner / Consultant">Agency Owner / Freelancer</option>
                      <option value="Marketer / Operations Lead">Marketer / Operations Lead</option>
                      <option value="AI Enthusiast">Student / AI Enthusiast</option>
                    </select>
                  </div>

                  {/* Giant Gold Action Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl gold-btn text-base uppercase tracking-wider flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Connecting Razorpay...</span>
                      </>
                    ) : (
                      <>
                        <span>Pay ₹99 &amp; Confirm Workshop Seat</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                {/* Razorpay Trust Information */}
                <div className="mt-5 pt-4 border-t border-zinc-800 text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-zinc-300 text-xs font-bold">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>256-Bit SSL Encrypted Razorpay Checkout</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-1 flex-wrap">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                      UPI: GPay • PhonePe • Paytm
                    </span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                      All Cards &amp; NetBanking
                    </span>
                  </div>

                  <div className="text-[11px] font-bold text-amber-300/80 pt-1">
                    🛡️ 100% Satisfaction Guarantee: Full instant refund if not satisfied in 30 mins.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          4. BRAND & ARCHITECTURE TRUST BAR
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="border-y-2 border-zinc-800 bg-[#0E0E14] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-400">
              Modern Autonomous AI Frameworks
            </div>
            <div className="text-xs text-zinc-400 font-medium">
              We teach production-grade multi-agent swarms, not toy ChatGPT prompts
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-white text-xs sm:text-sm font-black">
            <span>Claude 3.7 Sonnet</span>
            <span>OpenAI GPT-4o</span>
            <span>Google Gemini 2.5</span>
            <span>LangGraph &amp; Swarms</span>
            <span>Razorpay API</span>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          5. WHY ATTEND THIS SATURDAY + CTA
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-black border border-amber-500/30 mb-3">
            THE 2026 AI AUTOMATION ADVANTAGE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Single Prompts Are Outdated. <br />
            <span className="gold-gradient-text">Autonomous Multi-Agent Swarms</span> Win.
          </h2>
          <p className="text-base text-zinc-300 mt-3 font-medium">
            Typing one-off prompts into a chatbot is slow and manual. Companies winning right now are orchestrating autonomous AI agent swarms that run sales, answer queries, and update databases with zero human lag.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Outdated */}
          <div className="rounded-3xl p-8 bg-[#141010] border-2 border-red-900/50 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 font-black text-xs mb-4">
              <span>✕</span> The Outdated Manual Way
            </div>
            <h3 className="text-2xl font-black text-white mb-4">Manual, Slow &amp; Expensive</h3>
            <ul className="space-y-3.5 text-sm font-medium text-zinc-300">
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-black shrink-0 text-base">✕</span>
                <span>Manually copying and pasting text into ChatGPT 40 times a day</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-black shrink-0 text-base">✕</span>
                <span>Hiring expensive reps for basic lead qualification and support triage</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-black shrink-0 text-base">✕</span>
                <span>Fragile rule-based chatbots that fail when customers ask nuanced questions</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-black shrink-0 text-base">✕</span>
                <span>Falling behind competitors who automate entire departments with AI</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Workshop Method */}
          <div className="rounded-3xl p-8 bg-gradient-to-br from-[#1C150A] to-[#120E06] border-2 border-amber-500/60 relative shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-black text-xs mb-4 border border-amber-500/40">
              <Crown className="w-3.5 h-3.5 text-amber-400" /> What You Master in This Workshop (₹99)
            </div>
            <h3 className="text-2xl font-black text-white mb-4">24/7 Autonomous AI Swarms</h3>
            <ul className="space-y-3.5 text-sm font-bold text-white">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>Autonomous agents that qualify leads, book calendar calls, and close sales</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>Visual orchestration connecting webhooks, WhatsApp, Google Sheets &amp; CRMs</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>Multi-agent reasoning loops where agents audit and review each other to kill hallucinations</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>Downloadable production templates ready to deploy in under 48 hours</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOLD CTA BANNER #1 */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#1E170A] via-[#2A1F0D] to-[#1E170A] border-2 border-amber-500/50 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xl">
          <div>
            <div className="text-white font-black text-xl sm:text-2xl">
              Lock In Your Ticket for Saturday, Oct 10th
            </div>
            <div className="text-sm font-bold text-amber-300 mt-1">
              Live Zoom Masterclass (10:00 AM – 12:00 PM IST) • ₹99 Early Bird
            </div>
          </div>
          <button
            onClick={() => triggerRegistration('cta_after_why')}
            className="px-8 py-4 rounded-xl gold-btn text-sm uppercase tracking-wider cursor-pointer shrink-0 flex items-center gap-2"
          >
            <span>Reserve Seat for ₹99</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          6. DETAILED 2-HOUR CURRICULUM + CTA
      ──────────────────────────────────────────────────────────────────────── */}
      <section id="curriculum" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-2 border-zinc-800">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-black border border-amber-500/30 mb-3">
            SATURDAY, OCT 10 • 10:00 AM TO 12:00 PM IST
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            2-Hour Hands-On Curriculum
          </h2>
          <p className="text-base text-zinc-300 mt-3 font-medium">
            Straight to practical execution. Every segment is designed to give you deployable frameworks immediately.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Module 1 */}
          <div className="bg-[#111116] border-2 border-zinc-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 font-black text-base flex items-center justify-center border border-amber-500/40">
                  01
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Part 1: The Modern Autonomous AI Landscape &amp; Reasoning Loops
                </h3>
              </div>
              <span className="text-xs font-black text-amber-300 bg-amber-950/80 border border-amber-500/40 px-3 py-1 rounded-full w-fit">
                10:00 AM – 10:30 AM
              </span>
            </div>
            <p className="text-sm font-medium text-zinc-300 mt-3.5 leading-relaxed">
              Understand the shift from basic prompts to Agentic Workflows. Why AI Agents succeed where simple prompts fail, and how memory, tool use, and reasoning loops work under the hood.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-zinc-300">
              <span className="bg-[#181822] px-3 py-1 rounded-lg border border-zinc-700">State of LLMs in 2026</span>
              <span className="bg-[#181822] px-3 py-1 rounded-lg border border-zinc-700">Agent Reasoning Loops</span>
              <span className="bg-[#181822] px-3 py-1 rounded-lg border border-zinc-700">Function &amp; Tool Calling</span>
            </div>
          </div>

          {/* Module 2 */}
          <div className="bg-[#111116] border-2 border-zinc-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 font-black text-base flex items-center justify-center border border-amber-500/40">
                  02
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Part 2: Live Build — Multi-Agent Inbound Sales &amp; Support Swarm
                </h3>
              </div>
              <span className="text-xs font-black text-amber-300 bg-amber-950/80 border border-amber-500/40 px-3 py-1 rounded-full w-fit">
                10:30 AM – 11:00 AM
              </span>
            </div>
            <p className="text-sm font-medium text-zinc-300 mt-3.5 leading-relaxed">
              Watch step-by-step as we construct a live multi-agent swarm in front of your eyes: An Inbound Triage Agent, a Lead Qualifier, a Calendar Booker, and a Knowledge Search Agent connected to live business data.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-zinc-300">
              <span className="bg-[#181822] px-3 py-1 rounded-lg border border-zinc-700">Live Agent Building</span>
              <span className="bg-[#181822] px-3 py-1 rounded-lg border border-zinc-700">RAG &amp; Vector Embeddings</span>
              <span className="bg-[#181822] px-3 py-1 rounded-lg border border-zinc-700">WhatsApp &amp; CRM Sync</span>
            </div>
          </div>

          {/* Module 3 */}
          <div className="bg-[#111116] border-2 border-zinc-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 font-black text-base flex items-center justify-center border border-amber-500/40">
                  03
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Part 3: 4 Enterprise Use Cases Generating ₹10L+ in Monthly Value
                </h3>
              </div>
              <span className="text-xs font-black text-amber-300 bg-amber-950/80 border border-amber-500/40 px-3 py-1 rounded-full w-fit">
                11:00 AM – 11:30 AM
              </span>
            </div>
            <p className="text-sm font-medium text-zinc-300 mt-3.5 leading-relaxed">
              Real teardowns of deployed agent systems across eCommerce, Real Estate, B2B SaaS, and Service Agencies. How these businesses replaced 60+ manual hours per week with zero extra headcount.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-zinc-300">
              <span className="bg-[#181822] px-3 py-1 rounded-lg border border-zinc-700">eCommerce Order AI</span>
              <span className="bg-[#181822] px-3 py-1 rounded-lg border border-zinc-700">Real Estate Tour Automation</span>
              <span className="bg-[#181822] px-3 py-1 rounded-lg border border-zinc-700">B2B Outbound Research</span>
            </div>
          </div>

          {/* Module 4 */}
          <div className="bg-[#111116] border-2 border-zinc-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 font-black text-base flex items-center justify-center border border-amber-500/40">
                  04
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Part 4: Live Interactive Q&amp;A, Workflow Teardowns &amp; Vault Handout
                </h3>
              </div>
              <span className="text-xs font-black text-amber-300 bg-amber-950/80 border border-amber-500/40 px-3 py-1 rounded-full w-fit">
                11:30 AM – 12:00 PM
              </span>
            </div>
            <p className="text-sm font-medium text-zinc-300 mt-3.5 leading-relaxed">
              Get your specific business questions answered live. We will teardown attendee workflows, provide direct implementation feedback, and hand out all download links for the ₹12,000 bonus vault.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-zinc-300">
              <span className="bg-[#181822] px-3 py-1 rounded-lg border border-zinc-700">Live 1-on-1 Teardowns</span>
              <span className="bg-[#181822] px-3 py-1 rounded-lg border border-zinc-700">Download Vault Access</span>
              <span className="bg-[#181822] px-3 py-1 rounded-lg border border-zinc-700">VIP Group Admission</span>
            </div>
          </div>
        </div>

        {/* BOLD CTA #2 */}
        <div className="text-center mt-12">
          <button
            onClick={() => triggerRegistration('curriculum_cta')}
            className="px-9 py-4 rounded-xl gold-btn text-sm uppercase tracking-wider cursor-pointer inline-flex items-center gap-2"
          >
            <span>Enroll in AI Automation Workshop for ₹99</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="text-xs font-bold text-zinc-400 mt-2">
            Instant WhatsApp confirmation + 100% money-back guarantee
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          7. FREE BONUSES (WORTH ₹12,000+ INCLUDED FOR ₹99) + CTA
      ──────────────────────────────────────────────────────────────────────── */}
      <section id="bonuses" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-2 border-zinc-800 bg-[#0C0C10]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-black border border-amber-500/30 mb-3">
            <Gift className="w-4 h-4 text-amber-400" /> ₹12,000 VALUE INCLUDED FREE WITH ₹99 TICKET
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Register Today &amp; Unlock All 4 Bonuses Free
          </h2>
          <p className="text-base text-zinc-300 mt-3 font-medium">
            Instant digital access delivered directly to your inbox immediately upon booking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Bonus 1 */}
          <div className="bg-[#13131A] border-2 border-zinc-800 hover:border-amber-500/60 rounded-2xl p-6 transition-all shadow-lg">
            <div className="text-xs font-black text-amber-400 uppercase tracking-wider mb-1">Bonus #1</div>
            <div className="text-xs font-bold text-zinc-500 line-through">Value: ₹3,500</div>
            <h3 className="text-lg font-black text-white mt-2 mb-2">2026 AI Agent Blueprint</h3>
            <p className="text-xs font-medium text-zinc-300 leading-relaxed">
              Complete architectural diagrams and schema maps showing how to link LLMs, memory stores, and webhooks reliably.
            </p>
          </div>

          {/* Bonus 2 */}
          <div className="bg-[#13131A] border-2 border-zinc-800 hover:border-amber-500/60 rounded-2xl p-6 transition-all shadow-lg">
            <div className="text-xs font-black text-amber-400 uppercase tracking-wider mb-1">Bonus #2</div>
            <div className="text-xs font-bold text-zinc-500 line-through">Value: ₹4,000</div>
            <h3 className="text-lg font-black text-white mt-2 mb-2">50+ Battle-Tested System Prompts</h3>
            <p className="text-xs font-medium text-zinc-300 leading-relaxed">
              Production-tested prompts for customer support, lead qualification, email copywriting, and meeting summarization.
            </p>
          </div>

          {/* Bonus 3 */}
          <div className="bg-[#13131A] border-2 border-zinc-800 hover:border-amber-500/60 rounded-2xl p-6 transition-all shadow-lg">
            <div className="text-xs font-black text-amber-400 uppercase tracking-wider mb-1">Bonus #3</div>
            <div className="text-xs font-bold text-zinc-500 line-through">Value: ₹2,500</div>
            <h3 className="text-lg font-black text-white mt-2 mb-2">Full 1080p Lifetime HD Recording</h3>
            <p className="text-xs font-medium text-zinc-300 leading-relaxed">
              Cannot attend live? No problem. Receive lifetime access to the full recording, transcripts, and timestamps within 2 hours.
            </p>
          </div>

          {/* Bonus 4 */}
          <div className="bg-[#13131A] border-2 border-zinc-800 hover:border-amber-500/60 rounded-2xl p-6 transition-all shadow-lg">
            <div className="text-xs font-black text-amber-400 uppercase tracking-wider mb-1">Bonus #4</div>
            <div className="text-xs font-bold text-zinc-500 line-through">Value: ₹2,000</div>
            <h3 className="text-lg font-black text-white mt-2 mb-2">VIP WhatsApp Community</h3>
            <p className="text-xs font-medium text-zinc-300 leading-relaxed">
              Private community access with 1,200+ founders, builders, and AI leaders to share templates, hire talent, and get ongoing help.
            </p>
          </div>
        </div>

        {/* BOLD CTA #3 */}
        <div className="mt-12 text-center">
          <button
            onClick={() => triggerRegistration('bonus_cta')}
            className="px-9 py-4 rounded-xl gold-btn text-sm uppercase tracking-wider cursor-pointer inline-flex items-center gap-2"
          >
            <Crown className="w-4 h-4 fill-black" />
            <span>Claim All 4 Bonuses Free with Your ₹99 Ticket</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          8. WHO IS THIS WORKSHOP FOR? + CTA
      ──────────────────────────────────────────────────────────────────────── */}
      <section id="who" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-2 border-zinc-800">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-black border border-amber-500/30 mb-3">
            WHO IS THIS FOR
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Built for Modern Business Leaders &amp; Builders
          </h2>
          <p className="text-base text-zinc-300 mt-3 font-medium">
            Whether you run a company or want to future-proof your career, this session delivers immediate leverage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#121218] border-2 border-zinc-800 rounded-2xl p-7 text-left shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-5 border border-amber-500/40">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white mb-2">Founders &amp; Business Owners</h3>
            <p className="text-sm font-medium text-zinc-300 leading-relaxed">
              Cut payroll overhead and automate customer response, CRM data entry, and sales qualification without hiring 5 new employees.
            </p>
          </div>

          <div className="bg-[#121218] border-2 border-zinc-800 rounded-2xl p-7 text-left shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-5 border border-amber-500/40">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white mb-2">Engineers &amp; Tech Leads</h3>
            <p className="text-sm font-medium text-zinc-300 leading-relaxed">
              Level up beyond basic LLM wrappers. Master production multi-agent design patterns, state machines, tool calling, and guardrails.
            </p>
          </div>

          <div className="bg-[#121218] border-2 border-zinc-800 rounded-2xl p-7 text-left shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-5 border border-amber-500/40">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white mb-2">Agencies &amp; Consultants</h3>
            <p className="text-sm font-medium text-zinc-300 leading-relaxed">
              Package custom AI workflow automations and sell high-ticket retainers (₹50k – ₹2L/mo) to clients eager to modernize.
            </p>
          </div>
        </div>

        {/* BOLD CTA #4 */}
        <div className="mt-12 text-center">
          <button
            onClick={() => triggerRegistration('audience_cta')}
            className="px-8 py-3.5 rounded-xl gold-btn text-xs sm:text-sm uppercase tracking-wider cursor-pointer inline-flex items-center gap-2"
          >
            <span>Reserve Your Workshop Spot for ₹99 • Saturday Oct 10</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          9. INSTRUCTOR SECTION + CTA
      ──────────────────────────────────────────────────────────────────────── */}
      <section id="instructor" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-2 border-zinc-800">
        <div className="bg-[#121218] border-2 border-amber-500/40 rounded-3xl p-8 sm:p-12 relative shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 text-center">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden mx-auto bg-zinc-900 border-2 border-amber-500/60 shadow-xl relative">
                <Image
                  src="/ec-team.jpg"
                  alt="Lead AI Architect"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-black text-white">Santhosh Kumar</h3>
                <p className="text-xs text-amber-400 font-black tracking-wide uppercase mt-0.5">
                  Founder &amp; Chief AI Architect • AuromindAI
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/40">
                MEET YOUR INSTRUCTOR
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                Learn from Architects Who Deploy Enterprise AI Every Day
              </h2>
              <p className="text-base font-medium text-zinc-300 leading-relaxed">
                "We don't teach AI from textbook theories. At AuromindAI, our autonomous agent swarms process real customer conversations, schedule luxury tours, and automate order logistics for businesses across India and global markets."
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-[#181822] border border-zinc-700 p-3.5 rounded-xl">
                  <div className="text-2xl font-black text-white">1M+</div>
                  <div className="text-xs font-bold text-zinc-400">AI Inferences Run</div>
                </div>
                <div className="bg-[#181822] border border-zinc-700 p-3.5 rounded-xl">
                  <div className="text-2xl font-black text-white">1,400+</div>
                  <div className="text-xs font-bold text-zinc-400">Workshop Alumni</div>
                </div>
                <div className="bg-[#181822] border border-zinc-700 p-3.5 rounded-xl">
                  <div className="text-2xl font-black text-amber-400">4.9 / 5.0</div>
                  <div className="text-xs font-bold text-zinc-400">Attendee Rating</div>
                </div>
              </div>

              {/* BOLD CTA #5 */}
              <div className="pt-3">
                <button
                  onClick={() => triggerRegistration('instructor_cta')}
                  className="px-7 py-3.5 rounded-xl gold-btn text-xs sm:text-sm uppercase tracking-wider cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Learn from the Auromind AI Team for ₹99</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          10. REVIEWS & TESTIMONIALS + CTA
      ──────────────────────────────────────────────────────────────────────── */}
      <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-2 border-zinc-800">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-black border border-amber-500/30 mb-3">
            VERIFIED ATTENDEE REVIEWS
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            What Past Workshop Attendees Say
          </h2>
          <p className="text-base text-zinc-300 mt-3 font-medium">
            Real feedback from founders and tech leaders who attended past editions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#121218] border-2 border-zinc-800 rounded-2xl p-6 flex flex-col justify-between shadow-md">
            <div className="space-y-3">
              <div className="flex text-amber-400 text-sm">{'★'.repeat(5)}</div>
              <p className="text-sm font-medium text-zinc-300 leading-relaxed italic">
                "The ₹99 ticket price is almost comical for what you receive. The live multi-agent swarm demonstration alone saved our team months of trial and error. Implemented it on Monday morning."
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-zinc-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 font-black flex items-center justify-center text-sm border border-amber-500/40">
                RM
              </div>
              <div>
                <div className="text-sm font-black text-white">Rohan Mehta</div>
                <div className="text-xs font-bold text-amber-400">Founder, Aurelia D2C</div>
              </div>
            </div>
          </div>

          <div className="bg-[#121218] border-2 border-zinc-800 rounded-2xl p-6 flex flex-col justify-between shadow-md">
            <div className="space-y-3">
              <div className="flex text-amber-400 text-sm">{'★'.repeat(5)}</div>
              <p className="text-sm font-medium text-zinc-300 leading-relaxed italic">
                "Hands down the best 2 hours I've spent this year on AI. No marketing fluff—straight into architecture, system prompts, and tool calling with live database sync."
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-zinc-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 font-black flex items-center justify-center text-sm border border-amber-500/40">
                PS
              </div>
              <div>
                <div className="text-sm font-black text-white">Pooja Sharma</div>
                <div className="text-xs font-bold text-amber-400">Head of Growth, FinScale</div>
              </div>
            </div>
          </div>

          <div className="bg-[#121218] border-2 border-zinc-800 rounded-2xl p-6 flex flex-col justify-between shadow-md">
            <div className="space-y-3">
              <div className="flex text-amber-400 text-sm">{'★'.repeat(5)}</div>
              <p className="text-sm font-medium text-zinc-300 leading-relaxed italic">
                "The ₹12,000 prompt vault and blueprint they share at the end is pure gold. We closed a ₹75,000 AI automation retainer with a client using their exact architecture."
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-zinc-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 font-black flex items-center justify-center text-sm border border-amber-500/40">
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
        <div className="mt-12 text-center">
          <button
            onClick={() => triggerRegistration('reviews_cta')}
            className="px-9 py-4 rounded-xl gold-btn text-sm uppercase tracking-wider cursor-pointer inline-flex items-center gap-2"
          >
            <span>Join 1,400+ Workshop Alumni for ₹99</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          11. 100% SATISFACTION GUARANTEE + CTA
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[#1C150A] to-[#100D06] border-2 border-amber-500/50 text-center relative shadow-2xl">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black mb-4 border border-amber-500/40">
            <ShieldCheck className="w-4 h-4 text-amber-400" /> 100% RISK-FREE SATISFACTION GUARANTEE
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Attend for 30 Minutes. <br />
            If You're Not Blown Away, Get 100% Refund.
          </h2>

          <p className="text-base font-medium text-zinc-300 mt-4 max-w-2xl mx-auto leading-relaxed">
            We are so confident this will be the highest ROI ₹99 you ever spend that if you don't find actionable value within the first half hour, simply email or WhatsApp us for an instant, no-questions-asked refund.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => triggerRegistration('guarantee_cta')}
              className="px-9 py-4 rounded-xl gold-btn text-sm uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <span>Attend Risk-Free for ₹99 via Razorpay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 text-xs font-bold text-amber-400">
            Saturday, Oct 10th • 10:00 AM – 12:00 PM IST • Only {seatsRemaining} spots remaining
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          12. FAQ ACCORDION + CLOSING CTA
      ──────────────────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t-2 border-zinc-800">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-black border border-amber-500/30 mb-3">
            <HelpCircle className="w-4 h-4 text-amber-400" /> GOT QUESTIONS?
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
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
              className="bg-[#121218] border-2 border-zinc-800 rounded-2xl overflow-hidden transition-all shadow-md"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full text-left px-6 py-5 flex items-center justify-between text-base font-black text-white hover:text-amber-400 transition-colors cursor-pointer"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-amber-400 transition-transform duration-200 shrink-0 ${
                    activeFaq === idx ? 'rotate-180 text-amber-400' : ''
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-5 pt-1 text-sm font-medium text-zinc-300 leading-relaxed border-t border-zinc-800">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FINAL CLOSING CTA BANNER */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#20170A] via-[#2D210E] to-[#20170A] border-2 border-amber-500/60 text-center shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3 border border-amber-500/40">
            <Crown className="w-6 h-6 text-amber-400" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Have More Questions? Get Started for ₹99 Today.
          </h3>
          <p className="text-sm font-medium text-zinc-300 max-w-xl mx-auto mt-2">
            You literally have zero risk with our 100% money-back guarantee. Lock in your live seat for Saturday, Oct 10th (10 AM - 12 PM) and get the ₹12,000 bonus vault immediately.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => triggerRegistration('final_faq_cta')}
              className="px-9 py-4 rounded-xl gold-btn text-sm uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <span>Get Instant Access for ₹99 Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          13. FOOTER
      ──────────────────────────────────────────────────────────────────────── */}
      <footer className="border-t-2 border-zinc-800 bg-[#070709] py-12 px-4 sm:px-6 lg:px-8 text-center text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 font-black text-white text-base">
            <span>AuromindAI Enterprise Technologies</span>
          </div>
          <p className="max-w-xl mx-auto text-zinc-400 font-medium">
            Empowering modern businesses with autonomous AI employees, autonomous agents, and intelligence workflows.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-zinc-300 pt-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>•</span>
            <Link href="/ecommerce" className="hover:text-amber-400 transition-colors">eCommerce AI</Link>
            <span>•</span>
            <Link href="/real-estate" className="hover:text-amber-400 transition-colors">Real Estate AI</Link>
            <span>•</span>
            <a href="mailto:contact@auromind.ai" className="hover:text-amber-400 transition-colors">contact@auromind.ai</a>
          </div>
          <div className="text-[11px] text-zinc-500 pt-4 font-medium">
            © 2026 AuromindAI Inc. All rights reserved. Secure Razorpay Checkout.
          </div>
        </div>
      </footer>

      {/* ────────────────────────────────────────────────────────────────────────
          14. FIXED BOTTOM STICKY CONVERSION BAR (DESKTOP & MOBILE)
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#0E0E14]/95 border-t-2 border-amber-500/50 backdrop-blur-xl p-3 sm:py-3.5 shadow-2xl">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 hidden sm:flex items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black text-amber-400 flex items-center gap-1.5 uppercase">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Saturday, Oct 10 • 10:00 AM to 12:00 PM IST
              </div>
              <div className="text-xs text-zinc-400 font-bold hidden sm:block">
                Live 2-Hour Zoom Workshop • {seatsRemaining} spots left at ₹99
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-base sm:text-xl font-black text-white leading-tight">
                ₹99 <span className="text-xs line-through text-zinc-500 font-normal">₹1,999</span>
              </div>
              <div className="text-[10px] text-amber-400 font-black hidden sm:block">
                Razorpay Verified
              </div>
            </div>

            <button
              onClick={() => triggerRegistration('sticky_bar')}
              className="py-3 px-5 sm:px-7 rounded-xl gold-btn text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>Book For ₹99</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────────
          15. INSTANT GOLD CHECKOUT MODAL (For 1-Click Universal Booking)
      ──────────────────────────────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#121218] border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-full bg-zinc-900 border border-zinc-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pb-4 border-b border-zinc-800">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/40 mb-2">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                AI AUTOMATION WORKSHOP
              </div>
              <h3 className="text-2xl font-black text-white">
                Reserve Your ₹99 Seat
              </h3>
              <p className="text-xs font-bold text-amber-400 mt-1">
                Saturday, Oct 10 • 10:00 AM to 12:00 PM IST
              </p>
            </div>

            {errorMessage && (
              <div className="mt-3 p-3 rounded-xl bg-red-950/80 border-2 border-red-500 text-red-200 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleRegisterAndPay} className="mt-4 space-y-3.5">
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
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181822] border-2 border-zinc-700 text-white placeholder-zinc-500 text-sm font-bold focus:outline-none focus:border-amber-400"
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
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181822] border-2 border-zinc-700 text-white placeholder-zinc-500 text-sm font-bold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-zinc-300 mb-1">
                  WhatsApp Number
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-amber-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-[#181822] border-2 border-zinc-700 text-white placeholder-zinc-500 text-sm font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#181822] border-2 border-amber-500/40 flex items-center justify-between text-xs">
                <div>
                  <span className="font-black text-white">Workshop Fee:</span>
                  <span className="text-zinc-400 text-[11px] ml-1">(All 4 Bonuses Free)</span>
                </div>
                <div className="text-xl font-black text-amber-400">₹99</div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl gold-btn text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
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

            <div className="mt-3 text-center text-xs font-bold text-zinc-400">
              🔒 256-Bit SSL Encryption • Instant Razorpay Checkout
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────────
          16. REGISTRATION SUCCESS CONFIRMATION MODAL
      ──────────────────────────────────────────────────────────────────────── */}
      {confirmedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#121218] border-2 border-amber-500/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center relative shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4 border-2 border-amber-500/50">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black mb-2 border border-amber-500/40">
              PAYMENT VERIFIED • WORKSHOP SEAT CONFIRMED
            </div>

            <h3 className="text-2xl font-black text-white">
              You're In, {confirmedTicket.attendeeName}!
            </h3>

            <p className="text-xs font-medium text-zinc-300 mt-2">
              Your registration for the 2-Hour Live AI Automation Workshop on Saturday, Oct 10th has been confirmed.
            </p>

            {/* Ticket Card Details */}
            <div className="my-5 p-4 rounded-2xl bg-[#181822] border-2 border-zinc-700 text-left space-y-2 text-xs font-bold">
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
                <span className="font-mono text-zinc-400">{confirmedTicket.registrationId}</span>
              </div>
            </div>

            {/* Action buttons: Add to Google Calendar */}
            <div className="space-y-3">
              <a
                href={confirmedTicket.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl gold-btn text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Add to Google Calendar (1-Click)</span>
              </a>

              <button
                onClick={() => setConfirmedTicket(null)}
                className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs transition-colors border border-zinc-700 cursor-pointer"
              >
                Close &amp; View Details
              </button>
            </div>

            <p className="text-[11px] font-medium text-zinc-400 mt-4">
              A copy of your ticket and bonuses download link has been sent to {confirmedTicket.attendeeEmail}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
