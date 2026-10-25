'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowRight, Linkedin, Twitter, Youtube, Instagram, ExternalLink } from 'lucide-react';
import { TrustAccreditations } from './TrustAccreditations';

export function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="AuromindAI"
                  width={32}
                  height={32}
                  unoptimized
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Auromind<span className="text-[#10B981]">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              AuromindAI builds AI-powered solutions and digital employees to help businesses automate operations, scale marketing, and achieve real business impact across industries.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#059669] hover:text-white flex items-center justify-center transition-colors text-slate-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#059669] hover:text-white flex items-center justify-center transition-colors text-slate-400"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#059669] hover:text-white flex items-center justify-center transition-colors text-slate-400"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#059669] hover:text-white flex items-center justify-center transition-colors text-slate-400"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About AuromindAI</Link></li>
              <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Our Services</Link></li>
              <li>
                <a
                  href="https://orbionagents.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="w-4 h-4 rounded bg-black border border-purple-500/40 flex items-center justify-center p-0.5">
                    <Image
                      src="/orbion-logo-tight.png"
                      alt="Orbion"
                      width={12}
                      height={12}
                      unoptimized
                      className="object-contain"
                    />
                  </span>
                  <span>OrbionAgents</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li><Link href="/case-studies" className="hover:text-emerald-400 transition-colors">Case Studies</Link></li>
            </ul>
          </div>

          {/* Industries */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Industries</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/healthcare" className="hover:text-emerald-400 transition-colors">Healthcare</Link></li>
              <li><Link href="/ecommerce" className="hover:text-emerald-400 transition-colors">E-commerce</Link></li>
              <li><Link href="/fintech" className="hover:text-emerald-400 transition-colors">Fintech</Link></li>
              <li><Link href="/real-estate" className="hover:text-emerald-400 transition-colors">Real Estate</Link></li>
              <li><Link href="/logistics" className="hover:text-emerald-400 transition-colors">Logistics & Supply Chain</Link></li>
              <li><Link href="/legal" className="hover:text-emerald-400 transition-colors">Legal & Compliance</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Contact</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                <div className="text-xs text-slate-400 leading-relaxed">
                  <div>No. 39, 7th Main Road, Ram Nagar North Extension, Velacheri, Chennai, Tamil Nadu - 600042</div>
                  <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500 font-mono">
                    <span>CIN: U62013TN2026PTC188924</span>
                    <span>GST: 33ABECA7449M1ZB</span>
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#10B981] shrink-0" />
                <a href="mailto:hello@auromindai.com" className="hover:text-emerald-400 transition-colors">hello@auromindai.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#10B981] shrink-0" />
                <a href="tel:+917695951519" className="hover:text-emerald-400 transition-colors">+91 76959 51519</a>
              </li>
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Verified Government & Meta Accreditations Bar */}
        <TrustAccreditations variant="footer" />

        {/* Bottom bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p>© {new Date().getFullYear()} AuromindAI Private Limited. All rights reserved.</p>
            <p className="text-[11px] text-slate-600 font-mono">CIN: U62013TN2026PTC188924 • GSTIN: 33ABECA7449M1ZB</p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link href="/ai-webinar" className="hover:text-amber-400 transition-colors">AI Masterclass</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
