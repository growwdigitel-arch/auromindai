'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff, FileText, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-12">
      {/* Top Banner */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Official Legal Document</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500">
          Last Updated &amp; Effective Date: September 5, 2026 · AuromindAI, Inc.
        </p>
      </div>

      {/* Highlights Box */}
      <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-base">
          <EyeOff className="w-5 h-5 text-emerald-700" />
          <span>Core Privacy Principle: Zero Data Retention (ZDR) Guarantee</span>
        </div>
        <p className="text-xs md:text-sm text-emerald-950 leading-relaxed">
          At <strong className="font-bold">AuromindAI</strong>, we adhere to a strict <strong className="font-bold">Zero Data Retention (ZDR)</strong> policy for foundation AI models. Your proprietary customer conversations, healthcare records, financial metrics, and company databases are <strong className="font-bold">never</strong> used to train, retrain, or improve public AI models (such as OpenAI, Anthropic, or Meta models). All enterprise processing occurs in isolated, ephemeral tenant sandboxes.
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-10 text-slate-700 text-sm leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="text-emerald-600 font-mono">1.</span> Information We Collect
          </h2>
          <p>
            When you interact with AuromindAI services, platforms, and autonomous swarms, we may collect the following categories of information:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Account &amp; Profile Data:</strong> Name, business email, organization name, phone number, and billing details when signing up.</li>
            <li><strong>Inbound Channel Telemetry:</strong> Customer messages submitted via WhatsApp Business API, SMS, website chat widgets, or webhook endpoints configured on your account.</li>
            <li><strong>Operational Metadata:</strong> IP addresses, browser types, session timestamps, latency logs, and autonomous agent tool execution records for auditing and security purposes.</li>
            <li><strong>Integration Credentials:</strong> Encrypted OAuth tokens and API secrets (e.g. Shopify, PostgreSQL, Google Calendar, HubSpot) required to execute autonomous business tasks on your behalf.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="text-emerald-600 font-mono">2.</span> How We Use Your Information
          </h2>
          <p>
            We process collected data strictly to execute agreed-upon autonomous workflows and deliver contractual enterprise services:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {[
              'Autonomous lead qualification & WhatsApp appointment booking',
              'Sub-second RAG search against your uploaded documentation',
              'Real-time transaction & cart recovery alerts',
              'HIPAA-compliant pre-consultation patient intake',
              'Detecting security anomalies and preventing system abuse',
              'Generating transparent audit trails for executive compliance'
            ].map((purpose, idx) => (
              <div key={idx} className="flex items-start gap-2 p-3 rounded-2xl bg-white border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-slate-800">{purpose}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="text-emerald-600 font-mono">3.</span> Data Encryption &amp; Cryptographic Controls
          </h2>
          <p>
            Security is engineered directly into our infrastructure architecture:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Data in Transit:</strong> Encrypted using TLS 1.3 with Perfect Forward Secrecy (PFS) and strict HSTS headers across all public and internal service boundaries.</li>
            <li><strong>Data at Rest:</strong> Encrypted using AES-256 GCM. Encryption keys are managed via AWS Key Management Service (KMS) or dedicated Hardware Security Modules (HSM).</li>
            <li><strong>Database Row-Level Security (RLS):</strong> Multi-tenant segregation ensures that tenant data is cryptographically and logically isolated from other accounts.</li>
          </ul>
          <p className="pt-1">
            For deeper architectural details, please review our comprehensive <Link href="/security" className="text-emerald-600 font-bold underline hover:text-emerald-700">Data Encryption &amp; Security Architecture document</Link>.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="text-emerald-600 font-mono">4.</span> Sub-Processors &amp; Third-Party Services
          </h2>
          <p>
            AuromindAI engages vetted enterprise sub-processors to assist in infrastructure hosting, database storage, and AI inferencing. All sub-processors are subject to rigorous Data Processing Agreements (DPAs) with strict confidentiality and security warranties:
          </p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="py-3 px-4">Sub-Processor</th>
                  <th className="py-3 px-4">Role &amp; Activity</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Compliance Safeguards</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900">Amazon Web Services (AWS)</td>
                  <td className="py-3 px-4">Cloud Hosting, KMS, RDS</td>
                  <td className="py-3 px-4">US &amp; EU Regions</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700">SOC-2 Type II, ISO 27001</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900">Meta WhatsApp Cloud API</td>
                  <td className="py-3 px-4">WhatsApp Messaging Gateway</td>
                  <td className="py-3 px-4">Global Edge</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700">End-to-End Enterprise Encryption</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900">Dedicated LLM VPC Inference</td>
                  <td className="py-3 px-4">Zero Data Retention LLM Inference</td>
                  <td className="py-3 px-4">US Isolated VPC</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700">Zero Retention &amp; No Model Training</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900">Stripe, Inc.</td>
                  <td className="py-3 px-4">Payment Processing &amp; Billing</td>
                  <td className="py-3 px-4">United States</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700">PCI-DSS Level 1 Certified</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="text-emerald-600 font-mono">5.</span> Your Rights Under GDPR, CCPA &amp; Global Frameworks
          </h2>
          <p>
            Depending on your jurisdiction, you have statutory rights regarding your personal data:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Right to Access:</strong> Request a complete copy of personal records held by AuromindAI in a structured JSON format.</li>
            <li><strong>Right to Erasure (Right to be Forgotten):</strong> Request the permanent deletion of your account, conversation transcripts, and indexing data.</li>
            <li><strong>Right to Rectification:</strong> Update or correct inaccurate personal or business details.</li>
            <li><strong>Right to Restrict Processing:</strong> Suspend autonomous processing or revoke third-party API tokens at any time.</li>
            <li><strong>Right to Opt-Out of Automated Profiling:</strong> Configure mandatory Human-in-the-Loop approval for any sensitive agent decision.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="text-emerald-600 font-mono">6.</span> Data Retention &amp; Deletion
          </h2>
          <p>
            We retain your operational data only for as long as your account is active or as required by statutory accounting and legal obligations. Upon termination of service, all tenant databases, vector embeddings, and temporary credentials are cryptographically scrubbed within thirty (30) business days.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="text-emerald-600 font-mono">7.</span> Contact Our Data Protection Officer (DPO)
          </h2>
          <p>
            For privacy inquiries, Data Protection Agreements (DPA), or to exercise your GDPR/CCPA rights, please contact our dedicated security team:
          </p>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-1 font-mono text-xs text-slate-800">
            <p><strong>AuromindAI Trust &amp; Privacy Office</strong></p>
            <p>Email: <a href="mailto:privacy@auromind.ai" className="text-emerald-600 underline">privacy@auromind.ai</a></p>
            <p>Security Portal: <a href="mailto:security@auromind.ai" className="text-emerald-600 underline">security@auromind.ai</a></p>
            <p>Physical Address: AuromindAI Global Operations, San Francisco, CA &amp; Bangalore, India</p>
          </div>
        </section>
      </div>
    </div>
  );
}
