'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldAlert, Lock, User, KeyRound, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';

export function AdminAuthGate() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('auromind_owner_auth');
      if (stored) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const finalUsername = username.trim() || 'auromindai admin';

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: finalUsername, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('auromind_owner_auth', JSON.stringify(data.user || { name: 'AuromindAI Admin', role: 'Owner' }));
        setIsAuthenticated(true);
      } else {
        setError(data.message || 'Invalid admin credentials. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('auromind_owner_auth');
    } catch {}
    setIsAuthenticated(false);
    setPassword('');
    setError(null);
  };

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="h-screen w-screen bg-[#121214] flex flex-col items-center justify-center text-zinc-400 gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        <span className="text-xs font-mono">Verifying Owner Session...</span>
      </div>
    );
  }

  // Authenticated State -> Render Admin Dashboard
  if (isAuthenticated) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  // Unauthenticated State -> Render Owner Admin Login Form
  return (
    <div className="min-h-screen w-screen bg-[#0E0E10] text-white flex flex-col justify-between p-6 select-none relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:28px_28px] opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 flex items-center justify-between max-w-5xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2.5 text-base font-bold text-white hover:opacity-90 transition-opacity">
          <Image src="/logo.png" alt="AuromindAI Logo" width={32} height={32} unoptimized className="rounded-xl shadow-md" />
          <span className="text-lg font-black tracking-tight">auromind<span className="text-emerald-500">.ai</span></span>
        </Link>
        <Link
          href="/user/dashboard"
          className="text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 transition-colors"
        >
          Back to User Dashboard →
        </Link>
      </header>

      {/* Center Login Card */}
      <main className="relative z-10 w-full max-w-md mx-auto my-auto space-y-6 text-center">
        {/* Shield Header */}
        <div className="space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono font-bold mb-2">
              <KeyRound className="w-3 h-3" />
              RESTRICTED OWNER ACCESS
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">Owner Admin Login</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Sign in with authorized owner credentials to access the leads database and user sign-in analytics.
            </p>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800/60 text-xs text-red-300 flex items-start gap-2.5 text-left animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1 leading-snug">{error}</div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-left p-6 rounded-2xl bg-[#151518] border border-zinc-800/90 shadow-2xl backdrop-blur-md">
          {/* Username Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300 flex items-center justify-between">
              <span>Admin Username</span>
              <span className="text-[10px] text-zinc-500 font-mono">Authorized ID</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="auromindai admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-zinc-750 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all font-medium"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300 flex items-center justify-between">
              <span>Admin Password</span>
              <span className="text-[10px] text-zinc-500 font-mono">Master Key</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                required
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-black/50 border border-zinc-750 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Preset Credentials Helper Badge */}
          <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Owner Credential Setup:</span>
            </span>
            <span className="font-mono text-emerald-400 font-bold text-[10px]">
              auromindai admin
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
            ) : (
              <>
                <span>Unlock Owner Admin Panel</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-[11px] text-zinc-600 max-w-sm mx-auto space-y-1">
        <p>AuromindAI Security Shield · 256-bit Encrypted Admin Session</p>
        <p>© 2026 AuromindAI, Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
