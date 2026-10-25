import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enterprise AI Services & Custom AI Solutions | AuromindAI',
  description:
    'End-to-end enterprise AI services by AuromindAI: AI strategy consulting, bespoke LLM development, multi-agent autonomous swarms, workflow automation, and 24/7 SLA operations.',
  keywords: [
    'Enterprise AI Services',
    'Custom AI Development',
    'Autonomous Multi-Agent Swarms',
    'AI Consulting',
    'Workflow Automation',
    'Enterprise LLM Engineering',
    'AI Integration',
    'AuromindAI Services',
  ],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Enterprise AI Services & Custom AI Solutions | AuromindAI',
    description:
      'We engineer bespoke AI software, autonomous multi-agent swarms, and enterprise API integrations with guaranteed measurable ROI.',
    url: '/services',
    type: 'website',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
