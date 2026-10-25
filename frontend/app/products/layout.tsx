import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enterprise AI Products & AI Employees | AuromindAI',
  description:
    'Explore enterprise AI products engineered by parent company AuromindAI, featuring OrbionAgents—the autonomous AI employee platform for WhatsApp and multi-channel operations.',
  keywords: [
    'AI Products',
    'OrbionAgents',
    'AI Employees',
    'WhatsApp AI Automation',
    'Autonomous Business Agents',
    'Customer Support AI',
    'AuromindAI Products',
  ],
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Enterprise AI Products & AI Employees | AuromindAI',
    description:
      'Autonomous AI employees and enterprise software products by parent company AuromindAI, featuring OrbionAgents.',
    url: '/products',
    type: 'website',
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
