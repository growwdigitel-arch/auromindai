'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { 
  CheckCircle2, 
  MessageSquare, 
  Calendar, 
  Clock, 
  User, 
  ShieldCheck, 
  Download, 
  ArrowRight, 
  ExternalLink,
  Sparkles,
  Bell,
  Laptop
} from 'lucide-react';

const WHATSAPP_CHANNEL_URL = 'https://whatsapp.com/channel/0029Vb8b0Ct7Noa4e01ZBq0D';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Valued Attendee';
  const email = searchParams.get('email') || '';
  const paymentId = searchParams.get('payment_id') || `pay_live_${Date.now()}`;

  // Google Calendar URL
  const calendarTitle = encodeURIComponent('AI Business Automation Workshop with Gnananand');
  const calendarDetails = encodeURIComponent('Live 2-Hour Practical AI Workshop. Private Zoom Link will be sent on WhatsApp: https://whatsapp.com/channel/0029Vb8b0Ct7Noa4e01ZBq0D');
  const calendarLocation = encodeURIComponent('Zoom Live (Link sent via WhatsApp Channel)');
  // Oct 10, 2026 from 10:00 AM to 12:00 PM IST (UTC: 04:30 to 06:30)
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calendarTitle}&dates=20261010T043000Z/20261010T063000Z&details=${calendarDetails}&location=${calendarLocation}`;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 font-sans antialiased flex flex-col justify-between overflow-x-hidden">
      {/* Header with Visible Logo */}
      <header className="w-full bg-white border-b border-zinc-200 py-3.5 px-4 sm:px-8 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-zinc-900 border border-amber-500/40 p-1 flex items-center justify-center shadow-md shrink-0">
              <Image src="/logo.png" alt="AuromindAI" width={34} height={34} className="object-contain" priority />
            </div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-zinc-900">
              Auromind<span className="text-[#16A34A] font-black">AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Ticket
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-6 sm:py-10">
        <div className="space-y-6">
          {/* Top Success Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-md text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                Payment Received • ₹99 All-Inclusive
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-zinc-900 tracking-tight mt-3">
                Thanks for Your Payment, {name}!
              </h1>
              <p className="text-sm sm:text-base text-zinc-600 font-medium max-w-xl mx-auto mt-2">
                We are excited to see you live! Your seat for the <strong className="text-zinc-900">AI Business Automation Workshop</strong> is 100% confirmed.
              </p>
            </div>
          </div>

          {/* PRIMARY STEP: WhatsApp Channel Joining Card */}
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0F3822] via-[#0A2617] to-[#06180E] text-white border-2 border-emerald-500/60 shadow-2xl space-y-5 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-500/30 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-emerald-500 text-black font-black text-sm flex items-center justify-center shrink-0">
                  !
                </span>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-emerald-300">
                    Mandatory Next Step
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-white">
                    Join the Official Attendee WhatsApp Channel
                  </h2>
                </div>
              </div>
              <span className="self-start sm:self-auto text-[10px] font-black bg-emerald-400 text-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Active Group
              </span>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed">
              All workshop access details, the private Zoom meeting link, workbook templates, and session reminders will be posted directly inside this official WhatsApp channel.
            </p>

            {/* Glowing Big Green WhatsApp Button */}
            <div>
              <a
                href={WHATSAPP_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 sm:py-4.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20BD5A] active:scale-[0.98] text-black font-black text-base sm:text-lg shadow-[0_0_35px_rgba(37,211,102,0.6)] hover:shadow-[0_0_50px_rgba(37,211,102,0.9)] flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-200 group text-center"
              >
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-black shrink-0 fill-black" />
                <span>Tap Here to Join the WhatsApp Channel Now</span>
                <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="bg-black/40 rounded-2xl p-4 sm:p-5 border border-emerald-500/30 space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5" />
                <span>What to do next (Important Instructions):</span>
              </div>
              <ul className="space-y-2.5 text-xs text-emerald-100 font-medium">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-black flex items-center justify-center shrink-0 border border-emerald-500/40">1</span>
                  <span><strong>Join Immediately:</strong> Click the green button above and tap <em>"Follow"</em> in WhatsApp.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-black flex items-center justify-center shrink-0 border border-emerald-500/40">2</span>
                  <span><strong>Turn Notifications ON:</strong> Tap the bell icon inside the channel so you do not miss the private Zoom link.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-black flex items-center justify-center shrink-0 border border-emerald-500/40">3</span>
                  <span><strong>Session Schedule:</strong> Saturday, Oct 10th at 10:00 AM IST. Link drops 30 mins before start.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-black flex items-center justify-center shrink-0 border border-emerald-500/40">4</span>
                  <span><strong>Hardware Ready:</strong> Please join from a desktop or laptop to follow the live AI automation workflows.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Ticket Summary Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-zinc-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-zinc-900">
                Official Digital Ticket Receipt
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">
                ID: {paymentId.slice(-10)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                <span className="text-zinc-500 block text-[10px] font-medium uppercase">Attendee</span>
                <span className="font-bold text-zinc-900 text-sm">{name}</span>
                {email && <span className="text-zinc-500 block text-[11px]">{email}</span>}
              </div>

              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                <span className="text-zinc-500 block text-[10px] font-medium uppercase">Date &amp; Time</span>
                <span className="font-bold text-zinc-900 text-sm">Saturday, Oct 10, 2026</span>
                <span className="text-zinc-500 block text-[11px]">10:00 AM – 12:00 PM IST (2 Hours)</span>
              </div>
            </div>

            {/* Mentor Info */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200">
              <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0 border-2 border-amber-500 shadow-sm bg-zinc-900">
                <Image src="/gnananand.jpg" alt="Gnananand" fill className="object-cover object-center" />
              </div>
              <div className="text-xs">
                <div className="font-black text-zinc-900 text-sm">Gnananand</div>
                <div className="text-amber-800 font-bold">10+ Years Enterprise Sales Veteran • AI Conversion Mentor</div>
              </div>
            </div>

            {/* Calendar & Share Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Add to Google Calendar</span>
              </a>

              <a
                href={WHATSAPP_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open WhatsApp Channel</span>
              </a>
            </div>
          </div>

          {/* Return link */}
          <div className="text-center pt-2">
            <Link
              href="/ai-webinar"
              className="text-xs font-bold text-zinc-500 hover:text-zinc-900 underline"
            >
              ← Back to Workshop Details
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-zinc-200 py-4 text-center text-xs text-zinc-400">
        © 2026 AuromindAI Inc. • Confirmation Sent to Your Email
      </footer>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
