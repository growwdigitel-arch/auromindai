'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  HeartPulse, 
  HeartHandshake, 
  Building2, 
  Code2, 
  Smartphone, 
  ArrowUpRight, 
  Check, 
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Clock
} from 'lucide-react';

export function IndustriesShowcase() {
  const industries = [
    {
      id: 'ecommerce',
      title: 'eCommerce',
      badge: 'High-Converting Sales',
      icon: ShoppingBag,
      color: 'from-emerald-500/10 to-teal-500/10 text-emerald-600 border-emerald-200',
      description: 'Autonomous 24/7 AI sales agents that recover abandoned carts, assist shoppers over WhatsApp, and boost average order value.',
      features: [
        'WhatsApp direct 1-click sales & checkout',
        'Intelligent inventory & cross-selling engine',
        'Cart abandonment auto-recovery drip',
        'Native Shopify & WooCommerce sync'
      ],
      metric: '+34% Conversion',
      href: '/ecommerce',
      ctaText: 'Explore eCommerce Solution'
    },
    {
      id: 'healthcare',
      title: 'Healthcare',
      badge: 'HIPAA-Conscious AI',
      icon: HeartPulse,
      color: 'from-cyan-500/10 to-blue-500/10 text-cyan-600 border-cyan-200',
      description: 'Streamline patient intake, appointment scheduling, and post-consultation follow-ups with medical-grade precision and privacy.',
      features: [
        '24/7 automated patient booking & rescheduling',
        'Intelligent symptom pre-intake & triaging',
        'Post-op medication & recovery check-ins',
        'Secure patient record management'
      ],
      metric: '85% Less Desk Workload',
      href: '/login',
      ctaText: 'Explore Healthcare AI'
    },
    {
      id: 'giving',
      title: 'Giving AI',
      badge: 'Philanthropy & Non-Profits',
      icon: HeartHandshake,
      color: 'from-rose-500/10 to-pink-500/10 text-rose-600 border-rose-200',
      description: 'Amplify non-profit impact with AI donor stewardship, automated recurring gift nurture campaigns, and grant proposal generation.',
      features: [
        'Personalized donor engagement & stewardship',
        'Automated pledge & recurring gift sequences',
        'Grant writing & impact reporting synthesis',
        'Multi-channel donor outreach (Email, SMS, Web)'
      ],
      metric: '2.4x Donor Retention',
      href: '/login',
      ctaText: 'Explore Giving AI'
    },
    {
      id: 'realestate',
      title: 'Real Estate',
      badge: 'PropTech & Brokerages',
      icon: Building2,
      color: 'from-teal-500/10 to-emerald-500/10 text-teal-600 border-teal-200',
      description: 'Autonomous buyer qualification, instant MLS property matching, VIP tour scheduling, and live CRM pipeline synchronization.',
      features: [
        '38-second lead qualification on WhatsApp & Web',
        'Automated luxury portfolio matching',
        'Direct calendar lock for VIP property tours',
        'Brokerage CRM & sales pipeline dashboard'
      ],
      metric: '38s Response Time',
      href: '/real-estate',
      ctaText: 'Explore Real Estate AI'
    },
    {
      id: 'software',
      title: 'AI Software',
      badge: 'Enterprise Engineering',
      icon: Code2,
      color: 'from-indigo-500/10 to-purple-500/10 text-indigo-600 border-indigo-200',
      description: 'Custom AI software architecture, private fine-tuned LLMs, autonomous backend services, and RAG knowledge systems.',
      features: [
        'Custom enterprise LLM fine-tuning & deployments',
        'Autonomous API & microservice engineering',
        'RAG document search & knowledge graphs',
        'High-concurrency cloud infrastructure'
      ],
      metric: '99.9% Uptime SLA',
      href: '/login',
      ctaText: 'Explore AI Software'
    },
    {
      id: 'mobile',
      title: 'Mobile Applications',
      badge: 'iOS & Android AI',
      icon: Smartphone,
      color: 'from-amber-500/10 to-orange-500/10 text-amber-600 border-amber-200',
      description: 'Native iOS and Android mobile apps infused with conversational AI, on-device neural models, and real-time push automation.',
      features: [
        'Native Swift, Kotlin & React Native AI apps',
        'Voice-enabled conversational copilot',
        'Offline on-device inference optimization',
        'Push notification intelligence engine'
      ],
      metric: '60 FPS Native UI',
      href: '/login',
      ctaText: 'Explore Mobile Apps'
    }
  ];

  return (
    <section id="industries" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Industry Solutions</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          Engineered for <span className="text-[#16A34A]">High-Impact</span> Industries.
        </h2>

        <p className="text-base text-slate-600 font-normal leading-relaxed">
          We build specialized autonomous solutions that solve deep operational bottlenecks across six core domains.
        </p>
      </div>

      {/* 6 Industry Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((ind) => {
          const Icon = ind.icon;
          return (
            <div
              key={ind.id}
              className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between space-y-6 group text-left"
            >
              <div className="space-y-4">
                {/* Card Top: Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${ind.color} border flex items-center justify-center transition-transform group-hover:scale-110 duration-200`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {ind.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {ind.description}
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-2 pt-2 border-t border-slate-100">
                  {ind.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom: Key Metric & Direct Action Link */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Proven Impact:</span>
                  <span className="font-extrabold text-emerald-600 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    {ind.metric}
                  </span>
                </div>

                <Link
                  href={ind.href}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-emerald-500 hover:text-white border border-slate-200 text-slate-800 text-xs font-bold flex items-center justify-between transition-all duration-200 group/link"
                >
                  <span>{ind.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
