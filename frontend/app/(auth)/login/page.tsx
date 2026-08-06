'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter as useAppRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

export default function LoginPage() {
  const router = useAppRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('pending_prompt');
      if (stored) {
        // Pending prompt ready for dashboard
      }
    }
  }, []);

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setIsLoading(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('google_token', tokenResponse.access_token);
      }
      setTimeout(() => {
        router.push('/dashboard');
      }, 300);
    },
    onError: () => {
      // Fallback redirect if popup is blocked
      const redirectUri = typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : 'http://localhost:3000/dashboard';
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=openid%20email%20profile`;
      window.location.href = authUrl;
    }
  });

  const handleAuth = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between p-6 select-none relative overflow-hidden font-sans">
      {/* Background Dot Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272A_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Top Bar: Brand Logo */}
      <header className="relative z-10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-lg font-bold tracking-tight text-white hover:opacity-90 transition-opacity">
          <Image src="/logo.png" alt="AuromindAI Logo" width={36} height={36} unoptimized className="rounded-xl shadow-glow" />
          <span className="text-xl font-black">auromind<span className="text-emerald-500">.ai</span></span>
        </Link>
      </header>

      {/* Center Auth Card */}
      <main className="relative z-10 w-full max-w-sm mx-auto my-auto space-y-6 text-center">
        {/* Top Icon Badge */}
        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto shadow-glow overflow-hidden p-2">
          <Image src="/logo.png" alt="AuromindAI Logo" width={52} height={52} unoptimized className="object-contain" />
        </div>

        {/* Headline */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-white">Sign in or sign up</h1>
          <p className="text-xs text-zinc-400">Start creating with AuromindAI</p>
        </div>

        {/* Google Authentication */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => handleGoogleAuth()}
            disabled={isLoading}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800/80 hover:bg-zinc-800 text-xs font-semibold text-zinc-200 transition-all group cursor-pointer active:scale-98"
          >
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.1-6.68-4.93H1.26v3.15C3.24 21.3 7.31 24 12 24z" />
                <path fill="#FBBC05" d="M5.32 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.98 0 12s.46 3.83 1.26 5.42l4.06-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.24 2.7 1.26 6.58l4.06 3.15c.94-2.83 3.57-4.98 6.68-4.98z" />
              </svg>
              <span>Continue with Google</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/50 text-emerald-400 font-medium">
              OAuth 2.0
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-zinc-800 w-full" />
          <span className="bg-[#09090B] px-3 text-[11px] font-medium text-zinc-500 absolute">Or</span>
        </div>

        {/* Email & Password Authentication Form */}
        <form onSubmit={handleAuth} className="space-y-3">
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
            <input
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-black text-xs font-semibold shadow-soft transition-all cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </main>

      {/* Footer Legal Terms */}
      <footer className="relative z-10 text-center text-[11px] text-zinc-500 max-w-sm mx-auto space-y-1 pt-6">
        <p>
          By continuing, you agree to our{' '}
          <a href="#" className="underline hover:text-zinc-300">Terms of Service</a> and have read our{' '}
          <a href="#" className="underline hover:text-zinc-300">Privacy Policy</a>.
        </p>
        <p>© 2026 AuromindAI, Inc.</p>
      </footer>
    </div>
  );
}
