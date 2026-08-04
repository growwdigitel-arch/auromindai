'use client';

import React, { useState } from 'react';
import { ChevronDown, Sparkles, Zap, Menu } from 'lucide-react';
import Image from 'next/image';
import { useChatStore } from '@/lib/store/useChatStore';

export function Navbar() {
  const { selectedModel, setSelectedModel, sidebarOpen, setSidebarOpen } = useChatStore();
  const [modelOpen, setModelOpen] = useState(false);

  const models = [
    { name: 'AuroVex 1 Fast', disabled: false },
    { name: 'AuroVex 1.5 Lite', disabled: true, status: 'Coming soon' },
    { name: 'AuroVex 1.5 Pro', disabled: true, status: 'Coming soon' }
  ];

  return (
    <header className="h-14 w-full bg-[#121214] text-white flex items-center justify-between px-4 md:px-6 border-b border-zinc-800/80 font-sans select-none">
      {/* Left: Hamburger menu + Brand (mobile) / Model Switcher (desktop) */}
      <div className="flex items-center gap-2.5">
        {/* Hamburger Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand Logo & Name (visible on mobile only) */}
        <div className="flex md:hidden items-center gap-2 mr-2">
          <Image src="/logo.png" alt="AuromindAI" width={22} height={22} unoptimized className="rounded-md" />
          <span className="text-sm font-black text-white tracking-tight">auromind</span>
        </div>

        {/* Model Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setModelOpen(!modelOpen)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-zinc-200 hover:bg-zinc-800/60 transition-colors"
          >
            <span>{selectedModel}</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
          </button>
 
        {modelOpen && (
          <div className="absolute top-10 left-0 w-64 rounded-xl bg-zinc-900 border border-zinc-800 shadow-floating p-1.5 z-50 animate-in fade-in">
            {models.map((m) => (
              <button
                key={m.name}
                disabled={m.disabled}
                onClick={() => {
                  setSelectedModel(m.name as any);
                  setModelOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                  m.disabled 
                    ? 'text-zinc-600 cursor-not-allowed' 
                    : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                } ${selectedModel === m.name ? 'bg-zinc-800/40 text-emerald-400' : ''}`}
              >
                <div className="flex items-center gap-2">
                  {selectedModel === m.name && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                  <span>{m.name}</span>
                </div>
                {m.status && (
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider bg-zinc-800/60 px-2 py-0.5 rounded whitespace-nowrap">
                    {m.status}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>

      {/* Right: Credits Counter & Upgrade Plan Pill */}
      <div className="flex items-center gap-3">
        {/* Credits Counter Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300">
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>101</span>
        </div>

        {/* Free Plan | Upgrade Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-400">
          <span>Free plan</span>
          <span className="text-zinc-600">|</span>
          <button className="text-emerald-400 font-semibold hover:underline">
            Upgrade
          </button>
        </div>
      </div>
    </header>
  );
}
