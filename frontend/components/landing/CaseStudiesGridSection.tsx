'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  X,
  Building2,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Check,
  ShieldCheck,
  Zap
} from 'lucide-react';

export interface CaseStudyItem {
  id: string;
  client: string;
  clientType: string;
  category: 'Healthcare' | 'E-commerce' | 'Fintech' | 'Real Estate' | 'Logistics' | 'Legal';
  metric: string;
  highlight: string;
  summary: string;
  image: string;
  challenge: string;
  solution: string[];
  results: { value: string; label: string }[];
  techStack: string[];
  timeline: string;
}

export const caseStudiesList: CaseStudyItem[] = [
  {
    id: 'healthcare',
    client: 'Apex Healthcare Network',
    clientType: 'Multi-Specialty Hospital Chain (12 Locations)',
    category: 'Healthcare',
    metric: '40% reduction',
    highlight: 'in appointment no-shows.',
    summary: 'Automated WhatsApp reminder swarms and real-time patient rescheduling with zero human delay.',
    image: '/industry-healthcare.jpg',
    timeline: '3 Weeks to Production',
    challenge: 'Over 28% of booked outpatient consultations resulted in no-shows, causing doctors idle slots and costing millions in lost hospital revenue.',
    solution: [
      'Deployed official WhatsApp Business Cloud reminder agents 48h and 4h prior to visits',
      'Enabled automated one-click rescheduling directly within WhatsApp conversation',
      'Integrated bidirectional calendar sync with hospital Electronic Health Record (EHR) system',
      'Instant routing of urgent cancellations to patients on the standby waitlist'
    ],
    results: [
      { value: '40%', label: 'No-Show Reduction' },
      { value: '18,500+', label: 'Monthly Patient Dialogues' },
      { value: '$480,000', label: 'Annual Reclaimed Value' }
    ],
    techStack: ['WhatsApp Cloud API', 'FastAPI', 'PostgreSQL', 'EHR HL7 Connectors']
  },
  {
    id: 'ecommerce',
    client: 'Velvet & Stone Luxury Wear',
    clientType: 'Omnichannel D2C Fashion Brand',
    category: 'E-commerce',
    metric: '3x increase',
    highlight: 'in sales with AI marketing.',
    summary: 'Omnichannel abandoned cart recovery, Instagram DM shopping, and personalized predictive promotions.',
    image: '/industry-ecommerce.jpg',
    timeline: '2 Weeks to Production',
    challenge: 'High cart abandonment (72%) and slow customer response during viral Instagram drops resulted in lost sales to competitors.',
    solution: [
      'Configured automated Instagram comment-to-DM triggers for instant discount & sizing lookups',
      'Personalized WhatsApp cart recovery sequences with interactive payment checkout links',
      'AI shopping concierge answering fabric, fit, and express delivery inquiries in 1.1s',
      'Automated sync with Shopify inventory to prevent overselling'
    ],
    results: [
      { value: '3.1x', label: 'E-commerce Revenue Lift' },
      { value: '29.4%', label: 'Cart Recovery Rate' },
      { value: '< 1.2s', label: 'Avg Customer Wait Time' }
    ],
    techStack: ['Shopify GraphQL API', 'Instagram Graph API', 'WhatsApp API', 'OpenAI GPT-4o']
  },
  {
    id: 'fintech',
    client: 'NovaPay Global',
    clientType: 'Cross-Border B2B Payments Gateway',
    category: 'Fintech',
    metric: '60% faster',
    highlight: 'customer onboarding.',
    summary: 'Instant automated KYC verification and algorithmic document risk scoring pipeline.',
    image: '/industry-fintech.jpg',
    timeline: '4 Weeks to Production',
    challenge: 'Manual compliance document checks took 24 to 48 hours per merchant application, leading to a 34% drop-off rate during onboarding.',
    solution: [
      'Implemented Intelligent Document Processing (IDP) to extract tax IDs, passports, and utility bills',
      'Automated anti-fraud anomaly detection cross-referencing global sanctions and PEP registries',
      'Instant merchant notification with specific missing document guidance in seconds',
      'End-to-end encrypted storage complying with SOC-2 and ISO 27001 data isolation'
    ],
    results: [
      { value: '60%', label: 'Faster Merchant Onboarding' },
      { value: '4 mins', label: 'Turnaround from 36 hours' },
      { value: '99.8%', label: 'Compliance Precision' }
    ],
    techStack: ['Vision AI OCR', 'Python LangChain', 'ChromaDB', 'AWS KMS Security']
  },
  {
    id: 'real-estate',
    client: 'Skyline Luxury Developments',
    clientType: 'Premium Real Estate Developer',
    category: 'Real Estate',
    metric: '2.1x more',
    highlight: 'qualified leads from AI agents.',
    summary: '24/7 autonomous buyer qualification, site tour booking, and broker matching.',
    image: '/industry-realestate.jpg',
    timeline: '2 Weeks to Production',
    challenge: 'Heavy digital ad spend generated thousands of unvetted portal inquiries, overwhelming sales brokers with tire-kickers.',
    solution: [
      '24/7 WhatsApp & Web bot engaged inquiries within 2 seconds of form submission',
      'Qualified investment budget, desired BHK layout, and possession timeline autonomously',
      'Dispatched personalized brochure PDFs and virtual 3D tour links instantly',
      'Auto-booked private site visits into sales executives’ Google and Microsoft calendars'
    ],
    results: [
      { value: '2.1x', label: 'More Qualified Site Tours' },
      { value: '₹42 Cr', label: 'Attributed Pipeline Sales' },
      { value: '88%', label: 'Inbound Response Under 3s' }
    ],
    techStack: ['WhatsApp API', 'HubSpot CRM', 'Vector RAG', 'Cloudflare Workers']
  },
  {
    id: 'logistics',
    client: 'TransGlobal Freightways',
    clientType: 'Third-Party Logistics & Fleet Network',
    category: 'Logistics',
    metric: '78% ticket deflection',
    highlight: 'via automated tracking agents.',
    summary: 'AI voice & WhatsApp dispatcher agent querying real-time GPS telematics and bill of lading docs.',
    image: '/industry-logistics.jpg',
    timeline: '3 Weeks to Production',
    challenge: 'Dispatcher phone lines were clogged with over 8,000 weekly routine inquiries asking for truck location and delivery estimates.',
    solution: [
      'Automated WhatsApp agent connected directly to fleet telematics and GPS database',
      'Instant dispatch of signed Proof-of-Delivery (POD) and Bill of Lading (BOL) PDFs',
      'Conversational voice agent answering trucker status calls with sub-second retrieval',
      'Proactive delay alert notifications sent to receiving warehouse managers'
    ],
    results: [
      { value: '78%', label: 'Routine Ticket Deflection' },
      { value: '340 hrs', label: 'Saved Dispatcher Time /mo' },
      { value: '94%', label: 'Driver Satisfaction Score' }
    ],
    techStack: ['PostgreSQL Telematics', 'Twilio Voice AI', 'WhatsApp Cloud API', 'Redis']
  },
  {
    id: 'legal',
    client: 'Lexis Veritas Partners',
    clientType: 'Corporate Law & M&A Advisory Firm',
    category: 'Legal',
    metric: '85% faster',
    highlight: 'contract & NDA risk analysis.',
    summary: 'Automated contract clause extraction, redline suggestions, and regulatory compliance checks.',
    image: '/industry-legal.jpg',
    timeline: '3 Weeks to Production',
    challenge: 'Associates spent hundreds of billable hours reading standard non-disclosure and procurement contracts to flag non-standard liability clauses.',
    solution: [
      'Specialized legal LLM fine-tuned on corporate standard agreements and indemnity precedents',
      'Instant extraction and side-by-side comparison of governing law, liability caps, and termination rights',
      'Automated generation of executive risk summaries with redline recommendations',
      'Air-gapped private cloud model deployment ensuring strict attorney-client privilege'
    ],
    results: [
      { value: '85%', label: 'Faster Contract Review' },
      { value: '1,200+', label: 'Contracts Scanned /mo' },
      { value: 'Zero', label: 'Data Retention Guarantee' }
    ],
    techStack: ['Private Llama 3', 'vLLM', 'pgvector', 'Docker Air-Gapped']
  }
];

export function CaseStudiesGridSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudyItem | null>(null);

  const categories = ['All', 'Healthcare', 'E-commerce', 'Fintech', 'Real Estate', 'Logistics', 'Legal'];

  const filtered = activeCategory === 'All'
    ? caseStudiesList
    : caseStudiesList.filter((c) => c.category === activeCategory);

  const handleNextStudy = () => {
    if (!selectedCaseStudy) return;
    const currentIndex = caseStudiesList.findIndex((c) => c.id === selectedCaseStudy.id);
    const nextIndex = (currentIndex + 1) % caseStudiesList.length;
    setSelectedCaseStudy(caseStudiesList[nextIndex]);
  };

  const handlePrevStudy = () => {
    if (!selectedCaseStudy) return;
    const currentIndex = caseStudiesList.findIndex((c) => c.id === selectedCaseStudy.id);
    const prevIndex = (currentIndex - 1 + caseStudiesList.length) % caseStudiesList.length;
    setSelectedCaseStudy(caseStudiesList[prevIndex]);
  };

  return (
    <section id="case-studies" className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Case Studies
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Real Businesses. Real Results.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Click any case study below to read the complete problem, architecture implemented, and verified business metrics.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-[#059669] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCaseStudy(item)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.client}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-slate-700 shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                  <span>{item.category}</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-full border border-slate-700">
                  {item.timeline}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {item.client}
                  </div>
                  <div className="mt-2 text-2xl font-black text-[#059669] font-mono">
                    {item.metric}
                  </div>
                  <div className="text-sm font-semibold text-slate-800 leading-snug">
                    {item.highlight}
                  </div>
                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#059669] group-hover:gap-2 transition-all">
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-emerald-600">
                    Deep Dive
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE CLICK-TO-READ FULL CASE STUDY MODAL */}
      {/* ========================================================================= */}
      {selectedCaseStudy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedCaseStudy(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
          >
            {/* Modal Top Header */}
            <div className="relative p-6 sm:p-7 border-b border-slate-100 bg-slate-50 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#059669] font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {selectedCaseStudy.category} Case Study
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    ⏱ {selectedCaseStudy.timeline}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {selectedCaseStudy.client}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {selectedCaseStudy.clientType}
                </p>
              </div>

              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition-colors shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-7 overflow-y-auto space-y-6 text-slate-700 text-xs sm:text-sm">
              
              {/* Highlight Results Cards */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400 mb-2.5">
                  Verified Business Impact
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedCaseStudy.results.map((r, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 text-center space-y-0.5"
                    >
                      <div className="text-xl sm:text-2xl font-black text-[#059669] font-mono">
                        {r.value}
                      </div>
                      <div className="text-[11px] text-slate-600 font-medium">
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* The Challenge */}
              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-1.5">
                <h4 className="font-bold text-rose-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>The Challenge</span>
                </h4>
                <p className="text-slate-700 leading-relaxed font-normal text-xs sm:text-sm">
                  {selectedCaseStudy.challenge}
                </p>
              </div>

              {/* The AI Solution */}
              <div className="space-y-2.5">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400">
                  The AuromindAI Solution Implemented
                </h4>
                <div className="space-y-2">
                  {selectedCaseStudy.solution.map((sol, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-slate-800 leading-snug">
                        {sol}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400 mb-2">
                  Production Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCaseStudy.techStack.map((tech, idx) => (
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

            {/* Modal Bottom Controls */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevStudy}
                  className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1 text-xs font-semibold"
                  title="Previous case study"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>
                <button
                  onClick={handleNextStudy}
                  className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1 text-xs font-semibold"
                  title="Next case study"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs shadow-md transition-all hover:scale-105 flex items-center gap-1.5"
              >
                <span>Request Similar Pilot for Your Enterprise</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
