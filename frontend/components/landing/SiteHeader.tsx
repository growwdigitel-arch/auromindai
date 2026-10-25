'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  Home,
  Building2,
  Briefcase,
  Boxes,
  FolderKanban,
  HeartPulse,
  ShoppingBag,
  Landmark,
  Truck,
  Scale,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface SiteHeaderProps {
  activePage?: 'home' | 'about' | 'industries' | 'services' | 'products' | 'case-studies' | 'contact';
}

export function SiteHeader({ activePage = 'home' }: SiteHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [desktopIndustriesOpen, setDesktopIndustriesOpen] = useState(false);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  // Handle escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/', icon: Home, key: 'home' },
    { label: 'About', href: '/about', icon: Building2, key: 'about' },
    { label: 'Services', href: '/services', icon: Briefcase, key: 'services' },
    { label: 'Products', href: '/products', icon: Boxes, key: 'products' },
    { label: 'Case Studies', href: '/case-studies', icon: FolderKanban, key: 'case-studies' },
  ];

  const industryLinks = [
    {
      label: 'Healthcare',
      href: '/healthcare',
      icon: HeartPulse,
      badge: 'HIPAA',
      desc: 'Patient intake & scheduling',
      color: 'text-cyan-600 bg-cyan-50 border-cyan-100',
    },
    {
      label: 'E-commerce',
      href: '/ecommerce',
      icon: ShoppingBag,
      badge: '+34% GMV',
      desc: 'Cart recovery & WhatsApp store',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      label: 'Fintech',
      href: '/fintech',
      icon: Landmark,
      badge: '< 300ms',
      desc: 'Instant KYC & fraud scoring',
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      label: 'Real Estate',
      href: '/real-estate',
      icon: Home,
      badge: '38s Match',
      desc: 'Lead qualification & MLS tours',
      color: 'text-teal-600 bg-teal-50 border-teal-100',
    },
    {
      label: 'Logistics',
      href: '/logistics',
      icon: Truck,
      badge: 'Zero Delay',
      desc: 'Fleet dispatch & BOL OCR',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    },
    {
      label: 'Legal',
      href: '/legal',
      icon: Scale,
      badge: 'Private ZDR',
      desc: 'Contract clause redlining',
      color: 'text-purple-600 bg-purple-50 border-purple-100',
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="AuromindAI"
                width={32}
                height={32}
                unoptimized
                className="object-contain"
              />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Auromind<span className="text-[#059669]">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation (Visible on Laptops & Desktops: lg and above) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-slate-600">
            {/* Home Link */}
            <Link
              href="/"
              className={`transition-colors hover:text-[#059669] ${
                activePage === 'home' ? 'text-[#059669] font-bold' : 'text-slate-600'
              }`}
            >
              Home
            </Link>

            {/* About Link */}
            <Link
              href="/about"
              className={`transition-colors hover:text-[#059669] ${
                activePage === 'about' ? 'text-[#059669] font-bold' : 'text-slate-600'
              }`}
            >
              About
            </Link>

            {/* Industries Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDesktopIndustriesOpen(true)}
              onMouseLeave={() => setDesktopIndustriesOpen(false)}
            >
              <Link
                href="/#industries"
                className={`inline-flex items-center gap-1 transition-colors hover:text-[#059669] ${
                  activePage === 'industries' ? 'text-[#059669] font-bold' : 'text-slate-600'
                }`}
              >
                <span>Industries</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    desktopIndustriesOpen ? 'rotate-180 text-[#059669]' : 'text-slate-400'
                  }`}
                />
              </Link>

              {/* Industries Flyout Menu on Desktop */}
              {desktopIndustriesOpen && (
                <div className="absolute top-full -left-20 pt-3 w-[460px] animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 grid grid-cols-2 gap-2">
                    {industryLinks.map((ind) => {
                      const Icon = ind.icon;
                      return (
                        <Link
                          key={ind.label}
                          href={ind.href}
                          onClick={() => setDesktopIndustriesOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${ind.color}`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-900 group-hover:text-[#059669] transition-colors flex items-center gap-1.5">
                              <span>{ind.label}</span>
                              <span className="text-[9px] font-mono font-semibold px-1 py-0.5 rounded bg-slate-100 text-slate-600">
                                {ind.badge}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 truncate mt-0.5">
                              {ind.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                    <div className="col-span-2 pt-2 border-t border-slate-100 mt-1 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-medium">Enterprise AI deployments</span>
                      <Link
                        href="/#industries"
                        onClick={() => setDesktopIndustriesOpen(false)}
                        className="text-[#059669] font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <span>View sector overview</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Services */}
            <Link
              href="/services"
              className={`transition-colors hover:text-[#059669] ${
                activePage === 'services' ? 'text-[#059669] font-bold' : 'text-slate-600'
              }`}
            >
              Services
            </Link>

            {/* Products */}
            <Link
              href="/products"
              className={`transition-colors hover:text-[#059669] ${
                activePage === 'products' ? 'text-[#059669] font-bold' : 'text-slate-600'
              }`}
            >
              Products
            </Link>

            {/* Case Studies */}
            <Link
              href="/case-studies"
              className={`transition-colors hover:text-[#059669] ${
                activePage === 'case-studies' ? 'text-[#059669] font-bold' : 'text-slate-600'
              }`}
            >
              Case Studies
            </Link>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile & Tablet Action Bar (< 1024px) */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/contact"
              className="px-3.5 py-1.5 rounded-full bg-[#059669] text-white text-xs font-semibold shadow-xs hover:bg-[#047857] transition-colors"
            >
              Contact
            </Link>

            <button
              onClick={() => setDrawerOpen(true)}
              className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-colors focus:outline-none"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          SLIDE-OVER MOBILE DRAWER (Comes smoothly from the side)
      ========================================================================= */}
      
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-[340px] sm:max-w-[380px] bg-white shadow-2xl flex flex-col justify-between transform transition-all duration-300 ease-in-out ${
          drawerOpen
            ? 'translate-x-0 opacity-100 visible'
            : 'translate-x-full opacity-0 invisible pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        {/* Drawer Top Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <Link
            href="/"
            onClick={() => setDrawerOpen(false)}
            className="flex items-center gap-2 group"
          >
            <div className="relative w-7 h-7 rounded-lg flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="AuromindAI"
                width={28}
                height={28}
                unoptimized
                className="object-contain"
              />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              Auromind<span className="text-[#059669]">AI</span>
            </span>
          </Link>

          <button
            onClick={() => setDrawerOpen(false)}
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors focus:outline-none shadow-xs"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Nav Items */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
          
          {/* Status Badge */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-emerald-950">Enterprise AI Active</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
              SLA 99.9%
            </span>
          </div>

          {/* Primary Nav Links */}
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Menu
            </div>
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive =
                (activePage === 'home' && item.href === '/') ||
                (activePage !== 'home' && item.href.includes(activePage));

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#059669] text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 ${isActive ? 'text-white/80' : 'text-slate-400'}`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Dedicated Industries Section */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Industry Solutions</span>
              <Link
                href="/#industries"
                onClick={() => setDrawerOpen(false)}
                className="text-[#059669] hover:underline normal-case text-xs font-semibold"
              >
                All 6
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {industryLinks.map((ind) => {
                const Icon = ind.icon;
                return (
                  <Link
                    key={ind.label}
                    href={ind.href}
                    onClick={() => setDrawerOpen(false)}
                    className="p-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 hover:bg-white hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col justify-between group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center border ${ind.color}`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] font-mono font-bold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        {ind.badge}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-[#059669] transition-colors">
                        {ind.label}
                      </div>
                      <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                        {ind.desc}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Direct Support & Coordinates */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
              Direct Contact
            </div>
            
            <a
              href="tel:+917695951519"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors border border-slate-100"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#059669] flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-slate-900 font-bold">+91 76959 51519</div>
                <div className="text-[10px] text-slate-400">Direct phone &amp; WhatsApp</div>
              </div>
            </a>

            <a
              href="mailto:hello@auromindai.com"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors border border-slate-100"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#059669] flex items-center justify-center shrink-0">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-slate-900 font-bold">hello@auromindai.com</div>
                <div className="text-[10px] text-slate-400">Enterprise scoping team</div>
              </div>
            </a>
          </div>

        </div>

        {/* Drawer Bottom CTA */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-2.5">
          <Link
            href="/contact"
            onClick={() => setDrawerOpen(false)}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm shadow-md transition-all active:scale-[0.98]"
          >
            <span>Book AI Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="text-center text-[10px] text-slate-400">
            AuromindAI Private Limited • Velacheri, Chennai
          </div>
        </div>
      </aside>
    </>
  );
}
