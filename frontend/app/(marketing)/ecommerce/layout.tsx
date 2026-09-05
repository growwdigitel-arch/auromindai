import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom eCommerce Website Development & AI Stores | AuromindAI Commerce',
  description: 'High-performance custom eCommerce website development for high-growth brands. Sub-second edge speed, native AI recommendations, zero monthly plugin fees, and Google & Meta Ads conversion optimization.',
  keywords: [
    'eCommerce website development',
    'custom eCommerce development',
    'eCommerce website development company',
    'AI eCommerce development',
    'high speed eCommerce store',
    'Meta ads conversion optimization',
    'Google ads eCommerce landing page'
  ],
  openGraph: {
    title: 'Custom eCommerce Website Development & AI Stores | AuromindAI Commerce',
    description: 'High-performance custom eCommerce stores engineered for Google & Meta Ads traffic. Sub-0.5s speed and built-in AI.',
    type: 'website',
  },
};

export default function EcommerceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
