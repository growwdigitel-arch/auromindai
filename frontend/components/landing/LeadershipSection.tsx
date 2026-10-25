'use client';

import React from 'react';
import {
  CreditCard,
  TrendingUp,
  Handshake,
  Globe2,
  Code2,
  Cpu,
  Boxes,
  Lightbulb,
  Quote,
  Users,
  Rocket,
  BarChart3,
  ShieldCheck,
  ExternalLink,
  Award,
} from 'lucide-react';

interface LeaderItem {
  name: string;
  role: string;
  subtitle: string;
  initials: string;
  linkedinUrl: string;
  bio: string;
  highlights: {
    icon: React.ElementType;
    title: string;
    subtitle: string;
  }[];
  quote: string;
}

const leaders: LeaderItem[] = [
  {
    name: 'Ajmal',
    role: 'CEO & Co-founder',
    subtitle: 'Business Strategy | Fintech | Growth',
    initials: 'AA',
    linkedinUrl: 'https://www.linkedin.com/in/ajmalahamed-a-4978a9194/',
    bio: 'Ajmal brings 12+ years of experience in the fintech industry, with deep expertise in digital payments, financial products, and scaling technology businesses. He leads the overall business strategy, partnerships, and growth initiatives at AuromindAI, with a focus on building scalable and sustainable AI solutions for global markets.',
    highlights: [
      { icon: CreditCard, title: '12+ Years', subtitle: 'Fintech Experience' },
      { icon: TrendingUp, title: 'Business', subtitle: 'Strategy & Growth' },
      { icon: Handshake, title: 'Partnerships', subtitle: '& Alliances' },
      { icon: Globe2, title: 'Global Market', subtitle: 'Expansion' },
    ],
    quote:
      'Fintech taught me that technology can make financial services simple, inclusive and powerful. At AuromindAI, we bring the same mindset to every industry we work with.',
  },
  {
    name: 'Santhosh',
    role: 'CTO & Co-founder',
    subtitle: 'Engineering | AI Architecture | Product',
    initials: 'SK',
    linkedinUrl: 'https://www.linkedin.com/in/santhosh999/',
    bio: 'Santhosh is the CTO and Product Lead at AuromindAI, with a strong background in product development, AI automation and scalable system architecture. He is passionate about building practical AI solutions that help businesses save time, reduce costs and grow efficiently. Santhosh leads the product vision, technology roadmap and engineering team at AuromindAI.',
    highlights: [
      { icon: Code2, title: 'Product', subtitle: 'Development' },
      { icon: Cpu, title: 'AI Architecture', subtitle: '& Automation' },
      { icon: Boxes, title: 'Scalable Systems', subtitle: '& Infrastructure' },
      { icon: Lightbulb, title: 'Innovation', subtitle: '& R&D' },
    ],
    quote:
      "I'm passionate about building products that solve real problems. At AuromindAI, we're combining AI and automation to help businesses grow faster and operate smarter.",
  },
];

const sharedVisionValues = [
  {
    title: 'Customer First',
    description: 'We build solutions that create real value for our customers.',
    icon: Users,
  },
  {
    title: 'Innovation',
    description: 'We constantly explore new possibilities with AI.',
    icon: Rocket,
  },
  {
    title: 'Scalability',
    description: 'We build for long-term and global impact.',
    icon: BarChart3,
  },
  {
    title: 'Integrity',
    description: 'We believe in transparent and ethical business practices.',
    icon: ShieldCheck,
  },
];

export function LeadershipSection() {
  return (
    <section id="leadership" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50/70 via-emerald-50/20 to-white relative overflow-hidden scroll-mt-20">
      {/* Soft Ambient Background Elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-emerald-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200/80">
            OUR LEADERSHIP
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-4">
            The People Behind <span className="text-[#059669]">AuromindAI</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed max-w-2xl mx-auto">
            A passionate team with deep industry experience, technical expertise and a shared vision to build AI solutions that create real business impact.
          </p>
        </div>

        {/* 2 Executive Leader Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-20">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row group"
            >
              {/* Left Column: Executive Visual Card with Overlaid Quote */}
              <div className="md:w-5/12 bg-gradient-to-br from-[#063b2f] via-[#084b3c] to-[#042820] text-white p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden">
                {/* Decorative Pattern & Ambient Glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-teal-500/10 rounded-full blur-xl pointer-events-none" />

                {/* Top Badge & Monogram Header */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                      <Award className="w-3 h-3 text-emerald-300" />
                      Executive
                    </span>
                    <span className="text-[11px] font-mono tracking-wider text-emerald-300/80 uppercase">
                      AuromindAI
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg shadow-black/20">
                      {leader.initials}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white tracking-tight">{leader.name}</div>
                      <div className="text-xs text-emerald-300 font-medium">{leader.role}</div>
                    </div>
                  </div>
                </div>

                {/* Overlaid Quote Card (matching the image design) */}
                <div className="relative z-10 rounded-2xl bg-[#032019]/90 border border-emerald-500/20 p-4 shadow-xl backdrop-blur-sm mt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#059669] text-white flex items-center justify-center shrink-0 shadow-md">
                      <Quote className="w-4 h-4 fill-white" />
                    </div>
                    <p className="text-xs sm:text-[13px] leading-relaxed text-emerald-100/90 italic font-light">
                      &ldquo;{leader.quote}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Details, Bio, & 2x2 Capabilities Grid */}
              <div className="md:w-7/12 p-6 sm:p-7 flex flex-col justify-between bg-white">
                <div>
                  {/* Role Pill */}
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#059669] border border-emerald-200/80 mb-2.5">
                    {leader.role}
                  </div>

                  {/* Name + LinkedIn Icon */}
                  <div className="flex items-center gap-2.5 mb-1">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {leader.name}
                    </h3>
                    <a
                      href={leader.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg bg-[#0077b5] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
                      aria-label={`${leader.name} LinkedIn Profile`}
                      title="View LinkedIn Profile"
                    >
                      <span className="font-bold text-xs tracking-tighter">in</span>
                    </a>
                  </div>

                  {/* Subtitle / Focus Domain */}
                  <p className="text-xs sm:text-sm font-semibold text-slate-600 mb-3">
                    {leader.subtitle}
                  </p>

                  <div className="h-0.5 w-12 bg-[#059669] rounded-full mb-3" />

                  {/* Biography Paragraph */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                    {leader.bio}
                  </p>
                </div>

                {/* 2x2 Highlights Grid */}
                <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-slate-100">
                  {leader.highlights.map((h, i) => {
                    const HIcon = h.icon;
                    return (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#059669] border border-emerald-100 flex items-center justify-center shrink-0 shadow-sm">
                          <HIcon className="w-4 h-4" />
                        </div>
                        <div className="text-xs leading-tight">
                          <div className="font-bold text-slate-900">{h.title}</div>
                          <div className="text-slate-500 text-[11px]">{h.subtitle}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shared Vision Section */}
        <div className="pt-10 border-t border-slate-200/80">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200/80">
              OUR SHARED VISION
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              Building a <span className="text-[#059669]">Smarter Tomorrow</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
              We combine business expertise and deep technology capabilities to create AI solutions that make a real difference for businesses and people.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sharedVisionValues.map((v, idx) => {
              const VIcon = v.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all text-center flex flex-col items-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#059669] border border-emerald-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <VIcon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1.5">{v.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
