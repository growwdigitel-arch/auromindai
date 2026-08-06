'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Globe, SlidersHorizontal, Mic, ArrowUp, Plus, Sparkles } from 'lucide-react';

export function LandingHero() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [webSearch, setWebSearch] = useState(true);
  const [toolsActive, setToolsActive] = useState(true);

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && input.trim()) {
      localStorage.setItem('pending_prompt', input);
    }
    router.push('/login');
  };

  const samplePrompts = [
    'Write a Python FastAPI service using AuroVex 1 Fast',
    'Analyze Q4 SaaS revenue and conversion metrics',
    'Draft an enterprise sales email sequence',
    'Deploy an autonomous customer support agent'
  ];

  return (
    <section className="relative overflow-hidden pt-16 pb-24 px-6 max-w-5xl mx-auto text-center space-y-8">
      {/* Background subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Centered Top Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-300/80 bg-emerald-50/90 text-emerald-600 text-xs font-semibold shadow-sm transition-all hover:scale-105">
          <Zap className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
          <span>AuroVex 1 Fast Engine Live</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
        </div>
      </div>

      {/* Main Headline */}
      <div className="space-y-4">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
          How can I help you <span className="text-[#16A34A]">today?</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto font-normal">
          Chat, code, analyze data, and build with the power of <strong className="font-bold text-slate-800">AuromindAI</strong>.
        </p>
      </div>

      {/* Main Floating ChatGPT-Style Prompt Box */}
      <div className="max-w-3xl mx-auto pt-2">
        <form onSubmit={handlePromptSubmit}>
          <div className="relative rounded-[28px] sm:rounded-[32px] bg-white border border-gray-200/90 shadow-[0_12px_45px_-10px_rgba(0,0,0,0.08)] p-4 sm:p-5 space-y-4 text-left focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-400/20 transition-all duration-300">
            {/* Input Textarea */}
            <textarea
              rows={3}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handlePromptSubmit(e);
                }
              }}
              placeholder="Ask anything..."
              className="w-full resize-none bg-transparent text-base text-slate-800 placeholder:text-gray-400 placeholder:font-normal focus:outline-none leading-relaxed px-1 pt-1"
            />

            {/* Bottom Action Control Bar */}
            <div className="flex items-center justify-between pt-2">
              {/* Left Controls */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Plus button */}
                <button
                  type="button"
                  onClick={() => router.push('/login')}
                  className="w-9 h-9 rounded-full border border-gray-200/90 bg-white flex items-center justify-center text-gray-500 hover:text-slate-900 hover:border-gray-300 transition-all shadow-sm cursor-pointer"
                  title="Add Attachment"
                >
                  <Plus className="w-4 h-4" />
                </button>

                {/* Tools pill button */}
                <button
                  type="button"
                  onClick={() => setToolsActive(!toolsActive)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                    toolsActive
                      ? 'border-gray-200 bg-gray-50/80 text-slate-700 hover:bg-gray-100'
                      : 'border-gray-200 text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
                  <span>Tools</span>
                </button>

                {/* Web Search pill button */}
                <button
                  type="button"
                  onClick={() => setWebSearch(!webSearch)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                    webSearch
                      ? 'border-gray-200 bg-gray-50/80 text-slate-700 hover:bg-gray-100'
                      : 'border-gray-200 text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-gray-500" />
                  <span>Web Search</span>
                </button>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-2">
                {/* Mic button */}
                <button
                  type="button"
                  onClick={() => router.push('/login')}
                  className="w-9 h-9 rounded-full border border-gray-200/90 bg-white flex items-center justify-center text-gray-500 hover:text-slate-900 hover:border-gray-300 transition-all shadow-sm cursor-pointer"
                  title="Voice Input"
                >
                  <Mic className="w-4 h-4 text-gray-600" />
                </button>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-10 h-10 rounded-2xl bg-[#16A34A] text-white flex items-center justify-center hover:bg-[#15803D] transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                  title="Send Message"
                >
                  <ArrowUp className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Quick Suggestion Chips below Prompt box */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {samplePrompts.map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => setInput(promptText)}
              className="px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs text-slate-600 hover:text-slate-900 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all shadow-sm text-left truncate max-w-[280px]"
            >
              {promptText}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
