'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Lightbulb,
  Code2,
  Cpu,
  Network,
  LineChart,
  Headphones,
  CheckCircle2,
  X,
  Zap,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Check
} from 'lucide-react';

export interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  tagline: string;
  icon: React.ElementType;
  timeline: string;
  roiMetric: string;
  roiLabel: string;
  overview: string;
  deliverables: string[];
  techStack: string[];
  idealFor: string;
}

export const servicesData: ServiceDetail[] = [
  {
    id: 'strategy',
    title: 'AI Strategy & Consulting',
    shortDesc: 'Identify high-impact AI opportunities, quantify business ROI, and build an actionable execution roadmap.',
    tagline: 'Strategic Feasibility & Enterprise AI Readiness',
    icon: Lightbulb,
    timeline: '1 - 2 Weeks',
    roiMetric: '3x - 8x',
    roiLabel: 'Projected 12-Month ROI',
    overview: 'We audit your operational bottlenecks, evaluate proprietary data readiness, and prioritize high-value AI workflows that generate measurable revenue and cost efficiencies.',
    deliverables: [
      'Operational AI readiness & data architecture audit',
      'High-impact use case identification & ROI projection matrix',
      'Comprehensive 90-day execution roadmap & milestone plan',
      'Data governance, security, and IP compliance blueprint'
    ],
    techStack: ['OpenAI / Anthropic APIs', 'Vector DBs', 'Custom Benchmarks', 'Enterprise Cloud (AWS/GCP)'],
    idealFor: 'Enterprises & growth companies looking for a clear, risk-mitigated AI roadmap before writing code.'
  },
  {
    id: 'development',
    title: 'Custom AI Development',
    shortDesc: 'Tailored LLM applications, autonomous swarms, and bespoke algorithms engineered for your unique business logic.',
    tagline: 'Bespoke LLMs, Multi-Agent Swarms & Domain AI',
    icon: Code2,
    timeline: '3 - 6 Weeks',
    roiMetric: '100%',
    roiLabel: 'Proprietary IP Ownership',
    overview: 'We engineer end-to-end bespoke AI software, from specialized domain model fine-tuning and autonomous multi-agent swarms to deterministic guardrails and vector RAG pipelines.',
    deliverables: [
      'Custom LLM fine-tuning on your domain & enterprise documents',
      'Autonomous multi-agent orchestration for multi-step reasoning',
      'Hallucination-free deterministic safety and guardrail layers',
      'Private cloud deployment with complete intellectual property ownership'
    ],
    techStack: ['Python', 'FastAPI', 'LangChain / LlamaIndex', 'Pinecone / pgvector', 'vLLM'],
    idealFor: 'Businesses needing specialized AI solutions where off-the-shelf chatbots and generic tools fall short.'
  },
  {
    id: 'automation',
    title: 'AI Automation & Workflows',
    shortDesc: 'Automate repetitive back-office and customer-facing tasks to achieve maximum throughput with zero errors.',
    tagline: 'Autonomous Process Execution & Document Intelligence',
    icon: Cpu,
    timeline: '2 - 4 Weeks',
    roiMetric: '70%+',
    roiLabel: 'Labor Time Reduction',
    overview: 'Eliminate manual copy-paste workflows, document parsing delays, and ticket queues. Our autonomous AI pipelines process invoices, extract unstructured text, and execute workflows 24/7.',
    deliverables: [
      'Intelligent document processing (OCR, invoices, contracts, IDs)',
      'Automated email drafting, lead triage, and customer ticket resolution',
      'Autonomous business logic triggers without human latency',
      'Exception-handling protocols with human-in-the-loop review'
    ],
    techStack: ['Tesseract / Vision AI', 'Celery / Redis', 'REST Webhooks', 'Zapier / Make / n8n', 'PostgreSQL'],
    idealFor: 'Companies with high-volume repetitive operations in finance, legal, logistics, and customer support.'
  },
  {
    id: 'integration',
    title: 'AI Ecosystem Integration',
    shortDesc: 'Integrate AI seamlessly with your existing CRM, ERP, WhatsApp, and database infrastructure.',
    tagline: 'Frictionless Pipeline & Omnichannel API Sync',
    icon: Network,
    timeline: '1 - 3 Weeks',
    roiMetric: '0 min',
    roiLabel: 'Manual Double-Entry Delay',
    overview: 'Connect AI intelligence directly into your existing software stack without disrupting current operations. We build bi-directional connectors for CRMs, messaging apps, and legacy ERPs.',
    deliverables: [
      'Official WhatsApp Business Cloud API & Instagram DM setup',
      'Bi-directional sync with HubSpot, Salesforce, Zoho, and Shopify',
      'Secure enterprise database querying (SQL, Postgres, MongoDB)',
      'Custom RESTful APIs and encrypted real-time webhooks'
    ],
    techStack: ['Meta Graph API', 'HubSpot / Salesforce APIs', 'PostgreSQL', 'Docker', 'OAuth 2.0'],
    idealFor: 'Businesses that already have established tools and need AI to supercharge them rather than replace them.'
  },
  {
    id: 'analytics',
    title: 'Data & Predictive Analytics',
    shortDesc: 'Transform unstructured enterprise data into predictive, actionable intelligence in sub-second queries.',
    tagline: 'High-Dimensional Vector Search & Predictive Models',
    icon: LineChart,
    timeline: '2 - 4 Weeks',
    roiMetric: '< 1s',
    roiLabel: 'Knowledge Retrieval Latency',
    overview: 'Make decades of internal company knowledge instantly searchable and conversational. We build high-dimensional vector search engines and predictive forecasting models.',
    deliverables: [
      'Enterprise vector search across PDFs, Notion, databases, and emails',
      'Predictive customer churn, demand forecasting, and lead scoring',
      'Real-time agent telemetry and conversation sentiment analytics',
      'Executive dashboard reporting with interactive KPI metrics'
    ],
    techStack: ['Chroma / Qdrant', 'OpenAI Embeddings', 'Pandas / NumPy', 'Next.js Analytics', 'ClickHouse'],
    idealFor: 'Data-rich organizations looking to unlock answers and trends buried inside PDFs and databases.'
  },
  {
    id: 'support',
    title: 'Ongoing Support & Optimization',
    shortDesc: 'Continuous telemetry monitoring, latency reduction, security patches, and model fine-tuning.',
    tagline: '24/7 Enterprise Reliability & Perpetual Tuning',
    icon: Headphones,
    timeline: 'Monthly SLA',
    roiMetric: '99.98%',
    roiLabel: 'Platform Availability SLA',
    overview: 'AI is not a one-time build. We provide dedicated engineers who monitor prompt performance, mitigate model drift, optimize API token expenditures, and implement updates continuously.',
    deliverables: [
      '24/7/365 active monitoring of system uptime, latency, and costs',
      'Continuous prompt tuning and model alignment updates',
      'Security audits, vulnerability patches, and token cost optimization',
      'Dedicated enterprise Slack channel and priority SLA response'
    ],
    techStack: ['Langfuse / Helicone', 'Prometheus / Grafana', 'AWS CloudWatch', 'Weekly Eval Suites'],
    idealFor: 'Enterprises needing reliable production uptime, guaranteed security, and perpetual AI performance improvements.'
  }
];

interface ServicesSectionProps {
  hideHeader?: boolean;
}

export function ServicesSection({ hideHeader = false }: ServicesSectionProps = {}) {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  const handleNextService = () => {
    if (!selectedService) return;
    const currentIndex = servicesData.findIndex((s) => s.id === selectedService.id);
    const nextIndex = (currentIndex + 1) % servicesData.length;
    setSelectedService(servicesData[nextIndex]);
  };

  const handlePrevService = () => {
    if (!selectedService) return;
    const currentIndex = servicesData.findIndex((s) => s.id === selectedService.id);
    const prevIndex = (currentIndex - 1 + servicesData.length) % servicesData.length;
    setSelectedService(servicesData[prevIndex]);
  };

  return (
    <section id="services" className={`bg-slate-50/60 ${hideHeader ? 'py-8 sm:py-12' : 'py-16 sm:py-24'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        {!hideHeader && (
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              End-to-End Enterprise AI Solutions
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              Click Learn More on any service card below for a dedicated breakdown of deliverables, technical stack, and business ROI.
            </p>
          </div>
        )}

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <Link
                      href={`/services/${item.id}`}
                      className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-[#059669] flex items-center justify-center group-hover:bg-[#059669] group-hover:text-white transition-colors duration-300"
                    >
                      <Icon className="w-6 h-6" />
                    </Link>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold group-hover:bg-emerald-50 group-hover:text-[#059669] transition-colors">
                      {item.timeline}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#059669] transition-colors">
                    <Link href={`/services/${item.id}`} className="hover:underline">
                      {item.title}
                    </Link>
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-500 mt-2.5 leading-relaxed">
                    {item.shortDesc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded">
                      {item.roiMetric}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium truncate">
                      {item.roiLabel}
                    </span>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/services/${item.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#059669] hover:text-[#047857] group-hover:gap-2 transition-all"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSelectedService(item)}
                    className="text-[10px] font-mono text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 px-2 py-1 rounded transition-colors"
                  >
                    Quick View
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE CLICK-TO-EXPLAIN SERVICE MODAL */}
      {/* ========================================================================= */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedService(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
          >
            {/* Header */}
            <div className="p-6 sm:p-7 border-b border-slate-100 bg-slate-50/70 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#059669] text-white flex items-center justify-center shrink-0 shadow-md">
                  <selectedService.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#059669] font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Service Scope
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      ⏱ {selectedService.timeline}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    {selectedService.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {selectedService.tagline}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition-colors shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 sm:p-7 overflow-y-auto space-y-6 text-slate-700 text-xs sm:text-sm">
              
              {/* Executive Summary */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400 mb-1.5">
                  Executive Overview
                </h4>
                <p className="text-slate-600 leading-relaxed font-normal">
                  {selectedService.overview}
                </p>
              </div>

              {/* Key Deliverables */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400 mb-2.5">
                  What We Deliver (Core Pillars)
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {selectedService.deliverables.map((d, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-slate-800 leading-snug">
                        {d}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business ROI & Ideal For */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 space-y-1">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-emerald-800">
                    Quantified Business Impact
                  </div>
                  <div className="text-2xl font-black text-[#059669] font-mono">
                    {selectedService.roiMetric}
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    {selectedService.roiLabel}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                    Ideal Fit For
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedService.idealFor}
                  </p>
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400 mb-2">
                  Technologies &amp; Architecture
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedService.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono text-[11px] font-semibold border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevService}
                  className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1 text-xs font-semibold"
                  title="Previous service"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>
                <button
                  onClick={handleNextService}
                  className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1 text-xs font-semibold"
                  title="Next service"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/services/${selectedService.id}`}
                  className="px-4 py-2.5 rounded-full border border-emerald-600 text-[#059669] hover:bg-emerald-50 font-bold text-xs transition-all flex items-center gap-1.5"
                >
                  <span>Learn More (Full Page)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/contact?service=${selectedService.id}`}
                  className="px-5 py-2.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs shadow-md transition-all hover:scale-105 flex items-center gap-1.5"
                >
                  <span>Request a Pilot Call</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
