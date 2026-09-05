'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Mail, 
  Twitter, 
  Github, 
  Linkedin, 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  FileCheck,
  Server,
  FileText
} from 'lucide-react';

export function LandingFooter() {
  const links: Record<string, { label: string; href: string; badge?: string }[]> = {
    Product: [
      { label: 'OrbionAgents (Live)', href: 'https://orbionagents.com', badge: 'Ready' },
      { label: 'Industries We Serve', href: '/#industries' },
      { label: 'Autonomous Capabilities', href: '/#agents' },
      { label: 'How It Works', href: '/#how-it-works' },
      { label: 'ROI Savings Calculator', href: '/#calculator' },
      { label: 'Comparison Matrix', href: '/#comparison' },
    ],
    Solutions: [
      { label: 'eCommerce Sales AI', href: '/ecommerce' },
      { label: 'Real Estate Sales AI', href: '/real-estate' },
      { label: 'Healthcare & Clinical Intake', href: '/#industries' },
      { label: 'Giving AI & Philanthropy', href: '/#industries' },
      { label: 'Custom AI Software Systems', href: '/#industries' },
      { label: 'Mobile Applications', href: '/#industries' },
    ],
    'Security & Encryption': [
      { label: 'Data Encryption Standards', href: '/security', badge: 'AES-256' },
      { label: 'Zero Data Retention (ZDR)', href: '/security', badge: 'ZDR' },
      { label: 'Cryptographic Key Mgmt', href: '/security' },
      { label: 'Micro-VM Sandboxing', href: '/security' },
      { label: 'Dedicated VPC & On-Prem', href: '/security' },
      { label: 'Security Whitepaper', href: '/security' },
    ],
    'Legal & Compliance': [
      { label: 'Privacy Policy', href: '/privacy', badge: 'GDPR/CCPA' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'HIPAA & Healthcare Rules', href: '/compliance', badge: 'HIPAA' },
      { label: 'Business Associate Agreement (BAA)', href: '/compliance' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Sub-processors List', href: '/privacy' },
    ],
    Developers: [
      { label: 'FastAPI Interactive Docs', href: 'http://localhost:8000/docs' },
      { label: 'Real Estate AI Endpoints', href: 'http://localhost:8000/docs#/Real%20Estate%20AI' },
      { label: 'Webhooks & Event Egress', href: '/#how-it-works' },
      { label: 'System Health Check', href: '/health' },
      { label: 'Owner Admin Console', href: '/admin' },
    ],
  };

  return (
    <footer className="border-t border-slate-200 bg-white pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* CTA Banner */}
        <div className="rounded-3xl bg-slate-950 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-xl border border-slate-800">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Ready to deploy autonomous AI systems?
            </h3>
            <p className="text-sm text-slate-400">
              Enterprise security, zero data retention for model training, and sub-second execution across your business channels.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/login"
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-emerald-500 text-slate-950 font-black text-sm hover:bg-emerald-400 transition-all shadow-md hover:scale-105"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Enterprise Data Encryption & Trust Strip */}
        <div className="rounded-3xl bg-slate-50 border border-slate-200/90 p-6 md:p-8">
          <div className="text-center sm:text-left mb-6 space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-3 py-0.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>ENTERPRISE DATA ENCRYPTION &amp; COMPLIANCE ASSURANCE</span>
            </div>
            <h4 className="text-lg font-black text-slate-900 pt-1">
              Bank-Grade Security Built into Every Layer
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              href="/security" 
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all text-left space-y-1.5 group"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs text-slate-900">AES-256 at Rest</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Relational tables, vector stores, and snapshot volumes encrypted with AES-256 GCM.
              </p>
            </Link>

            <Link 
              href="/security" 
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all text-left space-y-1.5 group"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs text-slate-900">TLS 1.3 in Transit</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Mandatory TLS 1.3 with Perfect Forward Secrecy across all API gateways and webhooks.
              </p>
            </Link>

            <Link 
              href="/privacy" 
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all text-left space-y-1.5 group"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <EyeOff className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs text-slate-900">Zero Data Retention</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Zero training on client data. Your enterprise context is strictly ephemeral and sandboxed.
              </p>
            </Link>

            <Link 
              href="/compliance" 
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all text-left space-y-1.5 group"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <FileCheck className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs text-slate-900">HIPAA &amp; BAA Ready</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Execute standard BAAs, clinician-in-the-loop safeguards, and automated PHI scrubbing.
              </p>
            </Link>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 pt-4">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="AuromindAI Logo" width={40} height={40} unoptimized className="rounded-2xl shadow-soft" />
              <span className="text-xl font-black text-slate-900">Auromind<span className="text-[#16A34A]">AI</span></span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enterprise autonomous AI systems, custom AI software, and mobile applications built for scale.
            </p>
            <div className="flex items-center gap-2 pt-1">
              {[
                { icon: Twitter, href: 'https://twitter.com' },
                { icon: Github, href: 'https://github.com' },
                { icon: Linkedin, href: 'https://linkedin.com' },
                { icon: Mail, href: 'mailto:contact@auromind.ai' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <a 
                    key={i} 
                    href={item.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* 5 Dynamic Link Columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="space-y-3">
              <div className="text-xs font-black text-slate-900 uppercase tracking-wider">
                {category}
              </div>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link 
                      href={item.href} 
                      className="text-xs text-slate-500 hover:text-emerald-600 transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Legal Copyright & Quick Link Bar */}
        <div className="border-t border-slate-200 pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-center lg:text-left">
            <span>© 2026 AuromindAI, Inc. All rights reserved.</span>
            <Link href="/privacy" className="hover:text-slate-900 underline transition-colors">
              Privacy Policy
            </Link>
            <Link href="/security" className="hover:text-slate-900 underline transition-colors">
              Data Encryption &amp; Security
            </Link>
            <Link href="/terms" className="hover:text-slate-900 underline transition-colors">
              Terms of Service
            </Link>
            <Link href="/compliance" className="hover:text-slate-900 underline transition-colors">
              HIPAA Compliance
            </Link>
            <Link href="/cookies" className="hover:text-slate-900 underline transition-colors">
              Cookie Policy
            </Link>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-emerald-700 font-semibold text-[11px]">
              All Enterprise Systems &amp; Encryption Active
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
