'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, CheckCircle2, ShieldAlert, Scale, ArrowRight } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="space-y-12">
      {/* Top Banner */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5 text-slate-700" />
          <span>Binding Legal Agreement</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-500">
          Last Revised: September 5, 2026 · AuromindAI, Inc.
        </p>
      </div>

      {/* Summary Box */}
      <div className="rounded-3xl bg-white border border-slate-200 p-6 md:p-8 space-y-3 shadow-soft">
        <h3 className="font-bold text-slate-900 text-base">Key Terms Summary</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of AuromindAI’s autonomous agent platforms, APIs, custom software development services, and mobile applications. By accessing or using our services, you agree to be legally bound by these Terms. If you are entering into this agreement on behalf of a company or legal entity, you represent that you have the authority to bind such entity.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-10 text-slate-700 text-sm leading-relaxed">
        {/* 1. Services & Autonomous AI Swarms */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="text-emerald-600 font-mono">1.</span> Autonomous AI Services &amp; Swarms
          </h2>
          <p>
            AuromindAI provides software platforms, autonomous agent orchestration systems, and custom engineering across diverse industries including eCommerce, Healthcare, Philanthropy (Giving AI), Real Estate, and Mobile Applications. Our proprietary autonomous agent engine enables multi-agent task execution.
          </p>
          <p>
            You acknowledge that autonomous AI systems operate based on stochastic machine learning models, statistical heuristics, and external API tool calls. While AuromindAI builds deterministic guardrails and verification layers, you are responsible for monitoring agent activities and establishing appropriate Human-in-the-Loop approval workflows for critical transactions.
          </p>
        </section>

        {/* 2. Customer Ownership & Intellectual Property */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="text-emerald-600 font-mono">2.</span> Intellectual Property &amp; Customer Data Ownership
          </h2>
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs text-emerald-950">
            <p className="font-bold text-sm">You Own Your Data and Your Outputs:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Customer Data:</strong> You retain all right, title, and interest in and to all data, proprietary files, databases, and customer records provided to AuromindAI.</li>
              <li><strong>Generated Work Product:</strong> As between you and AuromindAI, you own all deliverables, output text, custom workflows, and code generated specifically for your account.</li>
              <li><strong>Zero Foundation Model Training:</strong> AuromindAI does not claim any ownership over your customer data and guarantees that your data will not be used to train public models.</li>
            </ul>
          </div>
        </section>

        {/* 3. Acceptable Use Policy */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="text-emerald-600 font-mono">3.</span> Acceptable Use &amp; Prohibited Activities
          </h2>
          <p>You agree not to use or permit any third party to use AuromindAI services to:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Engage in illegal, deceptive, fraudulent, or defamatory business practices.</li>
            <li>Send unsolicited spam messages, automated mass cold messaging violating WhatsApp Business Messaging Policies or CAN-SPAM regulations.</li>
            <li>Attempt to reverse-engineer, decompile, or extract the underlying model weights, system prompts, or proprietary routing algorithms of AuromindAI platforms.</li>
            <li>Bypass security controls, penetration-test production environments without prior written authorization, or overload API gateways.</li>
            <li>Deploy autonomous medical diagnostic tools without clinician-in-the-loop oversight compliant with applicable healthcare laws.</li>
          </ul>
        </section>

        {/* 4. Service Level Commitments & Uptime */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="text-emerald-600 font-mono">4.</span> Service Levels &amp; Availability (SLA)
          </h2>
          <p>
            AuromindAI uses commercially reasonable efforts to maintain a 99.9% uptime for our core API endpoints and autonomous execution runtimes, excluding scheduled maintenance windows announced at least 48 hours in advance. Enterprise Dedicated VPC clients are covered under custom Service Level Agreements (SLAs) with 99.99% availability warranties and financial service credits.
          </p>
        </section>

        {/* 5. Fees, Subscriptions & Billing */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="text-emerald-600 font-mono">5.</span> Fees, Billing &amp; Payment Terms
          </h2>
          <p>
            Fees for software licenses, autonomous compute tokens, and custom development packages are specified in your ordering schedule or enterprise Master Services Agreement (MSA). All payments are processed securely via Stripe or invoicing. Subscription fees are billed in advance on a monthly or annual cadence.
          </p>
        </section>

        {/* 6. Limitation of Liability */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="text-emerald-600 font-mono">6.</span> Limitation of Liability
          </h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL AUROMINDAI, INC., ITS DIRECTORS, EMPLOYEES, OR PARTNERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH THE USE OF OR INABILITY TO USE OUR AUTONOMOUS SERVICES.
          </p>
        </section>

        {/* 7. Governing Law & Dispute Resolution */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="text-emerald-600 font-mono">7.</span> Governing Law &amp; Arbitration
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law principles. Any dispute arising from these Terms shall be resolved by binding arbitration conducted under the commercial rules of the American Arbitration Association (AAA).
          </p>
        </section>

        {/* 8. Contact Information */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="text-emerald-600 font-mono">8.</span> Legal Notices &amp; Contact
          </h2>
          <p>
            Please direct all legal notices, enterprise contract inquiries, and inquiries regarding these Terms to:
          </p>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 font-mono text-xs text-slate-800 space-y-1">
            <p><strong>AuromindAI Legal &amp; Corporate Governance</strong></p>
            <p>Email: <a href="mailto:legal@auromind.ai" className="text-emerald-600 underline">legal@auromind.ai</a></p>
            <p>Executive Office: AuromindAI Global Operations, San Francisco, CA &amp; Bangalore, India</p>
          </div>
        </section>
      </div>
    </div>
  );
}
