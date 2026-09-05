'use client';

import React from 'react';
import Link from 'next/link';
import { 
  HeartPulse, 
  ShieldCheck, 
  FileCheck, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  UserCheck, 
  Server,
  FileSignature
} from 'lucide-react';

export default function CompliancePage() {
  const complianceFrameworks = [
    {
      title: 'HIPAA Security & Privacy Rules',
      badge: 'Healthcare Verified',
      description: 'Full compliance with 45 CFR Part 160 and Part 164. Enables hospital systems, telehealth providers, and clinical clinics to deploy autonomous patient triage and scheduling without PHI leakage.',
      bullets: ['Automated PHI De-identification', 'Standard Business Associate Agreement (BAA)', 'Immutable Clinical Audit Trails']
    },
    {
      title: 'SOC-2 Type II Alignment',
      badge: 'Security & Availability',
      description: 'Independent third-party audits evaluating the operational effectiveness of AuromindAI’s security, confidentiality, availability, and processing integrity controls.',
      bullets: ['Continuous automated compliance monitoring', 'Least-privilege role-based access controls', 'Real-time infrastructure vulnerability scanning']
    },
    {
      title: 'GDPR & International Data Sovereignty',
      badge: 'European Union Standard',
      description: 'Strict adherence to EU Regulation 2016/679. Supports local European data residency, Standard Contractual Clauses (SCCs), and complete data subject access request (DSAR) workflows.',
      bullets: ['EU-only cloud hosting regions', 'Zero data retention for AI model training', 'Right to immediate erasure & JSON export']
    },
    {
      title: 'PCI-DSS Level 1 Infrastructure',
      badge: 'Payments & Billing',
      description: 'All customer payments, subscription tokens, and checkout transactions are processed through Level 1 PCI-DSS certified payment service providers.',
      bullets: ['Zero cardholder data stored on Auromind servers', 'Direct tokenized API integrations', 'Encrypted TLS 1.3 transaction tunnels']
    },
  ];

  return (
    <div className="space-y-12">
      {/* Top Banner */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <HeartPulse className="w-3.5 h-3.5 text-emerald-600" />
          <span>Regulatory Compliance &amp; Certifications</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          HIPAA &amp; Regulatory Compliance
        </h1>
        <p className="text-sm text-slate-500">
          Last Updated: September 5, 2026 · AuromindAI Trust &amp; Healthcare Compliance Division
        </p>
      </div>

      {/* BAA Callout */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 md:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-base">
            <FileSignature className="w-5 h-5 text-emerald-400" />
            <span>Standard Business Associate Agreement (BAA) Ready</span>
          </div>
          <a
            href="mailto:compliance@auromind.ai"
            className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
          >
            Execute BAA with AuromindAI
          </a>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          AuromindAI routinely signs Business Associate Agreements (BAAs) with covered entities under HIPAA, including hospitals, clinical provider networks, medical billing platforms, and telehealth startups.
        </p>
      </div>

      {/* 4 Compliance Frameworks */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          1. Supported Compliance Frameworks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {complianceFrameworks.map((fw, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-soft">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900">{fw.title}</h3>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {fw.badge}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {fw.description}
              </p>
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                {fw.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Healthcare Guardrails */}
      <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          2. Healthcare AI Guardrails &amp; Clinician Oversight
        </h2>
        <p>
          When deploying AuromindAI agents in clinical or healthcare settings, we enforce specialized safeguards:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>Clinician-in-the-Loop</span>
            </div>
            <p className="text-xs text-slate-600">
              Agents never issue definitive medical diagnoses. All patient symptom summaries are structured for licensed physician or nursing review before any care pathway is finalized.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Emergency Keyword Escalation</span>
            </div>
            <p className="text-xs text-slate-600">
              Immediate automated detection of critical emergency phrases (e.g., chest pain, severe bleeding) halts automated chat and instructs patients to dial emergency services (911/112).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Cryptographic Redaction</span>
            </div>
            <p className="text-xs text-slate-600">
              Patient Social Security numbers, dates of birth, and health insurance claim identifiers are automatically scrubbed and tokenized before vector embedding creation.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Physical & Administrative Safeguards */}
      <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          3. Physical, Technical &amp; Administrative Safeguards
        </h2>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li><strong>Workstation Security:</strong> All AuromindAI engineering staff operate company-managed hardware with full-disk encryption (FileVault/BitLocker), endpoint detection and response (EDR), and mandatory hardware MFA.</li>
          <li><strong>Role-Based Access Control (RBAC):</strong> Access to production databases is strictly restricted on a least-privilege, need-to-know basis with automated session revocation.</li>
          <li><strong>Background Checks &amp; Annual Training:</strong> All team members undergo background checks and mandatory annual HIPAA Security Awareness and privacy compliance training.</li>
        </ul>
      </div>

      {/* Contact Banner */}
      <div className="p-6 rounded-3xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Request Compliance Verification Package</h3>
          <p className="text-xs text-slate-500">Includes HIPAA Security Assessment, SOC-2 readiness letters, and standard BAA template.</p>
        </div>
        <a
          href="mailto:compliance@auromind.ai"
          className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shrink-0"
        >
          Email compliance@auromind.ai
        </a>
      </div>
    </div>
  );
}
