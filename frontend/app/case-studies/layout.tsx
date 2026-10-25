import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enterprise AI Case Studies & Proven ROI | AuromindAI',
  description:
    'Discover real-world enterprise case studies and measurable business ROI achieved by companies deploying AuromindAI software, OrbionAgents, and autonomous swarms.',
  keywords: [
    'AI Case Studies',
    'Enterprise AI Results',
    'AI ROI Metrics',
    'AuromindAI Case Studies',
    'AI Business Impact',
  ],
  alternates: {
    canonical: '/case-studies',
  },
  openGraph: {
    title: 'Enterprise AI Case Studies & Proven ROI | AuromindAI',
    description:
      'Real businesses, real ROI. See how companies eliminate operational latency and accelerate pipeline velocity with AuromindAI.',
    url: '/case-studies',
    type: 'website',
  },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
