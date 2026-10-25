import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { AuthProvider } from '@/components/providers/AuthProvider';

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://auromindai.com';

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: 'AuromindAI | Enterprise AI Solutions & Autonomous AI Systems',
    template: '%s | AuromindAI',
  },
  description:
    'AuromindAI Private Limited is a global AI technology company and parent corporation engineering enterprise AI systems, autonomous multi-agent swarms, and custom AI software. Parent company of OrbionAgents.',
  applicationName: 'AuromindAI',
  authors: [{ name: 'AuromindAI Private Limited', url: appUrl }],
  generator: 'Next.js',
  keywords: [
    'AuromindAI',
    'Auromind AI',
    'Auromind',
    'AI Parent Company',
    'Enterprise AI Solutions',
    'Autonomous AI Agents',
    'AI Employees',
    'OrbionAgents',
    'Multi-Agent Workflows',
    'Custom AI Development',
    'Business Process Automation',
    'Enterprise LLM Solutions',
    'WhatsApp AI Automation',
    'RAG Architecture',
    'PropTech AI',
    'FinTech AI',
    'Healthcare AI',
    'DPIIT Recognized Startup',
    'StartupTN Approved Startup',
    'Meta Tech Provider',
  ],
  creator: 'AuromindAI Private Limited',
  publisher: 'AuromindAI Private Limited',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AuromindAI | Enterprise AI Solutions & Autonomous AI Systems',
    description:
      'Enterprise AI software, autonomous multi-agent swarms, and AI employee solutions built for global businesses. Parent company of OrbionAgents.',
    url: appUrl,
    siteName: 'AuromindAI',
    images: [
      {
        url: '/hero-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'AuromindAI - Enterprise AI Technology & Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AuromindAI | Enterprise AI Solutions & Autonomous Systems',
    description:
      'Enterprise AI software, autonomous multi-agent swarms, and intelligent AI employees. Parent company of OrbionAgents.',
    images: ['/hero-banner.jpg'],
    creator: '@auromindai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: [{ url: '/logo.png', sizes: '180x180', type: 'image/png' }],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Corporation',
  name: 'AuromindAI Private Limited',
  alternateName: ['AuromindAI', 'Auromind AI', 'Auromind'],
  url: appUrl,
  logo: `${appUrl}/logo.png`,
  image: `${appUrl}/hero-banner.jpg`,
  description:
    'AuromindAI Private Limited is a global AI technology parent company specializing in enterprise AI solutions, autonomous multi-agent workflows, and intelligent business automation.',
  foundingDate: '2024',
  award: [
    'DPIIT Recognized Startup (Government of India)',
    'StartupTN Approved Startup (Government of Tamil Nadu)',
    'Official Meta Tech Provider',
  ],
  sameAs: [
    'https://orbionagents.com',
    'https://twitter.com/auromindai',
    'https://linkedin.com/company/auromindai',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@auromindai.com',
    contactType: 'customer support',
    availableLanguage: ['English'],
  },
  brand: [
    {
      '@type': 'Brand',
      name: 'OrbionAgents',
      url: 'https://orbionagents.com',
      description: 'Autonomous AI Employees & WhatsApp Automation SaaS Platform',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AuromindAI Enterprise AI Solutions',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Strategy & Consulting',
          description: 'High-impact enterprise AI feasibility auditing and 90-day execution roadmaps',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom AI Development',
          description: 'Domain LLM fine-tuning, autonomous multi-agent swarm architecture and guardrails',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Automation & Workflows',
          description: 'Intelligent document processing, back-office automation, and zero-latency business pipelines',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Ecosystem Integration',
          description: 'CRM, ERP, WhatsApp Cloud API, and vector database read/write pipelines',
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden max-w-full" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="shortcut icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Schema.org Organization Structured Data for Parent Company */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Google tag (gtag.js) & Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18268816672"
          strategy="afterInteractive"
        />
        <Script id="google-tag-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YTXX4NGNLQ');
            gtag('config', 'AW-18268816672');
          `}
        </Script>
      </head>
      <body className="bg-background text-foreground antialiased selection:bg-accent-light selection:text-secondary overflow-x-hidden max-w-full w-full" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
