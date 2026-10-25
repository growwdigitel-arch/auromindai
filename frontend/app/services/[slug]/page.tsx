import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/landing/SiteHeader';
import { SiteFooter } from '@/components/landing/SiteFooter';
import { servicesData, getServiceBySlug, ServiceDetail } from '@/lib/servicesData';
import {
  Lightbulb,
  Code2,
  Cpu,
  Network,
  LineChart,
  Headphones,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Database,
  Lock,
  Workflow,
  Search,
  Users,
  Compass,
  BarChart3,
  Bot,
  HelpCircle,
  Briefcase,
  Layers,
  ArrowUpRight
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Lightbulb,
  Code2,
  Cpu,
  Network,
  LineChart,
  Headphones
};

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  servicesData.forEach((service) => {
    params.push({ slug: service.id });
    service.aliases.forEach((alias) => {
      params.push({ slug: alias });
    });
  });
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);
  if (!service) {
    return {
      title: 'Service Not Found | Auromind AI'
    };
  }
  return {
    title: `${service.title} | Auromind AI`,
    description: service.shortDesc
  };
}

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const IconComponent = iconMap[service.iconName] || Sparkles;
  const otherServices = servicesData.filter((s) => s.id !== service.id);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <SiteHeader activePage="services" />

      <main className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
            <Link href="/" className="hover:text-[#059669] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[#059669] transition-colors">Services</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">{service.title}</span>
          </div>

          {/* ========================================================================= */}
          {/* HERO SECTION */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20 pb-16 border-b border-slate-100">
            {/* Left Column: Title, Tagline & Overview */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[#059669] text-xs font-bold tracking-wide uppercase">
                <IconComponent className="w-4 h-4" />
                <span>Enterprise Service Pillar</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-lg sm:text-xl font-medium text-emerald-800/90 leading-snug">
                {service.tagline}
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                {service.overview}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`/contact?service=${service.id}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm shadow-md hover:scale-105 transition-all"
                >
                  <span>Book Architecture Scoping Call</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#deliverables"
                  className="inline-flex items-center gap-1.5 px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
                >
                  <span>View Deliverables</span>
                </a>
              </div>
            </div>

            {/* Right Column: ROI Metric Highlight Card */}
            <div className="lg:col-span-5">
              <div className="relative bg-linear-to-br from-[#064e3b] via-[#047857] to-[#022c22] rounded-3xl p-8 sm:p-10 text-white shadow-2xl border border-emerald-600/40 space-y-6 overflow-hidden">
                {/* Decorative Background Glow */}
                <div className="absolute -top-20 -right-20 w-56 h-56 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-emerald-700/50 pb-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <IconComponent className="w-6 h-6 text-emerald-300" />
                  </div>
                  <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">
                    ⏱ Timeline: {service.timeline}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-semibold">
                    Measurable ROI Target
                  </div>
                  <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
                    {service.roiMetric}
                  </div>
                  <div className="text-xs font-medium text-emerald-200/90 pt-1">
                    {service.roiLabel}
                  </div>
                </div>

                <p className="text-xs text-emerald-100/80 leading-relaxed border-t border-emerald-700/50 pt-5">
                  {service.heroHighlight}
                </p>

                <div className="space-y-2 pt-2">
                  <div className="text-[11px] uppercase tracking-wider font-bold text-emerald-300">
                    Enterprise Guarantees:
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs text-emerald-50">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                      <span>100% Private VPC &amp; Zero Data Retention</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                      <span>Full Proprietary Source Code Ownership</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-300 shrink-0" />
                      <span>Sub-second Latency &amp; Deterministic Guardrails</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CHALLENGES vs SOLUTIONS */}
          {/* ========================================================================= */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Problem vs Solution
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                Why Standard Solutions Fall Short
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                How Auromind AI replaces operational bottlenecks with enterprise-grade engineering.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.challenges.map((c, i) => {
                const solution = service.solutions[i];
                return (
                  <div
                    key={i}
                    className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-6"
                  >
                    {/* Problem */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-rose-600 text-xs font-bold font-mono uppercase tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span>The Operational Bottleneck</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{c.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{c.description}</p>
                    </div>

                    {/* Solution */}
                    <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                      <div className="flex items-center gap-2 text-[#059669] text-xs font-bold font-mono uppercase tracking-wide">
                        <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                        <span>Auromind Architecture</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">{solution?.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{solution?.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DELIVERABLES SECTION */}
          {/* ========================================================================= */}
          <div id="deliverables" className="scroll-mt-24 mb-20 bg-slate-50/70 rounded-3xl p-8 sm:p-12 border border-slate-200/80">
            <div className="max-w-2xl mb-10">
              <span className="text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Tangible Deliverables
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                What Your Organization Receives
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Every phase outputs concrete, production-ready assets and documentation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#059669] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Deliverable 0{idx + 1}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Concrete Outcome:
                    </span>
                    <p className="text-xs font-semibold text-slate-800 mt-0.5">
                      {item.outcome}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* TECHNICAL ARCHITECTURE & STACK */}
          {/* ========================================================================= */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Technical Blueprint
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                Architecture &amp; Supported Tech Stack
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Engineered with enterprise-grade modular microservices, vector search, and observability.
              </p>
            </div>

            {/* 4 Steps Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {service.architectureSteps.map((s, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all space-y-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#059669] font-mono font-bold text-sm flex items-center justify-center border border-emerald-100">
                    {s.step}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{s.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>

            {/* Categorized Tech Stack */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800">
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold">Integrated Technologies &amp; Frameworks</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.techStack.map((stack, i) => (
                  <div key={i} className="space-y-3">
                    <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                      {stack.category}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {stack.technologies.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-mono font-medium border border-slate-700/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CASE STUDY HIGHLIGHT */}
          {/* ========================================================================= */}
          <div className="mb-20">
            <div className="rounded-3xl bg-linear-to-r from-emerald-900 to-slate-900 text-white p-8 sm:p-12 shadow-xl border border-emerald-700/40">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-300 text-xs font-mono font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Real-World Benchmark</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {service.caseStudy.clientType}
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                    <p>
                      <strong className="text-white">Challenge:</strong> {service.caseStudy.problem}
                    </p>
                    <p>
                      <strong className="text-white">Auromind Solution:</strong> {service.caseStudy.solution}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                  {service.caseStudy.results.map((res, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1"
                    >
                      <div className="text-2xl font-black text-emerald-300 font-mono">
                        {res.metric}
                      </div>
                      <div className="text-xs text-slate-300 font-medium">
                        {res.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* IDEAL FIT FOR */}
          {/* ========================================================================= */}
          <div className="mb-20">
            <div className="bg-emerald-50/60 rounded-3xl p-8 sm:p-10 border border-emerald-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                <Briefcase className="w-5 h-5 text-[#059669]" />
                <span>Who This Service Is Engineered For</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.idealFor.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-emerald-100 flex items-start gap-3 shadow-2xs"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* FAQ SECTION */}
          {/* ========================================================================= */}
          <div className="mb-20 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                Service FAQs
              </h2>
            </div>

            <div className="space-y-4">
              {service.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-emerald-300 transition-colors"
                >
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#059669] shrink-0 mt-1" />
                    <span>{faq.question}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* OTHER SERVICES CARDS */}
          {/* ========================================================================= */}
          <div className="mb-20 pt-16 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  Explore More Capabilities
                </span>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mt-2">
                  Other Enterprise AI Services
                </h3>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#059669] hover:text-[#047857]"
              >
                <span>View All Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherServices.slice(0, 3).map((item) => {
                const ItemIcon = iconMap[item.iconName] || Sparkles;
                return (
                  <div
                    key={item.id}
                    className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-emerald-300 hover:shadow-lg transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white text-[#059669] flex items-center justify-center border border-slate-200/80 group-hover:bg-[#059669] group-hover:text-white transition-colors">
                          <ItemIcon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white text-slate-600 font-semibold border border-slate-200">
                          {item.timeline}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-[#059669] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        {item.shortDesc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between">
                      <Link
                        href={`/services/${item.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#059669] group-hover:gap-2 transition-all"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <span className="text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {item.roiMetric}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* BOTTOM CTA CALLOUT */}
          {/* ========================================================================= */}
          <div className="bg-[#064e3b] text-white rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto space-y-5 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-bold border border-emerald-700/60">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Zero-Commitment Architecture Consultation</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Implement {service.title}?
            </h3>
            <p className="text-sm sm:text-base text-emerald-100/90 max-w-xl mx-auto leading-relaxed">
              Speak directly with an Auromind AI solutions architect. We’ll review your systems, estimate timelines, and provide an executable proposal.
            </p>
            <div className="pt-2">
              <Link
                href={`/contact?service=${service.id}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#064e3b] font-bold text-sm shadow-md hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95"
              >
                <span>Schedule a Technical Scoping Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
