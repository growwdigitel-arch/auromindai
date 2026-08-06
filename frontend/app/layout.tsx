import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
  fallback: ['monospace'],
});

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
    <html lang="en" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased selection:bg-accent-light selection:text-secondary" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
