'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  FileCheck, 
  Server, 
  KeyRound, 
  EyeOff, 
  CheckCircle2, 
  ArrowRight,
  DatabaseZap
} from 'lucide-react';

export function SecurityComplianceSection() {
  const securityPillars = [
    {
      icon: EyeOff,
      title: 'Zero Data Retention (ZDR)',
      badge: 'Privacy by Design',
      description: 'Your enterprise data, customer chats, and proprietary records are never used to train foundation models. Enterprise sessions operate with cryptographic ephemerality.',
    },
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      badge: 'AES-256 & TLS 1.3',
      description: 'All data at rest is encrypted with military-grade AES-256. In-flight API communications leverage TLS 1.3 with Perfect Forward Secrecy across all endpoints.',
    },
    {
      icon: FileCheck,
      title: 'HIPAA & SOC-2 Compliance',
      badge: 'Healthcare & SaaS Ready',
      description: 'Built-in audit trails, clinician-in-the-loop safeguards, and strict PHI de-identification protocols allow medical centers and financial platforms to deploy safely.',
    },
    {
      icon: Server,
      title: 'Dedicated VPC & On-Prem Options',
      badge: 'Enterprise Isolation',
      description: 'Deploy AuromindAI systems within your own AWS/GCP VPC or sovereign on-premise infrastructure with strict air-gapped network policies and single-tenant isolation.',
    },
    {
      icon: KeyRound,
      title: 'Granular RBAC & Audit Trails',
      badge: 'Complete Governance',
      description: 'Define strict role-based access control, enforce Multi-Factor Authentication (MFA), and inspect tamper-proof JSON-structured audit logs for every autonomous action.',
    },
    {
      icon: DatabaseZap,
      title: 'Human-in-the-Loop Safeguards',
      badge: 'Autonomous Guardrails',
      description: 'Establish customizable confidence thresholds. High-stakes actions (e.g. wire transfers, medical advice, contract signings) require explicit manager approval.',
    },
  ];

  return (
    <section className="py-24 px-6 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Enterprise Security & Trust Center</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Bank-Grade Security for <span className="text-emerald-600">Mission-Critical AI</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            We engineer autonomous systems with uncompromising security, enterprise compliance, and zero-compromise data governance at every layer of execution.
          </p>
        </div>

        {/* 6 Security Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900">
                  {pillar.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Enterprise Compliance Callout Card */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ENTERPRISE READINESS REPORT
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white">
              Need a custom DPA, BAA, or SOC-2 Compliance Package?
            </h3>
            <p className="text-sm text-slate-400">
              Our enterprise security architects are ready to review custom Data Protection Agreements, Business Associate Agreements (BAA for HIPAA), and vendor security questionnaires.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/login"
              className="px-6 py-3.5 rounded-2xl bg-emerald-500 text-slate-950 font-black text-sm hover:bg-emerald-400 transition-all shadow-md flex items-center gap-2"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
