'use client';

import React, { useState } from 'react';
import { MapPin, Mail, Phone, Send, CheckCircle2, ArrowRight, Linkedin, Twitter, Youtube, Instagram, Loader2 } from 'lucide-react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    setStatus('loading');

    // Simulate sending or API lead capture
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus('success');
      setFormData({ fullName: '', companyName: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Contact Us
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Let&apos;s build the future together. Get in touch with our team to discuss your business needs.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Let&apos;s talk about your AI roadmap
              </h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Whether you need a custom autonomous agent, high-speed WhatsApp integration, or enterprise consultation, we are ready to assist.
              </p>
            </div>

            <div className="space-y-5 text-sm text-slate-600">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Registered Office</div>
                  <div className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                    No. 39, 7th Main Road, Ram Nagar North Extension, Velacheri, Chennai, Tamil Nadu - 600042
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500 font-mono">
                    <span><strong className="text-slate-700">CIN:</strong> U62013TN2026PTC188924</span>
                    <span><strong className="text-slate-700">GST:</strong> 33ABECA7449M1ZB</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Email Us</div>
                  <a href="mailto:hello@auromindai.com" className="text-[#059669] text-xs hover:underline mt-0.5 block">
                    hello@auromindai.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Call Us</div>
                  <a href="tel:+917695951519" className="text-slate-700 text-xs hover:underline mt-0.5 block">
                    +91 76959 51519
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Connect With Us</div>
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#059669] hover:text-white flex items-center justify-center text-slate-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#059669] hover:text-white flex items-center justify-center text-slate-600 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#059669] hover:text-white flex items-center justify-center text-slate-600 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#059669] hover:text-white flex items-center justify-center text-slate-600 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm">
            {status === 'success' ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#059669] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Message Sent Successfully!</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Thank you for reaching out. One of our AI solution architects will contact you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 rounded-full bg-[#059669] text-white text-xs font-bold hover:bg-[#047857] transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Kumar"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Health Corp"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Message / Business Requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your business goals and what you would like to automate..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.02] disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
