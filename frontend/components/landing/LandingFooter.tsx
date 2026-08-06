'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Mail, Twitter, Github, Linkedin } from 'lucide-react';

export function LandingFooter() {
  const links = {
    Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
    Solutions: ['Sales AI', 'Support AI', 'Marketing AI', 'Healthcare AI'],
    Developers: ['API Reference', 'SDKs', 'Webhooks', 'Status Page'],
    Company: ['About', 'Blog', 'Careers', 'Privacy Policy'],
  };

  return (
    <footer className="border-t border-border bg-card pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* CTA Banner */}
        <div className="rounded-3xl bg-primary p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-black text-white">Ready to hire your AI team?</h3>
            <p className="text-sm text-zinc-400">Start free. No credit card required. Deploy in 5 minutes.</p>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-white text-primary font-bold text-sm hover:bg-gray-100 transition-all shadow-floating shrink-0"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4 text-emerald-600" />
          </Link>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="AuromindAI Logo" width={44} height={44} unoptimized className="rounded-2xl shadow-soft" />
              <span className="text-lg font-black text-primary">Auromind<span className="text-[#16A34A]">AI</span></span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
              Autonomous AI agents that work 24/7 for your business.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg border border-border bg-white flex items-center justify-center text-muted-foreground hover:text-primary hover:border-gray-300 transition-all shadow-sm">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="space-y-3">
              <div className="text-xs font-extrabold text-primary uppercase tracking-wider">{category}</div>
              {items.map((item) => (
                <Link key={item} href="/login" className="block text-xs text-muted-foreground hover:text-primary transition-colors">{item}</Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© 2026 AuromindAI, Inc. All rights reserved.</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-emerald-700">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
