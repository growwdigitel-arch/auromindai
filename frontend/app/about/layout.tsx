import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About AuromindAI | Parent Company & Enterprise AI Vision',
  description:
    'AuromindAI Private Limited is a global AI technology parent company focused on building intelligent solutions and autonomous AI employees that transform enterprise operations.',
  keywords: [
    'About AuromindAI',
    'AuromindAI Private Limited',
    'AI Parent Company',
    'AI Enterprise Leadership',
    'Enterprise AI Innovation',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About AuromindAI | Parent Technology Corporation',
    description:
      'AuromindAI Private Limited is an AI technology company building innovative solutions and AI employees that help businesses automate operations and achieve sustainable growth.',
    url: '/about',
    type: 'website',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
