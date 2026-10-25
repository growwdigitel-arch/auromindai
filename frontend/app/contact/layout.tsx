import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact AuromindAI | Enterprise AI Architecture & Consultations',
  description:
    'Connect with AuromindAI enterprise solution engineers. Schedule a 30-minute scoping call for bespoke AI development, agent workflows, or strategic partnerships.',
  keywords: [
    'Contact AuromindAI',
    'Enterprise AI Consultation',
    'AI Scoping Call',
    'AI Project Consultation',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact AuromindAI | Enterprise AI Scoping & Inquiries',
    description:
      'Book a 30-minute scoping call with an AuromindAI solutions engineer. We review your workflows and map out a tailored execution plan.',
    url: '/contact',
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
