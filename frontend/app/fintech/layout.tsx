import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FinTech AI & Financial Services Automation | AuromindAI',
  description:
    'Enterprise FinTech AI solutions by AuromindAI: automated KYC/AML verification, real-time fraud telemetry, loan processing automation, and compliance guardrails.',
  keywords: [
    'FinTech AI',
    'Financial Services Automation',
    'AI KYC Verification',
    'AI Fraud Detection',
    'Automated Loan Underwriting',
    'AuromindAI FinTech',
  ],
  alternates: {
    canonical: '/fintech',
  },
  openGraph: {
    title: 'FinTech AI & Financial Intelligence | AuromindAI',
    description:
      'Bank-grade AI security, sub-second transaction anomaly detection, and automated compliance pipelines.',
    url: '/fintech',
    type: 'website',
  },
};

export default function FintechLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
