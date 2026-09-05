'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, DollarSign, Clock, TrendingUp, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export function InteractiveCalculator() {
  const [teamSize, setTeamSize] = useState<number>(5);
  const [hourlyRate, setHourlyRate] = useState<number>(35);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState<number>(15);

  // Computed calculations
  const totalWeeklyHours = teamSize * manualHoursPerWeek;
  const annualHoursSaved = Math.round(totalWeeklyHours * 52 * 0.75); // 75% automated
  const annualDollarsSaved = Math.round(annualHoursSaved * hourlyRate);
  const formattedSavings = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(annualDollarsSaved);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold shadow-sm">
          <Calculator className="w-3.5 h-3.5 text-emerald-600" />
          <span>Interactive ROI Estimator</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          Calculate Your <span className="text-[#16A34A]">Workforce Savings</span>.
        </h2>

        <p className="text-base text-slate-600 font-normal leading-relaxed">
          See how much your organization saves in operational overhead by deploying OrbionAgents autonomous swarms.
        </p>
      </div>

      {/* Main Calculator Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-3xl bg-white border border-slate-200/90 shadow-xl overflow-hidden">
        {/* Left Side: Sliders (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-10 space-y-8 text-left">
          {/* Slider 1: Team Size */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900">
                Staff Handling Sales &amp; Repetitive Workflows
              </label>
              <span className="font-mono font-black text-emerald-600 text-base px-3 py-1 bg-emerald-50 rounded-lg border border-emerald-200">
                {teamSize} People
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full accent-emerald-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>1 Person</span>
              <span>25 People</span>
              <span>50 People</span>
            </div>
          </div>

          {/* Slider 2: Average Hourly Rate */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900">
                Average Hourly Compensation
              </label>
              <span className="font-mono font-black text-emerald-600 text-base px-3 py-1 bg-emerald-50 rounded-lg border border-emerald-200">
                ${hourlyRate} / hour
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="150"
              step="5"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full accent-emerald-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>$15 / hr</span>
              <span>$75 / hr</span>
              <span>$150 / hr</span>
            </div>
          </div>

          {/* Slider 3: Manual Hours Spent Weekly */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900">
                Weekly Hours Spent on Repetitive Tasks per Person
              </label>
              <span className="font-mono font-black text-emerald-600 text-base px-3 py-1 bg-emerald-50 rounded-lg border border-emerald-200">
                {manualHoursPerWeek} hrs / week
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="35"
              value={manualHoursPerWeek}
              onChange={(e) => setManualHoursPerWeek(Number(e.target.value))}
              className="w-full accent-emerald-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>5 hrs</span>
              <span>20 hrs</span>
              <span>35 hrs</span>
            </div>
          </div>
        </div>

        {/* Right Side: Computed Results (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-8 sm:p-10 flex flex-col justify-between space-y-8 text-left">
          <div className="space-y-6">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/60 inline-block">
              Projected Annual Return
            </span>

            <div>
              <span className="text-xs text-slate-400 font-semibold block uppercase">Estimated Yearly Operational Savings</span>
              <div className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight mt-1 font-mono">
                {formattedSavings}
              </div>
              <span className="text-xs text-slate-500 font-mono mt-1 block">
                Calculated on 75% autonomous automation rate.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">Reclaimed Time</span>
                <span className="text-xl font-bold text-white font-mono mt-0.5 block">{annualHoursSaved.toLocaleString()} hrs</span>
                <span className="text-[10px] text-emerald-400 font-mono">annually</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">Lead Speed</span>
                <span className="text-xl font-bold text-white font-mono mt-0.5 block">38s</span>
                <span className="text-[10px] text-emerald-400 font-mono">instant WhatsApp</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800">
            <Link
              href="/login"
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-[0_10px_25px_-5px_rgba(16,185,129,0.3)] transition-all hover:scale-105 active:scale-95"
            >
              <span>Automate Workflows with AuromindAI</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Production ready · Instant onboarding</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
