import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Real Estate CRM, Leads & Sales AI Solutions | AuromindAI PropTech',
  description: 'Autonomous AI Sales Agents, Intelligent Real Estate CRM, 60-second Lead Qualification, Virtual Staging, and PropTech Automation for high-growth brokerages and developers.',
  keywords: [
    'Real Estate AI',
    'Real Estate CRM',
    'Real Estate Leads AI',
    'Real Estate Sales AI',
    'PropTech Solutions',
    'AI Lead Qualification Real Estate',
    'Automated WhatsApp Real Estate Bot',
    'Virtual Staging AI',
    'Brokerage Automation'
  ],
  openGraph: {
    title: 'Autonomous Real Estate CRM & AI Sales Suite | AuromindAI',
    description: 'Convert buyer inquiries into booked site visits 24/7. Autonomous AI qualification, intelligent CRM pipeline, and automated inventory matching.',
    type: 'website',
  },
};

export default function RealEstateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
