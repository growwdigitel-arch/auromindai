'use client';

import React from 'react';
import { Smartphone, Gauge, ShoppingBag, CreditCard } from 'lucide-react';

export function EcommerceFeatures() {
  const features = [
    {
      title: 'Mobile-First Design',
      description: 'Over 70% of eCommerce traffic is mobile. We design native-feeling mobile experiences that drive impulse purchases.',
      icon: Smartphone,
      color: 'bg-emerald-500',
    },
    {
      title: 'Lightning Fast Load Times',
      description: 'Every second delay costs you 7% in conversions. We use Next.js edge caching for sub-100ms response times.',
      icon: Gauge,
      color: 'bg-blue-500',
    },
    {
      title: 'Conversion-Optimized UX',
      description: 'Frictionless checkout flows, smart upselling, and persuasive product pages designed to maximize your AOV.',
      icon: ShoppingBag,
      color: 'bg-amber-500',
    },
    {
      title: 'Seamless Payments',
      description: 'Integrated with Stripe, PayPal, and local payment gateways for secure, one-click checkouts globally.',
      icon: CreditCard,
      color: 'bg-violet-500',
    },
  ];

  return (
    <section className="py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            Built for <span className="text-emerald-600">Performance</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We don't just build beautiful websites. We build revenue-generating machines engineered for growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 border border-border shadow-soft hover:shadow-floating transition-all duration-300 group">
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
