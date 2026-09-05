'use client';

import React from 'react';
import Link from 'next/link';
import { Cookie, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function CookiePolicyPage() {
  return (
    <div className="space-y-12">
      {/* Top Banner */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider">
          <Cookie className="w-3.5 h-3.5 text-slate-700" />
          <span>Transparency &amp; Preferences</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-sm text-slate-500">
          Last Updated: September 5, 2026 · AuromindAI, Inc.
        </p>
      </div>

      <div className="space-y-8 text-slate-700 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit our website or use our web applications. Cookies enable our services to remember your login session, security tokens, and user preferences across visits.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-black text-slate-900">2. Categories of Cookies We Use</h2>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base">Strictly Necessary &amp; Security Cookies</h3>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">Always Active</span>
              </div>
              <p className="text-xs text-slate-600">
                Essential for authentication, CSRF token validation, session management, and routing. Without these cookies, you cannot log into the user workspace or admin console.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base">Functional &amp; Preference Cookies</h3>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">Optional</span>
              </div>
              <p className="text-xs text-slate-600">
                Remember your preferred theme (dark/light mode), active agent view filters, and customized interface configurations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base">Analytics &amp; Performance Telemetry</h3>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">Optional</span>
              </div>
              <p className="text-xs text-slate-600">
                Help us understand system latency, error frequencies, and feature usage patterns to optimize agent execution speeds. No personally identifiable or health information is ever passed to analytics services.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900">3. How to Control and Delete Cookies</h2>
          <p>
            You can modify your browser settings to accept, reject, or delete cookies at any time. Please note that disabling essential cookies may impact the proper functioning of your user workspace and admin dashboard.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900">4. Contact Us</h2>
          <p>
            If you have questions regarding our use of cookies, please email <a href="mailto:privacy@auromind.ai" className="text-emerald-600 underline">privacy@auromind.ai</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
