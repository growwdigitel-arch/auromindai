'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp, Users, Clock } from 'lucide-react';

export function JoinTeamSection() {
  const perks = [
    {
      title: 'Meaningful Work',
      description: 'Solve real-world problems.',
      icon: Sparkles,
    },
    {
      title: 'Learning Growth',
      description: 'Work with latest AI tech.',
      icon: TrendingUp,
    },
    {
      title: 'Great Team',
      description: 'Collaborative culture.',
      icon: Users,
    },
    {
      title: 'Flexible Work',
      description: 'Remote & on-site options.',
      icon: Clock,
    },
  ];

  return (
    <section id="careers" className="py-16 sm:py-24 bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & CTA Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#059669] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Careers at AuromindAI
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Join Our Team
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              Work on impactful AI solutions and help shape the future.
            </p>
          </div>

          <Link
            href="/careers"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-sm font-bold shadow-sm hover:shadow-md transition-all self-start sm:self-auto hover:scale-[1.02]"
          >
            <span>View Open Roles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Big Team Photo Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white mb-12">
          <div className="relative w-full h-64 sm:h-80 md:h-[360px]">
            <Image
              src="/team-collaboration.jpg"
              alt="AuromindAI Team Collaborating"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 4 Benefits Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {perks.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-3.5 hover:border-emerald-200 hover:shadow-md transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{p.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{p.description}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
