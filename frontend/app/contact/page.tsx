'use client';

import React from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/landing/SiteHeader';
import { SiteFooter } from '@/components/landing/SiteFooter';
import { ContactSection } from '@/components/landing/ContactSection';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <SiteHeader activePage="contact" />

      <main className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-[#059669]">Home</Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">Contact Us</span>
          </div>

        </div>

        {/* Contact Us Section */}
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}
