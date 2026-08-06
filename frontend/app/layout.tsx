import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AuromindAI - AI Employees that work 24/7',
  description: 'Automate Sales, Customer Support, Marketing, and Operations with autonomous AI agents trained on your enterprise data.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-foreground antialiased selection:bg-accent-light selection:text-secondary" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
