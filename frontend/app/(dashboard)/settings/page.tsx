'use client';

import React, { useState } from 'react';
import { Settings, Key, Shield, CreditCard, Sparkles, Eye, EyeOff, Copy, Check } from 'lucide-react';

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('am_live_9f8a31b402847c92a');
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto w-full space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
          <Settings className="w-4 h-4" />
          <span>Platform Settings</span>
        </div>
        <h1 className="text-3xl font-bold text-primary tracking-tight">Workspace Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage API credentials, security authentication, and subscription billing.</p>
      </div>

      {/* API Keys */}
      <div className="floating-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 text-secondary" />
          <h2 className="text-base font-bold text-primary">API Credentials</h2>
        </div>
        <p className="text-xs text-muted-foreground">Use this key to authenticate programmatic requests to AuromindAI FastAPI endpoints.</p>

        <div className="flex items-center gap-2 max-w-md">
          <div className="relative flex-1">
            <input
              type={showKey ? 'text' : 'password'}
              readOnly
              value={apiKey}
              className="w-full px-3 py-2 rounded-xl border border-border bg-white font-mono text-xs text-primary"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-2.5 text-muted-foreground hover:text-primary"
            >
              {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
          <button
            onClick={copyKey}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-card border border-border text-xs font-semibold hover:bg-white"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-secondary" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Billing */}
      <div className="floating-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-secondary" />
            <h2 className="text-base font-bold text-primary">Subscription Plan</h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-accent-light text-secondary text-xs font-bold">
            Pro Plan Active
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 border-t border-border pt-4">
          <div>
            <div className="text-[11px] text-muted-foreground">Monthly Usage</div>
            <div className="text-lg font-bold text-primary">42,150 / 100,000</div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full mt-1 overflow-hidden">
              <div className="bg-secondary h-full w-[42%]" />
            </div>
          </div>
          <div>
            <div className="text-[11px] text-muted-foreground">Active AI Workers</div>
            <div className="text-lg font-bold text-primary">6 Employees</div>
          </div>
          <div>
            <div className="text-[11px] text-muted-foreground">Next Billing Date</div>
            <div className="text-lg font-bold text-primary">Sep 1, 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}
