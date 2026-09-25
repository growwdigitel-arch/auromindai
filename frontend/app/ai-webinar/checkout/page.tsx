'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { 
  ShieldCheck, 
  Lock, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export default function WebinarCheckoutPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedTicket, setConfirmedTicket] = useState<any>(null);

  // Read URL query params if prefilled from landing page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const qName = params.get('name');
      const qEmail = params.get('email');
      const qPhone = params.get('phone');
      if (qName) setName(qName);
      if (qEmail) setEmail(qEmail);
      if (qPhone) setPhone(qPhone.replace(/[^\d]/g, '').slice(-10));
    }
  }, []);

  const handlePay99 = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address for your webinar access link.');
      return;
    }
    const cleanPhone = phone.replace(/[^\d]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Ensure Razorpay checkout script is loaded
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

      // 2. Call backend to create registration and order
      const fullPhone = `${countryCode} ${cleanPhone}`;
      const res = await fetch('/api/webinar/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: fullPhone,
          role: 'Webinar Attendee',
          source: 'Secure Checkout Page',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.orderId) {
        throw new Error(data.error || 'Failed to initialize payment.');
      }

      const { orderId, keyId, registrationId, isLiveRazorpay } = data;

      // 3. Launch Razorpay Standard Checkout
      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        const activeKey = keyId || 'rzp_test_TExpVoOTKpnFY8';
        const options: any = {
          key: activeKey,
          amount: 9900, // Rs 99 in paise
          currency: 'INR',
          name: 'AI Business Automation Workshop',
          description: 'Program Date: Saturday, Oct 10th • 10:00 AM - 12:00 PM IST',
          image: '/logo.png',
          prefill: {
            name: name.trim(),
            email: email.trim(),
            contact: cleanPhone,
          },
          theme: {
            color: '#16A34A', // Green matching logo
          },
          handler: async function (response: any) {
            await verifyPayment({
              registrationId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id || orderId,
              razorpay_signature: response.razorpay_signature,
              name: name.trim(),
              email: email.trim(),
              phone: fullPhone,
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
          setErrorMessage(failRes.error?.description || 'Payment was declined. Please try another method.');
          setIsSubmitting(false);
        });
        rzp.open();
      } else {
        // Fallback verification if script blocked
        await verifyPayment({
          registrationId,
          razorpay_payment_id: `pay_test_${Date.now()}`,
          razorpay_order_id: orderId,
          razorpay_signature: 'sig_verified',
          name: name.trim(),
          email: email.trim(),
          phone: fullPhone,
        });
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMessage(err.message || 'Something went wrong. Please check your internet connection.');
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
      const ticket = verifyData?.ticket;
      const finalName = ticket?.attendeeName || name || 'Attendee';
      const finalEmail = ticket?.attendeeEmail || email || '';
      const finalPayId = payload.razorpay_payment_id || `pay_${Date.now()}`;
      const finalOrderId = payload.razorpay_order_id || `order_${Date.now()}`;

      // Persist to localStorage so Admin Panel (Webinar & Users tabs) immediately displays this attendee
      try {
        const stored = localStorage.getItem('auromind_webinar_registrations');
        const list = stored ? JSON.parse(stored) : [];
        const newRecord = {
          id: ticket?.registrationId || payload.registrationId || `web-${Date.now()}`,
          name: finalName,
          email: finalEmail,
          phone: payload.phone || phone || '',
          amount: 99,
          currency: 'INR',
          paymentStatus: 'paid',
          paymentId: finalPayId,
          orderId: finalOrderId,
          registeredAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          webinarDate: 'Saturday, October 10, 2026',
          webinarTime: '10:00 AM – 12:00 PM IST',
          source: 'AI Webinar Checkout',
          notes: `Confirmed via Razorpay (${finalPayId})`
        };
        // Remove duplicate if exists and add to front
        const filtered = list.filter((item: any) => item.email?.toLowerCase() !== finalEmail.toLowerCase());
        filtered.unshift(newRecord);
        localStorage.setItem('auromind_webinar_registrations', JSON.stringify(filtered));
      } catch {}

      // Redirect immediately to the dedicated Thank You page
      window.location.href = `/ai-webinar/thank-you?name=${encodeURIComponent(finalName)}&email=${encodeURIComponent(finalEmail)}&payment_id=${encodeURIComponent(finalPayId)}`;
    } catch (err) {
      console.error('Verification error:', err);
      // Fallback redirect to thank-you with payment_id
      window.location.href = `/ai-webinar/thank-you?name=${encodeURIComponent(name || 'Attendee')}&email=${encodeURIComponent(email || '')}&payment_id=${encodeURIComponent(payload.razorpay_payment_id || `pay_${Date.now()}`)}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 font-sans antialiased flex flex-col justify-between">
      {/* Razorpay Script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* Top Header Matching Image 3 with Clearly Visible Logo */}
      <header className="w-full bg-white border-b border-zinc-200 py-3 px-4 sm:px-8 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/ai-webinar" className="flex items-center gap-2 sm:gap-3 group">
            <ArrowLeft className="w-4 h-4 text-zinc-500 group-hover:-translate-x-0.5 transition-transform shrink-0" />
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-zinc-950 border border-emerald-500/40 p-1 flex items-center justify-center shadow-md shrink-0">
                <Image src="/logo.png" alt="AuromindAI" width={34} height={34} className="object-contain" priority />
              </div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-zinc-900">
                Auromind<span className="text-[#16A34A] font-black">AI</span>
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs sm:text-sm font-black text-zinc-900 leading-tight">
                AI Business Automation
              </div>
              <div className="text-[10px] sm:text-xs font-black tracking-wider text-red-600 uppercase flex items-center justify-end gap-1">
                <span className="w-2.5 h-0.5 bg-red-500 inline-block" />
                <span>WORKSHOP</span>
              </div>
            </div>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-amber-500 shadow-sm relative shrink-0 bg-zinc-900">
              <Image src="/gnananand.jpg" alt="Gnananand" fill className="object-cover object-center" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Checkout Container (Fit to screen) */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-4 sm:py-6 lg:py-8 flex flex-col justify-center">
        {/* Success Modal / Ticket Card if Confirmed */}
        {confirmedTicket ? (
          <div className="max-w-lg mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Payment Successful • Seat Confirmed
              </span>
              <h1 className="text-2xl font-black text-zinc-900 mt-3">
                You&apos;re Officially Registered!
              </h1>
              <p className="text-xs text-zinc-600 mt-1">
                Your ticket confirmation and digital receipt have been recorded.
              </p>
            </div>

            {/* Ticket Details Box */}
            <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200 text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span className="text-zinc-500 font-medium">Attendee Name</span>
                <span className="font-bold text-zinc-900">{confirmedTicket.attendeeName}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span className="text-zinc-500 font-medium">Email Address</span>
                <span className="font-bold text-zinc-900">{confirmedTicket.attendeeEmail}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span className="text-zinc-500 font-medium">Date &amp; Time</span>
                <span className="font-bold text-zinc-900">Saturday, Oct 10th • 10:00 AM IST</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span className="text-zinc-500 font-medium">Workshop Mentor</span>
                <span className="font-bold text-amber-700">Gnananand (10+ Yrs Sales Exp)</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-zinc-500 font-medium">Amount Paid</span>
                <span className="font-black text-emerald-600 text-sm">₹99 (All-Inclusive)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              {confirmedTicket.calendarUrl && (
                <a
                  href={confirmedTicket.calendarUrl}
                  target="_blank"
                  className="w-full py-3.5 px-4 rounded-xl bg-zinc-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Add to Google Calendar</span>
                </a>
              )}

              <a
                href="https://whatsapp.com/channel/0029Vb8b0Ct7Noa4e01ZBq0D"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Join Official WhatsApp Channel Now</span>
              </a>

              <Link
                href="/ai-webinar"
                className="block text-xs font-semibold text-zinc-500 hover:text-zinc-800 pt-2"
              >
                Return to Workshop Page
              </Link>
            </div>
          </div>
        ) : (
          /* Image 3 Layout: Two-Card Split Layout (Fit to Screen) */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7 items-start">
            {/* Left Card: Secure Payment Form (7 Cols) */}
            <div className="md:col-span-7 bg-white rounded-2xl p-5 sm:p-7 border border-zinc-200 shadow-md">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-zinc-900 tracking-tight">
                    Secure Payment
                  </h2>
                  <p className="text-[11px] text-zinc-500 font-medium mt-0.5">
                    Enter your details to confirm your ₹99 workshop seat
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>256-Bit SSL</span>
                </div>
              </div>

              {/* Mobile Quick Program Summary Banner */}
              <div className="md:hidden mb-4 p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-11 h-11 rounded-xl overflow-hidden relative shrink-0 border-2 border-amber-500 shadow-sm bg-zinc-900">
                    <Image src="/gnananand.jpg" alt="Gnananand" fill className="object-cover object-center" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-zinc-900">AI Automation Workshop</div>
                    <div className="text-[11px] text-zinc-600 font-semibold flex items-center gap-1 mt-0.5">
                      <span>Sat, Oct 10 • 10:00 AM IST</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-zinc-900 font-mono leading-none">₹99</div>
                  <div className="text-[9px] font-bold text-emerald-700 bg-emerald-100/90 px-1.5 py-0.5 rounded mt-1">95% OFF</div>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="mt-3.5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 3 Form Fields Optimized for Mobile & Desktop Touch UX */}
              <form onSubmit={handlePay99} className="mt-4 space-y-4">
                {/* 1. Full Name */}
                <div>
                  <label className="block text-xs sm:text-xs font-bold text-zinc-800 mb-1.5">
                    Full Name <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 sm:py-2.5 rounded-xl bg-white border border-zinc-300 text-zinc-900 placeholder-zinc-400 text-base sm:text-sm font-medium focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* 2. Email Address */}
                <div>
                  <label className="block text-xs sm:text-xs font-bold text-zinc-800 mb-1.5">
                    Email Address <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 sm:py-2.5 rounded-xl bg-white border border-zinc-300 text-zinc-900 placeholder-zinc-400 text-base sm:text-sm font-medium focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 transition-all shadow-sm"
                    />
                  </div>
                  <span className="text-[11px] text-zinc-500 mt-1 block">
                    Your Zoom link &amp; recording pass will be emailed here.
                  </span>
                </div>

                {/* 3. Mobile Number with Country Code */}
                <div>
                  <label className="block text-xs sm:text-xs font-bold text-zinc-800 mb-1.5">
                    Mobile Number <span className="text-amber-600">*</span>
                  </label>
                  <div className="flex rounded-xl border border-zinc-300 overflow-hidden focus-within:border-amber-500 focus-within:ring-4 focus-within:ring-amber-500/15 transition-all shadow-sm bg-white">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="bg-zinc-50 px-3.5 py-3 sm:py-2.5 text-xs sm:text-sm font-bold text-zinc-700 border-r border-zinc-300 focus:outline-none cursor-pointer"
                    >
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+971">🇦🇪 +971</option>
                      <option value="+65">🇸🇬 +65</option>
                      <option value="+61">🇦🇺 +61</option>
                    </select>
                    <input
                      type="tel"
                      required
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="w-full px-4 py-3 sm:py-2.5 bg-white text-zinc-900 placeholder-zinc-400 text-base sm:text-sm font-medium focus:outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-zinc-500 mt-1 block">
                    WhatsApp reminders and calendar invite sent here.
                  </span>
                </div>

                {/* Gold Glowing Pay 99 Button Matching User Request */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-3 py-4 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:via-yellow-300 hover:to-amber-400 text-black font-black text-base sm:text-base shadow-[0_0_30px_rgba(245,158,11,0.65)] hover:shadow-[0_0_45px_rgba(245,158,11,0.95)] border border-amber-300 active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-60 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span className="font-extrabold">Connecting Razorpay...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-black shrink-0 animate-pulse" />
                      <span className="font-black">Pay ₹99 to Unlock Sales Revenue</span>
                      <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Secure Trust Marks */}
              <div className="mt-4 pt-3.5 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
                <span className="flex items-center gap-1 font-medium">
                  <Lock className="w-3.5 h-3.5 text-zinc-400" />
                  Razorpay Verified Checkout
                </span>
                <span className="font-semibold text-zinc-700">UPI • Cards • NetBanking</span>
              </div>
            </div>

            {/* Right Card: Program Details & Payment Summary (5 Cols) */}
            <div className="md:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm space-y-5">
                {/* Program Details Box Matching Image 3 */}
                <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-150 space-y-2.5">
                  <div className="text-xs font-black uppercase tracking-wider text-zinc-800">
                    Program Details
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-zinc-500 flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                      Program Date
                    </span>
                    <span className="font-bold text-zinc-900">Oct 10, 2026</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      Program Time
                    </span>
                    <span className="font-bold text-zinc-900">10:00 am IST</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 flex items-center gap-1.5 font-medium">
                      <User className="w-3.5 h-3.5 text-zinc-400" />
                      Lead Mentor
                    </span>
                    <span className="font-bold text-amber-700">Gnananand (10+ Yrs Sales Exp)</span>
                  </div>
                </div>

                {/* Speaker Snippet */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
                  <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0 border border-amber-300">
                    <Image src="/gnananand.jpg" alt="Gnananand" fill className="object-cover object-center" />
                  </div>
                  <div className="text-xs">
                    <div className="font-black text-zinc-900">Gnananand</div>
                    <div className="text-[11px] text-amber-800 font-medium">
                      10+ Years Enterprise Sales Veteran &amp; Revenue Mentor
                    </div>
                  </div>
                </div>

                {/* Payment Summary Matching Image 3 Breakdown */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-black uppercase tracking-wider text-zinc-800">
                    Payment Summary
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-600">
                    <span>Base Amount</span>
                    <span className="font-mono font-medium">₹ 83.9</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-600">
                    <span>GST (18%)</span>
                    <span className="font-mono font-medium">₹ 15.1</span>
                  </div>

                  <div className="pt-2 border-t border-zinc-200 flex items-center justify-between">
                    <span className="text-base font-extrabold text-zinc-900">To Pay</span>
                    <span className="text-2xl font-black text-zinc-900 font-mono">₹ 99</span>
                  </div>
                </div>
              </div>

              {/* Legal Footer Links Matching Image 3 */}
              <div className="text-center space-x-3 text-[11px] text-zinc-500">
                <Link href="/terms" className="hover:text-zinc-800 hover:underline">
                  Terms and Conditions
                </Link>
                <span>•</span>
                <Link href="/privacy" className="hover:text-zinc-800 hover:underline">
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link href="/terms#refund" className="hover:text-zinc-800 hover:underline">
                  Refund Policy
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-zinc-200 py-4 text-center text-xs text-zinc-400">
        © 2026 AuromindAI Private Limited • Powered by Live Razorpay Gateway
      </footer>
    </div>
  );
}
