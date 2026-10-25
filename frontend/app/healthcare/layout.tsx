import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Healthcare AI & Clinical Operations Automation | AuromindAI',
  description:
    'HIPAA-compliant healthcare AI solutions by AuromindAI: patient intake triage, autonomous scheduling, clinical document intelligence, and medical billing workflow automation.',
  keywords: [
    'Healthcare AI',
    'Clinical Operations Automation',
    'HIPAA Compliant AI',
    'Patient Triage AI',
    'Medical Records AI',
    'AuromindAI Healthcare',
  ],
  alternates: {
    canonical: '/healthcare',
  },
  openGraph: {
    title: 'Healthcare AI & Clinical Intelligence | AuromindAI',
    description:
      'HIPAA-ready clinical intelligence and autonomous administrative automation engineered for healthcare networks.',
    url: '/healthcare',
    type: 'website',
  },
};

export default function HealthcareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
