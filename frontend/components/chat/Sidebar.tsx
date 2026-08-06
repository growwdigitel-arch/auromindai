'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  SquarePen, 
  Bot, 
  Boxes, 
  Clock, 
  Library, 
  FolderPlus, 
  Filter, 
  Search, 
  PanelLeftClose, 
  MessageSquare, 
  Bell,
  LogOut
} from 'lucide-react';
import { useChatStore } from '@/lib/store/useChatStore';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { conversations, activeChatId, setActiveChatId, createNewChat } = useChatStore();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    router.push('/login');
  };

  const [projects, setProjects] = useState<string[]>([]);

  const mainNav = [
    { label: 'Agent', icon: Bot, href: '/agents' },
    { label: 'Plugins', icon: Boxes, href: '/knowledge' },
    { label: 'Scheduled', icon: Clock, href: '/team' },
    { label: 'Library', icon: Library, href: '/settings' },
  ];

  const handleNewTask = () => {
    const newId = createNewChat();
    router.push(`/dashboard?id=${newId}`);
  };

  const handleNewProject = () => {
    const name = prompt('Enter project name:');
    if (name && name.trim()) {
      setProjects((prev) => [...prev, name.trim()]);
    }
  };

  return (
    <aside className="hidden md:flex w-64 h-full bg-[#111113] text-zinc-300 flex-col justify-between p-3.5 select-none border-r border-zinc-800/80 font-sans shrink-0">
      {/* Top Section */}
      <div className="flex flex-col gap-4 overflow-hidden">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-1">
          <Link href="/dashboard" className="flex items-center gap-2.5 text-base font-bold text-white tracking-tight">
            <Image src="/logo.png" alt="AuromindAI Logo" width={32} height={32} unoptimized className="rounded-xl shadow-soft" />
            <span className="text-lg font-black tracking-tight">auromind<span className="text-emerald-500">.ai</span></span>
          </Link>
          <div className="flex items-center gap-1 text-zinc-400">
            <button className="p-1 rounded-lg hover:text-white hover:bg-zinc-800/60 transition-colors">
              <Search className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 rounded-lg hover:text-white hover:bg-zinc-800/60 transition-colors">
              <PanelLeftClose className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Prominent Standalone New Task Action */}
        <div className="px-1">
          <button
            onClick={handleNewTask}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#1C1C1F] border border-zinc-800 text-xs font-semibold text-zinc-100 hover:bg-zinc-850 hover:border-zinc-700 transition-all shadow-sm cursor-pointer"
          >
            <SquarePen className="w-4 h-4 text-emerald-400" />
            <span>New task</span>
          </button>
        </div>

        {/* Primary Navigation Menu */}
        <nav className="space-y-1">
          {mainNav.map((item, idx) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={idx}
                href={item.href}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-zinc-800/90 text-white font-semibold shadow-soft'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                }`}
              >
                <item.icon className="w-4 h-4 text-zinc-300" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Projects Section */}
        <div className="pt-2 space-y-1">
          <div className="flex items-center justify-between px-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">
            <span>Projects</span>
            <button onClick={handleNewProject} className="hover:text-zinc-300">
              <FolderPlus className="w-3.5 h-3.5" />
            </button>
          </div>
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200 cursor-pointer transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
              <span className="truncate">{proj}</span>
            </div>
          ))}
          <button
            onClick={handleNewProject}
            className="w-full flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/20 transition-colors text-left"
          >
            <FolderPlus className="w-3.5 h-3.5 text-zinc-500" />
            <span>New project</span>
          </button>
        </div>

        {/* Tasks / History Section */}
        <div className="pt-2 flex-1 overflow-y-auto space-y-1 pr-1">
          <div className="flex items-center justify-between px-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">
            <span>Tasks</span>
            <Filter className="w-3 h-3 text-zinc-500 cursor-pointer hover:text-zinc-300" />
          </div>

          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 px-3 text-center gap-2">
              <MessageSquare className="w-5 h-5 text-zinc-700" />
              <p className="text-[11px] text-zinc-600 leading-relaxed">
                No chats yet.<br />Click <span className="text-zinc-400 font-semibold">New task</span> to start.
              </p>
            </div>
          ) : (
            conversations.map((chat) => (
              <div
                key={chat.id}
                onClick={() => {
                  setActiveChatId(chat.id);
                  router.push(`/dashboard?id=${chat.id}`);
                }}
                className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-all ${
                  activeChatId === chat.id
                    ? 'bg-zinc-800/80 text-white font-medium'
                    : 'text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate">{chat.title}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom User Enterprise Profile Bar */}
      <div className="pt-3 border-t border-zinc-800/80 relative">
        {showProfileMenu && (
          <div className="absolute bottom-full left-0 mb-2 w-full bg-[#18181b] border border-zinc-800 rounded-xl p-1.5 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-150 z-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 cursor-pointer hover:bg-zinc-800/30 p-1.5 rounded-lg transition-colors select-none"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs shadow-soft">
              G
            </div>
            <div className="text-xs font-semibold text-white truncate max-w-[90px]">
              Groww Digital
            </div>
          </div>

          <div className="flex items-center gap-1 text-zinc-400">
            <button className="p-1 rounded-lg hover:text-white hover:bg-zinc-800/60 transition-colors">
              <MessageSquare className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 rounded-lg hover:text-white hover:bg-zinc-800/60 transition-colors relative">
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
