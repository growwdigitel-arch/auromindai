'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Lock, 
  ShieldCheck, 
  Key, 
  Server, 
  EyeOff, 
  Cpu, 
  FileCheck, 
  CheckCircle2, 
  Zap, 
  Terminal,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function DataEncryptionSecurityPage() {
  const encryptionSpecs = [
    {
      category: 'In-Transit Encryption',
      algorithm: 'TLS 1.3 & HSTS',
      cipher: 'ECDHE-ECDSA-AES256-GCM-SHA384',
      details: 'All incoming and outgoing network traffic across API endpoints, WhatsApp webhook gateways, and web dashboards enforces TLS 1.3 with Perfect Forward Secrecy.'
    },
    {
      category: 'At-Rest Encryption',
      algorithm: 'AES-256 GCM',
      cipher: 'Galois/Counter Mode',
      details: 'All relational databases, vector embeddings, disk volumes, and encrypted backups are secured using military-grade AES-256 GCM authenticated encryption.'
    },
    {
      category: 'Cryptographic Key Management',
      algorithm: 'AWS KMS / FIPS 140-2 Level 3 HSM',
      cipher: 'Automated 90-Day Key Rotation',
      details: 'Cryptographic master keys are stored within dedicated hardware security modules (HSM) with strict envelope encryption and zero developer key access.'
    },
    {
      category: 'Agent Execution Isolation',
      algorithm: 'Ephemeral Micro-VM Sandboxing',
      cipher: 'Kernel Namespace Isolation (cgroups v2)',
      details: 'Autonomous tool runners and Python execution tasks run in isolated, disposable micro-VMs with no access to adjacent tenant memory or host network stacks.'
    },
  ];

  return (
    <div className="space-y-12">
      {/* Top Banner */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Cryptographic Architecture &amp; Enterprise Security</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Data Encryption &amp; Security Standards
        </h1>
        <p className="text-sm text-slate-500">
          Last Updated: September 5, 2026 · AuromindAI Engineering &amp; Information Security
        </p>
      </div>

      {/* Trust Callout */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 md:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-base">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Zero-Trust Enterprise Security Architecture</span>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          At <strong className="text-white font-bold">AuromindAI</strong>, data encryption is not an afterthought or an optional add-on. Every interaction—from a customer sending a WhatsApp message to an autonomous agent executing a database query—is protected by continuous authenticated encryption, strict tenant segregation, and auditable governance.
        </p>
      </div>

      {/* 4 Cryptographic Pillars Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          1. Cryptographic Protocol Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {encryptionSpecs.map((spec, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-mono">
                  {spec.category}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                  {spec.algorithm}
                </span>
              </div>
              <h3 className="font-mono text-sm font-bold text-slate-900">
                Cipher: {spec.cipher}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {spec.details}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Data in Transit */}
      <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          2. Data in Transit (Network &amp; Edge Security)
        </h2>
        <p>
          AuromindAI terminates client connections at our hardened edge proxies with the highest level of transport security:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li><strong>Mandatory TLS 1.3:</strong> We disable outdated and vulnerable protocols (SSL 3.0, TLS 1.0, TLS 1.1, and TLS 1.2 legacy cipher suites).</li>
          <li><strong>HTTP Strict Transport Security (HSTS):</strong> Enforced across all domains with <code className="bg-slate-100 px-2 py-0.5 rounded font-mono text-xs text-slate-800">includeSubDomains; preload</code> directives to prevent man-in-the-middle attacks.</li>
          <li><strong>Webhook Signing &amp; Verification:</strong> All incoming payloads from WhatsApp Cloud API, Shopify, and Stripe are verified using HMAC-SHA256 signatures before ingestion.</li>
          <li><strong>mTLS for Microservices:</strong> Inter-service communication inside our cluster uses mutual TLS (mTLS) with short-lived X.509 certificates.</li>
        </ul>
      </div>

      {/* Section 3: Data at Rest */}
      <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          3. Data at Rest (Storage &amp; Databases)
        </h2>
        <p>
          All data written to persistent media is encrypted transparently prior to write operations:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li><strong>Database Encryption:</strong> PostgreSQL instances leverage AWS RDS AES-256 volume encryption and column-level encryption for sensitive client secrets.</li>
          <li><strong>Encrypted Vector Embeddings:</strong> RAG semantic vector caches and indices in Qdrant and Pinecone are stored in encrypted partitions with dedicated encryption keys.</li>
          <li><strong>Cryptographic Backup Isolation:</strong> Automated snapshot backups are encrypted using distinct KMS keys and stored in geo-redundant, air-gapped cold storage.</li>
        </ul>
      </div>

      {/* Section 4: Sandboxed Micro-VM Isolation */}
      <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          4. Autonomous Agent Execution Isolation
        </h2>
        <p>
          When an AuromindAI agent executes custom code, analyzes documents, or calls enterprise tools, it operates within a multi-tenant isolation framework:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <Cpu className="w-4 h-4 text-emerald-600" />
              <span>Ephemeral Containers</span>
            </div>
            <p className="text-xs text-slate-600">
              Each execution container is spawned on-demand and terminated immediately upon task completion, leaving zero persistent artifacts.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Network Egress Controls</span>
            </div>
            <p className="text-xs text-slate-600">
              Agents operate behind strict egress firewalls that restrict external network requests strictly to whitelisted domain endpoints.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Tamper-Proof Telemetry</span>
            </div>
            <p className="text-xs text-slate-600">
              Every tool invocation, API query, and database modification generates an immutable audit log signed with cryptographic hashes.
            </p>
          </div>
        </div>
      </div>

      {/* Section 5: SOC-2 & Vulnerability Management */}
      <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          5. Vulnerability Management &amp; Penetration Testing
        </h2>
        <p>
          We conduct continuous third-party vulnerability assessments and automated static application security testing (SAST):
        </p>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li><strong>Annual Third-Party Penetration Tests:</strong> Performed by independent CREST-certified security assessment firms.</li>
          <li><strong>Automated Dependency Scanning:</strong> Continuous scanning of all npm, PyPI, and Docker container dependencies for CVEs.</li>
          <li><strong>Vulnerability Disclosure Program:</strong> We invite security researchers to report findings responsibly via our security disclosure desk.</li>
        </ul>
      </div>

      {/* Section 6: Dedicated VPC & On-Premise Deployments */}
      <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          6. Dedicated Single-Tenant VPC &amp; On-Premise Deployments
        </h2>
        <p>
          For government agencies, hospital systems, and global financial institutions requiring sovereign data isolation, AuromindAI provides dedicated VPC and air-gapped on-premise deployments. Under this tier:
        </p>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
          <p className="font-bold text-slate-900">Enterprise Dedicated Architecture Options:</p>
          <ul className="list-disc list-inside space-y-1 text-slate-600">
            <li>Single-tenant AWS / GCP / Azure Virtual Private Cloud with dedicated hardware</li>
            <li>Customer-Managed Encryption Keys (CMEK) with Bring-Your-Own-Key (BYOK) support</li>
            <li>Air-gapped on-premise deployment with local open-weight LLM inference (Llama 3.3 / DeepSeek / Mistral)</li>
            <li>Direct VPN / AWS Direct Connect peering with zero public internet exposure</li>
          </ul>
        </div>
      </div>

      {/* Contact Banner */}
      <div className="rounded-3xl bg-slate-100 border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Request Our Security Whitepaper or SOC-2 Report</h3>
          <p className="text-xs text-slate-500">Contact our Chief Information Security Officer (CISO) team for enterprise audit documentation.</p>
        </div>
        <a
          href="mailto:security@auromind.ai"
          className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shrink-0"
        >
          Contact security@auromind.ai
        </a>
      </div>
    </div>
  );
}
